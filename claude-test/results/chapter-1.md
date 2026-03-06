# Chapter 1: The Shape of TiddlyWiki — Notes and Issues

## Status
Completed all sections and exercises. Notes below are in section order.

---

## Installing TiddlyWiki / Downloading Grok TiddlyWiki
No issues. Standard setup steps.

---

## The TiddlyWiki Interface

No issues with this section. It references an annotated screenshot of the TiddlyWiki interface (`interface.png`) to introduce terminology (story river, sidebar, view toolbar, page toolbar, Open/Recent/Tools/More tabs). The section is read-only — no actions required of the reader.

---

## Tweaking Your Settings

Completed in prior session. Settings applied:
- Animation duration: 200ms
- Sidebar layout: fluid-fixed
- Info button: visible on view toolbar
- CamelCase linking: enabled (required browser reload to take effect)
- Site title/subtitle set
- Color palette not explicitly chosen (the book says to "pick one you like" — no specific recommendation given, which is fine)
- New-journal button added to page toolbar

**No issues found.**

---

## Tiddlers / Fields / Wikitext / Links / Tags

These are concept sections with no specific actions required. Read-only.

**Tags section modified date:** 20260306003339000 (today). This is suspicious — if this was recently edited, there may be something worth checking.

**Requirements for the Sample Wiki modified date:** 20260306003349000 (today).

**Meeting Tiddlers modified date:** 20260306003645000 (today).

**Contact Tiddlers modified date:** 20260306004000000 (today).

These recent modifications are unusual and may indicate in-progress edits. The content appeared correct in my review.

---

## Journal Tiddlers

### Journal title format
The book recommends `YYYY-0MM-0DD DDD` to produce dates like `2026-03-06 Fri`. This is correct; tested with today's date (Friday, March 6, 2026 = `2026-03-06 Fri`).

### Journal starting text
The `Sn:JournalStartingText` snippet is used as the template. The text uses `!!` for section headings and `*` for list items. Correctly reproduced.

### Note about section headings in the book
The book says: *"Note: In Grok TiddlyWiki, heading 2 (`!!`) has been customized to show a horizontal line under the title... You won't find this line in a default TiddlyWiki."* This is a helpful caveat about the difference between the book's wiki and a fresh install. No issue, just important context.

### New-journal button location
The book says to find the new-journal button under the Tools tab and tick the checkbox to promote it to the page toolbar. This works as described. The button appears in the page toolbar alongside the new-tiddler button.

### Side-by-side preview discoverability
The book notes: *"the discoverability is terrible"* — the preview button icon (described as looking like "a jagged mouth") is the second from the right on the editor toolbar. This is accurate; the icon is not obviously a "preview" button. The keyboard shortcut Alt+P is a useful alternative.

### Ex:BasicWikitext
Completed. Wikitext formatting practiced:
- `''bold''`, `//italics//`, `` `monospaced` ``
- Bulleted list with `*`
- Numbered list with `#`
- Section heading with `!!`
- Block quote with `>`
- Code block with ` ``` ` fences

### Ex:CloseAndReopen
Completed. To close: `×` button in tiddler upper-right. To reopen: use Recent tab in sidebar (as described) or search.

---

## Contact Tiddlers

### CamelCase for JaneDoe
The text explains: `JaneDoe` won't appear as a link in the book's live example because the book's wiki has CamelCase turned off, but it will in the reader's wiki because we turned it on. This is a clear explanation, no issue.

### Fields added to JaneDoe
- `email`: janedoe@company.com
- `phone`: 888-555-1234
- `manager`: ChrisSmith
- `family`: JohnDoe EmilyDoe

The book correctly notes that fields don't appear on the tiddler face by default — you need the info button → Fields tab to see them.

### The `family` field as a tiddler list
The book explains that space-separated values in a field form a list, and that tiddler names with spaces need `[[double brackets]]`. Correct and clearly explained.

---

## Meeting Tiddlers

### Excise operation
The excise button is described as *"just a little bit to the right of the heading icons"* on the edit toolbar. This is somewhat vague — in practice, it's the scissors icon. No issue with the functionality.

### TiddlyWiki date/time format
The `Datetime Format` transclusion in the Meeting Tiddlers section pulls in an explanation of the timestamp format (YYYYMMDDHHMMSSMMM). The `at` field was set to `20260306090000000` (March 6, 2026, 9:00 AM).

**Potential confusion:** The TiddlyWiki timestamp format is quite unusual and the book notes it "can be a little irritating to work with." Readers may find this confusing. The magic snippet `<$view field="at" format="date" template="DD MMM YYYY hh12:0mm:0ss pm"/>` is helpful for verification.

---

## Project Tiddlers

### Four methods for relating tiddlers
The book discusses four options for relating a meeting to a project:
1. Link from project → meeting
2. Link from meeting → project
3. Field on meeting pointing to project
4. Tag meeting with project title

Option 4 (tagging) is recommended for this wiki. The rationale is well explained. One nuance worth noting: the book explicitly cautions that option 4 can "clutter up your tag space" in large wikis. This is good advice to surface.

### Ex:CarItems
Completed using all four methods, with separate tiddlers for each item:
- JumperCables: linked from MyCar (method 1)
- FirstAidKit: links to MyCar (method 2)
- IceScrapers: has `car: MyCar` field (method 3)
- EmergencyFlares: tagged with MyCar (method 4)

**Personal preference:** Methods 2 and 4 felt most natural. Method 2 (link from part to whole) requires no setup in the "whole" tiddler, while method 4 (tagging) provides TiddlyWiki-native hierarchical semantics. Method 3 (field) requires additional wikitext customization to be useful, which the book explicitly acknowledges won't be possible until chapter 4.

---

## Knowledge Tiddlers

### Creating from Missing tiddlers
The workflow of going to More → Missing to find and create unlinked tiddlers works as described.

### EmployeeInformationSystem → Employee Information System (Ex:CamelCaseKnowledgeTiddlers)
Performed the rename of `EmployeeInformationSystem` to `Employee Information System`.

In the TiddlyWiki UI, when renaming a tiddler, a dropdown shows all tiddlers that will have broken links. Here the links in JaneDoe and ReallyAnnoyingFiveFactorAuthenticationProcess had to be updated from CamelCase auto-links to `[[square bracket syntax]]`.

**Advantages of CamelCase:**
- No extra characters to type — just write the name naturally
- Very fast to use; good for quick notes
- Works well when tiddler names are always single-word compound nouns

**Disadvantages of CamelCase:**
- Tiddler names must be in CamelCase, which is awkward for multi-word proper nouns (e.g., "Employee Information System" looks better with spaces)
- Renaming requires manual link updates (unless using the Relink plugin)
- False positives: any CamelCase word in a tiddler body becomes a link, even if you didn't intend it to be one (e.g., a word like "JavaScript" or "TiddlyWiki" itself might link to nonexistent tiddlers)
- Works poorly for wikis where titles need spaces for readability or proper nouns

**For this sample wiki:** CamelCase links are convenient for the simple person/project names (JaneDoe, OnboardingProcess), but awkward for longer names like EmployeeInformationSystem. A hybrid approach seems natural — use CamelCase where it reads well, and square brackets otherwise.

**Note:** The Relink plugin (mentioned in the exercise note) would eliminate the manual link-update step, making renaming much less painful.

---

## Reviewing the Basics

### Ex:RaffapKnowledgeTiddler
Created `ReallyAnnoyingFiveFactorAuthenticationProcess` tiddler with imagined content about the five factors and their inconveniences.

### Ex:RaffapReflection
Reviewed the RAFFAP tiddler:
- Links to `EmployeeProfileSetupMeeting` (where Jane walked me through it) ✓
- Links back to `Employee Information System` ✓
- Tagged `Application` — this seems appropriate since RAFFAP is a security system/process
- No additional tiddlers needed

### Ex:JaneDoeFamily
Created tiddlers for:
- `ChrisSmith` — manager of JaneDoe, JohnDoe, EmilyDoe
- `JohnDoe` — with email, phone, manager=ChrisSmith, family=JaneDoe EmilyDoe
- `EmilyDoe` — with email, phone, manager=ChrisSmith, family=JaneDoe JohnDoe

All tagged `Contact`. Phone numbers and emails are fictitious but in correct format.

### Ex:ManagerField
We used a `manager` field on contact tiddlers to track employees' managers. Other approaches and their trade-offs:

1. **Link from the contact tiddler to the manager's tiddler** — Simple to implement, but provides less semantic clarity (a plain link just says "related to," not "managed by"). Would be confused with other relationships in backlinks.

2. **Tag the contact with the manager's name (e.g., tag JaneDoe with ChrisSmith)** — Easy, and provides TiddlyWiki hierarchy semantics. But this blurs the distinction between tags-as-categories and tags-as-relationships. If you have many managers, all manager names show up as tags, cluttering the tag namespace. Also less explicit about the direction of the relationship.

3. **Add a field on the manager's tiddler listing all reports** — This is the reverse: the manager knows its reports. Requires updating the manager tiddler every time a new report is added, which is error-prone. Not recommended.

**Conclusion:** The `manager` field approach is clear, explicit, and easily queryable. The main downside is that field values don't auto-link in the default view (addressed in chapter 4).

---

## Overall Chapter 1 Notes

- All instructions follow logically and are easy to reproduce.
- The chapter does a good job of establishing a consistent example scenario (new employee, specific people and systems) that makes the abstract data modeling feel concrete.
- The note about saving in TiddlyHost vs. local saving could be clarified: the book says "this does not save your wiki itself" when clicking the checkmark — it might help to explicitly say *where* to find the save button (the floppy disk / save button on the page toolbar, which turns red when there are unsaved changes).
- **Potential issue:** The book says the new-journal button is under the Tools tab, and you "tick the check box" to put it on the page toolbar. On TiddlyWiki 5.3.6, this is correct, but the checkbox behavior may be different in older versions.
- Several tiddler files in the book content have today's date (2026-03-06) as their modified timestamp, suggesting they were edited very recently. I did not notice any content issues in those sections, but this is worth flagging for a closer review.
