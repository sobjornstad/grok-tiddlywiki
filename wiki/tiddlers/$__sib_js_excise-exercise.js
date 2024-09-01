/*\
title: $:/sib/js/excise-exercise.js
type: application/javascript
module-type: texteditoroperation

Text editor operation to excise the selection to a new private-chunk tiddler.

SIB 2021-05-21: Copied from the standard excise operation and modified as needed.
SIB 2024-09-01: Borrowed from M2, modifying again.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports["exciseExercise"] = function(event, operation) {
	var editTiddler = this.wiki.getTiddler(this.editTitle),
		editTiddlerTitle = this.editTitle;
	if(editTiddler && editTiddler.fields["draft.of"]) {
		editTiddlerTitle = editTiddler.fields["draft.of"];
	}
	var excisionTitle = this.wiki.generateNewTitle("Ex:" + editTiddlerTitle);
	this.wiki.addTiddler(new $tw.Tiddler(
		this.wiki.getCreationFields(),
		this.wiki.getModificationFields(),
		{
			title: excisionTitle,
			text: operation.selection,
			tags: "Exercise"
		}
	));
	operation.replacement = "{{" + excisionTitle + "||ExerciseTemplate}}";
	operation.cutStart = operation.selStart;
	operation.cutEnd = operation.selEnd;
	operation.newSelStart = operation.selStart;
	operation.newSelEnd = operation.selStart + operation.replacement.length;
};

})();