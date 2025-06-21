import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

// Define the types for the component's props for type safety
type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType; // This is the correct type for passing a component like an icon
};

// Use a named export to match the convention of your other UI components
export function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="border-amber-200 hover:shadow-md hover:border-teal-300 transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-amber-800">{title}</CardTitle>
        <Icon className="h-5 w-5 text-teal-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-amber-950">{value}</div>
        <p className="text-xs text-amber-700">{description}</p>
      </CardContent>
    </Card>
  );
}