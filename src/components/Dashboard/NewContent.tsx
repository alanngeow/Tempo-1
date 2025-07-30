import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Clock,
  Award,
  BookOpen,
  Video,
  MessageSquare,
  ArrowRight,
  Play,
  User,
  Users,
} from "lucide-react";

const NewContent = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-primary/10 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, John!</h2>
            <p className="text-muted-foreground">
              Your ISO 9001 certification journey is 65% complete. Here's what
              you need to focus on today.
            </p>
          </div>
          <Button>
            Continue Your Journey <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Certification Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Award className="mr-2 h-5 w-5 text-primary" />
            Your Certification Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Documentation</span>
                  </div>
                  <Badge>80%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  12 of 15 documents completed
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Implementation</span>
                  </div>
                  <Badge variant="secondary">60%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  6 of 10 processes implemented
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Audit Readiness</span>
                  </div>
                  <Badge variant="outline">45%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  3 of 8 audit areas prepared
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>Estimated completion: August 15, 2023</span>
              </div>
              <Button variant="outline" size="sm">
                View Detailed Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Learning Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recommended">
            <TabsList className="mb-4">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-16 w-16 bg-primary/10 rounded flex items-center justify-center">
                      <Video className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      ISO 9001 Documentation Essentials
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn how to create effective quality management
                      documentation
                    </p>
                    <div className="flex items-center">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Play className="h-3 w-3" /> Watch Now
                      </Button>
                      <span className="text-xs text-muted-foreground ml-2">
                        25 min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-16 w-16 bg-primary/10 rounded flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Internal Audit Preparation Guide
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Step-by-step guide to prepare for your first internal
                      audit
                    </p>
                    <div className="flex items-center">
                      <Button size="sm" variant="outline" className="gap-1">
                        Read Guide
                      </Button>
                      <span className="text-xs text-muted-foreground ml-2">
                        15 min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="link" className="gap-1">
                View All Resources <ArrowRight className="h-3 w-3" />
              </Button>
            </TabsContent>

            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border">
                  <CardContent className="p-4">
                    <div className="font-medium mb-1">
                      ISO 9001 Fundamentals
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      4 modules • 2 hours
                    </p>
                    <Progress value={30} className="h-1 mb-2" />
                    <Button size="sm" variant="outline" className="w-full">
                      Continue
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-4">
                    <div className="font-medium mb-1">Process Approach</div>
                    <p className="text-xs text-muted-foreground mb-2">
                      3 modules • 1.5 hours
                    </p>
                    <Progress value={0} className="h-1 mb-2" />
                    <Button size="sm" variant="outline" className="w-full">
                      Start
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-4">
                    <div className="font-medium mb-1">Risk Management</div>
                    <p className="text-xs text-muted-foreground mb-2">
                      5 modules • 3 hours
                    </p>
                    <Progress value={0} className="h-1 mb-2" />
                    <Button size="sm" variant="outline" className="w-full">
                      Start
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="webinars">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">
                      Preparing for External Audits
                    </h3>
                    <Badge>Upcoming</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Learn from certification experts about what to expect during
                    external audits
                  </p>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="text-muted-foreground">
                      July 15, 2023 • 2:00 PM EST
                    </span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">
                      Documenting Management Review
                    </h3>
                    <Badge variant="secondary">Recorded</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Best practices for conducting and documenting management
                    reviews
                  </p>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Play className="h-3 w-3" /> Watch Recording
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Consultant Support */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            Your Consultant Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="flex items-center mb-4">
                <div className="mr-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=consultant" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-medium">Sarah Chen</h3>
                  <p className="text-sm text-muted-foreground">
                    ISO 9001 Lead Consultant
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-1 mb-2">
                <MessageSquare className="h-4 w-4" /> Message
              </Button>
              <Button variant="outline" className="w-full gap-1">
                <Calendar className="h-4 w-4" /> Schedule Meeting
              </Button>
            </div>

            <div className="md:w-2/3 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
              <h3 className="font-medium mb-2">
                Next Steps from Your Consultant
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      Complete Process Documentation
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Focus on finalizing your core business processes
                      documentation
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Schedule Internal Audit</p>
                    <p className="text-sm text-muted-foreground">
                      Plan your first internal audit for early August
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Review Risk Assessment</p>
                    <p className="text-sm text-muted-foreground">
                      We'll review your risk assessment during our next meeting
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewContent;

// Import for Avatar component used in the consultant section
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
