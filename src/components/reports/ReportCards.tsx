
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { extractSections } from "@/lib/utils";
import { Report } from "@/components/ReportColumns";

interface ReportCardsProps {
  reports: Report[];
  onSelectReport: (id: number) => void;
}

export function ReportCards({ reports, onSelectReport }: ReportCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reports.slice(0, 6).map(report => (
        <Card 
          key={report.id} 
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelectReport(report.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg line-clamp-1">{report.title}</CardTitle>
                <CardDescription>{report.type} • {format(report.date, 'MMM dd, yyyy')}</CardDescription>
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
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between text-muted-foreground mb-2">
                <span>Author: {report.author}</span>
                <span>{report.pages} pages</span>
              </div>
              <p className="line-clamp-2 text-muted-foreground">
                {extractSections(report.content).executiveSummary.substring(0, 100)}...
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
