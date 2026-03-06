# Chapter 2: Filing and Organizing — Results

## Observations and Notes for Future Chapters

### Section 2.1: Searching

- Standard search covers `title`, `text`, and `tags` fields only. Custom fields like `family` on contact tiddlers are invisible to search.
- Verified in the TiddlyWiki UI: searching for `JohnDoe` returns only the JohnDoe tiddler itself (title match). The `family: JohnDoe` references on JaneDoe and EmilyDoe do not appear. This matches the Ex:JohnDoeSearch answer.
- The answer mentions "Later on, we'll learn some ways around this" — presumably filters and/or custom search. Good to keep in mind for later chapters.
- Ex:SearchExploration is open-ended with no specific answer to verify.
- Keyboard shortcut Ctrl+Shift+F for focusing the search box works as described.

### Section 2.2: Browsing Your Tiddlers

- All the More tab subsections (All, Recent, Tags, Missing, Drafts, Orphans, Types, Plugins) are present and work as described.
- The drag-and-drop reordering in the Open tab is confirmed as working but indeed not very discoverable.
- The section correctly notes that System, Shadows, and Explorer tabs will be covered later.
- The mention of the Stroll plugin for side-by-side columns is a nice tip.
- Ex:LookAtBrowseOptions is open-ended, no answer to verify.

### Section 2.3: Tiddler Titles

- This section is conceptual. The "They Say, I Say" quote and the Andy Matuschak "idea APIs" reference are nice framing.
- Ex:NamingOldNotes is open-ended/reflection, no specific answer.

### Section 2.4: Naming Conventions

- The section on CamelCase normalization (e.g., `WritingInHtml` not `WritingInHTML`) is clear.
- The singular vs. plural convention discussion is well-explained, including the practical note about `[[Apple]]s` being easier than `[[Apple|Apples]]`.
- The namespacing discussion (using `/` or `:` separators) is useful context — this book uses `Ex:`, `Sn:`, `Ta:` prefixes.
- Ex:NamingConventionImagination is open-ended, no answer to verify.
- The link to the Mosaic Muse naming conventions is an external reference — not verified.
- Ex:ProblematicTiddlerNames has a specific answer; see potential issues section below.

### Section 2.5: Slicing Up Content

- The "tiddlers as models of nouns" metaphor is a key concept. The section clearly explains that tiddlers can serve as models, gatherers (sentences), lenses (templates), and machines.
- The "create more tiddlers than you think you should" rule of thumb and the "shouldn't scroll" size guideline are good heuristics.
- The section on splitting wikis vs. keeping one is well-argued — the single-wiki approach is preferred for knowledge that might be connected.
- The "In Grok TiddlyWiki" subsection explains the book's own tiddler structure (`parent` field instead of tags for chapters, transclusion for exercises/takeaways).
- Ex:SlicingInGtw asks the reader to explore the book's own wiki — no specific answer.
- Ex:Slicing is open-ended, no specific answer.

### Section 2.6: Creating Hierarchies with a Table of Contents

- Created `OnboardingHr`, `OnboardingPeople`, `OnboardingTraining` tiddlers tagged with `OnboardingProcess`.
- Moved `EmployeeProfileSetupMeeting` from tag `OnboardingProcess` to `OnboardingHr`.
- The progression from `<<toc>>` to `<<toc-expandable>>` to `<<toc-selective-expandable>>` is well-explained.
- The "curly quotes" detail box is a useful warning. The .tid source correctly uses actual curly quotes in the "bad example" to show what wouldn't work.
- The "shortcut for current tiddler" detail box notes you can write `<<toc>>` without arguments if the TOC root is the current tiddler.
- Verified in the UI: `<<toc-selective-expandable "OnboardingProcess">>` works correctly, showing chevrons only on items with children.
- Ex:TocAddition: Created `SecurityTrainingSession` under `OnboardingTraining`. Confirmed it appears in the TOC.
- Ex:TocInternalExternalNav: The answer explains internal nav changes the right pane, external nav opens in story river. Verified the answer text is clear and correct.
- Ex:TocCaptions: Added `caption` fields (HR, People, Training) to the three top-level tiddlers. Confirmed captions display in the TOC instead of full tiddler names.
- Ex:FudgeAdviceTiddler: Created `AvoidSayingFudgeAtWork` tagged with `EmployeeProfileSetupMeeting`. The exercise specifies exact wikitext content including CamelCase links. Verified that JaneDoe and EmployeeProfileSetupMeeting render as working links.
- Ex:FudgeAdviceReflection: Reflection exercise asking whether the fudge note is really a child of the meeting. No specific answer to verify, but it leads directly into the Evergreen Notes section.

### Section 2.7: Ordering Tiddlers

- The `list` field mechanism is well-explained. The `list-before` and `list-after` fields are introduced as alternatives.
- Corner cases section: `list-after` > `list-before` > `list` precedence; unordered items go at the end alphabetically.
- `list-links-draggable` requires an existing `list` field — this caveat is explicitly mentioned.
- The note about drag-and-drop deleting `list-before`/`list-after` fields is important.
- Ex:MeetingOrdering: Created additional meeting tiddlers under OnboardingHr. Added a `list` field to OnboardingHr to order them. Verified correct display order in the TOC.
- Ex:MeetingOrderingByProcedure: Added `<<list-links-draggable "OnboardingHr">>` to the OnboardingHr tiddler. Verified it renders as a bulleted list of links in the correct order.
- Ex:OnboardingPeopleFirst: Set `list-before: OnboardingHr` on `OnboardingPeople`. Verified in the UI that People appears first in the TOC. The answer correctly notes that the value must be `OnboardingHr` (the title), not `HR` (the caption).

### Section 2.8: Creating Evergreen Notes

- This section is the philosophical heart of the chapter. The three purposes of notes (Integration, Reference, Serendipity) are a useful framework.
- The "context in which you learn something is usually not the one in which that information is useful long-term" insight is well-articulated.
- The three principles for evergreen notes: (1) retrieval context, (2) relate to many things, (3) regularly revisit and evolve.
- The Andy Matuschak and Sönke Ahrens references are appropriate.
- The "broken windows theory" application to notes is a nice analogy.
- After the Evergreen Notes section discussion, I moved the fudge tiddler's tag from `EmployeeProfileSetupMeeting` to `ThingsToBeCarefulAbout` and added relevant links, which is the spirit of the section's advice.
- Ex:FudgeTiddlerRevisited: Updated fudge tiddler with appropriate tags and links per the section guidance.
- Ex:IdentifyingRecentEvergreenNotes: Open-ended reflection exercise, no specific answer.

### Wiki State After Chapter 2

New tiddlers created:
- `OnboardingHr` (caption: HR, list field for ordering children)
- `OnboardingPeople` (caption: People, list-before: OnboardingHr)
- `OnboardingTraining` (caption: Training)
- `SecurityTrainingSession` (meeting under OnboardingTraining)
- `BenefitsEnrollmentMeeting` (meeting under OnboardingHr)
- `ComplianceTrainingMeeting` (meeting under OnboardingHr)
- `AvoidSayingFudgeAtWork` (tagged ThingsToBeCarefulAbout)

Modified tiddlers:
- `EmployeeProfileSetupMeeting` — tag changed from `OnboardingProcess` to `OnboardingHr`
- `OnboardingProcess` — added `<<toc-selective-expandable "OnboardingProcess">>` to body

---

## Potential Errors or Issues

### Ex:ProblematicTiddlerNames answer may be incomplete (Minor)

The answer for problem #1 (`Company Entry Doors`) says: "This name may or may not follow your language's rules about title case." However, the section also discusses plurals as a naming hazard ("I like to always write all nouns in the singular"). `Doors` is plural. The answer only flags the title case issue, not the plural. Similarly, #5 (`Onboarding: Office chair selection`) has a capitalization inconsistency ("Office" is lowercase "chair selection" but "Onboarding" is capitalized), which the answer doesn't mention — it only flags the namespacing/context issue.

These aren't wrong per se — the exercise says "each exhibit a possible danger" (singular), so one danger per name is probably the intent. But readers who notice both issues might be confused that only one is mentioned.

### The `list-links-draggable` caveat could be clearer (Minor)

The section says: "Unlike a tag pill, though, `list-links-draggable` only works if the tag tiddler already exists and has a `list` field containing items." This could cause confusion for readers trying Ex:MeetingOrderingByProcedure if they haven't already established a `list` field on `OnboardingHr`. The exercise doesn't explicitly tell you to create the `list` field first — it says to "Repeat the previous exercise" using `list-links-draggable`, assuming the `list` field was created by the drag-and-drop in Ex:MeetingOrdering. If a reader skipped Ex:MeetingOrdering or didn't do the drag-and-drop step (which creates the `list` field), the `list-links-draggable` would show nothing with no obvious error.

### Sequencing of fudge tiddler exercises (Observation, not an error)

The flow is: Ex:FudgeAdviceTiddler → Ex:FudgeAdviceReflection → (Ordering Tiddlers section) → Creating Evergreen Notes section → Ex:FudgeTiddlerRevisited. The exercise asks you to create the fudge tiddler as a child of the meeting, then reflect on whether that's the right placement, then much later (after a whole other section) asks you to revisit it. This is intentional pedagogy — the reader learns by doing it "wrong" first — but it means the wiki is in an intermediate state where the fudge tiddler appears in the OnboardingProcess TOC hierarchy. The book doesn't explicitly tell you to remove the `EmployeeProfileSetupMeeting` tag; instead, the Evergreen Notes section says to add a "things to be careful about" tag. Strictly following the instructions would result in the tiddler having BOTH tags, which creates a confusing TOC (fudge advice nested under a meeting within a project hierarchy AND tagged with a retrieval context). Readers might not realize they should remove the meeting tag.

### No issues found with search behavior or TOC functionality

All wikitext constructs (`<<toc>>`, `<<toc-expandable>>`, `<<toc-selective-expandable>>`, `<<list-links-draggable>>`) work exactly as described. The `list-before` field for reordering works correctly. The `caption` field for TOC display works correctly. The search behavior (title/text/tags only, not custom fields) matches the documented behavior.
