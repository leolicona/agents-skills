---
name: mvp-stack
description: >-
  Surveys what already exists in the ecosystem before building an MVP, decides
  adopt / reuse / build per capability against the developer's current stack,
  and time-boxes spikes for the unknowns. Use when asked what tools, services
  or APIs to use, whether to build or buy something, how not to reinvent the
  wheel, or to research or spike a technology before /speckit.plan.
tags: [architecture, research, build-vs-buy, spike, spec-driven-development]
allowed-tools: [Read, Write, Edit, Glob, Grep, WebSearch, WebFetch, Bash]
---

# MVP stack

## When to use this skill

The idea is settled and the question is now *what do I use to build it*: which
services, APIs, libraries or platforms already solve each piece, what is worth
building, and what needs a spike first.

Not for writing the implementation plan itself — that is `/speckit.plan` — and
not for implementing anything.

Context: one developer building product with AI agents. Their existing stack
is a first-class constraint, not a detail: an unfamiliar tool spends the
appetite twice, once learning it and once operating it.

## How to work

1. **Read the brief first** — `projectbrief.md` and `memory/constitution.md`
   if they exist. Take the appetite, the run-cost ceiling and *Out of scope*
   from there; ask only what is missing.
2. **Derive the capability list** from the brief, in vendor-neutral terms:
   what the MVP must *do*, not what it must use ("receive and verify inbound
   webhooks", not "use Workers"). Show the list and get it confirmed before
   researching — it is the spine of everything that follows.
3. **Ask about the stack** (one round, 3 questions max):
   - What do you already run in production and know well?
   - What are you willing to learn inside this appetite?
   - What do you refuse to operate (self-hosted databases, Kubernetes, a
     second cloud)?
4. **Research each capability.** Rules below.
5. **Decide per capability**: adopt, reuse or build.
6. **Spike the unknowns** that could break the decision.
7. **Write `mvp-stack.md`** from `references/mvpstack-template.md`.

## Researching a candidate

Verify against the vendor's own documentation, never from memory or from a
blog post summarizing it:

- **Hard limits** first: rate limits, payload sizes, timeouts, message
  windows, quotas. These kill designs late; find them early.
- **Price at MVP scale and at 10x.** A free tier that ends at the first real
  customer is not free.
- **Does it run where you already deploy?** Runtime compatibility beats
  feature lists — many SDKs assume Node APIs an edge runtime lacks.
- **Is it alive?** Last release, open issues, whether the vendor still sells
  it.
- **Exit cost.** What does it take to swap it out later, and what data would
  be trapped.
- **Compliance**, when the capability touches personal data: where it is
  stored, how long, who else can read it.

Cite the URL for every limit and price you record. An unverified number is an
open question, not a fact.

## Deciding

- **Default to adopt.** Anything that is not the differentiator is bought,
  rented or reused. You are one developer.
- **Build only the differentiator** — the part that makes the product yours.
  If the survey suggests building something else, that is a mistake.
- **Prefer what the developer already operates.** A worse tool they know
  usually beats a better tool they do not, inside an MVP appetite. Say so
  explicitly when it applies.
- **One new technology per MVP, at most.** Name which one it is.
- **Managed over self-hosted**, always, for a single-developer MVP.
- Record every rejected alternative in one line. The value of the survey is
  as much in what you ruled out as in what you chose.

## Spikes

When documentation cannot settle whether an option holds up, name the unknown
and hand it to the `tech-feasibility` skill, which turns it into a falsifiable
question, runs it and reports back into the *Spikes* table here.

- Name **three at most**. More than that means the capability list is still
  vague — go back to step 2.
- For each, state the decision it blocks and the fallback if the answer is
  no. A spike with no fallback is a bet, not an experiment.
- Do not research the unknown here: an option no spike has tested is a
  candidate, not a decision.

## Example

A WhatsApp Cloud API support bot, developer already running Cloudflare:

| Capability | Decision | Choice | Why |
| --- | --- | --- | --- |
| Inbound webhook + signature check | adopt + build glue | Workers | already deployed there |
| Conversation state | adopt | KV or D1 | same platform, no ops |
| Media storage | adopt | R2 | same platform, egress cost |
| Answer generation | adopt | LLM API | not the differentiator |
| Support routing and escalation rules | **build** | — | this is the product |

Spike: *can a Worker verify the request signature and reply within the
provider's webhook timeout under a burst?* 3 hours, unblocks the whole
platform choice, fallback is a queue-backed handler.

## Rules

- **Never recommend something you did not verify against its documentation
  this session.** Ecosystems move; your memory of a pricing page is stale.
- Prices and limits carry a URL and the date checked, or they are marked
  `[NEEDS CLARIFICATION: ...]`.
- Vendor-neutral capability names, always. Naming the tool inside the
  capability decides the answer before the research starts.
- No recommendation without a named alternative that was rejected and why.
- Keep it to one page plus the tables. Depth goes into the spikes.
- Never edit `specs/`, `memory/constitution.md` or `.specify/`.

## Spec-driven development

`mvp-stack.md` sits between the brief and `/speckit.plan`: it is the Phase 0
research that fills the plan's **Technical Context** (language, dependencies,
storage, platform, constraints, scale). Hand it over when running
`/speckit.plan`, and let that command write `plan.md` and `research.md`
itself.
