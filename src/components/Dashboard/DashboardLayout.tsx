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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
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
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      label: "ISO Learning & Clauses",
      path: "/dashboard/iso-learning",
    },
    {
      icon: <Home className="mr-2 h-4 w-4" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FileText className="mr-2 h-4 w-4" />,
      label: "Document Generator",
      path: "/dashboard/documents",
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
      icon: <ClipboardCheck className="mr-2 h-4 w-4" />,
      label: "Audit Readiness",
      path: "/dashboard/audit",
    },
    {
      icon: <GitBranch className="mr-2 h-4 w-4" />,
      label: "Process Mapping",
      path: "/dashboard/processes",
    },
    {
      icon: <Users className="mr-2 h-4 w-4" />,
      label: "Supplier Management",
      path: "/dashboard/suppliers",
    },
  ];

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
                        onClick={() => setIsNCDropdownOpen(!isNCDropdownOpen)}
                        className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          {item.icon}
                          {item.label}
                        </div>
                        {isNCDropdownOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {isNCDropdownOpen && (
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>
                            <Link
                              to={item.path}
                              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            >
                              {item.icon}
                              All Non-Conformities
                            </Link>
                          </li>
                          {item.subItems?.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to="/dashboard/non-conformity"
                                onClick={() => {
                                  // Navigate to non-conformity page and set hash
                                  setTimeout(() => {
                                    window.location.hash = "capa";
                                  }, 100);
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
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Quality Manager</p>
              </div>
            </div>
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
                          onClick={() => setIsNCDropdownOpen(!isNCDropdownOpen)}
                          className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="flex items-center">
                            {item.icon}
                            {item.label}
                          </div>
                          {isNCDropdownOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                        {isNCDropdownOpen && (
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>
                              <Link
                                to={item.path}
                                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                              >
                                {item.icon}
                                All Non-Conformities
                              </Link>
                            </li>
                            {item.subItems?.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to="/dashboard/non-conformity"
                                  onClick={() => {
                                    // Navigate to non-conformity page and set hash
                                    setTimeout(() => {
                                      window.location.hash = "capa";
                                    }, 100);
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
                        className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t p-4">
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
