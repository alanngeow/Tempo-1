import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NewContent from "./NewContent";
import {
  Bell,
  Search,
  FileText,
  ClipboardCheck,
  GitBranch,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  CheckSquare,
  Bot,
  Upload,
  Sparkles,
  MessageSquare,
  GraduationCap,
  Video,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNCDropdownOpen, setIsNCDropdownOpen] = useState(false);
  const [isTrainingDropdownOpen, setIsTrainingDropdownOpen] = useState(false);

  const [isAIConsultantOpen, setIsAIConsultantOpen] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [consultantQuery, setConsultantQuery] = useState("");

  const certificationStages = [
    { name: "Preparation (Gap Analysis)", completed: true },
    { name: "Internal Audit", completed: false },
    { name: "Reporting & Corrective Actions", completed: false },
    { name: "Second Audit", completed: false },
    { name: "Certification", completed: false },
    { name: "Maintain QMS", completed: false },
  ];

  const currentStage = 1; // User is in first stage (Preparation)
  const progressPercentage = (currentStage / certificationStages.length) * 100;

  const navItems = [
    {
      icon: <Home className="mr-2 h-4 w-4" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      label: "ISO 9001 Clauses",
      path: "/dashboard/iso-learning",
      isHighlighted: true,
    },
    {
      icon: <FileText className="mr-2 h-4 w-4" />,
      label: "Document Control",
      path: "/dashboard/document-control",
    },
    {
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
      label: "Customer Complaints",
      path: "/dashboard/customer-complaints",
    },
    {
      icon: <AlertTriangle className="mr-2 h-4 w-4" />,
      label: "Non-Conformity Management",
      path: "/dashboard/non-conformity",
      hasDropdown: true,
      subItems: [
        {
          icon: <CheckSquare className="mr-2 h-4 w-4" />,
          label: "CAPA Management",
          path: "/dashboard/non-conformity#capa",
        },
      ],
    },
    {
      icon: <GraduationCap className="mr-2 h-4 w-4" />,
      label: "Training",
      path: "/dashboard/training",
      hasDropdown: true,
      subItems: [
        {
          icon: <BookOpen className="mr-2 h-4 w-4" />,
          label: "Courses",
          path: "/dashboard/training/courses",
        },
        {
          icon: <Video className="mr-2 h-4 w-4" />,
          label: "Webinars",
          path: "/dashboard/training/webinars",
        },
        {
          icon: <Calendar className="mr-2 h-4 w-4" />,
          label: "Training Management",
          path: "/dashboard/training/management",
        },
      ],
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDocument(file);
    }
  };

  const handleConsultantSubmit = () => {
    // Handle AI consultant query submission
    console.log("Document:", uploadedDocument?.name);
    console.log("Query:", consultantQuery);
    // Reset form
    setUploadedDocument(null);
    setConsultantQuery("");
    setIsAIConsultantOpen(false);
  };

  return (
    <div className="flex h-screen bg-background flex-col">
      {/* ISO 9001 Progress Bar */}
      <div className="bg-card border-b px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-foreground">
              ISO 9001 Certification Progress
            </h3>
            <span className="text-xs text-muted-foreground">
              Stage {currentStage} of {certificationStages.length}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            {certificationStages.map((stage, index) => (
              <span
                key={index}
                className={`${
                  index < currentStage
                    ? "text-primary font-medium"
                    : index === currentStage - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                }`}
              >
                {stage.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-card">
          <div className="flex h-14 items-center border-b px-4">
            <h1 className="text-xl font-semibold">ISO Compliance AI</h1>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => {
                          if (item.label === "Non-Conformity Management") {
                            setIsNCDropdownOpen(!isNCDropdownOpen);
                          } else if (item.label === "Training") {
                            setIsTrainingDropdownOpen(!isTrainingDropdownOpen);
                          }
                        }}
                        className={`flex items-start justify-between w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground text-left ${
                          item.isHighlighted
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 font-semibold shadow-sm"
                            : ""
                        }`}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          {item.label}
                          {item.isHighlighted && (
                            <span className="ml-auto mr-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                              Core
                            </span>
                          )}
                        </div>
                        {(item.label === "Non-Conformity Management" &&
                          isNCDropdownOpen) ||
                        (item.label === "Training" &&
                          isTrainingDropdownOpen) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {((item.label === "Non-Conformity Management" &&
                        isNCDropdownOpen) ||
                        (item.label === "Training" &&
                          isTrainingDropdownOpen)) && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.label === "Non-Conformity Management" && (
                            <li>
                              <Link
                                to={item.path}
                                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                              >
                                {item.icon}
                                All Non-Conformities
                              </Link>
                            </li>
                          )}
                          {item.subItems?.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.path}
                                onClick={() => {
                                  if (
                                    item.label === "Non-Conformity Management"
                                  ) {
                                    // Navigate to non-conformity page and set hash
                                    setTimeout(() => {
                                      window.location.hash = "capa";
                                    }, 100);
                                  }
                                }}
                                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                              >
                                {subItem.icon}
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                        item.isHighlighted
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 font-semibold shadow-sm"
                          : ""
                      }`}
                    >
                      {item.icon}
                      {item.label}
                      {item.isHighlighted && (
                        <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          Core
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* AI Consultant Button */}
          <div className="border-t p-4">
            <Dialog
              open={isAIConsultantOpen}
              onOpenChange={setIsAIConsultantOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                  <Bot className="mr-2 h-4 w-4" />
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Consultant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-purple-600" />
                    AI Consultant - ISO Clause Analysis
                  </DialogTitle>
                  <DialogDescription>
                    Upload your document and ask the AI Consultant to analyze it
                    against specific ISO 9001 clauses.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Upload Document
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="document-upload"
                        accept=".pdf,.doc,.docx,.txt"
                      />
                      <label
                        htmlFor="document-upload"
                        className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                      >
                        {uploadedDocument ? (
                          <span className="text-green-600 font-medium">
                            ✓ {uploadedDocument.name}
                          </span>
                        ) : (
                          <span>
                            Click to upload or drag and drop
                            <br />
                            <span className="text-xs text-gray-400">
                              PDF, DOC, DOCX, TXT up to 10MB
                            </span>
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Question</label>
                    <Textarea
                      placeholder="Ask the AI Consultant about specific ISO clauses, e.g., 'Does my document meet the requirements of clause 4.1 - Understanding the organization and its context?'"
                      value={consultantQuery}
                      onChange={(e) => setConsultantQuery(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAIConsultantOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConsultantSubmit}
                    disabled={!uploadedDocument || !consultantQuery.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    Analyze Document
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-14 items-center border-b px-4">
              <h1 className="text-xl font-semibold">ISO Compliance AI</h1>
            </div>
            <nav className="flex-1 overflow-auto py-4">
              <ul className="space-y-1 px-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => {
                            if (item.label === "Non-Conformity Management") {
                              setIsNCDropdownOpen(!isNCDropdownOpen);
                            } else if (item.label === "Training") {
                              setIsTrainingDropdownOpen(
                                !isTrainingDropdownOpen,
                              );
                            }
                          }}
                          className={`flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                            item.isHighlighted
                              ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 font-semibold shadow-sm"
                              : ""
                          }`}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            {item.label}
                            {item.isHighlighted && (
                              <span className="ml-auto mr-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                Core
                              </span>
                            )}
                          </div>
                          {(item.label === "Non-Conformity Management" &&
                            isNCDropdownOpen) ||
                          (item.label === "Training" &&
                            isTrainingDropdownOpen) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                        {((item.label === "Non-Conformity Management" &&
                          isNCDropdownOpen) ||
                          (item.label === "Training" &&
                            isTrainingDropdownOpen)) && (
                          <ul className="ml-4 mt-1 space-y-1">
                            {item.label === "Non-Conformity Management" && (
                              <li>
                                <Link
                                  to={item.path}
                                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                >
                                  {item.icon}
                                  All Non-Conformities
                                </Link>
                              </li>
                            )}
                            {item.subItems?.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subItem.path}
                                  onClick={() => {
                                    if (
                                      item.label === "Non-Conformity Management"
                                    ) {
                                      // Navigate to non-conformity page and set hash
                                      setTimeout(() => {
                                        window.location.hash = "capa";
                                      }, 100);
                                    }
                                  }}
                                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                >
                                  {subItem.icon}
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                          item.isHighlighted
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 font-semibold shadow-sm"
                            : ""
                        }`}
                      >
                        {item.icon}
                        {item.label}
                        {item.isHighlighted && (
                          <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            Core
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* AI Consultant Button for Mobile */}
            <div className="border-t p-4">
              <Dialog
                open={isAIConsultantOpen}
                onOpenChange={setIsAIConsultantOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg mb-4">
                    <Bot className="mr-2 h-4 w-4" />
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Consultant
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <Bot className="mr-2 h-5 w-5 text-purple-600" />
                      AI Consultant - ISO Clause Analysis
                    </DialogTitle>
                    <DialogDescription>
                      Upload your document and ask the AI Consultant to analyze
                      it against specific ISO 9001 clauses.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Upload Document
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="document-upload-mobile"
                          accept=".pdf,.doc,.docx,.txt"
                        />
                        <label
                          htmlFor="document-upload-mobile"
                          className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                        >
                          {uploadedDocument ? (
                            <span className="text-green-600 font-medium">
                              ✓ {uploadedDocument.name}
                            </span>
                          ) : (
                            <span>
                              Click to upload or drag and drop
                              <br />
                              <span className="text-xs text-gray-400">
                                PDF, DOC, DOCX, TXT up to 10MB
                              </span>
                            </span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Your Question
                      </label>
                      <Textarea
                        placeholder="Ask the AI Consultant about specific ISO clauses, e.g., 'Does my document meet the requirements of clause 4.1 - Understanding the organization and its context?'"
                        value={consultantQuery}
                        onChange={(e) => setConsultantQuery(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAIConsultantOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConsultantSubmit}
                      disabled={!uploadedDocument || !consultantQuery.trim()}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Bot className="mr-2 h-4 w-4" />
                      Analyze Document
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    Quality Manager
                  </p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
