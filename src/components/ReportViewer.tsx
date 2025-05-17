
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Download, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs } from "@/components/ui/tabs";

// Import our new components
import { DocumentToolbar } from "./report-viewer/DocumentToolbar";
import { DocumentView } from "./report-viewer/DocumentView";
import { DocumentFooter } from "./report-viewer/DocumentFooter";
import { DocumentHeader } from "./report-viewer/DocumentHeader";

interface ReportViewerProps {
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (id: number) => void;
}

export function ReportViewer({ report, open, onOpenChange, onDownload }: ReportViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"document" | "outline">("document");
  const [bookmarked, setBookmarked] = useState(false);

  const handlePrintReport = () => {
    toast({
      title: "Preparing to print",
      description: "Opening print dialog for the report",
    });
    // In a real application, this would trigger the browser print dialog
    window.print();
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark removed" : "Report bookmarked",
      description: bookmarked 
        ? "This report has been removed from your bookmarks" 
        : "This report has been added to your bookmarks for quick access",
    });
  };

  const handleShareReport = () => {
    // In a real application, this would open a share dialog
    navigator.clipboard.writeText(`Report: ${report?.title} (ID: ${report?.id})`);
    toast({
      title: "Share link copied",
      description: "A link to this report has been copied to your clipboard"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-screen overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{report?.title || "Report Viewer"}</span>
            {report && (
              <DocumentHeader 
                bookmarked={bookmarked}
                onBookmark={handleBookmark}
                onShare={handleShareReport}
              />
            )}
          </DialogTitle>
          <DialogDescription>
            {report ? `${report.type} report from ${report.author}` : "Viewing selected report details"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {report && (
            <Card className="overflow-hidden">
              <DocumentToolbar
                title={report.title}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onPrint={handlePrintReport}
                onDownload={() => onDownload(report.id)}
              />

              <Tabs value={viewMode}>
                <DocumentView 
                  content={report.content}
                  viewMode={viewMode}
                  currentPage={currentPage}
                  totalPages={report.pages}
                  status={report.status}
                  onSwitchToDocument={() => setViewMode("document")}
                />
              </Tabs>

              <DocumentFooter 
                created={report.created}
                currentPage={currentPage}
                totalPages={report.pages}
                onPageChange={setCurrentPage}
              />
            </Card>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => {
            if (report) {
              onDownload(report.id);
              onOpenChange(false);
            }
          }}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
