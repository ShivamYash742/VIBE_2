import { useState } from "react";
import { useGame, Mission, MissionType } from "../contexts/GameContext";
import {
  Calendar,
  Clock,
  Award,
  CheckCircle,
  Gift,
  AlertCircle,
} from "lucide-react";

const MissionCard = ({ mission }: { mission: Mission }) => {
  const { updateMissionProgress, claimMissionReward } = useGame();

  // Format expiration date
  const formatExpirationTime = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();

    // If less than a day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      return `${hours}h ${minutes}m`;
    }

    // If more than a day
    const days = Math.floor(diff / 86400000);
    return `${days} day${days !== 1 ? "s" : ""}`;
  };

  // Calculate progress percentage
  const progressPercentage = Math.min(
    100,
    (mission.progress / mission.target) * 100
  );

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            {mission.type === "daily" ? (
              <Clock className="h-5 w-5 text-neon-blue" />
            ) : (
              <Calendar className="h-5 w-5 text-neon-purple" />
            )}
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/40">
              {mission.type === "daily" ? "Daily" : "Weekly"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>
              Expires in {formatExpirationTime(new Date(mission.expiresAt))}
            </span>
          </div>
        </div>

        <h4 className="text-lg font-semibold text-white mb-1">
          {mission.title}
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          {mission.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>
              {mission.progress}/{mission.target}
            </span>
          </div>
          <div className="h-2 bg-accent/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-neon-purple">
            <Award className="h-4 w-4" />
            <span className="font-medium">{mission.reward} coins</span>
          </div>

          {mission.status === "completed" ? (
            <button
              className="px-3 py-1.5 bg-neon-purple rounded-lg text-white text-sm font-medium flex items-center gap-1 hover:bg-neon-purple/90 transition-colors"
              onClick={() => claimMissionReward(mission.id)}
            >
              <Gift className="h-4 w-4" />
              Claim
            </button>
          ) : mission.status === "claimed" ? (
            <span className="px-3 py-1.5 bg-accent/40 rounded-lg text-white text-sm font-medium flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Claimed
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">In progress</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Missions = () => {
  const { missions } = useGame();
  const [activeTab, setActiveTab] = useState<MissionType>("daily");

  // Filter missions by type
  const filteredMissions = missions.filter(
    (mission) => mission.type === activeTab
  );

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-white/5">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Missions</h3>

          <div className="flex bg-accent/30 rounded-lg p-1">
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "daily"
                  ? "bg-neon-blue/20 text-neon-blue"
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => setActiveTab("daily")}
            >
              Daily
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "weekly"
                  ? "bg-neon-purple/20 text-neon-purple"
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => setActiveTab("weekly")}
            >
              Weekly
            </button>
          </div>
        </div>

        {filteredMissions.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No {activeTab} missions available
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-sm text-muted-foreground">
            Complete missions to earn coins and unlock rewards. Daily missions
            reset at midnight, while weekly missions reset every Sunday.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Missions;
