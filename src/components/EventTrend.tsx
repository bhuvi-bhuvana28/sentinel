
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

// Sample data for the event trend chart
const eventData = {
  "1h": [
    { time: "15:00", events: 42 },
    { time: "15:10", events: 38 },
    { time: "15:20", events: 55 },
    { time: "15:30", events: 47 },
    { time: "15:40", events: 60 },
    { time: "15:50", events: 51 },
  ],
  "24h": [
    { time: "00:00", events: 120 },
    { time: "04:00", events: 80 },
    { time: "08:00", events: 160 },
    { time: "12:00", events: 230 },
    { time: "16:00", events: 310 },
    { time: "20:00", events: 190 },
  ],
  "7d": [
    { time: "Mon", events: 1250 },
    { time: "Tue", events: 1400 },
    { time: "Wed", events: 1800 },
    { time: "Thu", events: 1600 },
    { time: "Fri", events: 2100 },
    { time: "Sat", events: 1200 },
    { time: "Sun", events: 950 },
  ],
  "30d": [
    { time: "Week 1", events: 8500 },
    { time: "Week 2", events: 9200 },
    { time: "Week 3", events: 11500 },
    { time: "Week 4", events: 10200 },
  ]
};

interface EventTrendProps {
  timeRange: string;
}

export function EventTrend({ timeRange }: EventTrendProps) {
  // Get the appropriate data based on the selected time range
  const data = eventData[timeRange as keyof typeof eventData] || eventData["24h"];

  return (
    <ChartContainer className="h-[240px]" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false} 
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            cursor={{ stroke: '#ddd' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="text-sm font-semibold">{label}</div>
                    <div className="text-xs text-muted-foreground">
                      {`Events: ${payload[0].value}`}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line 
            type="monotone" 
            dataKey="events" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5, stroke: '#8884d8', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
