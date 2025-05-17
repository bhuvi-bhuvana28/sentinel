
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Reports } from "@/components/Reports";
import { toast } from "@/components/ui/use-toast";
import { sampleReports } from "@/data/sampleReports";

const Index = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // Add debug logging and data loading check
  useEffect(() => {
    console.log("Dashboard Index component mounted");
    
    // Check if sample data is available
    if (sampleReports && sampleReports.length > 0) {
      console.log("Sample reports data loaded successfully:", sampleReports.length);
      setDataLoaded(true);
    } else {
      console.error("Sample reports data not available");
      toast({
        title: "Data loading issue",
        description: "Report data could not be loaded. Using fallback data.",
        variant: "destructive",
      });
    }
  }, []);
  
  return (
    <DashboardLayout>
      <Reports />
    </DashboardLayout>
  );
};

export default Index;
