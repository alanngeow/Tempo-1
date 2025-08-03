import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  BookOpen,
  Play,
  Search,
  MessageSquare,
  Clock,
  Award,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  List,
  Lightbulb,
  Bot,
  Upload,
  Sparkles,
  Download,
  Copy,
  Wand2,
} from "lucide-react";

const ISO9001Clauses = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("clauses");
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [openClauses, setOpenClauses] = useState<Record<string, boolean>>({});
  const [aiConsultantDialogs, setAiConsultantDialogs] = useState<
    Record<string, boolean>
  >({});
  const [uploadedDocuments, setUploadedDocuments] = useState<
    Record<string, File | null>
  >({});
  const [consultantQueries, setConsultantQueries] = useState<
    Record<string, string>
  >({});
  const [documentGeneratorDialogs, setDocumentGeneratorDialogs] = useState<
    Record<string, boolean>
  >({});
  const [generatedDocuments, setGeneratedDocuments] = useState<
    Record<string, string>
  >({});
  const [documentTypes, setDocumentTypes] = useState<Record<string, string>>(
    {},
  );

  // Handle URL tab parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab &&
      ["courses", "webinars", "clauses", "ai-chat", "progress"].includes(tab)
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

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

  const toggleClause = (clauseId: string) => {
    setOpenClauses((prev) => ({
      ...prev,
      [clauseId]: !prev[clauseId],
    }));
  };

  const toggleAiConsultantDialog = (subclauseId: string) => {
    setAiConsultantDialogs((prev) => ({
      ...prev,
      [subclauseId]: !prev[subclauseId],
    }));
  };

  const toggleDocumentGeneratorDialog = (subclauseId: string) => {
    setDocumentGeneratorDialogs((prev) => ({
      ...prev,
      [subclauseId]: !prev[subclauseId],
    }));
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    subclauseId: string,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDocuments((prev) => ({
        ...prev,
        [subclauseId]: file,
      }));
    }
  };

  const handleConsultantSubmit = (subclauseId: string, clauseTitle: string) => {
    const document = uploadedDocuments[subclauseId];
    const query = consultantQueries[subclauseId];

    // Handle AI consultant query submission
    console.log("Clause:", clauseTitle);
    console.log("Document:", document?.name);
    console.log("Query:", query);

    // Reset form for this subclause
    setUploadedDocuments((prev) => ({
      ...prev,
      [subclauseId]: null,
    }));
    setConsultantQueries((prev) => ({
      ...prev,
      [subclauseId]: "",
    }));
    setAiConsultantDialogs((prev) => ({
      ...prev,
      [subclauseId]: false,
    }));
  };

  const updateConsultantQuery = (subclauseId: string, query: string) => {
    setConsultantQueries((prev) => ({
      ...prev,
      [subclauseId]: query,
    }));
  };

  const updateDocumentType = (subclauseId: string, type: string) => {
    setDocumentTypes((prev) => ({
      ...prev,
      [subclauseId]: type,
    }));
  };

  const handleDocumentGeneration = (
    subclauseId: string,
    clauseTitle: string,
  ) => {
    const documentType = documentTypes[subclauseId] || "procedure";

    // Simulate AI document generation
    const generatedContent = `# ${documentType.charAt(0).toUpperCase() + documentType.slice(1)} for ${clauseTitle}

## Purpose
This ${documentType} has been generated to support compliance with ISO 9001:2015 ${clauseTitle}.

## Scope
This ${documentType} applies to all activities related to ${clauseTitle.toLowerCase()}.

## Responsibilities
- Management: Overall accountability for implementation
- Process Owners: Day-to-day execution and monitoring
- Quality Team: Compliance verification and improvement

## Procedure
1. **Planning Phase**
   - Define objectives and scope
   - Identify required resources
   - Establish success criteria

2. **Implementation Phase**
   - Execute planned activities
   - Monitor progress and performance
   - Document results and findings

3. **Review Phase**
   - Evaluate effectiveness
   - Identify improvement opportunities
   - Update procedures as needed

## Records
- Implementation records
- Monitoring and measurement data
- Review and improvement documentation

## Related Documents
- Quality Manual
- Quality Policy
- Related ISO 9001:2015 clauses

---
*This document was generated by AI to support ISO 9001:2015 compliance. Please review and customize according to your organization's specific needs.*`;

    setGeneratedDocuments((prev) => ({
      ...prev,
      [subclauseId]: generatedContent,
    }));

    // Reset form
    setDocumentTypes((prev) => ({
      ...prev,
      [subclauseId]: "",
    }));
    setDocumentGeneratorDialogs((prev) => ({
      ...prev,
      [subclauseId]: false,
    }));
  };

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
        {
          id: "4.2",
          title:
            "Understanding the needs and expectations of interested parties",
          description:
            "Identify everyone who has a stake in your organization's success (customers, employees, suppliers, regulators, etc.) and understand what they expect from you. These expectations directly impact your quality management system.",
          example:
            "A software development company identifies their interested parties as: customers (expecting reliable software), employees (wanting fair wages and good working conditions), investors (seeking profitable growth), and regulators (requiring data privacy compliance).",
          videoScript:
            "Let's talk about Clause 4.2 - understanding your interested parties. Imagine you're throwing a party. You need to know who's coming and what they expect to have a successful event. In business, your 'interested parties' are everyone who affects or is affected by your organization. This includes obvious ones like customers and employees, but also suppliers, regulators, the community, and even competitors. Each group has different needs and expectations. Customers want quality products, employees want job security, suppliers want timely payments, and regulators want compliance. Here's the key: these expectations can conflict! Customers want low prices while employees want higher wages. Your job is to identify these parties, understand their needs, and find ways to balance competing demands. Document who these parties are and what they expect, then use this information to guide your quality management decisions.",
          actionableSteps: [
            "Create a stakeholder map listing all interested parties",
            "For each party, document their specific needs and expectations",
            "Identify which expectations are requirements (must-haves) vs. preferences",
            "Assess how these expectations might conflict with each other",
            "Develop strategies to balance competing demands",
            "Review and update stakeholder expectations regularly",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me identify all potential interested parties for a [your industry] business and their typical expectations. Include both obvious and less obvious stakeholders.'",
        },
        {
          id: "4.3",
          title: "Determining the scope of the quality management system",
          description:
            "Define exactly what your quality management system covers - which processes, products, services, and locations are included, and which are excluded. This creates clear boundaries for your QMS.",
          example:
            "A consulting firm decides their QMS scope includes all client advisory services at their main office and remote work, but excludes their separate training division and the company cafeteria operations.",
          videoScript:
            "Clause 4.3 is about setting boundaries - determining your QMS scope. Think of it like drawing a fence around your property. You need to clearly define what's inside your quality management system and what's outside. This isn't about your entire organization - it's about which parts need quality management. Consider your products and services: Are you including all of them or just some? What about locations: Just headquarters or all branches? Processes: All business processes or just core ones? You can exclude things, but you must justify why. For example, a restaurant might include food preparation and service but exclude accounting (handled by an external firm). The key is being clear and logical about your boundaries. This scope statement becomes part of your quality manual and helps everyone understand what the QMS covers.",
          actionableSteps: [
            "List all your products, services, processes, and locations",
            "Decide which ones should be included in your QMS",
            "Justify any exclusions (why they don't affect product/service quality)",
            "Write a clear scope statement",
            "Ensure the scope covers all requirements relevant to your products/services",
            "Review scope when your organization changes significantly",
          ],
          aiTip:
            "Use ChatGPT to help draft your scope statement: 'Help me write a QMS scope statement for a [describe your business]. Include [list your main products/services] and consider [mention any exclusions you're thinking about].'",
        },
        {
          id: "4.4",
          title: "Quality management system and its processes",
          description:
            "Map out all the processes in your quality management system, understand how they connect to each other, and establish how you'll monitor and improve them. This is like creating a blueprint of how your organization works.",
          example:
            "A small electronics manufacturer maps their processes: sales process feeds into design process, which connects to procurement, then manufacturing, then shipping, with customer feedback looping back to design improvements.",
          videoScript:
            "Welcome to Clause 4.4 - the heart of your QMS! Think of your organization as a machine with many interconnected parts. Each part is a process, and they all work together to deliver value to customers. Your job is to identify these processes, understand how they connect, and manage them effectively. Start by listing your main processes: maybe sales, design, production, and delivery. Then map how they connect - sales information goes to design, design specs go to production, etc. For each process, determine what inputs it needs, what outputs it produces, who's responsible, and how you'll measure performance. Don't forget support processes like training, maintenance, and document control. The goal is to see your organization as a system where everything works together smoothly. When you understand these connections, you can improve the whole system, not just individual parts.",
          actionableSteps: [
            "Identify all processes needed for your QMS (core and support processes)",
            "Map how processes interact and connect with each other",
            "Define inputs, outputs, and controls for each process",
            "Assign process owners and responsibilities",
            "Establish performance indicators for each process",
            "Document the process interactions (process map or flowchart)",
            "Plan for process monitoring and improvement",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me identify and map the key processes for a [your industry] business. Show me how these processes typically interact and what inputs/outputs each one has.'",
        },
      ],
    },
    {
      id: "5",
      title: "Leadership",
      subclauses: [
        {
          id: "5.1",
          title: "Leadership and commitment",
          description:
            "Top management must actively lead the quality management system, not just delegate it. They need to show commitment through their actions, decisions, and resource allocation.",
          example:
            "The CEO of a small manufacturing company attends monthly quality meetings, personally reviews customer complaints, and allocates budget for employee quality training, demonstrating visible leadership commitment.",
          videoScript:
            "Let's discuss Clause 5.1 - Leadership and Commitment. Imagine you're the captain of a ship. You can't just tell your crew to navigate while you stay in your cabin - you need to be on deck, making decisions, and showing the way. That's what ISO 9001 expects from top management. Leadership commitment isn't just about signing documents or giving speeches. It's about actively participating in the quality management system. This means attending quality meetings, reviewing performance data, making decisions about resources, and showing everyone that quality matters. When employees see leaders genuinely caring about quality, they follow suit. But if leaders just pay lip service while focusing only on profits, the QMS becomes just paperwork. Real commitment means integrating quality into business strategy, not treating it as a separate activity.",
          actionableSteps: [
            "Top management should personally participate in QMS activities",
            "Integrate quality objectives into business planning",
            "Allocate adequate resources for the QMS",
            "Regularly communicate the importance of quality to all employees",
            "Review QMS performance in management meetings",
            "Make quality-related decisions personally, not just delegate them",
          ],
          aiTip:
            "Use ChatGPT to draft leadership communication: 'Help me write a message from our CEO to all employees about our commitment to quality management and ISO 9001. Make it personal and specific to our [industry] business.'",
        },
        {
          id: "5.1.1",
          title: "General",
          description:
            "Top management must take accountability for the effectiveness of the QMS, ensure it achieves its intended results, and promote continual improvement throughout the organization.",
          example:
            "A company president personally reviews monthly QMS performance reports, asks probing questions about trends, and makes decisions about corrective actions when targets aren't met.",
          videoScript:
            "Clause 5.1.1 focuses on general leadership accountability. Think of a sports team coach - they're responsible for the team's performance, not just individual players. Similarly, top management is accountable for the entire QMS effectiveness. This means they can't just set up the system and walk away. They need to ensure it's actually working and delivering results. Accountability means asking tough questions: Are we meeting our quality objectives? Are customers satisfied? Are processes improving? If something isn't working, leadership must take action. They can't blame employees or external factors - the buck stops with them. This also means promoting a culture of continual improvement where everyone looks for ways to do things better. Leadership sets the tone by being curious, asking questions, and celebrating improvements.",
          actionableSteps: [
            "Establish regular QMS performance reviews with top management",
            "Define clear accountability for QMS results at leadership level",
            "Create mechanisms for leadership to monitor QMS effectiveness",
            "Ensure leadership takes action when QMS isn't delivering results",
            "Promote continual improvement culture through leadership example",
            "Document leadership's role and responsibilities in QMS",
          ],
          aiTip:
            "Ask ChatGPT: 'Create a monthly QMS dashboard template for top management that shows key performance indicators and prompts the right accountability questions for a [your industry] business.'",
        },
        {
          id: "5.1.2",
          title: "Customer focus",
          description:
            "Leadership must ensure the organization maintains a strong focus on meeting customer requirements and enhancing customer satisfaction. Customer needs should drive decision-making.",
          example:
            "A service company's leadership team reviews customer feedback monthly, uses it to set priorities, and ensures all major decisions consider customer impact first.",
          videoScript:
            "Clause 5.1.2 is about customer focus - putting customers at the center of everything you do. Imagine you're running a restaurant. Every decision should start with 'How does this affect our customers?' Whether it's changing suppliers, training staff, or updating the menu, customer impact comes first. Leadership must ensure this customer-first mindset permeates the entire organization. This isn't just about customer service - it's about understanding what customers really need and want, then aligning your entire operation to deliver it. Customer focus means regularly collecting feedback, analyzing trends, and making changes based on what you learn. It also means anticipating future customer needs, not just reacting to complaints. When leadership consistently demonstrates customer focus, employees naturally adopt the same mindset.",
          actionableSteps: [
            "Establish regular customer feedback collection and review processes",
            "Include customer impact assessment in all major decisions",
            "Set customer satisfaction targets and monitor progress",
            "Train employees on customer focus and its importance",
            "Use customer requirements to drive process improvements",
            "Communicate customer feedback and actions taken throughout organization",
          ],
          aiTip:
            "Use ChatGPT to design customer feedback systems: 'Help me create a comprehensive customer feedback collection and analysis system for a [your industry] business, including survey questions and review processes.'",
        },
        {
          id: "5.2",
          title: "Policy",
          description:
            "Establish a quality policy that provides a framework for setting quality objectives and demonstrates commitment to meeting requirements and continual improvement.",
          example:
            "A consulting firm's quality policy states: 'We commit to delivering expert advice that exceeds client expectations through continuous learning, rigorous methodology, and proactive communication.'",
          videoScript:
            "Let's talk about Clause 5.2 - Quality Policy. Think of your quality policy as your organization's quality mission statement. It's a short, clear declaration of your commitment to quality that everyone can understand and remember. A good quality policy isn't just fancy words on a wall - it's a practical guide that helps people make decisions. It should reflect your organization's purpose and provide direction for setting quality objectives. For example, instead of saying 'We commit to quality,' say something specific like 'We deliver defect-free products through skilled craftsmanship and continuous improvement.' The policy should be appropriate for your organization's size and industry, and it must commit to meeting requirements and continual improvement - these are ISO 9001 requirements. Most importantly, it should be something your employees can actually use to guide their daily work.",
          actionableSteps: [
            "Draft a quality policy that's specific to your organization",
            "Ensure it includes commitment to meeting requirements and continual improvement",
            "Make it appropriate for your organization's purpose and context",
            "Keep it concise and understandable for all employees",
            "Get top management approval and endorsement",
            "Communicate the policy throughout the organization",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me write a quality policy for a [describe your business] that is specific, memorable, and includes the required ISO 9001 commitments. Make it no more than 2-3 sentences.'",
        },
        {
          id: "5.2.1",
          title: "Establishing the quality policy",
          description:
            "The quality policy must be appropriate to the organization's purpose and context, provide a framework for quality objectives, and include commitments to satisfy requirements and continual improvement.",
          example:
            "A small software company establishes a policy: 'We develop reliable software solutions by understanding client needs, following proven development practices, and continuously improving our skills and processes.'",
          videoScript:
            "Clause 5.2.1 covers establishing your quality policy. This is like writing your organization's quality constitution - the fundamental principles that guide everything else. Your policy must be tailored to your specific organization, not copied from someone else. It should reflect what you actually do and aspire to be. The policy serves as a foundation for setting specific quality objectives. Think of it as the 'why' behind your quality efforts. It must include two non-negotiable commitments required by ISO 9001: satisfying applicable requirements (legal, regulatory, customer) and continual improvement. But beyond these requirements, make it meaningful for your people. A good policy inspires and guides daily decisions. It should answer the question: 'What does quality mean to us?' Keep it authentic to your organization's culture and values.",
          actionableSteps: [
            "Review your organization's purpose, values, and context",
            "Draft a policy that reflects your specific situation and aspirations",
            "Ensure it provides a framework for setting quality objectives",
            "Include mandatory commitments to requirements and continual improvement",
            "Test the policy with employees - do they understand and connect with it?",
            "Finalize and formally establish the policy with top management approval",
          ],
          aiTip:
            "Use ChatGPT to refine your policy: 'Review this draft quality policy for a [your industry] company and suggest improvements to make it more specific and inspiring: [paste your draft policy].'",
        },
        {
          id: "5.2.2",
          title: "Communicating the quality policy",
          description:
            "The quality policy must be communicated, understood, and applied throughout the organization. It should be available to relevant interested parties and maintained as documented information.",
          example:
            "A manufacturing company displays their quality policy in all work areas, includes it in employee orientation, discusses it in team meetings, and posts it on their website for customers and suppliers to see.",
          videoScript:
            "Clause 5.2.2 is about communicating your quality policy effectively. Having a great policy is useless if nobody knows about it or understands it. Think of it like a recipe - it only works if everyone in the kitchen knows the ingredients and steps. Communication isn't just posting the policy on a wall or sending an email. It's about ensuring people understand what it means and how it applies to their work. This requires multiple communication methods: orientation for new employees, regular reminders in meetings, visual displays in work areas, and inclusion in training programs. The policy should also be available to external interested parties like customers and suppliers who might want to understand your quality commitment. Remember, communication is two-way - ask employees what the policy means to them and how they apply it in their daily work.",
          actionableSteps: [
            "Develop a communication plan for the quality policy",
            "Include policy in new employee orientation and training",
            "Display policy visibly in work areas",
            "Discuss policy regularly in team meetings and reviews",
            "Make policy available to external interested parties (website, contracts)",
            "Verify understanding through discussions and feedback",
            "Maintain policy as controlled documented information",
          ],
          aiTip:
            "Ask ChatGPT: 'Create a comprehensive communication plan for rolling out our quality policy to employees, including different communication methods and ways to verify understanding.'",
        },
        {
          id: "5.3",
          title: "Organizational roles, responsibilities and authorities",
          description:
            "Top management must ensure that responsibilities and authorities for relevant roles are assigned, communicated, and understood throughout the organization, including QMS responsibilities.",
          example:
            "A construction company creates clear job descriptions that include quality responsibilities, assigns a Quality Manager role, and ensures everyone knows who to contact for quality issues.",
          videoScript:
            "Clause 5.3 is about organizational clarity - making sure everyone knows their role in the quality management system. Imagine an orchestra where musicians don't know which part they're supposed to play. The result would be chaos, not beautiful music. In your organization, every person needs to understand their quality-related responsibilities and who has the authority to make quality decisions. This goes beyond general job descriptions to include specific QMS roles. Who can approve changes to procedures? Who investigates customer complaints? Who has authority to stop production if there's a quality issue? These roles and authorities must be clearly defined, communicated, and understood. Don't assume people know - make it explicit. This includes appointing someone to ensure the QMS is established, implemented, and maintained, and to report on QMS performance to top management.",
          actionableSteps: [
            "Review all roles and identify quality-related responsibilities",
            "Update job descriptions to include QMS responsibilities",
            "Assign specific QMS roles (Quality Manager, Process Owners, etc.)",
            "Define authorities for quality-related decisions",
            "Communicate roles and authorities clearly to all employees",
            "Ensure someone is assigned to manage and report on QMS performance",
            "Regularly review and update role assignments as organization changes",
          ],
          aiTip:
            "Use ChatGPT to help define roles: 'Help me create clear quality management responsibilities for these roles in a [your industry] company: [list your key positions]. Include specific authorities and decision-making powers.'",
        },
      ],
    },
    {
      id: "6",
      title: "Planning",
      subclauses: [
        {
          id: "6.1",
          title: "Actions to address risks and opportunities",
          description:
            "Identify risks that could prevent your QMS from achieving its intended results and opportunities for improvement. Plan actions to address these risks and opportunities.",
          example:
            "A small bakery identifies risks like equipment failure and staff shortages, and opportunities like expanding to gluten-free products. They plan preventive maintenance schedules and cross-training programs.",
          videoScript:
            "Welcome to Clause 6.1 - addressing risks and opportunities. Think of this as looking both ways before crossing the street, but for your entire quality management system. Risks are things that could go wrong and prevent you from achieving your quality objectives. Opportunities are chances to improve and do better than planned. This isn't about creating a massive risk register with hundreds of items. Focus on significant risks and realistic opportunities. For example, what could prevent you from delivering quality products? Equipment failure? Key employee leaving? Supply chain disruption? For opportunities, what could help you improve? New technology? Better supplier relationships? Customer feedback trends? The key is to plan actions for the most important risks and opportunities, not just identify them. This is about being proactive rather than reactive.",
          actionableSteps: [
            "Identify risks that could affect your QMS objectives",
            "Look for opportunities to improve QMS performance",
            "Prioritize risks and opportunities based on impact and likelihood",
            "Plan specific actions to address priority items",
            "Assign responsibilities and timelines for actions",
            "Monitor the effectiveness of your actions",
            "Review and update risk and opportunity assessments regularly",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me identify the top 10 risks and opportunities for a [your industry] business's quality management system. Include both internal and external factors.'",
        },
        {
          id: "6.2",
          title: "Quality objectives and planning to achieve them",
          description:
            "Establish quality objectives that are measurable, monitored, communicated, and updated as appropriate. Plan how you'll achieve these objectives with specific actions, resources, and timelines.",
          example:
            "A consulting firm sets objectives like 'Achieve 95% client satisfaction rating' and 'Reduce project delivery time by 10%' with specific action plans, assigned responsibilities, and monthly progress reviews.",
          videoScript:
            "Clause 6.2 is about setting and achieving quality objectives - your quality goals that turn your policy into action. Think of objectives as your quality destination and planning as your roadmap to get there. Good objectives are SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of 'improve customer satisfaction,' try 'achieve 90% customer satisfaction rating by year-end.' Your objectives should align with your quality policy and business strategy. But setting objectives isn't enough - you need a plan to achieve them. Who will do what? By when? What resources are needed? How will you measure progress? This planning turns good intentions into real results. Remember to involve the people who will actually work toward these objectives in the planning process.",
          actionableSteps: [
            "Set SMART quality objectives aligned with your quality policy",
            "Ensure objectives are relevant to product/service conformity and customer satisfaction",
            "Develop action plans for each objective with specific steps",
            "Assign responsibilities and allocate necessary resources",
            "Establish timelines and milestones for tracking progress",
            "Communicate objectives throughout the organization",
            "Monitor progress and update objectives as needed",
          ],
          aiTip:
            "Use ChatGPT to help set objectives: 'Help me create 3-5 SMART quality objectives for a [your industry] business, including specific metrics and realistic targets based on industry benchmarks.'",
        },
        {
          id: "6.3",
          title: "Planning of changes",
          description:
            "When changes to the QMS are needed, plan them systematically to ensure they're implemented effectively without unintended consequences.",
          example:
            "A manufacturing company planning to introduce new software first assesses the impact on existing processes, trains users, runs parallel systems during transition, and monitors results before full implementation.",
          videoScript:
            "Clause 6.3 covers planning changes to your QMS. Change is inevitable in business, but unplanned change can be disruptive and risky. Think of this like renovating your house while living in it - you need a plan to minimize disruption and ensure everything works when you're done. Whether you're implementing new software, changing suppliers, or updating procedures, systematic planning is essential. Consider what could go wrong, what resources you'll need, who needs to be involved, and how you'll know if the change is successful. This isn't about preventing all change - it's about managing change intelligently. Good change planning includes pilot testing, training, communication, and monitoring. The goal is to implement changes that improve your QMS without creating new problems.",
          actionableSteps: [
            "Identify when changes to the QMS are needed",
            "Assess the potential impact of proposed changes",
            "Plan the change implementation with specific steps and timeline",
            "Consider resource requirements and potential risks",
            "Involve affected personnel in change planning",
            "Implement changes systematically with monitoring",
            "Review change effectiveness and make adjustments as needed",
          ],
          aiTip:
            "Ask ChatGPT: 'Create a change management template for QMS changes that includes impact assessment, risk evaluation, and implementation planning steps for a [your industry] business.'",
        },
      ],
    },
    {
      id: "7",
      title: "Support",
      subclauses: [
        {
          id: "7.1",
          title: "Resources",
          description:
            "Determine and provide the resources needed for establishing, implementing, maintaining, and continually improving your QMS, including people, infrastructure, and environment.",
          example:
            "A small accounting firm ensures they have qualified staff, reliable computers and software, adequate office space, and a quiet environment for client meetings and focused work.",
          videoScript:
            "Clause 7.1 is about resources - the foundation that supports your entire QMS. Think of building a house: you need the right materials, skilled workers, proper tools, and a suitable location. Your QMS needs similar support. Resources include people with the right skills, adequate facilities and equipment, appropriate work environment, and sufficient budget. This isn't about having the most expensive equipment or largest staff - it's about having what you need to consistently deliver quality. Consider both current needs and future requirements as your organization grows. Resource planning should align with your quality objectives and business strategy. Remember, inadequate resources are often the root cause of quality problems, so this investment in resources is really an investment in your success.",
          actionableSteps: [
            "Assess current resource needs for your QMS",
            "Identify gaps between current and required resources",
            "Plan resource acquisition and allocation",
            "Consider both human and physical resources",
            "Align resource planning with quality objectives and business strategy",
            "Monitor resource adequacy and effectiveness",
            "Review and update resource requirements regularly",
          ],
          aiTip:
            "Use ChatGPT to assess resource needs: 'Help me create a resource assessment checklist for a [your industry] business QMS, including people, equipment, facilities, and technology requirements.'",
        },
        {
          id: "7.1.1",
          title: "General",
          description:
            "Consider the capabilities and constraints of existing internal resources and what needs to be obtained from external providers when determining resource requirements.",
          example:
            "A design consultancy evaluates their internal design capabilities, identifies they need specialized 3D modeling skills, and decides to either train existing staff or hire external specialists.",
          videoScript:
            "Clause 7.1.1 focuses on general resource considerations. This is about being realistic and strategic about your resources. Start by honestly assessing what you have internally - what are your team's strengths and limitations? What equipment is working well and what needs upgrading? Then consider what you might need to get from outside. Sometimes it's more effective to outsource certain activities rather than build internal capability. For example, a small company might outsource IT support rather than hiring a full-time IT person. The key is making informed decisions about the make-versus-buy choice for resources. Consider factors like cost, control, expertise, and strategic importance. Document your resource decisions so you can review and adjust them as your organization evolves.",
          actionableSteps: [
            "Inventory current internal resources and capabilities",
            "Identify resource constraints and limitations",
            "Evaluate make-versus-buy decisions for resource needs",
            "Consider cost, quality, and control factors in resource decisions",
            "Plan for both short-term and long-term resource requirements",
            "Document resource decisions and rationale",
            "Regularly review resource effectiveness and efficiency",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me create a make-versus-buy analysis template for resource decisions in a [your industry] business, including evaluation criteria and decision factors.'",
        },
        {
          id: "7.1.2",
          title: "People",
          description:
            "Determine and provide the people necessary for effective implementation of your QMS and operation of your processes.",
          example:
            "A small restaurant ensures they have enough trained cooks, servers, and managers for each shift, with backup plans for absences and busy periods.",
          videoScript:
            "Clause 7.1.2 is about people - your most important resource. Think of your organization as a sports team: you need the right number of players with the right skills in the right positions. This means determining how many people you need, what skills they should have, and ensuring they're available when needed. People planning isn't just about headcount - it's about capabilities. Do you have people who can handle customer complaints? Who understands your key processes? Who can train others? Consider both current operations and future needs. Also think about backup plans: what happens if key people are absent or leave? Cross-training and succession planning become important. Remember, having the right people in place is fundamental to QMS success.",
          actionableSteps: [
            "Determine staffing needs for all QMS processes",
            "Identify required skills and competencies for each role",
            "Assess current people resources against requirements",
            "Plan for recruitment, training, or redeployment as needed",
            "Develop backup plans for key positions",
            "Consider succession planning for critical roles",
            "Monitor people resource adequacy and effectiveness",
          ],
          aiTip:
            "Use ChatGPT for workforce planning: 'Help me create a skills matrix and staffing plan for a [your industry] business, including key roles, required competencies, and backup coverage strategies.'",
        },
        {
          id: "7.1.3",
          title: "Infrastructure",
          description:
            "Determine, provide, and maintain the infrastructure necessary for process operations and to achieve conformity of products and services.",
          example:
            "A small manufacturing company maintains their production equipment, ensures reliable power and internet, provides adequate workspace, and keeps backup systems for critical operations.",
          videoScript:
            "Clause 7.1.3 covers infrastructure - the physical foundation of your operations. Infrastructure includes buildings, equipment, utilities, information systems, and transportation. Think of it as the stage where your quality performance takes place. Poor infrastructure can undermine even the best processes and people. This isn't about having the newest or most expensive infrastructure, but about having what's appropriate and reliable for your needs. Consider what infrastructure is critical for your product or service quality. A restaurant needs working refrigeration, a consulting firm needs reliable computers and internet, a manufacturer needs functioning equipment. Maintenance is key - infrastructure that breaks down at critical moments can cause quality failures and customer dissatisfaction. Plan for both routine maintenance and emergency backup options.",
          actionableSteps: [
            "Identify all infrastructure needed for your processes",
            "Assess current infrastructure condition and adequacy",
            "Develop maintenance schedules and procedures",
            "Plan for infrastructure upgrades and replacements",
            "Consider backup options for critical infrastructure",
            "Monitor infrastructure performance and reliability",
            "Budget for infrastructure maintenance and improvements",
          ],
          aiTip:
            "Ask ChatGPT: 'Create an infrastructure assessment and maintenance planning template for a [your industry] business, including critical systems identification and preventive maintenance schedules.'",
        },
        {
          id: "7.1.4",
          title: "Environment for the operation of processes",
          description:
            "Determine, provide, and maintain the environment necessary for process operations and to achieve conformity of products and services.",
          example:
            "A software development company provides quiet workspaces for coding, collaborative areas for team meetings, ergonomic furniture, appropriate lighting, and temperature control for optimal productivity.",
          videoScript:
            "Clause 7.1.4 is about the work environment - the conditions under which your processes operate. Environment includes both physical factors like temperature, lighting, and noise, and human factors like workplace culture and stress levels. Think about what environmental conditions are necessary for your people to do quality work. A laboratory needs controlled temperature and humidity, a call center needs quiet conditions, a creative agency might need inspiring spaces that encourage innovation. Don't overlook human and social factors - a stressful, fearful work environment can lead to quality problems even with good processes and equipment. The goal is creating conditions where people can consistently perform their best work. This might include ergonomic considerations, safety measures, or even things like break areas where people can recharge.",
          actionableSteps: [
            "Identify environmental requirements for each process",
            "Assess current work environment conditions",
            "Address physical factors: lighting, temperature, noise, space",
            "Consider human factors: stress, safety, ergonomics",
            "Implement environmental controls and monitoring",
            "Gather feedback from employees about work environment",
            "Continuously improve environmental conditions",
          ],
          aiTip:
            "Use ChatGPT to assess work environment: 'Help me create a work environment assessment checklist for a [your industry] business, including both physical and human factors that affect quality performance.'",
        },
        {
          id: "7.1.5",
          title: "Monitoring and measuring resources",
          description:
            "Determine and provide resources needed to ensure valid and reliable monitoring and measurement results that support conformity of products and services.",
          example:
            "A testing laboratory calibrates their measuring instruments regularly, maintains measurement standards, and ensures technicians are trained in proper measurement techniques.",
          videoScript:
            "Clause 7.1.5 focuses on monitoring and measuring resources - the tools and methods you use to verify that your products and services meet requirements. Think of this as your quality detective kit. If you can't measure accurately, you can't know if you're meeting requirements or improving. This includes measuring equipment like scales, gauges, and test instruments, but also measurement methods and the people who do the measuring. The key word here is 'valid and reliable' - your measurements must be accurate and consistent. This often requires calibration of equipment, training of people, and standardized measurement procedures. Consider what you need to measure: product dimensions, service response times, customer satisfaction, process performance. Then ensure you have the right tools and methods to get trustworthy results.",
          actionableSteps: [
            "Identify what needs to be monitored and measured in your processes",
            "Determine appropriate measuring equipment and methods",
            "Establish calibration and maintenance procedures for measuring equipment",
            "Train personnel in proper measurement techniques",
            "Verify measurement accuracy and reliability",
            "Maintain records of measurement equipment status",
            "Review and improve measurement capabilities regularly",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me identify the key measurements needed for a [your industry] business and recommend appropriate measuring tools and calibration requirements.'",
        },
        {
          id: "7.1.6",
          title: "Organizational knowledge",
          description:
            "Determine the knowledge necessary for process operations and conformity of products and services. Maintain and make this knowledge available as needed.",
          example:
            "A consulting firm maintains a knowledge base of best practices, lessons learned from projects, industry expertise, and client-specific information that all consultants can access and contribute to.",
          videoScript:
            "Clause 7.1.6 addresses organizational knowledge - the collective wisdom your organization needs to operate effectively. Think of this as your organization's brain - all the knowledge, experience, and expertise that makes you successful. This includes technical knowledge about your products and processes, but also softer knowledge like customer preferences, supplier relationships, and lessons learned from past experiences. The challenge is that much of this knowledge exists only in people's heads. What happens when experienced employees leave? How do you share knowledge across teams? Organizational knowledge management involves identifying critical knowledge, capturing it in accessible forms, and ensuring it's available to those who need it. This might include procedures, training materials, databases, or mentoring programs.",
          actionableSteps: [
            "Identify critical knowledge needed for your processes and products",
            "Assess current knowledge gaps and risks",
            "Capture important knowledge in accessible formats",
            "Establish knowledge sharing mechanisms and systems",
            "Plan for knowledge transfer when people leave or change roles",
            "Encourage continuous learning and knowledge development",
            "Regularly review and update organizational knowledge",
          ],
          aiTip:
            "Use ChatGPT for knowledge management: 'Help me create a knowledge management strategy for a [your industry] business, including methods to capture, store, and share critical organizational knowledge.'",
        },
        {
          id: "7.2",
          title: "Competence",
          description:
            "Determine necessary competence for people doing work that affects QMS performance, ensure they are competent, and take actions to acquire necessary competence.",
          example:
            "A small accounting firm identifies that tax preparers need specific certifications, provides training for new regulations, and maintains records of each employee's qualifications and training.",
          videoScript:
            "Clause 7.2 is about competence - ensuring people have the skills and knowledge to do their jobs effectively. Competence goes beyond just having a degree or certificate; it's about being able to perform specific tasks to the required standard. Think of it like a driver's license - it shows you've demonstrated the ability to drive safely. For each role in your organization, you need to define what competence looks like. What skills, knowledge, and experience are required? How will you verify that people are competent? This might involve education, training, experience, or demonstrated ability. When you identify competence gaps, you need to take action - provide training, coaching, or reassign responsibilities. Remember to keep records of competence, including training completed and qualifications achieved.",
          actionableSteps: [
            "Define competence requirements for each role affecting quality",
            "Assess current competence levels of your people",
            "Identify competence gaps and training needs",
            "Provide training, coaching, or other development activities",
            "Verify that training and development activities are effective",
            "Maintain records of competence, training, and qualifications",
            "Regularly review and update competence requirements",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me create competence profiles and training plans for key roles in a [your industry] business, including required skills, knowledge, and verification methods.'",
        },
        {
          id: "7.3",
          title: "Awareness",
          description:
            "Ensure people are aware of the quality policy, relevant quality objectives, their contribution to QMS effectiveness, and the implications of not conforming to QMS requirements.",
          example:
            "A manufacturing company conducts regular team meetings where they discuss quality goals, share performance results, recognize contributions to quality improvement, and explain how each person's work affects overall quality.",
          videoScript:
            "Clause 7.3 focuses on awareness - making sure people understand not just what to do, but why it matters. Think of awareness as connecting the dots between individual actions and organizational success. It's not enough for people to follow procedures blindly; they need to understand how their work contributes to quality and customer satisfaction. Awareness includes understanding your quality policy and objectives, knowing how their role fits into the bigger picture, and recognizing the consequences of not following QMS requirements. This understanding motivates people to care about quality, not just comply with rules. Effective awareness building involves regular communication, examples and stories, and helping people see the impact of their work on customers and colleagues.",
          actionableSteps: [
            "Communicate quality policy and objectives to all relevant personnel",
            "Explain how each person's work contributes to QMS effectiveness",
            "Share examples of quality successes and failures",
            "Discuss the implications of not following QMS requirements",
            "Use multiple communication methods to build awareness",
            "Verify understanding through discussions and feedback",
            "Regularly reinforce awareness messages",
          ],
          aiTip:
            "Use ChatGPT for awareness campaigns: 'Help me create an awareness campaign for QMS requirements in a [your industry] business, including key messages, communication methods, and ways to verify understanding.'",
        },
        {
          id: "7.4",
          title: "Communication",
          description:
            "Determine internal and external communications relevant to the QMS, including what to communicate, when, with whom, how, and who communicates.",
          example:
            "A service company establishes regular communication channels: weekly team meetings for internal updates, monthly customer newsletters, quarterly supplier reviews, and immediate notification procedures for quality issues.",
          videoScript:
            "Clause 7.4 covers communication - the nervous system of your QMS. Good communication ensures information flows where it's needed, when it's needed. Think about all the communication that happens in your organization: internal communication between departments, external communication with customers and suppliers, formal reports, and informal conversations. For your QMS to work effectively, you need to plan these communications systematically. What quality information needs to be shared? Who needs to know? How often? What's the best method - email, meetings, reports, or something else? Don't forget two-way communication - not just broadcasting information, but also listening and gathering feedback. Poor communication is often the root cause of quality problems, so investing in good communication systems pays dividends.",
          actionableSteps: [
            "Identify what QMS information needs to be communicated",
            "Determine who needs to receive each type of communication",
            "Choose appropriate communication methods and timing",
            "Establish both internal and external communication processes",
            "Assign responsibilities for different communications",
            "Create feedback mechanisms for two-way communication",
            "Monitor communication effectiveness and improve as needed",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me create a communication matrix for a [your industry] business QMS, showing what information to communicate, to whom, how often, and through which channels.'",
        },
        {
          id: "7.5",
          title: "Documented information",
          description:
            "The QMS must include documented information required by ISO 9001 and determined by the organization as necessary for QMS effectiveness.",
          example:
            "A consulting firm maintains a quality manual, documented procedures for key processes, work instructions for complex tasks, and records of training, audits, and customer feedback.",
          videoScript:
            "Clause 7.5 addresses documented information - the written foundation of your QMS. Think of documentation as your organization's memory and instruction manual. It captures what you've learned, standardizes how you do things, and provides evidence of what you've accomplished. ISO 9001 requires certain documents, but you should also create documentation that helps your organization operate effectively. This includes policies, procedures, work instructions, forms, and records. The key is finding the right balance - enough documentation to ensure consistency and compliance, but not so much that it becomes bureaucratic burden. Good documentation is clear, current, and actually used by people in their daily work. Remember, documentation isn't just about creating documents; it's about controlling them so people always have access to the right version.",
          actionableSteps: [
            "Identify what documented information is required by ISO 9001",
            "Determine additional documentation needed for QMS effectiveness",
            "Create or update necessary documents and records",
            "Establish document control procedures",
            "Ensure documents are available where and when needed",
            "Train people on how to use and maintain documented information",
            "Regularly review and update documentation",
          ],
          aiTip:
            "Use ChatGPT for documentation planning: 'Help me create a documentation matrix for a [your industry] business QMS, listing required documents, their purpose, and control requirements.'",
        },
        {
          id: "7.5.1",
          title: "General",
          description:
            "Documented information must be identified, described, formatted, and reviewed for suitability and adequacy before use.",
          example:
            "A small business ensures all procedures have clear titles, version numbers, approval dates, and are reviewed by appropriate personnel before being released for use.",
          videoScript:
            "Clause 7.5.1 covers general requirements for documented information. Think of this as quality control for your documents - ensuring they're fit for purpose before people use them. Every document should be properly identified with a clear title, version number, and date so people know they're using the right version. Documents should be formatted consistently and written in a way that users can understand and follow. Before releasing any document, it should be reviewed for suitability (does it serve its intended purpose?) and adequacy (does it contain all necessary information?). This review process helps prevent confusion and errors that can result from poor documentation. The goal is ensuring that when people need information to do their job, they can find it easily and trust that it's correct and current.",
          actionableSteps: [
            "Establish standards for document identification and formatting",
            "Create templates for consistent document structure",
            "Define review and approval processes for new documents",
            "Ensure documents are suitable for their intended use",
            "Verify documents contain adequate information",
            "Train document creators on standards and requirements",
            "Monitor document quality and user feedback",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me create document standards and templates for a [your industry] business, including identification, formatting, and review requirements.'",
        },
        {
          id: "7.5.2",
          title: "Creating and updating",
          description:
            "When creating and updating documented information, ensure appropriate identification, description, format, media, and review for suitability and adequacy.",
          example:
            "When updating a procedure, a company ensures it has a new version number, updated date, clear description of changes, appropriate format for users, and approval from the process owner.",
          videoScript:
            "Clause 7.5.2 focuses on creating and updating documents systematically. Think of this as your document development process - how you ensure new and revised documents meet your standards. When creating documents, consider who will use them and for what purpose. Use clear language, logical organization, and appropriate format. When updating documents, clearly identify what changed and why. This helps users understand the impact of changes. The review process is crucial - documents should be checked for accuracy, completeness, and usability before release. Consider involving end users in the review process since they're the ones who will actually use the documents. Version control is essential - people need to know which version is current and what changed from previous versions.",
          actionableSteps: [
            "Establish a systematic process for creating new documents",
            "Define procedures for updating existing documents",
            "Ensure proper identification and version control",
            "Use appropriate format and media for intended users",
            "Include end users in document review process",
            "Clearly communicate changes when documents are updated",
            "Maintain records of document creation and revision history",
          ],
          aiTip:
            "Use ChatGPT for document development: 'Help me create a step-by-step process for creating and updating QMS documents in a [your industry] business, including review criteria and change management.'",
        },
        {
          id: "7.5.3",
          title: "Control of documented information",
          description:
            "Ensure documented information is available, suitable for use, and adequately protected. Control distribution, access, retrieval, use, storage, preservation, and disposal.",
          example:
            "A company uses a shared drive with controlled access, maintains backup copies, ensures only current versions are available to users, and has procedures for archiving obsolete documents.",
          videoScript:
            "Clause 7.5.3 is about document control - managing your documents throughout their lifecycle. Think of this as your document management system that ensures people always have access to the right information at the right time. Document control involves several key activities: making sure current versions are available where needed, preventing use of obsolete versions, controlling who can access what information, and protecting documents from loss or damage. This might involve physical filing systems, electronic document management systems, or a combination. The goal is ensuring that when someone needs a procedure or form, they can find it easily and trust that it's the current, approved version. Good document control also includes backup and recovery procedures to protect against loss.",
          actionableSteps: [
            "Establish a document control system (physical or electronic)",
            "Control access to documents based on roles and responsibilities",
            "Ensure current versions are available where needed",
            "Prevent use of obsolete or unauthorized documents",
            "Implement backup and recovery procedures",
            "Train users on document control procedures",
            "Regularly audit document control effectiveness",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me design a document control system for a [your industry] business, including access controls, version management, and backup procedures.'",
        },
      ],
    },
    {
      id: "8",
      title: "Operation",
      subclauses: [
        {
          id: "8.1",
          title: "Operational planning and control",
          description:
            "Plan, implement, and control processes needed to meet product and service requirements. Establish criteria for processes and acceptance of products and services.",
          example:
            "A catering company plans each event by defining menu requirements, scheduling preparation and delivery, establishing food safety criteria, and controlling each step from ordering ingredients to serving customers.",
          videoScript:
            "Welcome to Clause 8.1 - operational planning and control. This is where your QMS meets the real world of delivering products and services. Think of this as your production playbook - how you consistently deliver what customers expect. Operational planning means thinking through all the steps needed to create and deliver your products or services. What processes are involved? What criteria must be met at each step? How will you know if you're on track? Control means monitoring these processes and taking action when things don't go as planned. This isn't just about manufacturing - service organizations need operational planning too. A consulting firm needs to plan how they'll deliver projects, what deliverables are expected, and how they'll ensure quality throughout the engagement. The key is being systematic and proactive rather than reactive.",
          actionableSteps: [
            "Map out all processes needed to deliver your products/services",
            "Establish criteria for process performance and product/service acceptance",
            "Plan resource requirements for each process",
            "Define control methods and monitoring points",
            "Establish procedures for when processes don't meet criteria",
            "Train personnel on operational procedures and controls",
            "Monitor and improve operational effectiveness",
          ],
          aiTip:
            "Use ChatGPT for operational planning: 'Help me create an operational planning template for a [your industry] business, including process steps, control points, and acceptance criteria.'",
        },
        {
          id: "8.2",
          title: "Requirements for products and services",
          description:
            "Determine, review, and manage requirements for your products and services, including customer requirements, legal requirements, and your own requirements.",
          example:
            "A software company identifies customer functional requirements, regulatory data protection requirements, and their own quality standards, then ensures all are clearly documented and communicated to the development team.",
          videoScript:
            "Clause 8.2 focuses on requirements - understanding exactly what your products and services must deliver. Think of requirements as your target - you can't hit what you can't see clearly. Requirements come from multiple sources: what customers ask for, what laws and regulations require, and what your organization commits to deliver. The challenge is that requirements can be complex, conflicting, or unclear. A customer might want the fastest delivery, lowest price, and highest quality - but these might conflict with each other. Your job is to identify all applicable requirements, resolve conflicts, and ensure everyone understands what must be delivered. This includes not just the obvious requirements, but also implied ones - customers expect your restaurant food to be safe even if they don't explicitly ask for it.",
          actionableSteps: [
            "Identify all sources of requirements for your products/services",
            "Document customer requirements clearly and completely",
            "Identify applicable legal and regulatory requirements",
            "Define your own organizational requirements and standards",
            "Resolve conflicts between different requirements",
            "Communicate requirements to all relevant personnel",
            "Review and update requirements as they change",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me create a requirements management framework for a [your industry] business, including methods to capture, analyze, and manage different types of requirements.'",
        },
        {
          id: "8.2.1",
          title: "Customer communication",
          description:
            "Establish effective communication with customers regarding product and service information, inquiries, contracts, orders, feedback, and complaints.",
          example:
            "An online retailer provides clear product information on their website, has a customer service team for inquiries, sends order confirmations, follows up for feedback, and has a structured complaint resolution process.",
          videoScript:
            "Clause 8.2.1 covers customer communication - your ongoing dialogue with customers throughout their experience with your organization. Think of this as relationship management, not just information exchange. Effective customer communication starts before the sale with clear information about your products and services. It continues through the sales process with prompt responses to inquiries and clear contracts or agreements. After the sale, communication includes order confirmations, delivery updates, and follow-up for feedback. Don't forget complaint handling - how customers can reach you when things go wrong and how you'll respond. Good customer communication builds trust, prevents misunderstandings, and creates opportunities for improvement. It's not just about having communication channels, but about using them effectively to enhance customer relationships.",
          actionableSteps: [
            "Establish clear channels for customer communication",
            "Provide accurate and complete product/service information",
            "Respond promptly to customer inquiries and concerns",
            "Ensure contracts and agreements are clear and understood",
            "Implement systematic feedback collection processes",
            "Establish effective complaint handling procedures",
            "Train staff on customer communication standards",
          ],
          aiTip:
            "Use ChatGPT for communication planning: 'Help me design a customer communication strategy for a [your industry] business, including touchpoints, channels, and response standards.'",
        },
        {
          id: "8.2.2",
          title: "Determining the requirements for products and services",
          description:
            "When determining requirements, include performance and functional requirements, legal and regulatory requirements, and requirements considered necessary by the organization.",
          example:
            "A medical device manufacturer identifies functional requirements (device must measure accurately), regulatory requirements (FDA approval needed), and company requirements (must be user-friendly and cost-effective to produce).",
          videoScript:
            "Clause 8.2.2 is about systematically determining all requirements for your products and services. Think of this as creating a complete specification that covers everything your product or service must do or be. Start with functional requirements - what must the product or service actually accomplish? Then consider performance requirements - how well must it perform? Don't forget legal and regulatory requirements - what do laws and industry standards require? Finally, include your own organizational requirements - what standards do you set for yourself? For example, a restaurant's requirements might include functional (serve food), performance (within 15 minutes), regulatory (food safety standards), and organizational (use locally sourced ingredients). The goal is creating a comprehensive picture of what success looks like before you start delivering.",
          actionableSteps: [
            "Identify functional requirements - what the product/service must do",
            "Define performance requirements - how well it must perform",
            "Research applicable legal and regulatory requirements",
            "Establish your own organizational requirements and standards",
            "Document all requirements clearly and completely",
            "Ensure requirements are measurable and verifiable",
            "Review requirements with relevant stakeholders",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me create a comprehensive requirements checklist for [describe your product/service], including functional, performance, regulatory, and organizational requirements.'",
        },
        {
          id: "8.2.3",
          title: "Review of the requirements for products and services",
          description:
            "Review requirements before committing to supply products and services to customers, ensuring you can meet all requirements and resolving any differences.",
          example:
            "Before accepting a custom software project, a development company reviews all technical requirements, timeline expectations, and budget constraints to ensure they can deliver successfully, clarifying any unclear requirements with the client.",
          videoScript:
            "Clause 8.2.3 focuses on requirement review - making sure you can actually deliver what's being asked before you commit. Think of this as a reality check before making promises to customers. This review should happen before you accept an order, sign a contract, or make commitments. Ask yourself: Do we have the capability to meet these requirements? Are the requirements clear and complete? Are there any conflicts or unrealistic expectations? Can we meet the timeline and budget? This review might reveal that you need to negotiate changes, clarify unclear requirements, or even decline the business if you can't meet the requirements. It's better to have this conversation upfront than to disappoint customers later. Document your review decisions so you can refer back to them if questions arise.",
          actionableSteps: [
            "Establish a formal requirement review process",
            "Review requirements before accepting orders or contracts",
            "Verify your organization's ability to meet all requirements",
            "Identify and resolve any unclear or conflicting requirements",
            "Document the results of requirement reviews",
            "Communicate any changes or clarifications to customers",
            "Train staff on requirement review procedures",
          ],
          aiTip:
            "Use ChatGPT to create review criteria: 'Help me develop a requirement review checklist for a [your industry] business, including capability assessment and risk evaluation criteria.'",
        },
        {
          id: "8.2.4",
          title: "Changes to requirements for products and services",
          description:
            "When requirements change, ensure relevant documented information is amended and relevant persons are made aware of the changed requirements.",
          example:
            "When a client requests changes to a consulting project scope, the firm updates the project plan, revises the contract, notifies all team members of the changes, and adjusts resource allocation accordingly.",
          videoScript:
            "Clause 8.2.4 addresses requirement changes - managing the inevitable modifications that occur during projects or ongoing relationships. Think of this as change management for customer requirements. Requirements change for many reasons: customers learn more about what they need, regulations change, or market conditions shift. The key is managing these changes systematically rather than letting them create chaos. When requirements change, you need to update all relevant documentation, communicate changes to everyone affected, and assess the impact on timeline, cost, and resources. This might require renegotiating contracts, adjusting schedules, or reallocating resources. Good change management prevents misunderstandings and ensures everyone is working toward the same updated goals.",
          actionableSteps: [
            "Establish procedures for handling requirement changes",
            "Update all relevant documentation when requirements change",
            "Communicate changes to all affected personnel",
            "Assess the impact of changes on timeline, cost, and resources",
            "Obtain customer agreement for significant changes",
            "Document change decisions and rationale",
            "Monitor the effectiveness of change management processes",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me create a change management process for handling requirement changes in a [your industry] business, including impact assessment and communication procedures.'",
        },
      ],
    },
    {
      id: "9",
      title: "Performance evaluation",
      subclauses: [
        {
          id: "9.1",
          title: "Monitoring, measurement, analysis and evaluation",
          description:
            "Determine what needs to be monitored and measured, methods for monitoring and measurement, when to analyze and evaluate results, and when results should be evaluated.",
          example:
            "A consulting firm monitors project delivery times, measures client satisfaction scores, analyzes trends monthly, and evaluates overall performance quarterly to identify improvement opportunities.",
          videoScript:
            "Welcome to Clause 9.1 - monitoring, measurement, analysis and evaluation. This is your QMS dashboard - how you know if your quality management system is working effectively. Think of this like the instruments in your car that tell you speed, fuel level, and engine temperature. You need to know what's happening with your processes and results. Start by determining what to monitor - this might include process performance, product quality, customer satisfaction, and supplier performance. Then decide how to measure these things reliably and when to do it. But collecting data isn't enough - you need to analyze what the data tells you and evaluate whether you're meeting your objectives. This analysis helps you identify trends, spot problems early, and find opportunities for improvement. The goal is turning data into actionable insights.",
          actionableSteps: [
            "Identify what aspects of QMS performance need monitoring",
            "Select appropriate methods and tools for measurement",
            "Establish monitoring and measurement schedules",
            "Collect and analyze performance data regularly",
            "Evaluate results against objectives and targets",
            "Identify trends and improvement opportunities",
            "Take action based on analysis and evaluation results",
          ],
          aiTip:
            "Use ChatGPT for performance monitoring: 'Help me design a performance monitoring system for a [your industry] business, including key metrics, measurement methods, and analysis techniques.'",
        },
        {
          id: "9.1.1",
          title: "General",
          description:
            "Determine what needs to be monitored and measured to demonstrate conformity and effectiveness of the QMS, and ensure monitoring and measurement activities are carried out.",
          example:
            "A small manufacturer monitors production defect rates, customer complaint trends, supplier delivery performance, and employee training completion to demonstrate their QMS is working effectively.",
          videoScript:
            "Clause 9.1.1 covers general monitoring and measurement requirements. This is about creating a systematic approach to tracking your QMS performance. Think of it as your quality health check - regular monitoring that tells you if your system is healthy and effective. You need to monitor both conformity (are we meeting requirements?) and effectiveness (is our QMS helping us achieve our objectives?). This might include process metrics like cycle times or defect rates, outcome metrics like customer satisfaction or financial performance, and system metrics like audit findings or corrective action effectiveness. The key is selecting meaningful metrics that actually tell you something useful about your QMS performance. Don't just measure what's easy to measure - measure what matters for your success.",
          actionableSteps: [
            "Identify key indicators of QMS conformity and effectiveness",
            "Select metrics that provide meaningful insights",
            "Establish baseline measurements and targets",
            "Implement regular monitoring and measurement activities",
            "Ensure measurement methods are reliable and valid",
            "Review monitoring results regularly",
            "Adjust monitoring approach based on learning and changes",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me identify the most important QMS performance indicators for a [your industry] business and suggest how to measure them effectively.'",
        },
        {
          id: "9.1.2",
          title: "Customer satisfaction",
          description:
            "Monitor customer perceptions of the degree to which their needs and expectations have been fulfilled, and determine methods for obtaining and using this information.",
          example:
            "An accounting firm uses client surveys, follow-up calls, renewal rates, and referral tracking to monitor customer satisfaction, then uses this information to improve service delivery.",
          videoScript:
            "Clause 9.1.2 focuses specifically on customer satisfaction - understanding how well you're meeting customer needs and expectations. Think of customer satisfaction as your report card from the people who matter most. But measuring customer satisfaction isn't just about sending surveys. You need to think creatively about how to understand customer perceptions. This might include direct feedback through surveys or interviews, indirect indicators like repeat business or referrals, or behavioral signals like complaints or compliments. The key is getting honest, actionable feedback that helps you improve. Remember, satisfied customers might not say anything, while dissatisfied customers might not complain directly but simply take their business elsewhere. You need proactive methods to understand customer perceptions.",
          actionableSteps: [
            "Identify various methods to gather customer satisfaction information",
            "Implement both direct feedback (surveys, interviews) and indirect indicators",
            "Establish regular customer satisfaction monitoring schedules",
            "Analyze customer satisfaction trends and patterns",
            "Use customer feedback to identify improvement opportunities",
            "Close the loop by communicating improvements back to customers",
            "Monitor the effectiveness of satisfaction improvement actions",
          ],
          aiTip:
            "Use ChatGPT for satisfaction measurement: 'Help me design a comprehensive customer satisfaction monitoring system for a [your industry] business, including multiple feedback methods and analysis approaches.'",
        },
        {
          id: "9.1.3",
          title: "Analysis and evaluation",
          description:
            "Analyze and evaluate appropriate data and information arising from monitoring and measurement to evaluate QMS performance and effectiveness.",
          example:
            "A service company analyzes monthly performance data to identify that response times are improving but customer satisfaction is declining, leading them to investigate and discover that faster responses are coming at the cost of solution quality.",
          videoScript:
            "Clause 9.1.3 is about turning data into insights through analysis and evaluation. Think of this as being a detective with your performance data - looking for patterns, trends, and clues about what's really happening in your organization. Collecting data is just the first step; the real value comes from analyzing what the data tells you. Are you meeting your objectives? What trends are emerging? Where are the biggest opportunities for improvement? Analysis might reveal surprising connections - maybe customer complaints increase when you're busy, or quality problems correlate with specific suppliers. Evaluation means stepping back and asking the big questions: Is our QMS effective? Are we achieving our intended results? What should we do differently? This analysis and evaluation should lead to action, not just reports.",
          actionableSteps: [
            "Collect and organize monitoring and measurement data",
            "Analyze data to identify trends, patterns, and correlations",
            "Evaluate QMS performance against objectives and targets",
            "Identify root causes of performance gaps or problems",
            "Determine opportunities for improvement and optimization",
            "Present analysis results in actionable formats",
            "Use evaluation results to guide decision-making and planning",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me create a data analysis framework for QMS performance evaluation in a [your industry] business, including analysis techniques and evaluation criteria.'",
        },
        {
          id: "9.2",
          title: "Internal audit",
          description:
            "Conduct internal audits at planned intervals to provide information on whether the QMS conforms to requirements and is effectively implemented and maintained.",
          example:
            "A small consulting firm conducts quarterly internal audits, with different team members auditing processes they're not directly involved in, using checklists based on ISO 9001 requirements and their own procedures.",
          videoScript:
            "Clause 9.2 covers internal audits - your systematic self-assessment of QMS effectiveness. Think of internal audits as your organization's health checkup, conducted by your own people to identify what's working well and what needs improvement. Internal audits aren't about catching people doing things wrong; they're about verifying that your QMS is working as intended and finding opportunities to make it better. Good internal audits involve planning what to audit and when, training auditors to be objective and thorough, conducting audits systematically using checklists or guides, and following up on findings with corrective actions. The goal is continuous improvement, not punishment. Internal audits should be conducted by people who aren't directly responsible for the processes being audited to ensure objectivity.",
          actionableSteps: [
            "Develop an internal audit program covering all QMS processes",
            "Train internal auditors on audit techniques and requirements",
            "Plan audit schedules based on importance and previous results",
            "Conduct audits systematically using checklists and procedures",
            "Document audit findings and recommendations",
            "Follow up on corrective actions and improvements",
            "Review and improve the internal audit program regularly",
          ],
          aiTip:
            "Use ChatGPT for audit planning: 'Help me create an internal audit program for a [your industry] business, including audit checklists, schedules, and auditor training requirements.'",
        },
        {
          id: "9.3",
          title: "Management review",
          description:
            "Top management must review the QMS at planned intervals to ensure its continuing suitability, adequacy, effectiveness, and alignment with strategic direction.",
          example:
            "A company's leadership team meets quarterly to review QMS performance data, customer feedback, audit results, and resource needs, then makes decisions about improvements and strategic changes.",
          videoScript:
            "Clause 9.3 addresses management review - top management's systematic evaluation of QMS performance and strategic alignment. Think of management review as the board meeting for your quality management system, where leaders step back from daily operations to assess the big picture. This isn't just a status report meeting; it's a strategic review where management evaluates whether the QMS is still suitable for the organization's needs, adequate for its scope and complexity, and effective in achieving objectives. Management review should consider performance data, audit results, customer feedback, and changes in the business environment. The output should be decisions about improvements, resource allocation, and strategic direction. This review ensures the QMS evolves with the organization and continues to add value.",
          actionableSteps: [
            "Schedule regular management review meetings (at least annually)",
            "Prepare comprehensive input data for management review",
            "Include all required review topics in the agenda",
            "Ensure top management actively participates in the review",
            "Make decisions about improvements and resource allocation",
            "Document review results and follow up on decisions",
            "Communicate review outcomes throughout the organization",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me design a management review process for a [your industry] business, including agenda templates, input requirements, and decision-making frameworks.'",
        },
      ],
    },
    {
      id: "10",
      title: "Improvement",
      subclauses: [
        {
          id: "10.1",
          title: "General",
          description:
            "Continually improve the suitability, adequacy, and effectiveness of the QMS by using quality policy, objectives, audit results, analysis of data, corrective actions, and management review.",
          example:
            "A service company uses customer feedback trends, internal audit findings, and performance data to identify improvement opportunities, then implements changes like streamlined processes and enhanced training programs.",
          videoScript:
            "Welcome to Clause 10.1 - the general requirement for continual improvement. This is the engine that drives your QMS forward, ensuring it gets better over time rather than stagnating. Think of continual improvement as the growth mindset for your organization - always looking for ways to do things better, faster, or more effectively. Improvement isn't just about fixing problems; it's about optimizing what's already working well. You should use all the information available to you: customer feedback, audit results, performance data, employee suggestions, and management insights. The key word is 'continual' - this isn't a one-time project but an ongoing commitment to getting better. Small, consistent improvements often have more impact than occasional major changes. Create a culture where everyone looks for improvement opportunities in their daily work.",
          actionableSteps: [
            "Establish a culture and mindset of continual improvement",
            "Use all available information sources to identify improvement opportunities",
            "Prioritize improvements based on impact and feasibility",
            "Implement improvements systematically with proper planning",
            "Monitor the effectiveness of improvement actions",
            "Celebrate and communicate improvement successes",
            "Make continual improvement part of regular business processes",
          ],
          aiTip:
            "Use ChatGPT for improvement planning: 'Help me create a continual improvement framework for a [your industry] business, including opportunity identification, prioritization, and implementation methods.'",
        },
        {
          id: "10.2",
          title: "Nonconformity and corrective action",
          description:
            "When nonconformities occur, take action to control and correct them, evaluate the need for corrective action to eliminate root causes, and implement any necessary corrective actions.",
          example:
            "When a restaurant receives complaints about slow service, they investigate and discover inadequate staffing during peak hours, then implement corrective actions including revised scheduling and additional staff training.",
          videoScript:
            "Clause 10.2 covers nonconformity and corrective action - your systematic approach to dealing with problems and preventing their recurrence. Think of this as your problem-solving methodology that goes beyond just fixing immediate issues to prevent them from happening again. When something goes wrong - a customer complaint, a defective product, a process failure - you need to respond systematically. First, control and correct the immediate problem. Then investigate to understand why it happened. Finally, take corrective action to eliminate the root cause so it doesn't happen again. This isn't about blame; it's about learning and improvement. Good corrective action addresses root causes, not just symptoms. If customers complain about late deliveries, don't just apologize - figure out why deliveries are late and fix the underlying cause.",
          actionableSteps: [
            "Establish procedures for identifying and handling nonconformities",
            "Take immediate action to control and correct problems",
            "Investigate root causes using systematic problem-solving methods",
            "Develop and implement corrective actions to prevent recurrence",
            "Monitor the effectiveness of corrective actions",
            "Document nonconformities and corrective actions for learning",
            "Review patterns of nonconformities to identify systemic issues",
          ],
          aiTip:
            "Ask ChatGPT: 'Help me create a nonconformity and corrective action process for a [your industry] business, including root cause analysis techniques and effectiveness monitoring methods.'",
        },
        {
          id: "10.3",
          title: "Continual improvement",
          description:
            "Continually improve the suitability, adequacy, and effectiveness of the QMS through the use of quality policy, objectives, audit results, analysis of data, corrective actions, and management review.",
          example:
            "A manufacturing company systematically reviews all performance data quarterly, identifies trends and opportunities, implements improvement projects, and tracks results to ensure continuous enhancement of their operations.",
          videoScript:
            "Clause 10.3 specifically focuses on continual improvement as a systematic approach to enhancing your QMS. This builds on the general improvement requirement by emphasizing the systematic use of all your QMS information sources. Think of this as connecting all the dots in your quality management system to drive improvement. Your quality policy sets the direction, objectives provide targets, audit results reveal gaps, data analysis shows trends, corrective actions fix problems, and management review provides strategic guidance. When you bring all these together systematically, you create a powerful improvement engine. The goal is making your QMS more suitable for your organization's needs, more adequate for its scope and complexity, and more effective in achieving results. This requires discipline and commitment, but the payoff is a QMS that truly adds value to your organization.",
          actionableSteps: [
            "Integrate improvement activities with all QMS processes",
            "Use quality policy and objectives to guide improvement priorities",
            "Systematically analyze all available performance information",
            "Connect improvement actions to strategic business objectives",
            "Implement improvements using project management principles",
            "Measure and communicate improvement results",
            "Embed continual improvement in organizational culture and processes",
          ],
          aiTip:
            "Use ChatGPT for improvement strategy: 'Help me develop a comprehensive continual improvement strategy for a [your industry] business that integrates all QMS information sources and aligns with business objectives.'",
        },
      ],
    },
  ];

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
          ISO 9001 Clauses Koo Koo Kii Kii
        </h1>
        <p className="text-muted-foreground">
          Interactive learning modules for each ISO 9001:2015 clause with
          AI-powered document analysis and generation.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="clauses">Clauses</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="ai-chat">AI Consultant</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="clauses" className="space-y-6">
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

                            {/* AI Document Generator */}
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center">
                                <Wand2 className="mr-2 h-4 w-4" />
                                AI Document Generator
                              </h4>
                              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-sm text-muted-foreground mb-3">
                                  Generate customized documents and templates
                                  for this clause using our AI.
                                </p>
                                <Dialog
                                  open={
                                    documentGeneratorDialogs[subclause.id] ||
                                    false
                                  }
                                  onOpenChange={() =>
                                    toggleDocumentGeneratorDialog(subclause.id)
                                  }
                                >
                                  <DialogTrigger asChild>
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                                      <Wand2 className="mr-2 h-4 w-4" />
                                      Generate Document
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center">
                                        <Wand2 className="mr-2 h-5 w-5 text-blue-600" />
                                        AI Document Generator - Clause{" "}
                                        {subclause.id}
                                      </DialogTitle>
                                      <DialogDescription>
                                        Generate customized documents and
                                        templates for {subclause.title}.
                                      </DialogDescription>
                                    </DialogHeader>

                                    {!generatedDocuments[subclause.id] ? (
                                      <div className="space-y-4">
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">
                                            Document Type
                                          </label>
                                          <select
                                            value={
                                              documentTypes[subclause.id] || ""
                                            }
                                            onChange={(e) =>
                                              updateDocumentType(
                                                subclause.id,
                                                e.target.value,
                                              )
                                            }
                                            className="w-full p-2 border border-input rounded-md bg-background"
                                          >
                                            <option value="">
                                              Select document type...
                                            </option>
                                            <option value="procedure">
                                              Procedure
                                            </option>
                                            <option value="policy">
                                              Policy
                                            </option>
                                            <option value="work instruction">
                                              Work Instruction
                                            </option>
                                            <option value="form">
                                              Form/Template
                                            </option>
                                            <option value="checklist">
                                              Checklist
                                            </option>
                                            <option value="flowchart">
                                              Process Flowchart
                                            </option>
                                            <option value="risk assessment">
                                              Risk Assessment
                                            </option>
                                            <option value="audit checklist">
                                              Audit Checklist
                                            </option>
                                          </select>
                                        </div>

                                        <div className="bg-muted/30 p-3 rounded-lg">
                                          <p className="text-sm text-muted-foreground">
                                            <strong>
                                              What will be generated:
                                            </strong>{" "}
                                            A customized{" "}
                                            {documentTypes[subclause.id] ||
                                              "document"}{" "}
                                            specifically designed for{" "}
                                            {subclause.title}, including
                                            relevant sections, responsibilities,
                                            and compliance requirements.
                                          </p>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="space-y-4">
                                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                          <p className="text-sm text-green-800 font-medium mb-2">
                                            ✅ Document Generated Successfully!
                                          </p>
                                          <p className="text-sm text-green-700">
                                            Your customized document for{" "}
                                            {subclause.title} is ready.
                                          </p>
                                        </div>

                                        <div className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto">
                                          <pre className="whitespace-pre-wrap text-sm font-mono">
                                            {generatedDocuments[subclause.id]}
                                          </pre>
                                        </div>

                                        <div className="flex space-x-2">
                                          <Button
                                            onClick={() => {
                                              navigator.clipboard.writeText(
                                                generatedDocuments[
                                                  subclause.id
                                                ],
                                              );
                                            }}
                                            variant="outline"
                                            className="flex-1"
                                          >
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy to Clipboard
                                          </Button>
                                          <Button
                                            onClick={() => {
                                              const blob = new Blob(
                                                [
                                                  generatedDocuments[
                                                    subclause.id
                                                  ],
                                                ],
                                                { type: "text/markdown" },
                                              );
                                              const url =
                                                URL.createObjectURL(blob);
                                              const a =
                                                document.createElement("a");
                                              a.href = url;
                                              a.download = `${subclause.id.replace(".", "_")}_${documentTypes[subclause.id] || "document"}.md`;
                                              document.body.appendChild(a);
                                              a.click();
                                              document.body.removeChild(a);
                                              URL.revokeObjectURL(url);
                                            }}
                                            variant="outline"
                                            className="flex-1"
                                          >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                          </Button>
                                        </div>
                                      </div>
                                    )}

                                    <DialogFooter>
                                      {!generatedDocuments[subclause.id] ? (
                                        <>
                                          <Button
                                            variant="outline"
                                            onClick={() =>
                                              toggleDocumentGeneratorDialog(
                                                subclause.id,
                                              )
                                            }
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            onClick={() =>
                                              handleDocumentGeneration(
                                                subclause.id,
                                                `${subclause.id} - ${subclause.title}`,
                                              )
                                            }
                                            disabled={
                                              !documentTypes[subclause.id]
                                            }
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                          >
                                            <Wand2 className="mr-2 h-4 w-4" />
                                            Generate Document
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <Button
                                            variant="outline"
                                            onClick={() => {
                                              setGeneratedDocuments((prev) => {
                                                const newState = { ...prev };
                                                delete newState[subclause.id];
                                                return newState;
                                              });
                                            }}
                                          >
                                            Generate Another
                                          </Button>
                                          <Button
                                            onClick={() =>
                                              toggleDocumentGeneratorDialog(
                                                subclause.id,
                                              )
                                            }
                                          >
                                            Close
                                          </Button>
                                        </>
                                      )}
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>

                            {/* AI Consultant for this Subclause */}
                            <div className="border-t pt-4">
                              <Dialog
                                open={
                                  aiConsultantDialogs[subclause.id] || false
                                }
                                onOpenChange={() =>
                                  toggleAiConsultantDialog(subclause.id)
                                }
                              >
                                <DialogTrigger asChild>
                                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                                    <Bot className="mr-2 h-4 w-4" />
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Analyze Document for Clause {subclause.id}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center">
                                      <Bot className="mr-2 h-5 w-5 text-purple-600" />
                                      AI Consultant - Clause {subclause.id}{" "}
                                      Analysis
                                    </DialogTitle>
                                    <DialogDescription>
                                      Upload your document and ask the AI
                                      Consultant to analyze it against clause{" "}
                                      {subclause.id}: {subclause.title}.
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
                                          onChange={(e) =>
                                            handleFileUpload(e, subclause.id)
                                          }
                                          className="hidden"
                                          id={`document-upload-${subclause.id}`}
                                          accept=".pdf,.doc,.docx,.txt"
                                        />
                                        <label
                                          htmlFor={`document-upload-${subclause.id}`}
                                          className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                                        >
                                          {uploadedDocuments[subclause.id] ? (
                                            <span className="text-green-600 font-medium">
                                              ✓{" "}
                                              {
                                                uploadedDocuments[subclause.id]
                                                  ?.name
                                              }
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
                                        placeholder={`Ask the AI Consultant about clause ${subclause.id}, e.g., 'Does my document meet the requirements of clause ${subclause.id} - ${subclause.title}?'`}
                                        value={
                                          consultantQueries[subclause.id] || ""
                                        }
                                        onChange={(e) =>
                                          updateConsultantQuery(
                                            subclause.id,
                                            e.target.value,
                                          )
                                        }
                                        className="min-h-[100px]"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        toggleAiConsultantDialog(subclause.id)
                                      }
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleConsultantSubmit(
                                          subclause.id,
                                          `${subclause.id} - ${subclause.title}`,
                                        )
                                      }
                                      disabled={
                                        !uploadedDocuments[subclause.id] ||
                                        !(
                                          consultantQueries[subclause.id] || ""
                                        ).trim()
                                      }
                                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                    >
                                      <Bot className="mr-2 h-4 w-4" />
                                      Analyze Document
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
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
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <BookOpen className="mr-3 h-6 w-6 text-primary" />
              ISO 9001 Training Courses
            </h2>
            <p className="text-muted-foreground">
              Comprehensive training courses to build your ISO 9001 expertise
            </p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 max-w-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge
                      variant="secondary"
                      className={`${
                        course.difficulty === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : course.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {course.rating}
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.modules} modules
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{course.enrolled} enrolled</span>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button className="w-full" size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      {course.progress > 0 ? "Continue" : "Start Course"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <Video className="mr-3 h-6 w-6 text-primary" />
              ISO 9001 Webinars
            </h2>
            <p className="text-muted-foreground">
              Live and recorded webinars from industry experts
            </p>
          </div>

          <div className="space-y-4">
            {webinars.map((webinar) => (
              <Card
                key={webinar.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">
                          {webinar.title}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={`${
                            webinar.status === "upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {webinar.status === "upcoming"
                            ? "Upcoming"
                            : "Recorded"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Presented by {webinar.presenter}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(webinar.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {webinar.time}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {webinar.attendees} attendees
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Button
                        variant={
                          webinar.status === "upcoming" ? "default" : "outline"
                        }
                        size="sm"
                      >
                        {webinar.status === "upcoming"
                          ? "Register"
                          : "Watch Recording"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    AI Consultant
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Get instant answers to your ISO 9001 questions and document
                    analysis
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
                        Completed "Internal Auditing Mastery"
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
                        Started "Risk-Based Thinking"
                      </p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Earned "ISO 9001 Expert" badge
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

export default ISO9001Clauses;
