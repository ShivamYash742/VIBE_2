
import { createContext, useState, useContext, ReactNode } from "react";

// Define the allowed user roles as a union type
type UserRole = "student" | "recruiter" | null;

// Interface for user data
interface UserData {
  id?: string;
  name?: string;
  email?: string;
  role?: UserRole;
  field?: string;
  points?: number;
  company?: string;
}

// Interface for the context value
interface UserContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
}

// Create the context with undefined as default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component that wraps the app and provides the user context
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const isAuthenticated = !!user;

  const login = (userData: UserData) => {
    setUser(userData);
    // You could save to localStorage here for persistence
  };

  const logout = () => {
    setUser(null);
    // Clean up localStorage if needed
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
