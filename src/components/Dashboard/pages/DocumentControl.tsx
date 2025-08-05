import React, { useState } from "react";
import {
  FileText,
  FolderOpen,
  Edit3,
  Save,
  Download,
  Copy,
  Plus,
  Trash2,
  Search,
  Filter,
  Upload,
  Eye,
  Settings,
  Archive,
  Clock,
  User,
  Tag,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Calendar,
  UserCheck,
  History,
  Bot,
  HelpCircle,
  FileDown,
  Zap,
  Shield,
  BookOpen,
  ClipboardCheck,
  Users,
  BarChart3,
  Wrench,
  SortAsc,
  SortDesc,
  Info,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Template {
  id: string;
  name: string;
  type: string;
  clause: string;
  content: string;
  lastModified: string;
  status: "draft" | "under_review" | "approved" | "obsolete";
  version: string;
  owner: string;
  approver: string;
  dateApproved: string;
  nextReviewDate: string;
  changeHistory: ChangeHistoryEntry[];
  industry?: string;
  tooltip?: string;
}

interface ChangeHistoryEntry {
  version: string;
  date: string;
  editor: string;
  changes: string;
}

interface ApprovalWorkflow {
  reviewer: string;
  dueDate: string;
  status: "pending" | "approved" | "rejected";
  comments?: string;
  signedDate?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: "approved" | "draft" | "review" | "obsolete";
  version: string;
  lastModified: string;
  owner: string;
  size: string;
}

const DocumentControl = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterClause, setFilterClause] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeTab, setActiveTab] = useState("overview");
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("general");
  const [approvalWorkflow, setApprovalWorkflow] = useState<ApprovalWorkflow>({
    reviewer: "",
    dueDate: "",
    status: "pending",
  });

  // Pre-made templates from AI document generator
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Customer Communication Procedure",
      type: "SOP",
      clause: "8.2.1",
      content: `# Customer Communication Procedure\n\n## Purpose\nThis procedure defines the process for effective customer communication to ensure customer requirements are understood and met.\n\n## Scope\nThis procedure applies to all customer-facing activities within the organization.\n\n## Responsibilities\n- Sales Team: Initial customer contact and requirement gathering\n- Customer Service: Ongoing communication and support\n- Quality Manager: Review of customer feedback\n\n## Procedure\n1. **Initial Contact**\n   - Document customer requirements\n   - Confirm understanding with customer\n   - Establish communication channels\n\n2. **Ongoing Communication**\n   - Regular status updates\n   - Prompt response to inquiries\n   - Documentation of all interactions\n\n3. **Feedback Management**\n   - Collect customer feedback\n   - Analyze and respond appropriately\n   - Implement improvements based on feedback`,
      lastModified: "2024-01-15",
      status: "approved",
      version: "1.2",
      owner: "Customer Service Manager",
      approver: "Quality Director",
      dateApproved: "2024-01-10",
      nextReviewDate: "2025-01-10",
      changeHistory: [
        {
          version: "1.2",
          date: "2024-01-15",
          editor: "Customer Service Manager",
          changes: "Updated feedback management section",
        },
        {
          version: "1.1",
          date: "2023-12-01",
          editor: "Quality Manager",
          changes: "Added communication channels section",
        },
      ],
      industry: "service",
      tooltip:
        "ISO 8.2.1 requires organizations to determine and provide information related to products and services, handle enquiries, contracts or orders, obtain customer feedback, and handle customer property.",
    },
    {
      id: "2",
      name: "Quality Policy Template",
      type: "Policy",
      clause: "5.2",
      content: `# Quality Policy\n\n## Our Commitment\n[COMPANY_NAME] is committed to delivering products and services that consistently meet customer requirements and applicable regulations.\n\n## Quality Objectives\n- Achieve customer satisfaction through continuous improvement\n- Maintain compliance with ISO 9001:2015 standards\n- Foster a culture of quality throughout the organization\n\n## Management Commitment\nTop management ensures this policy is:\n- Communicated and understood at all levels\n- Reviewed for continuing suitability\n- Supported by measurable quality objectives\n\n---\n**Approved by:** [APPROVER_NAME]\n**Date:** [APPROVAL_DATE]\n**Version:** [VERSION_NUMBER]`,
      lastModified: "2024-01-10",
      status: "approved",
      version: "2.0",
      owner: "CEO",
      approver: "Board of Directors",
      dateApproved: "2024-01-05",
      nextReviewDate: "2025-01-05",
      changeHistory: [
        {
          version: "2.0",
          date: "2024-01-10",
          editor: "CEO",
          changes: "Major revision to align with strategic objectives",
        },
      ],
      industry: "general",
      tooltip:
        "ISO 5.2 requires top management to establish, implement and maintain a quality policy that is appropriate to the purpose and context of the organization.",
    },
    {
      id: "3",
      name: "Work Instruction Template",
      type: "Work Instruction",
      clause: "7.5",
      content: `# Work Instruction: [PROCESS_NAME]\n\n## Purpose\nDefine the step-by-step process for [SPECIFIC_ACTIVITY].\n\n## Materials/Equipment Required\n- [LIST_MATERIALS]\n- [LIST_EQUIPMENT]\n\n## Safety Considerations\n- [SAFETY_REQUIREMENTS]\n- [PPE_REQUIREMENTS]\n\n## Step-by-Step Instructions\n1. [STEP_1_DESCRIPTION]\n2. [STEP_2_DESCRIPTION]\n3. [STEP_3_DESCRIPTION]\n\n## Quality Checks\n- [QUALITY_CONTROL_POINTS]\n- [ACCEPTANCE_CRITERIA]\n\n## Records\n- [REQUIRED_DOCUMENTATION]\n- [RECORD_RETENTION]\n\n---\n**Document ID:** [DOC_ID]\n**Effective Date:** [EFFECTIVE_DATE]\n**Version:** [VERSION_NUMBER]`,
      lastModified: "2024-01-08",
      status: "under_review",
      version: "1.0",
      owner: "Process Engineer",
      approver: "Operations Manager",
      dateApproved: "",
      nextReviewDate: "2024-07-08",
      changeHistory: [
        {
          version: "1.0",
          date: "2024-01-08",
          editor: "Process Engineer",
          changes: "Initial draft creation",
        },
      ],
      industry: "manufacturing",
      tooltip:
        "ISO 7.5 requires organizations to control documented information required by the QMS and maintain it in a suitable format.",
    },
    {
      id: "4",
      name: "Risk Assessment Form",
      type: "Form",
      clause: "6.1",
      content: `# Risk Assessment Form\n\n## Process/Activity: [PROCESS_NAME]\n## Date: [ASSESSMENT_DATE]\n## Assessor: [ASSESSOR_NAME]\n\n## Risk Identification\n| Risk Description | Likelihood (1-5) | Impact (1-5) | Risk Score | Mitigation Actions |\n|------------------|------------------|---------------|------------|-------------------|\n| [RISK_1] | [LIKELIHOOD_1] | [IMPACT_1] | [SCORE_1] | [MITIGATION_1] |\n| [RISK_2] | [LIKELIHOOD_2] | [IMPACT_2] | [SCORE_2] | [MITIGATION_2] |\n| [RISK_3] | [LIKELIHOOD_3] | [IMPACT_3] | [SCORE_3] | [MITIGATION_3] |\n\n## Risk Evaluation\n- High Risk (15-25): Immediate action required\n- Medium Risk (8-14): Action plan within 30 days\n- Low Risk (1-7): Monitor and review\n\n## Approval\nAssessor Signature: [ASSESSOR_SIGNATURE]\nManager Approval: [MANAGER_SIGNATURE]\nDate: [APPROVAL_DATE]`,
      lastModified: "2024-01-05",
      status: "approved",
      version: "1.1",
      owner: "Risk Manager",
      approver: "Quality Director",
      dateApproved: "2024-01-01",
      nextReviewDate: "2025-01-01",
      changeHistory: [
        {
          version: "1.1",
          date: "2024-01-05",
          editor: "Risk Manager",
          changes: "Added risk scoring matrix and evaluation criteria",
        },
      ],
      industry: "general",
      tooltip:
        "ISO 6.1 requires organizations to determine risks and opportunities that need to be addressed to ensure the QMS can achieve its intended results.",
    },
    // New Essential Templates
    {
      id: "5",
      name: "Document Control Procedure",
      type: "SOP",
      clause: "7.5",
      content: `# Document Control Procedure\n\n## Purpose\nTo establish a systematic approach for controlling documents within the Quality Management System.\n\n## Scope\nThis procedure applies to all controlled documents within [COMPANY_NAME].\n\n## Responsibilities\n- Document Controller: Maintain document register and control\n- Process Owners: Create and maintain process documents\n- Quality Manager: Approve document control procedures\n\n## Procedure\n1. **Document Creation**\n   - Use approved templates\n   - Assign unique document ID\n   - Complete document header information\n\n2. **Review and Approval**\n   - Technical review by process owner\n   - Quality review by quality manager\n   - Final approval by designated authority\n\n3. **Distribution and Access**\n   - Controlled distribution list\n   - Electronic access controls\n   - Version control management\n\n4. **Document Changes**\n   - Change request process\n   - Impact assessment\n   - Re-approval requirements\n\n5. **Document Retention**\n   - Retention schedule\n   - Archive procedures\n   - Disposal authorization`,
      lastModified: "2024-01-20",
      status: "approved",
      version: "3.0",
      owner: "Document Controller",
      approver: "Quality Director",
      dateApproved: "2024-01-15",
      nextReviewDate: "2025-01-15",
      changeHistory: [
        {
          version: "3.0",
          date: "2024-01-20",
          editor: "Document Controller",
          changes: "Updated electronic document management procedures",
        },
      ],
      industry: "general",
      tooltip:
        "ISO 7.5 requires organizations to control documented information to ensure it is available, suitable for use, and adequately protected.",
    },
    {
      id: "6",
      name: "CAPA Form",
      type: "Form",
      clause: "10.2",
      content: `# Corrective and Preventive Action (CAPA) Form\n\n## CAPA Information\n**CAPA ID:** [CAPA_ID]\n**Date Initiated:** [INIT_DATE]\n**Initiated By:** [INITIATOR_NAME]\n**Priority:** [HIGH/MEDIUM/LOW]\n\n## Problem Description\n**Source of Problem:**\n☐ Internal Audit ☐ Customer Complaint ☐ Nonconformance ☐ Management Review ☐ Other: [SPECIFY]\n\n**Problem Statement:** [PROBLEM_DESCRIPTION]\n\n**Evidence/Data:** [SUPPORTING_EVIDENCE]\n\n## Root Cause Analysis\n**Investigation Method:** [5_WHY/FISHBONE/OTHER]\n\n**Root Cause(s):** [ROOT_CAUSE_ANALYSIS]\n\n## Corrective Actions\n**Action Description:** [CORRECTIVE_ACTION]\n**Responsible Person:** [RESPONSIBLE_PERSON]\n**Target Completion Date:** [TARGET_DATE]\n**Actual Completion Date:** [ACTUAL_DATE]\n\n## Preventive Actions\n**Action Description:** [PREVENTIVE_ACTION]\n**Responsible Person:** [RESPONSIBLE_PERSON]\n**Target Completion Date:** [TARGET_DATE]\n**Actual Completion Date:** [ACTUAL_DATE]\n\n## Effectiveness Review\n**Review Date:** [REVIEW_DATE]\n**Reviewer:** [REVIEWER_NAME]\n**Effectiveness Confirmed:** ☐ Yes ☐ No\n**Comments:** [REVIEW_COMMENTS]\n\n## Closure\n**Closed By:** [CLOSER_NAME]\n**Closure Date:** [CLOSURE_DATE]\n**Final Comments:** [FINAL_COMMENTS]`,
      lastModified: "2024-01-18",
      status: "approved",
      version: "2.1",
      owner: "Quality Manager",
      approver: "Quality Director",
      dateApproved: "2024-01-12",
      nextReviewDate: "2025-01-12",
      changeHistory: [
        {
          version: "2.1",
          date: "2024-01-18",
          editor: "Quality Manager",
          changes: "Added effectiveness review section",
        },
      ],
      industry: "general",
      tooltip:
        "ISO 10.2 requires organizations to take corrective action to eliminate the cause of nonconformities and prevent recurrence.",
    },
    {
      id: "7",
      name: "Nonconformance Report",
      type: "Form",
      clause: "8.7",
      content: `# Nonconformance Report\n\n## Report Information\n**NCR Number:** [NCR_NUMBER]\n**Date Reported:** [REPORT_DATE]\n**Reported By:** [REPORTER_NAME]\n**Department/Area:** [DEPARTMENT]\n\n## Nonconformance Details\n**Product/Service:** [PRODUCT_SERVICE]\n**Process:** [PROCESS_NAME]\n**Requirement:** [REQUIREMENT_REFERENCE]\n\n**Description of Nonconformance:** [NC_DESCRIPTION]\n\n**Quantity Affected:** [QUANTITY]\n**Potential Impact:** [IMPACT_ASSESSMENT]\n\n## Immediate Actions\n**Containment Action:** [CONTAINMENT_ACTION]\n**Responsible Person:** [RESPONSIBLE_PERSON]\n**Date Completed:** [COMPLETION_DATE]\n\n## Disposition\n☐ Use as is ☐ Repair ☐ Rework ☐ Regrade ☐ Scrap\n\n**Disposition Details:** [DISPOSITION_DETAILS]\n**Authorized By:** [AUTHORIZATION]\n**Date:** [AUTH_DATE]\n\n## Customer Notification\n**Customer Notified:** ☐ Yes ☐ No ☐ N/A\n**Notification Date:** [NOTIFICATION_DATE]\n**Method:** [NOTIFICATION_METHOD]\n\n## Follow-up Actions\n**CAPA Required:** ☐ Yes ☐ No\n**CAPA Number:** [CAPA_NUMBER]\n\n**Closed By:** [CLOSER_NAME]\n**Closure Date:** [CLOSURE_DATE]`,
      lastModified: "2024-01-16",
      status: "approved",
      version: "1.3",
      owner: "Quality Inspector",
      approver: "Quality Manager",
      dateApproved: "2024-01-10",
      nextReviewDate: "2025-01-10",
      changeHistory: [
        {
          version: "1.3",
          date: "2024-01-16",
          editor: "Quality Inspector",
          changes: "Added customer notification section",
        },
      ],
      industry: "manufacturing",
      tooltip:
        "ISO 8.7 requires organizations to control nonconforming outputs to prevent their unintended use or delivery.",
    },
    {
      id: "8",
      name: "Training Record Form",
      type: "Form",
      clause: "7.2",
      content: `# Training Record Form\n\n## Employee Information\n**Employee Name:** [EMPLOYEE_NAME]\n**Employee ID:** [EMPLOYEE_ID]\n**Department:** [DEPARTMENT]\n**Position:** [POSITION]\n\n## Training Details\n**Training Title:** [TRAINING_TITLE]\n**Training Type:** ☐ Orientation ☐ Job-specific ☐ Safety ☐ Quality ☐ Regulatory ☐ Other: [SPECIFY]\n**Training Method:** ☐ Classroom ☐ Online ☐ On-the-job ☐ External ☐ Other: [SPECIFY]\n\n**Training Provider:** [PROVIDER_NAME]\n**Training Date(s):** [TRAINING_DATES]\n**Duration:** [DURATION_HOURS] hours\n\n## Training Content\n**Objectives:** [TRAINING_OBJECTIVES]\n\n**Topics Covered:** [TOPICS_COVERED]\n\n## Assessment\n**Assessment Method:** ☐ Written Test ☐ Practical Demo ☐ Observation ☐ Other: [SPECIFY]\n**Assessment Score:** [SCORE]\n**Pass/Fail:** ☐ Pass ☐ Fail\n\n## Competency Evaluation\n**Competency Achieved:** ☐ Yes ☐ No\n**Evaluator:** [EVALUATOR_NAME]\n**Evaluation Date:** [EVAL_DATE]\n\n## Follow-up Actions\n**Additional Training Required:** ☐ Yes ☐ No\n**Next Review Date:** [NEXT_REVIEW]\n\n**Trainer Signature:** [TRAINER_SIGNATURE]\n**Employee Signature:** [EMPLOYEE_SIGNATURE]\n**Supervisor Signature:** [SUPERVISOR_SIGNATURE]\n**Date:** [SIGNATURE_DATE]`,
      lastModified: "2024-01-14",
      status: "approved",
      version: "2.0",
      owner: "HR Manager",
      approver: "Quality Director",
      dateApproved: "2024-01-08",
      nextReviewDate: "2025-01-08",
      changeHistory: [
        {
          version: "2.0",
          date: "2024-01-14",
          editor: "HR Manager",
          changes: "Added competency evaluation section",
        },
      ],
      industry: "general",
      tooltip:
        "ISO 7.2 requires organizations to determine necessary competence, provide training, and retain documented information as evidence of competence.",
    },
    {
      id: "9",
      name: "Internal Audit Checklist",
      type: "Form",
      clause: "9.2",
      content: `# Internal Audit Checklist\n\n## Audit Information\n**Audit ID:** [AUDIT_ID]\n**Audit Date:** [AUDIT_DATE]\n**Auditor(s):** [AUDITOR_NAMES]\n**Auditee:** [AUDITEE_NAME]\n**Department/Process:** [AUDIT_SCOPE]\n\n## Pre-Audit Preparation\n☐ Audit plan communicated\n☐ Previous audit findings reviewed\n☐ Applicable documents identified\n☐ Audit checklist prepared\n\n## ISO 9001 Clause Review\n\n### Clause 4: Context of the Organization\n☐ 4.1 Understanding the organization and its context\n☐ 4.2 Understanding the needs and expectations of interested parties\n☐ 4.3 Determining the scope of the QMS\n☐ 4.4 QMS and its processes\n\n### Clause 5: Leadership\n☐ 5.1 Leadership and commitment\n☐ 5.2 Policy\n☐ 5.3 Organizational roles, responsibilities and authorities\n\n### Clause 6: Planning\n☐ 6.1 Actions to address risks and opportunities\n☐ 6.2 Quality objectives and planning to achieve them\n☐ 6.3 Planning of changes\n\n### Clause 7: Support\n☐ 7.1 Resources\n☐ 7.2 Competence\n☐ 7.3 Awareness\n☐ 7.4 Communication\n☐ 7.5 Documented information\n\n### Clause 8: Operation\n☐ 8.1 Operational planning and control\n☐ 8.2 Requirements for products and services\n☐ 8.3 Design and development\n☐ 8.4 Control of externally provided processes\n☐ 8.5 Production and service provision\n☐ 8.6 Release of products and services\n☐ 8.7 Control of nonconforming outputs\n\n### Clause 9: Performance Evaluation\n☐ 9.1 Monitoring, measurement, analysis and evaluation\n☐ 9.2 Internal audit\n☐ 9.3 Management review\n\n### Clause 10: Improvement\n☐ 10.1 General\n☐ 10.2 Nonconformity and corrective action\n☐ 10.3 Continual improvement\n\n## Findings\n**Conformities:** [CONFORMITIES]\n\n**Minor Nonconformities:** [MINOR_NCs]\n\n**Major Nonconformities:** [MAJOR_NCs]\n\n**Opportunities for Improvement:** [OPPORTUNITIES]\n\n## Audit Conclusion\n**Overall Assessment:** [ASSESSMENT]\n\n**Auditor Signature:** [AUDITOR_SIGNATURE]\n**Date:** [SIGNATURE_DATE]`,
      lastModified: "2024-01-12",
      status: "approved",
      version: "1.5",
      owner: "Lead Auditor",
      approver: "Quality Manager",
      dateApproved: "2024-01-06",
      nextReviewDate: "2025-01-06",
      changeHistory: [
        {
          version: "1.5",
          date: "2024-01-12",
          editor: "Lead Auditor",
          changes: "Updated checklist to align with ISO 9001:2015 structure",
        },
      ],
      industry: "general",
      tooltip:
        "ISO 9.2 requires organizations to conduct internal audits at planned intervals to provide information on whether the QMS conforms to requirements.",
    },
    {
      id: "10",
      name: "Supplier Evaluation Form",
      type: "Form",
      clause: "8.4",
      content: `# Supplier Evaluation Form\n\n## Supplier Information\n**Supplier Name:** [SUPPLIER_NAME]\n**Contact Person:** [CONTACT_PERSON]\n**Address:** [SUPPLIER_ADDRESS]\n**Phone:** [PHONE_NUMBER]\n**Email:** [EMAIL_ADDRESS]\n\n## Product/Service Information\n**Product/Service:** [PRODUCT_SERVICE]\n**Category:** [CATEGORY]\n**Criticality:** ☐ Critical ☐ Important ☐ Standard\n\n## Evaluation Criteria\n\n### Quality Management (25 points)\n☐ ISO 9001 certified (10 pts)\n☐ Quality manual available (5 pts)\n☐ Quality procedures documented (5 pts)\n☐ Quality records maintained (5 pts)\n**Score:** [QUALITY_SCORE]/25\n\n### Technical Capability (25 points)\n☐ Technical expertise demonstrated (10 pts)\n☐ Appropriate equipment/facilities (8 pts)\n☐ Process control measures (7 pts)\n**Score:** [TECHNICAL_SCORE]/25\n\n### Delivery Performance (20 points)\n☐ On-time delivery history (10 pts)\n☐ Capacity to meet requirements (5 pts)\n☐ Flexibility in delivery (5 pts)\n**Score:** [DELIVERY_SCORE]/20\n\n### Financial Stability (15 points)\n☐ Financial statements reviewed (8 pts)\n☐ Credit rating acceptable (4 pts)\n☐ Business continuity plan (3 pts)\n**Score:** [FINANCIAL_SCORE]/15\n\n### Communication & Service (15 points)\n☐ Responsive communication (8 pts)\n☐ Technical support available (4 pts)\n☐ Problem resolution capability (3 pts)\n**Score:** [SERVICE_SCORE]/15\n\n## Overall Assessment\n**Total Score:** [TOTAL_SCORE]/100\n\n**Rating:**\n☐ Approved (80-100 points)\n☐ Conditional (60-79 points)\n☐ Not Approved (<60 points)\n\n## Recommendations\n**Action Required:** [RECOMMENDATIONS]\n\n**Re-evaluation Date:** [REEVAL_DATE]\n\n**Evaluated By:** [EVALUATOR_NAME]\n**Date:** [EVALUATION_DATE]\n**Approved By:** [APPROVER_NAME]\n**Date:** [APPROVAL_DATE]`,
      lastModified: "2024-01-11",
      status: "approved",
      version: "1.2",
      owner: "Procurement Manager",
      approver: "Quality Manager",
      dateApproved: "2024-01-05",
      nextReviewDate: "2025-01-05",
      changeHistory: [
        {
          version: "1.2",
          date: "2024-01-11",
          editor: "Procurement Manager",
          changes:
            "Updated scoring criteria and added financial stability section",
        },
      ],
      industry: "general",
      tooltip:
        "ISO 8.4 requires organizations to ensure that externally provided processes, products and services conform to requirements.",
    },
    {
      id: "11",
      name: "Calibration Log",
      type: "Form",
      clause: "7.1.5",
      content: `# Equipment Calibration Log\n\n## Equipment Information\n**Equipment ID:** [EQUIPMENT_ID]\n**Equipment Name:** [EQUIPMENT_NAME]\n**Model/Serial Number:** [MODEL_SERIAL]\n**Location:** [LOCATION]\n**Responsible Person:** [RESPONSIBLE_PERSON]\n\n## Calibration Schedule\n**Calibration Frequency:** [FREQUENCY]\n**Last Calibration Date:** [LAST_CAL_DATE]\n**Next Calibration Due:** [NEXT_CAL_DATE]\n**Calibration Standard:** [CAL_STANDARD]\n\n## Calibration Record\n\n| Date | Calibrator | Standard Used | Before Adjustment | After Adjustment | Uncertainty | Status | Next Due |\n|------|------------|---------------|-------------------|------------------|-------------|--------|----------|\n| [DATE_1] | [CALIBRATOR_1] | [STANDARD_1] | [BEFORE_1] | [AFTER_1] | [UNCERTAINTY_1] | [STATUS_1] | [DUE_1] |\n| [DATE_2] | [CALIBRATOR_2] | [STANDARD_2] | [BEFORE_2] | [AFTER_2] | [UNCERTAINTY_2] | [STATUS_2] | [DUE_2] |\n| [DATE_3] | [CALIBRATOR_3] | [STANDARD_3] | [BEFORE_3] | [AFTER_3] | [UNCERTAINTY_3] | [STATUS_3] | [DUE_3] |\n\n## Calibration Status\n☐ In Calibration\n☐ Out of Calibration\n☐ Limited Use\n☐ Out of Service\n\n## Environmental Conditions\n**Temperature:** [TEMPERATURE]°C\n**Humidity:** [HUMIDITY]%\n**Other Conditions:** [OTHER_CONDITIONS]\n\n## Calibration Certificate\n**Certificate Number:** [CERT_NUMBER]\n**Issuing Authority:** [AUTHORITY]\n**Traceability:** [TRACEABILITY]\n\n## Maintenance History\n**Last Maintenance:** [MAINT_DATE]\n**Maintenance Type:** [MAINT_TYPE]\n**Performed By:** [MAINT_PERSON]\n**Next Maintenance Due:** [NEXT_MAINT]\n\n## Notes\n[ADDITIONAL_NOTES]\n\n**Reviewed By:** [REVIEWER_NAME]\n**Date:** [REVIEW_DATE]`,
      lastModified: "2024-01-09",
      status: "approved",
      version: "1.0",
      owner: "Calibration Technician",
      approver: "Quality Manager",
      dateApproved: "2024-01-03",
      nextReviewDate: "2025-01-03",
      changeHistory: [
        {
          version: "1.0",
          date: "2024-01-09",
          editor: "Calibration Technician",
          changes: "Initial template creation for manufacturing equipment",
        },
      ],
      industry: "manufacturing",
      tooltip:
        "ISO 7.1.5 requires monitoring and measuring resources to be suitable for the specific type of activities and maintained to ensure continuing fitness for their purpose.",
    },
  ]);

  // Sample documents
  const [documents] = useState<Document[]>([
    {
      id: "doc1",
      name: "Quality Manual v3.0",
      type: "Manual",
      status: "approved",
      version: "3.0",
      lastModified: "2024-01-20",
      owner: "Quality Manager",
      size: "2.4 MB",
    },
    {
      id: "doc2",
      name: "Customer Satisfaction Procedure",
      type: "Procedure",
      status: "review",
      version: "1.5",
      lastModified: "2024-01-18",
      owner: "Customer Service Lead",
      size: "856 KB",
    },
    {
      id: "doc3",
      name: "Internal Audit Checklist",
      type: "Checklist",
      status: "draft",
      version: "2.1",
      lastModified: "2024-01-15",
      owner: "Internal Auditor",
      size: "324 KB",
    },
  ]);

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      const updatedTemplates = templates.map((t) =>
        t.id === selectedTemplate.id
          ? {
              ...selectedTemplate,
              lastModified: new Date().toISOString().split("T")[0],
            }
          : t,
      );
      setTemplates(updatedTemplates);
      setIsEditingTemplate(false);
    }
  };

  const handleCopyTemplate = (template: Template) => {
    navigator.clipboard.writeText(template.content);
  };

  const handleDownloadTemplate = (template: Template) => {
    const blob = new Blob([template.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, "_")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterType === "all" ||
        template.type.toLowerCase() === filterType.toLowerCase();
      const matchesClause =
        filterClause === "all" || template.clause === filterClause;
      return matchesSearch && matchesFilter && matchesClause;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "type":
          aValue = a.type.toLowerCase();
          bValue = b.type.toLowerCase();
          break;
        case "clause":
          aValue = a.clause;
          bValue = b.clause;
          break;
        case "lastModified":
          aValue = new Date(a.lastModified);
          bValue = new Date(b.lastModified);
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "obsolete":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleGenerateTemplate = (clause: string) => {
    const clauseTemplates = {
      "6.1": "Risk Assessment Template",
      "8.2.1": "Customer Communication SOP",
      "7.5": "Document Control Procedure",
      "10.2": "CAPA Form",
      "8.7": "Nonconformance Report",
      "7.2": "Training Record Form",
      "9.2": "Internal Audit Checklist",
      "8.4": "Supplier Evaluation Form",
      "7.1.5": "Calibration Log",
    };

    const templateName =
      clauseTemplates[clause as keyof typeof clauseTemplates] ||
      "Generic Template";
    alert(`Generating ${templateName} for ISO 9001 Clause ${clause}...`);
  };

  const handleExportToPDF = (template: Template) => {
    // Simulate PDF export with metadata
    const exportData = {
      ...template,
      exportDate: new Date().toISOString(),
      exportedBy: "Current User",
    };
    console.log("Exporting to PDF:", exportData);
    alert(
      `Exporting ${template.name} to PDF with version ${template.version} and approval metadata...`,
    );
  };

  const handleExportToWord = (template: Template) => {
    // Simulate Word export with metadata
    const exportData = {
      ...template,
      exportDate: new Date().toISOString(),
      exportedBy: "Current User",
    };
    console.log("Exporting to Word:", exportData);
    alert(
      `Exporting ${template.name} to Word with version ${template.version} and approval metadata...`,
    );
  };

  const processSmartFields = (content: string) => {
    return content
      .replace(/\[COMPANY_NAME\]/g, "Your Company Name")
      .replace(/\[PROCESS_NAME\]/g, "Process Name")
      .replace(/\[APPROVAL_DATE\]/g, new Date().toLocaleDateString())
      .replace(/\[VERSION_NUMBER\]/g, "1.0")
      .replace(/\[APPROVER_NAME\]/g, "Approver Name");
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Document Control
            </h1>
            <p className="text-gray-600 mt-2">
              Central hub for ISO 9001 document management, templates, and
              version control
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="templates">Pre-made Templates</TabsTrigger>
            <TabsTrigger value="documents">Document Library</TabsTrigger>
            <TabsTrigger value="control">Version Control</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Documents
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs text-muted-foreground">
                    +12 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Templates
                  </CardTitle>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {templates.filter((t) => t.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Ready for use</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Review
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    Require attention
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Compliance Rate
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">
                    ISO 9001 compliant
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest document control activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Quality Manual v3.0 approved
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago by Quality Manager
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Customer Communication template updated
                      </p>
                      <p className="text-xs text-muted-foreground">
                        5 hours ago by Process Owner
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Internal Audit Checklist pending review
                      </p>
                      <p className="text-xs text-muted-foreground">
                        1 day ago by Internal Auditor
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pre-made Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            {/* Enhanced Search and Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search templates, owners, clauses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="policy">Policy</SelectItem>
                  <SelectItem value="sop">SOP</SelectItem>
                  <SelectItem value="work instruction">
                    Work Instruction
                  </SelectItem>
                  <SelectItem value="form">Form</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterClause} onValueChange={setFilterClause}>
                <SelectTrigger>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by clause" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clauses</SelectItem>
                  <SelectItem value="5.2">5.2 - Policy</SelectItem>
                  <SelectItem value="6.1">6.1 - Risk Management</SelectItem>
                  <SelectItem value="7.2">7.2 - Competence</SelectItem>
                  <SelectItem value="7.5">
                    7.5 - Documented Information
                  </SelectItem>
                  <SelectItem value="8.2.1">
                    8.2.1 - Customer Communication
                  </SelectItem>
                  <SelectItem value="8.4">8.4 - External Providers</SelectItem>
                  <SelectItem value="8.7">
                    8.7 - Nonconforming Outputs
                  </SelectItem>
                  <SelectItem value="9.2">9.2 - Internal Audit</SelectItem>
                  <SelectItem value="10.2">10.2 - Corrective Action</SelectItem>
                  <SelectItem value="7.1.5">
                    7.1.5 - Monitoring Resources
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={`${sortBy}-${sortOrder}`}
                onValueChange={(value) => {
                  const [field, order] = value.split("-");
                  setSortBy(field);
                  setSortOrder(order as "asc" | "desc");
                }}
              >
                <SelectTrigger>
                  {sortOrder === "asc" ? (
                    <SortAsc className="mr-2 h-4 w-4" />
                  ) : (
                    <SortDesc className="mr-2 h-4 w-4" />
                  )}
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                  <SelectItem value="type-asc">Type A-Z</SelectItem>
                  <SelectItem value="type-desc">Type Z-A</SelectItem>
                  <SelectItem value="clause-asc">Clause (Low-High)</SelectItem>
                  <SelectItem value="clause-desc">Clause (High-Low)</SelectItem>
                  <SelectItem value="lastModified-desc">
                    Recently Modified
                  </SelectItem>
                  <SelectItem value="lastModified-asc">
                    Oldest Modified
                  </SelectItem>
                  <SelectItem value="status-asc">Status A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Template Generator */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  AI Template Generator
                </CardTitle>
                <CardDescription>
                  Generate templates automatically based on ISO 9001 clauses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "6.1",
                    "8.2.1",
                    "7.5",
                    "10.2",
                    "8.7",
                    "7.2",
                    "9.2",
                    "8.4",
                  ].map((clause) => (
                    <Button
                      key={clause}
                      variant="outline"
                      size="sm"
                      onClick={() => handleGenerateTemplate(clause)}
                      className="hover:bg-blue-100"
                    >
                      <Zap className="mr-1 h-3 w-3" />
                      Clause {clause}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg leading-tight">
                            {template.name}
                          </CardTitle>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="text-sm">{template.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <CardDescription className="space-y-1">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">
                              Clause {template.clause}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {template.type}
                            </Badge>
                            {template.industry &&
                              template.industry !== "general" && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-purple-50 text-purple-700"
                                >
                                  {template.industry}
                                </Badge>
                              )}
                          </div>
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${getStatusColor(template.status)} text-xs font-medium border`}
                      >
                        {template.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Enhanced Metadata */}
                      <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span className="truncate">{template.owner}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          <span className="truncate">{template.approver}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{template.lastModified}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          <span>v{template.version}</span>
                        </div>
                        {template.dateApproved && (
                          <div className="flex items-center gap-1 col-span-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>Approved: {template.dateApproved}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 col-span-2">
                          <Calendar className="h-3 w-3 text-orange-600" />
                          <span>Review: {template.nextReviewDate}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTemplate(template)}
                              className="flex-1"
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                {selectedTemplate?.name}
                                <Badge
                                  className={getStatusColor(
                                    selectedTemplate?.status || "",
                                  )}
                                >
                                  {selectedTemplate?.status.replace("_", " ")}
                                </Badge>
                              </DialogTitle>
                              <DialogDescription className="flex items-center gap-4">
                                <span>
                                  ISO 9001 Clause {selectedTemplate?.clause} -{" "}
                                  {selectedTemplate?.type}
                                </span>
                                <span>•</span>
                                <span>Version {selectedTemplate?.version}</span>
                                <span>•</span>
                                <span>Owner: {selectedTemplate?.owner}</span>
                              </DialogDescription>
                            </DialogHeader>

                            <Tabs defaultValue="content" className="flex-1">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="content">
                                  Content
                                </TabsTrigger>
                                <TabsTrigger value="metadata">
                                  Metadata
                                </TabsTrigger>
                                <TabsTrigger value="history">
                                  Change History
                                </TabsTrigger>
                                <TabsTrigger value="approval">
                                  Approval
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent
                                value="content"
                                className="space-y-4 mt-4"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        setShowAIHelper(!showAIHelper)
                                      }
                                    >
                                      <Bot className="mr-1 h-3 w-3" />
                                      AI Helper
                                    </Button>
                                    <Select
                                      value={selectedIndustry}
                                      onValueChange={setSelectedIndustry}
                                    >
                                      <SelectTrigger className="w-40">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="general">
                                          General
                                        </SelectItem>
                                        <SelectItem value="manufacturing">
                                          Manufacturing
                                        </SelectItem>
                                        <SelectItem value="service">
                                          Service
                                        </SelectItem>
                                        <SelectItem value="healthcare">
                                          Healthcare
                                        </SelectItem>
                                        <SelectItem value="software">
                                          Software
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        selectedTemplate &&
                                        handleExportToPDF(selectedTemplate)
                                      }
                                    >
                                      <FileDown className="mr-1 h-3 w-3" />
                                      PDF
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        selectedTemplate &&
                                        handleExportToWord(selectedTemplate)
                                      }
                                    >
                                      <FileDown className="mr-1 h-3 w-3" />
                                      Word
                                    </Button>
                                  </div>
                                </div>

                                {showAIHelper && (
                                  <Card className="bg-blue-50 border-blue-200">
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <Bot className="h-4 w-4" />
                                        AI Industry Examples ({selectedIndustry}
                                        )
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                      <div className="text-sm text-blue-800">
                                        {selectedIndustry ===
                                          "manufacturing" && (
                                          <p>
                                            • Consider production line
                                            processes, equipment calibration,
                                            and quality control points
                                            <br />
                                            • Include safety requirements and
                                            environmental controls
                                            <br />• Reference material
                                            specifications and testing
                                            procedures
                                          </p>
                                        )}
                                        {selectedIndustry === "service" && (
                                          <p>
                                            • Focus on customer interaction
                                            points and service delivery
                                            <br />
                                            • Include response time requirements
                                            and escalation procedures
                                            <br />• Consider digital service
                                            channels and accessibility
                                          </p>
                                        )}
                                        {selectedIndustry === "general" && (
                                          <p>
                                            • Ensure broad applicability across
                                            different business types
                                            <br />
                                            • Use generic terminology that can
                                            be customized
                                            <br />• Include common business
                                            process elements
                                          </p>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}

                                <ScrollArea className="h-96 w-full border rounded-lg">
                                  {isEditingTemplate ? (
                                    <Textarea
                                      value={selectedTemplate?.content || ""}
                                      onChange={(e) =>
                                        setSelectedTemplate((prev) =>
                                          prev
                                            ? {
                                                ...prev,
                                                content: e.target.value,
                                              }
                                            : null,
                                        )
                                      }
                                      className="min-h-[380px] font-mono text-sm border-0 resize-none"
                                      placeholder="Template content..."
                                    />
                                  ) : (
                                    <div className="p-4">
                                      <pre className="whitespace-pre-wrap text-sm font-mono">
                                        {selectedTemplate
                                          ? processSmartFields(
                                              selectedTemplate.content,
                                            )
                                          : ""}
                                      </pre>
                                    </div>
                                  )}
                                </ScrollArea>
                              </TabsContent>

                              <TabsContent
                                value="metadata"
                                className="space-y-4 mt-4"
                              >
                                <div className="grid grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm">
                                        Document Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          Document ID:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {selectedTemplate?.id}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          Type:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {selectedTemplate?.type}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          ISO Clause:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {selectedTemplate?.clause}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          Version:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {selectedTemplate?.version}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          Industry:
                                        </span>
                                        <span className="text-sm font-medium capitalize">
                                          {selectedTemplate?.industry}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm">
                                        Ownership & Approval
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          Owner:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {selectedTemplate?.owner}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          Approver:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {selectedTemplate?.approver}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          Date Approved:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {selectedTemplate?.dateApproved ||
                                            "Pending"}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          Next Review:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {selectedTemplate?.nextReviewDate}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          Last Modified:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {selectedTemplate?.lastModified}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </TabsContent>

                              <TabsContent
                                value="history"
                                className="space-y-4 mt-4"
                              >
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-sm flex items-center gap-2">
                                      <History className="h-4 w-4" />
                                      Change History
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Version</TableHead>
                                          <TableHead>Date</TableHead>
                                          <TableHead>Editor</TableHead>
                                          <TableHead>Changes</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedTemplate?.changeHistory.map(
                                          (entry, index) => (
                                            <TableRow key={index}>
                                              <TableCell className="font-medium">
                                                {entry.version}
                                              </TableCell>
                                              <TableCell>
                                                {entry.date}
                                              </TableCell>
                                              <TableCell>
                                                {entry.editor}
                                              </TableCell>
                                              <TableCell>
                                                {entry.changes}
                                              </TableCell>
                                            </TableRow>
                                          ),
                                        )}
                                      </TableBody>
                                    </Table>
                                  </CardContent>
                                </Card>
                              </TabsContent>

                              <TabsContent
                                value="approval"
                                className="space-y-4 mt-4"
                              >
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-sm flex items-center gap-2">
                                      <Shield className="h-4 w-4" />
                                      Document Approval Workflow
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">
                                          Reviewer
                                        </label>
                                        <Input
                                          value={approvalWorkflow.reviewer}
                                          onChange={(e) =>
                                            setApprovalWorkflow((prev) => ({
                                              ...prev,
                                              reviewer: e.target.value,
                                            }))
                                          }
                                          placeholder="Assign reviewer"
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">
                                          Due Date
                                        </label>
                                        <Input
                                          type="date"
                                          value={approvalWorkflow.dueDate}
                                          onChange={(e) =>
                                            setApprovalWorkflow((prev) => ({
                                              ...prev,
                                              dueDate: e.target.value,
                                            }))
                                          }
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Comments
                                      </label>
                                      <Textarea
                                        value={approvalWorkflow.comments || ""}
                                        onChange={(e) =>
                                          setApprovalWorkflow((prev) => ({
                                            ...prev,
                                            comments: e.target.value,
                                          }))
                                        }
                                        placeholder="Review comments..."
                                        className="mt-1"
                                        rows={3}
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() =>
                                          setApprovalWorkflow((prev) => ({
                                            ...prev,
                                            status: "rejected",
                                          }))
                                        }
                                      >
                                        Reject
                                      </Button>
                                      <Button
                                        className="flex-1"
                                        onClick={() =>
                                          setApprovalWorkflow((prev) => ({
                                            ...prev,
                                            status: "approved",
                                            signedDate: new Date()
                                              .toISOString()
                                              .split("T")[0],
                                          }))
                                        }
                                      >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve & Sign
                                      </Button>
                                    </div>
                                    {approvalWorkflow.status === "approved" && (
                                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <div className="flex items-center gap-2 text-green-800">
                                          <CheckCircle className="h-4 w-4" />
                                          <span className="font-medium">
                                            Document Approved
                                          </span>
                                        </div>
                                        <p className="text-sm text-green-700 mt-1">
                                          Digitally signed on{" "}
                                          {approvalWorkflow.signedDate}
                                        </p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </TabsContent>
                            </Tabs>
                            <DialogFooter className="flex gap-2">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  selectedTemplate &&
                                  handleCopyTemplate(selectedTemplate)
                                }
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  selectedTemplate &&
                                  handleDownloadTemplate(selectedTemplate)
                                }
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                              {isEditingTemplate ? (
                                <>
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsEditingTemplate(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button onClick={handleSaveTemplate}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  onClick={() => setIsEditingTemplate(true)}
                                >
                                  <Edit3 className="mr-2 h-4 w-4" />
                                  Edit Template
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyTemplate(template)}
                          className="flex-1"
                        >
                          <Copy className="mr-1 h-3 w-3" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadTemplate(template)}
                          className="flex-1"
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Document Library Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>
                  All organizational documents and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>v{doc.version}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>Modified {doc.lastModified}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <User className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">
                              {doc.owner}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Complaints Tab - Moved to separate component */}
          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Customer Complaints Moved
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customer complaint management has been moved to its own
                    dedicated section
                  </p>
                  <Button
                    onClick={() =>
                      (window.location.href = "/dashboard/customer-complaints")
                    }
                  >
                    Go to Customer Complaints
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Version Control Tab */}
          <TabsContent value="control" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Version Control</CardTitle>
                <CardDescription>
                  Track document versions and changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Version Control System
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Advanced version control features coming soon. Track
                    changes, manage revisions, and maintain document history.
                  </p>
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Configure Version Control
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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

export default DocumentControl;
