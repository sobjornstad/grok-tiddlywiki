# Chapter 4: Transclusion — Results

## Observations and Notes for Future Chapters

### Section 4.1: Variables

- Variables use `$set` (verbose) or `$let` (concise) widgets; they go out of scope after the closing tag.
- Variables with spaces in their names cannot be transcluded — words after the first space are treated as parameters.

**Ex:UpdatingDisclaimer** — Open-ended update exercise; demonstrates the single-place-edit benefit.

**Ex:EisVariable** — Verified: Updated `Employee Information System` tiddler to use two nested `$set` widgets for `disclaimer` and `eis` variables.

**Ex:EisLet** — Verified: Converted to a single `$let` widget with both variables set. Renders identically. Current tiddler uses this form.

**Ex:SpacedVariable** — Answer confirmed: variable names with spaces are impossible to transclude; words after first space are treated as parameters.

**Ex:VariableAfterSet** — Answer confirmed: nothing shows up after `</$set>` or `</$let>`; the variable goes out of scope.

**Ex:NestedSets** — Verified in TiddlyWiki: the snippet outputs `1  2  1`. Variable scoping nests — innermost `$set` for the same name takes precedence.

### Section 4.2: Using Variables as Attributes

- Variables can be used as attribute values: `attribute=<<varname>>` (just the variable) or `` attribute=`text $(varname)$ more text` `` (substituted attribute value with backticks).
- Transclusions cannot be nested inside wikitext link syntax `[[...]]`; use an `<a>` element instead.
- Variable transclusions in wikitext create separate rendering "chunks" — `<<wikipedia>>Aardvark` creates a link for the variable value, then starts a new chunk with "Aardvark" text.

**Ex:ContactLinks** — Verified: Created `ContactLinks` tiddler with a bulleted list of all 4 contacts, each with a mycontacts.com link using substituted attribute value syntax: `` href=`https://mycontacts.com/$(currentTiddler)$` ``.

**Ex:ProcedureAdjacency** — Answer confirmed: `<<wikipedia>>Aardvark` makes the variable value a separate link chunk, so the link and "Aardvark" text are disconnected. This is due to TiddlyWiki processing wikitext in discrete chunks, not concatenating all transclusions first.

### Section 4.3: Procedures

- Procedures are defined with `\procedure name(params)` pragma at the top of a tiddler, followed by body, and `\end`.
- Parameters are separated by spaces in calls but commas in definitions.
- Pragmas must come before any other content.

**Ex:PrettyWikipediaLink** — Verified: Updated `wikipediaLink` procedure to show `Wikipedia: {Aardvark}`. Important note: `</a>` must be on the same line as the last text to avoid trailing space in the link text.

**Ex:EmptyProcedureCall** — Answer confirmed: calling a nonexistent procedure produces no output (same as undefined variable).

**Ex:ProcedurePosition** — Answer confirmed: any content before `\procedure` pragma causes the pragma to be treated as literal text, producing ugly output. Pragmas must be truly first.

### Section 4.4: The Finer Points of Procedures

- Procedures can have zero, one, or multiple parameters; optional parameters with defaults; named parameters; triple-quoted parameters.
- Single-line procedures: `\procedure name(params) body` (no `\end` needed).
- `$transclude` widget with `$variable` param allows transcluding variables into parameters.
- Not closing a `$transclude` widget causes everything after it to become the widget's body (hidden unless transclusion fails).

**Ex:TicketTrackingLink** — Verified: Created `TicketNumberLink` template with `ticketLink` procedure and applied to `OnboardingProcess`. Renders "Ticket #245188" as a link.

**Ex:ReversedOptionalParameters** — Answer confirmed: reversing optional/non-optional parameter order causes `articleName` to implicitly get an empty value when only `linkText` is provided positionally.

**Ex:QuotedProcedureCall** — Answer confirmed: quoting variable references in attributes makes them literal text (shows `<<article>>` in URL). However, in wikitext body (not attributes), TiddlyWiki re-processes the result recursively so `<<linkText>>` still works even when quoted.

**Ex:UnclosedProcedureCall** — Answer confirmed: missing `/>` on `$transclude` causes the remainder of the tiddler to become the widget body — which is only rendered if the transclusion fails.

### Section 4.5: Field Transclusions

- `{{TiddlerName!!field}}` — transclude a specific field from a specific tiddler
- `{{!!field}}` — transclude a field from the current tiddler
- `{{TiddlerName}}` — transclude the `text` field (changes current tiddler)
- Transcluded content does NOT appear in search and does NOT create hard backlinks — these are "soft links."

**Ex:JaneDataTransclusion** — Verified: Added field transclusions to `JaneDoe` tiddler (now via `ContactInformationTemplate`). Email, phone, family, manager all display correctly.

**Ex:FudgeTransclusion** — Conceptual exercise: advantage of transclusion = seamless display; disadvantage = less obvious origin and harder to edit.

**Ex:SearchingInTransclusions** — Answer confirmed: transcluded content doesn't appear in search. Only the transclusion syntax itself (e.g., `{{JaneDoe}}`) is in the text field and thus searchable.

**Ex:LinkingInTransclusions** — Verified: ChrisSmith backlinks only show BenefitsEnrollmentMeeting and SecurityTrainingSession — NOT JaneDoe, even though Jane's tiddler displays Chris's name via transclusion. Confirms the "soft link" concept.

**Ex:MultipleTransclusion** — Answer confirmed: transclusions within transclusions work recursively.

**Ex:SelfTransclusion** — Answer confirmed: produces "Recursive transclusion error in transclude widget" banner.

**Ex:CircularTransclusion** — Answer confirmed: same recursive error as self-transclusion.

**Ex:JaneManagerPhone** — Verified: `<$transclude $tiddler={{!!manager}} $field="phone"/>` correctly displays 888-555-0100 (Chris's phone) dynamically from the `manager` field.

**Ex:VariableTransclusion** — Answer confirmed: variables set in a `$let` widget bleed across transclusion boundaries — a tiddler transcluded within the `$let` scope can access the variable.

### Section 4.6: Templates and the Current Tiddler

- `{{tiddler||template}}` — transclude template, with current tiddler = tiddler
- `{{||template}}` — transclude template, keep current tiddler unchanged
- `{{tiddler}}` — transclude tiddler, current tiddler CHANGES to that tiddler
- `$transclude` widget does NOT change the current tiddler
- `$list` widget changes the current tiddler to each filter result (unless `variable=` attribute is used)

**Ex:CurrentTiddlerAndListWidget** — Answer confirmed: `$list` widget changes current tiddler to each filter result in turn.

**Ex:MeetingListWithoutCurrentTiddler** — Verified: `{{!!title}}` is equivalent to `<<currentTiddler>>` inside a `$list` widget; `<$link />` (no attributes) links to current tiddler.

**Ex:ContainingCurrentTiddler** — Answer confirmed: use `$let previousCurrentTiddler=<<currentTiddler>>` before `$list`, or use `variable="meeting"` attribute on `$list` to preserve the outer current tiddler.

**Ex:MethodsOfTransclusion** — Seven methods confirmed: `$let currentTiddler=`, `$set`, `$list filter="[[JaneDoe]]"`, `{{JaneDoe!!text}}`, `{{JaneDoe||JaneDoe}}`, `$tiddler` widget, intermediate tiddler.

**Ex:TranscludedProcedureScope** — Answer confirmed: procedures defined in a transcluded tiddler are NOT accessible after the transclusion. Procedure scope ends at the end of the tiddler, not the transclusion boundary.

**Ex:AddContactTemplates** — Completed: `ContactInformationTemplate` applied to JaneDoe, ChrisSmith, JohnDoe, EmilyDoe. All render correctly.

**Ex:CreateMeetingTemplate** — Completed: `MeetingInformationTemplate` with `| !Time|{{!!at}}|` and `| !Participants|{{!!participants}}|` applied to all meeting tiddlers. The `at` field displays as raw TiddlyWiki timestamp format (as expected from the book's answer and the `Sn:MeetingParticipants` snippet).

**Ex:TicketTrackingTemplate** — Completed: `TicketNumberLink` template created with the `ticketLink` procedure; transcludes `{{!!ticketnum}}` as the ticket ID. Applied to `OnboardingProcess` — renders "Ticket #245188".

### Section 4.7: Filters and Transclusions

- `{{{ filter }}}` — transclude result of filter (each result is a potential link)
- `<$text text={{{ filter }}}/>` — suppress link behavior for filter output
- Only first output is kept when used as an attribute value
- In filter expressions: `{braces}` = field transclusion, `<angle brackets>` = variable, `[brackets]` = literal hard parameter

**Ex:TiddlersContainingWikiTitle** — Verified: `[search{$:/SiteTitle}]` returns tiddlers containing "My Sample Wiki" — only system tiddlers currently. The `list-links` procedure is a handy shortcut for bulleted lists of links.

**Ex:AllFamilyInformation** — Completed: `ContactInformationTemplate` shows family as nested list using `<$list filter={{!!family}}>` with `{{!!title}}: {{!!phone}}` per member. Jane shows JohnDoe: 888-555-1235 and EmilyDoe: 888-555-1236.

**Ex:WikipediaLinkWithoutProcedure** — Answer confirmed: `<a href={{{ [<wikipedia>addsuffix[Aardvark]] }}}>Aardvark</a>` uses filtered transclusion and `addsuffix` to combine variable and constant in an attribute.

**Ex:WikipediaLinkTemplate** — Completed (in `WikipediaLink` tiddler using parameterized approach from section 4.8, and `WikipediaMetadata` tiddler with `url` field).

**Ex:DefaultToField** — Answer confirmed: `[<articleName>!is[blank]else{!!articlename}]` — the `!is[blank]` is crucial; without it, an empty variable value passes through `else` without triggering the fallback.

**Ex:WikiStatistics** — Verified: Created `WikiStatistics` tiddler. Results:
- 4 contacts
- 3 unique tiddlers linked from meetings
- 11.4% of non-system tiddlers are contacts

### Section 4.8: Parameterizing Field Transclusions

- `\parameters(param1, param2)` pragma at the start of a field defines parameters
- `{{TiddlerName|param1|param2}}` — call parameterized transclusion positionally
- `$transclude $tiddler="..." param1="value"` — call with named parameters
- Slots: `$slot` in tiddler + `$fill` in `$transclude` body for passing rich content

**Ex:TranscludeWikipediaLink** — Created `WikipediaLink` tiddler with `\parameters(articleName, text)` and `<a href=...><<text>></a>`. Called with `{{WikipediaLink|List of lists of lists|A very silly article}}`.

**Ex:ParameterizedCit** — Answer shows a parameterized version of ContactInformationTemplate is technically feasible but a template is clearly cleaner for this use case.

**Ex:ConflictingStatements** — Answer shows use of `$slot`/`$fill` widgets with `$depth="2"` to retrieve slot values through intermediate procedure transclusions.

### Section 4.9: Conditional Expressions

- `<% if [filter] %>...<% endif %>` — renders if filter returns any result
- `<% if [filter] %>...<% else %>...<% endif %>` — with else clause
- `<% elseif [filter] %>` — additional conditions
- Do NOT put filter in quotation marks — doing so makes the condition always true

**Ex:LocalCalls** — Completed: `call-type` procedure in `ContactInformationTemplate` uses `split[]first[3]join[]` to extract area code, then `elseif` to classify as local (212), toll-free (800/888/877), or long-distance. Verified: JaneDoe's 888-555-1234 correctly shows "toll-free".

**Ex:ConditionalProcedure** — Verified approach: `contact-info-item(field)` procedure with `<% if [all[current]has<field>] %>` and `<$transclude $field=<<field>>/>`. Applied in `ContactInformationTemplate`.

**Ex:ConditionalProcedureContinued** — Answer shows using `$list filter="email phone family manager" variable="field"` with `$transclude $variable="contact-info-item"` to loop over field names with a single procedure call.

### Section 4.10: Summary of Transclusion Syntax

Reference section — no exercises.

## Potential Issues Found

1. **`at` field raw display in MeetingInformationTemplate**: The template uses `{{!!at}}` which displays the raw TiddlyWiki date format (e.g., `20260306090000000`). The `Sn:MeetingParticipants` snippet in the book confirms this is intentional — the book shows raw timestamp values in the example output. If a reader expects formatted dates, they'd need to use `<$view field="at" format="date"/>` instead, which the book doesn't mention here.

2. **WikipediaLink procedure trailing space**: The `PrettyWikipediaLink` answer notes that a newline before `</a>` adds an unwanted trailing space. The solution (`</a>` on same line) is mentioned, with `\whitespace trim` pragma noted as an alternative for tiddlers containing only procedure definitions.

3. **Soft links not bidirectional**: The section clearly documents that transcluded content creates only "soft" links. The book's filter examples in earlier chapters (`backlinks[]`) would miss soft links. This is important for users building navigation systems.

## Tiddlers Created / Modified

- **Employee Information System** — Updated with `$let` widget for `disclaimer` and `eis` variables
- **JaneDoe** — Updated with `ContactInformationTemplate` and dynamic manager phone transclusion
- **ChrisSmith, JohnDoe, EmilyDoe** — Updated with `ContactInformationTemplate`
- **ContactInformationTemplate** — New: conditional field display with nested family list and call-type classifier
- **MeetingInformationTemplate** — New: table with `at` and `participants` fields
- **EmployeeProfileSetupMeeting, BenefitsEnrollmentMeeting, ComplianceTrainingMeeting, SecurityTrainingSession** — Updated with `MeetingInformationTemplate`
- **WikipediaLinks** — New: demonstrates `wikipediaLink` procedure with parameters
- **WikipediaLink** — New: parameterized tiddler transclusion equivalent
- **WikipediaMetadata** — New: stores Wikipedia base URL in `url` field
- **ContactLinks** — New: dynamic list with mycontacts.com links using substituted attribute values
- **WikiStatistics** — New: filter-based statistics with filtered transclusions and math operators
- **TicketNumberLink** — New: ticket link template using `ticketLink` procedure + `{{!!ticketnum}}`
- **OnboardingProcess** — Updated with `TicketNumberLink` template transclusion
- **CurrentAreaCode** — New: stores "212" for call-type classification
- **TollFreeAreaCodes** — New: stores "800 888 877" for toll-free classification
- **NestedSetsTest** — New: demonstrates nested `$set` scoping (outputs "1 2 1")
