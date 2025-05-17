
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText } from "lucide-react";
import { sampleReports } from "@/data/sampleReports";

export function ReportAlert() {
  // Find the most recent report
  const mostRecentReport = [...sampleReports].sort((a, b) => b.date.getTime() - a.date.getTime())[0];

  return (
    <Alert className="bg-blue-50 border-blue-200">
      <FileText className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-800">Report Dashboard</AlertTitle>
      <AlertDescription className="text-blue-700">
        {sampleReports.length} reports available. Most recent: {mostRecentReport.title}.
      </AlertDescription>
    </Alert>
  );
}
