
import { ReportTables } from "./ReportTables";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { reportColumns, Report } from "@/components/ReportColumns";
import { sampleReports } from "@/data/sampleReports";

interface TabContentProps {
  activeTab: string;
  reportData: Report[];
  filteredReports: Report[];
  selectedDetailReport: number | null;
  selectedDetailReportData: Report | null;
  onRowClick: (report: Report) => void;
  onViewFullReport: (id: number) => void;
  onDownload: (id: number) => void;
  ReportDetail: React.ComponentType<{
    report: Report | null;
    onViewFullReport: (id: number) => void;
    onDownload: (id: number) => void;
  }>;
}

export function TabContent({
  activeTab, 
  reportData, 
  filteredReports, 
  selectedDetailReport,
  selectedDetailReportData,
  onRowClick,
  onViewFullReport,
  onDownload,
  ReportDetail
}: TabContentProps) {
  // Log data to debug
  console.log("TabContent reportData:", reportData);
  console.log("TabContent filteredReports:", filteredReports);
  
  // For the "all" tab, use sampleReports directly to show all available reports
  // regardless of filters
  if (activeTab === "all") {
    console.log("Using all reports from sampleReports:", sampleReports);
    
    return (
      <div className="mt-4">
        {selectedDetailReport && (
          <div className="mb-6">
            <ReportDetail 
              report={selectedDetailReportData}
              onViewFullReport={onViewFullReport}
              onDownload={onDownload}
            />
          </div>
        )}
        
        <ReportTables
          data={sampleReports} // Use all reports directly from data source
          onRowClick={onRowClick}
        />
      </div>
    );
  }
  
  // For other tabs (compliance, incidents, assessments)
  const tabTitle = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  const tabDescription = {
    compliance: "Regulatory and compliance documentation",
    incidents: "Security incident documentation",
    assessments: "Security assessment documentation"
  }[activeTab] || "";
  
  const filteredByType = sampleReports.filter(r => 
    r.type.toLowerCase() === activeTab || 
    (activeTab === "assessments" && r.type === "Assessment")
  );
  
  console.log(`TabContent ${activeTab} filteredByType:`, filteredByType);
  
  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle>{tabTitle} Reports</CardTitle>
          <CardDescription>{tabDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={reportColumns}
            data={filteredByType}
            onRowClick={onRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
}
