
export const sampleReports = [
  {
    id: 1,
    title: "Monthly Security Review",
    type: "Operations",
    author: "John Smith",
    created: "May 12, 2023",
    status: "Final",
    pages: 15,
    date: new Date(2023, 4, 12),
    content: "# Monthly Security Review\nPrepared by: Security Operations Team | Date: May 12, 2023\n\n## Executive Summary\nThis report summarizes security events and incidents from the past month. We observed 215 total security events with 3 incidents requiring investigation.\n\n## Key Findings\n- Increased login attempts from non-standard locations\n- Network segmentation successfully prevented lateral movement attempts\n- Patch compliance improved by 12% from previous month\n\n## Recommendations\n- Update endpoint protection policies\n- Continue security awareness training\n- Review access controls for cloud resources"
  },
  {
    id: 2,
    title: "Compliance Audit Results",
    type: "Compliance",
    author: "Emma Johnson",
    created: "April 30, 2023",
    status: "Final",
    pages: 24,
    date: new Date(2023, 3, 30),
    content: "# Compliance Audit Results\nPrepared by: Emma Johnson, Compliance Team | Date: April 30, 2023\n\n## Executive Summary\nThis report presents the findings of our quarterly compliance audit focusing on data protection regulations and industry standards.\n\n## Key Findings\n- 98% compliance with regulatory requirements\n- Minor documentation gaps identified in access control procedures\n- Data retention policies fully implemented\n\n## Recommendations\n- Update documentation for access control procedures\n- Conduct refresher training on data handling\n- Schedule next audit for Q3 2023"
  },
  {
    id: 3,
    title: "Incident Response Report",
    type: "Incidents",
    author: "Michael Chen",
    created: "May 5, 2023",
    status: "Draft",
    pages: 12,
    date: new Date(2023, 4, 5),
    content: "# Incident Response Report\nPrepared by: Michael Chen, Security Analyst | Date: May 5, 2023\n\n## Executive Summary\nThis report details the response to suspicious network activity detected on April 28, 2023.\n\n## Incident Timeline\n- April 28, 14:23 - Initial detection of suspicious activity\n- April 28, 14:45 - Security team notified\n- April 28, 15:10 - Affected systems isolated\n- April 28, 18:30 - Root cause identified\n- April 29, 09:15 - Systems restored and verified\n\n## Root Cause Analysis\nMisconfigured firewall rule allowed unauthorized access attempts to development server.\n\n## Remediation Steps\n- Firewall configuration corrected\n- Access logs reviewed for additional compromise\n- Security rules updated to prevent similar issues"
  },
  {
    id: 4,
    title: "Vulnerability Assessment",
    type: "Assessment",
    author: "Sarah Williams",
    created: "April 15, 2023",
    status: "Final",
    pages: 18,
    date: new Date(2023, 3, 15),
    content: "# Vulnerability Assessment Report\nPrepared by: Sarah Williams, Security Engineer | Date: April 15, 2023\n\n## Executive Summary\nComprehensive vulnerability scan of network infrastructure and critical applications.\n\n## Key Findings\n### Critical Findings\n- 3 critical vulnerabilities identified in web applications\n- Outdated SSL configurations on public-facing services\n- Default credentials found on internal systems\n\n### High-Risk Findings\n- 7 high-risk vulnerabilities requiring immediate patching\n- Weak encryption settings on database servers\n- Missing security headers on web applications"
  },
  {
    id: 5,
    title: "SOC Performance Report",
    type: "Operations",
    author: "David Lee",
    created: "May 10, 2023",
    status: "Final",
    pages: 10,
    date: new Date(2023, 4, 10),
    content: "# SOC Performance Report\nPrepared by: David Lee, SOC Manager | Date: May 10, 2023\n\n## Executive Summary\nThis report evaluates the performance and effectiveness of the Security Operations Center for the past quarter.\n\n## Key Metrics\n- Average alert triage time: 4.5 minutes\n- False positive rate: 12% (3% reduction from previous quarter)\n- Mean time to resolve: 45 minutes\n- Incidents successfully contained: 100%\n\n## Areas for Improvement\n- Additional automation for common alerts\n- Enhanced correlation rules\n- Cross-training for team members"
  },
  {
    id: 6,
    title: "Ransomware Readiness Assessment",
    type: "Assessment",
    author: "James Wilson",
    created: "March 28, 2023",
    status: "Final",
    pages: 22,
    date: new Date(2023, 2, 28),
    content: "# Ransomware Readiness Assessment\nPrepared by: James Wilson, Security Consultant | Date: March 28, 2023\n\n## Executive Summary\nThis report assesses the organization's preparedness to prevent, detect, and recover from ransomware attacks.\n\n## Key Findings\n- Backup systems well-implemented with air-gapped solutions\n- Employee awareness needs improvement\n- Incident response playbooks require updates\n\n## Recommendations\n- Conduct ransomware tabletop exercise\n- Implement additional email filtering controls\n- Review and enhance backup restoration processes"
  },
  {
    id: 7,
    title: "GDPR Compliance Report",
    type: "Compliance",
    author: "Anna Martinez",
    created: "April 20, 2023",
    status: "Draft",
    pages: 28,
    date: new Date(2023, 3, 20),
    content: "# GDPR Compliance Report\nPrepared by: Anna Martinez, Privacy Officer | Date: April 20, 2023\n\n## Executive Summary\nThis report evaluates the organization's compliance with GDPR requirements and identifies areas for improvement.\n\n## Key Findings\n- Data processing activities properly documented\n- Subject access request process functioning effectively\n- Data retention policy implementation incomplete\n\n## Recommendations\n- Complete implementation of data retention policies\n- Enhance data protection impact assessment process\n- Schedule refresher training for data handlers"
  },
  {
    id: 8,
    title: "Cloud Security Posture",
    type: "Assessment",
    author: "Robert Johnson",
    created: "May 8, 2023",
    status: "Final",
    pages: 16,
    date: new Date(2023, 4, 8),
    content: "# Cloud Security Posture Assessment\nPrepared by: Robert Johnson, Cloud Security Architect | Date: May 8, 2023\n\n## Executive Summary\nThis report evaluates the security posture of cloud resources across AWS, Azure, and GCP environments.\n\n## Key Findings\n- Identity and access management controls well-implemented\n- Encryption at rest properly configured\n- Network security groups require review\n\n## Recommendations\n- Implement additional cloud security monitoring\n- Review and update network security groups\n- Enable advanced threat protection features"
  }
];
