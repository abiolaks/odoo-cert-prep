# Odoo 19 Functional Certification Prep

Prepare for the [Odoo 19 Functional Certification](https://www.odoo.com/slides/odoo-19-functional-certification-502) exam. Includes a full exam simulator, drill mode, structured knowledge base, and Q&A search — all from the official documentation.

## Exam Format

- **120-125 multiple-choice questions** in **90 minutes**
- **Scoring:** +1 correct / −0.5 wrong / 0 unanswered
- **Passing:** 70%
- **Cost:** $150 USD
- **Covers 18+ modules** — Accounting, CRM, Sales, POS, Inventory, Manufacturing, Purchase, HR, Website, eCommerce, Marketing, Project, Timesheets, Helpdesk, Spreadsheet, Knowledge, Studio, AI, Expenses, Subscriptions, and more

## Features

### 📝 Full Exam Simulator
Simulates the real exam — 120 random questions, 90-minute timer, same scoring (+1/−0.5/0). After the test, see your score, module breakdown, and review every answer with explanations.

### 🎯 Drill Mode
Practice specific modules at your own pace. Choose the module and number of questions. Option to show answers immediately (learning mode) or test yourself blind.

### 📚 Knowledge Base
Structured reference covering all exam modules. Browse by module or search across all topics. Content sourced from the official Odoo 19.0 user documentation.

### 🔍 Q&A Search
Ask questions in natural language and get answers from the knowledge base. Searches across all modules and surfaces the most relevant documentation.

### 📊 History
Your past exam attempts are saved locally (browser storage). Track your progress over time.

## How to Use

Open `index.html` in your browser or visit the GitHub Pages URL.

All data is client-side — no server required. Your exam history stays in your browser's local storage.

## Structure

```
odoo-cert-prep/
├── index.html            # Main web application
├── styles.css            # Tokyo Night themed styling
├── main.js               # App logic (exam, drill, search)
├── data/
│   ├── knowledge-base.js # Structured Odoo 19 docs
│   └── questions.js      # 200+ practice questions
└── README.md
```

## Study Tips

1. **Use a live Odoo database** — navigation speed and workflow familiarity are tested
2. **Understand the "why"** — the exam tests cross-module integration, not isolated facts
3. **Watch for tricky wording** — "choose all that apply," negation traps, "and" vs "or"
4. **Don't guess** — with −0.5 penalty, skipping is better than random guessing
5. **Focus on weak modules** — use Drill Mode to target your lowest-scoring areas
6. **Study module integration** — how Sales connects to Inventory, Inventory to Accounting, etc.

## Sources

- [Odoo 19.0 User Documentation](https://www.odoo.com/documentation/19.0/applications.html)
- [Odoo 19 Functional Certification](https://www.odoo.com/slides/odoo-19-functional-certification-502)

## License

This is a personal study aid. Odoo® is a registered trademark of Odoo S.A.
