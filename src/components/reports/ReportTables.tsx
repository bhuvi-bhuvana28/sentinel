
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Report, reportColumns } from "@/components/ReportColumns";
import { useState, useEffect } from "react";
import { ReportDocumentView } from "./ReportDocumentView";

interface ReportTablesProps {
  data: Report[];
  onRowClick: (report: Report) => void;
}

export function ReportTables({ data, onRowClick }: ReportTablesProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    console.log("ReportTables data:", data);
    console.log("ReportTables data length:", data?.length || 0);
  }, [data]);

  const handleRowClick = (report: Report) => {
    setSelectedReport(report);
    onRowClick(report);
  };

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Available Reports</CardTitle>
              <CardDescription>View and download security reports</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {data && data.length > 0 ? (
            <DataTable 
              columns={reportColumns} 
              data={data}
              pageSize={5}
              onRowClick={handleRowClick}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No reports match your current filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedReport && (
        <ReportDocumentView 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}
    </>
  );
}
