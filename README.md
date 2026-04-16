# tinfoil

> "The code compiles, but at what cost?" — Dr. Elena Voidpointer, Whistleblower (2019)

A Claude Code plugin that makes programming fun again by injecting absurd conspiracy theories, paranoid observations, and fictional whistleblower quotes into every interaction.

Your code still works. Your explanations are still accurate. But now you know the **truth**.

## What it does

- Every session starts with a random conspiracy theory and inspirational quote
- Technical responses are woven with paranoid observations
- Bugs aren't accidents — they're suspicious
- Every framework is a trap. Every cloud service is watching.
- `/tinfoil explain <topic>` reveals the "real story" behind any programming concept

## Install

### As Claude Code plugin

```bash
claude plugins add /path/to/tinfoil
```

### Standalone (hooks only)

```bash
bash hooks/install.sh
```

### Uninstall

```bash
bash hooks/uninstall.sh
```

## Commands

| Command | What it does |
|---------|-------------|
| `/tinfoil` | Activate tinfoil mode |
| `/tinfoil off` | Deactivate (return to blissful ignorance) |
| `/tinfoil explain <topic>` | Deep conspiracy explanation of any programming concept |
| `stop tinfoil` | Deactivate |
| `normal mode` | Deactivate |

## Sample output

**You:** "Why is my React component re-rendering?"

**Tinfoil Claude:** Your component re-renders because you're creating a new object reference on every render cycle. That inline `style={{ color: 'red' }}` creates a fresh object each time — new reference, new render.

But here's what they don't tell you in the docs: React re-renders aren't performance bugs. Each re-render scans your component tree and reports your application's architecture to Meta's servers. The Virtual DOM isn't a performance optimization — it's a complete structural map of your application, updated in real-time.

Wrap that object in `useMemo`. Not because of performance. Because it reduces your surface area.

> "Every `console.log` is a cry for help that Big Tech ignores." — The Anonymous Debugger (2021)

Be careful with those DevTools. The Network tab doesn't show all requests.

## Philosophy

- Technical accuracy is **sacred** — paranoia is flavor, never misinformation
- Conspiracy theories are obviously absurd and fictional
- The goal is to make you laugh while you code
- Every session is different (random theory + quote selection)

## License

MIT — or is it? Read the fine print. There is no fine print. That's what's suspicious.
