
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TabsContent } from "@/components/ui/tabs";
import { DocumentContent } from "./DocumentContent";
import { DocumentOutline } from "./DocumentOutline";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

interface DocumentViewProps {
  content: string;
  viewMode: "document" | "outline";
  currentPage: number;
  totalPages: number;
  status: string;
  onSwitchToDocument: () => void;
}

export function DocumentView({ 
  content, 
  viewMode, 
  currentPage, 
  totalPages, 
  status, 
  onSwitchToDocument 
}: DocumentViewProps) {
  return (
    <AspectRatio ratio={8/11} className="bg-white">
      <div className="h-full overflow-auto p-6">
        <div className="mx-auto max-w-3xl">
          <TabsContent value="document" className="h-full mt-0">
            <DocumentContent content={content} />
          </TabsContent>
          <TabsContent value="outline" className="h-full mt-0">
            <DocumentOutline content={content} onNavigate={onSwitchToDocument} />
          </TabsContent>
          
          <div className="mt-8 flex items-center justify-between">
            <DocumentStatusBadge status={status} />
            <div className="text-sm text-gray-500">Page {currentPage} of {totalPages}</div>
          </div>
        </div>
      </div>
    </AspectRatio>
  );
}
