import { Suspense, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import ComplianceOverview from "./components/Dashboard/ComplianceOverview";
import ModuleCards from "./components/Dashboard/ModuleCards";
import RecentActivity from "./components/Dashboard/RecentActivity";
import NonConformityManagement from "./components/Dashboard/pages/NonConformityManagement";
import ISO9001Clauses from "./components/Dashboard/pages/LearningCenter";
import DocumentControl from "./components/Dashboard/pages/DocumentControl";
import TrainingManagement from "./components/Dashboard/pages/TrainingManagement";
import CustomerComplaintManagement from "./components/Dashboard/pages/CustomerComplaintManagement";
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

// Use the imported ISO9001Clauses component
const ISOLearningAndClauses = () => {
  console.log("ISOLearningAndClauses component rendered");
  return <ISO9001Clauses />;
};

// Training component that handles courses and webinars tabs
const Training = () => {
  console.log("Training component rendered");
  return <ISO9001Clauses />;
};

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="document-control" element={<DocumentControl />} />
            <Route path="iso-learning" element={<ISOLearningAndClauses />} />
            <Route path="documents" element={<DocumentGenerator />} />
            <Route path="audit" element={<AuditReadiness />} />
            <Route path="processes" element={<ProcessMapping />} />
            <Route path="suppliers" element={<SupplierManagement />} />
            <Route
              path="customer-complaints" //this is working
              element={<CustomerComplaintManagement />}
            />
            <Route
              path="non-conformity"
              element={<NonConformityManagement />}
            />
            <Route
              path="training-management"
              element={<TrainingManagement />}
            />
            <Route path="training" element={<Training />} />
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
