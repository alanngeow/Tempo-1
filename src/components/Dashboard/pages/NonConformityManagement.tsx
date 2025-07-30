import React, { useState } from "react";
import {
  AlertTriangle,
  Bot,
  Send,
  Plus,
  Filter,
  Download,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Lightbulb,
  BarChart3,
  Search,
  User,
  Edit,
  Save,
  X,
  Eye,
  Bell,
  FileText,
  Calendar,
  Users,
  Paperclip,
  History,
  CheckSquare,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface CapaWorkflowStep {
  id: string;
  stepNumber: number;
  title: string;
  status: "Not Started" | "In Progress" | "Completed";
  completedDate?: string;
  data?: any;
}

interface CapaEvaluation {
  qualityImpact: "Low" | "Medium" | "High";
  costImpact: "Low" | "Medium" | "High";
  timelineImpact: "Low" | "Medium" | "High";
  riskLevel: "Low" | "Medium" | "High";
  notes?: string;
}

interface CapaInvestigation {
  objective: string;
  investigativeSteps: string[];
  timeline: string;
  responsibleParties: string[];
  requiredResources: string[];
}

interface CapaRootCause {
  method: "Fishbone" | "5-Why" | "Fault Tree" | "Other";
  categories: {
    people?: string[];
    process?: string[];
    equipment?: string[];
    materials?: string[];
    environment?: string[];
    methods?: string[];
  };
  primaryCause: string;
  contributingFactors: string[];
  fiveWhys?: {
    problem: string;
    whys: {
      question: string;
      answer: string;
    }[];
  };
  fishbone?: {
    problem: string;
    categories: {
      people: string[];
      process: string[];
      equipment: string[];
      materials: string[];
      environment: string[];
      methods: string[];
    };
  };
}

interface CapaActionPlan {
  objectives: string;
  actions: {
    id: string;
    description: string;
    owner: string;
    dueDate: string;
    status: "Not Started" | "In Progress" | "Completed";
  }[];
  resources: string[];
  timeline: string;
  successCriteria: string[];
}

interface CapaImplementation {
  implementationPlan: string;
  milestones: {
    id: string;
    description: string;
    dueDate: string;
    status: "Not Started" | "In Progress" | "Completed";
  }[];
  actualStartDate?: string;
  actualEndDate?: string;
  challenges?: string;
  lessons?: string;
}

interface CapaVerification {
  verificationMethod: string;
  effectivenessCriteria: string[];
  measurementPlan: string;
  verificationDate?: string;
  results?: string;
  isEffective?: boolean;
  followUpActions?: string[];
}

interface CapaAction {
  id: string;
  name: string;
  description: string;
  owner: string;
  department: string;
  dueDate: string;
  status: "Open" | "In Progress" | "Completed" | "Overdue";
  priority: "Low" | "Medium" | "High";
  completedDate?: string;
  comments?: string;
  currentStep: number;
  workflowSteps: CapaWorkflowStep[];
  evaluation?: CapaEvaluation;
  investigation?: CapaInvestigation;
  rootCause?: CapaRootCause;
  actionPlan?: CapaActionPlan;
  implementation?: CapaImplementation;
  verification?: CapaVerification;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: "comment" | "status_change" | "assignment";
}

interface AuditLogEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

interface NonConformity {
  id: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Pending QA" | "Closed";
  department: string;
  reportedBy: string;
  assignedTo?: string;
  reportedDate: string;
  dueDate: string;
  rootCause?: string;
  capaActions?: CapaAction[];
  comments?: Comment[];
  auditLog?: AuditLogEntry[];
  attachments?: string[];
  qaApprover?: string;
  qaApprovalDate?: string;
}

const NonConformityManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI assistant for Non-Conformity Management. I can help you analyze NC trends, suggest root causes, recommend CAPA actions, and answer questions about your quality data. How can I assist you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedNC, setSelectedNC] = useState<NonConformity | null>(null);
  const [isNewNCDialogOpen, setIsNewNCDialogOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [editingRootCause, setEditingRootCause] = useState<string | null>(null);
  const [editingCapaAction, setEditingCapaAction] = useState<string | null>(
    null,
  );
  const [newComment, setNewComment] = useState("");
  const [newCapaAction, setNewCapaAction] = useState({
    name: "",
    description: "",
    owner: "",
    department: "",
    dueDate: "",
    priority: "Medium" as "Low" | "Medium" | "High",
  });
  const [activeCapaStep, setActiveCapaStep] = useState<number>(1);
  const [selectedCapaAction, setSelectedCapaAction] =
    useState<CapaAction | null>(null);
  const [isCapaWorkflowOpen, setIsCapaWorkflowOpen] = useState(false);
  const [selectedCapaStep, setSelectedCapaStep] =
    useState<CapaWorkflowStep | null>(null);
  const [isCapaStepDialogOpen, setIsCapaStepDialogOpen] = useState(false);
  const [archivedCapaActions, setArchivedCapaActions] = useState<CapaAction[]>(
    [],
  );
  const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);
  const [pendingArchiveCapa, setPendingArchiveCapa] = useState<{
    capaId: string;
    capaAction: CapaAction;
  } | null>(null);

  const [newNCForm, setNewNCForm] = useState({
    title: "",
    description: "",
    severity: "",
    department: "",
    dueDate: "",
    assignedTo: "",
  });
  const [nonConformitiesList, setNonConformitiesList] = useState<
    NonConformity[]
  >([]);
  const [notifications, setNotifications] = useState<
    { id: string; message: string; type: "info" | "warning" | "error" }[]
  >([]);

  // Sample users data
  const users: User[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Quality Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Production Supervisor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@company.com",
      role: "QA Inspector",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
    {
      id: "4",
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      role: "Process Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    },
  ];

  // Default CAPA workflow steps
  const defaultCapaWorkflowSteps: Omit<CapaWorkflowStep, "id">[] = [
    {
      stepNumber: 1,
      title: "CAPA Creation",
      status: "Completed",
    },
    {
      stepNumber: 2,
      title: "Evaluation",
      status: "Not Started",
    },
    {
      stepNumber: 3,
      title: "Investigation Procedure",
      status: "Not Started",
    },
    {
      stepNumber: 4,
      title: "Root Cause Analysis",
      status: "Not Started",
    },
    {
      stepNumber: 5,
      title: "Action Plan",
      status: "Not Started",
    },
    {
      stepNumber: 6,
      title: "Implementation",
      status: "Not Started",
    },
    {
      stepNumber: 7,
      title: "Verify Effectiveness",
      status: "Not Started",
    },
  ];

  // Initialize sample data and handle URL hash navigation
  React.useEffect(() => {
    setNonConformitiesList(sampleNonConformities);
    // Simulate notifications
    setNotifications([
      {
        id: "1",
        message: "NC-2024-002 is overdue and requires immediate attention",
        type: "error",
      },
      {
        id: "2",
        message: "You have been assigned to NC-2024-001",
        type: "info",
      },
      {
        id: "3",
        message: "CAPA action due tomorrow for NC-2024-003",
        type: "warning",
      },
    ]);

    // Handle URL hash navigation for CAPA shortcut
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      if (hash === "capa") {
        // Find the first NC with CAPA actions to display
        const ncWithCapa = sampleNonConformities.find(
          (nc) => nc.capaActions && nc.capaActions.length > 0,
        );
        if (ncWithCapa) {
          setSelectedNC(ncWithCapa);
          setIsDetailViewOpen(true);
          setActiveTab("capa");
        }
      }
    };

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Sample data with enhanced structure
  const sampleNonConformities: NonConformity[] = [
    {
      id: "NC-2024-001",
      title: "Product Dimension Out of Tolerance",
      description:
        "Product batch #A123 shows dimensions 0.5mm outside specified tolerance range",
      severity: "High",
      status: "In Progress",
      department: "Production Line 3",
      reportedBy: "John Smith",
      assignedTo: "Sarah Johnson",
      reportedDate: "2024-01-15",
      dueDate: "2024-01-29",
      rootCause: "Calibration drift in measuring equipment",
      capaActions: [
        {
          id: "capa-1",
          name: "Equipment Calibration CAPA",
          description:
            "Recalibrate measuring equipment and implement preventive measures",
          owner: "Mike Davis",
          department: "Production Line 3",
          dueDate: "2024-01-22",
          status: "Completed",
          priority: "High",
          completedDate: "2024-01-21",
          comments:
            "Calibration completed successfully. Equipment now within tolerance.",
          currentStep: 7,
          workflowSteps: defaultCapaWorkflowSteps.map((step, index) => ({
            ...step,
            id: `step-completed-${index}`,
            status: "Completed",
            completedDate: "2024-01-21",
          })),
        },
        {
          id: "capa-2",
          name: "Daily Calibration Process CAPA",
          description:
            "Implement daily calibration checks and monitoring system",
          owner: "Sarah Johnson",
          department: "Production Line 3",
          dueDate: "2024-01-25",
          status: "In Progress",
          priority: "Medium",
          currentStep: 4,
          workflowSteps: defaultCapaWorkflowSteps.map((step, index) => ({
            ...step,
            id: `step-progress-${index}`,
            status: step.stepNumber <= 3 ? "Completed" : "Not Started",
            completedDate: step.stepNumber <= 3 ? "2024-01-20" : undefined,
          })),
        },
      ],
      comments: [
        {
          id: "comment-1",
          author: "John Smith",
          content: "Initial investigation shows equipment calibration issue.",
          timestamp: "2024-01-15T10:30:00Z",
          type: "comment",
        },
        {
          id: "comment-2",
          author: "System",
          content: "NC assigned to Sarah Johnson",
          timestamp: "2024-01-15T11:00:00Z",
          type: "assignment",
        },
      ],
      auditLog: [
        {
          id: "audit-1",
          action: "NC Created",
          user: "John Smith",
          timestamp: "2024-01-15T09:00:00Z",
          details: "Non-conformity report created",
        },
        {
          id: "audit-2",
          action: "Assigned",
          user: "John Smith",
          timestamp: "2024-01-15T11:00:00Z",
          details: "Assigned to Sarah Johnson",
        },
      ],
      attachments: ["measurement_report.pdf", "calibration_certificate.pdf"],
    },
    {
      id: "NC-2024-002",
      title: "Supplier Material Non-Compliance",
      description:
        "Raw material from Supplier ABC does not meet chemical composition requirements",
      severity: "Critical",
      status: "Open",
      department: "Incoming Inspection",
      reportedBy: "Sarah Johnson",
      assignedTo: "Mike Davis",
      reportedDate: "2024-01-18",
      dueDate: "2024-01-25",
      capaActions: [],
      comments: [],
      auditLog: [
        {
          id: "audit-1",
          action: "NC Created",
          user: "Sarah Johnson",
          timestamp: "2024-01-18T14:30:00Z",
          details: "Critical non-conformity reported",
        },
      ],
      attachments: ["material_analysis.pdf"],
    },
    {
      id: "NC-2024-003",
      title: "Documentation Missing Signatures",
      description:
        "Quality control records missing required supervisor signatures",
      severity: "Medium",
      status: "Pending QA",
      department: "Quality Control",
      reportedBy: "Mike Davis",
      assignedTo: "Lisa Wang",
      reportedDate: "2024-01-10",
      dueDate: "2024-01-17",
      rootCause: "Unclear signature requirements in procedure",
      capaActions: [
        {
          id: "capa-4",
          name: "Documentation Procedure CAPA",
          description: "Update procedure with clear signature requirements",
          owner: "Lisa Wang",
          department: "Quality Control",
          dueDate: "2024-01-20",
          status: "Completed",
          priority: "High",
          completedDate: "2024-01-19",
          currentStep: 7,
          workflowSteps: defaultCapaWorkflowSteps.map((step, index) => ({
            ...step,
            id: `step-doc-${index}`,
            status: "Completed",
            completedDate: "2024-01-19",
          })),
        },
      ],
      qaApprover: "John Smith",
      comments: [
        {
          id: "comment-3",
          author: "Lisa Wang",
          content: "All CAPA actions completed. Ready for QA approval.",
          timestamp: "2024-01-24T16:00:00Z",
          type: "comment",
        },
      ],
      auditLog: [
        {
          id: "audit-3",
          action: "Status Changed",
          user: "Lisa Wang",
          timestamp: "2024-01-24T16:00:00Z",
          details: "Status changed to Pending QA",
        },
      ],
      attachments: ["updated_procedure.pdf", "training_records.pdf"],
    },
  ];

  const weeklyStats = {
    totalNCs: 12,
    openNCs: 8,
    closedThisWeek: 4,
    overdue: 2,
    pendingQA: 1,
    highRiskAreas: [
      "Production Line 3",
      "Supplier Management",
      "Documentation Control",
    ],
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: chatInput,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "";
      const input = chatInput.toLowerCase();

      if (input.includes("line 3") || input.includes("production")) {
        aiResponse =
          "Based on your data, Production Line 3 has had 3 non-conformities this month: 2 related to dimensional tolerances and 1 equipment calibration issue. The main pattern I see is measurement-related problems. I recommend implementing daily calibration checks and additional operator training.";
      } else if (input.includes("supplier") || input.includes("vendor")) {
        aiResponse =
          "Supplier ABC has caused 2 critical non-conformities in the last quarter - both related to material composition. I recommend conducting a supplier audit and implementing incoming material testing protocols. Would you like me to generate a supplier performance report?";
      } else if (input.includes("root cause") || input.includes("analysis")) {
        aiResponse =
          "For similar dimensional tolerance issues, common root causes include: 1) Equipment calibration drift (60% of cases), 2) Operator technique variations (25%), 3) Environmental factors like temperature (15%). I suggest starting with calibration verification.";
      } else if (input.includes("capa") || input.includes("corrective")) {
        aiResponse =
          "Based on similar cases, I recommend these CAPA actions: 1) Immediate containment - quarantine affected products, 2) Root cause analysis using 5-Why method, 3) Implement preventive measures like enhanced monitoring, 4) Verify effectiveness through follow-up audits.";
      } else {
        aiResponse =
          "I can help you with NC trend analysis, root cause suggestions, CAPA recommendations, and answering specific questions about your quality data. Try asking about specific production lines, suppliers, or time periods for more detailed insights.";
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  // Filter non-conformities based on search and filters
  const filteredNonConformities = nonConformitiesList.filter((nc) => {
    const matchesSearch =
      nc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nc.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      nc.status.toLowerCase().replace(" ", "-") === statusFilter;
    const matchesSeverity =
      severityFilter === "all" || nc.severity.toLowerCase() === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const handleCreateNC = () => {
    if (
      !newNCForm.title ||
      !newNCForm.description ||
      !newNCForm.severity ||
      !newNCForm.department ||
      !newNCForm.dueDate
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newNC: NonConformity = {
      id: `NC-2024-${String(nonConformitiesList.length + 1).padStart(3, "0")}`,
      title: newNCForm.title,
      description: newNCForm.description,
      severity: newNCForm.severity as "Low" | "Medium" | "High" | "Critical",
      status: "Open",
      department: newNCForm.department,
      reportedBy: "Current User",
      assignedTo: newNCForm.assignedTo || undefined,
      reportedDate: new Date().toISOString().split("T")[0],
      dueDate: newNCForm.dueDate,
      capaActions: [],
      comments: [],
      auditLog: [
        {
          id: "audit-new",
          action: "NC Created",
          user: "Current User",
          timestamp: new Date().toISOString(),
          details: "Non-conformity report created",
        },
      ],
      attachments: [],
    };

    if (newNCForm.assignedTo) {
      newNC.auditLog?.push({
        id: "audit-assign",
        action: "Assigned",
        user: "Current User",
        timestamp: new Date().toISOString(),
        details: `Assigned to ${users.find((u) => u.id === newNCForm.assignedTo)?.name}`,
      });
    }

    setNonConformitiesList([newNC, ...nonConformitiesList]);
    setNewNCForm({
      title: "",
      description: "",
      severity: "",
      department: "",
      dueDate: "",
      assignedTo: "",
    });
    setIsNewNCDialogOpen(false);

    toast({
      title: "NC Report Created",
      description: `Non-conformity report ${newNC.id} has been created successfully.`,
    });
  };

  const handleAIAutoFill = () => {
    // Simulate AI auto-fill based on description
    const description = newNCForm.description.toLowerCase();
    let suggestions = { severity: "", department: "", assignedTo: "" };

    if (
      description.includes("dimension") ||
      description.includes("tolerance") ||
      description.includes("measurement")
    ) {
      suggestions = {
        severity: "High",
        department: "Production Line 3",
        assignedTo: "2",
      };
    } else if (
      description.includes("supplier") ||
      description.includes("material") ||
      description.includes("chemical")
    ) {
      suggestions = {
        severity: "Critical",
        department: "Incoming Inspection",
        assignedTo: "3",
      };
    } else if (
      description.includes("documentation") ||
      description.includes("signature") ||
      description.includes("record")
    ) {
      suggestions = {
        severity: "Medium",
        department: "Quality Control",
        assignedTo: "4",
      };
    } else {
      suggestions = {
        severity: "Medium",
        department: "Quality Control",
        assignedTo: "1",
      };
    }

    setNewNCForm((prev) => ({
      ...prev,
      severity: suggestions.severity,
      department: suggestions.department,
      assignedTo: suggestions.assignedTo,
    }));

    toast({
      title: "AI Auto-Fill Complete",
      description:
        "Severity, department, and assignee have been suggested based on the description.",
    });
  };

  const handleViewDetails = (nc: NonConformity) => {
    setSelectedNC(nc);
    setIsDetailViewOpen(true);
    setActiveTab("overview"); // Reset to overview tab when opening a new NC
  };

  const handleUpdateRootCause = (ncId: string, newRootCause: string) => {
    setNonConformitiesList((prev) =>
      prev.map((nc) =>
        nc.id === ncId
          ? {
              ...nc,
              rootCause: newRootCause,
              auditLog: [
                ...(nc.auditLog || []),
                {
                  id: `audit-${Date.now()}`,
                  action: "Root Cause Updated",
                  user: "Current User",
                  timestamp: new Date().toISOString(),
                  details: "Root cause analysis updated",
                },
              ],
            }
          : nc,
      ),
    );
    setEditingRootCause(null);
    if (selectedNC?.id === ncId) {
      setSelectedNC((prev) =>
        prev ? { ...prev, rootCause: newRootCause } : null,
      );
    }
    toast({
      title: "Root Cause Updated",
      description: "Root cause analysis has been updated successfully.",
    });
  };

  const handleAddCapaAction = () => {
    if (
      !selectedNC ||
      !newCapaAction.name ||
      !newCapaAction.description ||
      !newCapaAction.owner ||
      !newCapaAction.department ||
      !newCapaAction.dueDate
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for the CAPA action.",
        variant: "destructive",
      });
      return;
    }

    const capaAction: CapaAction = {
      id: `capa-${Date.now()}`,
      name: newCapaAction.name,
      description: newCapaAction.description,
      owner: newCapaAction.owner,
      department: newCapaAction.department,
      dueDate: newCapaAction.dueDate,
      status: "Open",
      priority: newCapaAction.priority,
      currentStep: 2,
      workflowSteps: defaultCapaWorkflowSteps.map((step, index) => ({
        ...step,
        id: `step-${Date.now()}-${index}`,
      })),
    };

    setNonConformitiesList((prev) =>
      prev.map((nc) =>
        nc.id === selectedNC.id
          ? {
              ...nc,
              capaActions: [...(nc.capaActions || []), capaAction],
              auditLog: [
                ...(nc.auditLog || []),
                {
                  id: `audit-${Date.now()}`,
                  action: "CAPA Action Added",
                  user: "Current User",
                  timestamp: new Date().toISOString(),
                  details: `CAPA action added: ${capaAction.name}`,
                },
              ],
            }
          : nc,
      ),
    );

    setSelectedNC((prev) =>
      prev
        ? {
            ...prev,
            capaActions: [...(prev.capaActions || []), capaAction],
          }
        : null,
    );

    setNewCapaAction({
      name: "",
      description: "",
      owner: "",
      department: "",
      dueDate: "",
      priority: "Medium",
    });

    toast({
      title: "CAPA Action Added",
      description: "New CAPA action has been added successfully.",
    });
  };

  const handleUpdateCapaStatus = (
    capaId: string,
    newStatus: CapaAction["status"],
  ) => {
    if (!selectedNC) return;

    // If status is being changed to Completed, show double verification dialog
    if (newStatus === "Completed") {
      const capaToArchive = selectedNC.capaActions?.find(
        (capa) => capa.id === capaId,
      );
      if (capaToArchive) {
        setPendingArchiveCapa({ capaId, capaAction: capaToArchive });
        setIsArchiveConfirmOpen(true);
        return;
      }
    }

    // Regular status update for non-completed statuses
    setNonConformitiesList((prev) =>
      prev.map((nc) =>
        nc.id === selectedNC.id
          ? {
              ...nc,
              capaActions: nc.capaActions?.map((capa) =>
                capa.id === capaId
                  ? {
                      ...capa,
                      status: newStatus,
                      completedDate:
                        newStatus === "Completed"
                          ? new Date().toISOString().split("T")[0]
                          : undefined,
                    }
                  : capa,
              ),
              auditLog: [
                ...(nc.auditLog || []),
                {
                  id: `audit-${Date.now()}`,
                  action: "CAPA Status Updated",
                  user: "Current User",
                  timestamp: new Date().toISOString(),
                  details: `CAPA action status changed to ${newStatus}`,
                },
              ],
            }
          : nc,
      ),
    );

    setSelectedNC((prev) =>
      prev
        ? {
            ...prev,
            capaActions: prev.capaActions?.map((capa) =>
              capa.id === capaId
                ? {
                    ...capa,
                    status: newStatus,
                    completedDate:
                      newStatus === "Completed"
                        ? new Date().toISOString().split("T")[0]
                        : undefined,
                  }
                : capa,
            ),
          }
        : null,
    );

    toast({
      title: "CAPA Status Updated",
      description: `CAPA action status updated to ${newStatus}.`,
    });
  };

  const handleConfirmArchive = () => {
    if (!selectedNC || !pendingArchiveCapa) return;

    const { capaId, capaAction } = pendingArchiveCapa;
    const archivedCapa = {
      ...capaAction,
      status: "Completed" as const,
      completedDate: new Date().toISOString().split("T")[0],
    };

    // Add to archived list
    setArchivedCapaActions((prev) => [...prev, archivedCapa]);

    // Remove from active CAPA actions
    setNonConformitiesList((prev) =>
      prev.map((nc) =>
        nc.id === selectedNC.id
          ? {
              ...nc,
              capaActions: nc.capaActions?.filter((capa) => capa.id !== capaId),
              auditLog: [
                ...(nc.auditLog || []),
                {
                  id: `audit-${Date.now()}`,
                  action: "CAPA Completed & Archived",
                  user: "Current User",
                  timestamp: new Date().toISOString(),
                  details: `CAPA action completed and moved to archive: ${capaAction.name}`,
                },
              ],
            }
          : nc,
      ),
    );

    setSelectedNC((prev) =>
      prev
        ? {
            ...prev,
            capaActions: prev.capaActions?.filter((capa) => capa.id !== capaId),
          }
        : null,
    );

    // Reset pending state
    setPendingArchiveCapa(null);
    setIsArchiveConfirmOpen(false);

    toast({
      title: "CAPA Completed & Archived",
      description: `CAPA action has been completed and moved to archive.`,
    });
  };

  const handleCancelArchive = () => {
    setPendingArchiveCapa(null);
    setIsArchiveConfirmOpen(false);
  };

  const handleAddComment = () => {
    if (!selectedNC || !newComment.trim()) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: "Current User",
      content: newComment,
      timestamp: new Date().toISOString(),
      type: "comment",
    };

    setNonConformitiesList((prev) =>
      prev.map((nc) =>
        nc.id === selectedNC.id
          ? {
              ...nc,
              comments: [...(nc.comments || []), comment],
            }
          : nc,
      ),
    );

    setSelectedNC((prev) =>
      prev
        ? {
            ...prev,
            comments: [...(prev.comments || []), comment],
          }
        : null,
    );

    setNewComment("");
  };

  const handleQAApproval = () => {
    if (!selectedNC) return;

    setNonConformitiesList((prev) =>
      prev.map((nc) =>
        nc.id === selectedNC.id
          ? {
              ...nc,
              status: "Closed",
              qaApprover: "Current User",
              qaApprovalDate: new Date().toISOString().split("T")[0],
              auditLog: [
                ...(nc.auditLog || []),
                {
                  id: `audit-${Date.now()}`,
                  action: "QA Approved",
                  user: "Current User",
                  timestamp: new Date().toISOString(),
                  details: "NC approved and closed by QA",
                },
              ],
            }
          : nc,
      ),
    );

    setSelectedNC((prev) =>
      prev
        ? {
            ...prev,
            status: "Closed",
            qaApprover: "Current User",
            qaApprovalDate: new Date().toISOString().split("T")[0],
          }
        : null,
    );

    toast({
      title: "NC Approved",
      description: "Non-conformity has been approved and closed.",
    });
  };

  const handleExport = () => {
    // Simulate export functionality
    const exportData = {
      filters: {
        search: searchQuery,
        status: statusFilter,
        severity: severityFilter,
      },
      data: filteredNonConformities,
      exportDate: new Date().toISOString(),
    };

    // In a real application, this would generate and download a PDF/Excel file
    console.log("Export data:", exportData);

    toast({
      title: "Export Started",
      description:
        "Your NC report is being generated. You'll receive a download link shortly.",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending QA":
        return "bg-purple-100 text-purple-800";
      case "Closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCapaStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCapaStepStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleOpenCapaWorkflow = (capaAction: CapaAction) => {
    setSelectedCapaAction(capaAction);
    setActiveCapaStep(capaAction.currentStep);
    setIsCapaWorkflowOpen(true);
  };

  const handleUpdateCapaWorkflowStep = (stepNumber: number, data: any) => {
    if (!selectedCapaAction || !selectedNC) return;

    const updatedCapa = {
      ...selectedCapaAction,
      workflowSteps: selectedCapaAction.workflowSteps.map((step) =>
        step.stepNumber === stepNumber
          ? {
              ...step,
              status: "Completed" as const,
              completedDate: new Date().toISOString().split("T")[0],
            }
          : step,
      ),
      currentStep: stepNumber < 7 ? stepNumber + 1 : stepNumber,
      ...data,
    };

    setNonConformitiesList((prev) =>
      prev.map((nc) =>
        nc.id === selectedNC.id
          ? {
              ...nc,
              capaActions: nc.capaActions?.map((capa) =>
                capa.id === selectedCapaAction.id ? updatedCapa : capa,
              ),
            }
          : nc,
      ),
    );

    setSelectedNC((prev) =>
      prev
        ? {
            ...prev,
            capaActions: prev.capaActions?.map((capa) =>
              capa.id === selectedCapaAction.id ? updatedCapa : capa,
            ),
          }
        : null,
    );

    setSelectedCapaAction(updatedCapa);

    toast({
      title: "CAPA Step Updated",
      description: `Step ${stepNumber} has been completed successfully.`,
    });
  };

  const handleViewCapaStep = (step: CapaWorkflowStep) => {
    setSelectedCapaStep(step);
    setIsCapaStepDialogOpen(true);
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Non-Conformity Management
            </h1>
            <p className="text-muted-foreground">
              AI-powered NC tracking, root cause analysis, and CAPA management
            </p>
          </div>
          <div className="flex gap-2">
            {notifications.length > 0 && (
              <Button
                variant="outline"
                className="relative"
                onClick={() => {
                  toast({
                    title: "Notifications",
                    description: `You have ${notifications.length} pending notifications.`,
                  });
                }}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                  {notifications.length}
                </Badge>
              </Button>
            )}
            <Button
              onClick={() => setIsChatOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Bot className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
            <Button onClick={() => setIsNewNCDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New NC Report
            </Button>
          </div>
        </div>

        {/* Weekly Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total NCs</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyStats.totalNCs}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open NCs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {weeklyStats.openNCs}
              </div>
              <p className="text-xs text-muted-foreground">
                Requiring attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Closed This Week
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {weeklyStats.closedThisWeek}
              </div>
              <p className="text-xs text-muted-foreground">
                +25% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending QA</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {weeklyStats.pendingQA}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {weeklyStats.overdue}
              </div>
              <p className="text-xs text-muted-foreground">
                Need immediate action
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              AI Weekly Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">High-Risk Areas Identified</p>
                  <p className="text-sm text-muted-foreground">
                    {weeklyStats.highRiskAreas.join(", ")} show recurring
                    patterns
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Recommendation</p>
                  <p className="text-sm text-muted-foreground">
                    Focus on preventive measures for Production Line 3 - 60% of
                    issues are measurement-related
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search non-conformities..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending-qa">Pending QA</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* NC List */}
        <div className="space-y-4">
          {filteredNonConformities.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    No non-conformities found
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredNonConformities.map((nc) => (
              <Card key={nc.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-lg">{nc.title}</CardTitle>
                        <Badge className={getSeverityColor(nc.severity)}>
                          {nc.severity}
                        </Badge>
                        <Badge className={getStatusColor(nc.status)}>
                          {nc.status}
                        </Badge>
                        {nc.assignedTo && (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <User className="h-3 w-3" />
                            {users.find((u) => u.id === nc.assignedTo)?.name ||
                              "Assigned"}
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{nc.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span>ID: {nc.id}</span>
                        <span>Department: {nc.department}</span>
                        <span>Reported: {nc.reportedDate}</span>
                        <span>Due: {nc.dueDate}</span>
                        {nc.assignedTo && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            Assigned to:{" "}
                            {users.find((u) => u.id === nc.assignedTo)?.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(nc)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {nc.rootCause && (
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">
                            Root Cause Analysis
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingRootCause(nc.id)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        {editingRootCause === nc.id ? (
                          <div className="flex gap-2">
                            <Textarea
                              defaultValue={nc.rootCause}
                              className="flex-1"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && e.ctrlKey) {
                                  handleUpdateRootCause(
                                    nc.id,
                                    e.currentTarget.value,
                                  );
                                }
                              }}
                              id={`root-cause-${nc.id}`}
                            />
                            <div className="flex flex-col gap-1">
                              <Button
                                size="sm"
                                onClick={() => {
                                  const textarea = document.getElementById(
                                    `root-cause-${nc.id}`,
                                  ) as HTMLTextAreaElement;
                                  handleUpdateRootCause(nc.id, textarea.value);
                                }}
                              >
                                <Save className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingRootCause(null)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {nc.rootCause}
                          </p>
                        )}
                      </div>
                      {nc.capaActions && nc.capaActions.length > 0 && (
                        <div>
                          <p className="font-medium text-sm mb-2">
                            CAPA Actions ({nc.capaActions.length})
                          </p>
                          <div className="space-y-2">
                            {nc.capaActions.slice(0, 2).map((action) => (
                              <div
                                key={action.id}
                                className="flex items-start gap-2 p-2 bg-muted/30 rounded"
                              >
                                <div className="space-y-2">
                                  <CardTitle className="text-base">
                                    {action.name}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {action.description}
                                  </p>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge
                                      className={getCapaStatusColor(
                                        action.status,
                                      )}
                                    >
                                      {action.status}
                                    </Badge>
                                    <Badge variant="outline">
                                      {action.priority} Priority
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      Owner: {action.owner}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      Department: {action.department}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      Due: {action.dueDate}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Select
                                    value={action.status}
                                    onValueChange={(
                                      value: CapaAction["status"],
                                    ) =>
                                      handleUpdateCapaStatus(action.id, value)
                                    }
                                  >
                                    <SelectTrigger className="w-[140px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Open">Open</SelectItem>
                                      <SelectItem value="In Progress">
                                        In Progress
                                      </SelectItem>
                                      <SelectItem value="Completed">
                                        Completed
                                      </SelectItem>
                                      <SelectItem value="Overdue">
                                        Overdue
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            ))}
                            {nc.capaActions.length > 2 && (
                              <p className="text-xs text-muted-foreground">
                                +{nc.capaActions.length - 2} more actions (view
                                details to see all)
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Detailed NC View Dialog */}
        <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
          <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {selectedNC?.title} - {selectedNC?.id}
              </DialogTitle>
              <DialogDescription>
                Detailed view with CAPA workflow, comments, and audit trail
              </DialogDescription>
            </DialogHeader>

            {selectedNC && (
              <div className="flex-1 overflow-hidden">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="h-full flex flex-col"
                >
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="capa">Active CAPA</TabsTrigger>
                    <TabsTrigger value="archived">Archived CAPA</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="attachments">Attachments</TabsTrigger>
                    <TabsTrigger value="audit">Audit Log</TabsTrigger>
                  </TabsList>

                  <div className="flex-1 overflow-auto mt-4">
                    <TabsContent value="overview" className="space-y-4 mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              NC Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                className={getSeverityColor(
                                  selectedNC.severity,
                                )}
                              >
                                {selectedNC.severity}
                              </Badge>
                              <Badge
                                className={getStatusColor(selectedNC.status)}
                              >
                                {selectedNC.status}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <p>
                                <strong>Description:</strong>{" "}
                                {selectedNC.description}
                              </p>
                              <p>
                                <strong>Department:</strong>{" "}
                                {selectedNC.department}
                              </p>
                              <p>
                                <strong>Reported By:</strong>{" "}
                                {selectedNC.reportedBy}
                              </p>
                              <p>
                                <strong>Reported Date:</strong>{" "}
                                {selectedNC.reportedDate}
                              </p>
                              <p>
                                <strong>Due Date:</strong> {selectedNC.dueDate}
                              </p>
                              {selectedNC.assignedTo && (
                                <p>
                                  <strong>Assigned To:</strong>{" "}
                                  {
                                    users.find(
                                      (u) => u.id === selectedNC.assignedTo,
                                    )?.name
                                  }
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center justify-between">
                              Root Cause Analysis
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setEditingRootCause(selectedNC.id)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {editingRootCause === selectedNC.id ? (
                              <div className="space-y-2">
                                <Textarea
                                  defaultValue={selectedNC.rootCause || ""}
                                  placeholder="Enter root cause analysis..."
                                  rows={4}
                                  id={`detail-root-cause-${selectedNC.id}`}
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      const textarea = document.getElementById(
                                        `detail-root-cause-${selectedNC.id}`,
                                      ) as HTMLTextAreaElement;
                                      handleUpdateRootCause(
                                        selectedNC.id,
                                        textarea.value,
                                      );
                                    }}
                                  >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingRootCause(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm">
                                {selectedNC.rootCause ||
                                  "No root cause analysis available yet."}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      {selectedNC.status === "Pending QA" && (
                        <Card className="border-purple-200 bg-purple-50">
                          <CardHeader>
                            <CardTitle className="text-lg text-purple-800">
                              QA Approval Required
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-purple-700 mb-4">
                              This NC is ready for QA approval. All CAPA actions
                              have been completed.
                            </p>
                            <Button
                              onClick={handleQAApproval}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve & Close NC
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="capa" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center justify-between">
                            Active CAPA Actions
                            <Badge variant="outline">
                              {selectedNC.capaActions?.length || 0} Active
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Manage active corrective and preventive actions.
                            Completed actions will be automatically archived.
                          </CardDescription>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Add New CAPA Action
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>CAPA Name *</Label>
                                <Input
                                  placeholder="Enter CAPA name..."
                                  value={newCapaAction.name}
                                  onChange={(e) =>
                                    setNewCapaAction((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Description *</Label>
                                <Textarea
                                  placeholder="Describe the corrective/preventive action..."
                                  value={newCapaAction.description}
                                  onChange={(e) =>
                                    setNewCapaAction((prev) => ({
                                      ...prev,
                                      description: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                  <Label>Action Owner *</Label>
                                  <Select
                                    value={newCapaAction.owner}
                                    onValueChange={(value) =>
                                      setNewCapaAction((prev) => ({
                                        ...prev,
                                        owner: value,
                                      }))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select owner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {users.map((user) => (
                                        <SelectItem
                                          key={user.id}
                                          value={user.name}
                                        >
                                          {user.name} - {user.role}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Department *</Label>
                                  <Select
                                    value={newCapaAction.department}
                                    onValueChange={(value) =>
                                      setNewCapaAction((prev) => ({
                                        ...prev,
                                        department: value,
                                      }))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Production Line 1">
                                        Production Line 1
                                      </SelectItem>
                                      <SelectItem value="Production Line 2">
                                        Production Line 2
                                      </SelectItem>
                                      <SelectItem value="Production Line 3">
                                        Production Line 3
                                      </SelectItem>
                                      <SelectItem value="Quality Control">
                                        Quality Control
                                      </SelectItem>
                                      <SelectItem value="Incoming Inspection">
                                        Incoming Inspection
                                      </SelectItem>
                                      <SelectItem value="Shipping">
                                        Shipping
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                  <Label>Due Date *</Label>
                                  <Input
                                    type="date"
                                    value={newCapaAction.dueDate}
                                    onChange={(e) =>
                                      setNewCapaAction((prev) => ({
                                        ...prev,
                                        dueDate: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Priority</Label>
                                  <Select
                                    value={newCapaAction.priority}
                                    onValueChange={(
                                      value: "Low" | "Medium" | "High",
                                    ) =>
                                      setNewCapaAction((prev) => ({
                                        ...prev,
                                        priority: value,
                                      }))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Low">Low</SelectItem>
                                      <SelectItem value="Medium">
                                        Medium
                                      </SelectItem>
                                      <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button onClick={handleAddCapaAction}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add CAPA Action
                          </Button>
                        </CardContent>
                      </Card>

                      <div className="space-y-4">
                        {selectedNC.capaActions?.map((action) => (
                          <Card key={action.id}>
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <CardTitle className="text-base">
                                    {action.name}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {action.description}
                                  </p>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge
                                      className={getCapaStatusColor(
                                        action.status,
                                      )}
                                    >
                                      {action.status}
                                    </Badge>
                                    <Badge variant="outline">
                                      {action.priority} Priority
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      Owner: {action.owner}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      Department: {action.department}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      Due: {action.dueDate}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Select
                                    value={action.status}
                                    onValueChange={(
                                      value: CapaAction["status"],
                                    ) =>
                                      handleUpdateCapaStatus(action.id, value)
                                    }
                                  >
                                    <SelectTrigger className="w-[140px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Open">Open</SelectItem>
                                      <SelectItem value="In Progress">
                                        In Progress
                                      </SelectItem>
                                      <SelectItem value="Completed">
                                        Completed
                                      </SelectItem>
                                      <SelectItem value="Overdue">
                                        Overdue
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {(action.completedDate || action.comments) && (
                                <div className="mb-4">
                                  {action.completedDate && (
                                    <p className="text-sm text-green-600">
                                      <CheckCircle className="inline h-4 w-4 mr-1" />
                                      Completed on {action.completedDate}
                                    </p>
                                  )}
                                  {action.comments && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                      <strong>Comments:</strong>{" "}
                                      {action.comments}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* CAPA Workflow Progress */}
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm">
                                    CAPA Workflow Progress
                                  </h4>
                                  <Badge variant="outline" className="text-xs">
                                    Step {action.currentStep} of 7
                                  </Badge>
                                </div>

                                <div className="space-y-2">
                                  {action.workflowSteps?.map((step) => (
                                    <div
                                      key={step.id}
                                      className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow ${
                                        step.stepNumber === action.currentStep
                                          ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                                          : step.status === "Completed"
                                            ? "bg-green-50 border-green-200 hover:bg-green-100"
                                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                      }`}
                                      onClick={() =>
                                        handleOpenCapaWorkflow(action)
                                      }
                                    >
                                      <div
                                        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                                          step.status === "Completed"
                                            ? "bg-green-100 text-green-800"
                                            : step.stepNumber ===
                                                action.currentStep
                                              ? "bg-blue-100 text-blue-800"
                                              : "bg-gray-100 text-gray-600"
                                        }`}
                                      >
                                        {step.status === "Completed" ? (
                                          <CheckCircle className="h-4 w-4" />
                                        ) : (
                                          step.stepNumber
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">
                                          {step.title}
                                        </p>
                                        {step.completedDate && (
                                          <p className="text-xs text-muted-foreground">
                                            Completed: {step.completedDate}
                                          </p>
                                        )}
                                      </div>
                                      <Badge
                                        className={getCapaStepStatusColor(
                                          step.status,
                                        )}
                                        variant="outline"
                                      >
                                        {step.status}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="archived" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              Archived CAPA Actions
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700"
                            >
                              {archivedCapaActions.length} Completed
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            View completed and archived CAPA actions for this
                            non-conformity.
                          </CardDescription>
                        </CardHeader>
                      </Card>

                      {archivedCapaActions.length === 0 ? (
                        <Card>
                          <CardContent className="flex items-center justify-center py-8">
                            <div className="text-center">
                              <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <p className="text-lg font-medium text-muted-foreground">
                                No archived CAPA actions
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Completed CAPA actions will appear here
                                automatically
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="space-y-4">
                          {archivedCapaActions.map((action) => (
                            <Card
                              key={action.id}
                              className="border-green-200 bg-green-50/30"
                            >
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div className="space-y-2">
                                    <CardTitle className="text-base flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                      {action.name}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                      {action.description}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <Badge className="bg-green-100 text-green-800">
                                        Completed
                                      </Badge>
                                      <Badge variant="outline">
                                        {action.priority} Priority
                                      </Badge>
                                      <span className="text-sm text-muted-foreground">
                                        Owner: {action.owner}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        Department: {action.department}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        Due: {action.dueDate}
                                      </span>
                                      {action.completedDate && (
                                        <span className="text-sm text-green-600 font-medium">
                                          Completed: {action.completedDate}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                {action.comments && (
                                  <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">
                                      <strong>Final Comments:</strong>{" "}
                                      {action.comments}
                                    </p>
                                  </div>
                                )}

                                {/* Completed Workflow Summary */}
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-sm text-green-800">
                                      Completed Workflow
                                    </h4>
                                    <Badge className="bg-green-100 text-green-800 text-xs">
                                      All Steps Completed
                                    </Badge>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {action.workflowSteps?.map((step) => (
                                      <div
                                        key={step.id}
                                        className="flex items-center gap-2 p-2 rounded bg-green-100 border border-green-200"
                                      >
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <div className="flex-1">
                                          <p className="text-xs font-medium text-green-800">
                                            {step.stepNumber}. {step.title}
                                          </p>
                                          {step.completedDate && (
                                            <p className="text-xs text-green-600">
                                              {step.completedDate}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="comments" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Add Comment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-2">
                            <Textarea
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="flex-1"
                            />
                            <Button onClick={handleAddComment}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="space-y-4">
                        {selectedNC.comments?.map((comment) => (
                          <Card key={comment.id}>
                            <CardContent className="pt-4">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={
                                      users.find(
                                        (u) => u.name === comment.author,
                                      )?.avatar
                                    }
                                  />
                                  <AvatarFallback>
                                    {comment.author
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium text-sm">
                                      {comment.author}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(
                                        comment.timestamp,
                                      ).toLocaleString()}
                                    </p>
                                    {comment.type !== "comment" && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {comment.type.replace("_", " ")}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="attachments" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Attachments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedNC.attachments &&
                          selectedNC.attachments.length > 0 ? (
                            <div className="space-y-2">
                              {selectedNC.attachments.map(
                                (attachment, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 border rounded"
                                  >
                                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      {attachment}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="ml-auto"
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ),
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              No attachments available.
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="audit" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <History className="h-5 w-5" />
                            Audit Trail
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedNC.auditLog?.map((entry) => (
                              <div
                                key={entry.id}
                                className="flex items-start gap-3 pb-3 border-b last:border-b-0"
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium text-sm">
                                      {entry.action}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      by {entry.user}
                                    </p>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {entry.details}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(entry.timestamp).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* AI Chat Dialog */}
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogContent className="max-w-2xl h-[600px] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                AI Assistant - Non-Conformity Analysis
              </DialogTitle>
              <DialogDescription>
                Ask me about NCs, trends, root causes, CAPA recommendations, or
                any quality-related questions.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex-1 overflow-auto space-y-4 p-4 bg-muted/30 rounded-lg">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about NCs, trends, root causes, or CAPA recommendations..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* CAPA Workflow Dialog */}
        <Dialog open={isCapaWorkflowOpen} onOpenChange={setIsCapaWorkflowOpen}>
          <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                CAPA Workflow: {selectedCapaAction?.name}
              </DialogTitle>
              <DialogDescription>
                Complete the CAPA workflow steps to ensure effective corrective
                and preventive actions
              </DialogDescription>
            </DialogHeader>

            {selectedCapaAction && (
              <div className="flex-1 overflow-hidden">
                <Tabs
                  value={activeCapaStep.toString()}
                  onValueChange={(value) => setActiveCapaStep(parseInt(value))}
                  className="h-full flex flex-col"
                >
                  <TabsList className="grid w-full grid-cols-7">
                    {selectedCapaAction.workflowSteps.map((step) => (
                      <TabsTrigger
                        key={step.stepNumber}
                        value={step.stepNumber.toString()}
                        className={`text-xs ${
                          step.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : step.stepNumber === selectedCapaAction.currentStep
                              ? "bg-blue-100 text-blue-800"
                              : ""
                        }`}
                        disabled={
                          step.stepNumber > selectedCapaAction.currentStep
                        }
                      >
                        {step.stepNumber}. {step.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="flex-1 overflow-auto mt-4">
                    {/* Step 1: CAPA Creation (Read-only) */}
                    <TabsContent value="1" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Step 1: CAPA Creation (Completed)
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">
                                CAPA Name
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {selectedCapaAction.name}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">
                                Owner
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {selectedCapaAction.owner}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">
                                Department
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {selectedCapaAction.department}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">
                                Priority
                              </Label>
                              <Badge
                                className={
                                  selectedCapaAction.priority === "High"
                                    ? "bg-red-100 text-red-800"
                                    : selectedCapaAction.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {selectedCapaAction.priority}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">
                              Description
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {selectedCapaAction.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Step 2: Evaluation */}
                    <TabsContent value="2" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Step 2: Evaluation
                          </CardTitle>
                          <CardDescription>
                            Evaluate the potential impact of this CAPA across
                            different dimensions
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Quality Impact</Label>
                                <Select
                                  value={
                                    selectedCapaAction.evaluation
                                      ?.qualityImpact || ""
                                  }
                                  onValueChange={(
                                    value: "Low" | "Medium" | "High",
                                  ) => {
                                    const evaluation = {
                                      ...selectedCapaAction.evaluation,
                                      qualityImpact: value,
                                    };
                                    setSelectedCapaAction((prev) =>
                                      prev ? { ...prev, evaluation } : null,
                                    );
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select impact level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">
                                      Medium
                                    </SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Cost Impact</Label>
                                <Select
                                  value={
                                    selectedCapaAction.evaluation?.costImpact ||
                                    ""
                                  }
                                  onValueChange={(
                                    value: "Low" | "Medium" | "High",
                                  ) => {
                                    const evaluation = {
                                      ...selectedCapaAction.evaluation,
                                      costImpact: value,
                                    };
                                    setSelectedCapaAction((prev) =>
                                      prev ? { ...prev, evaluation } : null,
                                    );
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select impact level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">
                                      Medium
                                    </SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Timeline Impact</Label>
                                <Select
                                  value={
                                    selectedCapaAction.evaluation
                                      ?.timelineImpact || ""
                                  }
                                  onValueChange={(
                                    value: "Low" | "Medium" | "High",
                                  ) => {
                                    const evaluation = {
                                      ...selectedCapaAction.evaluation,
                                      timelineImpact: value,
                                    };
                                    setSelectedCapaAction((prev) =>
                                      prev ? { ...prev, evaluation } : null,
                                    );
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select impact level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">
                                      Medium
                                    </SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Risk Level</Label>
                                <Select
                                  value={
                                    selectedCapaAction.evaluation?.riskLevel ||
                                    ""
                                  }
                                  onValueChange={(
                                    value: "Low" | "Medium" | "High",
                                  ) => {
                                    const evaluation = {
                                      ...selectedCapaAction.evaluation,
                                      riskLevel: value,
                                    };
                                    setSelectedCapaAction((prev) =>
                                      prev ? { ...prev, evaluation } : null,
                                    );
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select risk level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">
                                      Medium
                                    </SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Evaluation Notes</Label>
                            <Textarea
                              placeholder="Add any additional evaluation notes..."
                              value={selectedCapaAction.evaluation?.notes || ""}
                              onChange={(e) => {
                                const evaluation = {
                                  ...selectedCapaAction.evaluation,
                                  notes: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, evaluation } : null,
                                );
                              }}
                            />
                          </div>
                          <Button
                            onClick={() => {
                              if (
                                selectedCapaAction.evaluation?.qualityImpact &&
                                selectedCapaAction.evaluation?.costImpact
                              ) {
                                handleUpdateCapaWorkflowStep(2, {
                                  evaluation: selectedCapaAction.evaluation,
                                });
                              } else {
                                toast({
                                  title: "Missing Information",
                                  description:
                                    "Please complete all required evaluation fields.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            disabled={
                              selectedCapaAction.workflowSteps.find(
                                (s) => s.stepNumber === 2,
                              )?.status === "Completed"
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Evaluation
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Step 3: Investigation Procedure */}
                    <TabsContent value="3" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Step 3: Investigation Procedure
                          </CardTitle>
                          <CardDescription>
                            Establish the procedure for investigating the
                            problem
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Investigation Objective</Label>
                            <Textarea
                              placeholder="Define the objective of the investigation..."
                              value={
                                selectedCapaAction.investigation?.objective ||
                                ""
                              }
                              onChange={(e) => {
                                const investigation = {
                                  ...selectedCapaAction.investigation,
                                  objective: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, investigation } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Timeline</Label>
                            <Input
                              placeholder="Investigation timeline (e.g., 2 weeks)"
                              value={
                                selectedCapaAction.investigation?.timeline || ""
                              }
                              onChange={(e) => {
                                const investigation = {
                                  ...selectedCapaAction.investigation,
                                  timeline: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, investigation } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Responsible Parties</Label>
                            <Textarea
                              placeholder="List responsible parties (one per line)..."
                              value={
                                selectedCapaAction.investigation?.responsibleParties?.join(
                                  "\n",
                                ) || ""
                              }
                              onChange={(e) => {
                                const investigation = {
                                  ...selectedCapaAction.investigation,
                                  responsibleParties: e.target.value
                                    .split("\n")
                                    .filter((p) => p.trim()),
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, investigation } : null,
                                );
                              }}
                            />
                          </div>
                          <Button
                            onClick={() => {
                              if (
                                selectedCapaAction.investigation?.objective &&
                                selectedCapaAction.investigation?.timeline
                              ) {
                                handleUpdateCapaWorkflowStep(3, {
                                  investigation:
                                    selectedCapaAction.investigation,
                                });
                              } else {
                                toast({
                                  title: "Missing Information",
                                  description:
                                    "Please complete objective and timeline fields.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            disabled={
                              selectedCapaAction.workflowSteps.find(
                                (s) => s.stepNumber === 3,
                              )?.status === "Completed"
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Investigation Procedure
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Step 4: Root Cause Analysis */}
                    <TabsContent value="4" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Step 4: Root Cause Analysis
                          </CardTitle>
                          <CardDescription>
                            Conduct root cause analysis using interactive tools
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Analysis Method</Label>
                            <Select
                              value={selectedCapaAction.rootCause?.method || ""}
                              onValueChange={(
                                value:
                                  | "Fishbone"
                                  | "5-Why"
                                  | "Fault Tree"
                                  | "Other",
                              ) => {
                                const rootCause = {
                                  ...selectedCapaAction.rootCause,
                                  method: value,
                                  // Initialize method-specific data
                                  ...(value === "5-Why" && {
                                    fiveWhys: {
                                      problem: "",
                                      whys: [
                                        {
                                          question:
                                            "Why did this problem occur?",
                                          answer: "",
                                        },
                                        {
                                          question: "Why did that happen?",
                                          answer: "",
                                        },
                                        {
                                          question: "Why did that happen?",
                                          answer: "",
                                        },
                                        {
                                          question: "Why did that happen?",
                                          answer: "",
                                        },
                                        {
                                          question: "Why did that happen?",
                                          answer: "",
                                        },
                                      ],
                                    },
                                  }),
                                  ...(value === "Fishbone" && {
                                    fishbone: {
                                      problem: "",
                                      categories: {
                                        people: [""],
                                        process: [""],
                                        equipment: [""],
                                        materials: [""],
                                        environment: [""],
                                        methods: [""],
                                      },
                                    },
                                  }),
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, rootCause } : null,
                                );
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select analysis method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Fishbone">
                                  Fishbone Diagram
                                </SelectItem>
                                <SelectItem value="5-Why">
                                  5-Why Analysis
                                </SelectItem>
                                <SelectItem value="Fault Tree">
                                  Fault Tree Analysis
                                </SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* 5 Whys Interactive Tool */}
                          {selectedCapaAction.rootCause?.method === "5-Why" && (
                            <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                              <h4 className="font-medium text-blue-900">
                                5 Whys Analysis - Interactive Tool
                              </h4>

                              <div className="space-y-2">
                                <Label>Problem Statement</Label>
                                <Input
                                  placeholder="Define the problem you're analyzing..."
                                  value={
                                    selectedCapaAction.rootCause?.fiveWhys
                                      ?.problem || ""
                                  }
                                  onChange={(e) => {
                                    const rootCause = {
                                      ...selectedCapaAction.rootCause,
                                      fiveWhys: {
                                        ...selectedCapaAction.rootCause
                                          ?.fiveWhys,
                                        problem: e.target.value,
                                      },
                                    };
                                    setSelectedCapaAction((prev) =>
                                      prev ? { ...prev, rootCause } : null,
                                    );
                                  }}
                                />
                              </div>

                              {/* Inverted Ladder Structure */}
                              <div className="space-y-3">
                                {selectedCapaAction.rootCause?.fiveWhys?.whys?.map(
                                  (why, index) => (
                                    <div key={index} className="relative">
                                      {/* Ladder Step */}
                                      <div className="flex items-start gap-4">
                                        {/* Step Number Circle */}
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                          {index + 1}
                                        </div>

                                        {/* Question and Answer */}
                                        <div className="flex-1 space-y-2">
                                          <div className="bg-white p-3 rounded border border-blue-200">
                                            <Label className="text-sm font-medium text-blue-800">
                                              {why.question}
                                            </Label>
                                            <Textarea
                                              placeholder="Enter your answer..."
                                              value={why.answer}
                                              onChange={(e) => {
                                                const updatedWhys = [
                                                  ...(selectedCapaAction
                                                    .rootCause?.fiveWhys
                                                    ?.whys || []),
                                                ];
                                                updatedWhys[index] = {
                                                  ...why,
                                                  answer: e.target.value,
                                                };
                                                const rootCause = {
                                                  ...selectedCapaAction.rootCause,
                                                  fiveWhys: {
                                                    ...selectedCapaAction
                                                      .rootCause?.fiveWhys,
                                                    whys: updatedWhys,
                                                  },
                                                };
                                                setSelectedCapaAction((prev) =>
                                                  prev
                                                    ? { ...prev, rootCause }
                                                    : null,
                                                );
                                              }}
                                              className="mt-2"
                                              rows={2}
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      {/* Connecting Line */}
                                      {index < 4 && (
                                        <div className="ml-4 w-0.5 h-4 bg-blue-300"></div>
                                      )}
                                    </div>
                                  ),
                                )}
                              </div>

                              {/* Root Cause Summary */}
                              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                                <Label className="text-sm font-medium text-green-800">
                                  Root Cause Summary
                                </Label>
                                <p className="text-sm text-green-700 mt-1">
                                  The root cause is typically found in the
                                  answer to the 5th "Why". Review your answers
                                  above to identify the fundamental cause.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Fishbone Diagram Interactive Tool */}
                          {selectedCapaAction.rootCause?.method ===
                            "Fishbone" && (
                            <div className="space-y-4 p-4 border rounded-lg bg-orange-50">
                              <h4 className="font-medium text-orange-900">
                                Fishbone Diagram - Interactive Tool
                              </h4>

                              <div className="space-y-2">
                                <Label>Problem Statement</Label>
                                <Input
                                  placeholder="Define the problem you're analyzing..."
                                  value={
                                    selectedCapaAction.rootCause?.fishbone
                                      ?.problem || ""
                                  }
                                  onChange={(e) => {
                                    const rootCause = {
                                      ...selectedCapaAction.rootCause,
                                      fishbone: {
                                        ...selectedCapaAction.rootCause
                                          ?.fishbone,
                                        problem: e.target.value,
                                      },
                                    };
                                    setSelectedCapaAction((prev) =>
                                      prev ? { ...prev, rootCause } : null,
                                    );
                                  }}
                                />
                              </div>

                              {/* Fishbone Categories */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries({
                                  people: {
                                    label: "People",
                                    color:
                                      "bg-red-100 border-red-200 text-red-800",
                                  },
                                  process: {
                                    label: "Process",
                                    color:
                                      "bg-blue-100 border-blue-200 text-blue-800",
                                  },
                                  equipment: {
                                    label: "Equipment",
                                    color:
                                      "bg-green-100 border-green-200 text-green-800",
                                  },
                                  materials: {
                                    label: "Materials",
                                    color:
                                      "bg-yellow-100 border-yellow-200 text-yellow-800",
                                  },
                                  environment: {
                                    label: "Environment",
                                    color:
                                      "bg-purple-100 border-purple-200 text-purple-800",
                                  },
                                  methods: {
                                    label: "Methods",
                                    color:
                                      "bg-pink-100 border-pink-200 text-pink-800",
                                  },
                                }).map(([category, config]) => (
                                  <div
                                    key={category}
                                    className={`p-3 rounded border ${config.color}`}
                                  >
                                    <Label className="font-medium">
                                      {config.label}
                                    </Label>
                                    <div className="space-y-2 mt-2">
                                      {(
                                        selectedCapaAction.rootCause?.fishbone
                                          ?.categories?.[
                                          category as keyof typeof selectedCapaAction.rootCause.fishbone.categories
                                        ] || [""]
                                      ).map((cause, index) => (
                                        <div key={index} className="flex gap-2">
                                          <Input
                                            placeholder={`Enter ${config.label.toLowerCase()} cause...`}
                                            value={cause}
                                            onChange={(e) => {
                                              const currentCategories =
                                                selectedCapaAction.rootCause
                                                  ?.fishbone?.categories || {
                                                  people: [""],
                                                  process: [""],
                                                  equipment: [""],
                                                  materials: [""],
                                                  environment: [""],
                                                  methods: [""],
                                                };
                                              const updatedCategory = [
                                                ...(currentCategories[
                                                  category as keyof typeof currentCategories
                                                ] || []),
                                              ];
                                              updatedCategory[index] =
                                                e.target.value;

                                              const rootCause = {
                                                ...selectedCapaAction.rootCause,
                                                fishbone: {
                                                  ...selectedCapaAction
                                                    .rootCause?.fishbone,
                                                  categories: {
                                                    ...currentCategories,
                                                    [category]: updatedCategory,
                                                  },
                                                },
                                              };
                                              setSelectedCapaAction((prev) =>
                                                prev
                                                  ? { ...prev, rootCause }
                                                  : null,
                                              );
                                            }}
                                            className="flex-1"
                                          />
                                          {index ===
                                            (selectedCapaAction.rootCause
                                              ?.fishbone?.categories?.[
                                              category as keyof typeof selectedCapaAction.rootCause.fishbone.categories
                                            ]?.length || 1) -
                                              1 && (
                                            <Button
                                              type="button"
                                              variant="outline"
                                              size="sm"
                                              onClick={() => {
                                                const currentCategories =
                                                  selectedCapaAction.rootCause
                                                    ?.fishbone?.categories || {
                                                    people: [""],
                                                    process: [""],
                                                    equipment: [""],
                                                    materials: [""],
                                                    environment: [""],
                                                    methods: [""],
                                                  };
                                                const updatedCategory = [
                                                  ...(currentCategories[
                                                    category as keyof typeof currentCategories
                                                  ] || []),
                                                  "",
                                                ];

                                                const rootCause = {
                                                  ...selectedCapaAction.rootCause,
                                                  fishbone: {
                                                    ...selectedCapaAction
                                                      .rootCause?.fishbone,
                                                    categories: {
                                                      ...currentCategories,
                                                      [category]:
                                                        updatedCategory,
                                                    },
                                                  },
                                                };
                                                setSelectedCapaAction((prev) =>
                                                  prev
                                                    ? { ...prev, rootCause }
                                                    : null,
                                                );
                                              }}
                                            >
                                              <Plus className="h-3 w-3" />
                                            </Button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Analysis Summary */}
                              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                                <Label className="text-sm font-medium text-green-800">
                                  Analysis Summary
                                </Label>
                                <p className="text-sm text-green-700 mt-1">
                                  Review all categories above to identify the
                                  most likely root causes. Look for patterns and
                                  connections between different categories.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Traditional Fields for Other Methods */}
                          {selectedCapaAction.rootCause?.method &&
                            selectedCapaAction.rootCause.method !== "5-Why" &&
                            selectedCapaAction.rootCause.method !==
                              "Fishbone" && (
                              <>
                                <div className="space-y-2">
                                  <Label>Primary Root Cause</Label>
                                  <Textarea
                                    placeholder="Identify the primary root cause..."
                                    value={
                                      selectedCapaAction.rootCause
                                        ?.primaryCause || ""
                                    }
                                    onChange={(e) => {
                                      const rootCause = {
                                        ...selectedCapaAction.rootCause,
                                        primaryCause: e.target.value,
                                      };
                                      setSelectedCapaAction((prev) =>
                                        prev ? { ...prev, rootCause } : null,
                                      );
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Contributing Factors</Label>
                                  <Textarea
                                    placeholder="List contributing factors (one per line)..."
                                    value={
                                      selectedCapaAction.rootCause?.contributingFactors?.join(
                                        "\n",
                                      ) || ""
                                    }
                                    onChange={(e) => {
                                      const rootCause = {
                                        ...selectedCapaAction.rootCause,
                                        contributingFactors: e.target.value
                                          .split("\n")
                                          .filter((f) => f.trim()),
                                      };
                                      setSelectedCapaAction((prev) =>
                                        prev ? { ...prev, rootCause } : null,
                                      );
                                    }}
                                  />
                                </div>
                              </>
                            )}

                          <Button
                            onClick={() => {
                              const method =
                                selectedCapaAction.rootCause?.method;
                              let isValid = false;

                              if (method === "5-Why") {
                                isValid = !!(
                                  selectedCapaAction.rootCause?.fiveWhys
                                    ?.problem &&
                                  selectedCapaAction.rootCause?.fiveWhys?.whys?.some(
                                    (why) => why.answer.trim(),
                                  )
                                );
                              } else if (method === "Fishbone") {
                                isValid = !!(
                                  selectedCapaAction.rootCause?.fishbone
                                    ?.problem &&
                                  Object.values(
                                    selectedCapaAction.rootCause?.fishbone
                                      ?.categories || {},
                                  ).some((causes) =>
                                    causes.some((cause) => cause.trim()),
                                  )
                                );
                              } else {
                                isValid = !!(
                                  method &&
                                  selectedCapaAction.rootCause?.primaryCause
                                );
                              }

                              if (isValid) {
                                // Auto-populate primary cause based on method
                                let updatedRootCause = {
                                  ...selectedCapaAction.rootCause,
                                };

                                if (
                                  method === "5-Why" &&
                                  selectedCapaAction.rootCause?.fiveWhys
                                ) {
                                  const lastWhy =
                                    selectedCapaAction.rootCause.fiveWhys
                                      .whys[4];
                                  updatedRootCause.primaryCause =
                                    lastWhy.answer ||
                                    "Root cause identified through 5-Why analysis";
                                } else if (
                                  method === "Fishbone" &&
                                  selectedCapaAction.rootCause?.fishbone
                                ) {
                                  const allCauses = Object.values(
                                    selectedCapaAction.rootCause.fishbone
                                      .categories,
                                  )
                                    .flat()
                                    .filter((cause) => cause.trim());
                                  updatedRootCause.primaryCause =
                                    allCauses.length > 0
                                      ? `Root causes identified: ${allCauses.slice(0, 3).join(", ")}${allCauses.length > 3 ? "..." : ""}`
                                      : "Root cause identified through Fishbone analysis";
                                }

                                handleUpdateCapaWorkflowStep(4, {
                                  rootCause: updatedRootCause,
                                });
                              } else {
                                toast({
                                  title: "Missing Information",
                                  description:
                                    method === "5-Why"
                                      ? "Please complete the problem statement and at least one Why answer."
                                      : method === "Fishbone"
                                        ? "Please complete the problem statement and at least one cause in any category."
                                        : "Please complete method and primary cause fields.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            disabled={
                              selectedCapaAction.workflowSteps.find(
                                (s) => s.stepNumber === 4,
                              )?.status === "Completed"
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Root Cause Analysis
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Step 5: Action Plan */}
                    <TabsContent value="5" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Step 5: Action Plan
                          </CardTitle>
                          <CardDescription>
                            Create a comprehensive action plan
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Objectives</Label>
                            <Textarea
                              placeholder="Define the objectives of the action plan..."
                              value={
                                selectedCapaAction.actionPlan?.objectives || ""
                              }
                              onChange={(e) => {
                                const actionPlan = {
                                  ...selectedCapaAction.actionPlan,
                                  objectives: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, actionPlan } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Timeline</Label>
                            <Input
                              placeholder="Overall timeline for action plan"
                              value={
                                selectedCapaAction.actionPlan?.timeline || ""
                              }
                              onChange={(e) => {
                                const actionPlan = {
                                  ...selectedCapaAction.actionPlan,
                                  timeline: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, actionPlan } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Success Criteria</Label>
                            <Textarea
                              placeholder="Define success criteria (one per line)..."
                              value={
                                selectedCapaAction.actionPlan?.successCriteria?.join(
                                  "\n",
                                ) || ""
                              }
                              onChange={(e) => {
                                const actionPlan = {
                                  ...selectedCapaAction.actionPlan,
                                  successCriteria: e.target.value
                                    .split("\n")
                                    .filter((c) => c.trim()),
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, actionPlan } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Required Resources</Label>
                            <Textarea
                              placeholder="List required resources (one per line)..."
                              value={
                                selectedCapaAction.actionPlan?.resources?.join(
                                  "\n",
                                ) || ""
                              }
                              onChange={(e) => {
                                const actionPlan = {
                                  ...selectedCapaAction.actionPlan,
                                  resources: e.target.value
                                    .split("\n")
                                    .filter((r) => r.trim()),
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, actionPlan } : null,
                                );
                              }}
                            />
                          </div>
                          <Button
                            onClick={() => {
                              if (
                                selectedCapaAction.actionPlan?.objectives &&
                                selectedCapaAction.actionPlan?.timeline
                              ) {
                                handleUpdateCapaWorkflowStep(5, {
                                  actionPlan: selectedCapaAction.actionPlan,
                                });
                              } else {
                                toast({
                                  title: "Missing Information",
                                  description:
                                    "Please complete objectives and timeline fields.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            disabled={
                              selectedCapaAction.workflowSteps.find(
                                (s) => s.stepNumber === 5,
                              )?.status === "Completed"
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Action Plan
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Step 6: Implementation */}
                    <TabsContent value="6" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Step 6: Implementation
                          </CardTitle>
                          <CardDescription>
                            Document and track the implementation of CAPA
                            actions
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Implementation Plan</Label>
                            <Textarea
                              placeholder="Describe the implementation plan..."
                              value={
                                selectedCapaAction.implementation
                                  ?.implementationPlan || ""
                              }
                              onChange={(e) => {
                                const implementation = {
                                  ...selectedCapaAction.implementation,
                                  implementationPlan: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, implementation } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Actual Start Date</Label>
                              <Input
                                type="date"
                                value={
                                  selectedCapaAction.implementation
                                    ?.actualStartDate || ""
                                }
                                onChange={(e) => {
                                  const implementation = {
                                    ...selectedCapaAction.implementation,
                                    actualStartDate: e.target.value,
                                  };
                                  setSelectedCapaAction((prev) =>
                                    prev ? { ...prev, implementation } : null,
                                  );
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Actual End Date</Label>
                              <Input
                                type="date"
                                value={
                                  selectedCapaAction.implementation
                                    ?.actualEndDate || ""
                                }
                                onChange={(e) => {
                                  const implementation = {
                                    ...selectedCapaAction.implementation,
                                    actualEndDate: e.target.value,
                                  };
                                  setSelectedCapaAction((prev) =>
                                    prev ? { ...prev, implementation } : null,
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Challenges Encountered</Label>
                            <Textarea
                              placeholder="Document any challenges encountered during implementation..."
                              value={
                                selectedCapaAction.implementation?.challenges ||
                                ""
                              }
                              onChange={(e) => {
                                const implementation = {
                                  ...selectedCapaAction.implementation,
                                  challenges: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, implementation } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Lessons Learned</Label>
                            <Textarea
                              placeholder="Document lessons learned..."
                              value={
                                selectedCapaAction.implementation?.lessons || ""
                              }
                              onChange={(e) => {
                                const implementation = {
                                  ...selectedCapaAction.implementation,
                                  lessons: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, implementation } : null,
                                );
                              }}
                            />
                          </div>
                          <Button
                            onClick={() => {
                              if (
                                selectedCapaAction.implementation
                                  ?.implementationPlan &&
                                selectedCapaAction.implementation
                                  ?.actualStartDate
                              ) {
                                handleUpdateCapaWorkflowStep(6, {
                                  implementation:
                                    selectedCapaAction.implementation,
                                });
                              } else {
                                toast({
                                  title: "Missing Information",
                                  description:
                                    "Please complete implementation plan and start date fields.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            disabled={
                              selectedCapaAction.workflowSteps.find(
                                (s) => s.stepNumber === 6,
                              )?.status === "Completed"
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Implementation
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Step 7: Verify Effectiveness */}
                    <TabsContent value="7" className="space-y-4 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Step 7: Verify Effectiveness
                          </CardTitle>
                          <CardDescription>
                            Verify the effectiveness of implemented CAPA actions
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Verification Method</Label>
                            <Textarea
                              placeholder="Describe the method used to verify effectiveness..."
                              value={
                                selectedCapaAction.verification
                                  ?.verificationMethod || ""
                              }
                              onChange={(e) => {
                                const verification = {
                                  ...selectedCapaAction.verification,
                                  verificationMethod: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, verification } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Effectiveness Criteria</Label>
                            <Textarea
                              placeholder="List effectiveness criteria (one per line)..."
                              value={
                                selectedCapaAction.verification?.effectivenessCriteria?.join(
                                  "\n",
                                ) || ""
                              }
                              onChange={(e) => {
                                const verification = {
                                  ...selectedCapaAction.verification,
                                  effectivenessCriteria: e.target.value
                                    .split("\n")
                                    .filter((c) => c.trim()),
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, verification } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Measurement Plan</Label>
                            <Textarea
                              placeholder="Describe how effectiveness will be measured..."
                              value={
                                selectedCapaAction.verification
                                  ?.measurementPlan || ""
                              }
                              onChange={(e) => {
                                const verification = {
                                  ...selectedCapaAction.verification,
                                  measurementPlan: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, verification } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Verification Date</Label>
                            <Input
                              type="date"
                              value={
                                selectedCapaAction.verification
                                  ?.verificationDate || ""
                              }
                              onChange={(e) => {
                                const verification = {
                                  ...selectedCapaAction.verification,
                                  verificationDate: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, verification } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Results</Label>
                            <Textarea
                              placeholder="Document verification results..."
                              value={
                                selectedCapaAction.verification?.results || ""
                              }
                              onChange={(e) => {
                                const verification = {
                                  ...selectedCapaAction.verification,
                                  results: e.target.value,
                                };
                                setSelectedCapaAction((prev) =>
                                  prev ? { ...prev, verification } : null,
                                );
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Is Effective?</Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="effective-yes"
                                  checked={
                                    selectedCapaAction.verification
                                      ?.isEffective === true
                                  }
                                  onCheckedChange={(checked) => {
                                    const verification = {
                                      ...selectedCapaAction.verification,
                                      isEffective: checked ? true : undefined,
                                    };
                                    setSelectedCapaAction((prev) =>
                                      prev ? { ...prev, verification } : null,
                                    );
                                  }}
                                />
                                <Label htmlFor="effective-yes">
                                  Yes, effective
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="effective-no"
                                  checked={
                                    selectedCapaAction.verification
                                      ?.isEffective === false
                                  }
                                  onCheckedChange={(checked) => {
                                    const verification = {
                                      ...selectedCapaAction.verification,
                                      isEffective: checked ? false : undefined,
                                    };
                                    setSelectedCapaAction((prev) =>
                                      prev ? { ...prev, verification } : null,
                                    );
                                  }}
                                />
                                <Label htmlFor="effective-no">
                                  No, not effective
                                </Label>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              if (
                                selectedCapaAction.verification
                                  ?.verificationMethod &&
                                selectedCapaAction.verification
                                  ?.verificationDate &&
                                selectedCapaAction.verification?.isEffective !==
                                  undefined
                              ) {
                                handleUpdateCapaWorkflowStep(7, {
                                  verification: selectedCapaAction.verification,
                                });
                              } else {
                                toast({
                                  title: "Missing Information",
                                  description:
                                    "Please complete verification method, date, and effectiveness assessment.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            disabled={
                              selectedCapaAction.workflowSteps.find(
                                (s) => s.stepNumber === 7,
                              )?.status === "Completed"
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Verification
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Archive Confirmation Dialog */}
        <AlertDialog
          open={isArchiveConfirmOpen}
          onOpenChange={setIsArchiveConfirmOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Confirm CAPA Completion & Archive
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p>
                  You are about to mark this CAPA action as completed and move
                  it to the archive.
                </p>
                {pendingArchiveCapa && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm">
                      CAPA Action: {pendingArchiveCapa.capaAction.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pendingArchiveCapa.capaAction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">
                        Owner: {pendingArchiveCapa.capaAction.owner}
                      </Badge>
                      <Badge variant="outline">
                        {pendingArchiveCapa.capaAction.priority} Priority
                      </Badge>
                    </div>
                  </div>
                )}
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Once archived, this CAPA action
                    will be moved to the archived section and marked as
                    completed. This action cannot be undone.
                  </p>
                </div>
                <p className="text-sm">
                  Are you sure you want to proceed with completing and archiving
                  this CAPA action?
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelArchive}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmArchive}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Yes, Complete & Archive
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* New NC Report Dialog */}
        <Dialog open={isNewNCDialogOpen} onOpenChange={setIsNewNCDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Non-Conformity Report</DialogTitle>
              <DialogDescription>
                Report a new non-conformity. AI will help suggest root causes
                and CAPA actions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the issue"
                    value={newNCForm.title}
                    onChange={(e) =>
                      setNewNCForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity *</Label>
                  <Select
                    value={newNCForm.severity}
                    onValueChange={(value) =>
                      setNewNCForm((prev) => ({ ...prev, severity: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the non-conformity"
                  rows={3}
                  value={newNCForm.description}
                  onChange={(e) =>
                    setNewNCForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={newNCForm.department}
                    onValueChange={(value) =>
                      setNewNCForm((prev) => ({ ...prev, department: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Production Line 1">
                        Production Line 1
                      </SelectItem>
                      <SelectItem value="Production Line 2">
                        Production Line 2
                      </SelectItem>
                      <SelectItem value="Production Line 3">
                        Production Line 3
                      </SelectItem>
                      <SelectItem value="Quality Control">
                        Quality Control
                      </SelectItem>
                      <SelectItem value="Incoming Inspection">
                        Incoming Inspection
                      </SelectItem>
                      <SelectItem value="Shipping">Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <Select
                    value={newNCForm.assignedTo}
                    onValueChange={(value) =>
                      setNewNCForm((prev) => ({ ...prev, assignedTo: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="text-xs">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.role}
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewNCForm({
                      title: "",
                      description: "",
                      severity: "",
                      department: "",
                      dueDate: "",
                      assignedTo: "",
                    });
                    setIsNewNCDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleAIAutoFill}
                    disabled={!newNCForm.description}
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    AI Auto-Fill
                  </Button>
                  <Button onClick={handleCreateNC}>Create Report</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NonConformityManagement;
