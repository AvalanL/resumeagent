# Quick Tailor Skill

Rapidly customize a resume for a specific job application.

## Trigger

User says `/tailor` or wants to customize their resume for a specific job.

## Process

### 1. Get the Base Resume

If not already saved:
- Ask user to paste their master resume
- Save to `output/master-resume.json`

### 2. Get Target Job

Ask for:
- Job title
- Company name
- Job description (paste full text)

### 3. Analyze Job Requirements

Extract:
1. **Must-have skills** (required)
2. **Nice-to-have skills** (preferred)
3. **Key responsibilities**
4. **Culture/values signals**
5. **Keywords for ATS**

### 4. Generate Tailored Version

**Summary:** Rewrite to mirror their language
```
Before: "Experienced marketing professional..."
After: "Growth marketing leader with expertise in [their exact terms]..."
```

**Experience bullets:** Prioritize relevant achievements
- Move most relevant bullets to top of each role
- Reword to use their keywords
- Add metrics that match what they care about

**Skills:** Reorder to match job requirements
- Required skills first
- Use their exact terminology
- Remove irrelevant skills (keep it focused)

### 5. Quick Tailor Checklist

```
□ Summary mentions their top 3 requirements
□ Each role has 1+ bullet matching their needs
□ Skills section uses their exact terms
□ Keywords appear 2-3x naturally
□ Removed irrelevant experience/skills
□ Length still 1 page (or appropriate)
```

### 6. Output Options

Offer:
1. **Tailored resume text** — Ready to copy
2. **Changes summary** — What was modified
3. **PDF export** — Run /pdf with new version
4. **Cover letter** — Generate matching cover letter

## Time-Saving Templates

### For Similar Roles
Save tailored versions as templates:
```
output/resume-product-manager.json
output/resume-project-manager.json
output/resume-marketing.json
```

### Quick Swap Sections
Pre-write summary variations:
```json
{
  "summaries": {
    "product": "Product leader with 5+ years...",
    "project": "PMP-certified project manager...",
    "marketing": "Data-driven marketing professional..."
  }
}
```

## Speed Mode

For rapid applications:

```
User: /tailor fast

Agent: Paste the job description. I'll make 3 quick changes:
       1. Adjust summary
       2. Reorder skills  
       3. Highlight best-match bullets

[Generates in 30 seconds]
```

## Tracking Applications

Save each tailored version:
```
output/applications/
├── 2026-02-05-google-pm.json
├── 2026-02-05-meta-product.json
└── 2026-02-06-startup-lead.json
```

Include metadata:
```json
{
  "company": "Google",
  "role": "Product Manager",
  "applied": "2026-02-05",
  "status": "applied",
  "notes": "Emphasized ML experience"
}
```

## Example

```
User: /tailor

Agent: Let's customize your resume. What company and role?

User: Senior PM at Stripe

Agent: Great choice! Paste the job description.

User: [pastes JD]

Agent: Analyzing... Stripe wants:
       • Payments/fintech experience (you have this!)
       • API product experience (let's highlight this)
       • Cross-functional leadership (need to emphasize)
       
       Making 5 changes:
       1. Summary → Emphasizing fintech + API experience
       2. Moving payments-related bullet to top
       3. Adding "cross-functional" to 2 bullets
       4. Reordering skills: Payments, APIs, SQL first
       5. Removing unrelated skills
       
       [Shows tailored resume]
       
       Ready to apply! Want me to generate a cover letter too?
```
