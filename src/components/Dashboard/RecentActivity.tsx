import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  BookOpen,
  Calendar,
} from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  module: "document" | "audit" | "process" | "supplier" | "learning";
  status?: "completed" | "pending" | "warning";
  user?: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
  maxItems?: number;
}

const getModuleIcon = (module: string) => {
  switch (module) {
    case "document":
      return <FileText className="h-4 w-4" />;
    case "audit":
      return <CheckCircle className="h-4 w-4" />;
    case "process":
      return <Calendar className="h-4 w-4" />;
    case "supplier":
      return <Users className="h-4 w-4" />;
    case "learning":
      return <BookOpen className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusBadge = (status?: string) => {
  if (!status) return null;

  switch (status) {
    case "completed":
      return (
        <Badge variant="secondary" className="ml-2">
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="ml-2">
          Pending
        </Badge>
      );
    case "warning":
      return (
        <Badge variant="destructive" className="ml-2">
          Action Required
        </Badge>
      );
    default:
      return null;
  }
};

const RecentActivity = ({
  activities = defaultActivities,
  maxItems = 10,
}: RecentActivityProps) => {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[180px] pr-4">
          <div className="space-y-4">
            {displayActivities.map((activity, index) => (
              <div key={activity.id} className="relative">
                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background mr-3">
                    {getModuleIcon(activity.module)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium leading-none">
                        {activity.title}
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{activity.timestamp}</span>
                      {activity.user && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{activity.user}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {index < displayActivities.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Default mock data
const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    title: "Quality Manual updated",
    timestamp: "10 minutes ago",
    module: "document",
    status: "completed",
    user: "Sarah Johnson",
  },
  {
    id: "2",
    title: "Internal Audit scheduled for Manufacturing",
    timestamp: "1 hour ago",
    module: "audit",
    status: "pending",
    user: "Michael Chen",
  },
  {
    id: "3",
    title: "Supplier certification expiring soon",
    timestamp: "3 hours ago",
    module: "supplier",
    status: "warning",
    user: "System Alert",
  },
  {
    id: "4",
    title: "Process Map for Production updated",
    timestamp: "5 hours ago",
    module: "process",
    status: "completed",
    user: "David Wilson",
  },
  {
    id: "5",
    title: 'Training module "ISO 9001:2015 Basics" completed',
    timestamp: "Yesterday",
    module: "learning",
    status: "completed",
    user: "Emily Rodriguez",
  },
  {
    id: "6",
    title: "Non-conformity report filed",
    timestamp: "Yesterday",
    module: "audit",
    status: "warning",
    user: "Robert Taylor",
  },
  {
    id: "7",
    title: "New supplier added to database",
    timestamp: "2 days ago",
    module: "supplier",
    status: "completed",
    user: "Jennifer Lee",
  },
];

export default RecentActivity;
