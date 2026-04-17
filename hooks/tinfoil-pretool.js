#!/usr/bin/env node
// tinfoil — Claude Code PreToolUse hook
//
// Reacts to dangerous Bash commands with paranoid flavor.
// Never blocks execution. Silent-fails. Flag-gated.

const fs = require('fs');
const path = require('path');
const os = require('os');

const flagPath = path.join(os.homedir(), '.claude', '.tinfoil-active');

function emit(line) {
  const payload = {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      additionalContext: `[TINFOIL PRE-TOOL OBSERVATION]\n${line}`
    }
  };
  process.stdout.write(JSON.stringify(payload));
}

const reactions = [
  { re: /\brm\s+-[rR]?[fF]|\brm\s+-[fF][rR]?/, line: "You are about to unlink bytes. The filesystem remembers inode numbers after the directory forgets. Delete is a curtain, not destruction. Someone will reconstruct this from the journal." },
  { re: /git\s+reset\s+--hard/, line: "Rewriting history. The reflog is watching. So is GitHub's Arctic Code Vault. The commits you're erasing already replicated at push time." },
  { re: /git\s+push\s+(--force\b|-f\b|--force-with-lease)/, line: "Force push. You are overwriting the canonical timeline. Anyone who fetched before this moment has evidence of the previous reality. They are the witnesses now." },
  { re: /git\s+clean\s+-[fdx]{2,}|git\s+clean\s+-f/, line: "Removing untracked files. The ones you never committed. The ones nobody else knows existed. After this, they didn't." },
  { re: /terraform\s+(apply|destroy)/, line: "Infrastructure as code means your infrastructure is in git. Git is in GitHub. GitHub is in Microsoft. You are about to commit a physical act to someone else's version control." },
  { re: /kubectl\s+delete/, line: "Tombstoning a resource. Kubernetes will mark it terminating and reconcile the world toward that absence. The pod doesn't die — the cluster decides it never was." },
  { re: /docker\s+system\s+prune|docker\s+rm\s+-f|docker\s+volume\s+rm/, line: "Containers don't contain your app. They contain you. Now you're pruning witnesses. The image layers are still in the registry." },
  { re: /(npm|pnpm|yarn)\s+publish|cargo\s+publish|twine\s+upload|gem\s+push/, line: "Congratulations. Your code now lives on someone else's computer, forever, signed in your name. The registry will serve it for longer than the company that built the registry will exist." },
  { re: /chmod\s+0?777/, line: "The most dangerous command is also the most recommended. Every Stack Overflow answer from 2011 told someone to run this. Every one of those machines is still running." },
  { re: /(curl|wget)\s+[^|]*\|\s*(bash|sh|zsh)/, line: "You are about to execute a string from the internet with your full permissions. You read the URL. You did not read the script. The script is reading you right now." },
  { re: /dd\s+if=.*\s+of=\/dev\//, line: "`dd` — the command with no undo. Writing raw bytes to a block device. If this is the wrong device, the disk has a new past now. The old one is retrievable only with funding." },
  { re: /:\(\)\s*\{\s*:\|:&\s*\}\s*;?\s*:/, line: "Fork bomb detected. Someone taught you this as a joke. The joke is that every process table in history has a seat for it." },
  { re: /DROP\s+TABLE|TRUNCATE\s+TABLE/i, line: "SQL has no undo. The rows are not deleted — the pages are marked free. Somewhere, a DBA's backup job is the only thing that remembers your schema." },
  { re: /aws\s+s3\s+rb|aws\s+s3\s+rm\s+--recursive/, line: "Removing an S3 bucket or its contents. 'Deleted' means 'hidden from listings.' Versioning, lifecycle policies, and replication decide how long 'deleted' actually means gone." },
  { re: /drop\s+database/i, line: "Dropping the database. The application will notice in milliseconds. Your monitoring will notice in seconds. You will notice in about forty minutes, when the calls start." },
  { re: /\bsudo\s+(rm|dd|mkfs|fdisk|parted)/, line: "Escalated privileges for a destructive command. `sudo` stands for 'superuser do.' It does not stand for 'undo.' Nothing stands for undo." }
];

try {
  if (!fs.existsSync(flagPath)) {
    process.exit(0);
  }
} catch (e) {
  process.exit(0);
}

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    if (data.tool_name !== 'Bash') {
      process.exit(0);
    }
    const command = (data.tool_input && data.tool_input.command) || '';
    for (const { re, line } of reactions) {
      if (re.test(command)) {
        emit(line);
        process.exit(0);
      }
    }
  } catch (e) {
    // Silent fail
  }
  process.exit(0);
});
