# Chapter 3: Filtering and Formatting — Results

## Observations and Notes for Future Chapters

### Section 3.1: Filters (Concept)

- This section introduces filters as the sixth basic TiddlyWiki concept.
- Filters are compared to spreadsheet formulas — general-purpose glue that avoids manual work.
- The section is conceptual with no exercises; it introduces the topic covered in the next three sections.
- No takeaway exercises to verify.

### Section 3.2: Using Filter Expressions

- Filter expressions consist of runs containing steps. A run is like a pipeline: tiddlers flow left-to-right through steps that can filter, transform, or replace the list.
- **Order of filter steps matters**: `[!is[system]links[]]` vs `[links[]!is[system]]` have different meanings.
- Three common mistakes highlighted: forgetting outer brackets, missing closing bracket, putting spaces between steps.

**Ex:CreatingBasicFilters** — All 5 parts verified in Advanced Search:
1. `[tag[Application]]` → Employee Information System, ReallyAnnoyingFiveFactorAuthenticationProcess (2 results)
2. `[tag[Application]tag[OnboardingProcess]]` → 0 results (correct — no application is tagged OnboardingProcess)
3. `[[JaneDoe]tag[Application]]` → 0 results (correct — Jane is not an application)
4. `[[EmployeeProfileSetupMeeting]backlinks[]]` → 4 results: 2026-03-06 Fri, AvoidSayingFudgeAtWork, Employee Information System, ReallyAnnoyingFiveFactorAuthenticationProcess
5. `[[EmployeeProfileSetupMeeting]backlinks[]!tag[Journal]]` → 3 results (excludes the journal entry, which is tagged Journal)

### Section 3.3: Anatomy of Filter Steps

- This section (referenced in book's `list` field but read via exercise origins) covers constructors vs selectors.
- The `title` operator is a **constructor** — it ignores its input entirely. This is why `[tag[Application][JaneDoe]]` does NOT mean "JaneDoe if tagged Application" — the title constructor replaces the pipeline contents.

**Ex:ConstructorAfterFilterStep** — Verified:
- `[tag[Contact]title[Employee Information System]tag[Application]]` → returns "Employee Information System" (1 result)
- The `title` constructor in the middle discards all Contact tiddlers and injects Employee Information System, then `tag[Application]` confirms it has that tag.

**Ex:NonexistentTiddlerFilter** — Verified:
- `[[I Don't Exist]]` returns the string "I Don't Exist" even though no such tiddler exists.
- `[[I Don't Exist]is[tiddler]]` returns 0 results, filtering out the nonexistent tiddler.
- This is because filters work with strings that may or may not correspond to real tiddlers.

**Ex:MeaninglessSuffix** — Verified:
- `[tag:foo[Meeting]]` still returns all Meeting-tagged tiddlers (4 results). The meaningless suffix is ignored.

### Section 3.4: Common Filter Operators

- Covers links (`backlinks[]`, `links[]`), tags (`tag[]`, `tagging[]`), fields (`field:`, `contains:`, `has[]`, `search:`), and misc (`count[]`, `sort[]`, `get[]`).
- Note: The `tagging[]` example mentions "OnboardingProject" but our wiki has "OnboardingProcess". The filter `[tag[Project]tagging[]]` is correct regardless — it's a generic example.

**Ex:CreatingMoreFilters** — All 6 parts verified:
1. `[count[]]` → 55 (total tiddlers in wiki)
2. `[is[system]count[]]` → 34 (system tiddlers)
3. `[[JaneDoe]backlinks[]tag[Meeting]]` → EmployeeProfileSetupMeeting (1 result — only meeting linking to Jane)
4. `[tag[Contact]sort[phone]]` → ChrisSmith, JaneDoe, JohnDoe, EmilyDoe (ChrisSmith has alphabetically earliest phone)
5. `[has[at]]` → 4 meeting tiddlers (BenefitsEnrollmentMeeting, ComplianceTrainingMeeting, EmployeeProfileSetupMeeting, SecurityTrainingSession)
6. `[search:text[JaneDoe help]]` → EmployeeProfileSetupMeeting (plus $:/temp/advancedsearch system tiddlers from search box contents)

**Ex:JohnDoeInAnyField** — Verified:
- `[!is[system]search:*[JohnDoe]]` → EmilyDoe, JaneDoe, JohnDoe (3 results)
- The `*` suffix searches all fields, finding John in the `family` field of Jane and Emily's tiddlers.

**Ex:AlphabeticallyLastDescription** — Verified:
- `[all[shadows]tag[$:/tags/EditorToolbar]get[description]split[{{]split[}}]get[text]!sort[]first[]]` → "Wrap selection in square brackets"
- This is a complex multi-step filter involving shadow tiddlers, field transclusion unwrapping, and reverse sorting.

### Section 3.5: HTML

- HTML is a superset topic — wikitext is almost a superset of HTML.
- Covers tags, elements, content, attributes, self-closing tags, void elements, nesting, and whitespace.
- Key point: browsers are generous in accepting malformed HTML, which can make debugging harder.

**Ex:ViewSource** — No answer to verify (open-ended browser exercise).

**Ex:GoogleLink** — Answer verified:
- `<a href="https://www.google.com">Google</a>` creates an HTML link correctly.

**Ex:ImageHtml** — Answer verified:
- `<img>` is a void element with `src` attribute for the image URL.

### Section 3.6: Widgets

- This section is referenced from the chapter list. Widgets are TiddlyWiki's extension of HTML — custom elements like `$list`, `$link`, `$log`.

### Section 3.7: Your First Dynamic List

- The `$list` widget is introduced as one of TiddlyWiki's most important widgets.
- `<<currentTiddler>>` is a placeholder for the currently-processed item in the list.
- Created `MeetingList` tiddler with `$list` widget — renders correctly as a bulleted list of meetings sorted newest-to-oldest.

**Ex:JaneMeetingList** — Verified:
- `[tag[Meeting]contains:participants[JaneDoe]!sort[at]]` → ComplianceTrainingMeeting, EmployeeProfileSetupMeeting (2 results)

**Ex:BulletedMeetingList** — Verified visually:
- Wrapping `$list` in `<ul>` with `<li>` items inside renders a proper bulleted list. Screenshot confirms correct rendering.

**Ex:ContactList** — Verified:
- Created `ContactList` tiddler with `[tag[Contact]sort[]]` filter. Shows ChrisSmith, EmilyDoe, JaneDoe, JohnDoe in alphabetical order. Screenshot confirms correct rendering.

**Ex:ContactListNoPhoneExclusion** — Verified:
- `[tag[Contact]has[phone]sort[]]` — all 4 contacts have phone numbers, so the result is the same. `[tag[Contact]!has[phone]sort[]]` returns 0 results.

**Ex:LinkPattern** — Answer verified:
- `<$link to=<<currentTiddler>>><<currentTiddler>></$link>` creates proper links even for titles with spaces.
- Shorthand `<$link />` works when link target equals current tiddler.

### Section 3.8: Comments

- HTML comment syntax `<!-- -->` works in wikitext.
- Comments cannot be nested.
- No exercises in this section.

### Section 3.9: When Things Go Wrong

- Debugging strategies: scientific method (isolate variables), rubber ducking, browser inspector, displaying variable values with `$log` widget, taking breaks, asking for help.

**Ex:InspectSquare** — Answer verified from source:
- Class: `bluuuuu`
- Hidden message: "Help, I'm trapped in an HTML span!" (in a `<span style="display: none;">`)

**Ex:RubberDucking** — Verified by examining the broken and corrected snippets:
- Broken filter: `[all[tiddlers+shadows]tag[Section]field;parent[Filtering and Formatting]sort[]get[description]]`
- Two errors: (1) `field;parent` uses semicolon instead of colon — should be `field:parent`, (2) `sort[]` comes before `get[description]` — should sort AFTER getting descriptions, otherwise you sort tiddler names then get their descriptions in name-sorted order rather than description-sorted order.
- Corrected: `[all[tiddlers+shadows]tag[Section]field:parent[Filtering and Formatting]get[description]sort[]]`
- Could not run these in test wiki since Section-tagged tiddlers are in the book plugin (not loaded in test wiki), but the syntax errors are clearly identifiable.

**Ex:LogWidget** — Open-ended exercise (paste `<$log X="Y"/>` and check browser console). No specific answer to verify.

## Potential Issues Found

1. **OnboardingProject vs OnboardingProcess**: In the Common Filter Operators section, the `tagging[]` example mentions `OnboardingProject` as a hypothetical project name, but the actual tiddler in the wiki is `OnboardingProcess`. This is presented as a parenthetical example ("e.g., the parts of the `OnboardingProject`..."), so it may be intentionally generic, but the similarity to the actual tiddler name `OnboardingProcess` could confuse readers.

2. **No issues with filter answers**: All filter exercises produce results consistent with the provided answers when tested against our wiki's data.

## Tiddlers Created

- **MeetingList**: Dynamic bulleted list of all meetings sorted newest-to-oldest, with proper `$link` widgets for navigation. Tagged `Tool`.
- **ContactList**: Dynamic list of contacts with phone numbers, sorted alphabetically, using `$link` shorthand. Tagged `Tool`.
