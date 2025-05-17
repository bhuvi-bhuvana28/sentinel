
import { Button } from "@/components/ui/button";
import WebsiteLink from "@/components/WebsiteLink";
import { Shield } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="flex flex-col items-center justify-center text-center mb-16">
          <div className="bg-slate-700 p-4 rounded-full mb-6">
            <Shield className="h-16 w-16 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">SentinelWatch SIEM</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Advanced security information and event management system for modern enterprises
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-cyan-400">Real-time Monitoring</h3>
            <p>Track security events across your entire infrastructure in real-time with powerful visualization tools.</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-cyan-400">Threat Intelligence</h3>
            <p>Leverage advanced analytics to detect and respond to emerging security threats before they cause damage.</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-cyan-400">Compliance Reporting</h3>
            <p>Generate comprehensive security reports to meet regulatory requirements and internal security policies.</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-6">Ready to secure your organization?</h2>
          <WebsiteLink text="Launch SentinelWatch Dashboard" url="/dashboard" internal={true} />
        </div>
      </div>
      
      <footer className="bg-slate-900 py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>SentinelWatch SIEM &copy; {new Date().getFullYear()} | Enterprise Security Solutions</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
