
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Search, Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";

interface ReportFiltersProps {
  reportType: string;
  setReportType: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  timeRange: string;
  setTimeRange: (range: string) => void;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export function ReportFilters({
  reportType,
  setReportType,
  searchQuery,
  setSearchQuery,
  timeRange,
  setTimeRange,
  date,
  setDate
}: ReportFiltersProps) {
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);

  useEffect(() => {
    const now = new Date();
    
    if (timeRange === "7d") {
      setDate({
        from: subDays(now, 7),
        to: now,
      });
    } else if (timeRange === "30d") {
      setDate({
        from: subDays(now, 30),
        to: now,
      });
    } else if (timeRange === "90d") {
      setDate({
        from: subDays(now, 90),
        to: now,
      });
    } else if (timeRange === "1y") {
      setDate({
        from: subDays(now, 365),
        to: now,
      });
    }
  }, [timeRange, setDate]);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search reports by title, author or type..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Select value={reportType} onValueChange={setReportType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Report type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="compliance">Compliance</SelectItem>
          <SelectItem value="incidents">Incidents</SelectItem>
          <SelectItem value="assessment">Assessment</SelectItem>
          <SelectItem value="operations">Operations</SelectItem>
        </SelectContent>
      </Select>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px]">
            <Calendar className="mr-2 h-4 w-4" />
            {timeRange === "custom" && date?.from && date?.to
              ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d")}`
              : timeRange === "all" ? "All time"
              : timeRange === "7d" ? "Last 7 days"
              : timeRange === "30d" ? "Last 30 days"
              : timeRange === "90d" ? "Last 90 days"
              : "Last year"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="end">
          <div className="space-y-2">
            {["7d", "30d", "90d", "1y", "all"].map((option) => (
              <Button
                key={option}
                variant={timeRange === option ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  setTimeRange(option);
                }}
              >
                {option === "7d" ? "Last 7 days" : 
                option === "30d" ? "Last 30 days" : 
                option === "90d" ? "Last 90 days" : 
                option === "1y" ? "Last year" :
                "All time"}
              </Button>
            ))}
            
            <div className="pt-2">
              <Button
                variant={timeRange === "custom" ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  setTimeRange("custom");
                  setShowCustomDateRange(true);
                }}
              >
                Custom range
              </Button>
            </div>
            
            {timeRange === "custom" && (
              <div className="border rounded-md p-3 mt-2">
                <CalendarUI
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                  className={cn("p-3 pointer-events-auto")}
                />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
