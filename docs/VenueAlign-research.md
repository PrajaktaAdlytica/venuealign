# VenueAlign • research and visual direction

## What the buyer can already do

RiderForge publishes rider creation, stage plots, editable PDF import, AI checks, shareable advance checklists and production pack exports. A house team can mark a request confirmed or missing, suggest an alternative, or request clarification. A checklist, alternative field or export alone would be a weak reason to switch. [RiderForge features](https://www.riderforge.app/features.html)

RiderForge also describes a readiness view with blockers and next actions. For VenueAlign, the evaluation should ask a narrower question. When the venue suggests a substitute, can the reviewer recover the signed rider passage, identify the inventory revision, inspect the comparison note and explain the decision after the show? Test that question with the buyer’s existing tools. The available evidence does not establish a capability gap at RiderForge. [RiderForge show readiness](https://www.riderforge.app/show-readiness)

A signed rider, a venue checklist and a technical lead’s manual inventory comparison are the baseline supplied in the brief. Preserve what this process resolves. For each exception, record the time spent, accepted alternatives, missing evidence and final amendment. Compare like cases within the same season. A pilot that surfaces more suggestions but increases unsupported fits should be reviewed against the buyer’s adverse-outcome threshold.

## Visual references and decisions

| Primary reference | What the published page shows | Decision applied to VenueAlign |
|---|---|---|
| Linear | The opening introduces the software category, then shows an issue with activity, status, assignee and related work. Later intake and planning chapters use different views of the same product. | Keep a recognizable record through the homepage, product page, case workbench and export. Replace decorative dashboard counts with the source, person, action and open question. [Linear](https://linear.app/) |
| Ableton Push | The product has local navigation for overview, features, technical specifications and learning. The overview revisits the same physical device as an instrument, sampler, controller and studio, pairing each role with its own visual. | Give every proposed module an identifiable object. A rider page, profile fixture, crew timeline and folded packet explain the four offers at a glance. Keep detailed inputs on the dedicated pages. [Ableton Push](https://www.ableton.com/en/push/) |
| GSAP | The official scroll showcase exposes code for a timeline coupled to a specific viewport interval. ScrollTrigger documents the difference between a native horizontal scroller and a horizontally translated sequence controlled by vertical scroll. | Use a short scrubbed camera movement on the hero. Use a native horizontal product shelf so visitors can reach any offer directly. Keep the technical decision under a user-operated control. [Scroll showcase](https://gsap.com/scroll/) · [ScrollTrigger reference](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| atQuo | The studio’s independent Webflow reconstruction describes a fixed heading beside moving product imagery and a video that settles inside a frame. This is a first-party account of the reconstruction. | Keep the review heading and case identity visible while the evidence stage changes. Leave the chapter naturally as the last decision scrolls past. [Studio case study](https://www.atquo.com/work/apple-webflow) |

Perplexity’s high research preset supplied reference discovery. Official product pages were checked for their published structure. The motion specification below describes VenueAlign’s implementation. Exact easing curves and timing on the reference sites cannot be established from published page text.

## Brand and art direction

Three routes were considered. A **tour dossier** would open on a signed document with margin notes. A **control-room desk** would open on the workbench with the exception queue. The selected **backstage wing** opens on the empty room, then moves to the documents and the reviewer. That order gives a production manager a familiar setting before asking them to learn a new interface.

The public name is VenueAlign. The original mark interlocks diagonal strokes into a compact V that reads against both paper and a dark stage. Use the primary mark on warm paper, the reverse on dark surfaces and the compact mark for the favicon. Keep clear space of roughly one-quarter of the mark height. Use the favicon for very small placements. Preserve the aspect ratio of each lockup.

| Role | Specification |
|---|---|
| Editorial display | Newsreader, regular and italic. The hero uses a short two-line title. Section titles use responsive sizes and restrained italic emphasis. |
| Interface and body | Manrope, 16 px minimum for body copy. The evidence console uses distinct weights and explicit state words. System monospace carries document IDs and versions. |
| Surfaces | Paper #FAF9F3, ink #151A19, control-room navy #111B2D, pale sage for contextual sections. |
| Actions and states | Chartreuse #DEF49C for the primary action on dark fields. Cobalt for focus and case navigation. Pending or open states include written labels. |
| Grid | Shared responsive gutter, capped wide content, shorter reading measure. Action buttons have visible hover, pressed and keyboard focus states. |
| Image rights | Stage and backstage photographs are original AI-generated fictional scenes. Product diagrams, source extracts and UI were created for the concept. Fonts and their license notices ship with the site. |

## Scroll and interaction score

| Scene | Entry, movement and end state | Mobile and keyboard |
|---|---|---|
| Stage hero | The label, title, sentence and actions enter in a brief stagger. The background shifts slightly as the visitor leaves. Stage view and Plan view switch between the photograph and the fictional masking-line drawing. | Both visual controls are real buttons. Reduced motion keeps the photograph still. The headline and primary action are available immediately. |
| Buyer problem | On warm paper, the written problem is paired with the equipment and plan photograph. A short vertical entrance settles with both items aligned. | Picture follows the copy in reading order. |
| Product suite | A muted inventory-board background holds four custom drawings. The shelf snaps horizontally by product. The next panel remains discoverable and each card opens its own page. | Touch, keyboard links and previous/next buttons work independently of vertical page scroll. |
| Workbench | A navy field separates the product proof from marketing copy. A readable console shows both inputs and the open spacing case. Opening the workbench moves into an actual interactive record. | The console follows the explanation. Dated source passages and local approval have their own controls in the demo. |
| Technical review | The left evidence trace remains sticky while three review steps pass vertically. Its state changes from source comparison to proposed match to reviewer disposition. | At narrow widths the trace sits in normal flow. All three written steps remain visible. |
| Use cases | Sage background, editorial heading, expandable role-specific decisions. | Native disclosures support tapping and keyboard activation. |
| Feedback and pilot | Paper, a margin rule and a fictional reviewer note introduce feedback. The commercial section presents the pilot and annual hypothesis side by side. The final stage photograph returns behind the pilot invitation. | Columns stack in reading order. No measured customer outcome is implied. |

The named reference video was unavailable in the task material. Its exact timing, shots and transitions have not been attributed to these designs.

## Live browser observations

Chrome inspected all three official pages at a **1440 × 900 viewport**. The entries below record visible headings, media and computed backgrounds at each scroll position. Positions are CSS pixels from the top and depend on this viewport.

| Page | 0 px | 780 px | 2,200 px | 3,700 px |
|---|---|---|---|---|
| Linear | Category headline and a named app-launch issue share the opening viewport. Near-black surfaces use several adjacent charcoal values. | The category statement takes over while app imagery remains visible. | Intake and integrations focus on a separate workflow. | Planning and monitoring sits on the same dark field. Chapter changes rely on interface content and type. |
| Ableton Push | Push 3 and a video share a dark introductory field. | The explanatory question enters while video remains visible. | Several playing and recording tasks appear with video and pale green surfaces. | Configurations introduces still product imagery, a pale blue surface and a visible sticky element. |
| GSAP | The scroll product heading and graphic elements open the page. | Scroll Plugins enters alongside the introductory copy. | The focus moves to ScrollTrigger. | A pink surface and a graphic occupy the sampled viewport. |

This inspection verified the sequence of visible content and surface changes. It did not establish a horizontal scroll link on Linear or Push. The horizontal shelf in VenueAlign is a design choice for browsing four equally important offers. The keyboard, touch and reduced-motion behavior follows VenueAlign's own interaction requirements. [Browser study run](https://github.com/PrajaktaAdlytica/venuealign/actions/runs/45582914796)
