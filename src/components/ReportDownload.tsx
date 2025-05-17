
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ReportDownloadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  fileType: string;
}

export function ReportDownload({ open, onOpenChange, fileName, fileType }: ReportDownloadProps) {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  
  const handleDownload = () => {
    // Reset states for a new download
    setDownloadProgress(0);
    setDownloadComplete(false);
    
    toast({
      title: "Download Started",
      description: `${fileName} is being downloaded`
    });
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setDownloadComplete(true);
          
          toast({
            title: "Download Complete",
            description: `${fileName} has been saved to your downloads folder`
          });
          
          // Show a simulated file system notification
          const downloadNotificationHtml = `
            <div class="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-md z-50">
              <div class="flex">
                <div class="bg-blue-100 text-blue-800 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                </div>
                <div>
                  <h3 class="font-medium">File Downloaded</h3>
                  <p class="text-sm text-gray-500 mb-1">${fileName}</p>
                  <p class="text-xs text-gray-400">Saved to Downloads folder</p>
                </div>
              </div>
            </div>
          `;

          // Create a notification element
          const notificationContainer = document.createElement('div');
          notificationContainer.innerHTML = downloadNotificationHtml;
          document.body.appendChild(notificationContainer.firstElementChild as HTMLElement);

          // Remove after 5 seconds
          setTimeout(() => {
            const notificationElement = document.querySelector('.fixed.bottom-4.right-4');
            if (notificationElement) {
              document.body.removeChild(notificationElement);
            }
          }, 5000);
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Download Report</DialogTitle>
          <DialogDescription>
            {downloadComplete ? "Your download is complete" : "Your file is ready to download"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 flex flex-col items-center justify-center">
          <div className="bg-slate-100 rounded-lg p-6 w-full max-w-xs flex flex-col items-center">
            <div className="mb-3">
              {fileType === "pdf" && (
                <div className={`${downloadComplete ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} p-3 rounded-lg`}>
                  {downloadComplete ? <Check className="h-16 w-16" /> : <FileText className="h-16 w-16" />}
                </div>
              )}
              {fileType === "xlsx" && (
                <div className={`${downloadComplete ? "bg-green-100 text-green-800" : "bg-green-100 text-green-800"} p-3 rounded-lg`}>
                  {downloadComplete ? <Check className="h-16 w-16" /> : <FileText className="h-16 w-16" />}
                </div>
              )}
              {(fileType === "csv" || fileType === "html") && (
                <div className={`${downloadComplete ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"} p-3 rounded-lg`}>
                  {downloadComplete ? <Check className="h-16 w-16" /> : <FileText className="h-16 w-16" />}
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-center">{fileName}</p>
            <p className="text-xs text-slate-500 mt-1 text-center">
              {fileType.toUpperCase()} file • {Math.floor(Math.random() * 10) + 1}MB
            </p>
            
            {downloadProgress > 0 && !downloadComplete && (
              <div className="w-full mt-4">
                <Progress value={downloadProgress} className="h-2" />
                <p className="text-xs text-center mt-1">{Math.round(downloadProgress)}% complete</p>
              </div>
            )}
            
            {downloadComplete && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs text-green-800 flex items-center">
                <Check className="h-3 w-3 mr-1" /> Download complete
              </div>
            )}
          </div>
          
          <p className="text-xs text-slate-500 mt-4 text-center">
            {downloadComplete 
              ? "Your file has been saved to your downloads folder" 
              : "The file will be saved to your downloads folder"}
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {downloadComplete ? "Close" : "Cancel"}
          </Button>
          {!downloadComplete && (
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
