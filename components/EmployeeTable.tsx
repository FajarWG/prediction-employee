"use client";

import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface EmployeeTableProps {
  data: Employee[];
}

export function EmployeeTable({ data }: EmployeeTableProps) {
  const [promotionFilter, setPromotionFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);

  const departments = useMemo(() => {
    return Array.from(new Set(data.map((employee) => employee.department)));
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((employee) => {
      const matchesPromotion =
        promotionFilter === null ||
        promotionFilter === "all" ||
        employee.predicted_promotion.toString() === promotionFilter;

      const matchesDepartment =
        departmentFilter === null ||
        departmentFilter === "all" ||
        employee.department === departmentFilter;

      return matchesPromotion && matchesDepartment;
    });
  }, [data, promotionFilter, departmentFilter]);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "employee_data.xlsx");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={promotionFilter || ""}
          onValueChange={(value) => setPromotionFilter(value || null)}
        >
          <SelectTrigger className="max-w-[200px]">
            <SelectValue placeholder="Filter by promotion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Predicted Promotion</SelectItem>
            <SelectItem value="false">No Predicted Promotion</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={departmentFilter || ""}
          onValueChange={(value) => setDepartmentFilter(value || null)}
        >
          <SelectTrigger className="max-w-[200px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept || "dummy"}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={downloadExcel} className="ml-auto">
          <Download className="mr-2 h-4 w-4" /> Download Excel
        </Button>
      </div>
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
            {filteredData.map((employee) => (
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
    </div>
  );
}
