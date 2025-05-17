
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ReportScheduleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportSchedule({ open, onOpenChange }: ReportScheduleProps) {
  const [scheduleFrequency, setScheduleFrequency] = useState("weekly");
  const [scheduleEmail, setScheduleEmail] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Regular Reports</DialogTitle>
          <DialogDescription>
            Set up automated reports to be delivered on a regular schedule.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Report Type</h3>
            <Select defaultValue="security">
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="security">Security Summary</SelectItem>
                <SelectItem value="compliance">Compliance Status</SelectItem>
                <SelectItem value="threats">Threat Intelligence</SelectItem>
                <SelectItem value="incidents">Incident Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Frequency</h3>
            <div className="flex gap-3">
              {["daily", "weekly", "monthly"].map(freq => (
                <Button
                  key={freq}
                  variant={scheduleFrequency === freq ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScheduleFrequency(freq)}
                  className="flex-1"
                >
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Email Delivery</h3>
            <Input 
              type="email" 
              placeholder="Enter email address" 
              value={scheduleEmail}
              onChange={(e) => setScheduleEmail(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            if (scheduleEmail) {
              toast({
                title: "Report Scheduled",
                description: `${scheduleFrequency.charAt(0).toUpperCase() + scheduleFrequency.slice(1)} reports will be sent to ${scheduleEmail}`,
              });
              onOpenChange(false);
            } else {
              toast({
                title: "Email Required",
                description: "Please provide an email address for delivery",
                variant: "destructive",
              });
            }
          }}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Reports
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
