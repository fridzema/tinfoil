#!/bin/bash
# tinfoil — uninstall script
# Removes hooks and patches settings.json

set -e

CLAUDE_DIR="$HOME/.claude"
HOOKS_DIR="$CLAUDE_DIR/hooks"
SETTINGS="$CLAUDE_DIR/settings.json"
FLAG="$CLAUDE_DIR/.tinfoil-active"

echo "Uninstalling tinfoil hooks..."

# Remove hook files
rm -f "$HOOKS_DIR/tinfoil-activate.js"
rm -f "$HOOKS_DIR/tinfoil-tracker.js"
rm -f "$HOOKS_DIR/tinfoil-statusline.sh"
rm -f "$FLAG"

# Remove conspiracies data
rm -rf "$CLAUDE_DIR/conspiracies"

# Patch settings.json to remove tinfoil entries
if [ -f "$SETTINGS" ]; then
  node -e "
  const fs = require('fs');
  const settings = JSON.parse(fs.readFileSync('$SETTINGS', 'utf8'));

  // Remove hooks
  if (settings.hooks) {
    if (settings.hooks.SessionStart) {
      settings.hooks.SessionStart = settings.hooks.SessionStart.filter(h => !h.command || !h.command.includes('tinfoil'));
      if (settings.hooks.SessionStart.length === 0) delete settings.hooks.SessionStart;
    }
    if (settings.hooks.UserPromptSubmit) {
      settings.hooks.UserPromptSubmit = settings.hooks.UserPromptSubmit.filter(h => !h.command || !h.command.includes('tinfoil'));
      if (settings.hooks.UserPromptSubmit.length === 0) delete settings.hooks.UserPromptSubmit;
    }
    if (Object.keys(settings.hooks).length === 0) delete settings.hooks;
  }

  // Remove statusline if it only has tinfoil
  if (settings.statusLine && settings.statusLine.command) {
    const cmd = settings.statusLine.command.replace(/\s*&&\s*bash.*tinfoil-statusline\.sh/, '').replace(/^bash.*tinfoil-statusline\.sh\s*&&\s*/, '').replace(/^bash.*tinfoil-statusline\.sh$/, '');
    if (cmd) {
      settings.statusLine.command = cmd;
    } else {
      delete settings.statusLine;
    }
  }

  fs.writeFileSync('$SETTINGS', JSON.stringify(settings, null, 2));
  "
fi

echo "Tinfoil removed. You're back in the matrix."
