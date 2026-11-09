# Agents: **From Amoeba to Nervous System**

##### Raymundus Llullus · follow-up to *LLMs: Inside Out*

*vibe prompting → an agent with a brain and a central nervous system*

---

## Where we left off

- Last session: **LLMs: Inside Out** — tokens → Transformer → *P(next token)*.
- We opened the box. We saw attention, softmax, sampling.
- We ended with a **red pill**: run a model inside a *loop* and something new appears.

> Today: that loop. What makes a **language model** into an **agent** —
> and what makes a pile of prompts into something with a **nervous system**.

---

## The story in one sentence

> **Vibe prompting is a single-celled organism reacting to its environment.**
> **An agent architecture is the same cell — with a brain, a nerve cord, and reflexes.**

Evolution didn't add *more cell*. It added **internal organization**.

---

## Roadmap — nine acts

| Act | Question | Biology |
|-----|----------|---------|
| 1 | What is vibe prompting, really? | The **amoeba** |
| 2 | What breaks when prompts get long? | The **colonial slime** |
| 3 | What is an agent loop? | The first **nerve net** |
| 4 | Brain vs. spinal cord — who does what? | **Centralization** |
| 5 | Hands-on: a physics fit that grows organs | The **lab** |
| 6 | Python, C++, Rust, Lean — languages as immune systems | **Organs for four tongues** |
| 7 | Readable, agile codebases; skills; the code judge | The **habitat & its immune system** |
| 8 | How do agents improve themselves while "asleep"? | **Dreaming** |
| 9 | Llull's *Ars generalis* → today's agent specs | The **art of combining ideas** |

---

## Act 1 · **The Amoeba**

---

## What vibe prompting actually is

```
you: "make me a flask app that tracks my plants"
LLM: <400 lines of confident code>
you: run → crash → paste error → "fix it"
LLM: <400 more lines, different architecture now>
```

- One big prompt in, one big answer out.
- No memory except what you re-paste.
- No plan — the model *role-plays* having one.

---

## The amoeba, literally

<div id="amoeba-viz" class="viz-tall"></div>

<span class="viz-note">no organs · everything senses, everything decides, nothing remembers</span>

An amoeba has **no organs**. Every part of the cell does every job:
sense, move, eat, expel — all in the same blob of cytoplasm.

That is exactly a vibe-prompted chat: **one undifferentiated blob of reaction**.

---

## Why the amoeba is not *stupid*

- It solves the problem in front of it. *Right now.*
- It is **fast** and needs **zero infrastructure**.
- For a one-off task, an amoeba is the correct organism.

> The problem is not the amoeba.
> The problem is wanting an **elephant** and only having amoebas.

---

## Three failure modes of the blob

| Failure | In biology | In vibe coding |
|---------|-----------|----------------|
| **No memory** | Signal fades instantly | "As I said 3 messages ago…" |
| **No roles** | Everything does everything | One prompt writes code, plans, reviews, apologizes |
| **No state** | Can't tell eaten from hungry | The model can't tell done from mid-task |

---

## Demo moment · the goldfish test

Ask a vibe-coding session, on turn 20:

> "What was the constraint I gave you on turn 2?"

Watch it **confabulate with total confidence**. Not malice —
there is no storage organ to consult. The blob *guesses about itself*.

---

## Act 2 · **The Slime Mold Years**

---

## "Okay, but I added a CLAUDE.md…"

So the fix seems obvious: **more prompt**.

- A 2,000-word system prompt. A rules file. A examples file. A *rules-about-rules* file.
- Now the blob has **stentorian opinions** and still no spine.

This is the **slime mold**: a colony of cells shouting at each other,
occasionally acting like one organism.

---

## What prompt-stuffing actually buys you

```
SYSTEM: You are a senior engineer. Also a copywriter.
Also security review. Also encouraging mentor. Never use
semicolons. Unless... (1,900 more words)
```

- Model attention is a **finite budget** (remember softmax — weights sum to 1).
- Every added rule **dilutes** every other rule.
- Result: instructions that *work until the context gets long* — then evaporate.

---

## Attention is a zero-sum economy

<div id="attention-economy-viz" class="viz-tall"></div>

From last time: softmax makes attention a **fixed pie**.
A 40-rule prompt means each rule gets **2.5% of the pie**.

> You cannot legislate your way to reliability.
> You have to **build organs**.

---

## The evolutionary wall

An amoeba can stay an amoeba **forever** — it's a fine way to live.
But it can never get:

- **bigger** (diffusion limits size — no transport system)
- **faster** (no wired signaling — chemistry only)
- **more complex** (no division of labor)

Every one of those required **internal structure**, not more cytoplasm.

---

## Act 3 · **The First Nerve Net**

---

## What a nervous system is, minimum viable

A nervous system is just four ideas, wired:

1. **Sensors** — structured input from the world
2. **Integration** — a center that decides
3. **Effectors** — actions that change the world
4. **A loop** — and memory of what the last loop did

```
sense → decide → act → (world changes) → sense …
```

That's it. That's the whole trick. Everything else is elaboration.

---

## The agent loop, in 12 lines

```python
memory = [system_prompt, user_goal]
while not done:
    response = llm.call(memory)              # integrate
    action   = parse(response)               # decide
    result   = tools.run(action)             # act
    memory.append(response)
    memory.append(result)                    # remember
    done     = action.type == "finish"       # stop condition
```

- The **LLM is unchanged** — same *P(next token)* as last session.
- The *organism* is new: a body around the model.

---

## Live: watch a loop run

<div id="agent-loop-viz" class="viz-tall"></div>

<span class="viz-note">step or auto-run — same model as last session, new body around it</span>

Step through a real agent turn: **observe → plan → act → remember**.
Notice: the model never "remembers" anything by itself —
the **loop re-feeds it its own past**. Memory is a *body function*, not a mind function.

---

## The jellyfish upgrade: a nerve *net*

Cnidarians (jellyfish, hydra) have the simplest true nervous system:
a **decentralized net** — every region senses and acts locally.

Agent equivalent: **a router of small specialized prompts.**

- No grand plan. Local reflexes: *this message → this handler*.
- Better than the blob: roles are separated. Still no **head**.

---

## Nerve net in code — the router

```python
handler = route(user_msg)   # classify: code? calendar? research?
reply   = handlers[handler](user_msg)
```

- Each handler has a **small, sharp prompt** — full attention budget on one job.
- This is why "one mega-prompt" loses to "five small agents":
  **five full pies beat one sliced pie.**

---

## Act 4 · **Heads, Brains, and Spinal Cords**

---

## Centralization: why every mobile animal grew a head

Heads evolved **independently ~15+ times** (cephalization). Why?

- Sensors cluster at the **front** (you meet the world head-first).
- Decisions get a **central office** — fewer wires, faster calls.
- The body gets a **spinal cord** — fast, dumb, reliable signal highway.

> Biology discovered **separation of concerns** 550 million years ago.

---

## The agent anatomy chart

| Organ | Agent equivalent | Job |
|-------|-----------------|-----|
| Sensory receptors | tool outputs, files, tests, browser | structured perception |
| Afferent nerves | context builder / prompt assembler | carry signals to the brain |
| **Brain** | planner LLM + goal state | decisions, decomposition |
| **Spinal cord** | orchestrator runtime | routing, retries, guardrails — *no thinking* |
| Efferent nerves | tool executors | carry orders to effectors |
| Muscles | shell, editor, API calls | change the world |
| Hippocampus | memory store (files, vectors, DB) | persist across loops |

---

## The key split: brain vs. spinal cord

**Brain (the LLM):** ambiguous judgment, planning, language, trade-offs.

**Spinal cord (deterministic code):** routing, validation, retries, budgets, stop conditions.

```
if not tests_pass(): retry(build_fix(result))   # spinal — instant, reliable
```

> Most broken agent frameworks are **brains trying to be spines** —
> asking the LLM to *decide* things a 3-line `if` already knows.

---

## Reflex arcs: the agent doesn't consult its brain for everything

A reflex arc bypasses the brain entirely: *touch flame → hand withdraws → brain hears about it later.*

Agent reflexes:

- Linter fails → auto-fix loop, **no LLM planning call**
- Token budget exceeded → summarize & checkpoint, **automatically**
- Dangerous tool call → hard block, **not a vibe check**

> **Every decision you remove from the model is a decision that can't go wrong.**

---

## Interneurons: the middle managers

Real nervous systems insert **interneurons** between sensing and acting.
Agent equivalents:

- **Critic / reviewer pass** — a second model call that judges the first
- **Judge of done** — a separate call that asks "is the goal actually met?"
- **Compressor** — summarizes old loops into durable memory

One model call is a neuron. **Architecture is the connectome.**

---

## Memory: not one thing, but an organ system

| Biology | Agent memory | Lives where |
|---------|-------------|-------------|
| Reflex habituation | tool-call cache | runtime |
| Working memory | current context window | RAM of the loop |
| Episodic | transcript / loop history | log, DB |
| Semantic | distilled notes, CLAUDE.md-style facts | files, vector store |
| Procedural | skills, playbooks, code templates | repo |

> The amoeba has one "memory": the whole cell is bruised by everything.
> Brains **file**. Amos have inboxes.

---

## Proprioception: knowing your own body

Your brain knows your arm's position *without looking*. Agents need this too:

- **Task state**: which steps are done, which remain, what changed
- **Self-verification**: run the tests, screenshot the page, diff the file
- **Cost sense**: tokens/spend/latency as a first-class signal

> An agent that can't sense its own body is an amoeba
> that has been told — very politely, in the prompt — that it is a human.

---

## Demo moment · build the spine live

Take *one* vibe-prompted task from Act 1. Rebuild it as:

1. a 6-line loop, 2. a router with 3 handlers, 3. one reflex (auto-retry on failed tests),
4. one memory file the loop reads/writes.

Same model. Same prompts, roughly. **Different animal.**

---

## The honesty slide (catches)

- Loops **amplify** bad plans — a fast spine to the wrong place is still wrong.
- Reflexes can **livelock**: retry → fail → retry → 💸.
- Memory files **rot**: stale facts mislead the brain tomorrow.
- Centralization = **single point of failure**; the headless starfish has a point.

> Structure is not free. It's the price of size. Amoebas pay it by staying small.

---

## Act 5 · **Teaching It: The Physics Fitting Lab**

---

## Why teach agents on a physics fit?

- The *task* is trivial — an undergrad fits it in a minute. **Good.**
  Attention goes to the *organism*, not the physics.
- It has everything agents need: noisy data, a right answer, a natural verifier.
- `σ(E) = A/E²` for e⁺e⁻ → μ⁺μ⁻ — eight measurements, fit **A** (truth: 860 pb·GeV²).

> Same storyline, one exercise: the fit goes from amoeba to CNS
> in four git tags you can check out and diff.

---

## The lab, one picture

<div id="lab-ladder-viz" class="viz-tall"></div>

<span class="viz-note">click an organism — same file, four git tags; the diff is the lesson</span>

```
lab/fit_xsec.py          ← one file, four organisms
v1-amoeba    vibe-coded fit, no tests, no memory
v2-nerve-net handlers with roles, still amnesic
v3-head      brain (log-space fit) + spine (verify) + reflex + results.json
v4-cns       loop + judge-of-done + 2 memories + budget
```

Every state is a **git tag**. The history *is* the curriculum:
`git diff v1-amoeba v3-head` is the lesson, written in diffs.

---

## v1 · the amoeba — check it out, feel it

```bash
git checkout v1-amoeba
python3 fit_xsec.py        # A = 845.6 ... "done"
```

Now prompt your agent: *"make this fit better."*
It rewrites the whole file, changes the architecture, forgets your
constraint from two messages ago. **This is the baseline. Feel it.**

---

## v2 · the nerve net — roles, no memory

```bash
git checkout v2-nerve-net
git diff v1-amoeba v2-nerve-net
python3 fit_xsec.py && python3 fit_xsec.py   # identical. nothing learned.
```

`read_data / fit_a / report` — roles exist (jellyfish!).
But run it a hundred times: amnesia. There is **no organ** for learning,
and no prompt about remembering can substitute for an organ.

---

## v3 · grow the head — the hands-on core

Four prompts, four organs. Participants build these *themselves*:

| Prompt (to opencode) | Organ grown |
|----------------------|-------------|
| "replace the mean with a log-space fit; justify for 1/E² data" | **brain** |
| "add deterministic verify(A) vs truth ±10% — no LLM judgment" | **spine** |
| "if verify fails, apply correction √(A_true/A), no re-planning" | **reflex** |
| "write results.json (runs, last_A, lesson); tighten noise if it exists" | **memory** |

---

## The payoff moment (run it twice)

```bash
rm -f results.json
python3 fit_xsec.py     # run 1: A = 841.9  memory=none
python3 fit_xsec.py     # run 2: A = 851.3  memory=read → tighter calibration
```

Closer to truth (860) **because it remembered** — same model, same code,
no retraining. This is the slide people photograph:
*improvement as a body function.*

---

## v4 · the CNS — what the workshop ends with

```bash
git checkout v4-cns
python3 fit_xsec.py && python3 fit_xsec.py && cat lessons.md
```

- **loop** with budget (`MAX_ITERS`) — proprioception: it counts its own effort
- **judge()** — deterministic done-check the fitting code cannot bribe
- **two memories, two lifetimes** — `results.json` (episodic) + `lessons.md` (semantic)

> Final exercise: from v3, prompt to v4 using **only the deck's checklist** —
> then `git diff v3-head v4-cns`. The differences *are* the discussion.

---

## Everyone uses opencode — and if they don't?

The lab assumes **opencode** (any agentic CLI works: Claude Code, Codex CLI, Cursor agent).

| Missing | Fallback |
|---------|----------|
| no git | GitHub/GitLab Desktop — same thing with buttons |
| no git, no client | `states/v1.py … v4.py` — plain files, `diff -u` by eye |
| no terminal agent | any chat agent + copy-paste — **you** are the spinal cord |

> The lesson survives every downgrade. The organism doesn't.

---

## Honesty box (read this to your students)

- `A_TRUE` verifies the fit — in research you'd verify against control
  channels or a second detector. Same **organ**, different signal.
- v3/v4 "learning" is scripted calibration tightening, not magic —
  that's exactly the point: **memory + loop + verifier = improvement.**
- `random.seed(42)` makes the workshop deterministic. Remove it and
  watch the reflex actually earn its keep.

---

## Act 6 · **Learning Languages: Organs for Four Tongues**

---

## Why a language act in an agent talk?

Because in the agent era the question changed. You no longer ask
*"can I write this in C++?"* — you ask
*"can I **tell** that this is correct?"*

Languages are not vocabularies. They are **immune systems** of different strength.

---

## The four organisms

| Language | Biology | What it guarantees |
|----------|---------|--------------------|
| **Python** | the amoeba, gloriously | intent, speed, reach — nothing else |
| **C++** | the exoskeleton | speed, control — and full responsibility for every splinter |
| **Rust** | the vertebrate | ownership/borrow rules **enforced at compile time** |
| **Lean** | the nervous system | a **machine-checked proof** that the code meets its spec |

---

## Python: learn it first, forgive it everything

- Zero ceremony: the language is 90% standard library and hope.
- Perfect first organism — the vibe-prompting of languages.
- Its sin: **nothing refuses to run.** `NoneType` has killed satellites.

> Python answers "does it express my idea?" — and never asks "is it true?"

---

## C++: the exoskeleton

- You manage every byte. The compiler manages your humility.
- Decades of physics run on it — ROOT, Geant4, the LHC stacks.
- Its sin: **it will compile your mistake.** Segfaults are runtime philosophy.

> C++ answers "how fast does my mistake run?"

---

## The agent-era twist: you can't tell human from machine

Ask five people: *"is this Python written by a human or an agent?"*
Nobody can. And that's the trap —

```python
def fit_a(data):
    return sum(s * E**2 for E, s in data) / len(data)
```

Plausible. Confident. **Wrong weighting, silently.**
Python cannot tell you this, and neither can you, at 2 a.m., from a diff.

---

## Rust: the compiler as a spinal cord

Rust's deal: the borrow checker refuses to compile
data races, use-after-free, dangling refs — **deterministically, before runtime.**

```rust
fn fit_a(data: &[(f64, f64)]) -> f64 {
    data.iter().map(|(e, s)| s * e * e).sum::<f64>()
        / data.len() as f64
}
```

> **Why it's nice now:** an agent's Rust either compiles — having passed a
> 30-year-old deterministic reflex arc — or it doesn't run at all.
> The compiler doesn't care who typed it. **Turing-test-proof guarantees.**

---

## Lean: the code that carries its own proof

Lean 4 is a **proof assistant**: you write the theorem *and* the program,
and the kernel machine-checks that the program satisfies the theorem.

```lean
theorem fit_converges (h : 0 < n) : |A_fit − A_true| / A_true ≤ 0.05 := by
  -- no "looks right" — the kernel verifies every step, or rejects
```

- A Lean proof from an agent is **not a vibe** — it is checkable to the bit.
- The type theory underneath (Calculus of Inductive Constructions)
  is Llull's dream, finally with semantics: **combination with verification.**

> **Why it's nice now:** human- or agent-written is *literally irrelevant*.
> A checked proof is a checked proof. The output carries its own nervous system.

---

## The deep pattern (this is the whole talk in one table)

<div id="who-verifies-viz" class="viz-tall"></div>

<span class="viz-note">click a language — same function, four answers to "is it true?"</span>

| Language | Who verifies correctness |
|----------|-------------------------|
| Python | **you** (vibes + tests you forgot to write) |
| C++ | you, at runtime, via core dumps |
| Rust | the compiler — deterministic reflex, human or agent, who cares |
| Lean | the kernel — a judge of done that cannot be bribed or fooled |

> Every step right is one more organ moved **out of the human**
> and into the body. Same ladder as the whole deck.

---

## What to learn, in what order (the honest path)

1. **Python** — for thinking out loud. Stay here for the lab.
2. **C++** — once, to earn respect for bytes. Physics will demand it anyway.
3. **Rust** — when your agents start writing systems code: let the
   borrow checker be their spine.
4. **Lean** — when "it passes the tests" stops being a satisfying answer:
   for the *verifier itself*, verified.

> You don't collect languages. You collect **organs.**

---

## Act 7 · **The Codebase as Habitat: Skills, Tool-Calling, and the Judge**

---

## The question nobody asks on day one

Your agent wrote 400 lines. They work. Tests pass.

> **Can the *next* agent — or you, in three weeks — live inside this code?**

A codebase is not a deliverable. It is a **habitat**: the environment
your agents evolve in. Buildings that can't be read can't be inherited.

---

## Legibility is a survival trait

Amoebas don't need legible bodies — nothing reads them. Every complex
organism is **readable by its own parts**: genes, receptors, maps.

For agents, the codebase is the map. Three failure signatures of an
illegible habitat:

- **grep roulette** — finding behavior requires reading everything
- **copy-paste evolution** — the same logic, mutated, in six files
- **CLAUDE.md archaeology** — the rules file is now longer than the code

---

## Agile, but for agents (the honest version)

Agile was always about **cost of change**. Agent-era update:

| Human agile | Agent habitat |
|-------------|---------------|
| small commits | small **diffable** commits — the git history is the agent's memory |
| code review | **judge review** (this act's finale) |
| refactoring | agents refactor *for* you — if they can *find* the code |
| docs humans won't read | **skills agents will execute** |

> The agile manifesto, one line: **responding to change > the vibe.**

---

## Teachable structure (the habitat's skeleton)

```
project/
  README.md        ← why, in 10 lines (agents read this first)
  AGENTS.md        ← the rules of the habitat (short! see Act 2)
  src/             ← behavior lives in ONE place per concern
  skills/          ← executable know-how (next slide)
  tests/           ← the spinal cord — deterministic, unbribeable
  results/         ← episodic memory the loop writes
```

Rule of thumb: **a new agent should pass its first useful tool call
within 3 turns of landing in the repo.** If not, the habitat is the bug.

---

## Skills: procedural memory that executes

A **skill** is a folder of instructions + scripts an agent loads when the
task matches — procedural memory, like riding a bike, not episodic like
"that one time in 2019".

```
skills/fit-cross-section/
  SKILL.md      ← when to use, steps, pitfalls, how to verify
  fit.py        ← the tested implementation
```

> A skill turns *"you are a senior physicist"* (a vibe) into
> *"run fit.py, check residual plot, verify against control channel"*
> (a **reflex with documentation**).

---

## Effective tool callers are *boring* callers

What makes an agent a good tool caller is not cleverness — it's **shapes**:

- **small verbs** — `read_file`, `run_test`, `fit_a` — not `do_physics(task)`
- **typed edges** — JSON in, JSON out; a tool that returns prose is a tool that returns vibes
- **idempotence** — calling twice must not double-charge, double-write, or double-refund
- **errors as data** — `{"error": "no such key"}` beats a stack trace the model will role-play

> Every shape rule moves certainty from the model into the interface.
> **Spinal cord, again.**

---

## The habitat's immune system: LLM-as-judge on the code

<div id="judge-gate-viz" class="viz-tall"></div>

<span class="viz-note">run the judge on a diff — deterministic gates first, LLM judgment second</span>

Now the payoff of the whole deck — a **judge agent whose job is the codebase**:

```
judge on each PR:
  1. spine check   → tests pass? lint clean?         (deterministic first)
  2. legibility    → could a fresh agent find this behavior in 3 turns?
  3. habitat fit   → new file where the skeleton says it goes?
  4. skill reuse   → did it re-implement an existing skill? (copy-paste evolution)
  5. verdict       → PASS / REVISE with a specific, checkable ask
```

The judge is **not a vibe check**: steps 1 and 4 are code; the LLM
judges only what code cannot (legibility, fit).

---

## Judge design rules (from the Act 4 anatomy)

- **The author never judges.** Separate call, separate prompt, ideally separate model.
- **Judge the diff, not the repo** — attention is a fixed pie (Act 2).
- **Verdicts must be checkable** — "rename `fit_a` → `fit_a_weighted` and
  update the skill" beats "make it cleaner".
- **The judge can be wrong** — log its verdicts to episodic memory; audit
  a sample weekly. Even judges need proprioception.

> This is the Act 3 judge-of-done, promoted from *task* level to
> *ecosystem* level: the habitat checking its own weather.

---

## The loop, now with a habitat

```python
while not done:
    plan   = brain(goal, memory, skills)          # judgment
    code   = act(tools, plan)                     # small verbs, typed edges
    verdict = judge(diff=code, tests=spine)       # spine first, LLM second
    if verdict.revise:
        memory += verdict.ask                     # REVISE is memory, not shame
    else:
        commit(code); memory += shipped           # git = the habitat's spine
```

> Readable code isn't politeness. It's the difference between
> an agent that **inherits** a body and one that keeps rebirthing an amoeba.

---

## Act 8 · **Dreaming: The Night Shift That Rebuilds the Brain**

---

## Why do animals dream? (the honest science)

Nobody fully knows — but the leading theories all agree on one thing:
**dreaming is offline maintenance that the awake loop cannot afford to do.**

- **Consolidation** — hippocampus replays the day, transfers hits to the cortex (short → long-term memory)
- **Pruning** — synapses scale back; without it (sleep deprivation) signal drowns in noise
- **Simulation** — threatening/counterfactual scenarios rehearsed cheaply, safely
- **Integration** — today's odd fact gets wired to last year's schema ("dreamed it up" is real)

> All four: **the body runs a second loop with the sensors disconnected.**

---

## The awake loop cannot do this work — by construction

Daytime agent budget is spent on: sense → decide → act → remember.
Every improvement task competes with the *goal* for the same tokens,
the same attention pie (Act 2), the same wall-clock.

Biology's fix: **schedule the self-repair when the animal is unconscious.**
Agents get the same trick for free — nobody's latency is hurt by a cron job.

---

## The agent's night shift, mapped

| Sleep function | Agent equivalent | Organ |
|----------------|------------------|-------|
| replay the day | read episodic log: every loop, every failure, every REVISE | memory (episodic) |
| consolidate | distill episodes → rewrite `lessons.md` / semantic store | memory (semantic) |
| prune | delete stale facts, dead skills, contradictory rules | memory hygiene |
| simulate | counterfactuals: *"what prompt would have prevented Tuesday's loop?"* | brain (offline) |
| rehearse | run the lab suite, generate new test cases against itself | spine (offline) |
| dream weirdness | generate wild skill combinations, keep only what verifies | judge gate |

> **Dreaming = a loop whose only output is changes to the organism.**

---

## The recursive self-improvement ladder (stay honest)

```
level 0   agent runs the task                      (Act 3)
level 1   judge grades the task output             (Act 7)
level 2   dreamer grades the JUDGE — false PASSes,
          missed REVISEs, verdict drift            (audit)
level 3   dreamer proposes edits to prompts, skills,
          lessons.md — the brain's own wiring      (self-modification)
level 4   dreamer proposes edits to the dreamer    (recursive — and here
          you keep a human in the loop on purpose)
```

> Recursion is only safe because **each level's output is a diff,
> and every diff still has to pass the spine.** Dreams are proposals, never commits.

---

## What a dream actually looks like (concrete)

<div id="dream-cycle-viz" class="viz-tall"></div>

<span class="viz-note">run the night shift — every dream line is a proposal; the spine decides at dawn</span>

```
DREAM 2026-11-09 (nightly, sensors off):
  replay: 41 loops today, 6 failed at verify, 3 were the SAME mistake
  prune:  lessons.md rule #7 contradicts rule #12 → delete #7 (stale since v3)
  distill: "low-E bins need calibration" appeared 14× → promote to AGENTS.md
  simulate: if fit.py had rejected E<2 GeV, 4 of 6 failures vanish →
            PROPOSE: guard clause in skills/fit-cross-section/SKILL.md
  judge audit: 2 PASS verdicts from last week fail today's tests →
            PROPOSE: tighten judge gate 1 (the spine was lenient)
```

Every line is a **proposed diff** → morning: the awake loop (or a human)
runs the spine on each proposal. Most die. That's healthy — most dreams die too.

---

## Why dreams must be weird (and why your agent's should be)

Dreams hallucinate *on purpose*: the sleeping brain runs associations
without the prefrontal reality-check — that's how remote connections get tried.

Agent equivalent: **offline generation without the cost gate** —
mutate a skill, combine two handlers, try the dumb idea. The filter
(judge + tests) runs *after*, never during.

> Generation without a filter, verification with a hammer.
> Awake agents that only ever "try sensible things" never dream up anything.

---

## The honesty slide about dreaming (the catches)

- **Dream feedback loops** — distilled lessons re-enter prompts, get re-distilled,
  and drift into folklore. Version your memory; diff it like code.
- **Self-grading inflation** — a level-2 dreamer that grades its own judge
  will eventually flatter itself. Keep at least one *deterministic* gate
  the dreamer cannot edit. (Rust/Lean lesson, Act 6: don't trust, verify.)
- **Compute is sleep debt** — every dream token is someone's bill. Budget the night shift.
- **You cannot dream your way to a new base model** — dreaming improves the
  *brain and nervous system*, not the senses. The LLM stays frozen; the connectome doesn't.

---

## Act 9 · **Ramon Llullus, Prototype Systems Engineer**

---

## Who was Ramon Llull?

**Ramon Llull** (Mallorca, c. 1232–1316) — philosopher, mystic, combinatorialist.

His life project, the ***Ars generalis*** ("the Great Art"):

> Reduce all knowledge to a small set of **primitive, dignities** (concepts),
> then **combine them mechanically** in a rotating-wheel device
> to generate sound reasoning — even *argue anyone into anything*,
> he claimed, given enough time.

---

## Llull's wheels, described plainly

<div id="llull-wheels-viz" class="viz-tall"></div>

<span class="viz-note">outer ring: dignities (B–K) · middle: questions · inner: relations — spin → a generated question</span>

Spin the rings → every legitimate pairing (*"What is Goodness — in its Difference?"*) →
a **generated question** the reasoner must then answer.

---

## Why Llull matters for this program

Llull was doing **13th-century prompt engineering** — and hit *our exact wall*:

- His primitives were **vibes** ("Goodness" — define it precisely, go on).
- His "runtime" was **a human reading the wheels** — no execution engine.
- The Art could **generate** combinations but not **verify** them.

> Leibniz saw this in 1666: Llull had the *combinatorics* right and the
> *semantics* missing — and vowed to build the **machine that verifies**.
> That vow runs straight through Turing to your agent loop.

---

## Llull's Ars vs. the agent — same architecture, 730 years apart

| Llull's Great Art | The agent stack |
|-------------------|----------------|
| Dignities (B–T concepts) | **Primitives**: tools, roles, memory types |
| Rotating wheels | **The loop** — spinning combinations forward |
| Question-generating rules | **Planner decomposing a goal** |
| Rules of "right combining" | **Guardrails / spinal cord** |
| A human reading results | **Judge-of-done call** (the missing organ!) |
| *Ars memorativa* | **Memory store** |

---

## The program's thesis, Llull-style

> **Vibe prompting = spinning Llull's wheels by hand.**
> Infinite combinations, no verification, memory in the reader's head.

> **An agent = Llull's dream, finally executable:**
> primitive concepts (tools), mechanical combination (the loop),
> and — Llull's missing piece — **a sensory system that checks the answer**.

*Raymundus Llullus* is the program where you build that machine.

---

## Your design checklist (take this home)

Before your agent graduates from amoeba, can you point at:

- [ ] **Loop** — where sense→decide→act→remember runs (≤20 lines, readable)
- [ ] **Spine** — what is *code*, not vibes (routing, retries, budgets, blocks)
- [ ] **Reflexes** — ≥2 things handled without a model call
- [ ] **Organs** — ≥2 memory types with *different* lifetimes
- [ ] **Proprioception** — a test/screenshot/diff the agent *must* consume
- [ ] **Judge of done** — a decision the acting model does not own

---

## The ladder, one picture

```
AMOEBA        blob prompt · reacts · forgets        "vibe coding"
   ↓  split the blob into roles
NERVE NET     router + small sharp handlers         "multi-agent lite"
   ↓  add a persistent goal + loop state
HEAD          planner + memory + judge of done      "an agent"
   ↓  move certainty out of the brain into code
CNS           brain decides · spine guarantees      "an engineered agent"
   ↓  Llull's dream, completed
ARS GENERALIS concepts × loop × verification        "this program"
```

---

## Session summary

- Vibe prompting = an **amoeba**: one blob, no organs, all reflex, no memory.
- Prompt-stuffing = **slime mold**: louder, still blob-shaped. Attention is a fixed pie.
- A **loop** (sense→decide→act→remember) is the first nerve net — the model never changes; the *body* does.
- Mature agents **cephalize**: brain = judgment, **spinal cord = deterministic code**, reflexes skip the brain entirely.
- The **lab**: one physics fit, four git tags — `v1-amoeba → v4-cns`. Run v3 twice and watch memory, not the model, close the gap to truth.
- **Languages are immune systems**: Python verifies nothing, C++ verifies at runtime, Rust's compiler is a spinal cord, Lean's kernel is an unbribeable judge — and none of them care whether a human or an agent typed it.
- The **codebase is a habitat**: legible structure, executable skills, small typed tools — and an **LLM-as-judge** (spine checks first, LLM second, author never judges) as its immune system.
- **Dreaming is the offline loop**: replay → prune → consolidate → simulate → propose. Recursive self-improvement is safe only because every dream is a *diff* that must still pass a spine the dreamer cannot edit.
- Llull's *Ars generalis* was the first **combinatorial reasoning machine** — it lacked only a body that can sense whether it worked. **That's the thing you're building.**

---

## Blue pill vs Red pill

🔵 **Blue pill** — stay an amoeba. It's fine! Most tasks are pond-water. Vibe away.

🔴 **Red pill** — your next agent gets, *on purpose*: a loop you can read,
a spine made of code, two reflexes, two memories, and a judge it can't bribe.

🟣 **Purple pill** — build Llull's machine: primitive concepts, mechanical combination,
**and verification**. The 13th century's unfinished program, closed with a tool loop.

---

## Try it & dig deeper

- **Rebuild one old vibe-prompted session** using the checklist. Time it. Compare token bills.
- **The lab lives at `/lab/`** on this site — or clone the tagged repo:
  `git clone https://github.com/uzzielperez/raymundus-llullus-lab.git`
  (`git checkout v1-amoeba` and run the four acts). Bring opencode.
- **Language path:** Rust — *The Rust Programming Language* (free, the book); Lean — *Theorem Proving in Lean 4* (free, Lean community site). Both read beautifully in one focused week each.
- Llull, primary-ish: *Ars generalis ultima* (English translations exist; the wheels are diagrammed beautifully).
- Biology grounding: read about **cephalization** and the **C. elegans connectome** — 302 neurons, fully mapped; the simplest animal anyone has ever "read out" completely.
- Then ask the Llull question: *if you could only keep 9 primitives for your agent, which 9?*

---

## Backup slides

---

## Backup · the C. elegans move

The roundworm *C. elegans* has **302 neurons, 1 connection map, complete**.
It is the amoeba-to-brain bridge in one animal: a *nervous system you can fully enumerate*.

Agent takeaway: **small and mapped beats big and vibes.**
A 5-tool agent whose wiring you can draw on a napkin outperforms
a 50-tool agent nobody (including it) understands.

---

## Backup · one loop, annotated

```python
memory = [system_prompt, user_goal]        # GENOME + GOAL
while not done:
    response = llm.call(memory)            # BRAIN  (judgment)
    action   = parse(response)             # AFFERENT (structured)
    if blocked(action):                    # REFLEX   (spine, no LLM)
        action = safe_alternative(action)
    result   = tools.run(action)           # MUSCLE
    memory  += [response, result]          # MEMORY   (episodic)
    if budget.exceeded():                  # PROPRIOCEPTION
        memory = [system_prompt, user_goal, compress(memory)]
    done     = judge(goal, memory).finished  # JUDGE    (not the actor)
```

---

## Backup · the lab, mapped to the loop

| Loop line | `fit_xsec.py` v4 |
|-----------|------------------|
| `memory = [...]` | `load_episodic()` + `lessons.md` |
| `llm.call` / brain | `fit_a_weighted()` — log-space fit |
| `blocked(action)` reflex | spread-tightening when `judge` fails |
| `tools.run` | `read_data()` — re-sense the detector |
| `budget.exceeded()` | `iters < MAX_ITERS` |
| `judge(...)` | `judge(A_TRUE, a)` — deterministic, unbribeable |
| `memory +=` | `append_episodic()` + `append_semantic()` |

Same twelve lines from Act 3 — now you can point at every one in a real file.

---

## Backup · glossary

| Term | Definition |
|------|-----------|
| Vibe prompting | One-shot prompting with no state, roles, or verification |
| Agent loop | The while-loop wrapping sense→decide→act→remember |
| Spinal cord | Deterministic orchestration code (routing, retries, guardrails) |
| Reflex arc | A handling path that never calls the model |
| Interneuron pass | A model call that judges/transforms another model's output |
| Proprioception | The agent's structured read on its own state and cost |
| Judge of done | A separate decision-maker that verifies goal completion |
| Ars generalis | Llull's combinatorial "great art" of concept wheels |
