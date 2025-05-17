
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { formatReportFileName } from "@/lib/utils";

interface ReportGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateComplete: (fileName: string, fileType: string) => void;
}

export function ReportGenerator({ open, onOpenChange, onGenerateComplete }: ReportGeneratorProps) {
  const [generatedReportType, setGeneratedReportType] = useState("security");
  const [generatedReportFormat, setGeneratedReportFormat] = useState("pdf");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      
      const reportTypes = {
        security: "Security Posture Assessment",
        compliance: "Compliance Audit Report",
        vulnerability: "Vulnerability Scan Report",
        incident: "Incident Response Summary"
      };
      
      const reportName = `${reportTypes[generatedReportType as keyof typeof reportTypes] || "Generated Report"} - ${format(new Date(), 'MMM dd yyyy')}`;
      const formattedFileName = formatReportFileName(reportName);
      
      toast({
        title: "Report Generated",
        description: `Your ${generatedReportType} report is ready to download`,
        duration: 5000,
      });
      
      onGenerateComplete(formattedFileName, generatedReportFormat);
      onOpenChange(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate New Report</DialogTitle>
          <DialogDescription>
            Create a new security report based on your selected settings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Report Type</h3>
            <Select value={generatedReportType} onValueChange={setGeneratedReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="security">Security Assessment</SelectItem>
                <SelectItem value="compliance">Compliance Report</SelectItem>
                <SelectItem value="vulnerability">Vulnerability Scan</SelectItem>
                <SelectItem value="incident">Incident Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Report Format</h3>
            <div className="flex gap-3">
              {["pdf", "docx", "xlsx"].map(format => (
                <Button
                  key={format}
                  variant={generatedReportFormat === format ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGeneratedReportFormat(format)}
                  className="flex-1"
                >
                  .{format.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Time Period</h3>
            <Select defaultValue="30d">
              <SelectTrigger>
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last quarter</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
            {isGeneratingReport ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Generating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
