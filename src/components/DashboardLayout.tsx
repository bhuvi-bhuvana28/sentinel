
import { ReactNode, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Bell, 
  Shield, 
  Activity, 
  Database, 
  AlertCircle, 
  Search, 
  Settings,
  Filter,
  BarChart2,
  User,
  LogOut,
  Mail,
  Moon,
  Sun,
  CreditCard,
  Key,
  Lock,
  UserCircle,
  Users,
  HelpCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/components/Dashboard";
import { Events } from "@/components/Events";
import { Alerts } from "@/components/Alerts";
import { Reports } from "@/components/Reports";
import { Settings as SettingsComponent } from "@/components/Settings";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [messageCount, setMessageCount] = useState(5);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Executed",
        description: `Searching for: "${searchQuery}"`,
      });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: `${darkMode ? "Light" : "Dark"} Mode Enabled`,
      description: `Display theme switched to ${darkMode ? "light" : "dark"} mode`,
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
  };

  const handleFilterClick = () => {
    toast({
      title: "Filter Applied",
      description: "Global filter settings applied",
    });
  };

  const handleViewMessages = () => {
    toast({
      title: "Messages",
      description: "Opening message center",
    });
    setShowMessagesDialog(true);
  };

  // User profile information
  const [userProfile, setUserProfile] = useState({
    name: "Adam Davis",
    email: "adam.davis@example.com",
    role: "Security Analyst",
    department: "Cybersecurity",
    avatar: "/placeholder.svg",
    lastLogin: "Today at 09:15 AM",
    location: "New York, USA",
    bio: "Experienced security analyst with 7+ years in threat detection, incident response, and security operations. Certified in CISSP and CEH.",
    phone: "+1 (555) 123-4567",
    timezone: "Eastern Time (UTC-5)",
    twoFactorEnabled: true,
    notifications: {
      email: true,
      push: true,
      reports: false
    }
  });

  // Messages state
  const [showMessagesDialog, setShowMessagesDialog] = useState(false);
  const [messages] = useState([
    {
      id: 1,
      sender: "System Admin",
      subject: "Security Policy Update",
      content: "Please review the updated security policy by end of week.",
      date: "Today at 10:28 AM",
      read: false,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      sender: "Sarah Williams",
      subject: "Vulnerability Report Review",
      content: "Can you review the latest vulnerability assessment I just posted?",
      date: "Today at 09:45 AM",
      read: false,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      sender: "David Lee",
      subject: "SOC Team Meeting",
      content: "Reminder: SOC team meeting tomorrow at 2:00 PM in Conference Room B.",
      date: "Yesterday at 04:12 PM",
      read: true,
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      sender: "Emma Johnson",
      subject: "Compliance Documentation",
      content: "The new compliance documents are ready for your review.",
      date: "Yesterday at 11:30 AM",
      read: true,
      avatar: "/placeholder.svg"
    },
    {
      id: 5,
      sender: "Michael Chen",
      subject: "Incident Response Plan",
      content: "Let's discuss updates to the incident response procedures.",
      date: "May 14, 2023",
      read: true,
      avatar: "/placeholder.svg"
    }
  ]);

  // Form schema for profile editing
  const profileFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.string().min(2, { message: "Role is required" }),
    department: z.string().min(2, { message: "Department is required" }),
    bio: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    timezone: z.string().optional(),
    twoFactorEnabled: z.boolean().default(false),
    emailNotifications: z.boolean().default(true),
    pushNotifications: z.boolean().default(true),
    reportNotifications: z.boolean().default(false),
  });

  // Initialize form
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
      department: userProfile.department,
      bio: userProfile.bio || "",
      phone: userProfile.phone || "",
      location: userProfile.location || "",
      timezone: userProfile.timezone || "",
      twoFactorEnabled: userProfile.twoFactorEnabled,
      emailNotifications: userProfile.notifications.email,
      pushNotifications: userProfile.notifications.push,
      reportNotifications: userProfile.notifications.reports,
    },
  });

  const handleSaveProfile = (values: z.infer<typeof profileFormSchema>) => {
    // Update user profile with form values
    setUserProfile({
      ...userProfile,
      name: values.name,
      email: values.email,
      role: values.role,
      department: values.department,
      bio: values.bio || "",
      phone: values.phone || "",
      location: values.location || "",
      timezone: values.timezone || "",
      twoFactorEnabled: values.twoFactorEnabled,
      notifications: {
        email: values.emailNotifications,
        push: values.pushNotifications,
        reports: values.reportNotifications,
      }
    });
    
    setIsEditingProfile(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handleMarkAllAsRead = () => {
    toast({
      title: "Messages Marked as Read",
      description: "All messages have been marked as read"
    });
    setMessageCount(0);
    setShowMessagesDialog(false);
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <header className={`${darkMode ? 'bg-slate-900' : 'bg-slate-800'} text-white p-4 shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center">
            <Shield className="mr-2" /> SentinelWatch SIEM
          </h1>
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-slate-700/50 rounded-md px-3 mx-4 flex-1 max-w-md">
            <Search className="h-4 w-4 text-slate-400 mr-2" />
            <Input 
              placeholder="Search events, alerts, systems..." 
              className="border-0 bg-transparent text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                  <Filter className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Global Filters</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" side="bottom" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Filter Security Events</h4>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="severity">Severity Level</label>
                    <select id="severity" className="w-full rounded-md border border-slate-300 p-2 text-sm">
                      <option value="all">All Severities</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="timeRange">Time Range</label>
                    <select id="timeRange" className="w-full rounded-md border border-slate-300 p-2 text-sm">
                      <option value="1h">Last Hour</option>
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="source">Event Source</label>
                    <select id="source" className="w-full rounded-md border border-slate-300 p-2 text-sm">
                      <option value="all">All Sources</option>
                      <option value="firewall">Firewall</option>
                      <option value="endpoint">Endpoint</option>
                      <option value="network">Network</option>
                      <option value="cloud">Cloud</option>
                    </select>
                  </div>
                  <Button onClick={handleFilterClick} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-slate-700 relative" onClick={handleNotificationClick}>
                  <Bell />
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 min-w-4 h-4 flex items-center justify-center">
                    3
                  </Badge>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-72 overflow-auto">
                  <DropdownMenuItem className="p-3 flex flex-col items-start cursor-pointer">
                    <div className="flex w-full justify-between items-start">
                      <span className="font-medium">Critical Alert</span>
                      <Badge variant="destructive" className="ml-2">New</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">Malware detected on endpoint-15</span>
                    <span className="text-xs text-muted-foreground mt-1">5 minutes ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 flex flex-col items-start cursor-pointer">
                    <div className="flex w-full justify-between items-start">
                      <span className="font-medium">Security Event</span>
                      <Badge variant="destructive" className="ml-2">New</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">Multiple failed logins from IP 192.168.1.105</span>
                    <span className="text-xs text-muted-foreground mt-1">15 minutes ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 flex flex-col items-start cursor-pointer">
                    <div className="flex w-full justify-between items-start">
                      <span className="font-medium">System Alert</span>
                      <Badge variant="destructive" className="ml-2">New</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">Disk space warning on server-04</span>
                    <span className="text-xs text-muted-foreground mt-1">30 minutes ago</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Button variant="ghost" size="sm" className="w-full">View All Notifications</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Messages button */}
            <button 
              className="p-2 rounded-full hover:bg-slate-700 relative"
              onClick={handleViewMessages}
            >
              <Mail />
              {messageCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-blue-500 text-xs px-1 min-w-4 h-4 flex items-center justify-center">
                  {messageCount}
                </Badge>
              )}
            </button>
            
            <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-slate-800 hover:ring-white transition">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{userProfile.name}</span>
                      <span className="text-xs text-muted-foreground">{userProfile.role}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={handleViewMessages}>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                    {messageCount > 0 && (
                      <Badge variant="outline" className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-100">{messageCount}</Badge>
                    )}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={toggleDarkMode}>
                    {darkMode ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{isEditingProfile ? "Edit Profile" : "User Profile"}</DialogTitle>
                  <DialogDescription>
                    {isEditingProfile ? "Update your profile information" : "View and manage your profile information"}
                  </DialogDescription>
                </DialogHeader>
                
                {!isEditingProfile ? (
                  <div className="grid md:grid-cols-[200px_1fr] gap-6 py-4">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                        <AvatarFallback className="text-2xl">AD</AvatarFallback>
                      </Avatar>
                      
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{userProfile.name}</h3>
                        <p className="text-sm text-muted-foreground">{userProfile.role}</p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        Edit Profile
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Bio section */}
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Bio</h4>
                        <p className="text-sm">{userProfile.bio}</p>
                      </div>
                    
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Email</h4>
                          <p className="text-sm">{userProfile.email}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Phone</h4>
                          <p className="text-sm">{userProfile.phone}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Department</h4>
                          <p className="text-sm">{userProfile.department}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Location</h4>
                          <p className="text-sm">{userProfile.location}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Last Login</h4>
                          <p className="text-sm">{userProfile.lastLogin}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Timezone</h4>
                          <p className="text-sm">{userProfile.timezone}</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Security Settings</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Key className="h-4 w-4" />
                              <span className="text-sm">Two-Factor Authentication</span>
                            </div>
                            <Badge variant="outline" className={userProfile.twoFactorEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                              {userProfile.twoFactorEnabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              <span className="text-sm">Password</span>
                            </div>
                            <Button variant="outline" size="sm">
                              Change Password
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Notification Preferences</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Email Notifications</span>
                            <span className={userProfile.notifications.email ? "text-green-600" : "text-red-600"}>
                              {userProfile.notifications.email ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Push Notifications</span>
                            <span className={userProfile.notifications.push ? "text-green-600" : "text-red-600"}>
                              {userProfile.notifications.push ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Weekly Reports</span>
                            <span className={userProfile.notifications.reports ? "text-green-600" : "text-red-600"}>
                              {userProfile.notifications.reports ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveProfile)} className="grid md:grid-cols-[200px_1fr] gap-6 py-4">
                      {/* Left column with avatar */}
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                          <AvatarFallback className="text-2xl">AD</AvatarFallback>
                        </Avatar>
                        
                        <Button variant="outline" size="sm" className="mt-2">
                          Change Photo
                        </Button>
                      </div>
                      
                      {/* Right column with form fields */}
                      <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                          <h4 className="font-medium text-sm">Basic Information</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="role"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Role</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="department"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Department</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                  <Textarea {...field} rows={3} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Contact Information */}
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="font-medium text-sm">Contact Information</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="timezone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Timezone</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        {/* Security Settings */}
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="font-medium text-sm">Security Settings</h4>
                          
                          <FormField
                            control={form.control}
                            name="twoFactorEnabled"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                                  <FormDescription>
                                    Add an extra layer of security to your account
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Notification Preferences */}
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="font-medium text-sm">Notification Preferences</h4>
                          
                          <FormField
                            control={form.control}
                            name="emailNotifications"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg p-3">
                                <FormLabel className="cursor-pointer">Email Notifications</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="pushNotifications"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg p-3">
                                <FormLabel className="cursor-pointer">Push Notifications</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="reportNotifications"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg p-3">
                                <FormLabel className="cursor-pointer">Weekly Reports</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </form>
                  </Form>
                )}
                
                <DialogFooter>
                  {isEditingProfile ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                        Cancel
                      </Button>
                      <Button onClick={form.handleSubmit(handleSaveProfile)}>
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
                        Close
                      </Button>
                      <Button onClick={() => setIsEditingProfile(true)}>
                        Edit Profile
                      </Button>
                    </>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Messages Dialog */}
            <Dialog open={showMessagesDialog} onOpenChange={setShowMessagesDialog}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Messages</DialogTitle>
                  <DialogDescription>
                    View and manage your messages
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4 divide-y">
                  {messages.map((message) => (
                    <div key={message.id} className={`py-4 px-2 ${!message.read ? "bg-blue-50" : ""}`}>
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={message.avatar} alt={message.sender} />
                          <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{message.sender}</h4>
                            <span className="text-xs text-gray-500">{message.date}</span>
                          </div>
                          <p className="font-medium text-sm">{message.subject}</p>
                          <p className="text-sm text-gray-600">{message.content}</p>
                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm">Reply</Button>
                            <Button variant="ghost" size="sm">Archive</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {messages.length === 0 && (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">No messages</p>
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowMessagesDialog(false)}>
                    Close
                  </Button>
                  <Button onClick={handleMarkAllAsRead}>
                    Mark All as Read
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <nav className={`${darkMode ? 'bg-slate-800' : 'bg-slate-700'} text-white p-2`}>
        <div className="container mx-auto">
          <Tabs 
            defaultValue="dashboard" 
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className={`grid grid-cols-5 ${darkMode ? 'bg-slate-900' : 'bg-slate-800'}`}>
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-600">
                <Activity className="h-4 w-4 mr-2" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-slate-600">
                <Database className="h-4 w-4 mr-2" /> Events
              </TabsTrigger>
              <TabsTrigger value="alerts" className="data-[state=active]:bg-slate-600">
                <AlertCircle className="h-4 w-4 mr-2" /> Alerts
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-slate-600">
                <BarChart2 className="h-4 w-4 mr-2" /> Reports
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-slate-600">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
            <TabsContent value="events">
              <Events />
            </TabsContent>
            <TabsContent value="alerts">
              <Alerts />
            </TabsContent>
            <TabsContent value="reports">
              <Reports />
            </TabsContent>
            <TabsContent value="settings">
              <SettingsComponent />
            </TabsContent>
          </Tabs>
        </div>
      </nav>

      <main className={`flex-1 ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100'} p-4`}>
        <div className="container mx-auto">
          {/* The content is now rendered from the TabsContent */}
        </div>
      </main>

      <footer className={`${darkMode ? 'bg-slate-900' : 'bg-slate-800'} text-white p-2 text-sm`}>
        <div className="container mx-auto text-center">
          <p>SentinelWatch SIEM &copy; {new Date().getFullYear()} | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
