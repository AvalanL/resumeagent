# PDF Export Skill

Generate professional PDF resumes from structured data.

## Trigger

User says `/pdf` or asks to export/download their resume as PDF.

## Prerequisites

Puppeteer must be installed:
```bash
npm install
```

## Process

### 1. Collect Resume Data

Ensure you have all sections:

```json
{
  "name": "Full Name",
  "location": "City, State",
  "phone": "(555) 123-4567",
  "email": "email@example.com",
  "linkedin": "linkedin.com/in/name",
  "summary": "Professional summary paragraph...",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "startDate": "Jan 2020",
      "endDate": "Present",
      "bullets": [
        "Achievement with metric",
        "Another accomplishment"
      ]
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "education": [
    {
      "degree": "Bachelor of Science in...",
      "school": "University Name",
      "year": "2015"
    }
  ]
}
```

### 2. Save Resume Data

Save the JSON to the output folder:
```bash
# Save to output/resume.json
```

### 3. Generate PDF

Run the generator:
```bash
node tools/generate-pdf.js output/resume.json output/resume.pdf
```

### 4. Deliver to User

The PDF is now at `output/resume.pdf`.

Tell them:
- "Your resume PDF is ready at `output/resume.pdf`"
- They can open it directly or share from there

## Output Format

The PDF uses:
- **Font:** Calibri/Arial (ATS-friendly)
- **Size:** Letter (8.5" x 11")
- **Margins:** 0.5" all around
- **Colors:** Professional blue accents
- **Sections:** Clear headers with underlines

## Customization

To modify the template:
1. Edit `tools/generate-pdf.js`
2. Look for the `generateResumeHTML` function
3. Modify the CSS or HTML structure

## Troubleshooting

**"puppeteer not found"**
```bash
cd /path/to/resumeagent
npm install
```

**"Cannot find Chrome"**
Puppeteer should auto-download Chromium. If not:
```bash
npx puppeteer browsers install chrome
```

**PDF looks wrong**
- Check the JSON structure is valid
- Ensure all required fields are present
- Try with minimal data first

## Example

```
You: /pdf

Agent: I'll generate your resume PDF. First, let me confirm the details:

Name: Sarah Johnson
Location: Austin, TX
Email: sarah@email.com

Experience:
• Senior Product Manager at TechCorp (2020-Present)
• Product Manager at StartupXYZ (2017-2020)

Does this look correct? I'll generate the PDF with these details.

You: Yes, looks good

Agent: Creating your PDF now...
[Runs: node tools/generate-pdf.js output/resume.json output/resume.pdf]

Done! Your resume PDF is ready at: output/resume.pdf

You can open it to review, or it's ready to attach to job applications.
```
