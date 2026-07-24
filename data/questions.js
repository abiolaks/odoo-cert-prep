// Odoo 19 Functional Certification — Practice Questions
// 200+ questions in the actual exam style
// Scoring: +1 correct, −0.5 wrong, 0 unanswered

const QUESTIONS = [
  // ==================== ACCOUNTING ====================
  {
    id: "acc_001",
    module: "accounting",
    topic: "Double-Entry Bookkeeping",
    question: "In Odoo's double-entry bookkeeping system, what happens when a customer invoice is validated?",
    options: [
      "A manual journal entry must be created by the accountant",
      "Odoo automatically creates the underlying journal entries",
      "Only the invoice is recorded — journal entries are created at payment",
      "The invoice is recorded and the user must manually post it to the general ledger"
    ],
    correct: [1],
    explanation: "Odoo automatically creates all underlying journal entries for every accounting transaction — customer invoices, vendor bills, POS orders, expenses, and inventory valuations. No manual journal entry is needed."
  },
  {
    id: "acc_002",
    module: "accounting",
    topic: "Tax Configuration",
    question: "Which of the following are supported tax features in Odoo 19 Accounting? (Choose all that apply)",
    options: [
      "Cash basis taxes",
      "Withholding taxes",
      "VAT verification (VIES)",
      "Progressive income tax brackets"
    ],
    correct: [0, 1, 2],
    explanation: "Odoo supports cash basis taxes, withholding taxes, and VAT verification (VIES). Progressive income tax brackets are not an Odoo feature."
  },
  {
    id: "acc_003",
    module: "accounting",
    topic: "Fiscal Positions",
    question: "A company sells to both domestic customers and EU customers. Domestic sales use 20% VAT. EU B2B sales should use reverse-charge (0% VAT). What should be configured?",
    options: [
      "Create two separate products for domestic and EU sales",
      "Create a fiscal position that maps domestic VAT to reverse-charge for EU customers",
      "Manually change the tax on each EU invoice",
      "Create separate journals for domestic and EU sales"
    ],
    correct: [1],
    explanation: "Fiscal positions automatically map taxes and accounts based on customer/supplier characteristics. When a transaction involves specific conditions (e.g., EU customer), the fiscal position substitutes taxes (domestic VAT → reverse-charge) and remaps accounts."
  },
  {
    id: "acc_004",
    module: "accounting",
    topic: "Bank Reconciliation",
    question: "Which providers does Odoo 19 support for automatic bank synchronization? (Choose all that apply)",
    options: [
      "Ponto",
      "Basiq",
      "Plaid",
      "Yodlee"
    ],
    correct: [0, 1],
    explanation: "Odoo 19 directly connects with banking institutions via Ponto and Basiq to automatically import all transactions."
  },
  {
    id: "acc_005",
    module: "accounting",
    topic: "Customer Invoices",
    question: "A customer wants to pay in three installments over 90 days. What feature should be configured?",
    options: [
      "Credit notes",
      "Deferred revenues",
      "Payment terms with installment plans",
      "Pro-forma invoices"
    ],
    correct: [2],
    explanation: "Payment terms and installment plans allow configuring due dates across multiple installments. This is set on the customer invoice."
  },
  {
    id: "acc_006",
    module: "accounting",
    topic: "Inventory Valuation",
    question: "Which inventory valuation methods are supported in Odoo 19? (Choose all that apply)",
    options: [
      "Standard Price",
      "Average Cost (AVCO)",
      "First In First Out (FIFO)",
      "Last In First Out (LIFO) for valuation"
    ],
    correct: [0, 1, 2],
    explanation: "Odoo supports Standard Price, Average Cost (AVCO), and FIFO. While LIFO is available as a removal strategy for physical picking, it is not an accounting valuation method in Odoo."
  },
  {
    id: "acc_007",
    module: "accounting",
    topic: "Retained Earnings",
    question: "At fiscal year-end, what must be done to close the books and carry forward retained earnings in Odoo?",
    options: [
      "A year-end closing journal entry must be manually created",
      "Odoo automatically calculates current year earnings in real-time — no year-end journal is required",
      "The accountant must run the 'Close Fiscal Year' wizard",
      "All accounts must be zeroed out and reopened"
    ],
    correct: [1],
    explanation: "Odoo calculates current year earnings in real-time. The P&L balance automatically appears on the balance sheet report — no explicit closing entry or rollover is required for reporting purposes."
  },
  {
    id: "acc_008",
    module: "accounting",
    topic: "Multi-Currency",
    question: "When does Odoo generate currency gains and losses in a multi-currency environment?",
    options: [
      "When the invoice is created",
      "When the payment is received",
      "After reconciling the journal items",
      "At fiscal year-end only"
    ],
    correct: [2],
    explanation: "Currency gains and losses are generated after reconciling the journal items. Every transaction stores both the company currency value AND the foreign currency value."
  },
  {
    id: "acc_009",
    module: "accounting",
    topic: "Accounting Firms Mode",
    question: "When Accounting Firms Mode is enabled, which of the following changes occur? (Choose all that apply)",
    options: [
      "Document sequences become editable on all documents",
      "Total (tax incl.) field appears for faster encoding",
      "Invoice Date and Bill Date are pre-filled",
      "All reports become read-only"
    ],
    correct: [0, 1, 2],
    explanation: "Accounting Firms Mode (Accounting → Configuration → Settings) makes document sequences editable, shows the Total field, and pre-fills dates."
  },
  {
    id: "acc_010",
    module: "accounting",
    topic: "Deferred Revenues",
    question: "A company receives €12,000 for a 12-month service contract paid upfront. How should this be handled?",
    options: [
      "Record all €12,000 as revenue immediately",
      "Record as deferred revenue and recognize €1,000 per month",
      "Record as a credit note until the service is delivered",
      "Split into 12 separate invoices"
    ],
    correct: [1],
    explanation: "Deferred revenues spread revenue recognition across periods. The €12,000 is recorded as deferred revenue and recognized at €1,000 per month over the contract period."
  },
  {
    id: "acc_011",
    module: "accounting",
    topic: "Tax Return",
    question: "How does Odoo compute the tax return (VAT report)?",
    options: [
      "It sums all tax amounts from manually entered journal entries",
      "It computes all accounting transactions for the specific tax period and uses these totals to calculate the tax obligation",
      "It exports data to an external tax calculator",
      "It only includes transactions marked as 'tax-relevant' by the user"
    ],
    correct: [1],
    explanation: "Odoo computes all accounting transactions for the specific tax period and uses these totals to calculate the tax obligation. Depending on localization, an XML version may be generated for upload to tax authorities."
  },
  {
    id: "acc_012",
    module: "accounting",
    topic: "Branches",
    question: "In a multi-company setup with branches, which of the following statements are TRUE? (Choose all that apply)",
    options: [
      "The parent's chart of accounts applies to all branches",
      "Each branch can have its own fiscal localization independent of the parent",
      "Branches manage their own dedicated journals",
      "The parent manages a common fiscal period and lock dates"
    ],
    correct: [0, 2, 3],
    explanation: "The parent's chart of accounts, main currency, and taxes apply to all branches. Branches manage their own journals. The parent manages the common fiscal period. Fiscal localization is set on the parent company."
  },

  // ==================== CRM ====================
  {
    id: "crm_001",
    module: "crm",
    topic: "Pipeline Management",
    question: "When should you NOT merge leads or opportunities in Odoo CRM?",
    options: [
      "When both leads are active and from the same company",
      "When the leads are lost",
      "When the contacts are different people within the same organization",
      "When both leads have the same contact information"
    ],
    correct: [1],
    explanation: "Do NOT merge when: leads are lost, contacts differ within an organization, duplicates involve multiple salespersons, or contact info is similar but not exact. Lost leads should be restored before merging."
  },
  {
    id: "crm_002",
    module: "crm",
    topic: "Lead Scoring",
    question: "Predictive lead scoring in Odoo CRM does which of the following?",
    options: [
      "Only scores leads based on manual rules",
      "Uses probability scoring to evaluate lead quality and can be manually overridden",
      "Requires an external AI service subscription",
      "Is only available for opportunities, not leads"
    ],
    correct: [1],
    explanation: "Predictive lead scoring uses probability-based evaluation of lead quality. Users can manually change the probability if needed. It works with rule-based assignment."
  },
  {
    id: "crm_003",
    module: "crm",
    topic: "Sales Teams",
    question: "What is the effect of enabling 'multi teams' for a salesperson in Odoo CRM?",
    options: [
      "The salesperson can only view opportunities from their primary team",
      "The salesperson can belong to multiple teams simultaneously",
      "The salesperson's opportunities are automatically split among teams",
      "The salesperson must switch teams manually for each opportunity"
    ],
    correct: [1],
    explanation: "Enable multi-teams allows salespeople to belong to multiple teams simultaneously, sharing their pipeline across teams."
  },
  {
    id: "crm_004",
    module: "crm",
    topic: "Lead Mining",
    question: "What is required to use the Lead Mining feature in Odoo CRM?",
    options: [
      "It is a free built-in feature",
      "It requires configuration and uses IAP credits (paid)",
      "It requires a third-party plugin",
      "It only works with email aliases"
    ],
    correct: [1],
    explanation: "Lead Mining is a paid feature requiring configuration and IAP (In-App Purchase) credits to generate leads from external sources."
  },
  {
    id: "crm_005",
    module: "crm",
    topic: "Activities",
    question: "What are Activity Plans in Odoo CRM used for?",
    options: [
      "Tracking employee working hours",
      "Bundling multiple activities together for streamlined execution",
      "Planning marketing campaigns",
      "Creating project milestones"
    ],
    correct: [1],
    explanation: "Activity plans bundle multiple activities for streamlined execution. Activities can also chain: 'Suggest the next activity' and 'Trigger the next activity'."
  },

  // ==================== SALES ====================
  {
    id: "sales_001",
    module: "sales",
    topic: "Invoicing Methods",
    question: "A construction company wants to bill customers at defined project checkpoints rather than on delivery. Which invoicing method should they use?",
    options: [
      "Down payments",
      "Pro-forma invoices",
      "Invoice based on project milestones",
      "Time and materials invoicing"
    ],
    correct: [2],
    explanation: "Project milestones allow billing at defined checkpoints. Down payments are upfront requests. Time & materials invoices based on actual work performed. Pro-forma invoices are draft invoices without accounting impact."
  },
  {
    id: "sales_002",
    module: "sales",
    topic: "Quotations",
    question: "Which tab on a quotation contains the Invoicing settings?",
    options: [
      "Order Lines tab",
      "Optional Products tab",
      "Other Info tab",
      "Journal Items tab"
    ],
    correct: [2],
    explanation: "The Other Info tab contains four sections: Sales (salesperson, team, campaign), Delivery (shipping address, delivery method), Invoicing (billing settings, invoicing policy), and Tracking (source tracking, UTM parameters)."
  },
  {
    id: "sales_003",
    module: "sales",
    topic: "Pricelists",
    question: "Which of the following can be configured in an Odoo pricelist? (Choose all that apply)",
    options: [
      "Multiple price levels per product",
      "Currency-specific pricing",
      "Configurable price computation rules",
      "Automatic price matching with competitors"
    ],
    correct: [0, 1, 2],
    explanation: "Pricelists support multiple price levels per product with configurable rules, multi-currency support, and various computation methods. They do not automatically match competitor prices."
  },
  {
    id: "sales_004",
    module: "sales",
    topic: "Marketplace Connectors",
    question: "Which marketplaces does Odoo 19 provide native connectors for? (Choose all that apply)",
    options: [
      "Amazon",
      "eBay",
      "Shopee",
      "TikTok Shop"
    ],
    correct: [0, 2, 3],
    explanation: "Odoo 19 provides native connectors for Amazon, Shopee, Lazada, and TikTok Shop. eBay is not listed as a native connector."
  },
  {
    id: "sales_005",
    module: "sales",
    topic: "PDF Quote Builder",
    question: "The PDF Quote Builder in Odoo Sales allows which of the following? (Choose all that apply)",
    options: [
      "Dynamic form fields in the PDF",
      "Adding additional PDFs to the quote",
      "Product-linked PDFs and URLs",
      "Real-time collaborative editing with the customer"
    ],
    correct: [0, 1, 2],
    explanation: "The PDF Quote Builder supports dynamic form fields, adding additional PDFs, and product-linked PDFs/URLs. It does not support real-time collaborative editing."
  },
  {
    id: "sales_006",
    module: "sales",
    topic: "Returns",
    question: "When a customer returns a product in Odoo Sales, what documents are generated?",
    options: [
      "A new purchase order for the returned goods",
      "A return order with optional credit note/refund",
      "Only a stock move — no financial document is generated",
      "A new sales order with negative quantities"
    ],
    correct: [1],
    explanation: "Returns generate a return order with an associated credit note/refund workflow. The stock move reverses, and the financial impact is handled through the credit note."
  },

  // ==================== POS ====================
  {
    id: "pos_001",
    module: "pos",
    topic: "Architecture",
    question: "What happens to Odoo POS operations during a temporary network outage?",
    options: [
      "The POS terminal shuts down until the network is restored",
      "The POS continues functioning with offline capability",
      "Only card payments work — cash operations are blocked",
      "A backup server must be manually activated"
    ],
    correct: [1],
    explanation: "Odoo POS is built to maintain functionality even during temporary network outages. It runs in the browser and operates offline, syncing when the connection is restored."
  },
  {
    id: "pos_002",
    module: "pos",
    topic: "Hardware",
    question: "What is the purpose of the IoT Box in Odoo POS?",
    options: [
      "To store all POS transaction data locally",
      "To connect and manage hardware devices like printers, scales, and displays",
      "To provide internet connectivity to the POS terminal",
      "To process credit card payments"
    ],
    correct: [1],
    explanation: "The IoT Box connects and manages hardware devices including receipt printers, scales, customer displays, electronic shelf labels, and other peripherals."
  },
  {
    id: "pos_003",
    module: "pos",
    topic: "Restaurant Features",
    question: "Which features are specific to the Odoo POS restaurant mode? (Choose all that apply)",
    options: [
      "Floor plan management",
      "Table management",
      "Tip handling",
      "Inventory adjustments"
    ],
    correct: [0, 1, 2],
    explanation: "Floor plan management, table management, and tip handling are restaurant-specific features. Inventory adjustments are a general inventory feature, not POS-specific."
  },
  {
    id: "pos_004",
    module: "pos",
    topic: "Payment Methods",
    question: "Which payment terminal providers are integrated with Odoo 19 POS? (Choose all that apply)",
    options: [
      "Adyen",
      "Square",
      "Stripe",
      "Worldline"
    ],
    correct: [0, 2, 3],
    explanation: "Odoo POS supports Adyen, Stripe, Worldline, plus Ingenico, Mercado Pago, Mollie, Viva.com, SIX, Tyro, DPO Pay, Pine Labs, QFPay, and Razorpay. Square is not listed."
  },

  // ==================== INVENTORY ====================
  {
    id: "inv_001",
    module: "inventory",
    topic: "Shipping Configurations",
    question: "In three-step receiving, what are the steps?",
    options: [
      "Supplier → Stock → Quality → Customer",
      "Supplier → Input → Quality → Stock",
      "Supplier → Quality → Packing → Stock",
      "Supplier → Input → Packing → Stock"
    ],
    correct: [1],
    explanation: "Three-step receiving: Supplier → Input → Quality → Stock. Three-step delivery: Stock → Packing → Output → Customer."
  },
  {
    id: "inv_002",
    module: "inventory",
    topic: "Removal Strategies",
    question: "A food distributor needs to ensure products closest to expiration are shipped first. Which removal strategy should they use?",
    options: [
      "FIFO",
      "LIFO",
      "FEFO",
      "Closest location"
    ],
    correct: [2],
    explanation: "FEFO (First Expired, First Out) ships items closest to expiration first. This requires expiration dates to be configured on the products."
  },
  {
    id: "inv_003",
    module: "inventory",
    topic: "Routes",
    question: "What is the difference between push rules and pull rules in Odoo Inventory routes?",
    options: [
      "Push rules are for sales; pull rules are for purchases",
      "Push rules automatically move products to the next location after a trigger; pull rules generate upstream procurement needs",
      "Push rules are used for incoming shipments; pull rules for outgoing shipments",
      "There is no difference — they are the same feature"
    ],
    correct: [1],
    explanation: "Push rules automatically move products to the next location after a triggering operation completes. Pull rules generate upstream needs (procurement) when stock is required downstream."
  },
  {
    id: "inv_004",
    module: "inventory",
    topic: "Product Tracking",
    question: "Which tracking methods are available for products in Odoo Inventory? (Choose all that apply)",
    options: [
      "Serial numbers (unique per item)",
      "Lot numbers (batch/group tracking)",
      "RFID tags only",
      "Expiration dates"
    ],
    correct: [0, 1, 3],
    explanation: "Products can be tracked by serial numbers (individual items) and lot numbers (batches). Expiration dates can also be tracked, enabling FEFO. RFID is a scanning technology, not a tracking method."
  },
  {
    id: "inv_005",
    module: "inventory",
    topic: "Replenishment",
    question: "A product should be ordered from a vendor ONLY when a confirmed sales order requires it. Which replenishment strategy should be used?",
    options: [
      "Reordering rules with minimum stock",
      "Make To Order (MTO)",
      "Just In Time scheduling",
      "Manual reordering"
    ],
    correct: [1],
    explanation: "Make To Order (MTO) procures or manufactures only when a sales order is confirmed. Reordering rules use min/max stock levels. JIT triggers procurement exactly when needed."
  },
  {
    id: "inv_006",
    module: "inventory",
    topic: "Dropshipping",
    question: "How does dropshipping work in Odoo?",
    options: [
      "Products are shipped to a warehouse, then forwarded to the customer",
      "A sales order automatically triggers a purchase order, and the supplier ships directly to the customer",
      "The customer picks up the product directly from the supplier's location",
      "Products are shipped in multiple drops over time"
    ],
    correct: [1],
    explanation: "Dropshipping: a sales order triggers a purchase order to the supplier, who ships directly to the customer. The goods never enter your warehouse."
  },
  {
    id: "inv_007",
    module: "inventory",
    topic: "Picking Methods",
    question: "A warehouse wants to group picking operations by cut-off times and carrier schedules. Which method should they use?",
    options: [
      "Batch picking",
      "Cluster picking",
      "Wave transfers",
      "Cross-docking"
    ],
    correct: [2],
    explanation: "Wave transfers group and release picking tasks in waves based on cut-off times, carrier schedules, or priorities. Batch picking groups multiple operations. Cluster picking organizes by warehouse zones."
  },
  {
    id: "inv_008",
    module: "inventory",
    topic: "Putaway Rules",
    question: "What do Putaway Rules do in Odoo Inventory?",
    options: [
      "Remove expired products from inventory",
      "Automatically direct incoming products to specific storage locations",
      "Calculate optimal reorder points",
      "Generate shipping labels"
    ],
    correct: [1],
    explanation: "Putaway rules automatically direct incoming products to specific storage locations based on product attributes, quantities, or source. They reduce manual decision-making during receiving."
  },

  // ==================== MANUFACTURING ====================
  {
    id: "mrp_001",
    module: "mrp",
    topic: "Bills of Materials",
    question: "A finished product contains a sub-assembly that is itself manufactured with its own BoM. What is this called?",
    options: [
      "Kit manufacturing",
      "Multi-level Bill of Materials",
      "By-product manufacturing",
      "Subcontracting"
    ],
    correct: [1],
    explanation: "Multi-level BoMs support hierarchical structures where finished products contain sub-assemblies that are themselves manufactured items with their own BoMs."
  },
  {
    id: "mrp_002",
    module: "mrp",
    topic: "Work Centers",
    question: "What information is configured on a Work Center in Odoo Manufacturing? (Choose all that apply)",
    options: [
      "Capacity (parallel operations)",
      "Efficiency ratings",
      "Cost per hour",
      "Employee salary information"
    ],
    correct: [0, 1, 2],
    explanation: "Work centers define capacity (how many parallel operations), efficiency ratings (affecting duration), and cost per hour (for MO cost computation). Employee salaries are handled in the Payroll module."
  },
  {
    id: "mrp_003",
    module: "mrp",
    topic: "Kits vs Manufacturing",
    question: "What is the key difference between a Kit and a manufactured product?",
    options: [
      "Kits cost less to produce",
      "Kits are assembled at delivery time without a manufacturing order, while manufactured products go through MOs",
      "Kits can only contain up to 3 components",
      "Kits are only used for B2C sales"
    ],
    correct: [1],
    explanation: "Kits are groups of components shipped together but NOT assembled through a manufacturing order. They're assembled at delivery time. Manufactured products require an MO with a BoM."
  },
  {
    id: "mrp_004",
    module: "mrp",
    topic: "By-Products",
    question: "In a manufacturing process, sawdust is produced alongside wooden furniture. How should this be handled in Odoo?",
    options: [
      "Record it as scrap",
      "Configure it as a by-product on the BoM",
      "Create a separate manufacturing order for the sawdust",
      "Ignore it — by-products are not tracked in Odoo"
    ],
    correct: [1],
    explanation: "By-products are materials produced alongside the primary product. They appear on the BoM and are received into inventory when the MO is completed."
  },
  {
    id: "mrp_005",
    module: "mrp",
    topic: "Unbuild Orders",
    question: "When would you use an Unbuild Order? (Choose all that apply)",
    options: [
      "To return components to inventory from a finished product",
      "To scrap a defective finished product",
      "To disassemble a product for recycling or rework",
      "To cancel a manufacturing order before it starts"
    ],
    correct: [0, 2],
    explanation: "Unbuild orders reverse manufacturing — disassemble finished products back into components. Used for returns, rework, recycling, or transferring components. To cancel an MO before it starts, simply cancel it. Scrap is tracked separately."
  },
  {
    id: "mrp_006",
    module: "mrp",
    topic: "OEE",
    question: "What does OEE (Overall Equipment Effectiveness) measure? (Choose all that apply)",
    options: [
      "Availability",
      "Performance",
      "Quality",
      "Employee satisfaction"
    ],
    correct: [0, 1, 2],
    explanation: "OEE measures work center productivity across three dimensions: Availability (uptime), Performance (speed vs ideal), and Quality (good output vs total). It's a standard manufacturing KPI."
  },
  {
    id: "mrp_007",
    module: "mrp",
    topic: "Subcontracting",
    question: "In dropship subcontracting, what happens to the raw materials?",
    options: [
      "They are shipped from your warehouse to the subcontractor",
      "They are shipped directly from a vendor to the subcontractor, bypassing your warehouse",
      "The subcontractor purchases the materials themselves",
      "No raw materials are involved in dropship subcontracting"
    ],
    correct: [1],
    explanation: "In dropship to subcontractor, raw materials ship directly from vendor to subcontractor, bypassing your warehouse entirely. This streamlines supply chains where materials go straight to the processor."
  },

  // ==================== PURCHASE ====================
  {
    id: "pur_001",
    module: "purchase",
    topic: "Blanket Orders",
    question: "A company has negotiated a year-long agreement with a supplier for fixed pricing on raw materials. What purchase feature should they use?",
    options: [
      "Request for Quotation",
      "Call for Tenders",
      "Blanket Order",
      "Vendor Pricelist"
    ],
    correct: [2],
    explanation: "Blanket Orders are long-term purchasing agreements with pre-negotiated terms, pricing, and validity periods. They lock in pricing over time and streamline repeat ordering."
  },
  {
    id: "pur_002",
    module: "purchase",
    topic: "Call for Tenders",
    question: "What is the correct workflow for a Call for Tenders?",
    options: [
      "Create RFQ → Send → Receive → Convert to PO",
      "Create Tender → Distribute to vendors → Compare responses → Select winner → Convert to PO",
      "Create PO → Send → Receive goods → Pay",
      "Create Blanket Order → Release → Receive → Pay"
    ],
    correct: [1],
    explanation: "Call for Tenders: create tender documentation, distribute to selected vendors, compare responses side-by-side, select winning bid, convert to purchase order."
  },
  {
    id: "pur_003",
    module: "purchase",
    topic: "Control Policies",
    question: "A company wants to ensure vendor bills are only paid for quantities actually received, not ordered. Which control policy should be used?",
    options: [
      "Ordered quantities",
      "Received quantities",
      "Invoice quantities",
      "Approved quantities"
    ],
    correct: [1],
    explanation: "Control policies determine how vendor bills match against POs. 'Ordered quantities' controls based on what was ordered. 'Received quantities' controls based on what was received — preventing payment for undelivered goods."
  },
  {
    id: "pur_004",
    module: "purchase",
    topic: "Reordering Rules",
    question: "Which parameters are part of a reordering rule in Odoo Purchase? (Choose all that apply)",
    options: [
      "Minimum quantity",
      "Maximum quantity",
      "Preferred vendor",
      "Payment terms"
    ],
    correct: [0, 1, 2],
    explanation: "Reordering rules include min/max quantity, replenishment method (buy or manufacture), lead time, and preferred vendor. Payment terms are configured on vendor records or POs, not in reordering rules."
  },
  {
    id: "pur_005",
    module: "purchase",
    topic: "EDI",
    question: "What does EDI enable in Odoo Purchase?",
    options: [
      "Email delivery of purchase orders",
      "Electronic Data Interchange: automated import/export of purchase/sales orders between systems",
      "Electronic document imaging for vendor bills",
      "Enhanced delivery instructions for carriers"
    ],
    correct: [1],
    explanation: "EDI (Electronic Data Interchange) enables automated import of purchase orders from customer systems into Odoo as sales orders, and vice versa. It streamlines B2B transaction flows."
  },

  // ==================== HR ====================
  {
    id: "hr_001",
    module: "hr",
    topic: "Time Off",
    question: "What conflict types does the Time Off Ledger resolve? (Choose all that apply)",
    options: [
      "Forgot to log into work",
      "Forgot to request time off",
      "Time off request was unapproved",
      "Salary miscalculation"
    ],
    correct: [0, 1, 2],
    explanation: "The Time Off Ledger resolves four conflict types: forgot to log into work, forgot to request time off, time off request was unapproved, and partial time off day missing attendance records."
  },
  {
    id: "hr_002",
    module: "hr",
    topic: "Appraisals",
    question: "What is the correct sequence of an Odoo appraisal?",
    options: [
      "Manager feedback → Self-assessment → Review → Final rating",
      "Self-assessment → Manager feedback (with 360 input) → Review meeting → Final rating",
      "Review meeting → Self-assessment → Manager feedback → Final rating",
      "360 feedback → Self-assessment → Manager feedback → Final rating"
    ],
    correct: [1],
    explanation: "The appraisal sequence is: employee self-assessment → manager feedback (can also ask others for feedback/360) → review meeting with skill review → private note and final rating."
  },
  {
    id: "hr_003",
    module: "hr",
    topic: "Attendance",
    question: "An overtime ruleset condition can be based on which factors? (Choose all that apply)",
    options: [
      "Based on quantity",
      "Based on timing",
      "Based on employee seniority",
      "Based on department budget"
    ],
    correct: [0, 1],
    explanation: "Overtime ruleset conditions are either 'Based on quantity' or 'Based on timing'. The action section defines what happens when conditions are met."
  },
  {
    id: "hr_004",
    module: "hr",
    topic: "Recruitment",
    question: "Which analysis reports are available in Odoo Recruitment? (Choose all that apply)",
    options: [
      "Applicant analysis",
      "Source analysis",
      "Velocity analysis",
      "Salary benchmarking"
    ],
    correct: [0, 1, 2],
    explanation: "Recruitment analysis includes: applicant analysis (overall metrics), source analysis (where applicants come from), velocity analysis (speed through pipeline), and team performance (recruiter effectiveness). No salary benchmarking."
  },
  {
    id: "hr_005",
    module: "hr",
    topic: "Attendance Kiosk",
    question: "Which identification methods does the Odoo Attendance Kiosk support? (Choose all that apply)",
    options: [
      "Manual selection (PIN)",
      "Badge with barcode",
      "RFID token",
      "Facial recognition"
    ],
    correct: [0, 1, 2],
    explanation: "The attendance kiosk supports three identification methods: manual selection, badge with barcode, and RFID token. Facial recognition is not listed."
  },

  // ==================== WEBSITE & ECOMMERCE ====================
  {
    id: "web_001",
    module: "website",
    topic: "Configuration",
    question: "What domain benefit does Odoo Online provide for the first year?",
    options: [
      "A free SSL certificate only",
      "A free custom domain name for one year",
      "Unlimited subdomains",
      "Free domain privacy protection"
    ],
    correct: [1],
    explanation: "Odoo provides a free custom domain name to all Odoo Online databases for one year, so visitors can access via www.example.com instead of example.odoo.com."
  },
  {
    id: "web_002",
    module: "website",
    topic: "eCommerce",
    question: "What is the difference between B2B and B2C mode in Odoo eCommerce?",
    options: [
      "B2B mode supports more products than B2C",
      "B2B shows tax-excluded prices; B2C shows tax-included prices",
      "B2B uses a different checkout process entirely",
      "B2B requires a separate website instance"
    ],
    correct: [1],
    explanation: "B2B and B2C modes differ in tax display (tax-excluded vs tax-included), pricing, and account requirements. Both can operate from the same instance with different configurations."
  },
  {
    id: "web_003",
    module: "website",
    topic: "SEO",
    question: "Which SEO tools are available in Odoo Website? (Choose all that apply)",
    options: [
      "Meta tags and structured URLs",
      "Content optimization tools",
      "Google Search Console integration",
      "Automated backlink building"
    ],
    correct: [0, 1, 2],
    explanation: "Odoo Website provides meta tags, structured URLs, content optimization, and Google Search Console integration. Automated backlink building is not a feature."
  },
  {
    id: "web_004",
    module: "website",
    topic: "Multi-Website",
    question: "How does Odoo handle multiple websites from a single instance?",
    options: [
      "Each website requires a separate Odoo database",
      "Multiple websites can be managed from a single Odoo instance",
      "Only the primary website gets full feature support",
      "Multi-website requires the Enterprise edition"
    ],
    correct: [1],
    explanation: "Multiple websites can be managed from a single Odoo instance, each with its own domain, theme, and configuration."
  },

  // ==================== MARKETING ====================
  {
    id: "mkt_001",
    module: "marketing",
    topic: "Email Marketing",
    question: "What is the difference between unsubscribing and blacklisting in Odoo Email Marketing?",
    options: [
      "There is no difference — they are the same thing",
      "Unsubscribing is per-list; blacklisting prevents ALL mailings to that address",
      "Blacklisting is temporary; unsubscribing is permanent",
      "Unsubscribing is for customers; blacklisting is for vendors"
    ],
    correct: [1],
    explanation: "Unsubscription is per mailing list. Blacklisting is broader — it prevents ALL mailings to that address across all lists. Blacklisted addresses can be unblacklisted."
  },
  {
    id: "mkt_002",
    module: "marketing",
    topic: "Marketing Automation",
    question: "Which activity types are available in Odoo Marketing Automation? (Choose all that apply)",
    options: [
      "Email",
      "SMS",
      "Server Action",
      "Social media post"
    ],
    correct: [0, 1, 2],
    explanation: "Marketing Automation activities include Email, SMS, and Server Actions (including custom ones). Social media posts are managed in the Social Marketing app, not as automation activities."
  },
  {
    id: "mkt_003",
    module: "marketing",
    topic: "Events",
    question: "Which tabs are available when creating a new event in Odoo? (Choose all that apply)",
    options: [
      "Tickets",
      "Communication",
      "Questions",
      "Sponsorships"
    ],
    correct: [0, 1, 2],
    explanation: "Event creation includes tabs for Tickets, Communication, Questions, and Notes & Documents. Sponsors and booths are configured separately after event creation, not as a creation tab."
  },
  {
    id: "mkt_004",
    module: "marketing",
    topic: "Surveys",
    question: "What is a Live Session survey in Odoo?",
    options: [
      "A survey that requires a moderator to approve each response",
      "A real-time polling survey used during events or presentations",
      "A survey conducted via live video call",
      "A survey that only accepts responses during business hours"
    ],
    correct: [1],
    explanation: "Live Session surveys support real-time polling during events or presentations. Participants respond simultaneously, and results can be displayed live."
  },

  // ==================== PROJECT ====================
  {
    id: "proj_001",
    module: "project",
    topic: "Task Management",
    question: "How do task dependencies work in Odoo Project?",
    options: [
      "They assign tasks to dependent team members",
      "They define sequencing constraints — one task must finish before another can start",
      "They automatically create sub-tasks",
      "They link tasks to dependent customer orders"
    ],
    correct: [1],
    explanation: "Task dependencies define relationships that impose sequencing constraints. When Task B depends on Task A, Task A must finish before Task B can start."
  },
  {
    id: "proj_002",
    module: "project",
    topic: "Recurring Tasks",
    question: "What happens when a recurring task is configured in Odoo Project?",
    options: [
      "The task appears once and must be manually duplicated",
      "The task automatically repeats on the defined schedule",
      "The task is sent as a recurring email reminder",
      "The task only applies to subscription-based projects"
    ],
    correct: [1],
    explanation: "Recurring tasks repeat automatically on a defined schedule, automating routine work like weekly reports, monthly maintenance checks, or daily stand-ups."
  },
  {
    id: "proj_003",
    module: "project",
    topic: "Timesheets",
    question: "What is the purpose of the Timesheet Leaderboard?",
    options: [
      "To publicly shame underperforming employees",
      "To compare team performance or logged hours across employees",
      "To rank projects by profitability",
      "To assign billing rates automatically"
    ],
    correct: [1],
    explanation: "The leaderboard compares team performance or logged hours across employees, helping identify workload distribution and productivity patterns."
  },

  // ==================== HELPDESK ====================
  {
    id: "help_001",
    module: "helpdesk",
    topic: "SLAs",
    question: "What is the purpose of SLAs (Service Level Agreements) in Odoo Helpdesk?",
    options: [
      "To bill customers for support services",
      "To define and track response/resolution time commitments with automatic escalation",
      "To limit the number of tickets a customer can create",
      "To assign tickets to specific support agents based on expertise"
    ],
    correct: [1],
    explanation: "SLAs define response and resolution time commitments. Tickets are automatically escalated when approaching or exceeding SLA thresholds."
  },
  {
    id: "help_002",
    module: "helpdesk",
    topic: "Time Tracking",
    question: "How does Helpdesk integrate with timesheets?",
    options: [
      "Helpdesk tickets automatically generate timesheet entries",
      "Support hours can be logged on tickets and invoiced to customers",
      "Timesheets replace the Helpdesk module entirely",
      "Helpdesk and timesheets are separate modules with no integration"
    ],
    correct: [1],
    explanation: "Helpdesk integrates with Timesheets to log support hours on tickets and optionally bill those hours to customers when the support is chargeable."
  },

  // ==================== PRODUCTIVITY ====================
  {
    id: "prod_001",
    module: "productivity",
    topic: "Spreadsheet",
    question: "Which types of Odoo data can be inserted into a Spreadsheet? (Choose all that apply)",
    options: [
      "Lists (database records)",
      "Pivot tables",
      "Charts",
      "Financial data"
    ],
    correct: [0, 1, 2, 3],
    explanation: "Odoo Spreadsheets can insert lists, pivot tables (static and dynamic), charts, clickable links, and financial data — all linked to live Odoo data."
  },
  {
    id: "prod_002",
    module: "productivity",
    topic: "Spreadsheet",
    question: "What can a pivot table in Odoo Spreadsheet be converted into?",
    options: [
      "A chart only",
      "From static to dynamic, and vice versa",
      "A database view",
      "A PDF report"
    ],
    correct: [1],
    explanation: "Pivot tables can be static or dynamic, and they can be converted between these types. Static pivot tables are snapshots; dynamic ones update with live data."
  },
  {
    id: "prod_003",
    module: "productivity",
    topic: "Sign",
    question: "Which security and authentication features does Odoo Sign provide? (Choose all that apply)",
    options: [
      "Signatory hash for document integrity",
      "Certificate of completion",
      "SMS unique code verification",
      "Biometric signature verification"
    ],
    correct: [0, 1, 2],
    explanation: "Odoo Sign provides signatory hash, certificate of completion, SMS unique code, Aadhaar eSign, Itsme®, and cryptographic signatures. Biometric verification is not listed."
  },
  {
    id: "prod_004",
    module: "productivity",
    topic: "Documents",
    question: "What file operations are supported in Odoo Documents? (Choose all that apply)",
    options: [
      "Splitting PDFs",
      "Merging PDFs",
      "Requesting files from others",
      "Real-time collaborative document editing"
    ],
    correct: [0, 1, 2],
    explanation: "Odoo Documents supports splitting and merging PDFs, requesting files, URL links, and spreadsheets. Real-time collaborative editing is not a Documents feature (it's available in Spreadsheets)."
  },

  // ==================== STUDIO ====================
  {
    id: "stu_001",
    module: "studio",
    topic: "Automation Rules",
    question: "What can trigger an Automation Rule in Odoo Studio?",
    options: [
      "Only manual button clicks",
      "Record creation, update, or deletion events",
      "Only scheduled time-based triggers",
      "Only incoming email events"
    ],
    correct: [1],
    explanation: "Automation rules can be triggered by record events (creation, update, deletion) with configurable conditions and filters. They can also include webhooks for external service integration."
  },
  {
    id: "stu_002",
    module: "studio",
    topic: "Approval Rules",
    question: "What can Approval Rules be applied to in Odoo Studio?",
    options: [
      "Only sales orders",
      "Only expense reports",
      "Any record type configured in Studio",
      "Only HR-related records"
    ],
    correct: [2],
    explanation: "Approval rules can be defined for any record type through Studio. You configure approvers, conditions, and escalation rules as needed for the business process."
  },

  // ==================== AI ====================
  {
    id: "ai_001",
    module: "ai",
    topic: "AI Features",
    question: "Which AI-powered features are available in Odoo 19? (Choose all that apply)",
    options: [
      "Voice transcription (speech to text)",
      "Text writing and improvement",
      "AI-assisted live chat responses",
      "AI document sorting and categorization"
    ],
    correct: [0, 1, 2, 3],
    explanation: "Odoo 19 AI features include voice transcription, text improvement, AI live chat, document sort, AI fields, server actions, email templates, and support workflows."
  },
  {
    id: "ai_002",
    module: "ai",
    topic: "AI Configuration",
    question: "What must be configured before using Odoo AI features?",
    options: [
      "No configuration is needed — AI works out of the box",
      "API keys for the AI services must be configured",
      "A dedicated AI server must be installed on-premise",
      "AI features require an additional paid subscription beyond the API keys"
    ],
    correct: [1],
    explanation: "AI API keys must be configured before using AI features. Different AI services may require different keys."
  },

  // ==================== EXPENSES ====================
  {
    id: "exp_001",
    module: "expenses",
    topic: "Workflow",
    question: "What is the correct sequence of the Odoo Expenses workflow?",
    options: [
      "Submit → Approve → Log → Reimburse",
      "Log → Submit → Approve → Post → Reimburse",
      "Log → Post → Submit → Approve → Reimburse",
      "Create → Pay → Approve → Post"
    ],
    correct: [1],
    explanation: "The expense workflow is: Log (create) → Submit (to manager) → Process (approve/refuse) → Post (to accounting) → Reimburse (via payslip, cash, check, or direct deposit)."
  },
  {
    id: "exp_002",
    module: "expenses",
    topic: "Logging Expenses",
    question: "Which methods can employees use to log expenses in Odoo? (Choose all that apply)",
    options: [
      "Manual entry with receipt attachment",
      "Upload via digitalization",
      "Drag and drop",
      "Email submission via email gateway"
    ],
    correct: [0, 1, 2, 3],
    explanation: "All four methods are supported: manual entry, upload with digitalization, drag and drop, and email gateway submission."
  },
  {
    id: "exp_003",
    module: "expenses",
    topic: "Reimbursement",
    question: "Through which methods can employees be reimbursed in Odoo Expenses? (Choose all that apply)",
    options: [
      "Via payslips",
      "Via cash, check, or direct deposit",
      "Via expense cards only",
      "Via gift cards"
    ],
    correct: [0, 1],
    explanation: "Reimbursement methods: via payslips (individual or bulk) or via cash, check, or direct deposit. Expense cards are for spending, not reimbursement. Gift cards are not a reimbursement method."
  },
  {
    id: "exp_004",
    module: "expenses",
    topic: "Expense Cards",
    question: "What is required to use Odoo Expense Cards?",
    options: [
      "An Odoo Enterprise subscription",
      "A Stripe connected account",
      "A dedicated bank account at a partner bank",
      "Physical cards only — virtual cards are not supported"
    ],
    correct: [1],
    explanation: "Expense Cards (physical and virtual) require a Stripe connected account. Both physical and virtual cards are available, with PIN management and temporary pause capabilities."
  },

  // ==================== SUBSCRIPTIONS & RENTAL ====================
  {
    id: "sub_001",
    module: "subscriptions",
    topic: "Subscriptions",
    question: "Which features does Odoo Subscriptions provide? (Choose all that apply)",
    options: [
      "Automatic payment for renewals",
      "Upsell management",
      "Recurring revenue reports",
      "Free product samples"
    ],
    correct: [0, 1, 2],
    explanation: "Odoo Subscriptions includes automatic payments, upsell management, renewal processing, closing, recurring revenue reports, and delivery management."
  },
  {
    id: "sub_002",
    module: "subscriptions",
    topic: "Rental",
    question: "How are deposits handled in Odoo Rental?",
    options: [
      "Deposits are not supported in the Rental module",
      "Orders can include deposits as part of the rental order workflow",
      "Deposits are handled as separate sales orders",
      "Deposits must be processed through the Accounting module manually"
    ],
    correct: [1],
    explanation: "Rental orders support deposits as part of the order creation workflow. Products can be configured as rental type with physical or service classification."
  },

  // ==================== GENERAL SETTINGS ====================
  {
    id: "gen_001",
    module: "general",
    topic: "Users & Access",
    question: "Which authentication methods does Odoo support for user login? (Choose all that apply)",
    options: [
      "Two-factor authentication (2FA)",
      "OAuth via Google",
      "OAuth via Facebook",
      "OAuth via Microsoft Azure"
    ],
    correct: [0, 1, 2, 3],
    explanation: "Odoo supports 2FA and social authentication via Facebook, Google, and Microsoft Azure, plus LDAP integration."
  },
  {
    id: "gen_002",
    module: "general",
    topic: "IoT",
    question: "What devices can the Odoo IoT Box connect to? (Choose all that apply)",
    options: [
      "Printers",
      "Scales",
      "Cameras",
      "Measurement tools"
    ],
    correct: [0, 1, 2, 3],
    explanation: "The IoT Box supports printers, scales, screens, measurement tools, cameras, and footswitches. It also supports SSH access for troubleshooting."
  },
  {
    id: "gen_003",
    module: "general",
    topic: "Email",
    question: "Which email services does Odoo integrate with for outbound email? (Choose all that apply)",
    options: [
      "Outlook OAuth",
      "Gmail OAuth",
      "Mailjet",
      "ProtonMail"
    ],
    correct: [0, 1, 2],
    explanation: "Odoo integrates with Outlook OAuth, Gmail OAuth, and Mailjet for email communication. ProtonMail is not listed as an integration."
  },

  // ==================== CROSS-MODULE / SCENARIO QUESTIONS ====================
  {
    id: "cross_001",
    module: "cross",
    topic: "Sales-Inventory Integration",
    question: "When a sales order is confirmed with a storable product using MTO and dropshipping routes, what sequence of events occurs?",
    options: [
      "Sales Order → Delivery Order → Customer receives goods",
      "Sales Order → Purchase Order to supplier → Supplier ships to customer",
      "Sales Order → Manufacturing Order → Delivery Order",
      "Sales Order → Warehouse picks goods → Ships to customer"
    ],
    correct: [1],
    explanation: "With MTO + dropshipping: the sales order triggers a purchase order. The supplier ships directly to the customer without passing through your warehouse."
  },
  {
    id: "cross_002",
    module: "cross",
    topic: "CRM-Sales-Accounting Integration",
    question: "What is the complete flow from lead to financial reporting in Odoo?",
    options: [
      "Lead → Opportunity → RFQ → Purchase Order → Invoice",
      "Lead → Opportunity → Quotation → Sales Order → Delivery → Invoice → Journal Entry → Financial Reports",
      "Lead → Quotation → Invoice → Payment",
      "Opportunity → Sales Order → Purchase Order → Manufacturing Order"
    ],
    correct: [1],
    explanation: "The complete flow: Lead → Opportunity → Quotation → Sales Order → Delivery → Invoice (creates journal entries automatically) → Payment → Financial Reports (real-time)."
  },
  {
    id: "cross_003",
    module: "cross",
    topic: "Inventory-Accounting Integration",
    question: "When goods are received into inventory, what happens in Accounting?",
    options: [
      "Nothing — inventory and accounting are separate systems",
      "Odoo automatically creates the corresponding journal entries (stock input account debited, stock output account credited)",
      "The accountant must manually create a journal entry for each receipt",
      "A draft journal entry is created and must be manually validated"
    ],
    correct: [1],
    explanation: "Odoo automatically creates all underlying journal entries for inventory valuations. The stock input account is debited and the appropriate output account is credited based on the operation type configuration."
  },
  {
    id: "cross_004",
    module: "cross",
    topic: "Manufacturing-Accounting Integration",
    question: "How are manufacturing order costs reflected in product valuation?",
    options: [
      "Component costs + labor costs from work centers + overhead are rolled up into the finished product's valuation",
      "Only the raw material costs are included",
      "Costs are recorded in a separate cost center and not linked to the product",
      "Product valuation is independent of manufacturing costs"
    ],
    correct: [0],
    explanation: "MO costs (component costs + work center labor costs + overhead) roll up into the finished product's valuation automatically through the perpetual inventory system."
  },
  {
    id: "cross_005",
    module: "cross",
    topic: "POS-Accounting Integration",
    question: "At the end of a POS session, what accounting entries are automatically created?",
    options: [
      "Only the cash balance is recorded",
      "Revenue accounts are credited and appropriate receivable/cash accounts are debited for all session transactions",
      "POS transactions do not create accounting entries — they must be manually journaled",
      "Only card payments create accounting entries"
    ],
    correct: [1],
    explanation: "When a POS session is closed, Odoo automatically creates the journal entries: revenue accounts credited, and payment method accounts (cash, bank, etc.) debited for all session transactions."
  },
  {
    id: "cross_006",
    module: "cross",
    topic: "Multi-Company",
    question: "In Odoo multi-company, which statement about inter-company transactions is correct?",
    options: [
      "Inter-company transactions are not supported",
      "Inter-company transactions are supported, and each company's accounting is maintained separately",
      "All companies share a single set of books",
      "Inter-company transactions require a third-party module"
    ],
    correct: [1],
    explanation: "Inter-company transactions are supported in Odoo. Each company maintains its own accounting records, but transactions between companies are properly handled with corresponding entries."
  },
  {
    id: "cross_007",
    module: "cross",
    topic: "Website-Sales-CRM Integration",
    question: "A visitor fills out a contact form on the Odoo website. What can happen automatically?",
    options: [
      "Nothing happens — forms are only stored in the website module",
      "A lead or opportunity can be automatically created in CRM",
      "A sales order is automatically generated",
      "The visitor is automatically added to a marketing campaign"
    ],
    correct: [1],
    explanation: "Web contact forms can auto-generate leads or opportunities in CRM. The form fields can be customized, and submitted forms become viewable in the CRM pipeline."
  },
  {
    id: "cross_008",
    module: "cross",
    topic: "Expenses-Accounting-HR Integration",
    question: "An employee submits an expense report for client travel that should be reinvoiced. What is the complete process?",
    options: [
      "Log expense → Get reimbursed → Send separate invoice to client",
      "Log expense → Create expense report → Approve → Post → Reinvoice to client → Reimburse employee",
      "Log expense → Post to accounting → Pay from petty cash",
      "Submit to client first → Use client payment to reimburse employee"
    ],
    correct: [1],
    explanation: "For reinvoiced expenses: Log → Submit → Approve → Post → use the Reinvoice feature to bill the client → Reimburse employee. The reinvoice workflow separates client-billable expenses from internal ones."
  },

  // ==================== MORE ACCOUNTING QUESTIONS ====================
  {
    id: "acc_013",
    module: "accounting",
    topic: "Credit Notes",
    question: "When creating a credit note in Odoo, what options are available?",
    options: [
      "Only full credit notes — partial is not supported",
      "Partial or full credit notes with automatic reversal of journal entries",
      "Credit notes can only be created for invoices less than 30 days old",
      "Credit notes must be manually entered as journal entries"
    ],
    correct: [1],
    explanation: "Odoo supports both partial and full credit notes. When validated, the journal entries are automatically reversed. Credit notes can be created for invoices of any age."
  },
  {
    id: "acc_014",
    module: "accounting",
    topic: "Reconciliation Models",
    question: "What are Reconciliation Models used for in Odoo Accounting?",
    options: [
      "To manually match each bank transaction",
      "To create templates that automatically match recurring bank transactions to accounting entries",
      "To reconcile different currencies automatically",
      "To model different reconciliation scenarios for testing"
    ],
    correct: [1],
    explanation: "Reconciliation models are templates that auto-match recurring transactions. They define rules for matching imported bank statements to accounting entries, speeding up the reconciliation process."
  },
  {
    id: "acc_015",
    module: "accounting",
    topic: "Analytic Accounting",
    question: "What is the purpose of Analytic Accounting in Odoo?",
    options: [
      "To replace financial accounting",
      "To provide dimensional analysis beyond financial accounts, tracking costs/revenues by project, department, or other dimensions",
      "To analyze competitors' financials",
      "To only track manufacturing costs"
    ],
    correct: [1],
    explanation: "Analytic accounting provides multi-dimensional analysis beyond the chart of accounts. It tracks costs and revenues by project, department, product line, or any custom analytic dimension."
  },
  {
    id: "acc_016",
    module: "accounting",
    topic: "Lock Dates",
    question: "What is the effect of setting a lock date in Odoo Accounting?",
    options: [
      "All users are locked out of the accounting module until the date passes",
      "No accounting entries can be created or modified before the lock date",
      "Only the administrator can create entries after the lock date",
      "The system automatically creates closing entries on that date"
    ],
    correct: [1],
    explanation: "Lock dates prevent any accounting entries from being created or modified before the specified date. This protects closed periods from accidental changes during subsequent periods."
  },

  // ==================== MORE INVENTORY QUESTIONS ====================
  {
    id: "inv_009",
    module: "inventory",
    topic: "Barcode Operations",
    question: "Which operations can be performed using the Odoo Barcode app? (Choose all that apply)",
    options: [
      "Inventory adjustments",
      "Receipts and deliveries",
      "Batch transfers between locations",
      "Creating purchase orders"
    ],
    correct: [0, 1, 2],
    explanation: "The Barcode app handles inventory adjustments, receipts/deliveries, batch transfers, and transfers from scratch. Purchase order creation is done in the Purchase app, not Barcode."
  },
  {
    id: "inv_010",
    module: "inventory",
    topic: "GS1 Nomenclature",
    question: "What is the GS1 nomenclature in Odoo Barcode?",
    options: [
      "A product naming convention",
      "An industry-standard barcode format for global supply chain compatibility",
      "A type of inventory valuation method",
      "A shipping carrier integration"
    ],
    correct: [1],
    explanation: "GS1 nomenclature is an industry-standard barcode format that enables global supply chain compatibility. Odoo supports both default and GS1 barcode nomenclatures."
  },
  {
    id: "inv_011",
    module: "inventory",
    topic: "Quality",
    question: "Which quality check types are available in Odoo Quality? (Choose all that apply)",
    options: [
      "Instructions (step-by-step procedural checks)",
      "Pass-Fail (binary pass/fail criteria)",
      "Measure (quantitative measurement against tolerance)",
      "Take a Picture (visual evidence via photo capture)"
    ],
    correct: [0, 1, 2, 3],
    explanation: "All four types are available: Instructions, Pass-Fail, Measure, and Take a Picture. Quality control points define where in the workflow checks occur."
  },
  {
    id: "inv_012",
    module: "inventory",
    topic: "Landed Costs",
    question: "What are Landed Costs in Odoo Inventory?",
    options: [
      "The cost of land for warehouse construction",
      "Additional costs (freight, insurance, customs duties) allocated to products upon receipt",
      "Costs that have 'landed' or arrived in the accounting system",
      "Fixed costs of running a warehouse"
    ],
    correct: [1],
    explanation: "Landed costs allocate additional costs (freight, insurance, customs duties, handling) to products upon receipt. They are split across the received products and affect their valuation."
  },
  {
    id: "inv_013",
    module: "inventory",
    topic: "Replenishment Report",
    question: "What does the Replenishment Report show?",
    options: [
      "Only products that are out of stock",
      "An overview of all products requiring replenishment action based on configured rules",
      "Historical purchasing data",
      "Supplier performance metrics"
    ],
    correct: [1],
    explanation: "The Replenishment Report provides an overview of all products requiring replenishment action, showing forecasted shortages and suggesting procurement based on configured reordering rules."
  },

  // ==================== MORE MANUFACTURING QUESTIONS ====================
  {
    id: "mrp_008",
    module: "mrp",
    topic: "Backorders",
    question: "If a manufacturing order for 100 units produces only 70 units, what happens in Odoo?",
    options: [
      "The MO is closed and the remaining 30 units are lost",
      "A backorder is created for the remaining 30 units as a new MO",
      "The entire MO is cancelled and must be recreated",
      "The MO remains open indefinitely until all 100 are produced"
    ],
    correct: [1],
    explanation: "When an MO is partially completed, a backorder is created for the unfinished quantity as a new MO, maintaining traceability without blocking the original MO."
  },
  {
    id: "mrp_009",
    module: "mrp",
    topic: "Shop Floor",
    question: "What can workers do from the Shop Floor interface? (Choose all that apply)",
    options: [
      "View, start, pause, and complete work orders",
      "Clock in/out of work orders for time tracking",
      "Create new Bills of Materials",
      "Report quality issues"
    ],
    correct: [0, 1, 3],
    explanation: "Shop Floor allows workers to manage work orders, track time, and report quality issues. Creating BoMs is an engineering function done in the main Manufacturing app, not Shop Floor."
  },
  {
    id: "mrp_010",
    module: "mrp",
    topic: "Continuous Improvement",
    question: "What is the purpose of Continuous Product Improvement in Odoo Manufacturing?",
    options: [
      "To automatically update product prices",
      "To document manufacturing issues and improvements, enabling iterative refinement of processes and BoMs",
      "To replace products with newer versions automatically",
      "To calculate optimal production batch sizes"
    ],
    correct: [1],
    explanation: "Continuous Product Improvement supports feedback loops where manufacturing issues and improvements are documented and tracked, enabling iterative refinement of processes and BoMs."
  },

  // ==================== MORE HR QUESTIONS ====================
  {
    id: "hr_006",
    module: "hr",
    topic: "Accrual Plans",
    question: "What is a Time Off Accrual Plan in Odoo?",
    options: [
      "A plan for scheduling employee vacations",
      "A plan where time off entitlement accrues over time based on defined rules, rather than being allocated as a lump sum",
      "A financial accrual for vacation pay liability",
      "A plan for approving time off requests"
    ],
    correct: [1],
    explanation: "Accrual plans allow time off to accrue gradually over time based on rules (e.g., 1.5 days per month worked), rather than receiving the full year's allocation upfront."
  },
  {
    id: "hr_007",
    module: "hr",
    topic: "360 Feedback",
    question: "In Odoo Appraisals, who can provide feedback in a 360-degree review?",
    options: [
      "Only the direct manager",
      "Multiple sources including peers, subordinates, managers, and self-assessment",
      "Only HR personnel",
      "Only external consultants"
    ],
    correct: [1],
    explanation: "360 Feedback collects input from multiple sources — peers, subordinates, managers, and self-assessment — providing a comprehensive view of employee performance."
  },
  {
    id: "hr_008",
    module: "hr",
    topic: "Payroll Localizations",
    question: "Which countries have payroll localizations in Odoo 19? (Choose all that apply)",
    options: [
      "Australia",
      "Kenya",
      "United States",
      "Japan"
    ],
    correct: [0, 1, 2],
    explanation: "Payroll localizations exist for Australia, Belgium, Egypt, Hong Kong, India, Jordan, Kenya, Mexico, Saudi Arabia, Türkiye, UAE, and US. Japan is not listed."
  },

  // ==================== MORE MARKETING QUESTIONS ====================
  {
    id: "mkt_005",
    module: "marketing",
    topic: "SMS Marketing",
    question: "What must be configured before sending SMS campaigns in Odoo?",
    options: [
      "Just create the message and send — no setup needed",
      "Register an SMS account and purchase credits",
      "Install a third-party SMS gateway app",
      "Configure a physical SMS modem"
    ],
    correct: [1],
    explanation: "SMS marketing requires registering an SMS account and purchasing credits. Twilio integration is also available as an alternative provider."
  },
  {
    id: "mkt_006",
    module: "marketing",
    topic: "Social Marketing",
    question: "What CAN you do with Odoo Social Marketing? (Choose all that apply)",
    options: [
      "Create and schedule social media posts",
      "Create leads from comments on posts",
      "View post insights and analytics",
      "Run paid advertising campaigns"
    ],
    correct: [0, 1, 2],
    explanation: "Social Marketing allows creating/scheduling posts, creating leads from comments, and viewing insights. Paid advertising campaigns are not managed through Odoo Social Marketing."
  },

  // ==================== MORE WEBSITE QUESTIONS ====================
  {
    id: "web_005",
    module: "website",
    topic: "Live Chat",
    question: "What features does Odoo Live Chat provide? (Choose all that apply)",
    options: [
      "Customer satisfaction ratings",
      "Canned responses and commands",
      "AI-powered chatbots",
      "Video calling"
    ],
    correct: [0, 1, 2],
    explanation: "Live Chat includes ratings, commands/canned responses, chatbots, reports, participation tracking, and an information panel. Video calling is not a Live Chat feature."
  },
  {
    id: "web_006",
    module: "website",
    topic: "CDN",
    question: "What is the purpose of configuring a CDN for an Odoo website?",
    options: [
      "To create backups of the website",
      "To speed up global content delivery by serving static assets from distributed servers",
      "To enable multiple domain names",
      "To track website visitors"
    ],
    correct: [1],
    explanation: "A Content Delivery Network (CDN) speeds up global content delivery by serving static assets (images, CSS, JS) from servers distributed geographically close to visitors."
  },

  // ==================== MORE PRODUCTIVITY QUESTIONS ====================
  {
    id: "prod_005",
    module: "productivity",
    topic: "Calendar",
    question: "Which calendar services does Odoo Calendar synchronize with? (Choose all that apply)",
    options: [
      "Outlook",
      "Google Calendar",
      "Apple iCloud Calendar",
      "Yahoo Calendar"
    ],
    correct: [0, 1],
    explanation: "Odoo Calendar synchronizes with Outlook and Google Calendar. Apple iCloud and Yahoo Calendar are not listed as supported sync targets."
  },
  {
    id: "prod_006",
    module: "productivity",
    topic: "Appointments",
    question: "What can Odoo Appointments integrate with?",
    options: [
      "Google Reserve",
      "Only the Odoo Calendar",
      "External booking platforms only",
      "It has no integration capabilities"
    ],
    correct: [0],
    explanation: "Odoo Appointments integrates with Google Reserve and can generate CRM opportunities from appointments."
  },

  // ==================== ADDITIONAL CROSS-MODULE QUESTIONS ====================
  {
    id: "cross_009",
    module: "cross",
    topic: "Purchase-Accounting Integration",
    question: "When a vendor bill is received and matched against a purchase order and receipt, what verification process is this called?",
    options: [
      "Double-entry verification",
      "Three-way matching",
      "Purchase reconciliation",
      "Vendor statement reconciliation"
    ],
    correct: [1],
    explanation: "Three-way matching verifies the purchase order (what was ordered), receipt (what was received), and vendor bill (what is being charged) before payment."
  },
  {
    id: "cross_010",
    module: "cross",
    topic: "Inventory-Sales Integration",
    question: "A product configured with the 'at confirmation' reservation method will:",
    options: [
      "Reserve stock when the delivery order is created",
      "Reserve stock immediately when the sales order is confirmed",
      "Reserve stock only when the customer pays",
      "Reserve stock when the picking is printed"
    ],
    correct: [1],
    explanation: "'At confirmation' reserves stock immediately when the sales order is confirmed. 'Manual' lets users allocate stock. 'Before scheduled date' auto-reserves close to delivery."
  },
  {
    id: "cross_011",
    module: "cross",
    topic: "CRM-Email Marketing Integration",
    question: "How does the 'Lost Leads Reactivation' feature work?",
    options: [
      "It automatically calls lost leads",
      "It's an email workflow targeting lost leads filtered by creation date, stage, lost reason, and active status",
      "It permanently deletes lost leads after 30 days",
      "It merges lost leads with existing opportunities"
    ],
    correct: [1],
    explanation: "Lost Leads Reactivation is a specialized email workflow that targets lost leads using configurable filters (creation date, stage, lost reason, active status) for nurturing campaigns."
  },
  {
    id: "cross_012",
    module: "cross",
    topic: "Project-Accounting Integration",
    question: "What does Project Profitability track in Odoo?",
    options: [
      "Only the project budget vs actual costs",
      "Revenues (timesheets, billable expenses) minus costs (labor, materials, expenses) per project",
      "The profit margin of products sold through the project",
      "Only the timesheet billing vs timesheet costs"
    ],
    correct: [1],
    explanation: "Project Profitability compares all revenues (billable time, expenses, materials) against all costs (labor from timesheets, subcontracting, expenses) to show the financial performance of each project."
  },

  // ==================== MORE QUESTIONS FOR BREADTH ====================
  {
    id: "acc_017",
    module: "accounting",
    topic: "Payment Terms",
    question: "A customer is offered a 2% discount if they pay within 10 days, otherwise the full amount is due in 30 days. How should this be configured?",
    options: [
      "Create two separate invoices",
      "Configure payment terms with a cash discount — 2% if paid within 10 days, net due in 30 days",
      "Manually adjust the invoice amount after payment",
      "Create a credit note for the discount after payment"
    ],
    correct: [1],
    explanation: "Cash discounts are configured in payment terms. The system automatically calculates the discount if payment is received within the specified period."
  },
  {
    id: "inv_014",
    module: "inventory",
    topic: "Packaging",
    question: "In Odoo Inventory, a product can be sold individually but purchased in boxes of 24. How is this configured?",
    options: [
      "Create two separate products — one for sales and one for purchasing",
      "Use different units of measure for sales and purchases",
      "Configure packaging types with quantities (e.g., 'Box of 24') linked to the product",
      "Manually convert quantities on every purchase order"
    ],
    correct: [2],
    explanation: "Packaging types define specific packaging with quantities (e.g., Box of 24, Pallet of 500). Different packaging can be used for purchasing vs sales on the same product."
  },
  {
    id: "inv_015",
    module: "inventory",
    topic: "Cycle Counts",
    question: "What is the advantage of Cycle Counts over full physical inventories?",
    options: [
      "Cycle counts are more accurate",
      "Cycle counts are rotating partial counts, allowing inventory verification without shutting down warehouse operations",
      "Cycle counts are required by law in most countries",
      "Cycle counts automatically adjust stock without human verification"
    ],
    correct: [1],
    explanation: "Cycle counts are rotating partial inventory counts that allow ongoing inventory verification without the disruption of a full physical inventory. Different product categories can be counted on different schedules."
  },
  {
    id: "mrp_011",
    module: "mrp",
    topic: "Work Order Dependencies",
    question: "Work center A must complete its operation before work center B can start. How is this enforced?",
    options: [
      "By creating two separate manufacturing orders",
      "By configuring work order dependencies on the Bill of Materials routing",
      "By scheduling them on different days",
      "Dependencies are not supported — the supervisor must enforce the order manually"
    ],
    correct: [1],
    explanation: "Work order dependencies are configured in the BoM routing, enforcing the sequence where certain operations must finish before others can begin."
  },
  {
    id: "pur_006",
    module: "purchase",
    topic: "Vendor Pricelists",
    question: "How can you update vendor pricelists efficiently in Odoo?",
    options: [
      "Each vendor price must be entered manually one at a time",
      "Vendor pricelists can be imported in bulk via file upload",
      "Prices are automatically pulled from the internet",
      "Vendor prices can only be updated via API"
    ],
    correct: [1],
    explanation: "Vendor pricelists support bulk import via file upload, linking vendor-specific prices to products for accurate cost tracking across all purchase orders."
  },
  {
    id: "hr_009",
    module: "hr",
    topic: "Fleet",
    question: "What reports are available in Odoo Fleet? (Choose all that apply)",
    options: [
      "Cost analysis report",
      "Odometer analysis report",
      "Fuel efficiency report",
      "Driver behavior report"
    ],
    correct: [0, 1],
    explanation: "Fleet provides cost analysis and odometer analysis reports. Fuel efficiency and driver behavior are not standard Fleet reports."
  },
  {
    id: "gen_004",
    module: "general",
    topic: "Developer Mode",
    question: "How can Developer Mode be activated in Odoo?",
    options: [
      "Only by modifying the source code",
      "Through Settings or by adding ?debug=1 to the URL",
      "Only available on Odoo.sh instances",
      "Through a special license key"
    ],
    correct: [1],
    explanation: "Developer Mode can be activated via Settings menu or by adding ?debug=1 (or ?debug=assets for assets mode) to the URL. It provides access to technical settings and debugging tools."
  },
  {
    id: "cross_013",
    module: "cross",
    topic: "Helpdesk-Project-Timesheets Integration",
    question: "A support ticket requires development work. How can Odoo handle this cross-module workflow?",
    options: [
      "Support tickets and projects are completely separate and cannot be linked",
      "A ticket can be converted to or linked with a project task, with time tracked via timesheets and optionally billed to the customer",
      "The ticket must be closed and a new project created manually",
      "Only the helpdesk manager can create projects from tickets"
    ],
    correct: [1],
    explanation: "Helpdesk integrates with Project and Timesheets — tickets can become tasks, support hours can be logged, and time can be invoiced to customers when applicable."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = QUESTIONS;
}
