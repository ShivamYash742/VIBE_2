import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Student } from "@/lib/leaderboardData";
import { useUser } from "@/contexts/UserContext";
import { Award, BookOpen, CheckCheck, Clock, Star, TrendingUp } from "lucide-react";

// Import topStudents from leaderboardData
import { topStudents } from "@/lib/leaderboardData";

interface StudentProfileProps {
  student: Student;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student }) => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("profile");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="bg-card/60 backdrop-blur-sm border-accent">
      <CardHeader className="flex flex-col items-center pb-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4 text-2xl font-bold">{student.name}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {student.field} | Rank #{student.rank}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">About Me</h3>
              <p className="text-muted-foreground">
                {student.bio || "No bio available."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/20 text-primary-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Courses Completed</span>
                  <span className="text-sm">{student.coursesCompleted}</span>
                </div>
                <Progress value={(student.coursesCompleted / 10) * 100} />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Quizzes Passed</span>
                  <span className="text-sm">{student.quizzesPassed}</span>
                </div>
                <Progress value={(student.quizzesPassed / 15) * 100} />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Points Earned</span>
                  <span className="text-sm">{student.points.toLocaleString()}</span>
                </div>
                <Progress value={(student.points / 1500) * 100} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Badges</h3>
              <div className="flex flex-wrap gap-3">
                {student.badges.map((badge, index) => (
                  <Badge key={index} variant="outline">
                    {badge.name}
                  </Badge>
                ))}
              </div>

              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Completed "Introduction to React" course
                  <Clock className="h-4 w-4 ml-auto text-muted-foreground" />
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-secondary" />
                  Scored 95% on "JavaScript Fundamentals" quiz
                  <Clock className="h-4 w-4 ml-auto text-muted-foreground" />
                </li>
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-green-500" />
                  Earned "Problem Solver" badge
                  <Clock className="h-4 w-4 ml-auto text-muted-foreground" />
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">View Full Profile</Button>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Joined {student.joinDate}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentProfile;
