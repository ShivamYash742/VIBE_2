import { useState } from "react";
import { useGame } from "../contexts/GameContext";
import {
  Gamepad,
  Trophy,
  Target,
  Calendar,
  ShoppingBag,
  X,
  Coins,
  Award,
  CheckCircle,
} from "lucide-react";
import Missions from "./Missions";
import Store from "./Store";

type GameTab = "missions" | "store" | "achievements";

interface GameHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameHub = ({ isOpen, onClose }: GameHubProps) => {
  const [activeTab, setActiveTab] = useState<GameTab>("missions");
  const { currency, missions } = useGame();

  // Count completed missions
  const completedMissions = missions.filter(
    (m) => m.status === "completed" || m.status === "claimed"
  ).length;
  const totalMissions = missions.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-6xl glass-panel rounded-xl border border-white/10 shadow-xl animate-scale-in max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <Gamepad className="h-6 w-6 text-neon-purple" />
            <h2 className="text-2xl font-bold text-white">Game Hub</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
              <Coins className="h-4 w-4 text-neon-purple" />
              <span className="font-medium">{currency}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
              <CheckCircle className="h-4 w-4 text-neon-blue" />
              <span className="font-medium">
                {completedMissions}/{totalMissions}
              </span>
            </div>

            <button
              className="h-8 w-8 rounded-full bg-accent/40 flex items-center justify-center hover:bg-accent/60 transition-colors"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
              activeTab === "missions"
                ? "text-neon-blue border-b-2 border-neon-blue"
                : "text-muted-foreground hover:text-white"
            }`}
            onClick={() => setActiveTab("missions")}
          >
            <Calendar className="h-4 w-4" />
            Missions
          </button>
          <button
            className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
              activeTab === "store"
                ? "text-neon-purple border-b-2 border-neon-purple"
                : "text-muted-foreground hover:text-white"
            }`}
            onClick={() => setActiveTab("store")}
          >
            <ShoppingBag className="h-4 w-4" />
            Store
          </button>
          <button
            className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
              activeTab === "achievements"
                ? "text-neon-pink border-b-2 border-neon-pink"
                : "text-muted-foreground hover:text-white"
            }`}
            onClick={() => setActiveTab("achievements")}
          >
            <Trophy className="h-4 w-4" />
            Achievements
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "missions" && <Missions />}
          {activeTab === "store" && <Store />}
          {activeTab === "achievements" && (
            <div className="glass-panel rounded-xl overflow-hidden border border-white/5">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Achievements
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`glass-panel rounded-xl overflow-hidden border ${
                        i < 3 ? "border-white/10" : "border-white/5 opacity-50"
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div
                            className={`h-12 w-12 rounded-full flex items-center justify-center ${
                              i < 3 ? "bg-neon-purple/20" : "bg-accent/20"
                            }`}
                          >
                            {i === 0 ? (
                              <Target className="h-6 w-6 text-neon-purple" />
                            ) : i === 1 ? (
                              <Trophy className="h-6 w-6 text-neon-blue" />
                            ) : i === 2 ? (
                              <Award className="h-6 w-6 text-neon-pink" />
                            ) : (
                              <Award className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          {i < 3 && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent/40">
                              {i === 0 ? "+50" : i === 1 ? "+100" : "+200"}{" "}
                              coins
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg font-semibold text-white mb-1">
                          {i === 0
                            ? "First Steps"
                            : i === 1
                            ? "Quiz Champion"
                            : i === 2
                            ? "Knowledge Explorer"
                            : `Achievement ${i + 1}`}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {i === 0
                            ? "Complete your first quiz with a score of 80% or higher"
                            : i === 1
                            ? "Complete 10 quizzes with a perfect score"
                            : i === 2
                            ? "Try quizzes from all available categories"
                            : "This achievement is still locked"}
                        </p>

                        {i < 3 && (
                          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                            <div className="text-xs text-muted-foreground">
                              {i === 0
                                ? "Completed on May 15, 2023"
                                : i === 1
                                ? "Completed on June 2, 2023"
                                : "Completed on June 10, 2023"}
                            </div>
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameHub;
