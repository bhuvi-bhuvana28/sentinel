
import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Reports } from "@/components/Reports";

const Index = () => {
  // Add debug logging
  useEffect(() => {
    console.log("Dashboard Index component mounted");
  }, []);
  
  return (
    <DashboardLayout>
      <Reports />
    </DashboardLayout>
  );
};

export default Index;
