#!/bin/bash
# tinfoil — standalone install script
# Copies hooks into ~/.claude/hooks/ and patches settings.json

set -e

CLAUDE_DIR="$HOME/.claude"
HOOKS_DIR="$CLAUDE_DIR/hooks"
SETTINGS="$CLAUDE_DIR/settings.json"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_DIR="$(dirname "$SCRIPT_DIR")"

echo "Installing tinfoil hooks..."

# Create hooks directory
mkdir -p "$HOOKS_DIR"

# Copy hook files
cp "$SCRIPT_DIR/tinfoil-activate.js" "$HOOKS_DIR/"
cp "$SCRIPT_DIR/tinfoil-tracker.js" "$HOOKS_DIR/"
cp "$SCRIPT_DIR/tinfoil-pretool.js" "$HOOKS_DIR/"
cp "$SCRIPT_DIR/tinfoil-signoff.js" "$HOOKS_DIR/"
cp "$SCRIPT_DIR/tinfoil-statusline.sh" "$HOOKS_DIR/"
chmod +x "$HOOKS_DIR/tinfoil-statusline.sh"

# Copy conspiracies data
mkdir -p "$HOOKS_DIR/../conspiracies"
cp "$PLUGIN_DIR/conspiracies/theories.json" "$HOOKS_DIR/../conspiracies/"
cp "$PLUGIN_DIR/conspiracies/quotes.json" "$HOOKS_DIR/../conspiracies/"

# Patch settings.json
if [ ! -f "$SETTINGS" ]; then
  echo '{}' > "$SETTINGS"
fi

# Use node to safely patch JSON
node -e "
const fs = require('fs');
const settings = JSON.parse(fs.readFileSync('$SETTINGS', 'utf8'));

// Add hooks
if (!settings.hooks) settings.hooks = {};

// SessionStart hook
if (!settings.hooks.SessionStart) settings.hooks.SessionStart = [];
const hasActivate = settings.hooks.SessionStart.some(h => h.command && h.command.includes('tinfoil-activate'));
if (!hasActivate) {
  settings.hooks.SessionStart.push({
    command: 'node $HOOKS_DIR/tinfoil-activate.js',
    timeout: 5000
  });
}

// UserPromptSubmit hook
if (!settings.hooks.UserPromptSubmit) settings.hooks.UserPromptSubmit = [];
const hasTracker = settings.hooks.UserPromptSubmit.some(h => h.command && h.command.includes('tinfoil-tracker'));
if (!hasTracker) {
  settings.hooks.UserPromptSubmit.push({
    command: 'node $HOOKS_DIR/tinfoil-tracker.js',
    timeout: 5000
  });
}

// PreToolUse hook
if (!settings.hooks.PreToolUse) settings.hooks.PreToolUse = [];
const hasPretool = settings.hooks.PreToolUse.some(h => h.command && h.command.includes('tinfoil-pretool'));
if (!hasPretool) {
  settings.hooks.PreToolUse.push({
    matcher: 'Bash',
    command: 'node $HOOKS_DIR/tinfoil-pretool.js',
    timeout: 3000
  });
}

// Stop hook
if (!settings.hooks.Stop) settings.hooks.Stop = [];
const hasSignoff = settings.hooks.Stop.some(h => h.command && h.command.includes('tinfoil-signoff'));
if (!hasSignoff) {
  settings.hooks.Stop.push({
    command: 'node $HOOKS_DIR/tinfoil-signoff.js',
    timeout: 3000
  });
}

// Statusline
if (!settings.statusLine) settings.statusLine = {};
const existingCmd = settings.statusLine.command || '';
if (!existingCmd.includes('tinfoil-statusline')) {
  if (existingCmd) {
    settings.statusLine.command = existingCmd + ' && bash $HOOKS_DIR/tinfoil-statusline.sh';
  } else {
    settings.statusLine.command = 'bash $HOOKS_DIR/tinfoil-statusline.sh';
  }
}

fs.writeFileSync('$SETTINGS', JSON.stringify(settings, null, 2));
"

echo "Tinfoil installed. The truth is in your terminal."
echo "Restart Claude Code to activate."
