#!/usr/bin/env node
/**
 * Resume PDF Generator
 * Usage: node tools/generate-pdf.js <resume.json> <output.pdf>
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF(jsonPath, outputPath) {
  // Try to use system Chrome first, fall back to bundled
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // Use system Chrome if available (common on Mac/Windows)
    executablePath: process.env.CHROME_PATH || undefined,
  });
  
  const page = await browser.newPage();
  
  // Read resume data
  const resume = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // Generate HTML from template
  const html = generateResumeHTML(resume);
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
    printBackground: true
  });
  
  await browser.close();
  console.log(`PDF generated: ${outputPath}`);
}

function generateResumeHTML(r) {
  const experienceHTML = (r.experience || []).map(job => `
    <div class="job">
      <div class="job-header">
        <div>
          <span class="job-title">${job.title}</span>
          <span class="job-company"> — ${job.company}</span>
        </div>
        <span class="job-dates">${job.startDate} – ${job.endDate || 'Present'}</span>
      </div>
      <ul class="job-bullets">
        ${(job.bullets || []).map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  const skillsHTML = (r.skills || []).map(s => `<span class="skill">${s}</span>`).join('');

  const educationHTML = (r.education || []).map(e => `
    <div class="education-item">
      <span class="degree">${e.degree}</span>
      <span class="school"> — ${e.school}</span>
      ${e.year ? `<span class="year"> (${e.year})</span>` : ''}
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.4; color: #333; }
    .header { text-align: center; margin-bottom: 16px; border-bottom: 2px solid #2c5282; padding-bottom: 12px; }
    .name { font-size: 24pt; font-weight: bold; color: #1a365d; margin-bottom: 4px; }
    .contact { font-size: 10pt; color: #4a5568; }
    .contact a { color: #2b6cb0; text-decoration: none; }
    .section { margin-bottom: 14px; }
    .section-title { font-size: 12pt; font-weight: bold; color: #2c5282; border-bottom: 1px solid #cbd5e0; margin-bottom: 8px; padding-bottom: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
    .summary { font-size: 10.5pt; color: #4a5568; margin-bottom: 12px; }
    .job { margin-bottom: 12px; }
    .job-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
    .job-title { font-weight: bold; color: #1a365d; }
    .job-company { color: #4a5568; }
    .job-dates { color: #718096; font-size: 10pt; }
    .job-bullets { padding-left: 20px; margin-top: 4px; }
    .job-bullets li { margin-bottom: 3px; font-size: 10.5pt; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill { background: #ebf4ff; color: #2b6cb0; padding: 2px 8px; border-radius: 3px; font-size: 10pt; }
    .education-item { margin-bottom: 8px; }
    .degree { font-weight: bold; }
    .school { color: #4a5568; }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${r.name || 'Your Name'}</div>
    <div class="contact">
      ${r.location || ''} ${r.phone ? '| ' + r.phone : ''} ${r.email ? '| ' + r.email : ''} ${r.linkedin ? '| ' + r.linkedin : ''}
    </div>
  </div>

  ${r.summary ? `
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <div class="summary">${r.summary}</div>
  </div>
  ` : ''}

  ${experienceHTML ? `
  <div class="section">
    <div class="section-title">Experience</div>
    ${experienceHTML}
  </div>
  ` : ''}

  ${skillsHTML ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-list">${skillsHTML}</div>
  </div>
  ` : ''}

  ${educationHTML ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${educationHTML}
  </div>
  ` : ''}
</body>
</html>`;
}

// CLI
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node generate-pdf.js <resume.json> <output.pdf>');
  process.exit(1);
}

generatePDF(args[0], args[1]).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
