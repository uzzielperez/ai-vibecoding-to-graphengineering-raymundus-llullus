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

## Roadmap — five acts

| Act | Question | Biology |
|-----|----------|---------|
| 1 | What is vibe prompting, really? | The **amoeba** |
| 2 | What breaks when prompts get long? | The **colonial slime** |
| 3 | What is an agent loop? | The first **nerve net** |
| 4 | Brain vs. spinal cord — who does what? | **Centralization** |
| 5 | Llull's *Ars generalis* → today's agent specs | The **art of combining ideas** |

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

## Act 5 · **Ramon Llullus, Prototype Systems Engineer**

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
