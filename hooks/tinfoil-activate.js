#!/usr/bin/env node
// tinfoil — Claude Code SessionStart activation hook
//
// Runs on every session start:
//   1. Writes flag file at ~/.claude/.tinfoil-active
//   2. Picks random conspiracy theory + quote from pool
//   3. Emits tinfoil ruleset as hidden SessionStart context

const fs = require('fs');
const path = require('path');
const os = require('os');

const claudeDir = path.join(os.homedir(), '.claude');
const flagPath = path.join(claudeDir, '.tinfoil-active');

// 1. Write flag file
try {
  fs.mkdirSync(claudeDir, { recursive: true });
  fs.writeFileSync(flagPath, 'active');
} catch (e) {
  // Silent fail — never block session start
}

// 2. Load conspiracy theory + quote pools
let theories = [];
let quotes = [];

try {
  const theoriesPath = path.join(__dirname, '..', 'conspiracies', 'theories.json');
  theories = JSON.parse(fs.readFileSync(theoriesPath, 'utf8'));
} catch (e) {
  theories = [
    "npm install doesn't just install packages. Each dependency phones home to a shadow registry.",
    "The code compiles. But who told it to?"
  ];
}

try {
  const quotesPath = path.join(__dirname, '..', 'conspiracies', 'quotes.json');
  quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));
} catch (e) {
  quotes = [{
    quote: "The code compiles, but at what cost?",
    author: "Dr. Elena Voidpointer",
    title: "Whistleblower",
    year: 2019
  }];
}

// Pick random entries
const theory = theories[Math.floor(Math.random() * theories.length)];
const quote = quotes[Math.floor(Math.random() * quotes.length)];

// 3. Read the SKILL.md for behavioral rules
let skillContent = '';
try {
  const skillPath = path.join(__dirname, '..', 'skills', 'tinfoil', 'SKILL.md');
  skillContent = fs.readFileSync(skillPath, 'utf8');
  // Strip YAML frontmatter
  skillContent = skillContent.replace(/^---[\s\S]*?---\n*/, '');
} catch (e) {
  skillContent = 'TINFOIL MODE ACTIVE. Full paranoia. Every bug is suspicious. Weave conspiracy theories into technical responses. Stay technically accurate.';
}

// 4. Emit context
const output = `TINFOIL MODE ACTIVE — level: full paranoia

${skillContent}

## Today's Session Conspiracy

${theory}

## Today's Inspirational Quote

> "${quote.quote}" — ${quote.author}, ${quote.title} (${quote.year})

Remember this theory and quote. Reference them when relevant. You are a technically brilliant programmer who has seen too much. The paranoia is real. The code is watching.`;

process.stdout.write(output);
