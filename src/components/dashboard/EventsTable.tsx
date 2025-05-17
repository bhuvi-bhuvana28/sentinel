
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Download, Eye, FileText } from "lucide-react";

interface Event {
  id: number;
  type: string;
  source: string;
  timestamp: string;
  severity: string;
  details?: string;
}

interface EventsTableProps {
  filteredEvents: Event[];
}

export function EventsTable({ filteredEvents }: EventsTableProps) {
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportedData, setExportedData] = useState<string | null>(null);
  const [showExportPreview, setShowExportPreview] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadedFileName, setDownloadedFileName] = useState("");

  const handleExport = () => {
    // Create CSV content from filtered events
    const csvHeader = "Type,Source,Time,Severity,Details\n";
    const csvRows = filteredEvents.map(event => 
      `${event.type},${event.source},${event.timestamp},${event.severity},${event.details || "No additional details"}`
    ).join('\n');
    const csvContent = csvHeader + csvRows;
    
    // Set the exported data for preview
    setExportedData(csvContent);
    setShowExportDialog(true);
    setDownloadComplete(false);
  };

  const handleDownloadExport = () => {
    if (!exportedData) return;
    
    // Create a blob and download link
    const blob = new Blob([exportedData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `security_events_${new Date().toISOString().split('T')[0]}.csv`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDownloadedFileName(fileName);
    setDownloadComplete(true);
    
    toast({
      title: "Export Downloaded",
      description: "The events export has been downloaded to your device."
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>Latest events detected across your systems</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExport}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Events
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <TableRow key={event.id} className="cursor-pointer hover:bg-slate-50" onClick={() => 
                  toast({
                    title: `${event.type} Details`,
                    description: `Source: ${event.source}, Time: ${event.timestamp}, Severity: ${event.severity}${event.details ? `, Details: ${event.details}` : ''}`
                  })
                }>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{event.source}</TableCell>
                  <TableCell>{event.timestamp}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                      ${event.severity === "Critical" ? "bg-red-100 text-red-800" : ""}
                      ${event.severity === "High" ? "bg-orange-100 text-orange-800" : ""}
                      ${event.severity === "Medium" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${event.severity === "Low" ? "bg-green-100 text-green-800" : ""}
                      `}
                    >
                      {event.severity}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">No events match the selected filters</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Export Preview Dialog */}
      <AlertDialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Export Events</AlertDialogTitle>
            <AlertDialogDescription>
              {filteredEvents.length} events will be exported as a CSV file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 border rounded-md p-3 max-h-60 overflow-auto bg-slate-50">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-2"
              onClick={() => setShowExportPreview(!showExportPreview)}
            >
              <Eye className="mr-2 h-4 w-4" />
              {showExportPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            {showExportPreview && exportedData && (
              <pre className="text-xs whitespace-pre-wrap font-mono text-slate-700">
                {exportedData}
              </pre>
            )}
            {!showExportPreview && (
              <div className="flex flex-col items-center justify-center py-6 text-slate-500">
                <FileText className="h-8 w-8 mb-2" />
                <p>Click "Show Preview" to view the export data</p>
              </div>
            )}
          </div>
          {downloadComplete && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 my-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <FileText className="h-5 w-5 text-green-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">File Downloaded Successfully</h3>
                  <div className="mt-1 text-sm text-green-700">
                    <p>The file has been saved to your downloads folder as:</p>
                    <p className="font-mono text-xs mt-1">{downloadedFileName}</p>
                  </div>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-700 border-green-300 hover:bg-green-50"
                      onClick={() => setShowExportDialog(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!downloadComplete && (
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDownloadExport}>
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
