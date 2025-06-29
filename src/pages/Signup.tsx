import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Loader2, ArrowLeft } from "lucide-react";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("student");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [field, setField] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useUser();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);

      // Mock user data - ensure role is properly typed as "student" | "recruiter"
      const userData = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name: `${firstName} ${lastName}`,
        email,
        role:
          userType === "student"
            ? ("student" as const)
            : ("recruiter" as const),
        field: userType === "student" ? field : undefined,
        points: userType === "student" ? 0 : undefined,
        company: userType === "recruiter" ? company : undefined,
      };

      // Update context
      login(userData);

      toast({
        title: "Account created!",
        description: "You've been successfully registered.",
      });

      // Redirect based on user type
      if (userType === "student") {
        navigate("/");
      } else {
        navigate("/leaderboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-hero-pattern bg-cover bg-center flex items-center justify-center p-4 py-12 px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-neon-purple hover:text-neon-purple/90"
            >
              Sign in
            </Link>
          </p>
        </div>

        <Tabs
          defaultValue="student"
          onValueChange={setUserType}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full mb-8">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
          </TabsList>

          <Card className="border-accent bg-card/60 backdrop-blur-sm">
            <form onSubmit={handleSignup}>
              <CardHeader>
                <CardTitle>
                  Sign Up as {userType === "student" ? "Student" : "Recruiter"}
                </CardTitle>
                <CardDescription>
                  {userType === "student"
                    ? "Create an account to access all courses and features"
                    : "Sign up to find top talent for your organization"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {userType === "student" ? (
                  <div className="space-y-2">
                    <Label htmlFor="field">Field of Study</Label>
                    <Select value={field} onValueChange={setField}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">
                          Computer Science
                        </SelectItem>
                        <SelectItem value="data-science">
                          Data Science
                        </SelectItem>
                        <SelectItem value="ai-ml">
                          AI & Machine Learning
                        </SelectItem>
                        <SelectItem value="web-development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="cybersecurity">
                          Cybersecurity
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Acme Inc."
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        placeholder="Tech Recruiter"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default Signup;
