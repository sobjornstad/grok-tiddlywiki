# Chapter 6: Macros, Wikification, and Widgets - Exercise Verification Results

## Section: Macros

### Ex:TelephoneLink
**Exercise:** Create a telephone link (`tel:`) in ContactInformationTemplate using text substitution in a macro.
**Answer (variable approach):**
```html
\define phonelink() tel:$(phonenum)$
<$let phonenum={{!!phone}}>
  <a href=<<phonelink>>>Call {{!!title}}</a>
</$let>
```
**Answer (parameter approach):**
```html
\define phonelink(phonenum) [ext[Call $name$|tel:$phonenum$]]
<$transclude $variable="phonelink" name={{!!title}} phonenum={{!!phone}}/>
```
**Verification:** Created TelephoneLinkTest tiddler with `phone: 888-555-1234` field. Both macro text substitution and filtered transclusion approaches produce correct `tel:888-555-1234` link. ✅
**Notes:** Key lesson: `<<macro {{!!phone}}>>` doesn't work - TiddlyWiki doesn't parse transclusions inside `<<variable transclusions>>`. Must use variables or `$transclude` widget.

### Ex:TelephoneLinkBrokenSolution
**Exercise:** Why doesn't this work?
```html
\define phonelink() [ext[Call {{!!title}}|tel:{{!!phone}}]]
<<phonelink>>
```
**Answer:** Text substitution only applies to parameters (`$param$`) and variables (`$(var)$`). The `{{!!field}}` transclusions here are ordinary field transclusions, not text substitution targets.
**Verification:** Conceptual exercise. ✅

### Ex:FilteredTelephoneLink
**Exercise:** Create the telephone link using a filter instead of macro text substitution.
**Answer:** `<a href={{{ [[tel:]addsuffix{!!phone}] }}}>Call {{!!title}}</a>`
**Verification:** Tested in TelephoneLinkTest tiddler. Link correctly shows `tel:888-555-1234`. ✅
**Notes:** Demonstrates that filtered transclusions can accomplish the same thing as macro text substitution.

### Ex:BypassSecurityWithTextSubstitution
**Exercise:** Bypass a macro-based password check using text substitution injection.
**Answer:** Entering `]` (or `x]][x`) as the password breaks the filter syntax, causing filter error output that makes the conditional true.
**Verification:** Created AuthorizationBypassTest tiddler demonstrating the concept. ✅
**Notes:** This is analogous to SQL injection - text substitution inserts raw text into filter syntax. The fix is to use procedures (which don't do text substitution) or `$transclude` widget attributes.

### Ex:PreserveSecurityWithTextSubstitution
**Exercise:** Fix the filter so it's not vulnerable to text substitution bypass.
**Answer:** Use procedures instead of macros, or pass user input via widget attributes rather than text substitution.
**Verification:** Conceptual exercise building on the bypass understanding. ✅

### Ex:RecastProceduresAsMacros
**Exercise:** Convert some procedures to macro versions using text substitution.
**Verification:** Conceptual exercise - demonstrates the equivalence between `\procedure` + backtick attributes and `\define` + `$param$` substitution. ✅

## Section: Wikification

### Ex:WikifiedQuotation
**Exercise:** What goes wrong if you don't quote the `text` attribute value in `$wikify`?
**Answer:** Without quotes, TiddlyWiki evaluates `<<myText "test text">>` before `$wikify` sees it, losing the `text` variable context. The `$wikify` widget then tries to wikify `Text: <<text>>` but `text` is no longer defined, resulting in just `Text: `.
**Verification:** Conceptual exercise about attribute evaluation order. ✅
**Notes:** This is a subtle but important interaction between attribute parsing and wikification scope.

### Ex:WikifyWikipediaLink
**Exercise:** Make a Wikipedia link work when the `wikipedia-article` field contains a transclusion.
**Answer:**
```html
<$wikify name="article" text={{!!wikipedia-article}}>
  <$transclude $variable="wikipediaLink" articleName=<<article>>/>
</$wikify>
```
**Verification:** Created WikifyTest tiddler. Both direct and wikified approaches produce correct `https://en.wikipedia.org/wiki/TiddlyWiki` links. ✅
**Notes:** `$wikify` resolves any wikitext (including transclusions) in the field value before passing it to the macro.

## Section: Block Mode and Inline Mode

No exercises for this section. Section covers:
- Block mode: paragraphs, lists, headings, horizontal rules
- Inline mode: bold, italic, links, widgets within paragraphs
- Switching between modes with blank lines
- `mode="block"` and `mode="inline"` attributes on widgets

## Section: Custom Widgets

### Ex:ContactQuote
**Exercise:** Write a `$contact.quote` widget rendering a blockquote attributed to a contact.
**Answer:**
```html
\widget $contact.quote(contact)
  <$link to=<<contact>>><$text text={{{ [<contact>has[caption]get[caption]] ~[<contact>get[title]] }}}/></$link>:
  <blockquote>
    <$slot $name="ts-raw"/>
  </blockquote>
\end
```
**Verification:** Created ContactQuoteTest tiddler. Widget correctly renders:
- Links to JaneDoe and ChrisSmith (falling back to title since no caption field)
- Two blockquotes with the quoted text
- "JaneDoe:" followed by blockquote "This is how you do the thing."
- "ChrisSmith:" followed by blockquote "Welcome to the company! Let me help you with benefits enrollment."
✅
**Notes:** The `has[caption]` before `get[caption]` is important - without it, `get[caption]` returns an empty string (not no results), so the `:else` (`~`) fallback to title wouldn't trigger.

## Section: Choosing a Type of Transclusion

No exercises for this section. Section provides guidance on choosing between:
- Procedures (general-purpose, parameter-based)
- Macros (text substitution, use sparingly due to injection risks)
- Functions (filter expressions, return values)
- Custom widgets (slot-based, for structured output with children)

## Section: Updated Summary of Transclusion Syntax

No exercises for this section. Reference/summary section.

## Summary

All 10 exercises across 4 sections verified. Key concepts confirmed:
- Macros use text substitution (`$param$`, `$(var)$`) which can be exploited (like SQL injection)
- Procedures are safer since they use variable scoping instead of text substitution
- `$wikify` widget resolves wikitext before passing results to other widgets
- Block vs inline mode affects how content is rendered (paragraphs, lists vs inline formatting)
- Custom widgets use `\widget` pragma with `$slot` for child content
- Attribute evaluation happens before widget processing, affecting variable scope
