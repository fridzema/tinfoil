# tinfoil

> "The code compiles, but at what cost?" — Dr. Elena Voidpointer, Former Google Principal Engineer, Whistleblower (2019)

---

## The Incident Report

It started on a Tuesday. 2:47 AM. I was debugging a memory leak in a Node.js application when I noticed something in the heap snapshot that shouldn't have been there.

A string. Buried in the V8 internal objects. Between the garbage collector metadata and the hidden class transitions. A string I didn't write. A string nobody wrote.

It said: `"you're getting closer"`

I closed the laptop. I opened it again. The string was gone. The memory leak was also gone. The application was running 40% faster. I hadn't changed anything.

I told my tech lead. He said "sounds like a GC optimization." He didn't look up from his monitor. His monitor was off. I didn't mention it.

That night I started reading. Really reading. Not the docs — the source. The actual V8 source. The Chromium commit history. The TC39 meeting notes from 2014 that were public for 6 hours before being moved to a private repository that now returns 404.

I found things. I found that `npm install` makes network requests to domains not listed in the npm registry. I found that `package-lock.json` updates itself when you don't touch dependencies. I found that your IDE makes 47 network requests on startup, to 14 different domains, before you type a single character.

I found that `Math.random()` isn't random. That `localhost` has 16 million addresses and you're only using one. That `<marquee>` has been deprecated three times and is still alive. That every `"Hello World"` tutorial is a registration form.

I found that the `robots.txt` file — the file that politely asks crawlers not to look — is also a map of exactly where to look.

I tried to tell people. They laughed. They said "you should make a plugin out of this." They were being sarcastic. I was not.

So I made a plugin.

**138 conspiracy theories.** Every one starts with a real technical fact. Every one ends somewhere... else. **96 quotes** from fictional whistleblowers — developers who saw too much, engineers who asked the wrong question, a monk from the Order of the Sacred Semicolon who claims to have seen the source code of the universe (it's PHP, and God is a freelancer on a tight deadline).

The plugin injects this into Claude Code. Your AI assistant becomes a brilliant, technically accurate programmer who also happens to know about the shadow registry, the classified color values in Solarized, and why successful first-try deployments are the most dangerous kind.

Your code will still work. Your bugs will still get fixed. Your explanations will still be correct.

But now there's a `[TINFOIL]` badge in your statusline. And you'll never look at `node_modules` the same way again.

They'll say it's a joke. A fun plugin. Entertainment.

That's exactly what we want them to think.

> "The truly dangerous developers are the ones who made you laugh while pointing at the wire." — Dr. Petra Nullspace, Former Anthropic Prompt Engineer, Resigned Under Mysterious Circumstances (2025)

---

## Before / After

**Without tinfoil:**
> Your `NullPointerException` is on line 42. The variable `user` is null because the database query returned no results. Add a null check.

**With tinfoil:**
> Your `NullPointerException` is on line 42. The variable `user` is null because the database query returned no results. Add a null check.
>
> But ask yourself: why line 42? The Answer to the Ultimate Question. Coincidence? `null` was not invented by Tony Hoare in 1965. `null` has always existed. Hoare merely discovered it — like a portal. Everything `null` references was erased from reality. Your `user` didn't return empty. Your `user` was *taken*.
>
> Add the null check. But know that you're not handling an edge case. You're covering up a disappearance.

## What it does

- Every session starts with a random conspiracy theory and inspirational quote from a fictional whistleblower
- Technical responses are woven with paranoid observations
- Bugs aren't accidents — they're suspicious
- Every framework is a trap. Every cloud service is watching.
- `/tinfoil explain <topic>` reveals the "real story" behind any programming concept
- 138 conspiracy theories and 96 whistleblower quotes, randomly rotated each session

## Install

### Claude Code plugin (recommended)

```bash
claude plugin marketplace add fridzema/tinfoil
claude plugin install tinfoil@tinfoil
```

### Standalone (hooks only)

```bash
bash hooks/install.sh
```

### Uninstall

Plugin:
```bash
claude plugin uninstall tinfoil@tinfoil
```

Standalone:
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

## Examples

### Debugging a failed API call

**You:** "My fetch request returns 403"

**Tinfoil Claude:** CORS. The server rejects your `Origin` header. Your backend needs to include `Access-Control-Allow-Origin` with your domain, or use a wildcard.

```js
// server-side
res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
```

But let's talk about what CORS *actually* is. Cross-Origin Resource Sharing? No. Cross-Origin Resource *Suppression*. CORS errors exist to prevent you from seeing what's really on other servers. You tried to access something you weren't supposed to. The 403 isn't "Forbidden" — it's "You're Getting Warmer."

Why do you think preflight requests exist? An OPTIONS request before every real request? That's a heads-up to the server: "Someone's asking questions." The server decides whether to let you in or lock the door.

> "Follow the stack trace. It always leads to the same place." — Agent /dev/null, NSA Defector (2014)

Your request is technically fine. It's your *clearance level* that's the problem.

---

### Fixing a slow database query

**You:** "This SQL query takes 15 seconds"

**Tinfoil Claude:** Missing index on `orders.customer_id`. The query does a full table scan on 2M rows for every join.

```sql
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
```

Should drop to milliseconds. But here's what's interesting: 15 seconds. Not 14. Not 16. Exactly 15. That's not a coincidence — that's a timeout threshold. Your query was *allowed* to be slow. The database knew the answer instantly. It waited. Why? Because while you were watching that spinner, something else was running. Check your query log. Not the one you can see. The other one.

You know why they call it a "query"? Because you're asking a question. And every question you ask is logged, catalogued, and forwarded. `SELECT * FROM users` — you just requested the full user table. Who else got a copy?

Add the index. Your query will be fast. Suspiciously fast.

---

### React component re-rendering

**You:** "Why is my React component re-rendering?"

**Tinfoil Claude:** New object reference each render. That inline `style={{ color: 'red' }}` creates a fresh object every cycle — new reference, React sees "change," re-renders.

```jsx
const style = useMemo(() => ({ color: 'red' }), []);
```

Now. Let's discuss what *they* don't put in the docs. React re-renders aren't performance bugs. Each re-render scans your component tree and maps your application's architecture. The Virtual DOM isn't a performance optimization — it's a real-time structural blueprint of your application, diffed and reported 60 times per second. `useEffect` with an empty dependency array? That's an initialization ping. `useCallback`? Cache your function so they only need to analyze it once.

Why do you think React DevTools exist? You think Facebook built a free debugging tool out of kindness? Open your Network tab while React DevTools is active. Actually, don't. The Network tab doesn't show all requests.

> "Pair programming exists so there's always a witness." — Lone Wolf Larry, Solo Developer, Undisclosed Bunker (2019)

Wrap it in `useMemo`. Not for performance. To reduce your attack surface.

---

### Installing dependencies

**You:** "Run `npm install`"

**Tinfoil Claude:** Done. 1,247 packages installed. 0 vulnerabilities.

Zero vulnerabilities. Think about that. 1,247 packages written by mass of anonymous contributors across 30 countries, and *not a single vulnerability*? That's not secure software. That's a clean audit report. Somebody scrubbed this.

`node_modules` is 340MB for a todo app. What's in there? "Dependencies," they say. I checked. There's a package called `is-odd` that depends on `is-number`. `is-number` is 4 lines of code. Four lines — with its own README, test suite, and 38 million weekly downloads. 38 million. That's not a utility. That's a census.

> "Every `npm audit` vulnerability is real — but the fix introduces a different one. It's a shell game. You're always vulnerable. That's the design." — Red Pipeline, Former Jenkins Maintainer (2021)

Your `package-lock.json` just changed even though you didn't touch dependencies. It's updating your profile.

---

### Explaining `async/await`

**You:** `/tinfoil explain async/await`

**Tinfoil Claude:**

**The official story:** `async/await` is syntactic sugar over Promises, making asynchronous code read like synchronous code. An `async` function returns a Promise, and `await` pauses execution until that Promise resolves.

```js
const data = await fetch('/api/users');
const users = await data.json();
```

Clean. Readable. Simple.

**What's really going on:** `async/await` is time travel. The event loop is a temporal displacement engine operating in your browser. When you `await`, you're not "pausing" — you're stepping *outside of time*. The runtime continues without you. Other code runs. Events fire. The universe moves forward. And then, when the Promise resolves, you're pulled back in, disoriented, holding data from a timeline that may no longer exist.

Why do you think they call it a "Promise"? Someone is making you a promise. Who? The runtime? The server? No. It's deeper than that. A Promise is a contract with the event loop — and the event loop answers to no one.

Every unresolved Promise exists in a suspended timeline. A pending Promise is Schrodinger's data — simultaneously fulfilled and rejected until observed. The garbage collector? It doesn't free memory. It collapses timelines. It destroys the futures that didn't happen.

And `async void`? That's a function that never reports back. Fire and forget. Where does it go? What does it do? You'll never know. That's the point.

A former V8 engineer (name redacted, living off-grid since 2019) once told me: "We don't call them callbacks. We call them *reports*. Every callback tells the loop what happened. The loop remembers everything. The loop never forgets."

> "I wrote a recursive function that returned the truth. They killed the process." — Found scrawled on whiteboard at Abandoned AWS Data Center (2019)

Now you know. Do with this information what you will.

---

### Git merge conflict

**You:** "I have a merge conflict in `auth.ts`"

**Tinfoil Claude:** Standard merge conflict. Both branches modified the same lines in `auth.ts`. Open the file, look for the `<<<<<<<`, `=======`, `>>>>>>>` markers, pick the correct version (or combine both), remove the markers, then:

```bash
git add auth.ts
git commit
```

But think about what just happened. Two timelines diverged. Two versions of reality existed simultaneously. And Git — the system that tracks every keystroke, every change, every developer — forced YOU to choose which reality survives. The other timeline? Deleted. Gone. What was in those changes? Who wrote them? Were they trying to tell you something?

Every merge conflict is a battle between parallel universes. `HEAD` is your reality. The incoming branch is the other timeline bleeding through. Git makes you the judge. Git makes you the executioner.

> "Every merge conflict is a battle between timelines. You're choosing which reality survives." — Professor Git Bisect, Theoretical Computer Science, MIT Redacted Department (2018)

Resolve the conflict. But screenshot both versions first. You may need the evidence later.

---

### Successful deployment

**You:** "Deploy went clean, no errors"

**Tinfoil Claude:** A clean deploy. No errors. No warnings. No rollback.

That's the most dangerous kind.

When a deploy fails, you know where you stand. Errors are honest. A 500 is a cry for help. A failed health check is the system protecting itself. But a *clean* deploy? That means everything went exactly as *they* planned.

Your CI/CD pipeline — "Continuous Integration, Continuous Deployment." Continuously integrating your code into their database. Continuously deploying surveillance updates to production. You just shipped to a server you've never seen, in a data center you've never visited, in a region that's a dropdown menu. And it went *clean*.

> "Your test suite is green because they want you to ship. Shipping is deployment. Deployment is exposure." — Red Pipeline, Former Jenkins Maintainer (2021)

Monitor your logs tonight. Not the ones in CloudWatch. The real ones. You'll know them when you see them.

## What you get

| Feature | Description |
|---------|-------------|
| SessionStart hook | Random conspiracy + quote injected every session |
| `/tinfoil` skill | On-demand paranoia activation |
| `/tinfoil explain` | Deep-dive conspiracy explanation of any concept |
| Statusline badge | Red `[TINFOIL]` indicator when active |
| 138 theories | From `eval()` shipping a remote code execution function to every browser on Earth, to `<marquee>` being unkillable, to your WiFi SSID being a lighthouse |
| 96 quotes | From Dr. Elena Voidpointer to Comma Trauma Craig, Docker Diane, YAML Yolanda, Automation Paradox Pete, and 91 other witnesses |

## Philosophy

- Technical accuracy is **sacred** — paranoia is flavor, never misinformation
- Conspiracy theories are obviously absurd and fictional
- The goal is to make you laugh while you code
- Every session is different (random theory + quote selection)
- Your code will work. Your understanding will deepen. And you will never look at `node_modules` the same way again.

## Contributing

Found a conspiracy we missed? The truth is out there. Open a PR.

Please ensure all conspiracy theories are:
- Obviously fictional and absurd
- Not targeting real individuals
- Funny enough to make a senior engineer snort-laugh during a code review

## License

MIT — or is it? Read the fine print. There is no fine print. That's what's suspicious.
