
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Brain, History, Activity, BarChart2, Award } from 'lucide-react';
import { toast } from 'sonner';

interface AIModel {
  id: number;
  name: string;
  accuracy: number;
  dataset: string;
  parameters: {
    learningRate: number;
    epochs: number;
    batchSize: number;
  };
}

const AITrainer = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(10);
  const [batchSize, setBatchSize] = useState(32);
  const [selectedDataset, setSelectedDataset] = useState('cifar10');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [score, setScore] = useState(0);

  const datasets = [
    { id: 'mnist', name: 'MNIST (Handwritten Digits)' },
    { id: 'cifar10', name: 'CIFAR-10 (Object Recognition)' },
    { id: 'fashion_mnist', name: 'Fashion MNIST (Clothing Items)' },
    { id: 'imdb_reviews', name: 'IMDB Reviews (Sentiment Analysis)' },
  ];

  useEffect(() => {
    // Initial models
    setModels([
      {
        id: 1,
        name: 'Simple CNN',
        accuracy: 0,
        dataset: 'mnist',
        parameters: {
          learningRate: 0.01,
          epochs: 5,
          batchSize: 32,
        },
      },
      {
        id: 2,
        name: 'Basic MLP',
        accuracy: 0,
        dataset: 'cifar10',
        parameters: {
          learningRate: 0.001,
          epochs: 10,
          batchSize: 64,
        },
      },
    ]);
  }, []);

  const handleSelectModel = (model: AIModel) => {
    setSelectedModel(model);
    setLearningRate(model.parameters.learningRate);
    setEpochs(model.parameters.epochs);
    setBatchSize(model.parameters.batchSize);
    setSelectedDataset(model.dataset);
  };

  const handleCreateModel = () => {
    const newModel: AIModel = {
      id: models.length + 1,
      name: `Model ${models.length + 1}`,
      accuracy: 0,
      dataset: selectedDataset,
      parameters: {
        learningRate,
        epochs,
        batchSize,
      },
    };
    
    setModels([...models, newModel]);
    setSelectedModel(newModel);
    toast.success('New model created!');
  };

  const handleTrainModel = () => {
    if (!selectedModel) return;
    
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training with intervals
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setTrainingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        completeTraining();
      }
    }, 200);
  };

  const completeTraining = () => {
    if (!selectedModel) return;
    
    // Calculate a simulated accuracy based on parameters
    // This is a simplified model - in reality, these relationships are much more complex
    let baseAccuracy = 0.5; // 50% baseline
    
    // Learning rate effect (not too high, not too low is best)
    const lrFactor = learningRate > 0.1 ? -0.1 : (learningRate < 0.0001 ? -0.05 : 0.1);
    
    // Epochs effect (more is generally better, but with diminishing returns)
    const epochFactor = Math.min(0.2, epochs * 0.01);
    
    // Batch size effect (moderate batch sizes work better in this simulation)
    const batchFactor = batchSize > 256 ? -0.05 : (batchSize < 8 ? -0.05 : 0.05);
    
    // Dataset-specific difficulty
    const datasetDifficulty = {
      mnist: 0.1, // Easiest
      fashion_mnist: 0.05,
      cifar10: 0,
      imdb_reviews: -0.05 // Hardest
    };
    
    const accuracyBoost = lrFactor + epochFactor + batchFactor + (datasetDifficulty[selectedDataset as keyof typeof datasetDifficulty] || 0);
    
    // Calculate final accuracy (capped between 0.5 and 0.99)
    const finalAccuracy = Math.min(0.99, Math.max(0.5, baseAccuracy + accuracyBoost));
    
    // Update model
    const updatedModels = models.map(model => 
      model.id === selectedModel.id 
        ? {
            ...model, 
            accuracy: parseFloat(finalAccuracy.toFixed(4)),
            parameters: {
              learningRate,
              epochs,
              batchSize
            },
            dataset: selectedDataset
          } 
        : model
    );
    
    setModels(updatedModels);
    setSelectedModel({
      ...selectedModel,
      accuracy: parseFloat(finalAccuracy.toFixed(4)),
      parameters: {
        learningRate,
        epochs,
        batchSize
      },
      dataset: selectedDataset
    });
    
    // Calculate score based on accuracy
    const pointsEarned = Math.floor((finalAccuracy - 0.5) * 1000);
    setScore(prev => prev + pointsEarned);
    
    setIsTraining(false);
    toast.success(`Training complete! Model achieved ${(finalAccuracy * 100).toFixed(2)}% accuracy`);
    toast(`You earned ${pointsEarned} points!`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI Model Trainer
          </h2>
          <p className="text-muted-foreground">Train machine learning models by adjusting hyperparameters</p>
        </div>
        
        <div className="px-4 py-2 bg-primary/10 rounded-lg flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <span className="font-medium">{score} Points</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Model list */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Your Models</h3>
            <button 
              onClick={handleCreateModel}
              className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-2.5 py-1 rounded-lg font-medium button-hover"
            >
              New Model
            </button>
          </div>
          
          <div className="space-y-2">
            {models.map(model => (
              <div 
                key={model.id}
                onClick={() => handleSelectModel(model)}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all",
                  selectedModel?.id === model.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/30 hover:bg-primary/5"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{model.name}</h4>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                    {model.accuracy ? `${(model.accuracy * 100).toFixed(1)}%` : 'New'}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <History className="h-3 w-3" />
                  Dataset: {datasets.find(d => d.id === model.dataset)?.name.split(' ')[0]}
                </div>
              </div>
            ))}
            
            {models.length === 0 && (
              <div className="p-4 rounded-lg border border-dashed border-border text-center">
                <p className="text-sm text-muted-foreground">No models yet. Create your first model!</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Main area - Model configuration */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6">
          {selectedModel ? (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">{selectedModel.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Configure your model parameters and select a dataset to begin training.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">Dataset</label>
                  <select 
                    className="w-full p-2.5 bg-background border border-border rounded-lg"
                    value={selectedDataset}
                    onChange={(e) => setSelectedDataset(e.target.value)}
                  >
                    {datasets.map(dataset => (
                      <option key={dataset.id} value={dataset.id}>
                        {dataset.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Learning Rate: {learningRate}</label>
                  <input 
                    type="range" 
                    min={0.0001} 
                    max={0.1} 
                    step={0.0001}
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.0001</span>
                    <span>0.1</span>
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Epochs: {epochs}</label>
                  <input 
                    type="range" 
                    min={1} 
                    max={50} 
                    value={epochs}
                    onChange={(e) => setEpochs(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Batch Size: {batchSize}</label>
                  <input 
                    type="range" 
                    min={4} 
                    max={512} 
                    step={4}
                    value={batchSize}
                    onChange={(e) => setBatchSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>4</span>
                    <span>512</span>
                  </div>
                </div>
                
                {isTraining ? (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Training Progress</span>
                      <span className="text-sm">{trainingProgress}%</span>
                    </div>
                    <div className="w-full bg-primary/10 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${trainingProgress}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground animate-pulse">
                      Training model... please wait
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleTrainModel}
                    disabled={isTraining}
                    className={cn(
                      "w-full mt-4 px-4 py-2.5 bg-primary text-white rounded-lg shadow-sm font-medium button-hover",
                      "flex items-center justify-center gap-2"
                    )}
                  >
                    <Activity className="h-4 w-4" />
                    Train Model
                  </button>
                )}
              </div>
              
              {selectedModel.accuracy > 0 && (
                <div className="mt-8 border-t border-border pt-6">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-primary" />
                    Performance Metrics
                  </h4>
                  
                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Accuracy</p>
                        <p className="font-semibold">{(selectedModel.accuracy * 100).toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Dataset</p>
                        <p className="font-semibold">{datasets.find(d => d.id === selectedModel.dataset)?.name.split(' ')[0]}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Learning Rate</p>
                        <p className="font-semibold">{selectedModel.parameters.learningRate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Epochs</p>
                        <p className="font-semibold">{selectedModel.parameters.epochs}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 p-6 border border-dashed border-border rounded-lg">
              <Brain className="h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Model Selected</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Select a model from the list or create a new one to get started.
              </p>
              <button 
                onClick={handleCreateModel}
                className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm font-medium button-hover"
              >
                Create New Model
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITrainer;
