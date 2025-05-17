
import { Button } from "@/components/ui/button";
import { Calendar, FileText } from "lucide-react";

interface ReportsHeaderProps {
  onOpenSchedule: () => void;
  onOpenGenerator: () => void;
}

export function ReportsHeader({ onOpenSchedule, onOpenGenerator }: ReportsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold">Security Reports</h2>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onOpenSchedule}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Report
        </Button>
        <Button 
          variant="default" 
          size="sm"
          onClick={onOpenGenerator}
        >
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>
  );
}
