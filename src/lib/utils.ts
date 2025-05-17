
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy')
}

export function formatReportFileName(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '_') + '.pdf'
}

export function extractSections(content: string) {
  const sections = content.trim().split('\n\n');
  
  const findSection = (name: string) => {
    const section = sections.find(s => 
      s.toLowerCase().includes(name.toLowerCase())
    );
    return section ? section.replace(new RegExp(`## ${name}`, 'i'), '').trim() : '';
  };
  
  const title = sections[0]?.replace('# ', '') || '';
  const executiveSummary = findSection('Executive Summary');
  const keyFindings = findSection('Key Findings');
  const recommendations = findSection('Recommendations');
  
  return {
    title,
    executiveSummary,
    keyFindings,
    recommendations,
    allSections: sections
  };
}
