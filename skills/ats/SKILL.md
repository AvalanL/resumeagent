# ATS Score Checker Skill

Analyze resumes against job descriptions to maximize ATS compatibility.

## Trigger

User says `/ats` or asks to check their resume against a job posting.

## Process

### 1. Gather Inputs

Ask for:
1. **Their resume** (paste text or reference saved file)
2. **Target job description** (paste the full posting)

### 2. Extract Keywords

From the job description, identify:

**Hard Skills (Technical)**
- Software, tools, technologies mentioned
- Certifications required
- Methodologies (Agile, Six Sigma, etc.)

**Soft Skills**
- Leadership, communication, teamwork
- Problem-solving, analytical

**Industry Terms**
- Jargon specific to the field
- Acronyms and their expanded forms

**Action Verbs**
- What verbs do they use? (managed, led, developed)

### 3. Score the Resume

Calculate match percentage:

```
ATS Score = (Matched Keywords / Total Required Keywords) × 100
```

**Scoring Guide:**
| Score | Rating | Action Needed |
|-------|--------|---------------|
| 80%+ | Excellent | Minor tweaks only |
| 60-79% | Good | Add missing keywords |
| 40-59% | Fair | Significant revision needed |
| <40% | Poor | Major rewrite or wrong job fit |

### 4. Generate Report

```
📊 ATS COMPATIBILITY REPORT

Overall Score: 72% ✓ Good

✅ MATCHED KEYWORDS (18/25):
• Project Management ✓
• Agile ✓
• Stakeholder Communication ✓
• Budget Management ✓
[...]

❌ MISSING KEYWORDS (7/25):
• Jira — Add to skills or experience
• Confluence — Mention in tools section
• Cross-functional — Use in bullet points
• KPIs — Quantify with this term
[...]

📝 RECOMMENDATIONS:
1. Add "Jira" to your skills section
2. Replace "worked with teams" → "led cross-functional teams"
3. Add metrics: "managed $X budget" or "delivered X% under budget"
4. Include "KPIs" when describing achievements

🎯 QUICK WINS:
• Swap "responsible for" → "managed" or "led"
• Add specific numbers to 3 more bullets
• Mirror their exact phrase "stakeholder engagement"
```

### 5. Offer Rewrites

For each missing keyword, offer to:
- Suggest where to add it naturally
- Rewrite specific bullets to include it
- Add to skills section if appropriate

## Keyword Categories

### Always Important
- Job title variations
- Required certifications
- Core technical skills
- Years of experience indicators

### Often Overlooked
- Soft skills (they matter for ATS too)
- Industry acronyms + spelled out versions
- Location-specific terms
- Company values/culture words

## Common ATS Systems

**Know the enemy:**
- Workday
- Taleo (Oracle)
- Greenhouse
- Lever
- iCIMS
- BrassRing
- SmartRecruiters

**All prefer:**
- Simple formatting
- Standard section headers
- Keywords in context (not just listed)
- .docx or .pdf format

## Output

Provide:
1. **Score** with breakdown
2. **Missing keywords** with suggestions
3. **Rewritten bullets** (offer to generate)
4. **Optimized resume** (if requested)

## Example Interaction

```
User: /ats

Agent: I'll check your resume against a job posting. 
       Please paste the job description first.

User: [pastes job description]

Agent: Got it! Now paste your current resume text.

User: [pastes resume]

Agent: 
📊 ATS Score: 68% — Good, but let's get you to 80%+

Missing 8 keywords the ATS is likely scanning for:
1. "Salesforce" — They mention it 3x, you don't have it
2. "Pipeline management" — Key phrase, add to experience
3. "Revenue growth" — Use instead of "increased sales"
[...]

Want me to rewrite your bullets to include these keywords naturally?
```
