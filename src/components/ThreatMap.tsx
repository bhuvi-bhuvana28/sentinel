
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useEffect } from "react";

// Mock data for threat locations
const threatLocations = [
  { id: 1, x: 25, y: 42, size: 18, country: "United States", count: 245 },
  { id: 2, x: 40, y: 30, size: 14, country: "Russia", count: 180 },
  { id: 3, x: 80, y: 45, size: 12, country: "China", count: 156 },
  { id: 4, x: 46, y: 35, size: 10, country: "Germany", count: 89 },
  { id: 5, x: 55, y: 60, size: 8, country: "Brazil", count: 67 },
  { id: 6, x: 65, y: 30, size: 7, country: "India", count: 53 },
  { id: 7, x: 85, y: 65, size: 6, country: "Australia", count: 42 },
  { id: 8, x: 35, y: 45, size: 5, country: "United Kingdom", count: 28 },
];

export function ThreatMap() {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  
  return (
    <div className="relative h-[320px] w-full bg-slate-900 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-slate-900 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgODAwIDQwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxYTFkMmQiLz48cGF0aCBkPSJNNzY5LDIyOWwtMTEsMC4zbC03My40LDEuN2wtMTAuNC0wLjVsLTguOSwwLjVsLTQzLjQsMC4zbC0xNC45LDEuMmwtNDguNywxLjVsLTguOS0xLjVsLTI0LjEtNC40bC0zLjQtMi42bC0yLjUtMS4ybC03LjQtMC45bDEuNy0xLjlsLTAuMy0xLjRsLTYuOS0xLjJsLTEzLjQtNC44bC0yLjIsMS44bC0xLjEtMC42bC0yNS45LTAuNGwtMC45LDBsLTIuMiwwLjlsLTguNSwwLjVsLTYuNCwyLjZsLTEuMSwwbC0xLjEtMS45bC0xMi42LDAuOWwtMy43LDAuNWwtNC42LDAuMmwtNS4zLDEuOGwtMS44LDEuOGwtMTguNi0wLjVsLTMuMi0xLjRsLTEyLjUtMC4ybC0yLjQtMS4zbC0wLjQtMi41bC03LjItMC4ybC0wLjIsNS4xbC0yLjIsMS40bC0xLjMtMS45bC00LjgtMC4ybC0xLjMtMi4zTDI2NSwxOTEuN2wtMTcuOC0wLjVsLTAuOSwxLjhsMTguNiw4LjJsLTEuNywxLjVsLTUuNywwLjJsMC40LDEuNWwzLjUsMmwyLDEuNWwtMS4xLDQuMWwtNC41LDAuMmwtMTMuOC0wLjlsMy41LTEuMmwtMTctMTAuMmwtMTAuNyw0LjVsNCwxMC42bC01LjUsMTUuOVYyMzNsMi41LDkuOGwtMy43LDAuOGwtMi40LDEuNWwtNi40LDBsLTEzLjksMi42bC0yLjktMS45bC0wLjItMmwtNC45LTIuNmwtMTAuNi0wLjZsLTMuNCwtMS43bC00LjYtMTAuNGwtNy43LTMuOWwtMTYsMC44bC0yLTAuOWwtMi40LTMuNGwtNS42LTAuNGwtNS40LTMuM2wtNi4xLDEuMmwtMS43LDEuNmwtOC40LDEuNWwtOS43LDEwLjZsLTQuMSwwLjJsLTEzLjgtNS4xTDYzLDIyNy4xbC05LjMtMC42bC01LjksMi42bC0wLjYtMy41bC0xLjctMi41bC01LjEtMS4zbC0xLjYsMS42bC00LjUtMC4zTDAsMTg3LjFsMTIuNi0wLjJsMy42LTMuN2w4LjQtMS42bDc3LjMtNS4zbDAuNi0xLjZsNS45LTEuMWwxLjYtMS43bDE1LjItMi42bDAuNywxbDIuMywwLjJsNS43LTIuM2w0LjMsMC4zbDIuNS0wLjNsMi4xLTEuOWwtMC42LTQuMWwxLjEtMi4xbDEuOC0wLjVsNC41LTQuOGwtMC4zLTEuOWwyLjEtMS41bDAtNC4xbDQuNS0yLjdsLTEuNS0yLjVsMC0xLjhsMy40LTMuM2wtMS40LTIuNmwtNi45LTEuOWwtNC42LTAuMmwtLTIuNS0xLjZsLTEwLjEsMC40bC0xLjgsMS4yTDEyOSwxMzJsLTEuNS0xLjhsLTYtMS4ybC0yLjItMi44bC0xLjgtMC41bC0zLjYsMC40bC0zLjUtMy41bDEuNy0yLjZsLTAuMy0xLjVsNC44LTIuNWwtMC4yLTIuOWwxLjctMS4zbC00LjMtMi42bDEuMi0yLjRsLTEuMS0yLjVsNC4xLTEuNmwyLjQsMC4zbDIuNCwwLjdsNS4zbC0wLjZsNS44LTEuN0wxMzYuNyw5N2wtMi4xLTYuMWwyLjctMC4xbDEuOCwwLjlsMS42LDAuMmwyLjYsMS4zbDEuOC0wLjFsMS44LTAuN2wyLjMsMC4zbDEuOSwtMC4xbDAuOS0xLjJsLTAuMi0xLjVsLTIuNS0wLjlsLTIuOS0xLjlsLTIuOS0wLjFsLTEsMC43bC0xLjQtMC42bC0yLjQtMS44bC0zLjItMC44bC0xLjUsMS4xbC0wLjIsMC44bC0zLjEsMC4zbC0yLjgtMS4xbC0yLjdsMS4ybC0yLjksMS43bC0yLjctMC41bC0xLjUtMS43bC0wLjgtMi4zTDExLjEsODJsLTEuOS0wLjFsLTEuNy0xLjlsLTAuNS0yLjJMNC40LDc2TDAsNzMuNUwxLjYsNTRsMi41LTEwLjdsMi0zLjFsMC41LTIuM2wyLjIsLTEuOWwwLjYsLTIuMWwxMS42LDE5bDEuNSwyLjRsNS4yLTMuM2wxLjEtMi4xbDAuNi0yLjZsMi40LTIuM2wzLjEtMS4ybDMuOC0wLjJsMS44LDAuOGwzLDIuOWwyLDAuOWwyLjcsMC4xbC0wLjUtMS41bDIuMS0xLjFsMS44LTMuMWwyLDFsMS42LTAuM2wyLjYsLTIuMWwyLjktMWwyLTEuMmw0LjMsLTAuM2wyLjIsMC41bDIuMSwtMS4ybDEuOCwwLjJsMS44LDEuMWw3LjQsMC40bDAuOSwwLjdsMS40LC0wLjdsLTAuOC0zbDEuNi0zLjlsNS45LC0xLjFsMi40LDAuNGwyLDEuNGwyLjIsLTAuOWwzLjUtMC4zbDAuNCwtMC44bC0wLjQsLTIuOGwwLjQsLTAuOWwxLjQsLTAuN2wyLjQsLTAuMmwwLDM4MEw3NjksMjI5eiIgc3R5bGU9ImZpbGw6IzQzNDc1Qzsgb3BhY2l0eTowLjI7IiBzdHJva2U9IiM1NTYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')]"></div>
      
      {/* Threat points */}
      {threatLocations.map((threat) => (
        <div 
          key={threat.id}
          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${activePoint === threat.id ? 'z-20' : 'z-10'}`}
          style={{ 
            left: `${threat.x}%`, 
            top: `${threat.y}%`,
          }}
          onMouseEnter={() => setActivePoint(threat.id)}
          onMouseLeave={() => setActivePoint(null)}
        >
          <div 
            className={`relative rounded-full bg-red-500 animate-pulse ${activePoint === threat.id ? 'opacity-80' : 'opacity-60'}`}
            style={{ 
              width: `${threat.size}px`, 
              height: `${threat.size}px`,
            }}
          >
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
          </div>
          
          {/* Tooltip */}
          {activePoint === threat.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-slate-800 text-white text-xs rounded p-2 shadow-lg z-30 min-w-[120px]">
              <p className="font-semibold">{threat.country}</p>
              <p className="text-slate-300">Events: {threat.count}</p>
            </div>
          )}
        </div>
      ))}
      
      <div className="absolute bottom-2 right-2">
        <div className="flex items-center text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
          <span>Active threats</span>
        </div>
      </div>
    </div>
  );
}
