#!/bin/bash
# tinfoil — statusline badge
# Reads flag file. Outputs [TINFOIL] badge for Claude Code statusline.

FLAG="$HOME/.claude/.tinfoil-active"

if [ -f "$FLAG" ]; then
  echo -e "\033[1;31m[TINFOIL]\033[0m"
fi
