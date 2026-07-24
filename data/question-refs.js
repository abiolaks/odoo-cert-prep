// Maps question IDs to their knowledge base references
// Each reference: { moduleId, topicTitle, anchor }
// Auto-generated from KNOWLEDGE_BASE structure

const QUESTION_KB_REFS = {
  // Accounting
  "acc_001": [{ moduleId: "accounting", topicTitle: "Double-Entry Bookkeeping" }],
  "acc_002": [{ moduleId: "accounting", topicTitle: "Taxes" }, { moduleId: "accounting", topicTitle: "Fiscal Positions" }],
  "acc_003": [{ moduleId: "accounting", topicTitle: "Fiscal Positions" }, { moduleId: "accounting", topicTitle: "Taxes" }],
  "acc_004": [{ moduleId: "accounting", topicTitle: "Bank Reconciliation" }],
  "acc_005": [{ moduleId: "accounting", topicTitle: "Customer Invoices" }],
  "acc_006": [{ moduleId: "accounting", topicTitle: "Inventory Valuation" }],
  "acc_007": [{ moduleId: "accounting", topicTitle: "Year-End Closing" }],
  "acc_008": [{ moduleId: "accounting", topicTitle: "Multi-Currency" }],
  "acc_009": [{ moduleId: "accounting", topicTitle: "Accounting Firms Mode" }],
  "acc_010": [{ moduleId: "accounting", topicTitle: "Customer Invoices" }],
  "acc_011": [{ moduleId: "accounting", topicTitle: "Tax Return (VAT)" }, { moduleId: "accounting", topicTitle: "Financial Reports" }],
  "acc_012": [{ moduleId: "accounting", topicTitle: "Multi-Company & Branches" }],
  "acc_013": [{ moduleId: "accounting", topicTitle: "Customer Invoices" }],
  "acc_014": [{ moduleId: "accounting", topicTitle: "Bank Reconciliation" }],
  "acc_015": [{ moduleId: "accounting", topicTitle: "Financial Reports" }],
  "acc_016": [{ moduleId: "accounting", topicTitle: "Year-End Closing" }],
  "acc_017": [{ moduleId: "accounting", topicTitle: "Customer Invoices" }],

  // CRM
  "crm_001": [{ moduleId: "crm", topicTitle: "Merge Leads & Opportunities" }],
  "crm_002": [{ moduleId: "crm", topicTitle: "Predictive Lead Scoring" }],
  "crm_003": [{ moduleId: "crm", topicTitle: "Sales Teams" }],
  "crm_004": [{ moduleId: "crm", topicTitle: "Lead Mining" }],
  "crm_005": [{ moduleId: "crm", topicTitle: "Activity Plans" }, { moduleId: "essentials", topicTitle: "Activities" }],

  // Sales
  "sales_001": [{ moduleId: "sales", topicTitle: "Invoicing Methods" }],
  "sales_002": [{ moduleId: "sales", topicTitle: "Quotations" }],
  "sales_003": [{ moduleId: "sales", topicTitle: "Products & Prices" }],
  "sales_004": [{ moduleId: "sales", topicTitle: "Other Marketplace Connectors" }, { moduleId: "sales", topicTitle: "Amazon Connector" }],
  "sales_005": [{ moduleId: "sales", topicTitle: "Quotations" }],
  "sales_006": [{ moduleId: "sales", topicTitle: "Returns & Refunds" }],

  // POS
  "pos_001": [{ moduleId: "pos", topicTitle: "Architecture" }],
  "pos_002": [{ moduleId: "pos", topicTitle: "Hardware" }, { moduleId: "general", topicTitle: "IoT" }],
  "pos_003": [{ moduleId: "pos", topicTitle: "Restaurant Features" }],
  "pos_004": [{ moduleId: "pos", topicTitle: "Payment Methods" }],

  // Inventory
  "inv_001": [{ moduleId: "inventory", topicTitle: "Shipping Configurations" }],
  "inv_002": [{ moduleId: "inventory", topicTitle: "Removal Strategies" }],
  "inv_003": [{ moduleId: "inventory", topicTitle: "Routes (Push/Pull Rules)" }],
  "inv_004": [{ moduleId: "inventory", topicTitle: "Product Tracking" }],
  "inv_005": [{ moduleId: "inventory", topicTitle: "Replenishment" }],
  "inv_006": [{ moduleId: "inventory", topicTitle: "Dropshipping & Consignment" }],
  "inv_007": [{ moduleId: "inventory", topicTitle: "Picking Methods" }],
  "inv_008": [{ moduleId: "inventory", topicTitle: "Putaway Rules" }],
  "inv_009": [{ moduleId: "inventory", topicTitle: "Barcode Operations" }, { moduleId: "inventory", topicTitle: "Barcode System" }],
  "inv_010": [{ moduleId: "inventory", topicTitle: "Barcode Nomenclatures" }],
  "inv_011": [{ moduleId: "inventory", topicTitle: "Quality Check Types" }, { moduleId: "inventory", topicTitle: "Quality Management" }],
  "inv_012": [{ moduleId: "inventory", topicTitle: "Inventory Valuation" }, { moduleId: "accounting", topicTitle: "Inventory Valuation" }],
  "inv_013": [{ moduleId: "inventory", topicTitle: "Replenishment" }],
  "inv_014": [{ moduleId: "inventory", topicTitle: "Product Management" }],
  "inv_015": [{ moduleId: "inventory", topicTitle: "Inventory Adjustments" }],

  // MRP
  "mrp_001": [{ moduleId: "mrp", topicTitle: "Bills of Materials (BoMs)" }],
  "mrp_002": [{ moduleId: "mrp", topicTitle: "Work Centers" }],
  "mrp_003": [{ moduleId: "mrp", topicTitle: "Kits" }],
  "mrp_004": [{ moduleId: "mrp", topicTitle: "By-Products" }],
  "mrp_005": [{ moduleId: "mrp", topicTitle: "Unbuild Orders" }],
  "mrp_006": [{ moduleId: "mrp", topicTitle: "Reporting" }],
  "mrp_007": [{ moduleId: "mrp", topicTitle: "Subcontracting" }],
  "mrp_008": [{ moduleId: "mrp", topicTitle: "Backorders" }],
  "mrp_009": [{ moduleId: "mrp", topicTitle: "Shop Floor" }],
  "mrp_010": [{ moduleId: "mrp", topicTitle: "Continuous Improvement" }],
  "mrp_011": [{ moduleId: "mrp", topicTitle: "Work Order Dependencies" }],

  // Purchase
  "pur_001": [{ moduleId: "purchase", topicTitle: "Blanket Orders" }],
  "pur_002": [{ moduleId: "purchase", topicTitle: "Call for Tenders" }],
  "pur_003": [{ moduleId: "purchase", topicTitle: "Control Policies" }],
  "pur_004": [{ moduleId: "purchase", topicTitle: "Reordering Rules" }, { moduleId: "inventory", topicTitle: "Replenishment" }],
  "pur_005": [{ moduleId: "purchase", topicTitle: "EDI Integration" }],
  "pur_006": [{ moduleId: "purchase", topicTitle: "Vendor Pricelists" }],

  // HR
  "hr_001": [{ moduleId: "hr", topicTitle: "Time Off" }, { moduleId: "hr", topicTitle: "Attendances" }],
  "hr_002": [{ moduleId: "hr", topicTitle: "Appraisals" }],
  "hr_003": [{ moduleId: "hr", topicTitle: "Attendances" }],
  "hr_004": [{ moduleId: "hr", topicTitle: "Recruitment" }],
  "hr_005": [{ moduleId: "hr", topicTitle: "Attendances" }],
  "hr_006": [{ moduleId: "hr", topicTitle: "Time Off" }],
  "hr_007": [{ moduleId: "hr", topicTitle: "Appraisals" }],
  "hr_008": [{ moduleId: "hr", topicTitle: "Payroll" }],
  "hr_009": [{ moduleId: "hr", topicTitle: "Fleet" }],

  // Website
  "web_001": [{ moduleId: "website", topicTitle: "Configuration" }],
  "web_002": [{ moduleId: "website", topicTitle: "eCommerce" }],
  "web_003": [{ moduleId: "website", topicTitle: "Structure" }, { moduleId: "website", topicTitle: "SEO" }],
  "web_004": [{ moduleId: "website", topicTitle: "Configuration" }],
  "web_005": [{ moduleId: "website", topicTitle: "Live Chat" }, { moduleId: "website", topicTitle: "eLearning, Forum, Blog, Live Chat" }],
  "web_006": [{ moduleId: "website", topicTitle: "Configuration" }],

  // Marketing
  "mkt_001": [{ moduleId: "marketing", topicTitle: "Email Marketing" }],
  "mkt_002": [{ moduleId: "marketing", topicTitle: "Marketing Automation" }],
  "mkt_003": [{ moduleId: "marketing", topicTitle: "Events" }],
  "mkt_004": [{ moduleId: "marketing", topicTitle: "Surveys" }],
  "mkt_005": [{ moduleId: "marketing", topicTitle: "SMS Marketing" }],
  "mkt_006": [{ moduleId: "marketing", topicTitle: "Social Marketing" }],

  // Project
  "proj_001": [{ moduleId: "project", topicTitle: "Task Management" }],
  "proj_002": [{ moduleId: "project", topicTitle: "Task Management" }],
  "proj_003": [{ moduleId: "project", topicTitle: "Timesheets" }],

  // Helpdesk
  "help_001": [{ moduleId: "helpdesk", topicTitle: "SLAs (Service Level Agreements)" }],
  "help_002": [{ moduleId: "helpdesk", topicTitle: "Advanced Features" }, { moduleId: "project", topicTitle: "Timesheets" }],

  // Productivity
  "prod_001": [{ moduleId: "productivity", topicTitle: "Spreadsheet" }],
  "prod_002": [{ moduleId: "productivity", topicTitle: "Spreadsheet" }],
  "prod_003": [{ moduleId: "productivity", topicTitle: "Sign" }],
  "prod_004": [{ moduleId: "productivity", topicTitle: "Documents" }],
  "prod_005": [{ moduleId: "productivity", topicTitle: "Calendar" }],
  "prod_006": [{ moduleId: "productivity", topicTitle: "Appointments" }],

  // Studio
  "stu_001": [{ moduleId: "studio", topicTitle: "Automation Rules" }],
  "stu_002": [{ moduleId: "studio", topicTitle: "Approval Rules" }],

  // AI
  "ai_001": [{ moduleId: "ai", topicTitle: "AI Features" }],
  "ai_002": [{ moduleId: "ai", topicTitle: "AI API Keys" }],

  // Expenses
  "exp_001": [{ moduleId: "expenses", topicTitle: "Approval Workflow" }, { moduleId: "expenses", topicTitle: "Posting & Reimbursement" }],
  "exp_002": [{ moduleId: "expenses", topicTitle: "Logging Expenses" }],
  "exp_003": [{ moduleId: "expenses", topicTitle: "Posting & Reimbursement" }],
  "exp_004": [{ moduleId: "expenses", topicTitle: "Expense Cards" }],

  // Subscriptions
  "sub_001": [{ moduleId: "subscriptions", topicTitle: "Subscriptions" }],
  "sub_002": [{ moduleId: "subscriptions", topicTitle: "Rental" }],

  // General
  "gen_001": [{ moduleId: "general", topicTitle: "Users & Access Rights" }],
  "gen_002": [{ moduleId: "general", topicTitle: "IoT" }],
  "gen_003": [{ moduleId: "general", topicTitle: "Email Communication" }],
  "gen_004": [{ moduleId: "general", topicTitle: "Developer Mode" }],

  // Cross-module
  "cross_001": [{ moduleId: "sales", topicTitle: "Products & Prices" }, { moduleId: "inventory", topicTitle: "Dropshipping & Consignment" }],
  "cross_002": [{ moduleId: "crm", topicTitle: "Lead Acquisition" }, { moduleId: "sales", topicTitle: "Quotations" }, { moduleId: "accounting", topicTitle: "Customer Invoices" }],
  "cross_003": [{ moduleId: "inventory", topicTitle: "Inventory Valuation" }, { moduleId: "accounting", topicTitle: "Inventory Valuation" }],
  "cross_004": [{ moduleId: "mrp", topicTitle: "MO Costs & WIP" }, { moduleId: "accounting", topicTitle: "Inventory Valuation" }],
  "cross_005": [{ moduleId: "pos", topicTitle: "Architecture" }, { moduleId: "accounting", topicTitle: "Journals" }],
  "cross_006": [{ moduleId: "accounting", topicTitle: "Multi-Company & Branches" }],
  "cross_007": [{ moduleId: "website", topicTitle: "Website Builder" }, { moduleId: "crm", topicTitle: "Lead Acquisition" }],
  "cross_008": [{ moduleId: "expenses", topicTitle: "Posting & Reimbursement" }, { moduleId: "accounting", topicTitle: "Customer Invoices" }],
  "cross_009": [{ moduleId: "purchase", topicTitle: "Control Policies" }, { moduleId: "accounting", topicTitle: "Vendor Bills" }],
  "cross_010": [{ moduleId: "inventory", topicTitle: "Reservation Methods" }],
  "cross_011": [{ moduleId: "crm", topicTitle: "Pipeline Management" }, { moduleId: "marketing", topicTitle: "Email Marketing" }],
  "cross_012": [{ moduleId: "project", topicTitle: "Project Management" }],
  "cross_013": [{ moduleId: "helpdesk", topicTitle: "Advanced Features" }, { moduleId: "project", topicTitle: "Task Management" }],
};

// Look up KB content for a reference
function getKBContent(ref) {
  const mod = KNOWLEDGE_BASE.find(m => m.id === ref.moduleId);
  if (!mod) return null;
  const topic = mod.topics.find(t => t.title === ref.topicTitle);
  if (!topic) return null;
  return { module: mod, topic: topic };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_KB_REFS, getKBContent };
}
