
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export function SystemHealth() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Status of monitored infrastructure</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast({ title: "Refresh Status", description: "System health statuses updated" })}>
          Refresh Status
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Firewall</p>
              <p className="text-xs text-muted-foreground">fortinet-fw01</p>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm">Online</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">IDS</p>
              <p className="text-xs text-muted-foreground">snort-ids01</p>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm">Online</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Endpoint Protection</p>
              <p className="text-xs text-muted-foreground">endpoint-server</p>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
              <span className="text-sm">Degraded</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">VPN Gateway</p>
              <p className="text-xs text-muted-foreground">vpn-gw01</p>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm">Online</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email Security</p>
              <p className="text-xs text-muted-foreground">mail-security</p>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
              <span className="text-sm">Alert</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
