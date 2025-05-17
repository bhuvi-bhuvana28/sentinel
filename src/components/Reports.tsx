
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { startOfDay, endOfDay, subDays, isWithinInterval } from "date-fns";
import { formatReportFileName } from "@/lib/utils";
import { sampleReports } from "../data/sampleReports";
import { Report } from "@/components/ReportColumns";
import { ReportViewer } from "@/components/ReportViewer";
import { ReportDownload } from "@/components/ReportDownload";
import { ReportDetail } from "@/components/ReportDetail";

// Import our new components
import { ReportsHeader } from "./reports/ReportsHeader";
import { ReportAlert } from "./reports/ReportAlert";
import { ReportFilters } from "./reports/ReportFilters";
import { ReportCards } from "./reports/ReportCards";
import { TabContent } from "./reports/TabContent";
import { ReportGenerator } from "./reports/ReportGenerator";
import { ReportSchedule } from "./reports/ReportSchedule";

export function Reports() {
  const [reportType, setReportType] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [showReportSchedule, setShowReportSchedule] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [downloadFileName, setDownloadFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [selectedDetailReport, setSelectedDetailReport] = useState<number | null>(null);

  // Filter reports based on user selections
  const filteredReports = sampleReports.filter(report => {
    const matchesType = reportType === "all" || report.type.toLowerCase() === reportType.toLowerCase();
    const matchesSearch = !searchQuery || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "compliance" && report.type === "Compliance") ||
      (activeTab === "incidents" && report.type === "Incidents") ||
      (activeTab === "assessments" && report.type === "Assessment");
    
    const matchesDateRange = date?.from && date?.to
      ? isWithinInterval(report.date, {
          start: startOfDay(date.from),
          end: endOfDay(date.to)
        })
      : true;
    
    return matchesType && matchesSearch && matchesTab && matchesDateRange;
  });

  // Debug logs to check data
  useEffect(() => {
    console.log("All Reports:", sampleReports);
    console.log("Filtered Reports:", filteredReports);
  }, [filteredReports]);

  const handleExportReport = (id: number) => {
    const report = sampleReports.find(r => r.id === id);
    if (report) {
      setDownloadFileName(formatReportFileName(report.title));
      setFileType("pdf");
      setShowDownloadDialog(true);
    }
  };

  const handleViewReport = (id: number) => {
    const report = sampleReports.find(r => r.id === id);
    if (report) {
      setSelectedReport(id);
      setShowReportViewer(true);
    }
  };

  const handleGenerateComplete = (fileName: string, fileType: string) => {
    setDownloadFileName(fileName);
    setFileType(fileType);
    setShowDownloadDialog(true);
  };

  const reportData = filteredReports as Report[];
  const selectedReportData = sampleReports.find(r => r.id === selectedReport) || null;
  const selectedDetailReportData = sampleReports.find(r => r.id === selectedDetailReport) || null;

  return (
    <div className="space-y-6">
      {/* Header section */}
      <ReportsHeader 
        onOpenSchedule={() => setShowReportSchedule(true)}
        onOpenGenerator={() => setShowReportGenerator(true)} 
      />
      
      {/* Alert */}
      <ReportAlert />
      
      {/* Search and filter bar */}
      <ReportFilters
        reportType={reportType}
        setReportType={setReportType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        date={date}
        setDate={setDate}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {selectedDetailReport && (
            <div className="mb-6">
              <ReportDetail 
                report={selectedDetailReportData}
                onViewFullReport={handleViewReport}
                onDownload={handleExportReport}
              />
            </div>
          )}
          
          <ReportCards 
            reports={reportData.slice(0, 6)} 
            onSelectReport={setSelectedDetailReport} 
          />
          
          <TabContent
            activeTab={activeTab}
            reportData={reportData}
            filteredReports={filteredReports}
            selectedDetailReport={selectedDetailReport}
            selectedDetailReportData={selectedDetailReportData}
            onRowClick={(report) => setSelectedDetailReport(report.id)}
            onViewFullReport={handleViewReport}
            onDownload={handleExportReport}
            ReportDetail={ReportDetail}
          />
        </TabsContent>
        
        <TabsContent value="compliance" className="mt-4">
          <TabContent
            activeTab="compliance"
            reportData={reportData}
            filteredReports={filteredReports}
            selectedDetailReport={selectedDetailReport}
            selectedDetailReportData={selectedDetailReportData}
            onRowClick={(report) => setSelectedDetailReport(report.id)}
            onViewFullReport={handleViewReport}
            onDownload={handleExportReport}
            ReportDetail={ReportDetail}
          />
        </TabsContent>
        
        <TabsContent value="incidents" className="mt-4">
          <TabContent
            activeTab="incidents"
            reportData={reportData}
            filteredReports={filteredReports}
            selectedDetailReport={selectedDetailReport}
            selectedDetailReportData={selectedDetailReportData}
            onRowClick={(report) => setSelectedDetailReport(report.id)}
            onViewFullReport={handleViewReport}
            onDownload={handleExportReport}
            ReportDetail={ReportDetail}
          />
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-4">
          <TabContent
            activeTab="assessments"
            reportData={reportData}
            filteredReports={filteredReports}
            selectedDetailReport={selectedDetailReport}
            selectedDetailReportData={selectedDetailReportData}
            onRowClick={(report) => setSelectedDetailReport(report.id)}
            onViewFullReport={handleViewReport}
            onDownload={handleExportReport}
            ReportDetail={ReportDetail}
          />
        </TabsContent>
      </Tabs>
      
      {/* Report Viewer Dialog */}
      <ReportViewer 
        report={selectedReportData}
        open={showReportViewer}
        onOpenChange={setShowReportViewer}
        onDownload={handleExportReport}
      />
      
      {/* Report Download Dialog */}
      <ReportDownload 
        open={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
        fileName={downloadFileName}
        fileType={fileType}
      />
      
      {/* Report Generator Dialog */}
      <ReportGenerator 
        open={showReportGenerator}
        onOpenChange={setShowReportGenerator}
        onGenerateComplete={handleGenerateComplete}
      />
      
      {/* Report Schedule Dialog */}
      <ReportSchedule
        open={showReportSchedule}
        onOpenChange={setShowReportSchedule}
      />
    </div>
  );
}
