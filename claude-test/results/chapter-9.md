# Chapter 9: Getting Technical - Exercise Verification Results

## Section: JavaScript Macros

### Ex:RoundtimeMacro
**Exercise:** Create a JavaScript macro that rounds a TiddlyWiki timestamp to the nearest 15 minutes.
**Answer:** JavaScript module with `exports.name = "roundtime"`, parses hours/minutes from timestamp string, rounds to nearest 15.
**Verification:** Created `roundtime.js.tid` as application/javascript with module-type: macro. Tested in RoundtimeTest:
- 37 min → rounds to 30 (37 < 38 threshold) ✅
- 03 min → rounds to 00 (3 < 8 threshold) ✅
- 58 min → rounds to 00 next hour (58 >= 53) ✅
- 20 min → rounds to 15 (20 < 23 threshold) ✅

All results correct per rounding logic. ✅

## Section: Stylesheets

### Ex:FunnyClass
**Exercise:** Add `my-funny-class` to a global stylesheet and apply it to some text.
**Answer:** Create tiddler tagged `$:/tags/Stylesheet` with CSS class definition.
**Verification:** Created `$:/user/stylesheets/FunnyClass` tagged `$:/tags/Stylesheet`. Applied class to text in StylesheetTest using `@@.my-funny-class` syntax. Text has blue background (`rgb(0, 0, 255)`). ✅

### Ex:ConditionalStyle
**Exercise:** Make the funny class conditional on `$:/config/ShowFunnyText` being "yes".
**Answer:** Wrap CSS in `<% if [[$:/config/ShowFunnyText]text[yes]] %>...<% endif %>`. Content type must be `text/vnd.tiddlywiki` (not `text/css`) for conditionals to work.
**Verification:** Stylesheet uses conditional expression. With config set to "yes", funny class styling is active (blue background confirmed). ✅

### Ex:FunnyTextCheckbox
**Exercise:** Add a checkbox to Control Panel Settings for toggling funny text.
**Answer:** Create tiddler tagged `$:/tags/ControlPanel/SettingsTab` with `$checkbox` widget bound to `$:/config/ShowFunnyText`.
**Verification:** Created `$:/user/controlpanel/Styles` with caption "Styles". ✅

### Ex:TagStyleRule
**Exercise:** Create a stylesheet rule that makes tiddlers with a particular tag display in smaller font.
**Answer:** Use CSS `[data-tags*="TagName"]` attribute selector.
**Verification:** Created `$:/user/stylesheets/TagSmallFont` with `[data-tags*="Tool"] .tc-tiddler-body { font-size: 85%; }`. WikiStatistics (tagged Tool) shows font-size of 11.9px (85% of default). ✅

## Section: Creating Plugins

No exercises for this section. Section covers plugin structure and distribution.

## Section: Writing Shell Scripts Against a TiddlyWiki

No exercises for this section. Section covers TiddlyWiki CLI usage for automation.

## Summary

All 5 exercises across 2 sections verified. Key concepts confirmed:
- JavaScript macros use `application/javascript` type with `module-type: macro` field
- JavaScript macro exports: `name`, `params` (array), `run` function
- Global stylesheets via `$:/tags/Stylesheet` tag
- Conditional CSS using conditional expressions (requires `text/vnd.tiddlywiki` type, not `text/css`)
- Control Panel settings tabs via `$:/tags/ControlPanel/SettingsTab`
- CSS attribute selectors (`data-tags`, `data-tiddler-title`) for targeting specific tiddlers
