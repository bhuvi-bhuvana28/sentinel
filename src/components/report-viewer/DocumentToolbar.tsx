
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Printer, Download } from "lucide-react";

interface DocumentToolbarProps {
  title: string;
  viewMode: "document" | "outline";
  onViewModeChange: (value: "document" | "outline") => void;
  onPrint: () => void;
  onDownload: () => void;
}

export function DocumentToolbar({ 
  title, 
  viewMode, 
  onViewModeChange, 
  onPrint, 
  onDownload 
}: DocumentToolbarProps) {
  return (
    <div className="bg-gray-100 p-2 border-b flex justify-between items-center">
      <div className="flex items-center">
        <FileText className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">
          {title.toLowerCase().replace(/\s+/g, '_')}.pdf
        </span>
      </div>
      <div className="flex space-x-2">
        <Tabs value={viewMode} onValueChange={(v) => onViewModeChange(v as "document" | "outline")}>
          <TabsList className="bg-gray-200">
            <TabsTrigger value="document" className="text-xs">Document</TabsTrigger>
            <TabsTrigger value="outline" className="text-xs">Outline</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={onPrint}
        >
          <Printer className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
