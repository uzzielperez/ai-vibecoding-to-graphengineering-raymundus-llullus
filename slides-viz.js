/**
 * Viz slides: external script so Reveal markdown + CSP (no inline scripts) still work.
 * Runs once per slide when it becomes current.
 *
 * Organs of this deck:
 *  - #amoeba-viz            blob reacting to stimuli, no memory ("vibe prompting")
 *  - #attention-economy-viz softmax pie shared by N rules (prompt stuffing)
 *  - #agent-loop-viz        step-through of sense -> decide -> act -> remember
 *  - #llull-wheels-viz      Llull-style rotating wheels generating questions
 */
(function () {
  if (typeof Reveal === "undefined") return;

  var C_GOLD = "#e8b64c";
  var C_RED = "#e85d4c";
  var C_BLUE = "#7fb4ff";
  var C_MINT = "#5ee9c8";
  var C_MUTED = "#9a8fae";
  var C_TEXT = "#f0ebdd";

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  function btn(label, cls) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "am-btn" + (cls ? " " + cls : "");
    b.textContent = label;
    return b;
  }

  /* ── 1 · Amoeba ─────────────────────────────────────────────────────── */

  function initAmoeba(section) {
    var root = section.querySelector("#amoeba-viz");
    if (!root || section.dataset.amoebaInit === "1") return;
    section.dataset.amoebaInit = "1";

    var wrap = el("div", "am-wrap");
    var stage = el("div", "am-stage");

    var svgNS = "http://www.w3.org/2000/svg";
    var W = 560, H = 300, CX = 280, CY = 150;
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "am-svg");
    stage.appendChild(svg);

    var blob = document.createElementNS(svgNS, "path");
    blob.setAttribute("fill", "rgba(232,182,76,0.10)");
    blob.setAttribute("stroke", C_GOLD);
    blob.setAttribute("stroke-width", "2");
    svg.appendChild(blob);

    var nucleus = document.createElementNS(svgNS, "circle");
    nucleus.setAttribute("r", "14");
    nucleus.setAttribute("fill", "rgba(232,182,76,0.25)");
    nucleus.setAttribute("stroke", C_GOLD);
    nucleus.setAttribute("stroke-dasharray", "3 3");
    svg.appendChild(nucleus);

    var stimulus = document.createElementNS(svgNS, "circle");
    stimulus.setAttribute("r", "9");
    stimulus.setAttribute("fill", C_RED);
    stimulus.setAttribute("opacity", "0");
    svg.appendChild(stimulus);

    var food = document.createElementNS(svgNS, "circle");
    food.setAttribute("r", "6");
    food.setAttribute("fill", C_MINT);
    food.setAttribute("opacity", "0");
    svg.appendChild(food);

    var controls = el("div", "am-controls");
    var bFood = btn("drop food (attractant)");
    var bBurn = btn("drop acid (repellent)", "am-danger");
    var bAsk = btn("interrogate it", "am-danger");
    controls.appendChild(bFood);
    controls.appendChild(bBurn);
    controls.appendChild(bAsk);

    var readout = el("div", "am-readout", "The blob reacts. It remembers nothing. Every stimulus is the first stimulus.");

    wrap.appendChild(stage);
    wrap.appendChild(controls);
    wrap.appendChild(readout);
    root.appendChild(wrap);

    var px = CX, py = CY, tx = CX, ty = CY;
    var t = 0;
    var n = 14;

    function setPath() {
      var pts = [];
      for (var i = 0; i < n; i++) {
        var a = (i / n) * Math.PI * 2;
        var wob = 1 + 0.16 * Math.sin(a * 3 + t * 0.7) + 0.10 * Math.sin(a * 5 - t * 1.1);
        var toward = 1;
        var dx = tx - px, dy = ty - py;
        var d = Math.sqrt(dx * dx + dy * dy) || 1;
        var align = Math.cos(a - Math.atan2(dy, dx));
        toward = 1 + Math.max(0, align) * Math.min(0.5, d / 300);
        var r = 70 * wob * toward;
        pts.push([px + Math.cos(a) * r, py + Math.sin(a) * r * 0.78]);
      }
      var dAttr = "M" + pts.map(function (p) {
        return p[0].toFixed(1) + "," + p[1].toFixed(1);
      }).join("L") + "Z";
      blob.setAttribute("d", dAttr);
      nucleus.setAttribute("cx", px);
      nucleus.setAttribute("cy", py);
    }

    function tick() {
      t += 0.05;
      px += (tx - px) * 0.02;
      py += (ty - py) * 0.02;
      tx += (CX - tx) * 0.004;
      ty += (CY - ty) * 0.004;
      setPath();
      requestAnimationFrame(tick);
    }
    setPath();
    requestAnimationFrame(tick);

    bFood.addEventListener("click", function () {
      var x = 60 + Math.random() * (W - 120), y = 40 + Math.random() * (H - 80);
      food.setAttribute("cx", x); food.setAttribute("cy", y);
      food.setAttribute("opacity", "1");
      tx = x; ty = y;
      readout.innerHTML = "<b>attractant</b> detected → cytoplasm flows toward it. No organ sensed it. No record was kept.";
    });

    bBurn.addEventListener("click", function () {
      var x = 60 + Math.random() * (W - 120), y = 40 + Math.random() * (H - 80);
      stimulus.setAttribute("cx", x); stimulus.setAttribute("cy", y);
      stimulus.setAttribute("opacity", "1");
      tx = px + (px - x) * 2.2;
      ty = py + (py - y) * 2.2;
      tx = Math.max(80, Math.min(W - 80, tx));
      ty = Math.max(60, Math.min(H - 60, ty));
      readout.innerHTML = "<b>acid</b> → the whole blob recoils. Next acid drop: identical reaction. Zero learning occurred.";
    });

    bAsk.addEventListener("click", function () {
      var lines = [
        "“Where have you been?” → <b>confabulates</b>: “I have always been here.”",
        "“Why did you move left?” → “I did not move. I am not the moving kind.”",
        "“What did the last acid drop teach you?” → “There is no last drop.”",
        "“Who are you?” → “I am every part of me. Every part decides everything.”"
      ];
      readout.innerHTML = lines[Math.floor(Math.random() * lines.length)];
    });
  }

  /* ── 2 · Attention economy ──────────────────────────────────────────── */

  function initAttentionEconomy(section) {
    var root = section.querySelector("#attention-economy-viz");
    if (!root || section.dataset.aeInit === "1") return;
    section.dataset.aeInit = "1";

    var wrap = el("div", "ae-wrap");
    var bar = el("div", "ae-bar");
    var sliderRow = el("div", "ae-slider-row");
    var label = el("span", "", "rules in your system prompt:");
    var slider = document.createElement("input");
    slider.type = "range"; slider.min = "1"; slider.max = "40"; slider.value = "3";
    var stat = el("span", "ae-stat", "");
    sliderRow.appendChild(label);
    sliderRow.appendChild(slider);
    sliderRow.appendChild(stat);

    var legend = el("div", "ae-legend",
      '<span><span class="dot" style="background:' + C_GOLD + '"></span>each rule’s share of a fixed softmax pie (sum = 100%)</span>' +
      '<span>the <b style="color:' + C_RED + '">critical rule</b> is the one that keeps your agent from rm -rf’ing the repo</span>');

    wrap.appendChild(bar);
    wrap.appendChild(sliderRow);
    wrap.appendChild(legend);
    root.appendChild(wrap);

    var palette = ["#e8b64c", "#d9a13f", "#c98c36", "#b8782f", "#a6652a", "#945326", "#8a4a3f",
                   "#7f4252", "#6e4a6e", "#5f5480", "#5563a0", "#4f7ab4", "#4b93a8", "#4aa88f",
                   "#5ee9c8"];

    function render() {
      var n = parseInt(slider.value, 10);
      bar.innerHTML = "";
      var crit = 100 / Math.pow(n, 1.6);
      crit = Math.max(0.8, Math.min(60, crit));
      var rest = (100 - crit) / (n - 1 || 1);
      for (var i = 0; i < n; i++) {
        var seg = el("div", "ae-seg");
        var isCrit = (i === 0);
        var share = isCrit ? crit : rest;
        seg.style.flexGrow = String(share);
        seg.style.background = isCrit ? C_RED : palette[i % palette.length];
        seg.style.opacity = isCrit ? "1" : "0.85";
        seg.title = (isCrit ? "CRITICAL RULE" : "rule #" + i) + " — " + share.toFixed(2) + "% of attention";
        if (share > 7) seg.textContent = share.toFixed(1) + "%";
        bar.appendChild(seg);
      }
      stat.innerHTML = "critical rule: <b>" + crit.toFixed(1) + "%</b>";
      if (n >= 25) {
        stat.innerHTML += " <span style='color:" + C_RED + "'>(it will evaporate at long context)</span>";
      }
    }
    slider.addEventListener("input", render);
    render();
  }

  /* ── 3 · Agent loop ─────────────────────────────────────────────────── */

  var LOOP_STEPS = [
    { node: 0, cls: "l-obs",  text: "observe  →  tool_error: `flask run` exited 1 — ModuleNotFoundError: 'plantill' (did you mean: 'plantilldb'?)" },
    { node: 1, cls: "l-plan", text: "plan     →  brain: typo in requirements.txt. Smallest fix: edit line 3, re-run tests. No re-architecture." },
    { node: 2, cls: "l-act",  text: "act      →  spinal cord routes to edit_tool; patches requirements.txt; shell re-runs pytest → 7 passed." },
    { node: 3, cls: "l-mem",  text: "remember →  episodic log += this loop. semantic notes.md += “package is plantilldb, not plantill”. state: step 4/6 done." },
    { node: 0, cls: "l-obs",  text: "observe  →  tests green; screenshot of /plants renders 12 rows. proprioception: 14% token budget used." },
    { node: 1, cls: "l-plan", text: "plan     →  brain: goal “plant tracker, working tests” is met. Propose finish." },
    { node: 2, cls: "l-act",  text: "act      →  judge-of-done (separate call, not the actor) verifies goal against state: FINISHED." },
    { node: 3, cls: "l-done", text: "done     →  loop exits. Memory files persist. Next organism-day starts with a brain, not a blank." }
  ];

  function initAgentLoop(section) {
    var root = section.querySelector("#agent-loop-viz");
    if (!root || section.dataset.alInit === "1") return;
    section.dataset.alInit = "1";

    var wrap = el("div", "al-wrap");

    var svgNS = "http://www.w3.org/2000/svg";
    var cycle = el("div", "al-cycle");
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "-10 0 320 300");
    cycle.appendChild(svg);

    var ring = document.createElementNS(svgNS, "circle");
    ring.setAttribute("cx", 150); ring.setAttribute("cy", 150); ring.setAttribute("r", 92);
    ring.setAttribute("class", "al-ring");
    svg.appendChild(ring);

    var NAMES = ["sense", "decide", "act", "remember"];
    var nodes = [];
    for (var i = 0; i < 4; i++) {
      var a = -Math.PI / 2 + i * Math.PI / 2;
      var x = 150 + Math.cos(a) * 92, y = 150 + Math.sin(a) * 92;
      var c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x); c.setAttribute("cy", y); c.setAttribute("r", 10);
      c.setAttribute("fill", "#1c1430");
      c.setAttribute("stroke", C_MUTED);
      c.setAttribute("stroke-width", "2");
      svg.appendChild(c);
      var t = document.createElementNS(svgNS, "text");
      var lx = 150 + Math.cos(a) * 126, ly = 150 + Math.sin(a) * 126 + 4;
      t.setAttribute("x", lx); t.setAttribute("y", ly);
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("class", "al-node-label");
      t.textContent = NAMES[i];
      svg.appendChild(t);
      nodes.push({ c: c, t: t });
    }

    var panel = el("div", "al-panel");
    var log = el("div", "al-log");
    var controls = el("div", "al-controls");
    var bStep = btn("step the loop ▸");
    var bAuto = btn("auto-run");
    var badge = el("span", "al-step-badge", "loop 0 · memory: 2 msgs");
    controls.appendChild(bStep);
    controls.appendChild(bAuto);
    controls.appendChild(badge);
    panel.appendChild(log);
    panel.appendChild(controls);

    wrap.appendChild(cycle);
    wrap.appendChild(panel);
    root.appendChild(wrap);

    var step = 0, loops = 0, autoTimer = null;

    function paint() {
      var nodeIdx = step < LOOP_STEPS.length ? LOOP_STEPS[step].node : -1;
      nodes.forEach(function (nd, i) {
        var on = (i === nodeIdx);
        nd.c.setAttribute("stroke", on ? C_GOLD : C_MUTED);
        nd.c.setAttribute("fill", on ? "rgba(232,182,76,0.35)" : "#1c1430");
        nd.t.setAttribute("class", "al-node-label" + (on ? " active" : ""));
      });
    }

    function doStep() {
      if (step >= LOOP_STEPS.length) {
        log.innerHTML = "";
        step = 0;
      }
      var s = LOOP_STEPS[step];
      var line = el("div", s.cls, s.text);
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
      loops += (s.node === 3) ? 1 : 0;
      badge.textContent = "loop " + loops + " · memory: " + (2 + step) + " msgs";
      step += 1;
      paint();
    }

    bStep.addEventListener("click", doStep);
    bAuto.addEventListener("click", function () {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; bAuto.textContent = "auto-run"; return; }
      bAuto.textContent = "stop";
      autoTimer = setInterval(doStep, 1400);
    });
    paint();
  }

  /* ── 4 · Llull wheels ───────────────────────────────────────────────── */

  var LLULL_DIGNITIES = [
    ["B", "Goodness"], ["C", "Greatness"], ["D", "Duration"], ["E", "Power"],
    ["F", "Wisdom"], ["G", "Will"], ["H", "Virtue"], ["I", "Truth"], ["K", "Glory"]
  ];
  var LLULL_QUESTIONS = ["What is?", "Of what?", "Why?", "How much?", "Of whom?"];
  var LLULL_RELATIONS = ["Difference", "Contrary", "Exemplar", "Mean", "Order"];

  function initLlullWheels(section) {
    var root = section.querySelector("#llull-wheels-viz");
    if (!root || section.dataset.lwInit === "1") return;
    section.dataset.lwInit = "1";

    var wrap = el("div", "lw-wrap");
    var wheelsBox = el("div", "lw-wheels");
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 360 360");
    wheelsBox.appendChild(svg);

    var CX = 180, CY = 180;
    var rings = [
      { r: 160, color: C_GOLD,  items: LLULL_DIGNITIES, rot: 0 },
      { r: 122, color: C_BLUE,  items: LLULL_QUESTIONS, rot: 0 },
      { r: 84,  color: C_RED,   items: LLULL_RELATIONS, rot: 0 }
    ];

    rings.forEach(function (ring) {
      var c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", CX); c.setAttribute("cy", CY); c.setAttribute("r", ring.r);
      c.setAttribute("class", "lw-ring");
      c.setAttribute("stroke", ring.color);
      c.setAttribute("opacity", "0.6");
      svg.appendChild(c);
      ring.texts = ring.items.map(function (item, i) {
        var t = document.createElementNS(svgNS, "text");
        t.setAttribute("class", "lw-letter");
        t.setAttribute("fill", ring.color);
        t.setAttribute("text-anchor", "middle");
        t.textContent = typeof item === "string" ? item : item[0];
        svg.appendChild(t);
        return t;
      });
      ring.labels = ring.items.map(function (item) {
        return typeof item === "string" ? item : item[1];
      });
    });

    var hub = document.createElementNS(svgNS, "circle");
    hub.setAttribute("cx", CX); hub.setAttribute("cy", CY); hub.setAttribute("r", 46);
    hub.setAttribute("fill", "#0d0916");
    hub.setAttribute("stroke", C_MUTED);
    svg.appendChild(hub);
    var hubText = document.createElementNS(svgNS, "text");
    hubText.setAttribute("x", CX); hubText.setAttribute("y", CY + 4);
    hubText.setAttribute("text-anchor", "middle");
    hubText.setAttribute("class", "lw-letter");
    hubText.setAttribute("fill", C_TEXT);
    hubText.textContent = "ARS";
    svg.appendChild(hubText);

    function place() {
      rings.forEach(function (ring) {
        var n = ring.items.length;
        ring.texts.forEach(function (t, i) {
          var a = -Math.PI / 2 + (i / n) * Math.PI * 2 + ring.rot;
          t.setAttribute("x", CX + Math.cos(a) * ring.r);
          t.setAttribute("y", CY + Math.sin(a) * ring.r + 4);
        });
      });
    }
    place();

    var panel = el("div", "lw-panel");
    var question = el("div", "lw-question", "Spin the wheels. Llull generated every legitimate question mechanically.");
    var verdict = el("div", "lw-verdict", "The 13th-century bug: nothing downstream of the question could <b class='no'>verify</b> the answer. The reader was the runtime.");
    var controls = el("div", "am-controls");
    var bSpin = btn("spin the wheels");
    var bJudge = btn("run the judge (agent era)");
    controls.appendChild(bSpin);
    controls.appendChild(bJudge);
    panel.appendChild(question);
    panel.appendChild(verdict);
    panel.appendChild(controls);

    wrap.appendChild(wheelsBox);
    wrap.appendChild(panel);
    root.appendChild(wrap);

    var pick = { d: 0, q: 0, r: 0 };

    function currentQuestion() {
      var d = LLULL_DIGNITIES[pick.d][1];
      var q = LLULL_QUESTIONS[pick.q];
      var rel = LLULL_RELATIONS[pick.r];
      return {
        text: q + " the " + d + " — in its " + rel.toLowerCase() + "?",
        dims: "dignity " + LLULL_DIGNITIES[pick.d][0] + " · question " + (pick.q + 1) + "/5 · relation " + rel
      };
    }

    function spinRing(ring, target, cb) {
      var start = ring.rot, delta = target - start, t0 = null;
      function frame(ts) {
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / 900);
        var e = 1 - Math.pow(1 - k, 3);
        ring.rot = start + delta * e;
        place();
        if (k < 1) requestAnimationFrame(frame);
        else if (cb) cb();
      }
      requestAnimationFrame(frame);
    }

    bSpin.addEventListener("click", function () {
      pick.d = Math.floor(Math.random() * LLULL_DIGNITIES.length);
      pick.q = Math.floor(Math.random() * LLULL_QUESTIONS.length);
      pick.r = Math.floor(Math.random() * LLULL_RELATIONS.length);
      var full = Math.PI * 2;
      var tD = full * 2 + (pick.d / LLULL_DIGNITIES.length) * full - Math.PI / 2 * 0;
      var tQ = -full * 2 + (pick.q / LLULL_QUESTIONS.length) * full;
      var tR = full + (pick.r / LLULL_RELATIONS.length) * full;
      // rotate so the picked item lands at top (-PI/2 already the base angle)
      spinRing(rings[0], rings[0].rot + full * 2 - (pick.d / LLULL_DIGNITIES.length) * full - (rings[0].rot % full));
      spinRing(rings[1], rings[1].rot - full * 2 + (pick.q / LLULL_QUESTIONS.length) * full - (rings[1].rot % full), function () {
        var qq = currentQuestion();
        question.innerHTML = qq.text + '<span class="q-dim">' + qq.dims + "</span>";
        verdict.innerHTML = "Llull mode: a <b class='no'>human</b> now free-associates an answer. No test, no tool, no memory. The Art generates; nothing verifies.";
      });
      spinRing(rings[2], rings[2].rot + full + (pick.r / LLULL_RELATIONS.length) * full - (rings[2].rot % full));
    });

    bJudge.addEventListener("click", function () {
      var qq = currentQuestion();
      question.innerHTML = qq.text + '<span class="q-dim">' + qq.dims + "</span>";
      verdict.innerHTML = "Agent mode: planner decomposes → tools answer → <b class='yes'>judge-of-done verifies</b> against state → memory files the result. Llull’s missing organ, 700 years late.";
    });
  }

  /* ── 5 · Lab ladder ─────────────────────────────────────────────────── */

  var LAB_STATES = [
    { tag: "v1-amoeba",    name: "amoeba",     organs: [],                                   out: "A = 845.6  ·  run twice: identical" },
    { tag: "v2-nerve-net", name: "nerve net",  organs: ["roles"],                            out: "A = 845.6  ·  run twice: identical" },
    { tag: "v3-head",      name: "head",       organs: ["roles", "brain", "spine", "reflex", "memory"], out: "run 1: 841.9 → run 2: 851.3 (+1% closer to 860)" },
    { tag: "v4-cns",       name: "CNS",        organs: ["roles", "brain", "spine", "reflex", "memory", "loop", "judge", "budget"], out: "run 1: 841.9 → run 2: 851.3 · iters=1/5 · lessons.md grows" }
  ];

  function initLabLadder(section) {
    var root = section.querySelector("#lab-ladder-viz");
    if (!root || section.dataset.labInit === "1") return;
    section.dataset.labInit = "1";

    var wrap = el("div", "ae-wrap");
    var bar = el("div", "ae-bar");
    bar.style.height = "64px";
    var controls = el("div", "am-controls");
    var readout = el("div", "am-readout", "git checkout v1-amoeba && python3 fit_xsec.py");

    LAB_STATES.forEach(function (st, i) {
      var seg = el("div", "ae-seg", st.name);
      seg.style.flexGrow = "1";
      seg.style.background = ["#8a4a3f", "#a6652a", "#c98c36", "#e8b64c"][i];
      seg.style.cursor = "pointer";
      seg.addEventListener("click", function () { select(i); });
      bar.appendChild(seg);
    });

    function select(i) {
      var st = LAB_STATES[i];
      var organs = st.organs.length
        ? st.organs.map(function (o) { return "<b>" + o + "</b>"; }).join(" · ")
        : "<b>none</b>";
      readout.innerHTML =
        '<span style="color:' + C_GOLD + '">git checkout ' + st.tag + "</span> → organs: " + organs +
        "<br>→ " + st.out;
    }

    controls.appendChild(el("span", "viz-note", "click a stage:"));
    wrap.appendChild(bar);
    wrap.appendChild(controls);
    wrap.appendChild(readout);
    root.appendChild(wrap);
  }

  /* ── 6 · Who verifies ───────────────────────────────────────────────── */

  var LANGS = [
    { name: "Python", color: "#8a4a3f", who: "you (vibes + tests you forgot to write)",
      demo: "runs. prints A = 845.6. the wrong weighting is invisible. a satellite died this way." },
    { name: "C++", color: "#a6652a", who: "you — at runtime, via core dumps",
      demo: "compiles your mistake at -O2. segfault is runtime philosophy. ROOT awaits." },
    { name: "Rust", color: "#c98c36", who: "the compiler — deterministic reflex arc, 30 yrs old",
      demo: "borrow checker refuses data races & dangling refs BEFORE runtime. human or agent: irrelevant." },
    { name: "Lean", color: "#e8b64c", who: "the kernel — a judge of done that cannot be bribed",
      demo: "theorem + program, machine-checked together. 'looks right' does not typecheck." }
  ];

  function initWhoVerifies(section) {
    var root = section.querySelector("#who-verifies-viz");
    if (!root || section.dataset.wvInit === "1") return;
    section.dataset.wvInit = "1";

    var wrap = el("div", "ae-wrap");
    var bar = el("div", "ae-bar");
    bar.style.height = "56px";
    var readout = el("div", "am-readout", "same fit function, four languages — click one: <b>who says it is true?</b>");

    LANGS.forEach(function (L, i) {
      var seg = el("div", "ae-seg", L.name);
      seg.style.flexGrow = "1";
      seg.style.background = L.color;
      seg.style.cursor = "pointer";
      seg.addEventListener("click", function () {
        readout.innerHTML = "<b>" + L.name + "</b> → verified by: <b>" + L.who + "</b><br>" + L.demo;
      });
      bar.appendChild(seg);
    });

    wrap.appendChild(bar);
    wrap.appendChild(readout);
    root.appendChild(wrap);
  }

  /* ── 7 · Judge gate ─────────────────────────────────────────────────── */

  var JUDGE_CHECKS = [
    { name: "spine: tests + lint", kind: "code" },
    { name: "legibility: findable in 3 turns", kind: "llm" },
    { name: "habitat fit: right place in skeleton", kind: "llm" },
    { name: "skill reuse: no re-implementation", kind: "code" }
  ];
  var JUDGE_DIFFS = [
    { label: "diff A — log-space fit + test", pass: [true, true, true, true], verdict: "PASS — ship it; diff is 14 lines, test included" },
    { label: "diff B — re-implemented fit_a, no test", pass: [true, false, false, false], verdict: "REVISE — skills/fit-cross-section/fit.py already does this; delete the copy, call the skill, add the test" },
    { label: "diff C — one-liner, breaks 2 tests", pass: [false, true, true, true], verdict: "BLOCKED at gate 1 — deterministic; the LLM never even gets asked. Spine first." }
  ];

  function initJudgeGate(section) {
    var root = section.querySelector("#judge-gate-viz");
    if (!root || section.dataset.jgInit === "1") return;
    section.dataset.jgInit = "1";

    var wrap = el("div", "ae-wrap");
    var controls = el("div", "am-controls");
    JUDGE_DIFFS.forEach(function (d, i) {
      var b = btn(d.label);
      b.addEventListener("click", function () { run(i); });
      controls.appendChild(b);
    });

    var board = el("div", "ae-legend");
    board.style.flexDirection = "column";
    board.style.gap = "6px";
    board.style.fontFamily = "var(--font-mono)";
    board.style.fontSize = "13px";

    var verdict = el("div", "lw-question", "pick a diff — the judge runs its gates in order");

    JUDGE_CHECKS.forEach(function (c) {
      var row = el("div", "", '<span class="jg-mark">·</span> ' + c.name +
        ' <span style="color:' + (c.kind === "code" ? C_BLUE : C_GOLD) + '">[' +
        (c.kind === "code" ? "deterministic" : "llm") + "]</span>");
      board.appendChild(row);
    });

    function run(i) {
      var d = JUDGE_DIFFS[i];
      var rows = board.children;
      for (var k = 0; k < JUDGE_CHECKS.length; k++) {
        var mark = rows[k].querySelector(".jg-mark");
        var stop = false;
        if (JUDGE_CHECKS[k].kind === "code" && !d.pass[k]) stop = true;
        if (stop) {
          mark.textContent = "✖"; mark.style.color = C_RED;
          for (var m = k + 1; m < JUDGE_CHECKS.length; m++) {
            rows[m].querySelector(".jg-mark").textContent = "—";
            rows[m].querySelector(".jg-mark").style.color = C_MUTED;
          }
          break;
        }
        mark.textContent = d.pass[k] ? "✔" : "✖";
        mark.style.color = d.pass[k] ? C_MINT : C_RED;
      }
      verdict.innerHTML = d.verdict;
    }

    wrap.appendChild(controls);
    wrap.appendChild(board);
    wrap.appendChild(verdict);
    root.appendChild(wrap);
  }

  /* ── Deck glue ───────────────────────────────────────────────────────── */

  function onDeckSlide(section) {
    if (!section) return;
    if (section.querySelector("#amoeba-viz")) initAmoeba(section);
    if (section.querySelector("#attention-economy-viz")) initAttentionEconomy(section);
    if (section.querySelector("#agent-loop-viz")) initAgentLoop(section);
    if (section.querySelector("#llull-wheels-viz")) initLlullWheels(section);
    if (section.querySelector("#lab-ladder-viz")) initLabLadder(section);
    if (section.querySelector("#who-verifies-viz")) initWhoVerifies(section);
    if (section.querySelector("#judge-gate-viz")) initJudgeGate(section);
  }

  Reveal.on("ready", function () {
    onDeckSlide(Reveal.getCurrentSlide && Reveal.getCurrentSlide());
  });
  Reveal.on("slidechanged", function (event) {
    onDeckSlide(event.currentSlide);
  });
  Reveal.on("ready", function () {
    // tag act bridges + deck title by content (markdown can't set classes here)
    var secs = document.querySelectorAll(".reveal .slides > section");
    secs.forEach(function (s, i) {
      var h2 = s.querySelector("h2");
      var h1 = s.querySelector("h1");
      if (i === 0 && h1) s.classList.add("deck-title");
      if (h2 && /^Act \d/.test(h2.textContent.trim())) s.classList.add("act-bridge");
    });
  });
})();
