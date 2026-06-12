const fs = require('fs');
const path = require('path');

// Read the HTML file
const filePath = process.argv[1];
const content = fs.readFileSync(filePath, 'utf8');

// Find the E-7-1 section
const e71Match = content.match(/e71:\s*\{[\s\S]*?docs:\s*\{[\s\S]*?\}\s*\},/);
if (!e71Match) {
  console.error('E-7-1 section not found');
  process.exit(1);
}

// Extract just the docs section
const docsMatch = content.match(/e71:[\s\S]*?docs:\s*\{([\s\S]*?)\}\s*\},\s*e74:/);
if (docsMatch) {
  const docsContent = docsMatch[1];
  
  // Check for 'change' array
  if (docsContent.includes('change:')) {
    console.log('✓ Change section found');
    const changeMatches = docsContent.match(/change:\s*\[([\s\S]*?)\]/);
    if (changeMatches) {
      const changeItems = changeMatches[1].match(/\{[\s\S]*?\}/g);
      console.log();
    }
  }
  
  // Check for 'extension' array
  if (docsContent.includes('extension:')) {
    console.log('✓ Extension section found');
    const extensionMatches = docsContent.match(/extension:\s*\[([\s\S]*?)\]/);
    if (extensionMatches) {
      const extensionItems = extensionMatches[1].match(/\{[\s\S]*?\}/g);
      console.log();
    }
  }
  
  // Check for employee/company indicators
  if (docsContent.includes('[근로자]') || docsContent.includes('[회사]')) {
    console.log('✓ Employee/Company sections found');
  }
  
  if (docsContent.includes('[Phía người lao động]') || docsContent.includes('[Phía công ty')) {
    console.log('✓ Vietnamese employee/company sections found');
  }
}
