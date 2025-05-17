
import React from "react";

interface DocumentOutlineProps {
  content: string;
  onNavigate: () => void;
}

export function DocumentOutline({ content, onNavigate }: DocumentOutlineProps) {
  const outline = generateOutline(content);
  
  return (
    <div className="p-4 border rounded-md bg-slate-50">
      <h3 className="font-medium mb-2">Document Outline</h3>
      <ul className="space-y-2">
        {outline.map((item, idx) => (
          <li 
            key={idx} 
            className={`
              pl-${(item.level-1) * 4} cursor-pointer hover:text-blue-600
              ${item.level === 1 ? 'font-medium' : ''}
              ${item.level === 3 ? 'text-sm text-gray-600' : ''}
            `}
            onClick={onNavigate}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function generateOutline(content: string) {
  if (!content) return [];
  
  const sections = content.split('\n\n');
  const outline: {title: string, level: number}[] = [];
  
  sections.forEach(section => {
    const lines = section.trim().split('\n');
    if (lines[0].startsWith('# ')) {
      outline.push({ title: lines[0].replace('# ', ''), level: 1 });
    } else if (lines[0].startsWith('## ')) {
      outline.push({ title: lines[0].replace('## ', ''), level: 2 });
    } else if (lines[0].startsWith('### ')) {
      outline.push({ title: lines[0].replace('### ', ''), level: 3 });
    }
  });
  
  return outline;
}
