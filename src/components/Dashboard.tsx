
import { useState } from "react";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { StatCards } from "@/components/dashboard/StatCards";
import { ChartSection } from "@/components/dashboard/ChartSection";
import { ThreatMapSection } from "@/components/dashboard/ThreatMapSection";
import { EventsTable } from "@/components/dashboard/EventsTable";
import { SystemHealth } from "@/components/dashboard/SystemHealth";

export function Dashboard() {
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("24h");
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  
  // Sample data for events
  const recentEvents = [
    { id: 1, type: "Failed Login", source: "192.168.1.105", timestamp: "2023-05-14 15:32:45", severity: "High" },
    { id: 2, type: "Firewall Block", source: "203.0.113.42", timestamp: "2023-05-14 15:30:22", severity: "Medium" },
    { id: 3, type: "System Error", source: "internal-server-04", timestamp: "2023-05-14 15:28:01", severity: "Low" },
    { id: 4, type: "Malware Detected", source: "workstation-15", timestamp: "2023-05-14 15:25:39", severity: "Critical" },
    { id: 5, type: "Unauthorized Access", source: "192.168.1.210", timestamp: "2023-05-14 15:20:14", severity: "High" },
  ];
  
  // Filter events based on selected severity
  const filteredEvents = recentEvents.filter(event => {
    const matchesSeverity = severityFilter === "all" || event.severity.toLowerCase() === severityFilter.toLowerCase();
    const matchesType = eventTypeFilter === "all" || event.type.toLowerCase().includes(eventTypeFilter.toLowerCase());
    const matchesSource = sourceFilter === "all" || event.source.toLowerCase().includes(sourceFilter.toLowerCase());
    return matchesSeverity && matchesType && matchesSource;
  });
  
  // Sample data for event count by type
  const eventTypeData = [
    { name: "Failed Login", count: 42 },
    { name: "Firewall Block", count: 28 },
    { name: "System Error", count: 15 },
    { name: "Malware", count: 8 },
    { name: "Unauthorized", count: 19 }
  ];

  // Chart configuration 
  const chartConfig = {
    failed: {
      label: "Failed Login",
      color: "#8884d8"
    },
    firewall: {
      label: "Firewall Block",
      color: "#82ca9d"
    },
    system: {
      label: "System Error",
      color: "#ffc658"
    },
    malware: {
      label: "Malware",
      color: "#ff8042"
    },
    unauthorized: {
      label: "Unauthorized",
      color: "#0088fe"
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Security Overview</h2>

      <DashboardFilters
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        eventTypeFilter={eventTypeFilter}
        setEventTypeFilter={setEventTypeFilter}
        sourceFilter={sourceFilter}
        setSourceFilter={setSourceFilter}
      />
      
      <StatCards />
      
      <ChartSection 
        timeRange={timeRange}
        eventTypeData={eventTypeData}
        chartConfig={chartConfig}
      />
      
      <ThreatMapSection />
      
      <EventsTable filteredEvents={filteredEvents} />
      
      <SystemHealth />
    </div>
  );
}
