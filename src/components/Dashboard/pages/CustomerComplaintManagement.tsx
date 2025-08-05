import React, { useState } from "react";
import {
  MessageSquare,
  Plus,
  Eye,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Wrench,
  User,
  Calendar,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface CustomerComplaint {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  complaintDate: string;
  productService: string;
  complaintDescription: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "Resolved";
  assignedTo?: string;
  rootCauseId?: string;
  rootCauseDescription?: string;
  correctiveActions: CorrectiveAction[];
  resolutionDate?: string;
  customerSatisfaction?:
    | "Very Satisfied"
    | "Satisfied"
    | "Neutral"
    | "Dissatisfied"
    | "Very Dissatisfied";
  followUpRequired: boolean;
  attachments?: string[];
  internalNotes?: string;
}

interface CorrectiveAction {
  id: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
  completedDate?: string;
  notes?: string;
}

const CustomerComplaintManagement = () => {
  // Customer Complaint Form State
  const [customerComplaints, setCustomerComplaints] = useState<
    CustomerComplaint[]
  >([]);
  const [isComplaintFormOpen, setIsComplaintFormOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] =
    useState<CustomerComplaint | null>(null);
  const [complaintForm, setComplaintForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    productService: "",
    complaintDescription: "",
    severity: "Medium" as "Low" | "Medium" | "High" | "Critical",
    assignedTo: "",
    rootCauseDescription: "",
    internalNotes: "",
  });
  const [newCorrectiveAction, setNewCorrectiveAction] = useState({
    description: "",
    assignedTo: "",
    dueDate: "",
  });

  // Initialize sample customer complaints
  React.useEffect(() => {
    const sampleComplaints: CustomerComplaint[] = [
      {
        id: "CC-2024-001",
        customerName: "John Smith",
        customerEmail: "john.smith@email.com",
        customerPhone: "+1-555-0123",
        complaintDate: "2024-01-20",
        productService: "Widget Pro Model X",
        complaintDescription:
          "Product arrived damaged with visible cracks on the surface. Packaging appeared intact but product was clearly damaged during shipping or manufacturing.",
        severity: "High",
        status: "Open",
        assignedTo: "Customer Service Manager",
        rootCauseId: "RC-001",
        rootCauseDescription:
          "Inadequate packaging protection for fragile components during shipping",
        correctiveActions: [
          {
            id: "CA-001",
            description:
              "Review and upgrade packaging materials for fragile products",
            assignedTo: "Packaging Engineer",
            dueDate: "2024-02-15",
            status: "In Progress",
            notes: "Evaluating foam inserts and reinforced boxes",
          },
          {
            id: "CA-002",
            description: "Implement additional quality checks before shipping",
            assignedTo: "QC Inspector",
            dueDate: "2024-02-10",
            status: "Pending",
          },
        ],
        followUpRequired: true,
        internalNotes:
          "Customer is a long-term client, priority resolution required",
      },
      {
        id: "CC-2024-002",
        customerName: "Sarah Johnson",
        customerEmail: "sarah.j@company.com",
        complaintDate: "2024-01-18",
        productService: "Premium Service Package",
        complaintDescription:
          "Service technician arrived 2 hours late without prior notification. Work quality was satisfactory but communication was poor.",
        severity: "Medium",
        status: "Resolved",
        assignedTo: "Service Manager",
        rootCauseId: "RC-002",
        rootCauseDescription:
          "Lack of real-time communication system between dispatch and customers",
        correctiveActions: [
          {
            id: "CA-003",
            description:
              "Implement automated SMS notification system for service appointments",
            assignedTo: "IT Manager",
            dueDate: "2024-01-25",
            status: "Completed",
            completedDate: "2024-01-24",
            notes: "SMS system deployed and tested successfully",
          },
        ],
        resolutionDate: "2024-01-25",
        customerSatisfaction: "Satisfied",
        followUpRequired: false,
        internalNotes:
          "Customer appreciated quick resolution and proactive communication",
      },
    ];
    setCustomerComplaints(sampleComplaints);
  }, []);

  // Customer Complaint Handlers
  const handleCreateComplaint = () => {
    if (
      !complaintForm.customerName ||
      !complaintForm.customerEmail ||
      !complaintForm.complaintDescription
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newComplaint: CustomerComplaint = {
      id: `CC-2024-${String(customerComplaints.length + 1).padStart(3, "0")}`,
      customerName: complaintForm.customerName,
      customerEmail: complaintForm.customerEmail,
      customerPhone: complaintForm.customerPhone,
      complaintDate: new Date().toISOString().split("T")[0],
      productService: complaintForm.productService,
      complaintDescription: complaintForm.complaintDescription,
      severity: complaintForm.severity,
      status: "Open",
      assignedTo: complaintForm.assignedTo,
      rootCauseDescription: complaintForm.rootCauseDescription,
      correctiveActions: [],
      followUpRequired: true,
      internalNotes: complaintForm.internalNotes,
    };

    setCustomerComplaints([newComplaint, ...customerComplaints]);
    setComplaintForm({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      productService: "",
      complaintDescription: "",
      severity: "Medium",
      assignedTo: "",
      rootCauseDescription: "",
      internalNotes: "",
    });
    setIsComplaintFormOpen(false);
  };

  const handleAddCorrectiveAction = (complaintId: string) => {
    if (
      !newCorrectiveAction.description ||
      !newCorrectiveAction.assignedTo ||
      !newCorrectiveAction.dueDate
    ) {
      alert("Please fill in all corrective action fields");
      return;
    }

    const action: CorrectiveAction = {
      id: `CA-${Date.now()}`,
      description: newCorrectiveAction.description,
      assignedTo: newCorrectiveAction.assignedTo,
      dueDate: newCorrectiveAction.dueDate,
      status: "Pending",
    };

    setCustomerComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              correctiveActions: [...complaint.correctiveActions, action],
            }
          : complaint,
      ),
    );

    setNewCorrectiveAction({
      description: "",
      assignedTo: "",
      dueDate: "",
    });
  };

  const handleUpdateComplaintStatus = (
    complaintId: string,
    status: "Open" | "Resolved",
  ) => {
    setCustomerComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status,
              resolutionDate:
                status === "Resolved"
                  ? new Date().toISOString().split("T")[0]
                  : undefined,
            }
          : complaint,
      ),
    );
  };

  const handleUpdateActionStatus = (
    complaintId: string,
    actionId: string,
    status: CorrectiveAction["status"],
  ) => {
    setCustomerComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              correctiveActions: complaint.correctiveActions.map((action) =>
                action.id === actionId
                  ? {
                      ...action,
                      status,
                      completedDate:
                        status === "Completed"
                          ? new Date().toISOString().split("T")[0]
                          : undefined,
                    }
                  : action,
              ),
            }
          : complaint,
      ),
    );
  };

  const getComplaintStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800 border-red-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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

  const getActionStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Customer Complaint Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage customer complaints with linked root causes and corrective
              actions
            </p>
          </div>
          <Button onClick={() => setIsComplaintFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Complaint
          </Button>
        </div>

        {/* Complaints Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Complaints
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customerComplaints.length}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {customerComplaints.filter((c) => c.status === "Open").length}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {
                  customerComplaints.filter((c) => c.status === "Resolved")
                    .length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully closed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                High Priority
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {
                  customerComplaints.filter(
                    (c) => c.severity === "High" || c.severity === "Critical",
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">Critical & High</p>
            </CardContent>
          </Card>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {customerComplaints.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    No customer complaints
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Customer complaints will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            customerComplaints.map((complaint) => (
              <Card
                key={complaint.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-lg">
                          {complaint.id}
                        </CardTitle>
                        <Badge
                          className={getComplaintStatusColor(complaint.status)}
                        >
                          {complaint.status}
                        </Badge>
                        <Badge className={getSeverityColor(complaint.severity)}>
                          {complaint.severity}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>
                            <strong>Customer:</strong> {complaint.customerName}
                          </p>
                          <p>
                            <strong>Email:</strong> {complaint.customerEmail}
                          </p>
                          {complaint.customerPhone && (
                            <p>
                              <strong>Phone:</strong> {complaint.customerPhone}
                            </p>
                          )}
                        </div>
                        <div>
                          <p>
                            <strong>Product/Service:</strong>{" "}
                            {complaint.productService}
                          </p>
                          <p>
                            <strong>Date:</strong> {complaint.complaintDate}
                          </p>
                          {complaint.assignedTo && (
                            <p>
                              <strong>Assigned to:</strong>{" "}
                              {complaint.assignedTo}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p>
                          <strong>Description:</strong>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {complaint.complaintDescription}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Select
                        value={complaint.status}
                        onValueChange={(value: "Open" | "Resolved") =>
                          handleUpdateComplaintStatus(complaint.id, value)
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>

                {/* Root Cause Section */}
                {complaint.rootCauseDescription && (
                  <CardContent className="pt-0">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Root Cause Analysis
                      </h4>
                      <p className="text-sm text-blue-800">
                        {complaint.rootCauseDescription}
                      </p>
                    </div>
                  </CardContent>
                )}

                {/* Corrective Actions Section */}
                {complaint.correctiveActions.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        Corrective Actions ({complaint.correctiveActions.length}
                        )
                      </h4>
                      <div className="space-y-2">
                        {complaint.correctiveActions.map((action) => (
                          <div
                            key={action.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {action.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <span>Assigned to: {action.assignedTo}</span>
                                <span>Due: {action.dueDate}</span>
                                {action.completedDate && (
                                  <span className="text-green-600">
                                    Completed: {action.completedDate}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Select
                              value={action.status}
                              onValueChange={(
                                value: CorrectiveAction["status"],
                              ) =>
                                handleUpdateActionStatus(
                                  complaint.id,
                                  action.id,
                                  value,
                                )
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="In Progress">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="Completed">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Customer Complaint Form Dialog */}
        <Dialog
          open={isComplaintFormOpen}
          onOpenChange={setIsComplaintFormOpen}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Customer Complaint</DialogTitle>
              <DialogDescription>
                Record a new customer complaint with root cause analysis and
                corrective actions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Customer Name *</Label>
                      <Input
                        placeholder="Enter customer name"
                        value={complaintForm.customerName}
                        onChange={(e) =>
                          setComplaintForm((prev) => ({
                            ...prev,
                            customerName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address *</Label>
                      <Input
                        type="email"
                        placeholder="customer@email.com"
                        value={complaintForm.customerEmail}
                        onChange={(e) =>
                          setComplaintForm((prev) => ({
                            ...prev,
                            customerEmail: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="+1-555-0123"
                        value={complaintForm.customerPhone}
                        onChange={(e) =>
                          setComplaintForm((prev) => ({
                            ...prev,
                            customerPhone: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Product/Service</Label>
                      <Input
                        placeholder="Product or service name"
                        value={complaintForm.productService}
                        onChange={(e) =>
                          setComplaintForm((prev) => ({
                            ...prev,
                            productService: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Complaint Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Complaint Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Complaint Description *</Label>
                    <Textarea
                      placeholder="Describe the customer's complaint in detail..."
                      rows={4}
                      value={complaintForm.complaintDescription}
                      onChange={(e) =>
                        setComplaintForm((prev) => ({
                          ...prev,
                          complaintDescription: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Severity</Label>
                      <Select
                        value={complaintForm.severity}
                        onValueChange={(
                          value: "Low" | "Medium" | "High" | "Critical",
                        ) =>
                          setComplaintForm((prev) => ({
                            ...prev,
                            severity: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Assign To</Label>
                      <Input
                        placeholder="Responsible person"
                        value={complaintForm.assignedTo}
                        onChange={(e) =>
                          setComplaintForm((prev) => ({
                            ...prev,
                            assignedTo: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Root Cause Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Root Cause Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label>Root Cause Description</Label>
                    <Textarea
                      placeholder="Describe the identified root cause of the complaint..."
                      rows={3}
                      value={complaintForm.rootCauseDescription}
                      onChange={(e) =>
                        setComplaintForm((prev) => ({
                          ...prev,
                          rootCauseDescription: e.target.value,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Internal Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Internal Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label>Internal Notes</Label>
                    <Textarea
                      placeholder="Add any internal notes or observations..."
                      rows={3}
                      value={complaintForm.internalNotes}
                      onChange={(e) =>
                        setComplaintForm((prev) => ({
                          ...prev,
                          internalNotes: e.target.value,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setComplaintForm({
                    customerName: "",
                    customerEmail: "",
                    customerPhone: "",
                    productService: "",
                    complaintDescription: "",
                    severity: "Medium",
                    assignedTo: "",
                    rootCauseDescription: "",
                    internalNotes: "",
                  });
                  setIsComplaintFormOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateComplaint}>
                <Save className="mr-2 h-4 w-4" />
                Create Complaint
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Complaint Details Dialog */}
        <Dialog
          open={!!selectedComplaint}
          onOpenChange={() => setSelectedComplaint(null)}
        >
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            {selectedComplaint && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    {selectedComplaint.id} - Customer Complaint Details
                  </DialogTitle>
                  <DialogDescription>
                    Complete complaint information with root cause and
                    corrective actions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Customer & Complaint Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Customer Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getComplaintStatusColor(
                              selectedComplaint.status,
                            )}
                          >
                            {selectedComplaint.status}
                          </Badge>
                          <Badge
                            className={getSeverityColor(
                              selectedComplaint.severity,
                            )}
                          >
                            {selectedComplaint.severity}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Name:</strong>{" "}
                            {selectedComplaint.customerName}
                          </p>
                          <p>
                            <strong>Email:</strong>{" "}
                            {selectedComplaint.customerEmail}
                          </p>
                          {selectedComplaint.customerPhone && (
                            <p>
                              <strong>Phone:</strong>{" "}
                              {selectedComplaint.customerPhone}
                            </p>
                          )}
                          <p>
                            <strong>Date:</strong>{" "}
                            {selectedComplaint.complaintDate}
                          </p>
                          {selectedComplaint.assignedTo && (
                            <p>
                              <strong>Assigned to:</strong>{" "}
                              {selectedComplaint.assignedTo}
                            </p>
                          )}
                          {selectedComplaint.resolutionDate && (
                            <p>
                              <strong>Resolved:</strong>{" "}
                              {selectedComplaint.resolutionDate}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Complaint Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">
                            Product/Service:
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedComplaint.productService}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Description:</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedComplaint.complaintDescription}
                          </p>
                        </div>
                        {selectedComplaint.internalNotes && (
                          <div>
                            <p className="text-sm font-medium">
                              Internal Notes:
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedComplaint.internalNotes}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Root Cause */}
                  {selectedComplaint.rootCauseDescription && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="h-5 w-5" />
                          Root Cause Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          {selectedComplaint.rootCauseDescription}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Corrective Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Wrench className="h-5 w-5" />
                        Corrective Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Add New Corrective Action */}
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="font-medium mb-3">
                          Add New Corrective Action
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Input
                            placeholder="Action description"
                            value={newCorrectiveAction.description}
                            onChange={(e) =>
                              setNewCorrectiveAction((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                          />
                          <Input
                            placeholder="Assigned to"
                            value={newCorrectiveAction.assignedTo}
                            onChange={(e) =>
                              setNewCorrectiveAction((prev) => ({
                                ...prev,
                                assignedTo: e.target.value,
                              }))
                            }
                          />
                          <div className="flex gap-2">
                            <Input
                              type="date"
                              value={newCorrectiveAction.dueDate}
                              onChange={(e) =>
                                setNewCorrectiveAction((prev) => ({
                                  ...prev,
                                  dueDate: e.target.value,
                                }))
                              }
                            />
                            <Button
                              size="sm"
                              onClick={() =>
                                handleAddCorrectiveAction(selectedComplaint.id)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Existing Actions */}
                      <div className="space-y-3">
                        {selectedComplaint.correctiveActions.map((action) => (
                          <div
                            key={action.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium">
                                  {action.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                  <span>Assigned to: {action.assignedTo}</span>
                                  <span>Due: {action.dueDate}</span>
                                  {action.completedDate && (
                                    <span className="text-green-600">
                                      Completed: {action.completedDate}
                                    </span>
                                  )}
                                </div>
                                {action.notes && (
                                  <p className="text-sm text-muted-foreground mt-2">
                                    <strong>Notes:</strong> {action.notes}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  className={getActionStatusColor(
                                    action.status,
                                  )}
                                >
                                  {action.status}
                                </Badge>
                                <Select
                                  value={action.status}
                                  onValueChange={(
                                    value: CorrectiveAction["status"],
                                  ) =>
                                    handleUpdateActionStatus(
                                      selectedComplaint.id,
                                      action.id,
                                      value,
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="In Progress">
                                      In Progress
                                    </SelectItem>
                                    <SelectItem value="Completed">
                                      Completed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ))}
                        {selectedComplaint.correctiveActions.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No corrective actions added yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedComplaint(null)}
                  >
                    Close
                  </Button>
                  <Select
                    value={selectedComplaint.status}
                    onValueChange={(value: "Open" | "Resolved") => {
                      handleUpdateComplaintStatus(selectedComplaint.id, value);
                      setSelectedComplaint((prev) =>
                        prev ? { ...prev, status: value } : null,
                      );
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Mark as Open</SelectItem>
                      <SelectItem value="Resolved">Mark as Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerComplaintManagement;
