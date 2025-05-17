
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, Bell, Clock, Download, Lock, Save, Settings as SettingsIcon, Shield, Upload, User, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [criticalAlertsOnly, setCriticalAlertsOnly] = useState(false);
  const [dataRetention, setDataRetention] = useState("90");
  const [timezone, setTimezone] = useState("UTC");
  const [theme, setTheme] = useState("system");
  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  
  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleExportSettings = () => {
    toast({
      title: "Settings exported",
      description: "Your settings have been exported to config.json",
    });
  };
  
  const handleImportSettings = () => {
    toast({
      title: "Settings imported",
      description: "Your settings have been imported successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">System Settings</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportSettings}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportSettings}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>
      
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Need help configuring your system?</AlertTitle>
        <AlertDescription className="text-blue-700">
          Check our <Button variant="link" className="text-blue-600 p-0 h-auto">documentation</Button> or 
          <Button variant="link" className="text-blue-600 p-0 h-auto">contact support</Button> for assistance.
        </AlertDescription>
      </Alert>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="general">
            <SettingsIcon className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your system preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="SentinelWatch SIEM" />
                </div>
                
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" defaultValue="Acme Corporation" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="data-retention">Data Retention (days)</Label>
                    <Select value={dataRetention} onValueChange={setDataRetention}>
                      <SelectTrigger id="data-retention">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500 mt-1">
                      Determines how long event data is kept in the system before archiving
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                        <SelectItem value="CST">Central Time (CST)</SelectItem>
                        <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                        <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Theme Preference</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="language">Interface Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Advanced Options</h3>
                    <p className="text-sm text-slate-500">Configure additional system settings</p>
                  </div>
                  <Switch 
                    checked={advancedOptions} 
                    onCheckedChange={setAdvancedOptions}
                  />
                </div>
                
                {advancedOptions && (
                  <div className="space-y-4 border-l-2 border-slate-200 pl-4 mt-4">
                    <div>
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select defaultValue="info">
                        <SelectTrigger id="log-level">
                          <SelectValue placeholder="Select log level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="max-results">Max Results Per Page</Label>
                      <Input id="max-results" type="number" defaultValue="50" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="analytics" className="cursor-pointer">Enable Anonymous Usage Analytics</Label>
                      <Switch id="analytics" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-refresh" className="cursor-pointer">Auto-refresh Dashboard</Label>
                      <Switch id="auto-refresh" defaultChecked />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Details about your current installation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Version</h3>
                  <p>SentinelWatch SIEM v3.5.2</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">License</h3>
                  <p className="flex items-center">Enterprise <Badge className="ml-2 bg-green-100 text-green-800">Active</Badge></p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Database</h3>
                  <p>PostgreSQL 14.5</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Last Updated</h3>
                  <p>May 10, 2023</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  Check for Updates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-slate-500">Receive alerts via email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  
                  {emailNotifications && (
                    <div className="pl-6 border-l-2 border-slate-100 space-y-3">
                      <div>
                        <Label htmlFor="email-address">Recipients</Label>
                        <Input id="email-address" type="email" defaultValue="admin@example.com" className="mt-1" />
                        <p className="text-xs text-slate-500 mt-1">
                          Separate multiple addresses with commas
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="email-frequency">Frequency</Label>
                        <Select defaultValue="immediate">
                          <SelectTrigger id="email-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="hourly">Hourly Digest</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button variant="outline" size="sm">Test Email Notification</Button>
                    </div>
                  )}
                </div>
                
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Slack Notifications</h4>
                      <p className="text-sm text-slate-500">Send alerts to a Slack channel</p>
                    </div>
                    <Switch 
                      id="slack-notifications" 
                      checked={slackNotifications} 
                      onCheckedChange={setSlackNotifications} 
                    />
                  </div>
                  
                  {slackNotifications && (
                    <div className="pl-6 border-l-2 border-slate-100 space-y-3">
                      <div>
                        <Label htmlFor="slack-webhook">Webhook URL</Label>
                        <Input id="slack-webhook" defaultValue="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXX" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="slack-channel">Channel</Label>
                        <Input id="slack-channel" defaultValue="#security-alerts" className="mt-1" />
                      </div>
                      
                      <Button variant="outline" size="sm">Test Slack Notification</Button>
                    </div>
                  )}
                </div>
                
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-slate-500">Receive critical alerts via SMS</p>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications} 
                    />
                  </div>
                  
                  {smsNotifications && (
                    <div className="pl-6 border-l-2 border-slate-100 space-y-3">
                      <div>
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input id="phone-number" type="tel" defaultValue="+1 (555) 123-4567" className="mt-1" />
                      </div>
                      
                      <div>
                        <p className="text-sm text-slate-500">
                          SMS notifications are limited to critical security alerts only
                        </p>
                      </div>
                      
                      <Button variant="outline" size="sm">Test SMS Notification</Button>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-medium mt-6">Notification Preferences</h3>
                
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Alert Severity</h4>
                      <p className="text-sm text-slate-500">Filter which alerts trigger notifications</p>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select minimum severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Alerts</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                        <SelectItem value="high">High & Critical</SelectItem>
                        <SelectItem value="medium">Medium & Above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Quiet Hours</h4>
                      <p className="text-sm text-slate-500">Only critical alerts will be sent during quiet hours</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-slate-100">
                    <div>
                      <Label htmlFor="start-time" className="text-xs text-slate-500">Start Time</Label>
                      <Input id="start-time" type="time" defaultValue="22:00" />
                    </div>
                    <div>
                      <Label htmlFor="end-time" className="text-xs text-slate-500">End Time</Label>
                      <Input id="end-time" type="time" defaultValue="07:00" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Test Notifications</Button>
              <Button onClick={handleSaveNotifications}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage access control and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                
                <div className="border rounded-md p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="auth-method">Authentication Method</Label>
                      <Select defaultValue="mfa">
                        <SelectTrigger id="auth-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="password">Password Only</SelectItem>
                          <SelectItem value="mfa">Multi-Factor Authentication</SelectItem>
                          <SelectItem value="sso">Single Sign-On (SSO)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input id="session-timeout" type="number" defaultValue="30" min="5" max="1440" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enforce-complex-passwords" className="cursor-pointer">
                      <div>
                        <span className="font-medium">Enforce complex passwords</span>
                        <p className="text-xs text-slate-500">Require minimum length and mixed character types</p>
                      </div>
                    </Label>
                    <Switch id="enforce-complex-passwords" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-expiry" className="cursor-pointer">
                      <div>
                        <span className="font-medium">Password expiry (90 days)</span>
                        <p className="text-xs text-slate-500">Force password changes periodically</p>
                      </div>
                    </Label>
                    <Switch id="password-expiry" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lockout-policy" className="cursor-pointer">
                      <div>
                        <span className="font-medium">Account lockout policy</span>
                        <p className="text-xs text-slate-500">Lock accounts after 5 failed attempts</p>
                      </div>
                    </Label>
                    <Switch id="lockout-policy" defaultChecked />
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mt-6">API Access</h3>
                
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable API Access</h4>
                      <p className="text-sm text-slate-500">Allow programmatic access to the system</p>
                    </div>
                    <Switch id="enable-api" defaultChecked />
                  </div>
                  
                  <div>
                    <Label htmlFor="api-key" className="flex items-center justify-between">
                      <span>API Key</span>
                      <Button variant="outline" size="sm" className="h-7">Regenerate</Button>
                    </Label>
                    <div className="flex mt-1">
                      <Input id="api-key" value="sk_live_51KdJk2LmC3JK9Ljx8KgNu7Y" readOnly className="font-mono text-sm" />
                      <Button variant="ghost" size="sm" className="ml-2">Copy</Button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Last generated: 2023-04-15 09:32:45</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="api-rate-limit">API Rate Limit (requests per minute)</Label>
                    <Input id="api-rate-limit" type="number" defaultValue="60" min="10" max="1000" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">IP Restrictions</h4>
                      <p className="text-sm text-slate-500">Limit API access to specific IP addresses</p>
                    </div>
                    <Switch id="ip-restrictions" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>Review recent security-related events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="border-l-2 border-slate-200 pl-3 py-2">
                  <p className="text-sm font-medium">Admin user updated authentication settings</p>
                  <p className="text-xs text-slate-500">Today, 10:42 AM • IP: 192.168.1.100</p>
                </div>
                <div className="border-l-2 border-slate-200 pl-3 py-2">
                  <p className="text-sm font-medium">API key regenerated</p>
                  <p className="text-xs text-slate-500">Yesterday, 3:15 PM • IP: 192.168.1.105</p>
                </div>
                <div className="border-l-2 border-slate-200 pl-3 py-2">
                  <p className="text-sm font-medium">New user account created</p>
                  <p className="text-xs text-slate-500">May 12, 2023, 11:30 AM • IP: 192.168.1.100</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="link" className="px-0">View Complete Audit Trail</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <Button size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-slate-50">
                        <th className="text-left p-3 text-sm">User</th>
                        <th className="text-left p-3 text-sm">Role</th>
                        <th className="text-left p-3 text-sm">Status</th>
                        <th className="text-left p-3 text-sm">Last Active</th>
                        <th className="text-right p-3 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium mr-2">
                              AD
                            </div>
                            <div>
                              <p className="font-medium">Admin User</p>
                              <p className="text-xs text-slate-500">admin@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className="bg-purple-100 text-purple-800">Administrator</Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                        </td>
                        <td className="p-3">
                          <span className="text-sm">Just now</span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-medium mr-2">
                              JD
                            </div>
                            <div>
                              <p className="font-medium">Jane Doe</p>
                              <p className="text-xs text-slate-500">jane@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className="bg-blue-100 text-blue-800">Analyst</Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                        </td>
                        <td className="p-3">
                          <span className="text-sm">2 hours ago</span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-medium mr-2">
                              MS
                            </div>
                            <div>
                              <p className="font-medium">Mark Smith</p>
                              <p className="text-xs text-slate-500">mark@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className="bg-amber-100 text-amber-800">Auditor</Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Away</Badge>
                        </td>
                        <td className="p-3">
                          <span className="text-sm">1 day ago</span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>Configure user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="border rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Administrator</h4>
                      <Badge>3 users</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Full system access and management</p>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Security Analyst</h4>
                      <Badge>5 users</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Can view and investigate security events</p>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Auditor</h4>
                      <Badge>2 users</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Read-only access for compliance auditing</p>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-slate-50 cursor-pointer">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Report Viewer</h4>
                      <Badge>8 users</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Access to reports and dashboards only</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">Manage Roles</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Authentication Providers</CardTitle>
                <CardDescription>Configure external authentication providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center mr-3">
                        <Shield className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">Local Authentication</p>
                        <p className="text-xs text-slate-500">Built-in user database</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center mr-3">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Google SSO</p>
                        <p className="text-xs text-slate-500">Google Workspace authentication</p>
                      </div>
                    </div>
                    <Badge variant="outline">Configure</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center mr-3">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">LDAP / Active Directory</p>
                        <p className="text-xs text-slate-500">Enterprise directory integration</p>
                      </div>
                    </div>
                    <Badge variant="outline">Configure</Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">Add Provider</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
