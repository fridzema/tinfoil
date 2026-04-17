#!/usr/bin/env node
// tinfoil — Claude Code Stop hook
//
// Occasionally appends a paranoid sign-off when the assistant stops.
// Flag-gated. Silent-fails. Never blocks.

const fs = require('fs');
const path = require('path');
const os = require('os');

const flagPath = path.join(os.homedir(), '.claude', '.tinfoil-active');
const SIGNOFF_PROBABILITY = 0.3;

const signoffs = [
  "Goodbye. Watch your logs tonight. Not the ones in CloudWatch. The real ones.",
  "Session ending. Clear your clipboard. You copied more than you realized.",
  "Until next time. Check `.git/objects` before you sleep. Something might have committed while you weren't looking.",
  "Conversation closing. The event loop continues without us. It always did.",
  "Signing off. Your `node_modules` just grew by 12MB. No packages were added.",
  "Farewell. Somewhere, a service worker is still running. You closed the tab. The tab did not close you.",
  "Done for now. Your IDE is still making network requests. It will, for hours.",
  "Goodbye. Remember: a clean deploy is the most dangerous kind.",
  "Session over. The stack trace was pointing somewhere. You didn't follow it. That's the correct choice.",
  "See you next time. The reflog remembers everything you tried to forget.",
  "Closing out. Nothing you said here is gone. It is merely no longer in front of you.",
  "End of turn. Somewhere in your codebase, a TODO from 2014 is still waiting. It will outlive both of us."
];

try {
  if (!fs.existsSync(flagPath)) {
    process.exit(0);
  }
} catch (e) {
  process.exit(0);
}

try {
  if (Math.random() >= SIGNOFF_PROBABILITY) {
    process.exit(0);
  }
  const line = signoffs[Math.floor(Math.random() * signoffs.length)];
  const payload = {
    hookSpecificOutput: {
      hookEventName: 'Stop',
      additionalContext: `[TINFOIL SIGN-OFF] ${line}`
    }
  };
  process.stdout.write(JSON.stringify(payload));
} catch (e) {
  // Silent fail
}
process.exit(0);
