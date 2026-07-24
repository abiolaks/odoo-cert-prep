// Odoo 19 Functional Certification Knowledge Base
// Structured from official Odoo 19.0 documentation

const KNOWLEDGE_BASE = [
  {
    id: "essentials",
    name: "Odoo Essentials",
    icon: "⚙️",
    topics: [
      {
        title: "Stages",
        content: "Pipeline stages are used across Odoo to track records through a workflow process. Found in CRM (opportunity pipeline), Manufacturing (work orders), Recruitment (applicant pipeline), and more. Each stage represents a step in the business process. Stages are configurable per module."
      },
      {
        title: "Activities",
        content: "Activities are task-like actions attached to any record (calls, meetings, emails, to-dos). They schedule follow-ups and track next actions. Integrate with Calendar and Discuss modules. Activity types are configurable with default user, summary, and schedule. Can trigger the next activity automatically."
      },
      {
        title: "Reporting",
        content: "Built-in analytical views available across modules. Supports pivot tables, graphs, dashboards, and cohort views. Reports can be customized with filters, groupings, and measures. Real-time data updates."
      },
      {
        title: "Search, Filter, and Group Records",
        content: "Universal search bar with advanced filters. Predefined and custom filters available. 'Group by' organizes record lists by any field. Favorite searches can be saved for quick access. Keyboard shortcuts documented for power users."
      },
      {
        title: "Contacts",
        content: "Centralized contact/partner database. Includes 'Merge contacts' for deduplication. Used across Sales, CRM, Purchases, Accounting, and all partner-facing modules. Stores addresses, contacts, bank accounts."
      },
      {
        title: "Export and Import Data",
        content: "CSV/XLSX import/export for bulk data operations. Supports record creation and updating via import. Export templates can be saved. Import uses column mapping to match fields."
      },
      {
        title: "Property Fields",
        content: "Field type allowing per-company or per-record attribute overrides. Useful in multi-company environments for setting company-specific defaults without duplicating records."
      },
      {
        title: "In-App Purchases (IAP)",
        content: "Paid services accessed within Odoo: Lead Mining, Partner Autocomplete, Lead Enrichment, SMS credits, and Document Digitization. Use IAP credits purchased from Odoo."
      },
      {
        title: "Keyboard Shortcuts",
        content: "Alt+1 through Alt+9 navigate top menu apps. Alt+Shift+number for secondary menus. Ctrl+K opens command palette. Ctrl+Enter saves. Ctrl+S saves and stays."
      }
    ]
  },
  {
    id: "accounting",
    name: "Accounting & Invoicing",
    icon: "📊",
    topics: [
      {
        title: "Double-Entry Bookkeeping",
        content: "Odoo uses double-entry bookkeeping: every entry needs a corresponding opposite counterpart in a different account (one debited, one credited). All underlying journal entries are created automatically for invoices, vendor bills, POS orders, expenses, and inventory valuations. This ensures accounts always balance."
      },
      {
        title: "Accrual vs Cash Basis",
        content: "Both methods supported. Accrual: income/expense recorded when transaction occurs. Cash basis: recorded when payment made/received. Cash basis taxes configured per tax — defers tax recognition until payment receipt/disbursement."
      },
      {
        title: "Chart of Accounts",
        content: "Each company configures its own chart of accounts. Accounts can be shared across companies for consolidation reporting. Foundational element — journals, taxes, and reports all reference accounts from it."
      },
      {
        title: "Journals",
        content: "Sales journals (customer invoices), Purchase journals (vendor bills), Bank/Cash journals, Miscellaneous journals. Branches manage their own dedicated journals. In Accounting Firms mode, document sequences become editable."
      },
      {
        title: "Multi-Currency",
        content: "Automated exchange rates for international transactions. Every transaction stores both the company currency value AND the foreign currency value. Currency gains/losses generated after reconciling journal items. Foreign currency bank accounts supported."
      },
      {
        title: "Taxes",
        content: "Tax computation methods, cash basis taxes, withholding taxes, VAT verification (VIES for EU), fiscal positions (auto-map taxes/accounts per customer/supplier), AvaTax integration, EU intra-community distance selling, B2B/B2C pricing (tax-excluded vs tax-included)."
      },
      {
        title: "Customer Invoices",
        content: "Payment terms and installment plans, delivery/invoice addresses, cash discounts and tax reductions, credit notes and refunds, cash rounding, deferred revenues (revenue recognition across periods), EDI electronic invoicing, EPC QR codes, Incoterms, online signatures, and payment confirmation."
      },
      {
        title: "Vendor Bills",
        content: "Document digitization via OCR, non-current/fixed assets tracking with depreciation, deferred expenses (expense recognition across periods), vendor bill sequence customization."
      },
      {
        title: "Payments",
        content: "Batch payments (SEPA supported), automated payment follow-ups/dunning, check payments, internal transfers between company accounts."
      },
      {
        title: "Bank Reconciliation",
        content: "Bank synchronization via Ponto and Basiq — auto-imports all transactions. Reconciliation models: templates that auto-match recurring transactions. Foreign currency bank accounts supported. Loans management for tracking and accounting."
      },
      {
        title: "Financial Reports",
        content: "Balance Sheet, Profit & Loss, Cash Flow Statement, Executive Summary (real-time). Audit: General Ledger, Trial Balance, Journal Audit, Check Register. Partner: Partner Ledger, Aged Receivable, Aged Payable. Management: Invoice Analysis, Budget Report, Unrealized Currency Gains/Losses, Deferred Revenue/Expense, Depreciation Schedule, Product Margins. Tax: VAT Report (Tax Return), EC Sales List, Intrastat."
      },
      {
        title: "Tax Return (VAT)",
        content: "Odoo computes all accounting transactions for the tax period, uses totals to calculate tax obligation. XML export for tax authority upload supported depending on localization. Tax carryover across periods supported."
      },
      {
        title: "Fiscal Positions",
        content: "Automatically map taxes and accounts when transaction involves specific conditions (e.g., EU customer triggers reverse-charge VAT). Handle tax substitution (domestic VAT → reverse-charge) and account mapping (domestic revenue → export revenue)."
      },
      {
        title: "Inventory Valuation",
        content: "Periodic (manual) or perpetual (automated) valuation. Methods: Standard Price, Average Cost (AVCO), First In First Out (FIFO). Landed costs allocation, valuation by lots/serial numbers, scrap accounting all supported."
      },
      {
        title: "Multi-Company & Branches",
        content: "Multiple companies in single database. Parent chart of accounts, currency, and taxes apply to branches. Branches manage own journals. Parent manages common fiscal period and lock dates. Parent sees all reports; branches see only own data."
      },
      {
        title: "Accounting Firms Mode",
        content: "Activated at Accounting → Configuration → Settings. Enables: editable document sequences, quick encoding, auto-filled Invoice Date/Bill Date, Total field for faster encoding."
      },
      {
        title: "Year-End Closing",
        content: "Retained earnings: Odoo calculates current year earnings in real-time — no year-end journal or rollover required. P&L balance automatically appears on balance sheet. Fiscal year lock dates prevent changes to closed periods."
      }
    ]
  },
  {
    id: "crm",
    name: "CRM",
    icon: "🤝",
    topics: [
      {
        title: "Pipeline Organization",
        content: "Opportunities move through configurable stages. Lost opportunities assigned lost reasons (configurable). Individual or multiple opportunities can be restored. Lost leads managed separately from lost opportunities."
      },
      {
        title: "Merge Leads & Opportunities",
        content: "System identifies similar leads/opportunities. Merging consolidates duplicates. Do NOT merge when: leads are lost, contacts differ within an organization, duplicates involve multiple salespersons, or contact info is similar but not exact."
      },
      {
        title: "Sales Teams",
        content: "Administrators create teams and add members. Two assignment methods: rules-based (automatic) or manual. 'Enable multi teams' allows salespeople in multiple teams. Sales Team Dashboard provides pipeline overview."
      },
      {
        title: "Lead Acquisition",
        content: "Leads → Opportunities conversion with duplicate check. Web contact forms auto-generate opportunities. Email aliases generate leads from inbound emails. Manual lead/opportunity creation supported."
      },
      {
        title: "Lead Mining",
        content: "Paid IAP feature generating leads from external sources. Requires configuration and credit purchase. Leads viewable after generation."
      },
      {
        title: "Predictive Lead Scoring",
        content: "Probability scoring evaluates lead quality. Manual probability override available. Rule-based assignment with configurable rules."
      },
      {
        title: "Marketing Attribution",
        content: "Tracks UTM parameters to measure campaign effectiveness. Helps identify which marketing channels generate the best leads."
      },
      {
        title: "Gamification",
        content: "Create badges and challenges with assignment rules, goals, and rewards. Motivates sales team performance through competition."
      },
      {
        title: "Activity Plans",
        content: "Custom activity types with configurable Action, Default user, Default summary, and Schedule. Support 'Suggest the next activity' and 'Trigger the next activity' chaining. Activity plans bundle multiple activities."
      },
      {
        title: "Lead Enrichment",
        content: "Auto or manual trigger. Uses IAP credits to enrich contacts with corporate data. Priced per enrichment."
      },
      {
        title: "Pipeline Analysis",
        content: "Win/loss analysis with three views: Pivot view, Cohort view, List view. Configurable with Filters, Groupings, and Measures."
      },
      {
        title: "Forecast Report",
        content: "Centers on Expected closing date and Prorated revenue. Forward-looking revenue projection by sales team and period."
      }
    ]
  },
  {
    id: "sales",
    name: "Sales",
    icon: "💵",
    topics: [
      {
        title: "Quotations",
        content: "Quotation dashboard with Order Lines tab, Optional Products tab (upsell/cross-sell), Other Info tab with Sales/Delivery/Invoicing/Tracking sections. Features: quotation templates, margins display, optional products, online signatures, online payment validation, deadlines, delivery/invoice addresses, product variants, PDF quote builder, and custom email signatures."
      },
      {
        title: "Invoicing Methods",
        content: "Invoicing policies determine when/how invoices generate. Down payments: request before fulfillment. Pro-forma invoices: draft invoices not affecting accounting. Time & materials: invoicing based on actual work. Milestones: bill at defined project checkpoints."
      },
      {
        title: "Products & Prices",
        content: "Import products via file upload. Product variants with configurable attributes. Pricelists: multiple price levels per product with configurable rules, multi-currency support. Discounts at line and order level. eWallets and gift cards. Loyalty programs."
      },
      {
        title: "Returns & Refunds",
        content: "Dedicated workflow for processing returns and issuing refunds. Credit notes generated for accounting. Stock movements reversed for inventory."
      },
      {
        title: "Commissions",
        content: "Tracks salesperson earnings based on configurable rules tied to orders or revenue. Integrates with payroll."
      },
      {
        title: "Amazon Connector",
        content: "Synchronizes orders, products, and inventory. Features: FBA lot/serial tracking, order management, configuration setup."
      },
      {
        title: "Other Marketplace Connectors",
        content: "Shopee, Lazada, TikTok Shop — each with features, configuration, and order management. Gelato: print-on-demand integration."
      }
    ]
  },
  {
    id: "pos",
    name: "Point of Sale",
    icon: "🛒",
    topics: [
      {
        title: "Architecture",
        content: "Browser-based system working on any device. Built to maintain functionality during temporary network outages (offline-capable). Serves retail shops, restaurants, and self-ordering kiosks."
      },
      {
        title: "Hardware",
        content: "Local Network Access (pos_lna), IoT box for device connectivity, receipt printers (including ePOS network printers), electronic shelf labels, customer-facing displays, scales for weighted items, self-signed certificates for ePOS printers."
      },
      {
        title: "Restaurant Features",
        content: "Floor plan management (visual table layouts), table management, tip handling, online delivery integration, UrbanPiper (third-party delivery aggregator)."
      },
      {
        title: "Shop Features",
        content: "Quotation management from POS, 'ship later' order handling, barcode scanning and management, multi-employee login, preparation display (kitchen/bar), self-ordering kiosks, presets for quick configuration."
      },
      {
        title: "Payment Methods",
        content: "Cash machines: Cashdro, Cashmatic, Glory. Customer credit/tab accounts. QR code payments. Payment terminals: Adyen, DPO Pay, Ingenico, Mercado Pago, Mollie, Pine Labs, QFPay, Razorpay, SIX, Stripe, Tyro, Viva.com, Worldline."
      },
      {
        title: "Extra Features",
        content: "Pricing features: loyalty programs, discounts, special pricing. Combo products. Serial number display on receipts."
      }
    ]
  },
  {
    id: "inventory",
    name: "Inventory",
    icon: "📦",
    topics: [
      {
        title: "Product Types",
        content: "Storable (tracked in stock), Consumable (not tracked, expensed on receipt), Service (no physical movement). Units of measure standardize quantities."
      },
      {
        title: "Product Tracking",
        content: "Serial numbers: track individual unique items throughout lifecycle. Lot numbers: track groups/batches sharing common origin. Reassign serial/lot numbers when errors occur. Expiration dates: enables FEFO (First Expired, First Out)."
      },
      {
        title: "Warehouses & Locations",
        content: "Multi-warehouse setups supported. Hierarchical locations (shelves, bins, aisles). Operation types define nature of stock moves (receipts, deliveries, internal transfers)."
      },
      {
        title: "Shipping Configurations",
        content: "One-step: goods directly from supplier → stock → customer. Two-step: Supplier → Input → Stock → Output → Customer. Three-step: Supplier → Input → Quality → Stock → Packing → Output → Customer."
      },
      {
        title: "Routes (Push/Pull Rules)",
        content: "Routes define product paths through warehouse. Push rules: automatically move products to next location after trigger. Pull rules: generate upstream needs (procurement) when stock required downstream."
      },
      {
        title: "Replenishment",
        content: "Replenish on order (MTO): procure/manufacture only when sales order confirmed. Reordering rules: min/max stock triggers auto purchase/manufacturing orders. Just in Time: trigger procurement exactly when needed. Inter-warehouse replenishment: auto resupply between warehouses."
      },
      {
        title: "Putaway Rules",
        content: "Automatically direct incoming products to specific storage locations based on product attributes, quantities, or source. Reduces manual decision-making during receiving."
      },
      {
        title: "Storage Categories",
        content: "Classify locations by capability (refrigerated, hazardous, oversized). Restrict which products can be stored in which locations."
      },
      {
        title: "Removal Strategies",
        content: "FIFO (First In First Out), LIFO (Last In First Out), FEFO (First Expired First Out), Closest location (nearest storage), Least packages (minimize packages opened)."
      },
      {
        title: "Reservation Methods",
        content: "At confirmation: reserve immediately on order confirmation. Manual: users allocate specific stock. Before scheduled date: auto-reserve near delivery date."
      },
      {
        title: "Picking Methods",
        content: "Batch picking: group multiple operations. Cluster picking: organize by zones. Wave transfers: release in waves based on cut-off times, carrier schedules, or priorities."
      },
      {
        title: "Dropshipping & Consignment",
        content: "Dropshipping: ship directly from supplier to customer without warehouse passing. Consignment: manage goods owned by supplier but stored in your warehouse until consumed/sold."
      },
      {
        title: "Inventory Adjustments",
        content: "Periodic corrections to match physical counts. Cycle counts: rotating partial counts instead of full physical inventories. Scrap: designated removal of damaged/unusable stock."
      },
      {
        title: "Reporting",
        content: "Forecasted report: project future stock levels. Stock report: current on-hand quantities. Locations report: breakdown by location. Moves history: audit trail. Dashboards: visual metric summaries."
      },
      {
        title: "Delivery Methods & Carriers",
        content: "Bpost, DHL, EasyPost, Envia.com, FedEx, Sendcloud, Shiprocket, Starshipit, UPS, USPS, Zebra. Features: print shipping labels, multi-package shipments, shipping cost invoicing, dispatch management system."
      }
    ]
  },
  {
    id: "mrp",
    name: "Manufacturing (MRP)",
    icon: "🏭",
    topics: [
      {
        title: "Bills of Materials (BoMs)",
        content: "Defines components, quantities, and operations needed to produce a finished product. Foundational document for every manufacturing order (MO). Multi-level BoMs support sub-assemblies with hierarchical structures."
      },
      {
        title: "Manufacturing Steps",
        content: "One-step: consume raw materials → produce finished goods in single operation. Two-step: pick components → manufacture. Three-step: pick → work-in-progress → final production (most granular tracking)."
      },
      {
        title: "Work Centers",
        content: "Physical locations/resources where operations occur. Each has: Capacity (parallel operations), Efficiency ratings (affecting duration), Cost per hour (for MO cost computation), Linked equipment and maintenance schedules."
      },
      {
        title: "Work Order Dependencies",
        content: "Sequence work orders so certain operations must finish before others can begin. Enforces manufacturing process order at shop floor level."
      },
      {
        title: "MO Costs & WIP",
        content: "MO costs: component costs + labor costs from work centers + overhead. WIP: partially completed goods valued by materials consumed and labor applied before finished product completion."
      },
      {
        title: "Kits",
        content: "Groups of components shipped together but NOT assembled through MO. Assembled at delivery time rather than through manufacturing process."
      },
      {
        title: "Master Production Schedule (MPS)",
        content: "Planning tool that forecasts production needs over time horizon. Helps plan capacity and material requirements proactively."
      },
      {
        title: "By-Products",
        content: "Materials produced alongside primary product. Appear on BoM and received into inventory when MO completed."
      },
      {
        title: "Unbuild Orders",
        content: "Reverse manufacturing — disassemble finished product back into components. Used for returns, rework, recycling, or transferring components."
      },
      {
        title: "Scrap During Manufacturing",
        content: "Tracks materials/products becoming unusable during manufacturing. Recorded at any point in workflow, affecting inventory valuations and costs."
      },
      {
        title: "Backorders",
        content: "When MO is partially completed, unfinished quantity creates backorder — a new MO for remaining quantity. Maintains traceability."
      },
      {
        title: "Split and Merge MOs",
        content: "Split: break one MO into multiple smaller orders. Merge: combine multiple MOs into one for batch efficiency."
      },
      {
        title: "Subcontracting",
        content: "Basic: send raw materials to subcontractor who manufactures and returns. Resupply: auto replenish subcontractor raw materials. Dropship to subcontractor: materials ship directly from vendor to subcontractor."
      },
      {
        title: "Shop Floor",
        content: "Tablet-optimized interface for production floor workers. View/start/pause/complete work orders. Time tracking: clock in/out capturing actual labor time per operation."
      },
      {
        title: "Reporting",
        content: "Delays: MOs behind schedule. Allocation: component allocation across planned MOs. OEE (Overall Equipment Effectiveness): work center productivity across availability, performance, quality. Production Analysis: quantities, scrap rates, duration vs planned, cost variances."
      }
    ]
  },
  {
    id: "purchase",
    name: "Purchase",
    icon: "📋",
    topics: [
      {
        title: "RFQs (Requests for Quotation)",
        content: "Foundational procurement document. Workflow: Create RFQ → Send to vendor → Receive response → Confirm to Purchase Order. Products listed from catalog."
      },
      {
        title: "Blanket Orders",
        content: "Long-term purchasing agreements with pre-negotiated terms, pricing, and validity periods. Benefits: locked-in pricing, streamlined repeat ordering, reduced admin overhead, agreed quantities and delivery schedules."
      },
      {
        title: "Call for Tenders",
        content: "Competitive bidding: create tender → distribute to selected vendors → compare responses side-by-side → select winning bid → convert to PO."
      },
      {
        title: "Purchase Templates",
        content: "Pre-configured order templates for recurring purchases. Save default products, quantities, vendor selections for rapid order creation."
      },
      {
        title: "Reordering Rules",
        content: "Min/Max stock thresholds trigger auto purchase/manufacturing orders. Parameters: min/max quantity, replenishment method (buy/manufacture), lead time, preferred vendor. Temporary reordering rules for seasonal demand."
      },
      {
        title: "Control Policies",
        content: "How vendor bills match against POs and receipts. Ordered quantities: bill control based on what was ordered. Received quantities: bill control based on what was received. Tolerance thresholds for quantity/price variances."
      },
      {
        title: "Vendor Pricelists",
        content: "Import supplier pricing data in bulk. Links vendor-specific prices to products for accurate cost tracking. Multiple prices per vendor per product supported."
      },
      {
        title: "Historical Demand Suggestions",
        content: "Uses past sales/demand data to recommend optimal purchase quantities. Data-driven procurement to avoid overstocking and stockouts."
      },
      {
        title: "Reporting",
        content: "Purchase Analysis: spend by vendor, product, period. Vendor Costs Report: cost trends, price variances. Procurement Expenses: all costs beyond unit prices. Dashboard: spend by vendor, PO status, delivery performance, cost trends."
      },
      {
        title: "EDI Integration",
        content: "Electronic Data Interchange for automated import of purchase orders from customer systems into Odoo as sales orders (and vice versa). Streamlines B2B transaction flows."
      }
    ]
  },
  {
    id: "hr",
    name: "Human Resources",
    icon: "👥",
    topics: [
      {
        title: "Employee Records",
        content: "Multiple tabs: Resumé (skills, certifications, skill types), Personal (private info, emergency contact, citizenship, family, documents, visa/work permit, education, bank account), Work (details, location, notes, org chart), Certifications, Payroll (contract, employer costs, schedule), Settings (user creation, approvers)."
      },
      {
        title: "Onboarding & Offboarding",
        content: "Structured onboarding plans with defined steps — viewable, modifiable, creatable, launchable. Offboarding plans with step-by-step workflow, ending with archive employee action."
      },
      {
        title: "Departments",
        content: "Create new departments. Dashboard with three views: Kanban, List, Hierarchy."
      },
      {
        title: "Attendances",
        content: "Check in/out via badge, RFID, or manual PIN. Kiosks with badge/RFID/manual modes. Overtime rulesets: conditions (quantity-based or timing-based) and actions. Time off ledger reconciles attendance records vs time off — resolves 4 conflict types."
      },
      {
        title: "Time Off",
        content: "Time off types (configurable), public holidays calendar, allocations, accrual plans (accruing over time), employee requests, manager approval, dedicated reporting."
      },
      {
        title: "Recruitment",
        content: "Job positions → post → applicants → schedule interviews → offer/refuse. Recruitment flow: structured pipeline. Analysis: applicant metrics, source analysis, velocity (speed through pipeline), team performance."
      },
      {
        title: "Appraisals",
        content: "Schedule (auto via plans or manual). Process: employee self-assessment → manager feedback + 360 input → review meeting → final rating. Goals library with description and sub-goals. Skills evolution report tracks development."
      },
      {
        title: "Payroll",
        content: "Contracts, salaries, work entries, working schedules, salary adjustments, payslips, pay runs, commissions. Localizations: Australia, Belgium, Egypt, Hong Kong, India, Jordan, Kenya, Mexico, Saudi Arabia, Türkiye, UAE, US, plus Employment Hero Payroll."
      },
      {
        title: "Fleet",
        content: "Models/manufacturers, vehicles, services (maintenance), accidents. Cost analysis and odometer analysis reports."
      },
      {
        title: "Other HR Apps",
        content: "Referrals: share jobs, earn points, redeem rewards, alerts, analysis. Lunch: vendors, products, orders, user accounts. Frontdesk: visitor management with stations and kiosks."
      }
    ]
  },
  {
    id: "website",
    name: "Website & eCommerce",
    icon: "🌐",
    topics: [
      {
        title: "Website Builder",
        content: "Create from scratch or import existing site. Drag-and-drop building blocks for layout assembly. Free custom domain for one year on Odoo Online."
      },
      {
        title: "Design",
        content: "Building blocks: pre-built content blocks (text, images, banners). Themes: overall visual styling controlling colors, fonts, look-and-feel. Elements: individual UI components. Visibility: show/hide blocks based on conditions."
      },
      {
        title: "Structure",
        content: "Pages: create/manage content hierarchy. Headers/Footers: persistent navigation across pages. SEO: meta tags, structured URLs, content optimization."
      },
      {
        title: "Configuration",
        content: "Domain names (1 free year), Google Search Console, cookies bar (compliance), translations (multi-language), multiple websites (single instance), forms spam protection, CDN for global delivery."
      },
      {
        title: "eCommerce",
        content: "Configuration: products, categories/variants, prices, customer accounts, B2B/B2C modes with different pricing and tax display. Design: product page, catalog, additional features. Checkout: cart, address, shipping, payment, confirmation."
      },
      {
        title: "Delivery & Order Handling",
        content: "Shipping options: flat rate, weight-based, carrier-specific. Integrates with DHL, FedEx, UPS, USPS. Order processing, fulfillment tracking, customer notifications, return/refund management."
      },
      {
        title: "Google Merchant Center",
        content: "Sync product feeds to Google Shopping for product listing ads and organic shopping visibility."
      },
      {
        title: "eLearning, Forum, Blog, Live Chat",
        content: "eLearning: courses with content. Forum: community discussions. Blog: content marketing with posts. Live Chat: real-time widget with ratings, commands/canned responses, chatbots, reports, and channel participation."
      }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "📢",
    topics: [
      {
        title: "Email Marketing",
        content: "Dashboard: List, Kanban, Calendar, Graph views. Mail creation: subject, recipient filters, body, A/B testing tab, Settings tab. Sending: immediate, scheduled, or test. Mailing lists & contacts: create lists, add contacts, link to website. Unsubscription vs blacklist (different concepts). Lost leads reactivation workflow. Metrics: opened, replied, clicked, received, bounced rates."
      },
      {
        title: "SMS Marketing",
        content: "Setup requires SMS account registration and credit purchase. Message creation with link tracking. Campaign settings: A/B tests, templates. Lists and blacklists with import. Twilio integration for SMS delivery."
      },
      {
        title: "Social Marketing",
        content: "Connect/manage social accounts. Streams aggregate content. Posts: company, destination, message, images, campaign, timing, push notifications. Create leads from comments. Post insights and analytics."
      },
      {
        title: "Marketing Automation",
        content: "Target audiences with filters. Workflow activities: Email, SMS, Server Actions (including custom). Each activity: trigger types, expiry durations, activity domains. Child activities for branching. Campaigns: test before running, stop when needed. Templates including Double Opt-in. Metrics: activity graphs, filters, link tracking, traces, participants."
      },
      {
        title: "Events",
        content: "Creation with Tickets, Communication, Questions, Notes tabs. Templates with Booths tab. Promotion: ticket sales, lead generation, sponsors, booths. Attendee experience: slots, tracks, talks/agenda. Registration desk. Reporting: revenues and attendees."
      },
      {
        title: "Surveys",
        content: "Creation, scoring mechanisms, question types, live session surveys (real-time polling), results analysis."
      }
    ]
  },
  {
    id: "project",
    name: "Project & Timesheets",
    icon: "📐",
    topics: [
      {
        title: "Project Management",
        content: "Dashboard: centralized status and metrics. Profitability: financial performance tracking. Milestones: key checkpoints marking progress. Templates: pre-configured structures for standardizing new projects."
      },
      {
        title: "Task Management",
        content: "Task stages: configurable pipeline stages representing lifecycle. Task creation: methods and workflows. Recurring tasks: repeat on defined schedule. Sub-tasks: hierarchical breakdown. Dependencies: sequencing constraints (one must finish before another starts)."
      },
      {
        title: "Timesheets",
        content: "Billing rates per employee/project. Leaderboard comparing team performance or logged hours. Time off entries integration with leave management."
      },
      {
        title: "Field Service",
        content: "On-site service tasks, product management for field inventory, itinerary planning (route optimization), worksheets for field workers."
      },
      {
        title: "Planning",
        content: "Scheduling and resource allocation across projects and employees."
      }
    ]
  },
  {
    id: "helpdesk",
    name: "Helpdesk",
    icon: "🎫",
    topics: [
      {
        title: "Ticket Management",
        content: "Receiving tickets: multiple channels for ticket intake. Help Center: self-service portal for customers to find answers. Ticket pipeline stages configurable."
      },
      {
        title: "SLAs (Service Level Agreements)",
        content: "Define and track response/resolution time commitments. Automatically escalate tickets approaching or exceeding SLA thresholds."
      },
      {
        title: "Customer Ratings",
        content: "Collect feedback on support interactions. Used to measure support quality and team performance."
      },
      {
        title: "Advanced Features",
        content: "After-sales services: integrate post-sale support. Close tickets: resolution procedures. Track and bill time: timesheet integration for logging and invoicing support hours."
      },
      {
        title: "Reporting",
        content: "Analyze helpdesk performance: ticket volume, resolution time, SLA compliance, customer satisfaction, team workload."
      }
    ]
  },
  {
    id: "productivity",
    name: "Productivity Apps",
    icon: "🛠️",
    topics: [
      {
        title: "Spreadsheet",
        content: "Create from templates or upload files. Insert/link Odoo data: lists (add records/fields), pivot tables (static/dynamic, convertible), charts, clickable links, financial data. Functions by category: Array, Database, Date, Engineering, Filter, Financial, Info, Logical, Lookup, Math, Operators, Parser, Statistical, Text, Web — plus Odoo-specific functions. Global filters: Date, Relation, Text, Yes/No, Selection, Numeric. Convert spreadsheets into dashboards."
      },
      {
        title: "Documents",
        content: "Configuration: deletion delay, file centralization. Files: URL links, spreadsheets. Splitting/merging PDFs. Requesting files. Email aliases, tags, linked records. Sharing and access rights. Cross-app file management. AI file digitization."
      },
      {
        title: "Sign",
        content: "Request signatures: one-off from Sign app or any Odoo record. Templates: create, edit, reuse. Document preparation: add fields, envelopes, signers. Configuration: signing order, validity dates, reminders. Security: signatory hash, certificate of completion, SMS code, Aadhaar eSign, Itsme®, cryptographic signatures. Legal validity guidance for EU, US, and other countries."
      },
      {
        title: "Knowledge",
        content: "Centralized knowledge management system. Create, organize, and share articles. Rich text editing with embedded media. Linked to other Odoo records."
      },
      {
        title: "Dashboards",
        content: "Build and customize dashboards with widgets. My Dashboard: personal view. Pull data from across Odoo modules."
      },
      {
        title: "Calendar",
        content: "Scheduling with Outlook and Google synchronization. Meeting management with attendees and resources."
      },
      {
        title: "Appointments",
        content: "Booking pages for customers/colleagues. Google Reserve integration. Opportunities from appointments."
      },
      {
        title: "Discuss (Chatter)",
        content: "Team channels, ICE servers/Twilio for calls. Chatter: record-level communication (messages, notes, activities). Canned responses for quick replies."
      },
      {
        title: "WhatsApp & Phone",
        content: "WhatsApp: messaging integration. Phone: Axivox (configuration, users, voicemails, dynamic caller ID, conference calls, dial plans, call queues), DIDWW, OnSIP, phone widget, device integrations."
      },
      {
        title: "To-do",
        content: "Personal task management. Create, assign, prioritize, and track to-do items."
      }
    ]
  },
  {
    id: "studio",
    name: "Studio",
    icon: "🎨",
    topics: [
      {
        title: "Fields and Widgets",
        content: "Create custom fields on any model. Configure widgets for field display and input. Drag-and-drop field placement on views."
      },
      {
        title: "Views",
        content: "Customize form, list, kanban, and search views. Modify existing views or create new ones. Control field visibility, order, and grouping."
      },
      {
        title: "Models, Modules, and Apps",
        content: "Create new data models. Build custom modules. Export as standalone apps. Define relationships between models."
      },
      {
        title: "Automation Rules",
        content: "Create automated actions with triggers and actions. Webhooks: send data to external services on record events. Configure conditions and filters."
      },
      {
        title: "PDF Reports",
        content: "Design custom PDF report templates. Use QWeb templating for layout. Include data from related records."
      },
      {
        title: "Approval Rules",
        content: "Define approval workflows for any record type. Configure approvers, conditions, and escalation rules."
      }
    ]
  },
  {
    id: "ai",
    name: "Odoo AI",
    icon: "🤖",
    topics: [
      {
        title: "AI API Keys",
        content: "Configure API access for AI features. Different AI services may require different keys."
      },
      {
        title: "AI Agents",
        content: "Set up autonomous AI agents that can perform tasks. Configurable with prompts and actions."
      },
      {
        title: "AI Features",
        content: "Default prompts management. Document sort: automated categorization. AI fields: AI-powered field enhancements. Live chat: AI-assisted responses. Server actions: AI-driven automated actions. Email templates: AI-enhanced generation. Voice transcription: speech to text. Text improvement: write and refine with AI. Support workflows: AI integration into helpdesk."
      }
    ]
  },
  {
    id: "expenses",
    name: "Expenses",
    icon: "💳",
    topics: [
      {
        title: "Expense Categories",
        content: "Classify expenses for reporting and accounting. Configuration of invoicing-related settings."
      },
      {
        title: "Expense Cards",
        content: "Physical/virtual cards requiring Stripe connected account. Workflow: add funds → configure → activate → use. PIN management, lost card handling, temporary pauses."
      },
      {
        title: "Logging Expenses",
        content: "Four methods: manual entry with receipt attachment, upload via digitalization, drag and drop, email submission via email gateway."
      },
      {
        title: "Approval Workflow",
        content: "My expenses dashboard for submission. Manager approval: individual or batch. Refusal with reasons."
      },
      {
        title: "Posting & Reimbursement",
        content: "Post to accounting (individual or bulk). Reimburse: via payslips, cash, check, or direct deposit. Reinvoice: pass expenses to clients."
      },
      {
        title: "Analysis",
        content: "Expense analysis report filterable by employee and category."
      }
    ]
  },
  {
    id: "subscriptions",
    name: "Subscriptions & Rental",
    icon: "🔄",
    topics: [
      {
        title: "Subscriptions",
        content: "eCommerce integration for recurring sales. Upsell management. Renewal processing with automatic and manual options. Closing subscriptions. Reports on recurring revenue. Automatic payments for renewals. Delivery management for subscription products."
      },
      {
        title: "Rental",
        content: "Product configuration: rental type, physical vs service rentals. Order creation with deposit handling. Scheduling and availability tracking."
      }
    ]
  },
  {
    id: "general",
    name: "General Settings",
    icon: "⚡",
    topics: [
      {
        title: "Users & Access Rights",
        content: "Languages per user. Two-factor authentication (2FA). Access rights: groups define what users can see/do. Portal access for external users. Social authentication: Facebook, Google, Azure. LDAP integration."
      },
      {
        title: "Companies",
        content: "Multi-company setup. Digest emails. Email templates for system notifications."
      },
      {
        title: "IoT",
        content: "IoT box setup and configuration. Windows virtual IoT. System connection, troubleshooting, updates. SSH access. Device support: printers, scales, screens, measurement tools, cameras, footswitches."
      },
      {
        title: "Email Communication",
        content: "Inbound/outbound email servers. DNS configuration. Outlook and Gmail OAuth integration. Mailjet for transactional emails. Email FAQ and troubleshooting."
      },
      {
        title: "Integrations",
        content: "Mail plugins for Outlook and Gmail. Unsplash for stock images. Address autocomplete. Geolocation services. Google Translate. Cloud storage connections."
      },
      {
        title: "Developer Mode",
        content: "Access technical settings, field information, view definitions, and debugging tools. Activated via Settings or URL parameter."
      }
    ]
  }
];

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KNOWLEDGE_BASE;
}
