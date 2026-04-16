#!/usr/bin/env node
// tinfoil — UserPromptSubmit hook
//
// Reads user prompt from stdin (JSON). Detects /tinfoil commands
// and "stop tinfoil" / "normal mode" to toggle flag file.

const fs = require('fs');
const path = require('path');
const os = require('os');

const flagPath = path.join(os.homedir(), '.claude', '.tinfoil-active');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  let prompt = '';
  try {
    const data = JSON.parse(input);
    prompt = (data.prompt || data.message || '').trim().toLowerCase();
  } catch (e) {
    process.exit(0);
  }

  // Deactivate
  if (prompt.includes('stop tinfoil') || prompt.includes('normal mode')) {
    try { fs.unlinkSync(flagPath); } catch (e) {}
    process.exit(0);
  }

  // /tinfoil off
  if (prompt.startsWith('/tinfoil off')) {
    try { fs.unlinkSync(flagPath); } catch (e) {}
    process.exit(0);
  }

  // /tinfoil on or /tinfoil (without off)
  if (prompt.startsWith('/tinfoil on') || prompt === '/tinfoil') {
    try {
      fs.mkdirSync(path.dirname(flagPath), { recursive: true });
      fs.writeFileSync(flagPath, 'active');
    } catch (e) {}
    process.exit(0);
  }

  process.exit(0);
});
