
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, Download, Eye, Printer } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ReportDetailProps {
  report: {
    id: number;
    title: string;
    type: string;
    author: string;
    created: string;
    status: string;
    pages: number;
    date: Date;
    content: string;
  } | null;
  onViewFullReport: (id: number) => void;
  onDownload: (id: number) => void;
}

export function ReportDetail({ report, onViewFullReport, onDownload }: ReportDetailProps) {
  if (!report) return null;
  
  const handlePrintReport = () => {
    toast({
      title: "Preparing to print",
      description: "Opening print dialog for the report",
    });
    window.print();
  };

  // Format the report content for preview
  const formatPreviewContent = (content: string) => {
    // Get the first section with the title and first paragraph
    const sections = content.split('\n\n');
    if (sections.length === 0) return {
      title: "",
      executiveSummary: "",
      keyFindings: ""
    };
    
    const title = sections[0].replace('# ', '');
    
    // Try to find the executive summary section
    const executiveSummarySection = sections.find(section => 
      section.toLowerCase().includes('executive summary')
    );
    
    const executiveSummary = executiveSummarySection 
      ? executiveSummarySection.replace('## Executive Summary', '').trim() 
      : "";
    
    // Get key findings if they exist
    const keyFindingsSection = sections.find(section =>
      section.toLowerCase().includes('key findings')
    );
    
    const keyFindings = keyFindingsSection 
      ? keyFindingsSection.replace('## Key Findings', '').trim()
      : "";
    
    return { title, executiveSummary, keyFindings };
  };
  
  const previewContent = formatPreviewContent(report.content);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="border-b bg-muted/20">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{report.title}</CardTitle>
            <CardDescription>
              <span className="flex items-center gap-1 mt-1">
                <FileText className="h-4 w-4" /> 
                {report.type} report • {report.pages} pages
              </span>
            </CardDescription>
          </div>
          <Badge variant="outline" className={
            report.status === "Final" 
              ? "bg-green-100 text-green-800 hover:bg-green-100" 
              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
          }>
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Created: {report.created}
            </div>
            <div>Author: {report.author}</div>
          </div>
          
          <div className="border-t border-b py-4 my-4">
            <h3 className="font-semibold mb-2">Executive Summary</h3>
            <p className="text-sm text-gray-700">
              {previewContent.executiveSummary || "No executive summary available"}
            </p>
            
            {previewContent.keyFindings && (
              <>
                <h3 className="font-semibold mt-4 mb-2">Key Findings</h3>
                <div className="text-sm text-gray-700">
                  {previewContent.keyFindings.split('- ').map((finding, index) => {
                    if (index === 0) return null;
                    return (
                      <div key={index} className="flex gap-2 mb-1">
                        <span>•</span>
                        <span>{finding.trim()}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              File: {report.title.toLowerCase().replace(/\s+/g, '_')}.pdf
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handlePrintReport}
              >
                <Printer className="h-4 w-4" /> Print
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-1"
                onClick={() => onDownload(report.id)}
              >
                <Download className="h-4 w-4" /> Download
              </Button>
              <Button
                variant="default"
                size="sm"
                className="gap-1"
                onClick={() => onViewFullReport(report.id)}
              >
                <Eye className="h-4 w-4" /> View Full Report
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
