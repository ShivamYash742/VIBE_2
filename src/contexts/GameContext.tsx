import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useUser } from "./UserContext";

// Types for missions
export type MissionType = "daily" | "weekly";
export type MissionStatus = "active" | "completed" | "claimed";

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: MissionType;
  reward: number;
  progress: number;
  target: number;
  status: MissionStatus;
  expiresAt: Date;
}

// Types for store items
export type ItemCategory = "avatar" | "theme" | "badge" | "certificate";

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ItemCategory;
  image: string;
  owned: boolean;
}

// Interface for the context value
interface GameContextType {
  // Currency
  currency: number;
  addCurrency: (amount: number) => void;
  spendCurrency: (amount: number) => boolean;

  // Missions
  missions: Mission[];
  updateMissionProgress: (missionId: string, progress: number) => void;
  claimMissionReward: (missionId: string) => void;

  // Store
  storeItems: StoreItem[];
  purchaseItem: (itemId: string) => boolean;
  ownedItems: string[];
}

// Create the context with undefined as default value
const GameContext = createContext<GameContextType | undefined>(undefined);

// Sample missions data
const sampleDailyMissions: Mission[] = [
  {
    id: "daily-1",
    title: "Quiz Master",
    description: "Complete 3 quizzes today",
    type: "daily",
    reward: 50,
    progress: 0,
    target: 3,
    status: "active",
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)),
  },
  {
    id: "daily-2",
    title: "Perfect Score",
    description: "Get 100% on any quiz",
    type: "daily",
    reward: 100,
    progress: 0,
    target: 1,
    status: "active",
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)),
  },
];

const sampleWeeklyMissions: Mission[] = [
  {
    id: "weekly-1",
    title: "Knowledge Explorer",
    description: "Complete quizzes in 3 different categories",
    type: "weekly",
    reward: 200,
    progress: 0,
    target: 3,
    status: "active",
    expiresAt: new Date(
      new Date().setDate(new Date().getDate() + (7 - new Date().getDay()))
    ),
  },
  {
    id: "weekly-2",
    title: "Consistent Learner",
    description: "Complete at least one quiz for 5 days this week",
    type: "weekly",
    reward: 300,
    progress: 0,
    target: 5,
    status: "active",
    expiresAt: new Date(
      new Date().setDate(new Date().getDate() + (7 - new Date().getDay()))
    ),
  },
];

// Sample store items
const sampleStoreItems: StoreItem[] = [
  {
    id: "avatar-1",
    name: "Scientist Avatar",
    description: "Show your love for science with this cool avatar",
    price: 200,
    category: "avatar",
    image: "https://i.pravatar.cc/150?img=1",
    owned: false,
  },
  {
    id: "avatar-2",
    name: "Tech Guru Avatar",
    description: "Perfect for tech enthusiasts",
    price: 200,
    category: "avatar",
    image: "https://i.pravatar.cc/150?img=2",
    owned: false,
  },
  {
    id: "theme-1",
    name: "Dark Nebula Theme",
    description: "A space-themed UI for your profile",
    price: 300,
    category: "theme",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&h=300&q=80",
    owned: false,
  },
  {
    id: "badge-1",
    name: "Quiz Champion Badge",
    description: "Show off your quiz mastery",
    price: 500,
    category: "badge",
    image: "https://via.placeholder.com/150",
    owned: false,
  },
  {
    id: "certificate-1",
    name: "Advanced Learner Certificate",
    description: "A certificate to showcase your dedication to learning",
    price: 1000,
    category: "certificate",
    image: "https://via.placeholder.com/150",
    owned: false,
  },
];

// GameProvider component that wraps the app and provides the game context
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [currency, setCurrency] = useState<number>(user?.points || 0);
  const [missions, setMissions] = useState<Mission[]>([
    ...sampleDailyMissions,
    ...sampleWeeklyMissions,
  ]);
  const [storeItems, setStoreItems] = useState<StoreItem[]>(sampleStoreItems);
  const [ownedItems, setOwnedItems] = useState<string[]>([]);

  // Update user points when currency changes
  useEffect(() => {
    if (user) {
      // In a real app, you would update the user's points in the database
      console.log(`User points updated to ${currency}`);
    }
  }, [currency, user]);

  // Reset daily missions at midnight
  useEffect(() => {
    const resetDailyMissions = () => {
      setMissions((prevMissions) => {
        return prevMissions.map((mission) => {
          if (mission.type === "daily") {
            return {
              ...mission,
              progress: 0,
              status: "active",
              expiresAt: new Date(new Date().setHours(23, 59, 59, 999)),
            };
          }
          return mission;
        });
      });
    };

    // Check for expired missions every minute
    const interval = setInterval(() => {
      const now = new Date();
      const expiredMissions = missions.filter(
        (mission) =>
          mission.status === "active" && new Date(mission.expiresAt) < now
      );

      if (expiredMissions.length > 0) {
        resetDailyMissions();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [missions]);

  // Add currency
  const addCurrency = (amount: number) => {
    setCurrency((prev) => prev + amount);
  };

  // Spend currency
  const spendCurrency = (amount: number): boolean => {
    if (currency >= amount) {
      setCurrency((prev) => prev - amount);
      return true;
    }
    return false;
  };

  // Update mission progress
  const updateMissionProgress = (missionId: string, progress: number) => {
    setMissions((prevMissions) => {
      return prevMissions.map((mission) => {
        if (mission.id === missionId && mission.status === "active") {
          const newProgress = Math.min(
            mission.progress + progress,
            mission.target
          );
          const newStatus =
            newProgress >= mission.target ? "completed" : "active";

          return {
            ...mission,
            progress: newProgress,
            status: newStatus,
          };
        }
        return mission;
      });
    });
  };

  // Claim mission reward
  const claimMissionReward = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);

    if (mission && mission.status === "completed") {
      addCurrency(mission.reward);

      setMissions((prevMissions) => {
        return prevMissions.map((m) => {
          if (m.id === missionId) {
            return {
              ...m,
              status: "claimed",
            };
          }
          return m;
        });
      });
    }
  };

  // Purchase item
  const purchaseItem = (itemId: string): boolean => {
    const item = storeItems.find((item) => item.id === itemId);

    if (item && !item.owned) {
      const success = spendCurrency(item.price);

      if (success) {
        setStoreItems((prevItems) => {
          return prevItems.map((i) => {
            if (i.id === itemId) {
              return {
                ...i,
                owned: true,
              };
            }
            return i;
          });
        });

        setOwnedItems((prev) => [...prev, itemId]);
        return true;
      }
    }

    return false;
  };

  return (
    <GameContext.Provider
      value={{
        currency,
        addCurrency,
        spendCurrency,
        missions,
        updateMissionProgress,
        claimMissionReward,
        storeItems,
        purchaseItem,
        ownedItems,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
