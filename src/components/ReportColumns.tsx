
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

// Define the Report type
export interface Report {
  id: number;
  title: string;
  type: string;
  author: string;
  created: string;
  status: string;
  pages: number;
  date: Date;
  content: string;
}

// Create columns definition
export const reportColumns: ColumnDef<Report>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "created",
    header: "Created",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant="outline" 
          className={
            status === "Final" 
              ? "bg-green-100 text-green-800 hover:bg-green-100" 
              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "pages",
    header: "Pages",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      // Access the custom props via table.options.meta
      const meta = table.options.meta as { 
        onView: (id: number) => void;
        onDownload: (id: number) => void;
      } | undefined;
      
      return (
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="p-0 h-8 w-8"
            onClick={() => meta?.onView(row.original.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="p-0 h-8 w-8"
            onClick={() => meta?.onDownload(row.original.id)}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
