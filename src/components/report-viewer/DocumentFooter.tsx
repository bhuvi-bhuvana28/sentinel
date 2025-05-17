
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DocumentFooterProps {
  created: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DocumentFooter({ 
  created, 
  currentPage, 
  totalPages, 
  onPageChange 
}: DocumentFooterProps) {
  return (
    <div className="bg-gray-100 p-2 border-t flex justify-between items-center">
      <div className="text-sm text-gray-500">
        Created: {created}
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">{currentPage} / {totalPages}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
