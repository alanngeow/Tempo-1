import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertCircle,
  GitBranch,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress?: number;
  status?: string;
  statusColor?: "default" | "secondary" | "destructive" | "outline";
  onClick?: () => void;
}

const ModuleCard = ({
  title,
  description,
  icon,
  progress = 0,
  status = "",
  statusColor = "default",
  onClick = () => {},
}: ModuleCardProps) => {
  return (
    <Card
      className="h-full bg-white hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          {status && <Badge variant={statusColor}>{status}</Badge>}
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="ml-auto gap-1">
          Open <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

interface ModuleCardsProps {
  modules?: Array<{
    id: string;
    title: string;
    description: string;
    icon: keyof typeof moduleIcons;
    progress?: number;
    status?: string;
    statusColor?: "default" | "secondary" | "destructive" | "outline";
  }>;
  onModuleClick?: (moduleId: string) => void;
}

const moduleIcons = {
  document: <FileText className="h-5 w-5" />,
  audit: <AlertCircle className="h-5 w-5" />,
  process: <GitBranch className="h-5 w-5" />,
  supplier: <Users className="h-5 w-5" />,
  learning: <BookOpen className="h-5 w-5" />,
};

const defaultModules = [
  {
    id: "document-generator",
    title: "Smart Document Generator",
    description:
      "Create ISO 9001 compliant documentation tailored to your industry with AI assistance.",
    icon: "document",
    progress: 65,
    status: "In Progress",
    statusColor: "secondary",
  },
  {
    id: "audit-readiness",
    title: "Audit Readiness Dashboard",
    description:
      "Track compliance gaps and prepare for audits with simulated audit scenarios.",
    icon: "audit",
    progress: 42,
    status: "Attention Needed",
    statusColor: "destructive",
  },
  {
    id: "process-mapping",
    title: "Process Mapping Tool",
    description:
      "Create visual process maps with automatic ISO requirement connections.",
    icon: "process",
    progress: 78,
    status: "Updated",
    statusColor: "default",
  },
  {
    id: "supplier-management",
    title: "Supplier Management",
    description:
      "Monitor supplier certifications and generate compliance reports for audits.",
    icon: "supplier",
    progress: 90,
    status: "Complete",
    statusColor: "default",
  },
  {
    id: "learning-center",
    title: "Learning Center",
    description:
      "Access training modules and get real-time guidance from the AI Auditor chatbot.",
    icon: "learning",
    progress: 30,
    status: "New Content",
    statusColor: "outline",
  },
];

const ModuleCards: React.FC<ModuleCardsProps> = ({
  modules = defaultModules,
  onModuleClick = () => {},
}) => {
  return (
    <div className="bg-background p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Platform Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            description={module.description}
            icon={moduleIcons[module.icon]}
            progress={module.progress}
            status={module.status}
            statusColor={module.statusColor}
            onClick={() => onModuleClick(module.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleCards;
