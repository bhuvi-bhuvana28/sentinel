
export const sampleEvents = [
  {
    id: 1,
    type: "Login Failure",
    source: "Auth Server",
    timestamp: "2023-05-15 08:32:15",
    severity: "Medium",
    details: "Multiple failed login attempts from IP 192.168.1.45 for user admin"
  },
  {
    id: 2,
    type: "Malware Detected",
    source: "Endpoint Protection",
    timestamp: "2023-05-15 09:15:22",
    severity: "Critical",
    details: "Trojan.Emotet detected on device WKSTN-214, quarantined successfully"
  },
  {
    id: 3,
    type: "Firewall Alert",
    source: "Network Security",
    timestamp: "2023-05-15 10:07:44",
    severity: "High",
    details: "Unusual outbound traffic detected to IP 203.0.113.42 on port 4444"
  },
  {
    id: 4,
    type: "System Update",
    source: "Patch Management",
    timestamp: "2023-05-15 11:30:00",
    severity: "Low",
    details: "Security patches applied to 42 systems, 3 systems pending restart"
  },
  {
    id: 5,
    type: "Data Access",
    source: "Database Server",
    timestamp: "2023-05-15 12:45:18",
    severity: "Medium",
    details: "Unusual query pattern detected from user jsmith accessing financial tables"
  },
  {
    id: 6,
    type: "Configuration Change",
    source: "Cloud Infrastructure",
    timestamp: "2023-05-15 13:20:05",
    severity: "Medium",
    details: "Security group modified to allow inbound traffic on port 22 from 0.0.0.0/0"
  },
  {
    id: 7,
    type: "DDoS Attempt",
    source: "Web Gateway",
    timestamp: "2023-05-15 14:12:33",
    severity: "Critical",
    details: "SYN flood attack detected and mitigated, targeting customer portal"
  },
  {
    id: 8,
    type: "Policy Violation",
    source: "DLP System",
    timestamp: "2023-05-15 15:05:19",
    severity: "High",
    details: "Sensitive document exfiltration attempt blocked, user: mwilliams@example.com"
  },
  {
    id: 9,
    type: "Authentication Success",
    source: "VPN Server",
    timestamp: "2023-05-15 16:22:07",
    severity: "Low",
    details: "Admin user connected from unrecognized location: Jakarta, Indonesia"
  },
  {
    id: 10,
    type: "API Abuse",
    source: "API Gateway",
    timestamp: "2023-05-15 17:08:54",
    severity: "High",
    details: "Rate limit exceeded for API key A23BX7, 1200 requests in 60 seconds"
  }
];

export const sampleReports = [
  {
    id: 1,
    title: "Monthly Security Summary",
    type: "Compliance",
    author: "System Admin",
    created: "2023-05-01",
    status: "Final",
    pages: 12,
    date: new Date(2023, 4, 1),
    content: `
      # Monthly Security Summary
      
      ## Executive Summary
      This month saw a 15% decrease in overall security incidents compared to the previous month. The implementation of new authentication policies has proven effective in reducing unauthorized access attempts.
      
      ## Key Findings
      - 87% of all systems are fully patched (up from 72%)
      - User security training completion rate: 94%
      - 3 critical vulnerabilities remediated
      - Average time to detect: 45 minutes (improved by 12%)
      
      ## Recommendations
      1. Continue enforcement of MFA for all privileged accounts
      2. Complete network segmentation project for development environments
      3. Update incident response playbooks for ransomware scenarios
    `
  },
  {
    id: 2,
    title: "Incident Response Report",
    type: "Incidents",
    author: "Security Team",
    created: "2023-04-28",
    status: "Draft",
    pages: 8,
    date: new Date(2023, 3, 28),
    content: `
      # Incident Response Report: Email Phishing Campaign
      
      ## Incident Overview
      On April 25, 2023, the security team detected a sophisticated phishing campaign targeting finance department employees. The campaign used spoofed emails appearing to come from the CFO requesting urgent wire transfers.
      
      ## Impact Assessment
      - 15 employees received the phishing email
      - 3 employees clicked the malicious link
      - 1 employee entered credentials on the fake login page
      - No financial loss occurred due to quick response
      
      ## Remediation Actions
      1. Reset passwords for affected accounts
      2. Block malicious domains in email gateway
      3. Deploy security awareness reminder to all staff
      4. Review and enhance authorization procedures for financial transactions
    `
  },
  {
    id: 3,
    title: "Network Penetration Test Results",
    type: "Assessment",
    author: "External Vendor",
    created: "2023-04-15",
    status: "Final",
    pages: 24,
    date: new Date(2023, 3, 15),
    content: `
      # Network Penetration Test Report
      
      ## Scope of Assessment
      A comprehensive penetration test was performed against the organization's external network infrastructure, including internet-facing applications, VPN endpoints, and email gateways.
      
      ## Vulnerability Summary
      - Critical: 2 findings
      - High: 5 findings
      - Medium: 8 findings
      - Low: 12 findings
      
      ## Critical Findings
      1. CVE-2023-1234: Remote code execution vulnerability in web application server
      2. Default credentials on publicly accessible management interface
      
      ## Remediation Timeline
      - Critical: Immediate (0-7 days)
      - High: Short-term (7-30 days)
      - Medium: Medium-term (30-90 days)
      - Low: Based on operational priorities
    `
  },
  {
    id: 4,
    title: "Vulnerability Assessment",
    type: "Assessment",
    author: "Security Team",
    created: "2023-04-10",
    status: "Final",
    pages: 18,
    date: new Date(2023, 3, 10),
    content: `
      # Vulnerability Assessment Report
      
      ## Executive Summary
      This report presents the findings of a comprehensive vulnerability assessment conducted on our network infrastructure and critical systems. The assessment identified several vulnerabilities that require attention, with 3 critical, 8 high, and 12 medium-risk issues discovered.
      
      ## Scope of Assessment
      - Internal network infrastructure (10.0.0.0/8)
      - External-facing web applications
      - VPN endpoints and remote access systems
      - Active Directory environment
      - Database servers and applications
      
      ## Key Findings
      
      ### Critical Findings
      - CVE-2023-1234: Remote code execution vulnerability in web application
      - Unpatched database servers with publicly accessible endpoints
      - Default credentials on multiple network devices
      
      ### High-Risk Findings
      - Outdated SSL/TLS configurations on public websites
      - Missing security patches on Windows servers
      - Weak password policies in Active Directory
      - Insecure file permissions on sensitive data
      
      ## Remediation Priorities
      1. Immediate (0-7 days): Apply patches for critical vulnerabilities
      2. Short-term (7-30 days): Address high-risk findings
      3. Medium-term (30-90 days): Resolve medium-risk issues
      4. Long-term (90+ days): Implement process improvements
    `
  },
  {
    id: 5,
    title: "Compliance Audit Results",
    type: "Compliance",
    author: "Compliance Officer",
    created: "2023-04-05",
    status: "Final",
    pages: 32,
    date: new Date(2023, 3, 5),
    content: `
      # Compliance Audit Report
      
      ## Audit Scope
      This audit assessed compliance with PCI DSS 4.0 and ISO 27001:2022 requirements across all business operations, with special focus on data handling procedures and access controls.
      
      ## Compliance Status
      - PCI DSS: 94% compliant (improved from 87%)
      - ISO 27001: 91% compliant (improved from 85%)
      
      ## Key Findings
      1. Access review processes need formalization
      2. Encryption of data at rest incomplete for legacy systems
      3. Third-party vendor assessment program requires enhancement
      4. Business continuity testing documentation incomplete
      
      ## Recommendations
      - Implement automated access review tools by Q3
      - Complete encryption rollout for remaining systems by Q4
      - Enhance vendor risk management program with continuous monitoring
      - Schedule quarterly BC/DR testing with full documentation
    `
  },
  {
    id: 6,
    title: "Weekly Alert Summary",
    type: "Operations",
    author: "System Admin",
    created: "2023-05-07",
    status: "Draft",
    pages: 5,
    date: new Date(2023, 4, 7),
    content: `
      # Weekly Alert Summary
      
      ## Alert Metrics
      Total alerts generated: 1,247
      - Critical: 12 (1%)
      - High: 78 (6%)
      - Medium: 356 (29%)
      - Low: 801 (64%)
      
      ## Alert Resolution
      - Auto-resolved: 965 (77%)
      - Manually resolved: 245 (20%)
      - False positives: 152 (12%)
      - Still investigating: 37 (3%)
      
      ## Notable Incidents
      1. Brute force authentication attempts against admin portal (May 4, 2023)
      2. Unusual data transfer patterns from finance department workstation (May 5, 2023)
      3. Multiple failed API authentication attempts from development environment (May 6, 2023)
      
      ## Recommendations
      - Review and tune alerting thresholds for network traffic anomalies
      - Investigate recurring false positives from development environment
      - Update alert routing rules for critical database events
    `
  },
  {
    id: 7,
    title: "User Access Review",
    type: "Compliance",
    author: "IT Department",
    created: "2023-04-22",
    status: "Final",
    pages: 15,
    date: new Date(2023, 3, 22),
    content: `
      # User Access Review Report
      
      ## Review Scope
      This review examined access rights for all users across core systems including Active Directory, ERP, CRM, financial systems, and cloud services.
      
      ## Key Findings
      1. 42 accounts identified with excessive privileges
      2. 18 accounts for former employees still active
      3. 27 service accounts with password age > 365 days
      4. 35 users with direct system access bypassing PAM solution
      
      ## Changes Implemented
      - Revoked access for separated employees
      - Implemented role-based access for 85% of users
      - Removed direct admin access for 23 accounts
      - Updated password rotation policy for service accounts
      
      ## Recommendations
      - Complete role-based access implementation for remaining 15%
      - Integrate HR system with IAM for automated access provisioning/deprovisioning
      - Implement just-in-time access for privileged accounts
      - Configure alerts for unauthorized privilege escalation
    `
  },
  {
    id: 8,
    title: "DDoS Attack Analysis",
    type: "Incidents",
    author: "Security Team",
    created: "2023-04-18",
    status: "Final",
    pages: 7,
    date: new Date(2023, 3, 18),
    content: `
      # DDoS Attack Analysis Report
      
      ## Incident Overview
      On April 15, 2023, our customer-facing web applications experienced a distributed denial-of-service (DDoS) attack lasting approximately 3 hours (10:15 AM - 1:22 PM EDT).
      
      ## Attack Characteristics
      - Attack type: HTTP flood + TCP SYN flood
      - Peak traffic: 24 Gbps / 15 Mpps
      - Source IPs: >8,500 unique addresses (primarily compromised IoT devices)
      - Geographic distribution: 65% Asia, 20% Europe, 15% North America
      
      ## Mitigation Actions
      1. Activated DDoS protection service at 10:23 AM
      2. Implemented rate limiting and traffic filtering
      3. Scaled up resources on cloud infrastructure
      4. Blocked traffic from non-essential geographies temporarily
      
      ## Impact Assessment
      - 42 minutes of degraded performance
      - 18 minutes of complete outage for main website
      - API services remained operational with increased latency
      - No data breach or systems compromise detected
      
      ## Prevention Measures
      - Updated DDoS playbook with lessons learned
      - Enhanced traffic monitoring thresholds
      - Implemented additional edge caching
      - Conducted tabletop exercise for future attacks
    `
  }
];
