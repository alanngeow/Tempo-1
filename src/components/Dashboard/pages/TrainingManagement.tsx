import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  BookOpen,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Award,
  Target,
  TrendingUp,
  Bell,
} from "lucide-react";

const TrainingManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [isAddTrainingOpen, setIsAddTrainingOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [newTraining, setNewTraining] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    expiryMonths: "",
  });
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    hireDate: "",
  });

  // Sample data
  const employees = [
    {
      id: "1",
      name: "John Smith",
      position: "Quality Manager",
      department: "Quality Assurance",
      email: "john.smith@company.com",
      hireDate: "2022-01-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      completedTrainings: 12,
      pendingTrainings: 3,
      overdue: 1,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      position: "Process Engineer",
      department: "Operations",
      email: "sarah.johnson@company.com",
      hireDate: "2021-08-20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      completedTrainings: 15,
      pendingTrainings: 2,
      overdue: 0,
    },
    {
      id: "3",
      name: "Mike Davis",
      position: "Internal Auditor",
      department: "Quality Assurance",
      email: "mike.davis@company.com",
      hireDate: "2023-03-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      completedTrainings: 8,
      pendingTrainings: 4,
      overdue: 2,
    },
  ];

  const trainingRecords = [
    {
      id: "1",
      employeeId: "1",
      employeeName: "John Smith",
      trainingTitle: "ISO 9001:2015 Fundamentals",
      category: "Quality Management",
      completedDate: "2024-01-15",
      expiryDate: "2027-01-15",
      status: "Completed",
      score: "95%",
      certificate: "CERT-001-2024",
    },
    {
      id: "2",
      employeeId: "1",
      employeeName: "John Smith",
      trainingTitle: "Internal Auditing Techniques",
      category: "Auditing",
      completedDate: "2024-02-20",
      expiryDate: "2026-02-20",
      status: "Completed",
      score: "88%",
      certificate: "CERT-002-2024",
    },
    {
      id: "3",
      employeeId: "2",
      employeeName: "Sarah Johnson",
      trainingTitle: "Risk Management",
      category: "Risk Assessment",
      completedDate: "2024-01-10",
      expiryDate: "2026-01-10",
      status: "Completed",
      score: "92%",
      certificate: "CERT-003-2024",
    },
    {
      id: "4",
      employeeId: "3",
      employeeName: "Mike Davis",
      trainingTitle: "Document Control",
      category: "Documentation",
      completedDate: "",
      expiryDate: "",
      status: "Overdue",
      score: "",
      certificate: "",
      dueDate: "2024-01-30",
    },
  ];

  const skillsMatrix = [
    {
      skill: "ISO 9001 Knowledge",
      required: "Advanced",
      employees: {
        "1": "Advanced",
        "2": "Intermediate",
        "3": "Basic",
      },
    },
    {
      skill: "Internal Auditing",
      required: "Intermediate",
      employees: {
        "1": "Advanced",
        "2": "Basic",
        "3": "Intermediate",
      },
    },
    {
      skill: "Risk Assessment",
      required: "Intermediate",
      employees: {
        "1": "Intermediate",
        "2": "Advanced",
        "3": "Basic",
      },
    },
    {
      skill: "Document Control",
      required: "Basic",
      employees: {
        "1": "Advanced",
        "2": "Intermediate",
        "3": "Needs Training",
      },
    },
  ];

  const upcomingReminders = [
    {
      id: "1",
      employeeName: "John Smith",
      trainingTitle: "ISO 9001 Recertification",
      dueDate: "2024-04-15",
      type: "Renewal",
      priority: "High",
    },
    {
      id: "2",
      employeeName: "Sarah Johnson",
      trainingTitle: "Safety Training",
      dueDate: "2024-03-20",
      type: "Mandatory",
      priority: "Medium",
    },
    {
      id: "3",
      employeeName: "Mike Davis",
      trainingTitle: "Document Control",
      dueDate: "2024-02-28",
      type: "Overdue",
      priority: "Critical",
    },
  ];

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Basic":
        return "bg-blue-100 text-blue-800";
      case "Needs Training":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddTraining = () => {
    // Handle adding new training record
    console.log("Adding training:", newTraining);
    setNewTraining({
      title: "",
      description: "",
      category: "",
      duration: "",
      expiryMonths: "",
    });
    setIsAddTrainingOpen(false);
  };

  const handleAddEmployee = () => {
    // Handle adding new employee
    console.log("Adding employee:", newEmployee);
    setNewEmployee({
      name: "",
      position: "",
      department: "",
      email: "",
      hireDate: "",
    });
    setIsAddEmployeeOpen(false);
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Users className="mr-3 h-8 w-8 text-primary" />
          Training Management
        </h1>
        <p className="text-muted-foreground">
          Manage employee training records, skills matrix, and retraining
          reminders for ISO 9001 compliance.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Employees
                </p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Trainings
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    trainingRecords.filter((r) => r.status === "Completed")
                      .length
                  }
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Trainings
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {employees.reduce(
                    (sum, emp) => sum + emp.pendingTrainings,
                    0,
                  )}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Overdue Trainings
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {employees.reduce((sum, emp) => sum + emp.overdue, 0)}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="training-records">Training Records</TabsTrigger>
          <TabsTrigger value="skills-matrix">Skills Matrix</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <Dialog
              open={isAddEmployeeOpen}
              onOpenChange={setIsAddEmployeeOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                  <DialogDescription>
                    Add a new employee to the training management system.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      value={newEmployee.name}
                      onChange={(e) =>
                        setNewEmployee({ ...newEmployee, name: e.target.value })
                      }
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <Input
                      value={newEmployee.position}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          position: e.target.value,
                        })
                      }
                      placeholder="Enter position"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Select
                      value={newEmployee.department}
                      onValueChange={(value) =>
                        setNewEmployee({ ...newEmployee, department: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Quality Assurance">
                          Quality Assurance
                        </SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hire Date</label>
                    <Input
                      type="date"
                      value={newEmployee.hireDate}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          hireDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddEmployeeOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddEmployee}>Add Employee</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <Card
                key={employee.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback>
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {employee.position}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {employee.department}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Completed</span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {employee.completedTrainings}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Pending</span>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800"
                      >
                        {employee.pendingTrainings}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overdue</span>
                      <Badge
                        variant="secondary"
                        className={`${
                          employee.overdue > 0
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {employee.overdue}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedEmployee(employee.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training-records" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search training records..."
                  className="pl-8 w-[300px]"
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Dialog
                open={isAddTrainingOpen}
                onOpenChange={setIsAddTrainingOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Training Record
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Training Record</DialogTitle>
                    <DialogDescription>
                      Record a new training completion for an employee.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Training Title
                      </label>
                      <Input
                        value={newTraining.title}
                        onChange={(e) =>
                          setNewTraining({
                            ...newTraining,
                            title: e.target.value,
                          })
                        }
                        placeholder="Enter training title"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={newTraining.description}
                        onChange={(e) =>
                          setNewTraining({
                            ...newTraining,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter training description"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={newTraining.category}
                        onValueChange={(value) =>
                          setNewTraining({ ...newTraining, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Quality Management">
                            Quality Management
                          </SelectItem>
                          <SelectItem value="Auditing">Auditing</SelectItem>
                          <SelectItem value="Risk Assessment">
                            Risk Assessment
                          </SelectItem>
                          <SelectItem value="Documentation">
                            Documentation
                          </SelectItem>
                          <SelectItem value="Safety">Safety</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Duration (hours)
                        </label>
                        <Input
                          type="number"
                          value={newTraining.duration}
                          onChange={(e) =>
                            setNewTraining({
                              ...newTraining,
                              duration: e.target.value,
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Expiry (months)
                        </label>
                        <Input
                          type="number"
                          value={newTraining.expiryMonths}
                          onChange={(e) =>
                            setNewTraining({
                              ...newTraining,
                              expiryMonths: e.target.value,
                            })
                          }
                          placeholder="12"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddTrainingOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddTraining}>Add Record</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Training</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.employeeName}
                    </TableCell>
                    <TableCell>{record.trainingTitle}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.category}</Badge>
                    </TableCell>
                    <TableCell>
                      {record.completedDate || "Not completed"}
                    </TableCell>
                    <TableCell>
                      {record.expiryDate || record.dueDate || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${
                          record.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : record.status === "Overdue"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.score || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="skills-matrix" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Skills Matrix</h2>
              <p className="text-sm text-muted-foreground">
                Track employee competencies and identify training gaps
              </p>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Matrix
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Skill</TableHead>
                  <TableHead className="w-[120px]">Required Level</TableHead>
                  {employees.map((employee) => (
                    <TableHead key={employee.id} className="text-center">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-8 w-8 mb-1">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback className="text-xs">
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">
                          {employee.name.split(" ")[0]}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {skillsMatrix.map((skill, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{skill.skill}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getSkillLevelColor(skill.required)}
                      >
                        {skill.required}
                      </Badge>
                    </TableCell>
                    {employees.map((employee) => (
                      <TableCell key={employee.id} className="text-center">
                        <Badge
                          variant="secondary"
                          className={getSkillLevelColor(
                            skill.employees[employee.id] || "Not Assessed",
                          )}
                        >
                          {skill.employees[employee.id] || "N/A"}
                        </Badge>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Skill Level Legend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">
                    Advanced
                  </Badge>
                  <span className="text-sm">
                    Expert level, can train others
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Intermediate
                  </Badge>
                  <span className="text-sm">
                    Competent, works independently
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800">Basic</Badge>
                  <span className="text-sm">
                    Fundamental knowledge, needs guidance
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-red-100 text-red-800">
                    Needs Training
                  </Badge>
                  <span className="text-sm">Requires immediate training</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Training Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-800">
                    Critical: Mike Davis needs Document Control training
                  </p>
                  <p className="text-xs text-red-600">
                    Required skill level not met
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">
                    Recommended: Sarah Johnson - ISO 9001 Advanced
                  </p>
                  <p className="text-xs text-yellow-600">
                    Upgrade from Intermediate to Advanced
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">
                    Suggested: Mike Davis - Internal Auditing Refresher
                  </p>
                  <p className="text-xs text-blue-600">
                    Maintain current skill level
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Training Reminders
              </h2>
              <p className="text-sm text-muted-foreground">
                Upcoming training deadlines and renewal notifications
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Set Reminder
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Due This Week
                    </p>
                    <p className="text-2xl font-bold text-orange-600">2</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Due This Month
                    </p>
                    <p className="text-2xl font-bold text-yellow-600">5</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Overdue
                    </p>
                    <p className="text-2xl font-bold text-red-600">1</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {upcomingReminders.map((reminder) => (
              <Card
                key={reminder.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reminder.employeeName.toLowerCase().replace(" ", "")}`}
                          />
                          <AvatarFallback>
                            {reminder.employeeName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {reminder.employeeName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {reminder.trainingTitle}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{reminder.type}</Badge>
                          <Badge
                            variant="secondary"
                            className={getPriorityColor(reminder.priority)}
                          >
                            {reminder.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        Due: {new Date(reminder.dueDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.ceil(
                          (new Date(reminder.dueDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                        {Math.ceil(
                          (new Date(reminder.dueDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        ) < 0
                          ? " overdue"
                          : " remaining"}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">
                          Send Reminder
                        </Button>
                        <Button size="sm">Schedule Training</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingManagement;
