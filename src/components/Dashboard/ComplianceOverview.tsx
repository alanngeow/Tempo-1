import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Calendar,
  ArrowRight,
  FileUp,
  Workflow,
} from "lucide-react";

interface ComplianceOverviewProps {
  complianceScore?: number;
  gapAnalysis?: {
    compliant: number;
    nonCompliant: number;
    partial: number;
  };
  upcomingAudits?: Array<{
    id: string;
    title: string;
    date: string;
    type: string;
  }>;
  complianceTrend?: Array<{
    month: string;
    score: number;
  }>;
}

const ComplianceOverview: React.FC<ComplianceOverviewProps> = ({
  complianceScore = 78,
  gapAnalysis = {
    compliant: 65,
    nonCompliant: 12,
    partial: 23,
  },
  upcomingAudits = [
    {
      id: "1",
      title: "Internal Audit - Q2",
      date: "2023-06-15",
      type: "internal",
    },
    {
      id: "2",
      title: "Certification Audit",
      date: "2023-07-22",
      type: "external",
    },
  ],
  complianceTrend = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 68 },
    { month: "Mar", score: 72 },
    { month: "Apr", score: 75 },
    { month: "May", score: 78 },
  ],
}) => {
  return (
    <div className="bg-white w-full p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Compliance Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Compliance Score Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Overall Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative h-36 w-36 flex items-center justify-center">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="10"
                    strokeDasharray={`${complianceScore * 2.51} 251`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span className="absolute text-3xl font-bold">
                  {complianceScore}%
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <div className="flex items-center justify-center gap-1">
                  <span
                    className={
                      complianceScore >= 75
                        ? "text-green-500"
                        : complianceScore >= 50
                          ? "text-amber-500"
                          : "text-red-500"
                    }
                  >
                    {complianceScore >= 75
                      ? "Good"
                      : complianceScore >= 50
                        ? "Needs Improvement"
                        : "Critical"}
                  </span>
                  <span>• Last updated: Today</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gap Analysis Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Compliant</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">{gapAnalysis.compliant}%</span>
                  <Progress
                    className="w-24 ml-2"
                    value={gapAnalysis.compliant}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                  <span>Partial</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">{gapAnalysis.partial}%</span>
                  <Progress className="w-24 ml-2" value={gapAnalysis.partial} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                  <span>Non-Compliant</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">
                    {gapAnalysis.nonCompliant}%
                  </span>
                  <Progress
                    className="w-24 ml-2"
                    value={gapAnalysis.nonCompliant}
                  />
                </div>
              </div>

              <Button variant="outline" className="w-full mt-2">
                View Detailed Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Audits Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Upcoming Audits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAudits.map((audit) => (
                <div
                  key={audit.id}
                  className="flex items-start justify-between border-b pb-3 last:border-0"
                >
                  <div>
                    <div className="font-medium">{audit.title}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(audit.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <Badge
                    variant={
                      audit.type === "internal" ? "secondary" : "default"
                    }
                  >
                    {audit.type === "internal" ? "Internal" : "External"}
                  </Badge>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                View All Audits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Trend Chart */}
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Compliance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[150px] w-full">
            <div className="flex items-end justify-between h-full w-full">
              {complianceTrend.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-primary w-12 rounded-t-md"
                    style={{ height: `${item.score}%` }}
                  ></div>
                  <span className="text-xs mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-4">
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Documentation
        </Button>
        <Button variant="outline">
          <Workflow className="mr-2 h-4 w-4" />
          Update Process Map
        </Button>
        <Button variant="outline">
          <FileUp className="mr-2 h-4 w-4" />
          Upload Evidence
        </Button>
      </div>
    </div>
  );
};

export default ComplianceOverview;
