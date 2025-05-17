
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { EventTrend } from "@/components/EventTrend";

interface ChartSectionProps {
  timeRange: string;
  eventTypeData: Array<{name: string, count: number}>;
  chartConfig: Record<string, {label: string, color: string}>;
}

export function ChartSection({ timeRange, eventTypeData, chartConfig }: ChartSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Event Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Security Events Trend</CardTitle>
          <CardDescription>Event volume over time</CardDescription>
        </CardHeader>
        <CardContent>
          <EventTrend timeRange={timeRange} />
        </CardContent>
      </Card>

      {/* Event Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Event Distribution</CardTitle>
          <CardDescription>Events by type</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[240px]" config={chartConfig}>
            <ResponsiveContainer>
              <BarChart data={eventTypeData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false} 
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="text-sm font-semibold">{payload[0].payload.name}</div>
                          <div className="text-xs text-muted-foreground">{`Count: ${payload[0].value}`}</div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
