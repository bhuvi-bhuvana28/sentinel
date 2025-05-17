import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Filter, Download, Search, BarChart2, Clock, AlertCircle, FileText, Shield, ChevronDown, ChevronUp, Play } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Alerts() {
  const [alertType, setAlertType] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("24h");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showAlertDetails, setShowAlertDetails] = useState<number | null>(null);
  const [showRuleEditor, setShowRuleEditor] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedRuleType, setSelectedRuleType] = useState<string>("detection");
  const [isRuleActive, setIsRuleActive] = useState(true);
  const [ruleName, setRuleName] = useState("");
  const [ruleDescription, setRuleDescription] = useState("");
  const [ruleConditions, setRuleConditions] = useState("");
  const [ruleActions, setRuleActions] = useState("");
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [alertName, setAlertName] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("Medium");
  const [alertSource, setAlertSource] = useState("");
  
  // Enhanced sample data for alerts with more detailed information
  const alerts = [
    { 
      id: 1, 
      type: "High CPU Usage", 
      source: "server-01", 
      timestamp: "2023-05-14 16:45:12", 
      severity: "High", 
      status: "Open",
      details: "CPU usage exceeded 90% for 5 minutes",
      extendedInfo: {
        cpuUsage: "92%",
        process: "nginx",
        threshold: "90%",
        duration: "5 minutes",
        recommendation: "Restart nginx service",
        notes: "Investigate potential DDoS attack"
      }
    },
    { 
      id: 2, 
      type: "Disk Space Low", 
      source: "database-server", 
      timestamp: "2023-05-14 16:30:00", 
      severity: "Medium", 
      status: "Acknowledged",
      details: "Disk space below 10% on /var partition",
      extendedInfo: {
        diskUsage: "91%",
        partition: "/var",
        threshold: "10%",
        totalSpace: "500GB",
        freeSpace: "45GB",
        recommendation: "Clean up old log files",
        notes: "Scheduled cleanup job failed"
      }
    },
    { 
      id: 3, 
      type: "Failed Login Attempt", 
      source: "192.168.1.100", 
      timestamp: "2023-05-14 16:15:45", 
      severity: "Low", 
      status: "Closed",
      details: "Failed login attempt from unknown IP",
      extendedInfo: {
        ipAddress: "192.168.1.100",
        username: "admin",
        attempts: 3,
        location: "Unknown",
        recommendation: "Review firewall rules",
        notes: "IP added to blacklist"
      }
    },
    { 
      id: 4, 
      type: "Malware Detection", 
      source: "workstation-05", 
      timestamp: "2023-05-14 16:00:22", 
      severity: "Critical", 
      status: "Open",
      details: "Malware detected in user download",
      extendedInfo: {
        malwareType: "Trojan.Generic",
        filePath: "C:\\Users\\user\\Downloads\\invoice.exe",
        hashValue: "a1b2c3d4e5f6...",
        detectionEngine: "AV-2023",
        recommendation: "Quarantine file and scan system",
        notes: "User clicked on phishing email"
      }
    },
    { 
      id: 5, 
      type: "DDoS Attack", 
      source: "firewall-01", 
      timestamp: "2023-05-14 15:45:00", 
      severity: "Critical", 
      status: "Mitigated",
      details: "DDoS attack detected and mitigated",
      extendedInfo: {
        attackType: "UDP Flood",
        targetService: "Web Server",
        peakVolume: "1.2 Gbps",
        duration: "10 minutes",
        mitigationStatus: "Active",
        recommendation: "Review firewall rules and DDoS protection",
        notes: "Traffic scrubbing in place"
      }
    },
    { 
      id: 6, 
      type: "Unauthorized Access", 
      source: "10.0.0.15", 
      timestamp: "2023-05-14 15:30:30", 
      severity: "High", 
      status: "Open",
      details: "Unauthorized access to sensitive files",
      extendedInfo: {
        user: "john.doe",
        accessedFiles: ["HR/salaries.xlsx", "HR/performance_reviews.docx"],
        accessMethod: "SMB Share",
        normalAccess: false,
        recommendation: "Review user permissions and ACLs",
        notes: "Account may be compromised"
      }
    },
    { 
      id: 7, 
      type: "Configuration Change", 
      source: "router-01", 
      timestamp: "2023-05-14 15:15:15", 
      severity: "Medium", 
      status: "Acknowledged",
      details: "Router configuration changed by admin",
      extendedInfo: {
        user: "admin",
        changeType: "Rule Modification",
        ruleID: "FW-2023-05-14-001",
        approvalStatus: "Approved",
        recommendation: "Document changes and monitor impact",
        notes: "Part of scheduled maintenance"
      }
    },
    { 
      id: 8, 
      type: "Port Scan Detected", 
      source: "45.22.10.5", 
      timestamp: "2023-05-14 15:00:00", 
      severity: "High", 
      status: "Open",
      details: "Port scan detected from external IP",
      extendedInfo: {
        scanType: "TCP SYN Scan",
        portsScanned: [22, 80, 443, 3389],
        duration: "30 seconds",
        intensity: "Medium",
        recommendation: "Block IP and monitor network traffic",
        notes: "Possible reconnaissance activity"
      }
    },
    { 
      id: 9, 
      type: "Brute Force Attack", 
      source: "192.168.1.50", 
      timestamp: "2023-05-14 14:45:30", 
      severity: "High", 
      status: "Open",
      details: "Brute force attack detected on SSH service",
      extendedInfo: {
        targetService: "SSH",
        username: "root",
        attempts: 150,
        sourceIP: "192.168.1.50",
        recommendation: "Enable MFA and strengthen password policy",
        notes: "Account lockout enabled"
      }
    },
    { 
      id: 10, 
      type: "Data Exfiltration", 
      source: "10.0.0.20", 
      timestamp: "2023-05-14 14:30:15", 
      severity: "Critical", 
      status: "Open",
      details: "Large file transfer to external IP",
      extendedInfo: {
        user: "jane.doe",
        fileSize: "2.5 GB",
        destinationIP: "203.0.113.200",
        destinationInfo: "Unregistered cloud storage",
        transferProtocol: "HTTPS",
        recommendation: "Investigate user activity and block destination IP",
        notes: "Possible data breach"
      }
    }
  ];

  // Sample data for the analytics chart
  const analyticsData = [
    { name: 'Mon', critical: 5, high: 8, medium: 12, low: 6 },
    { name: 'Tue', critical: 3, high: 6, medium: 9, low: 8 },
    { name: 'Wed', critical: 7, high: 10, medium: 8, low: 5 },
    { name: 'Thu', critical: 2, high: 12, medium: 7, low: 4 },
    { name: 'Fri', critical: 6, high: 9, medium: 11, low: 7 },
    { name: 'Sat', critical: 1, high: 3, medium: 5, low: 2 },
    { name: 'Sun', critical: 0, high: 2, medium: 4, low: 3 },
  ];

  // Filter alerts based on selected criteria and search query
  const filteredAlerts = alerts.filter(alert => {
    const matchesType = alertType === "all" || alert.type.toLowerCase().includes(alertType.toLowerCase());
    const matchesSearch = !searchQuery || 
      alert.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
      alert.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "critical" && (alert.severity === "Critical" || alert.severity === "High")) ||
      (activeTab === "system" && alert.source.includes("server")) ||
      (activeTab === "network" && (alert.source.includes("firewall") || alert.source.includes("router")));
    
    return matchesType && matchesSearch && matchesTab;
  });

  const handleExportAlerts = () => {
    toast({
      title: "Alerts Exported",
      description: `${filteredAlerts.length} alerts have been exported to CSV.`
    });
  };

  const handleAlertDetails = (id: number) => {
    setShowAlertDetails(showAlertDetails === id ? null : id);
  };
  
  const handleRunAnalysis = () => {
    setShowAnalytics(true);
    toast({
      title: "Analysis Complete",
      description: "Alert analysis has been completed. Showing results."
    });
  };

  const handleCreateRule = () => {
    setShowRuleEditor(false);
    toast({
      title: "Rule Created",
      description: `New ${selectedRuleType} rule "${ruleName}" has been created.`
    });
    
    // Reset form fields
    setRuleName("");
    setRuleDescription("");
    setRuleConditions("");
    setRuleActions("");
  };
  
  const handleCreateAlert = () => {
    setShowCreateAlert(false);
    toast({
      title: "Alert Created",
      description: `New ${alertSeverity} alert "${alertName}" has been created.`
    });
    
    // Reset form fields
    setAlertName("");
    setAlertDescription("");
    setAlertSeverity("Medium");
    setAlertSource("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Security Alerts</h2>
        <div className="flex gap-2">
          <Dialog open={showRuleEditor} onOpenChange={setShowRuleEditor}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Shield className="mr-2 h-4 w-4" />
                Alert Rules
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Alert Rule</DialogTitle>
                <DialogDescription>
                  Configure detection and response rules for security alerts
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="rule-name" className="text-right text-sm font-medium">
                    Rule Name
                  </label>
                  <Input
                    id="rule-name"
                    placeholder="Enter rule name"
                    className="col-span-3"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Rule Type</label>
                  <Select
                    value={selectedRuleType}
                    onValueChange={setSelectedRuleType}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="detection">Detection</SelectItem>
                      <SelectItem value="correlation">Correlation</SelectItem>
                      <SelectItem value="threshold">Threshold</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Status</label>
                  <div className="flex items-center col-span-3 space-x-2">
                    <Switch
                      checked={isRuleActive}
                      onCheckedChange={setIsRuleActive}
                      id="rule-active"
                    />
                    <label htmlFor="rule-active" className="text-sm">
                      {isRuleActive ? "Active" : "Inactive"}
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="rule-desc" className="text-right text-sm font-medium pt-2">
                    Description
                  </label>
                  <textarea
                    id="rule-desc"
                    rows={2}
                    className="col-span-3 min-h-[80px] rounded-md border border-input bg-background p-2"
                    placeholder="Describe the rule purpose"
                    value={ruleDescription}
                    onChange={(e) => setRuleDescription(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="rule-conditions" className="text-right text-sm font-medium pt-2">
                    Conditions
                  </label>
                  <textarea
                    id="rule-conditions"
                    rows={3}
                    className="col-span-3 min-h-[100px] rounded-md border border-input bg-background p-2 font-mono text-sm"
                    placeholder="alert.severity == 'Critical' AND alert.source LIKE '192.168.%'"
                    value={ruleConditions}
                    onChange={(e) => setRuleConditions(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="rule-actions" className="text-right text-sm font-medium pt-2">
                    Actions
                  </label>
                  <textarea
                    id="rule-actions"
                    rows={2}
                    className="col-span-3 min-h-[80px] rounded-md border border-input bg-background p-2 font-mono text-sm"
                    placeholder="notifyAdmin() AND blockSource()"
                    value={ruleActions}
                    onChange={(e) => setRuleActions(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRuleEditor(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleCreateRule}>
                  Create Rule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showCreateAlert} onOpenChange={setShowCreateAlert}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                <AlertCircle className="mr-2 h-4 w-4" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>
                  Create a new security alert for immediate assessment
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="alert-name" className="text-right text-sm font-medium">
                    Alert Title
                  </label>
                  <Input
                    id="alert-name"
                    placeholder="Enter alert title"
                    className="col-span-3"
                    value={alertName}
                    onChange={(e) => setAlertName(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="alert-source" className="text-right text-sm font-medium">
                    Source
                  </label>
                  <Input
                    id="alert-source"
                    placeholder="Enter source (IP, hostname, etc.)"
                    className="col-span-3"
                    value={alertSource}
                    onChange={(e) => setAlertSource(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Severity</label>
                  <Select
                    value={alertSeverity}
                    onValueChange={setAlertSeverity}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="alert-desc" className="text-right text-sm font-medium pt-2">
                    Description
                  </label>
                  <textarea
                    id="alert-desc"
                    rows={3}
                    className="col-span-3 min-h-[100px] rounded-md border border-input bg-background p-2"
                    placeholder="Describe the alert details"
                    value={alertDescription}
                    onChange={(e) => setAlertDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateAlert(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleCreateAlert}>
                  Create Alert
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Alert className="bg-orange-50 border-orange-200">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-800">Alert Dashboard</AlertTitle>
        <AlertDescription className="text-orange-700">
          Monitoring {alerts.length} alerts from the past 24 hours. {alerts.filter(e => e.severity === "Critical").length} critical alerts detected.
        </AlertDescription>
      </Alert>
      
      {/* Alert Categories Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Search and filters */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Alert Search</CardTitle>
            <CardDescription>Search through security alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input 
                  type="search" 
                  placeholder="Search alerts..." 
                  className="w-full pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Alert Type</h4>
                      <Select value={alertType} onValueChange={setAlertType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="cpu">CPU Usage</SelectItem>
                          <SelectItem value="disk">Disk Space</SelectItem>
                          <SelectItem value="login">Login Attempt</SelectItem>
                          <SelectItem value="malware">Malware</SelectItem>
                          <SelectItem value="ddos">DDoS Attack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Time Range</h4>
                      <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Time range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">Last hour</SelectItem>
                          <SelectItem value="24h">Last 24 hours</SelectItem>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>Apply Filters</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Alert Analytics</CardTitle>
            <CardDescription>Alert statistics and exports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last hour</SelectItem>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={handleRunAnalysis}>
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Analyze
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Alert Analysis Results</DialogTitle>
                      <DialogDescription>
                        Detailed analysis of security alerts for the selected time period
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4 space-y-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Alert Severity Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="critical" name="Critical" fill="#ef4444" />
                              <Bar dataKey="high" name="High" fill="#f97316" />
                              <Bar dataKey="medium" name="Medium" fill="#eab308" />
                              <Bar dataKey="low" name="Low" fill="#22c55e" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Key Findings</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>45% increase in malware alerts compared to previous period</li>
                              <li>Recurring DDoS pattern detected on Friday afternoons</li>
                              <li>Multiple high-severity alerts from the same subnet</li>
                              <li>System errors correlate with recent patch deployment</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Recommendations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>Increase monitoring of 192.168.1.x subnet</li>
                              <li>Update firewall rules for DDoS protection</li>
                              <li>Investigate recurring malware signatures</li>
                              <li>Create correlation rule for login failures</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAnalytics(false)}>
                        Close
                      </Button>
                      <Button onClick={() => {
                        toast({
                          title: "Analysis Exported",
                          description: "Alert analysis report has been exported to PDF."
                        });
                        setShowAnalytics(false);
                      }}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Analysis
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="outline" onClick={handleExportAlerts}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Alert Log</CardTitle>
              <CardDescription>Showing {filteredAlerts.length} of {alerts.length} alerts</CardDescription>
            </div>
            <Select value={alertType} onValueChange={setAlertType}>
              <SelectTrigger>
                <SelectValue placeholder="Alert type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alerts</SelectItem>
                <SelectItem value="cpu">CPU Usage</SelectItem>
                <SelectItem value="disk">Disk Space</SelectItem>
                <SelectItem value="login">Login Attempt</SelectItem>
                <SelectItem value="malware">Malware</SelectItem>
                <SelectItem value="ddos">DDoS Attack</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert Type</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <>
                  <TableRow key={alert.id} className={showAlertDetails === alert.id ? "bg-slate-50" : ""}>
                    <TableCell className="font-medium">{alert.type}</TableCell>
                    <TableCell>{alert.source}</TableCell>
                    <TableCell>{alert.timestamp}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`
                          ${alert.severity === "Critical" ? "bg-red-100 text-red-800 hover:bg-red-100" : ""}
                          ${alert.severity === "High" ? "bg-orange-100 text-orange-800 hover:bg-orange-100" : ""}
                          ${alert.severity === "Medium" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : ""}
                          ${alert.severity === "Low" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        `}
                      >
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.status}</TableCell>
                    <TableCell>{alert.details}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleAlertDetails(alert.id)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  {showAlertDetails === alert.id && (
                    <TableRow className="bg-slate-50">
                      <TableCell colSpan={7} className="p-4">
                        <div className="rounded-md bg-slate-100 p-4">
                          <h4 className="font-medium mb-2">Extended Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(alert.extendedInfo).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-sm font-medium text-slate-700">{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                                <span className="text-sm">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button size="sm" variant="outline">
                              Add to Report
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-500">
              Showing {filteredAlerts.length} of {alerts.length} alerts
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
