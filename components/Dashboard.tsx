"use client";

import { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { LoadingSkeleton } from "./LoadingSkeleton";
import { useToast } from "@/hooks/use-toast";
import { PredictionChart } from "./PredictionChart";
import { EmployeeTable } from "./EmployeeTable";
import { Progress } from "./ui/progress";
import { usePrediction } from "@/hooks/usePrediction";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

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

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);

  const { isLoading, progress, predictionData, runPrediction } =
    usePrediction();

  const [hide, setHide] = useState(true);

  const { isLoggedIn } = useAuth();
  const router = useRouter();

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

  const handleUpload = useCallback(async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      });
      return;
    }

    await runPrediction(placeholderData);
    setHide(false);
    toast({
      title: "Prediction completed",
      description: "The dataset has been uploaded and predicted.",
      variant: "success",
    });
  }, [file, runPrediction]);

  if (!isLoggedIn) {
    router.push("/");
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

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
          {isLoading && (
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-center mt-2">{progress}% Complete</p>
            </div>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <LoadingSkeleton />
      ) : hide ? null : (
        <>
          <PredictionChart data={predictionData} />

          <Card>
            <CardHeader>
              <CardTitle>Employee Data</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeTable data={predictionData} />
            </CardContent>
          </Card>
        </>
      )}
      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>Made with ❤️</p>
      </footer>
    </div>
  );
}
