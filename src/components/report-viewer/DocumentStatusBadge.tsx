
import React from "react";
import { Badge } from "@/components/ui/badge";

interface DocumentStatusBadgeProps {
  status: string;
}

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  return (
    <Badge variant="outline" className={
      status === "Final" 
        ? "bg-green-100 text-green-800 hover:bg-green-100" 
        : "bg-amber-100 text-amber-800 hover:bg-amber-100"
    }>
      {status}
    </Badge>
  );
}
