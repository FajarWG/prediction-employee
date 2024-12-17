import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee } from "@/types/employee";

interface EmployeeTableProps {
  data: Employee[];
}

export function EmployeeTable({ data }: EmployeeTableProps) {
  return (
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
          {data.map((employee) => (
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
  );
}
