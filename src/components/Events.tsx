import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Download, Eye, FileText, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventsTable } from "./dashboard/EventsTable";
import { sampleEvents } from "../data/sampleEvents";

export function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState("all");
  const [severity, setSeverity] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);
  const [showExportLog, setShowExportLog] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const [showEventLog, setShowEventLog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [downloadConfirmationHtml, setDownloadConfirmationHtml] = useState<string>("");
  const [showCreateAlertDialog, setShowCreateAlertDialog] = useState(false);

  // Filter events based on search query, type, and severity
  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.source.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.details?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = eventType === "all" || event.type === eventType;
    const matchesSeverity = severity === "all" || event.severity === severity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  const handleViewEventLog = (eventId: number) => {
    setSelectedEvent(eventId);
    setShowEventLog(true);
  };
  
  const handleExportLog = () => {
    setShowExportLog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Security Events</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleExportLog()}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Log
          </Button>
          <Button onClick={() => setShowCreateAlertDialog(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Create Alert Rule
          </Button>
        </div>
      </div>
      
      {/* Search and filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Event Search</CardTitle>
          <CardDescription>Search and filter security events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                type="search" 
                placeholder="Search events..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Login Failure">Login Failure</SelectItem>
                <SelectItem value="Malware Detected">Malware Detected</SelectItem>
                <SelectItem value="Firewall Alert">Firewall Alert</SelectItem>
                <SelectItem value="System Update">System Update</SelectItem>
                <SelectItem value="Data Access">Data Access</SelectItem>
                <SelectItem value="Configuration Change">Config Change</SelectItem>
                <SelectItem value="DDoS Attempt">DDoS Attempt</SelectItem>
                <SelectItem value="Policy Violation">Policy Violation</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {timeRange === "custom" && date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "MMM d")} - {format(date.to, "MMM d")}
                      </>
                    ) : (
                      format(date.from, "MMM d")
                    )
                  ) : (
                    timeRange
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3 space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Quick Select</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={timeRange === "24h" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setTimeRange("24h")}
                      >
                        Last 24h
                      </Button>
                      <Button 
                        variant={timeRange === "7d" ? "default" : "outline"}
                        size="sm" 
                        onClick={() => setTimeRange("7d")}
                      >
                        Last 7 days
                      </Button>
                      <Button 
                        variant={timeRange === "30d" ? "default" : "outline"}
                        size="sm" 
                        onClick={() => setTimeRange("30d")}
                      >
                        Last 30 days
                      </Button>
                      <Button 
                        variant={timeRange === "custom" ? "default" : "outline"}
                        size="sm" 
                        onClick={() => {
                          setTimeRange("custom");
                          setShowCustomDateRange(true);
                        }}
                      >
                        Custom Range
                      </Button>
                    </div>
                  </div>
                  
                  {showCustomDateRange && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Custom Range</h4>
                      <div className="border rounded-md p-3 bg-white">
                        <CalendarUI
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
      
      {/* Event Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-1/2">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="high">High</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Events Table */}
      <EventsTable filteredEvents={filteredEvents} />
      
      {/* Export Log Dialog */}
      <AlertDialog open={showExportLog} onOpenChange={setShowExportLog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Export Event Log</AlertDialogTitle>
            <AlertDialogDescription>
              Choose your preferred format to export the event log.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant={exportFormat === "csv" ? "default" : "outline"}
              onClick={() => setExportFormat("csv")}
              className="flex flex-col items-center justify-center h-20"
            >
              <FileText className="h-8 w-8 mb-1" />
              <span>CSV Format</span>
            </Button>
            <Button
              variant={exportFormat === "pdf" ? "default" : "outline"}
              onClick={() => setExportFormat("pdf")}
              className="flex flex-col items-center justify-center h-20"
            >
              <FileText className="h-8 w-8 mb-1" />
              <span>PDF Format</span>
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              const fileName = `security_events_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
              setShowExportLog(false);
              
              // Create the download confirmation HTML
              const downloadConfirmation = `
                <div class="bg-green-50 border border-green-200 rounded-md p-4 my-4">
                  <h3 class="text-sm font-medium text-green-800">File Downloaded Successfully</h3>
                  <p class="mt-1 text-sm text-green-700">
                    The file has been saved to your downloads folder as:
                    <span class="font-mono text-xs block mt-1">${fileName}</span>
                  </p>
                </div>
              `;
              
              // Update state with the HTML content
              setDownloadConfirmationHtml(downloadConfirmation);
            }}>
              <Download className="mr-2 h-4 w-4" />
              Download {exportFormat.toUpperCase()}
            </AlertDialogAction>
          </AlertDialogFooter>
          <div dangerouslySetInnerHTML={{ __html: downloadConfirmationHtml }}></div>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Event Details Dialog */}
      <AlertDialog open={showEventLog} onOpenChange={setShowEventLog}>
        <AlertDialogContent>
          {selectedEvent !== null && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>{sampleEvents[selectedEvent - 1]?.type}</AlertDialogTitle>
                <AlertDialogDescription>
                  Event details and related information
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="font-medium">Source:</div>
                  <div>{sampleEvents[selectedEvent - 1]?.source}</div>
                  <div className="font-medium">Time:</div>
                  <div>{sampleEvents[selectedEvent - 1]?.timestamp}</div>
                  <div className="font-medium">Severity:</div>
                  <div>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                      ${sampleEvents[selectedEvent - 1]?.severity === "Critical" ? "bg-red-100 text-red-800" : ""}
                      ${sampleEvents[selectedEvent - 1]?.severity === "High" ? "bg-orange-100 text-orange-800" : ""}
                      ${sampleEvents[selectedEvent - 1]?.severity === "Medium" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${sampleEvents[selectedEvent - 1]?.severity === "Low" ? "bg-green-100 text-green-800" : ""}
                      `}
                    >
                      {sampleEvents[selectedEvent - 1]?.severity}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-medium mb-1">Description:</p>
                  <p className="text-sm bg-slate-50 p-3 rounded border">
                    {sampleEvents[selectedEvent - 1]?.details}
                  </p>
                </div>
                <div className="mt-4 border-t pt-4">
                  <p className="font-medium mb-1">Actions:</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Mark as Reviewed</Button>
                    <Button size="sm" variant="outline">Add to Investigation</Button>
                    <Button size="sm" variant="destructive">Create Alert</Button>
                  </div>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  setShowEventLog(false);
                }}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export Details
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Create Alert Rule Dialog - Fix: Wrap DialogTrigger inside Dialog */}
      <Dialog open={showCreateAlertDialog} onOpenChange={setShowCreateAlertDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Alert Rule</DialogTitle>
            <DialogDescription>
              Configure conditions to trigger automatic alerts
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Rule Name</label>
              <Input placeholder="Enter rule name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Event Type</label>
              <Select defaultValue="any">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Event Type</SelectItem>
                  <SelectItem value="login">Login Events</SelectItem>
                  <SelectItem value="malware">Malware Detection</SelectItem>
                  <SelectItem value="firewall">Firewall Events</SelectItem>
                  <SelectItem value="data">Data Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Severity</label>
              <Select defaultValue="critical">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select minimum severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Severity</SelectItem>
                  <SelectItem value="critical">Critical Only</SelectItem>
                  <SelectItem value="high">High and Above</SelectItem>
                  <SelectItem value="medium">Medium and Above</SelectItem>
                  <SelectItem value="low">All Severities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Source</label>
              <Input placeholder="Any source (leave blank)" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Notification</label>
              <div className="col-span-3 flex gap-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="email" className="w-4 h-4" defaultChecked />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="slack" className="w-4 h-4" />
                  <label htmlFor="slack">Slack</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sms" className="w-4 h-4" />
                  <label htmlFor="sms">SMS</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateAlertDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowCreateAlertDialog(false)}>Create Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
