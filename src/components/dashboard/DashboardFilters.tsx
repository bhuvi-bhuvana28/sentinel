
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

interface DashboardFiltersProps {
  severityFilter: string;
  setSeverityFilter: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
  eventTypeFilter: string;
  setEventTypeFilter: (value: string) => void;
  sourceFilter: string;
  setSourceFilter: (value: string) => void;
}

export function DashboardFilters({
  severityFilter,
  setSeverityFilter,
  timeRange,
  setTimeRange,
  eventTypeFilter,
  setEventTypeFilter,
  sourceFilter,
  setSourceFilter
}: DashboardFiltersProps) {
  
  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: `Severity: ${severityFilter}, Time: ${timeRange}, Type: ${eventTypeFilter}, Source: ${sourceFilter}`,
    });
  };

  const handleResetFilters = () => {
    setSeverityFilter("all");
    setTimeRange("24h");
    setEventTypeFilter("all");
    setSourceFilter("all");
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values",
    });
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 pb-2">
        <CardTitle className="flex items-center text-lg">
          <Filter className="h-5 w-5 mr-2 text-slate-600" />
          Dashboard Filters
        </CardTitle>
        <CardDescription>Fine-tune your security dashboard view</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 items-center p-4">
        <div className="flex flex-col gap-1 min-w-[170px]">
          <label className="text-sm font-medium" htmlFor="dashboard-severity">
            Severity Level
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger id="dashboard-severity" className="w-full">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by alert severity level</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex flex-col gap-1 min-w-[170px]">
          <label className="text-sm font-medium" htmlFor="dashboard-time">
            Time Range
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger id="dashboard-time" className="w-full">
                      <SelectValue placeholder="24h" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last hour</SelectItem>
                      <SelectItem value="24h">Last 24 hours</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select time period to display</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex flex-col gap-1 min-w-[170px]">
          <label className="text-sm font-medium" htmlFor="dashboard-event-type">
            Event Type
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                    <SelectTrigger id="dashboard-event-type" className="w-full">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="login">Login Events</SelectItem>
                      <SelectItem value="firewall">Firewall Events</SelectItem>
                      <SelectItem value="system">System Events</SelectItem>
                      <SelectItem value="malware">Malware Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by security event type</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex flex-col gap-1 min-w-[170px]">
          <label className="text-sm font-medium" htmlFor="dashboard-source">
            Event Source
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger id="dashboard-source" className="w-full">
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="192">Internal Network</SelectItem>
                      <SelectItem value="server">Servers</SelectItem>
                      <SelectItem value="workstation">Workstations</SelectItem>
                      <SelectItem value="cloud">Cloud Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by event source location</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="ml-auto flex gap-2 self-end mt-4 md:mt-0">
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
          <Button onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
