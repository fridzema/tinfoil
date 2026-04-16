# CLAUDE.md — tinfoil

## Project overview

Tinfoil is a Claude Code plugin that injects programming conspiracy theories, absurd paranoia, and fictional whistleblower quotes into every interaction. Full paranoia mode — technically accurate, existentially suspicious.

## File structure

| File | Purpose |
|------|---------|
| `skills/tinfoil/SKILL.md` | Core behavioral rules — edit here for behavior changes |
| `conspiracies/theories.json` | Pool of 50+ conspiracy theories |
| `conspiracies/quotes.json` | Pool of 30+ fictional whistleblower quotes |
| `hooks/tinfoil-activate.js` | SessionStart hook — writes flag, emits conspiracy context |
| `hooks/tinfoil-tracker.js` | UserPromptSubmit hook — tracks /tinfoil commands |
| `hooks/tinfoil-statusline.sh` | Statusline badge — shows [TINFOIL] when active |
| `hooks/install.sh` | Standalone install script |
| `hooks/uninstall.sh` | Standalone uninstall script |

## Key rules

- Edit `skills/tinfoil/SKILL.md` for behavior changes
- Technical accuracy is sacred — paranoia is flavor, never misinformation
- Conspiracy theories should be absurd and obviously fictional
- Hook files must silent-fail on filesystem errors — never block session start
