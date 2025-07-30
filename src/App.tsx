import { Suspense, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import ComplianceOverview from "./components/Dashboard/ComplianceOverview";
import ModuleCards from "./components/Dashboard/ModuleCards";
import RecentActivity from "./components/Dashboard/RecentActivity";
import NonConformityManagement from "./components/Dashboard/pages/NonConformityManagement";
import routes from "tempo-routes";

// Dashboard Home Component
const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">IndustryQ Dashboard</h1>
        <p className="text-muted-foreground">
          Your ISO 9001 certification journey made simple with AI
        </p>
      </div>
      <ComplianceOverview />
      <ModuleCards />
      <RecentActivity />
    </div>
  );
};

// Placeholder components for other sections
const DocumentGenerator = () => (
  <div className="bg-white p-6 rounded-lg">
    <h1 className="text-3xl font-bold mb-4">Smart Document Generator</h1>
    <p className="text-muted-foreground mb-6">
      Create ISO 9001 compliant documentation tailored to your industry with AI
      assistance.
    </p>
    <div className="bg-muted/30 p-8 rounded-lg text-center">
      <p className="text-lg">Document Generator interface coming soon...</p>
    </div>
  </div>
);

const AuditReadiness = () => (
  <div className="bg-white p-6 rounded-lg">
    <h1 className="text-3xl font-bold mb-4">Audit Readiness Dashboard</h1>
    <p className="text-muted-foreground mb-6">
      Track compliance gaps and prepare for audits with simulated audit
      scenarios.
    </p>
    <div className="bg-muted/30 p-8 rounded-lg text-center">
      <p className="text-lg">Audit Readiness dashboard coming soon...</p>
    </div>
  </div>
);

const ProcessMapping = () => (
  <div className="bg-white p-6 rounded-lg">
    <h1 className="text-3xl font-bold mb-4">Process Mapping Tool</h1>
    <p className="text-muted-foreground mb-6">
      Create visual process maps with automatic ISO requirement connections.
    </p>
    <div className="bg-muted/30 p-8 rounded-lg text-center">
      <p className="text-lg">Process Mapping tool coming soon...</p>
    </div>
  </div>
);

const SupplierManagement = () => (
  <div className="bg-white p-6 rounded-lg">
    <h1 className="text-3xl font-bold mb-4">Supplier Management</h1>
    <p className="text-muted-foreground mb-6">
      Monitor supplier certifications and generate compliance reports for
      audits.
    </p>
    <div className="bg-muted/30 p-8 rounded-lg text-center">
      <p className="text-lg">Supplier Management module coming soon...</p>
    </div>
  </div>
);

// Integrated ISO Learning & Clauses Component
const ISOLearningAndClauses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [openClauses, setOpenClauses] = useState<Record<string, boolean>>({});
  const [checkedClauses, setCheckedClauses] = useState<Record<string, boolean>>(
    {},
  );

  const handleClauseCheck = (clauseId: string) => {
    setCheckedClauses((prev) => ({
      ...prev,
      [clauseId]: !prev[clauseId],
    }));
  };

  const toggleClause = (clauseId: string) => {
    setOpenClauses((prev) => ({
      ...prev,
      [clauseId]: !prev[clauseId],
    }));
  };

  const courses = [
    {
      id: 1,
      title: "ISO 9001:2015 Fundamentals",
      description:
        "Complete introduction to ISO 9001 quality management system",
      duration: "4 hours",
      modules: 8,
      progress: 75,
      difficulty: "Beginner",
      rating: 4.8,
      enrolled: 1250,
      category: "Fundamentals",
    },
    {
      id: 2,
      title: "Internal Auditing Mastery",
      description:
        "Advanced techniques for conducting effective internal audits",
      duration: "6 hours",
      modules: 12,
      progress: 30,
      difficulty: "Advanced",
      rating: 4.9,
      enrolled: 890,
      category: "Auditing",
    },
    {
      id: 3,
      title: "Risk-Based Thinking",
      description: "Understanding and implementing risk-based approaches",
      duration: "3 hours",
      modules: 6,
      progress: 0,
      difficulty: "Intermediate",
      rating: 4.7,
      enrolled: 650,
      category: "Risk Management",
    },
    {
      id: 4,
      title: "Document Control Best Practices",
      description: "Effective document and record management strategies",
      duration: "2 hours",
      modules: 4,
      progress: 100,
      difficulty: "Beginner",
      rating: 4.6,
      enrolled: 980,
      category: "Documentation",
    },
  ];

  const webinars = [
    {
      id: 1,
      title: "Preparing for External Audits",
      date: "2024-03-15",
      time: "2:00 PM EST",
      presenter: "Sarah Chen, Lead Auditor",
      status: "upcoming",
      attendees: 245,
    },
    {
      id: 2,
      title: "Digital Transformation in QMS",
      date: "2024-02-28",
      time: "1:00 PM EST",
      presenter: "Michael Rodriguez, QMS Expert",
      status: "recorded",
      attendees: 380,
    },
    {
      id: 3,
      title: "Customer Satisfaction Metrics",
      date: "2024-04-10",
      time: "3:00 PM EST",
      presenter: "Lisa Wang, Quality Manager",
      status: "upcoming",
      attendees: 156,
    },
  ];

  const chatHistory = [
    {
      id: 1,
      type: "user",
      message: "What are the key requirements for clause 8.4 in ISO 9001?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      type: "ai",
      message:
        "Clause 8.4 covers Control of externally provided processes, products and services. The key requirements include: 1) Determining controls for external providers, 2) Defining criteria for evaluation and selection, 3) Ensuring external providers meet requirements, and 4) Maintaining documented information about evaluations.",
      timestamp: "10:31 AM",
    },
    {
      id: 3,
      type: "user",
      message: "Can you provide an example of supplier evaluation criteria?",
      timestamp: "10:35 AM",
    },
    {
      id: 4,
      type: "ai",
      message:
        "Here are common supplier evaluation criteria: Quality certifications (ISO 9001, industry-specific), Financial stability, Delivery performance, Technical capabilities, Customer references, Compliance with regulations, and Risk assessment scores. You should weight these based on your organization's priorities.",
      timestamp: "10:36 AM",
    },
  ];

  const achievements = [
    { title: "First Course Completed", icon: "🎓", earned: true },
    { title: "ISO 9001 Expert", icon: "🏆", earned: true },
    { title: "Audit Master", icon: "🔍", earned: false },
    { title: "Learning Streak - 7 days", icon: "🔥", earned: true },
  ];

  const isoClauses = [
    {
      id: "4",
      title: "Context of the organization",
      subclauses: [
        { id: "4.1", title: "Understanding the organization and its context" },
        {
          id: "4.2",
          title:
            "Understanding the needs and expectations of interested parties",
        },
        {
          id: "4.3",
          title: "Determining the scope of the quality management system",
        },
        { id: "4.4", title: "Quality management system and its processes" },
      ],
    },
    {
      id: "5",
      title: "Leadership",
      subclauses: [
        { id: "5.1", title: "Leadership and commitment" },
        { id: "5.1.1", title: "General" },
        { id: "5.1.2", title: "Customer focus" },
        { id: "5.2", title: "Policy" },
        { id: "5.2.1", title: "Establishing the quality policy" },
        { id: "5.2.2", title: "Communicating the quality policy" },
        {
          id: "5.3",
          title: "Organizational roles, responsibilities and authorities",
        },
      ],
    },
    {
      id: "6",
      title: "Planning",
      subclauses: [
        { id: "6.1", title: "Actions to address risks and opportunities" },
        { id: "6.2", title: "Quality objectives and planning to achieve them" },
        { id: "6.3", title: "Planning of changes" },
      ],
    },
    {
      id: "7",
      title: "Support",
      subclauses: [
        { id: "7.1", title: "Resources" },
        { id: "7.1.1", title: "General" },
        { id: "7.1.2", title: "People" },
        { id: "7.1.3", title: "Infrastructure" },
        { id: "7.1.4", title: "Environment for the operation of processes" },
        { id: "7.1.5", title: "Monitoring and measuring resources" },
        { id: "7.1.6", title: "Organizational knowledge" },
        { id: "7.2", title: "Competence" },
        { id: "7.3", title: "Awareness" },
        { id: "7.4", title: "Communication" },
        { id: "7.5", title: "Documented information" },
        { id: "7.5.1", title: "General" },
        { id: "7.5.2", title: "Creating and updating" },
        { id: "7.5.3", title: "Control of documented information" },
      ],
    },
    {
      id: "8",
      title: "Operation",
      subclauses: [
        { id: "8.1", title: "Operational planning and control" },
        { id: "8.2", title: "Requirements for products and services" },
        { id: "8.2.1", title: "Customer communication" },
        {
          id: "8.2.2",
          title: "Determining the requirements for products and services",
        },
        {
          id: "8.2.3",
          title: "Review of the requirements for products and services",
        },
        {
          id: "8.2.4",
          title: "Changes to requirements for products and services",
        },
        { id: "8.3", title: "Design and development of products and services" },
        { id: "8.3.1", title: "General" },
        { id: "8.3.2", title: "Design and development planning" },
        { id: "8.3.3", title: "Design and development inputs" },
        { id: "8.3.4", title: "Design and development controls" },
        { id: "8.3.5", title: "Design and development outputs" },
        { id: "8.3.6", title: "Design and development changes" },
        {
          id: "8.4",
          title:
            "Control of externally provided processes, products and services",
        },
        { id: "8.4.1", title: "General" },
        { id: "8.4.2", title: "Type and extent of control" },
        { id: "8.4.3", title: "Information for external providers" },
        { id: "8.5", title: "Production and service provision" },
        { id: "8.5.1", title: "Control of production and service provision" },
        { id: "8.5.2", title: "Identification and traceability" },
        {
          id: "8.5.3",
          title: "Property belonging to customers or external providers",
        },
        { id: "8.5.4", title: "Preservation" },
        { id: "8.5.5", title: "Post-delivery activities" },
        { id: "8.5.6", title: "Control of changes" },
        { id: "8.6", title: "Release of products and services" },
        { id: "8.7", title: "Control of nonconforming outputs" },
      ],
    },
    {
      id: "9",
      title: "Performance evaluation",
      subclauses: [
        {
          id: "9.1",
          title: "Monitoring, measurement, analysis and evaluation",
        },
        { id: "9.1.1", title: "General" },
        { id: "9.1.2", title: "Customer satisfaction" },
        { id: "9.1.3", title: "Analysis and evaluation" },
        { id: "9.2", title: "Internal audit" },
        { id: "9.3", title: "Management review" },
        { id: "9.3.1", title: "General" },
        { id: "9.3.2", title: "Management review inputs" },
        { id: "9.3.3", title: "Management review outputs" },
      ],
    },
    {
      id: "10",
      title: "Improvement",
      subclauses: [
        { id: "10.1", title: "General" },
        { id: "10.2", title: "Nonconformity and corrective action" },
        { id: "10.3", title: "Continual improvement" },
      ],
    },
  ];

  const isoLearningModules = [
    {
      id: "4",
      title: "Context of the organization",
      subclauses: [
        {
          id: "4.1",
          title: "Understanding the organization and its context",
          description:
            "Your organization needs to understand both internal factors (like company culture, resources, and processes) and external factors (like market conditions, regulations, and customer expectations) that could affect your quality management system.",
          example:
            "A small manufacturing company identifies that their main internal strength is skilled craftspeople, but their weakness is outdated equipment. Externally, they recognize increasing customer demand for eco-friendly products and new environmental regulations coming into effect.",
          videoScript:
            "Welcome to ISO 9001 Clause 4.1! Think of your organization like a ship navigating the ocean. To sail successfully, you need to know what's happening both on your ship (internal context) and in the waters around you (external context). Internal factors might include your team's skills, your equipment, and your company culture. External factors could be your competitors, new laws, or changing customer needs. For example, if you run a bakery, internal factors might be your ovens and baking skills, while external factors could be new health regulations or a trend toward gluten-free products. The key is to regularly assess these factors because they change over time. Document what you find and use this information to make better decisions about your quality management system.",
          actionableSteps: [
            "Conduct a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats)",
            "List internal factors: resources, knowledge, culture, processes, technology",
            "Identify external factors: market conditions, regulations, competitors, stakeholders",
            "Review and update this analysis at least annually",
            "Document findings and share with leadership team",
          ],
          aiTip:
            "Use ChatGPT to help create a comprehensive SWOT analysis template. Prompt: 'Create a detailed SWOT analysis template for a [your industry] company with specific questions for each category that relate to quality management.'",
        },
      ],
    },
  ];

  const totalClauses = isoClauses.reduce(
    (total, clause) => total + clause.subclauses.length,
    0,
  );
  const checkedCount = Object.values(checkedClauses).filter(Boolean).length;
  const completionPercentage =
    totalClauses > 0 ? Math.round((checkedCount / totalClauses) * 100) : 0;

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <BookOpen className="mr-3 h-8 w-8 text-primary" />
          ISO Learning & Clauses Center
        </h1>
        <p className="text-muted-foreground">
          Complete ISO 9001:2015 learning platform with clause tracking,
          training modules, and AI guidance.
        </p>
      </div>

      <Tabs defaultValue="iso-clauses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="iso-clauses">ISO Clauses Tracker</TabsTrigger>
          <TabsTrigger value="iso-learning">Interactive Learning</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="ai-chat">AI Auditor Chat</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="iso-clauses" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              ISO 9001:2015 Clauses Tracker
            </h2>
            <p className="text-muted-foreground mb-4">
              Review and track compliance with ISO 9001:2015 requirements.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">
                  Compliance Progress
                </span>
                <span className="text-sm font-bold text-blue-900">
                  {completionPercentage}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-blue-700 mt-2">
                {checkedCount} of {totalClauses} clauses completed
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {isoClauses.map((clause) => (
              <div
                key={clause.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {clause.id}. {clause.title}
                </h3>
                <div className="space-y-3">
                  {clause.subclauses.map((subclause) => (
                    <div
                      key={subclause.id}
                      className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        id={subclause.id}
                        checked={checkedClauses[subclause.id] || false}
                        onChange={() => handleClauseCheck(subclause.id)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={subclause.id}
                        className="flex-1 text-sm text-gray-700 cursor-pointer"
                      >
                        <span className="font-medium">{subclause.id}</span>{" "}
                        {subclause.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="iso-learning" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <FileText className="mr-3 h-6 w-6 text-primary" />
              Interactive ISO 9001:2015 Learning Module
            </h2>
            <p className="text-muted-foreground">
              Comprehensive learning materials for each ISO 9001:2015 clause
              with plain-English explanations, real-world examples, video
              scripts, actionable steps, and AI tips.
            </p>
          </div>

          <div className="space-y-4">
            {isoLearningModules.map((clause) => (
              <Card key={clause.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <Collapsible
                    open={openClauses[clause.id]}
                    onOpenChange={() => toggleClause(clause.id)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                      <CardTitle className="text-xl">
                        Clause {clause.id}: {clause.title}
                      </CardTitle>
                      {openClauses[clause.id] ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 mt-4">
                      {clause.subclauses.map((subclause) => (
                        <Card
                          key={subclause.id}
                          className="ml-4 border-l-4 border-l-primary"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-primary">
                              {subclause.id} - {subclause.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Plain English Description */}
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center">
                                <FileText className="mr-2 h-4 w-4" />
                                Plain-English Description
                              </h4>
                              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                                {subclause.description}
                              </p>
                            </div>

                            {/* Real-World Example */}
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center">
                                <Star className="mr-2 h-4 w-4" />
                                Real-World Example
                              </h4>
                              <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
                                {subclause.example}
                              </p>
                            </div>

                            {/* Video Script */}
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center">
                                <Video className="mr-2 h-4 w-4" />
                                Video Script (2-3 minutes)
                              </h4>
                              <div className="text-sm text-muted-foreground bg-purple-50 p-3 rounded-lg border border-purple-200">
                                <p>{subclause.videoScript}</p>
                              </div>
                            </div>

                            {/* Actionable Steps */}
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center">
                                <List className="mr-2 h-4 w-4" />
                                Actionable Steps
                              </h4>
                              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                <ul className="space-y-1">
                                  {subclause.actionableSteps.map(
                                    (step, index) => (
                                      <li
                                        key={index}
                                        className="text-sm text-muted-foreground flex items-start"
                                      >
                                        <CheckCircle className="mr-2 h-3 w-3 mt-1 text-green-600 flex-shrink-0" />
                                        {step}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            </div>

                            {/* AI Tip */}
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center">
                                <Lightbulb className="mr-2 h-4 w-4" />
                                AI Tip
                              </h4>
                              <div className="text-sm text-muted-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                <p className="font-medium text-yellow-800 mb-1">
                                  💡 Pro Tip:
                                </p>
                                <p>{subclause.aiTip}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Filter by Category</Button>
              <Button variant="outline">Sort by Progress</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {course.description}
                      </p>
                    </div>
                    <Badge variant="outline">{course.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration}
                      </span>
                      <span>{course.modules} modules</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {course.enrolled} students enrolled
                  </div>

                  <Button className="w-full">
                    {course.progress === 0 ? (
                      <>
                        <Play className="h-4 w-4 mr-2" /> Start Course
                      </>
                    ) : course.progress === 100 ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" /> Review Course
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" /> Continue Course
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Webinars</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {webinars
                  .filter((w) => w.status === "upcoming")
                  .map((webinar) => (
                    <div key={webinar.id} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{webinar.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-2" />
                          {new Date(webinar.date).toLocaleDateString()} at{" "}
                          {webinar.time}
                        </div>
                        <div>Presenter: {webinar.presenter}</div>
                        <div>{webinar.attendees} registered</div>
                      </div>
                      <Button className="w-full mt-3">Register Now</Button>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recorded Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {webinars
                  .filter((w) => w.status === "recorded")
                  .map((webinar) => (
                    <div key={webinar.id} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{webinar.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>
                          Recorded:{" "}
                          {new Date(webinar.date).toLocaleDateString()}
                        </div>
                        <div>Presenter: {webinar.presenter}</div>
                        <div>{webinar.attendees} views</div>
                      </div>
                      <Button variant="outline" className="w-full mt-3">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Recording
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    AI Auditor Assistant
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Get instant answers to your ISO 9001 questions
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatHistory.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            chat.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{chat.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {chat.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything about ISO 9001..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button>Send</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full text-left justify-start"
                    size="sm"
                  >
                    What are the key requirements for clause 7.1?
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-left justify-start"
                    size="sm"
                  >
                    How to conduct internal audits?
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-left justify-start"
                    size="sm"
                  >
                    Risk assessment best practices
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-left justify-start"
                    size="sm"
                  >
                    Document control procedures
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        achievement.earned
                          ? "bg-green-50 border border-green-200"
                          : "bg-muted/30"
                      }`}
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            achievement.earned
                              ? "text-green-800"
                              : "text-muted-foreground"
                          }`}
                        >
                          {achievement.title}
                        </p>
                      </div>
                      {achievement.earned && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-2xl font-bold text-primary">68%</span>
                  </div>
                  <Progress value={68} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">
                      Courses Completed
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">45</div>
                    <div className="text-sm text-muted-foreground">
                      Hours Learned
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">8</div>
                    <div className="text-sm text-muted-foreground">
                      Certificates Earned
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">156</div>
                    <div className="text-sm text-muted-foreground">
                      AI Questions Asked
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Completed &quot;Internal Auditing Mastery&quot;
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Started &quot;Risk-Based Thinking&quot;
                      </p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Earned &quot;ISO 9001 Expert&quot; badge
                      </p>
                      <p className="text-sm text-muted-foreground">
                        3 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Attended webinar on Digital QMS
                      </p>
                      <p className="text-sm text-muted-foreground">
                        1 week ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="iso-learning" element={<ISOLearningAndClauses />} />
            <Route path="documents" element={<DocumentGenerator />} />
            <Route path="audit" element={<AuditReadiness />} />
            <Route path="processes" element={<ProcessMapping />} />
            <Route path="suppliers" element={<SupplierManagement />} />
            <Route
              path="non-conformity"
              element={<NonConformityManagement />}
            />
          </Route>
          <Route path="/home" element={<Home />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
