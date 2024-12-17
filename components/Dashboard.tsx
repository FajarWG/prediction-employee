"use client";

import { useState, useMemo, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useToast } from "@/hooks/use-toast";

const placeholderData = [
  {
    employee_id: 1,
    department: "Sales",
    region: "North",
    education: "Bachelor",
    gender: "Male",
    recruitment_channel: "Direct",
    no_of_trainings: 2,
    age: 35,
    previous_year_rating: 4,
    length_of_service: 5,
    awards_won: 1,
    avg_training_score: 85,
    predicted_promotion: true,
  },
  {
    employee_id: 2,
    department: "Marketing",
    region: "South",
    education: "Master",
    gender: "Female",
    recruitment_channel: "Sourcing",
    no_of_trainings: 1,
    age: 28,
    previous_year_rating: 3,
    length_of_service: 2,
    awards_won: 0,
    avg_training_score: 78,
    predicted_promotion: false,
  },
  {
    employee_id: 3,
    department: "Engineering",
    region: "West",
    education: "PhD",
    gender: "Male",
    recruitment_channel: "Direct",
    no_of_trainings: 3,
    age: 40,
    previous_year_rating: 5,
    length_of_service: 8,
    awards_won: 1,
    avg_training_score: 92,
    predicted_promotion: true,
  },
  {
    employee_id: 4,
    department: "HR",
    region: "East",
    education: "Bachelor",
    gender: "Female",
    recruitment_channel: "Referral",
    no_of_trainings: 2,
    age: 32,
    previous_year_rating: 3,
    length_of_service: 4,
    awards_won: 0,
    avg_training_score: 70,
    predicted_promotion: false,
  },
  {
    employee_id: 5,
    department: "Finance",
    region: "North",
    education: "Master",
    gender: "Male",
    recruitment_channel: "Sourcing",
    no_of_trainings: 2,
    age: 38,
    previous_year_rating: 4,
    length_of_service: 6,
    awards_won: 1,
    avg_training_score: 88,
    predicted_promotion: true,
  },
  {
    employee_id: 6,
    department: "Sales",
    region: "South",
    education: "Bachelor",
    gender: "Female",
    recruitment_channel: "Direct",
    no_of_trainings: 1,
    age: 30,
    previous_year_rating: 3,
    length_of_service: 3,
    awards_won: 0,
    avg_training_score: 75,
    predicted_promotion: false,
  },
  {
    employee_id: 7,
    department: "Engineering",
    region: "North",
    education: "Master",
    gender: "Male",
    recruitment_channel: "Referral",
    no_of_trainings: 2,
    age: 36,
    previous_year_rating: 4,
    length_of_service: 7,
    awards_won: 1,
    avg_training_score: 90,
    predicted_promotion: true,
  },
  {
    employee_id: 8,
    department: "Marketing",
    region: "West",
    education: "Bachelor",
    gender: "Female",
    recruitment_channel: "Sourcing",
    no_of_trainings: 1,
    age: 29,
    previous_year_rating: 3,
    length_of_service: 2,
    awards_won: 0,
    avg_training_score: 80,
    predicted_promotion: false,
  },
  {
    employee_id: 9,
    department: "IT",
    region: "East",
    education: "Master",
    gender: "Male",
    recruitment_channel: "Direct",
    no_of_trainings: 3,
    age: 33,
    previous_year_rating: 4,
    length_of_service: 5,
    awards_won: 1,
    avg_training_score: 87,
    predicted_promotion: true,
  },
  {
    employee_id: 10,
    department: "Operations",
    region: "North",
    education: "Bachelor",
    gender: "Female",
    recruitment_channel: "Sourcing",
    no_of_trainings: 2,
    age: 31,
    previous_year_rating: 3,
    length_of_service: 4,
    awards_won: 0,
    avg_training_score: 76,
    predicted_promotion: false,
  },
  {
    employee_id: 11,
    department: "Sales",
    region: "West",
    education: "Master",
    gender: "Male",
    recruitment_channel: "Referral",
    no_of_trainings: 2,
    age: 39,
    previous_year_rating: 5,
    length_of_service: 9,
    awards_won: 2,
    avg_training_score: 95,
    predicted_promotion: true,
  },
  {
    employee_id: 12,
    department: "Engineering",
    region: "South",
    education: "PhD",
    gender: "Female",
    recruitment_channel: "Direct",
    no_of_trainings: 3,
    age: 37,
    previous_year_rating: 4,
    length_of_service: 6,
    awards_won: 1,
    avg_training_score: 89,
    predicted_promotion: true,
  },
  {
    employee_id: 13,
    department: "HR",
    region: "North",
    education: "Bachelor",
    gender: "Male",
    recruitment_channel: "Sourcing",
    no_of_trainings: 1,
    age: 27,
    previous_year_rating: 3,
    length_of_service: 2,
    awards_won: 0,
    avg_training_score: 72,
    predicted_promotion: false,
  },
  {
    employee_id: 14,
    department: "Finance",
    region: "East",
    education: "Master",
    gender: "Female",
    recruitment_channel: "Referral",
    no_of_trainings: 2,
    age: 34,
    previous_year_rating: 4,
    length_of_service: 5,
    awards_won: 1,
    avg_training_score: 86,
    predicted_promotion: true,
  },
  {
    employee_id: 15,
    department: "Marketing",
    region: "West",
    education: "Bachelor",
    gender: "Male",
    recruitment_channel: "Direct",
    no_of_trainings: 1,
    age: 30,
    previous_year_rating: 3,
    length_of_service: 3,
    awards_won: 0,
    avg_training_score: 77,
    predicted_promotion: false,
  },
  {
    employee_id: 16,
    department: "IT",
    region: "South",
    education: "Master",
    gender: "Female",
    recruitment_channel: "Sourcing",
    no_of_trainings: 2,
    age: 35,
    previous_year_rating: 4,
    length_of_service: 6,
    awards_won: 1,
    avg_training_score: 88,
    predicted_promotion: true,
  },
  {
    employee_id: 17,
    department: "Operations",
    region: "North",
    education: "Bachelor",
    gender: "Male",
    recruitment_channel: "Referral",
    no_of_trainings: 1,
    age: 29,
    previous_year_rating: 3,
    length_of_service: 2,
    awards_won: 0,
    avg_training_score: 74,
    predicted_promotion: false,
  },
  {
    employee_id: 18,
    department: "Sales",
    region: "East",
    education: "Master",
    gender: "Female",
    recruitment_channel: "Direct",
    no_of_trainings: 2,
    age: 36,
    previous_year_rating: 4,
    length_of_service: 7,
    awards_won: 1,
    avg_training_score: 91,
    predicted_promotion: true,
  },
  {
    employee_id: 19,
    department: "Engineering",
    region: "West",
    education: "PhD",
    gender: "Male",
    recruitment_channel: "Sourcing",
    no_of_trainings: 3,
    age: 41,
    previous_year_rating: 5,
    length_of_service: 10,
    awards_won: 2,
    avg_training_score: 96,
    predicted_promotion: true,
  },
  {
    employee_id: 20,
    department: "HR",
    region: "South",
    education: "Bachelor",
    gender: "Female",
    recruitment_channel: "Referral",
    no_of_trainings: 1,
    age: 28,
    previous_year_rating: 3,
    length_of_service: 1,
    awards_won: 0,
    avg_training_score: 71,
    predicted_promotion: false,
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(placeholderData);

  const { toast } = useToast();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFile = e.target.files[0];
        if (selectedFile.type === "text/csv") {
          setFile(selectedFile);
        } else {
          toast({
            title: "Invalid file type",
            description: "Please upload a CSV file.",
            variant: "destructive",
          });
          e.target.value = "";
        }
      }
    },
    []
  );

  const handleUpload = useCallback(() => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulating file upload and prediction process
    setTimeout(() => {
      // Here you would typically handle the file upload and prediction
      console.log("File uploaded:", file);

      // For now, we'll just use the placeholder data
      setPredictionData(placeholderData);
      setIsLoading(false);

      toast({
        title: "Prediction complete",
        description: "Your data has been processed successfully.",
        variant: "success",
      });
    }, 5000);
  }, [file]);

  const pieChartData = useMemo(() => {
    const promoted = predictionData.filter(
      (employee) => employee.predicted_promotion
    ).length;
    const notPromoted = predictionData.length - promoted;
    return [
      { name: "Promoted", value: promoted },
      { name: "Not Promoted", value: notPromoted },
    ];
  }, [predictionData]);

  const lineChartData = useMemo(() => {
    const channelData = predictionData.reduce((acc, employee) => {
      if (!acc[employee.recruitment_channel]) {
        acc[employee.recruitment_channel] = { total: 0, promoted: 0 };
      }
      acc[employee.recruitment_channel].total++;
      if (employee.predicted_promotion) {
        acc[employee.recruitment_channel].promoted++;
      }
      return acc;
    }, {} as Record<string, { total: number; promoted: number }>);

    return Object.entries(channelData).map(([channel, data]) => ({
      name: channel,
      promotionRate: (data.promoted / data.total) * 100,
    }));
  }, [predictionData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Employee Promotion Prediction Dashboard
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Dataset</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input type="file" accept=".csv" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={isLoading}>
              {isLoading ? "Processing..." : "Upload and Predict"}
            </Button>
          </div>
          {file && <p className="mt-2">Selected file: {file.name}</p>}
        </CardContent>
      </Card>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Promotion Rate by Recruitment Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="promotionRate"
                        stroke="#8884d8"
                        name="Promotion Rate (%)"
                      />
                    </LineChart>
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

          <Card>
            <CardHeader>
              <CardTitle>Employee Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Education</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Recruitment Channel</TableHead>
                      <TableHead>Trainings</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Previous Year Rating</TableHead>
                      <TableHead>Length of Service</TableHead>
                      <TableHead>Awards Won</TableHead>
                      <TableHead>Avg Training Score</TableHead>
                      <TableHead>Predicted Promotion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {predictionData.map((employee) => (
                      <TableRow key={employee.employee_id}>
                        <TableCell>{employee.employee_id}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.region}</TableCell>
                        <TableCell>{employee.education}</TableCell>
                        <TableCell>{employee.gender}</TableCell>
                        <TableCell>{employee.recruitment_channel}</TableCell>
                        <TableCell>{employee.no_of_trainings}</TableCell>
                        <TableCell>{employee.age}</TableCell>
                        <TableCell>{employee.previous_year_rating}</TableCell>
                        <TableCell>{employee.length_of_service}</TableCell>
                        <TableCell>{employee.awards_won}</TableCell>
                        <TableCell>{employee.avg_training_score}</TableCell>
                        <TableCell>
                          {employee.predicted_promotion ? "Yes" : "No"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
