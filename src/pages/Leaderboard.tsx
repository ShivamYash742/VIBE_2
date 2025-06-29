import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  topStudents,
  getStudentsByField,
  getAllFields,
  Student,
} from "@/lib/leaderboardData";
import {
  Trophy,
  Medal,
  Search,
  Filter,
  ArrowUpDown,
  Mail,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";

const Leaderboard = () => {
  const [selectedField, setSelectedField] = useState("All Fields");
  const [filteredStudents, setFilteredStudents] =
    useState<Student[]>(topStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"leaderboard" | "recruiter">(
    "leaderboard"
  );
  const { user } = useUser();
  const allFields = ["All Fields", ...getAllFields()];

  // Effect to filter students based on selected field and search query
  useEffect(() => {
    let students =
      selectedField === "All Fields"
        ? [...topStudents]
        : getStudentsByField(selectedField);

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      students = students.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    students = students.sort((a, b) => {
      const comparison =
        sortDirection === "desc" ? b.points - a.points : a.points - b.points;
      return comparison;
    });

    setFilteredStudents(students);
  }, [selectedField, searchQuery, sortDirection]);

  // Automatically switch to recruiter view if user is a recruiter
  useEffect(() => {
    if (user?.role === "recruiter") {
      setViewMode("recruiter");
    }
  }, [user]);

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {viewMode === "leaderboard" ? "Leaderboard" : "Talent Explorer"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {viewMode === "leaderboard"
                  ? "See how you rank among other students"
                  : "Find top talent for your organization"}
              </p>
            </div>

            {user?.role === "recruiter" || user?.role === "student" ? (
              <Tabs
                value={viewMode}
                onValueChange={(value) =>
                  setViewMode(value as "leaderboard" | "recruiter")
                }
              >
                <TabsList>
                  <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                  {(user?.role === "recruiter" || !user) && (
                    <TabsTrigger value="recruiter">Recruiter View</TabsTrigger>
                  )}
                </TabsList>
              </Tabs>
            ) : null}
          </div>

          <Card className="bg-card/60 backdrop-blur-sm border-accent">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>
                    {viewMode === "leaderboard"
                      ? "Top Students"
                      : "Talent Pool"}
                  </CardTitle>
                  <CardDescription>
                    {viewMode === "leaderboard"
                      ? "Students ranked by points earned from courses and quizzes"
                      : "Find skilled students for your hiring needs"}
                  </CardDescription>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search by name or skill"
                      className="pl-10 pr-4 py-2 bg-accent rounded-md text-white w-full sm:w-[200px] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Select
                    value={selectedField}
                    onValueChange={setSelectedField}
                  >
                    <SelectTrigger className="bg-accent w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by field" />
                    </SelectTrigger>
                    <SelectContent>
                      {allFields.map((field) => (
                        <SelectItem key={field} value={field}>
                          {field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setSortDirection(
                        sortDirection === "desc" ? "asc" : "desc"
                      )
                    }
                    className="h-10 w-10"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {filteredStudents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No students found matching your criteria
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {viewMode === "leaderboard" ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-accent">
                            <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                              Rank
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                              Student
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                              Field
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                              Points
                            </th>
                            <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                              Badges
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredStudents.map((student, index) => (
                            <tr
                              key={student.id}
                              className="border-b border-accent/50 hover:bg-accent/10"
                            >
                              <td className="px-4 py-4 text-center">
                                {index === 0 ? (
                                  <Trophy className="h-6 w-6 text-yellow-500 mx-auto" />
                                ) : index === 1 ? (
                                  <Trophy className="h-6 w-6 text-gray-300 mx-auto" />
                                ) : index === 2 ? (
                                  <Trophy className="h-6 w-6 text-amber-700 mx-auto" />
                                ) : (
                                  <span className="text-muted-foreground">
                                    {index + 1}
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage
                                      src={student.avatar}
                                      alt={student.name}
                                    />
                                    <AvatarFallback>
                                      {getInitials(student.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-white">
                                      {student.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {student.skills.slice(0, 2).join(", ")}
                                      {student.skills.length > 2 && "..."}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <Badge
                                  variant="outline"
                                  className="font-normal"
                                >
                                  {student.field}
                                </Badge>
                              </td>
                              <td className="px-4 py-4">
                                <div className="space-y-1">
                                  <div className="font-medium">
                                    {student.points.toLocaleString()}
                                  </div>
                                  <Progress
                                    value={student.points / 100}
                                    className="h-1"
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex gap-1">
                                  {student.badges.map((badge, i) => (
                                    <Badge
                                      key={i}
                                      variant="secondary"
                                      className="bg-primary/20 text-primary-foreground"
                                    >
                                      {badge.name}
                                    </Badge>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredStudents.map((student) => (
                        <Card
                          key={student.id}
                          className="bg-accent/20 border-accent/50 overflow-hidden"
                        >
                          <div className="flex justify-between items-start p-6">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={student.avatar}
                                  alt={student.name}
                                />
                                <AvatarFallback>
                                  {getInitials(student.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-white">
                                  {student.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {student.field}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-primary/20 text-primary-foreground"
                            >
                              Rank #{student.rank}
                            </Badge>
                          </div>

                          <div className="p-6 pt-0 space-y-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">
                                Skills
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {student.skills.map((skill, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="bg-accent/30"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div className="bg-accent/30 rounded-md p-2">
                                <p className="text-xl font-semibold">
                                  {student.points}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Points
                                </p>
                              </div>
                              <div className="bg-accent/30 rounded-md p-2">
                                <p className="text-xl font-semibold">
                                  {student.projects}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Projects
                                </p>
                              </div>
                              <div className="bg-accent/30 rounded-md p-2">
                                <p className="text-xl font-semibold">
                                  {student.quizzes}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Quizzes
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button size="sm" className="w-full gap-1">
                                <Mail className="h-4 w-4" />
                                Contact
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full gap-1"
                              >
                                <UserPlus className="h-4 w-4" />
                                Save
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
