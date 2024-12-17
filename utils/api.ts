import { Employee } from "@/types/employee";

export async function predictPromotions(
  employees: Employee[]
): Promise<Employee[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return employees.map((employee) => ({
    ...employee,
    predicted_promotion: Math.random() > 0.5,
  }));
}
