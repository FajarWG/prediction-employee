import { useState } from "react";

import { Employee } from "@/types/employee";
import { predictPromotions } from "@/utils/api";

export function usePrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [predictionData, setPredictionData] = useState<Employee[]>([]);

  const runPrediction = async (employees: Employee[]) => {
    setIsLoading(true);
    setProgress(0);

    const intervalId = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 500);

    try {
      const result = await predictPromotions(employees);
      setPredictionData(result);
      setProgress(100);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      clearInterval(intervalId);
      setIsLoading(false);
    }
  };

  return { isLoading, progress, predictionData, runPrediction };
}
