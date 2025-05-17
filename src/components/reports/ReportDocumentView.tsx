
import React from "react";
import { DocumentContent } from "@/components/report-viewer/DocumentContent";
import { DocumentStatusBadge } from "@/components/report-viewer/DocumentStatusBadge";
import { Report } from "@/components/ReportColumns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ReportDocumentViewProps {
  report: Report | null;
  onClose: () => void;
}

export function ReportDocumentView({ report, onClose }: ReportDocumentViewProps) {
  if (!report) return null;

  return (
    <Card className="mt-4 border-t-4 border-t-primary">
      <div className="flex items-center justify-between p-4 bg-muted/20">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{report.title}</h3>
          <DocumentStatusBadge status={report.status} />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-6 max-h-[500px] overflow-y-auto">
        <DocumentContent content={report.content} />
      </CardContent>
    </Card>
  );
}
