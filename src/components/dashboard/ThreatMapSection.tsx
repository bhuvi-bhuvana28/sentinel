
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ThreatMap } from "@/components/ThreatMap";

export function ThreatMapSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Geolocation</CardTitle>
        <CardDescription>Geographic distribution of security events</CardDescription>
      </CardHeader>
      <CardContent>
        <ThreatMap />
      </CardContent>
    </Card>
  );
}
