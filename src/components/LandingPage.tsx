import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Sparkles, Clock } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">IndustryQ</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </a>
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary"
            >
              Login
            </Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              ISO 9001 Certification,
              <span className="text-primary"> Simplified with AI</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              IndustryQ helps small and medium enterprises achieve ISO 9001
              certification faster and more efficiently with our AI-powered
              platform and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Book a Demo
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
              alt="ISO 9001 Certification Platform"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              AI-Powered ISO 9001 Compliance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines artificial intelligence with industry
              expertise to streamline your certification process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Smart Document Generator
              </h3>
              <p className="text-muted-foreground">
                Create ISO 9001 compliant documentation tailored to your
                industry with AI assistance.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Audit Readiness Dashboard
              </h3>
              <p className="text-muted-foreground">
                Track compliance gaps and prepare for audits with simulated
                audit scenarios.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">70% Time Savings</h3>
              <p className="text-muted-foreground">
                Reduce certification time by up to 70% compared to traditional
                consulting methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Hybrid Approach</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI handles 70-80% of the work, while expert consultants take care
              of the rest.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-foreground font-medium">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Assessment</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your business processes and generates a
                  customized compliance roadmap.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-foreground font-medium">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Document Generation
                </h3>
                <p className="text-muted-foreground">
                  The platform automatically creates required documentation
                  tailored to your specific industry needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-foreground font-medium">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Review</h3>
                <p className="text-muted-foreground">
                  Our consultants review the AI-generated materials and provide
                  guidance for the remaining requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-foreground font-medium">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Certification Success
                </h3>
                <p className="text-muted-foreground">
                  Complete your certification with confidence, supported by our
                  platform and expert team.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/dashboard">
              <Button size="lg">
                Start Your ISO 9001 Journey{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how other businesses achieved ISO 9001 certification with
              IndustryQ.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
                    alt="Customer"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">John Mathews</h4>
                  <p className="text-sm text-muted-foreground">
                    Manufacturing SME
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "IndustryQ reduced our certification preparation time from 9
                months to just 3. The AI-generated documentation was spot on for
                our industry."
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
                    alt="Customer"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">
                    Healthcare Provider
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The hybrid approach was perfect for us. AI handled the
                documentation while the consultants guided us through the more
                complex requirements."
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
                    alt="Customer"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-muted-foreground">Tech Startup</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "As a startup, we thought ISO certification would be out of
                reach. IndustryQ made it affordable and manageable with their AI
                platform."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Simplify Your ISO 9001 Journey?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join hundreds of businesses that have successfully achieved
            certification with IndustryQ.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">IndustryQ</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Webinars
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} IndustryQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
