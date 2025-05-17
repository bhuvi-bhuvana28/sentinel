
import React from "react";

interface DocumentContentProps {
  content: string;
}

export function DocumentContent({ content }: DocumentContentProps) {
  if (!content) return <></>;
  
  const sections = content.trim().split('\n\n');
  
  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        const lines = section.trim().split('\n');
        
        if (lines[0].startsWith('# ')) {
          // Main title
          return (
            <div key={index} className="text-center mb-8">
              <h1 className="text-2xl font-bold">{lines[0].replace('# ', '')}</h1>
              {lines.length > 1 && <p className="text-gray-500">{lines.slice(1).join(' ')}</p>}
            </div>
          );
        } else if (lines[0].startsWith('## ')) {
          // Section header
          return (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">{lines[0].replace('## ', '')}</h2>
              {lines.length > 1 && 
                <div>
                  {lines.slice(1).map((line, i) => {
                    if (line.startsWith('- ')) {
                      return <li key={i} className="ml-6">{line.replace('- ', '')}</li>;
                    }
                    return <p key={i}>{line}</p>;
                  })}
                </div>
              }
            </div>
          );
        } else if (lines[0].startsWith('### ')) {
          // Subsection
          const isRed = lines[0].toLowerCase().includes('critical');
          const isOrange = lines[0].toLowerCase().includes('high');
          
          return (
            <div key={index} className={`p-3 ${isRed ? 'bg-red-50 border border-red-200' : isOrange ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'} rounded-md`}>
              <h3 className={`font-semibold ${isRed ? 'text-red-800' : isOrange ? 'text-orange-800' : 'text-blue-800'}`}>
                {lines[0].replace('### ', '')}
              </h3>
              <ul className="list-disc pl-6">
                {lines.slice(1).map((line, i) => {
                  if (line.startsWith('- ')) {
                    return <li key={i}>{line.replace('- ', '')}</li>;
                  }
                  return null;
                })}
              </ul>
            </div>
          );
        } else {
          // Regular paragraph or list
          return (
            <div key={index}>
              {lines.map((line, i) => {
                if (line.startsWith('- ')) {
                  return <li key={i} className="ml-6">{line.replace('- ', '')}</li>;
                } else if (line.startsWith('1. ')) {
                  return <div key={i} className="ml-6 mb-2">{line}</div>;
                }
                return <p key={i} className="mb-2">{line}</p>;
              })}
            </div>
          );
        }
      })}
    </div>
  );
}
