import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Brain, History, Activity, BarChart2, Award } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";

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
  const { addCurrency } = useGame();
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(10);
  const [batchSize, setBatchSize] = useState(32);
  const [selectedDataset, setSelectedDataset] = useState("cifar10");
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [score, setScore] = useState(0);

  const datasets = [
    { id: "mnist", name: "MNIST (Handwritten Digits)" },
    { id: "cifar10", name: "CIFAR-10 (Object Recognition)" },
    { id: "fashion_mnist", name: "Fashion MNIST (Clothing Items)" },
    { id: "imdb_reviews", name: "IMDB Reviews (Sentiment Analysis)" },
  ];

  useEffect(() => {
    // Initial models
    setModels([
      {
        id: 1,
        name: "Simple CNN",
        accuracy: 0,
        dataset: "mnist",
        parameters: {
          learningRate: 0.01,
          epochs: 5,
          batchSize: 32,
        },
      },
      {
        id: 2,
        name: "Basic MLP",
        accuracy: 0,
        dataset: "cifar10",
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
    toast.success("New model created!");
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
    const lrFactor =
      learningRate > 0.1 ? -0.1 : learningRate < 0.0001 ? -0.05 : 0.1;

    // Epochs effect (more is generally better, but with diminishing returns)
    const epochFactor = Math.min(0.2, epochs * 0.01);

    // Batch size effect (moderate batch sizes work better in this simulation)
    const batchFactor = batchSize > 256 ? -0.05 : batchSize < 8 ? -0.05 : 0.05;

    // Dataset-specific difficulty
    const datasetDifficulty = {
      mnist: 0.1, // Easiest
      fashion_mnist: 0.05,
      cifar10: 0,
      imdb_reviews: -0.05, // Hardest
    };

    const accuracyBoost =
      lrFactor +
      epochFactor +
      batchFactor +
      (datasetDifficulty[selectedDataset as keyof typeof datasetDifficulty] ||
        0);

    // Calculate final accuracy (capped between 0.5 and 0.99)
    const finalAccuracy = Math.min(
      0.99,
      Math.max(0.5, baseAccuracy + accuracyBoost)
    );

    // Update model
    const updatedModels = models.map((model) =>
      model.id === selectedModel.id
        ? {
            ...model,
            accuracy: parseFloat(finalAccuracy.toFixed(4)),
            parameters: {
              learningRate,
              epochs,
              batchSize,
            },
            dataset: selectedDataset,
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
        batchSize,
      },
      dataset: selectedDataset,
    });

    // Calculate score based on accuracy
    const pointsEarned = Math.floor((finalAccuracy - 0.5) * 1000);
    setScore((prev) => prev + pointsEarned);

    // Add currency to the game context
    addCurrency(Math.floor(pointsEarned / 10));

    setIsTraining(false);
    toast.success(
      `Training complete! Model achieved ${(finalAccuracy * 100).toFixed(
        2
      )}% accuracy`
    );
    toast(
      `You earned ${pointsEarned} points and ${Math.floor(
        pointsEarned / 10
      )} coins!`
    );
  };

  return (
    <div className="glass-panel rounded-xl p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Brain className="h-6 w-6 text-neon-purple" />
            AI Model Trainer
          </h2>
          <p className="text-muted-foreground">
            Train machine learning models by adjusting hyperparameters
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-accent/40 flex items-center gap-2">
          <Award className="h-5 w-5 text-neon-purple" />
          <span className="font-medium text-white">{score} Points</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Model list */}
        <div className="glass-panel rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-white">Your Models</h3>
            <button
              onClick={handleCreateModel}
              className="text-xs bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple px-2.5 py-1 rounded-lg font-medium transition-colors"
            >
              New Model
            </button>
          </div>

          <div className="space-y-2">
            {models.map((model) => (
              <div
                key={model.id}
                onClick={() => handleSelectModel(model)}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all",
                  selectedModel?.id === model.id
                    ? "border-neon-purple bg-neon-purple/5"
                    : "border-white/10 hover:border-neon-purple/30 hover:bg-neon-purple/5"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm text-white">
                    {model.name}
                  </h4>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-neon-purple/10 text-neon-purple">
                    {model.accuracy
                      ? `${(model.accuracy * 100).toFixed(1)}%`
                      : "New"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <History className="h-3 w-3" />
                  Dataset:{" "}
                  {
                    datasets
                      .find((d) => d.id === model.dataset)
                      ?.name.split(" ")[0]
                  }
                </div>
              </div>
            ))}

            {models.length === 0 && (
              <div className="p-4 rounded-lg border border-dashed border-white/10 text-center">
                <p className="text-sm text-muted-foreground">
                  No models yet. Create your first model!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main area - Model configuration */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-6">
          {selectedModel ? (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-1">
                  {selectedModel.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure your model parameters and select a dataset to begin
                  training.
                </p>
              </div>

              <div className="space-y-6">
                {/* Dataset selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Dataset
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {datasets.map((dataset) => (
                      <div
                        key={dataset.id}
                        onClick={() => setSelectedDataset(dataset.id)}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer transition-all",
                          selectedDataset === dataset.id
                            ? "border-neon-blue bg-neon-blue/5"
                            : "border-white/10 hover:border-neon-blue/30 hover:bg-neon-blue/5"
                        )}
                      >
                        <div className="font-medium text-sm text-white mb-1">
                          {dataset.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {dataset.id === "mnist" &&
                            "28x28 grayscale images of digits"}
                          {dataset.id === "cifar10" &&
                            "32x32 color images in 10 classes"}
                          {dataset.id === "fashion_mnist" &&
                            "28x28 grayscale images of clothing"}
                          {dataset.id === "imdb_reviews" &&
                            "Movie reviews for sentiment analysis"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hyperparameters */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Hyperparameters
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Learning Rate */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-xs text-muted-foreground">
                          Learning Rate
                        </label>
                        <span className="text-xs font-mono text-white">
                          {learningRate}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0.0001}
                        max={0.1}
                        step={0.0001}
                        value={learningRate}
                        onChange={(e) =>
                          setLearningRate(parseFloat(e.target.value))
                        }
                        className="w-full accent-neon-purple"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0.0001</span>
                        <span>0.1</span>
                      </div>
                    </div>

                    {/* Epochs */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-xs text-muted-foreground">
                          Epochs
                        </label>
                        <span className="text-xs font-mono text-white">
                          {epochs}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={50}
                        step={1}
                        value={epochs}
                        onChange={(e) => setEpochs(parseInt(e.target.value))}
                        className="w-full accent-neon-purple"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1</span>
                        <span>50</span>
                      </div>
                    </div>

                    {/* Batch Size */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-xs text-muted-foreground">
                          Batch Size
                        </label>
                        <span className="text-xs font-mono text-white">
                          {batchSize}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={8}
                        max={512}
                        step={8}
                        value={batchSize}
                        onChange={(e) => setBatchSize(parseInt(e.target.value))}
                        className="w-full accent-neon-purple"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>8</span>
                        <span>512</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Training button */}
                <div className="pt-4">
                  {isTraining ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Training in progress...
                        </span>
                        <span className="text-white">{trainingProgress}%</span>
                      </div>
                      <div className="h-2 bg-accent/40 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neon-purple rounded-full transition-all"
                          style={{ width: `${trainingProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleTrainModel}
                      disabled={!selectedModel}
                      className="w-full py-3 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
                    >
                      Train Model
                    </button>
                  )}
                </div>
              </div>

              {/* Results section */}
              {selectedModel.accuracy > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Training Results
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-panel rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="h-5 w-5 text-neon-purple" />
                        <h4 className="font-medium text-white">
                          Model Performance
                        </h4>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              Accuracy
                            </span>
                            <span className="text-white">
                              {(selectedModel.accuracy * 100).toFixed(2)}%
                            </span>
                          </div>
                          <div className="h-2 bg-accent/40 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neon-purple rounded-full"
                              style={{
                                width: `${selectedModel.accuracy * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 rounded bg-accent/20">
                            <div className="text-muted-foreground mb-1">
                              Dataset
                            </div>
                            <div className="font-medium text-white">
                              {
                                datasets
                                  .find((d) => d.id === selectedModel.dataset)
                                  ?.name.split(" ")[0]
                              }
                            </div>
                          </div>
                          <div className="p-2 rounded bg-accent/20">
                            <div className="text-muted-foreground mb-1">
                              Rating
                            </div>
                            <div className="font-medium text-white">
                              {selectedModel.accuracy >= 0.9
                                ? "Excellent"
                                : selectedModel.accuracy >= 0.8
                                ? "Good"
                                : selectedModel.accuracy >= 0.7
                                ? "Average"
                                : selectedModel.accuracy >= 0.6
                                ? "Fair"
                                : "Poor"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart2 className="h-5 w-5 text-neon-blue" />
                        <h4 className="font-medium text-white">
                          Hyperparameters
                        </h4>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Learning Rate
                          </span>
                          <span className="font-mono text-white">
                            {selectedModel.parameters.learningRate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Epochs</span>
                          <span className="font-mono text-white">
                            {selectedModel.parameters.epochs}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Batch Size
                          </span>
                          <span className="font-mono text-white">
                            {selectedModel.parameters.batchSize}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No Model Selected
              </h3>
              <p className="text-muted-foreground mb-6">
                Select a model from the list or create a new one to get started.
              </p>
              <button
                onClick={handleCreateModel}
                className="px-6 py-2 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
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
