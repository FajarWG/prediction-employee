import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface PredictionChartProps {
  data: Employee[];
}

export function PredictionChart({ data }: PredictionChartProps) {
  const pieChartData = [
    {
      name: "Promoted",
      value: data.filter((e) => e.predicted_promotion).length,
    },
    {
      name: "Not Promoted",
      value: data.filter((e) => !e.predicted_promotion).length,
    },
  ];

  const barChartData = Object.entries(
    data.reduce((acc, employee) => {
      const channel = employee.recruitment_channel;
      if (!acc[channel]) acc[channel] = { total: 0, promoted: 0 };
      acc[channel].total++;
      if (employee.predicted_promotion) acc[channel].promoted++;
      return acc;
    }, {} as Record<string, { total: number; promoted: number }>)
  ).map(([channel, data]) => ({
    name: channel,
    promotionRate: (data.promoted / data.total) * 100,
    totalEmployees: data.total,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Promotion Rate by Recruitment Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="promotionRate"
                  name="Promotion Rate (%)"
                  fill="#8884d8"
                />
                <Bar
                  yAxisId="right"
                  dataKey="totalEmployees"
                  name="Total Employees"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overall Promotion Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
