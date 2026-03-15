# Prompt Library

This contains things I’ve had Claude do on the porject that have proven helpful.

## Feedback Prompt

It's time to put together a new edition of this book, Grok TiddlyWiki. There will be two broad tasks, adding anything that's been updated in TiddlyWiki since the last release, and addressing user feedback (plus a small amount that was emailed to myself by me).

All the feedback mail can be found in this maildir: ~/.mail/sorenbjornstad.com/GTW

Please look through the maildir and put together a list of feedback items to address, placing it in a file called FEEDBACK.md in the project root. Each item should contain:

- A H2 Markdown heading with a few-word description of the issue
- The tiddler(s) where the issue is present or will need to be fixed (check in wiki/plugins/content to find the existing book content if you need to reference it; feedback emails are also generally attached to a particular tiddler, though sometimes, e.g., feedback on an exercise will be given on the section containing it, so the real edit might involve changing an exercise tiddler).
- A slightly longer description of what likely needs to be changed.
- The exchange between the user and, if applicable, me, quoted verbatim (but obviously put it in the markdown file as clean text, not raw mail format/HTML).
- The path of the email file(s) for reference if needed.

Generally there will be approximately one feedback item per email, but an email could include multiple issues needing to be addressed, and if an email is a reply, parts of it may need to be merged into one or more other issues.

Please start by exploring the resources you'll need and see if you have any questions.

---

In the FEEDBACK.md, there are a bunch of raw Maildir filenames of emails. I recently set up the ~/cabinnet/Me/Software/Active/powerscript/actions/open-email and /copy-email-mid scripts, plus ~/.local/share/applications/neomutt-mid.desktop asa new system to use notmuch virtual folders to directly open emails in mutt. Please locate the emails referenced and replace them with mid: links


## Proofing Prompt

Please proofread the textbook in this project, _Grok TiddlyWiki_.

Issues you should look for include but are not limited to:

- typos
- factual errors
- incorrectly ordered dependencies (e.g., section 1.2 assumes without comment that you know something in section 2.4; these errors are particularly likely to exist because the book has been restructured several times since the first edition)
- inconsistencies (e.g., X is claimed in one place and !X in another)
- references to chapters or sections that have the wrong names, refer to content that isn’t there, or are otherwise wrong or confusing

All of the wiki markup is available directly in the filesystem, but if you need to look at a rendered page to check something, the server is running at localhost:2000. Note that most of the content of Grok TiddlyWiki is shadow tiddlers in a plugin, to make it easy for users to upgrade existing versions of the book without losing any of their progress (which is recorded within the wiki).

You can fact-check anything that seems like it might be incorrect using the docs at https://tiddlywiki.com/ and/or the code at https://github.com/TiddlyWiki/TiddlyWiki5.

Please begin by looking over the project, reading about how the book works and what TiddlyWiki is within the textbook, understanding the task, working out what time and effort should be focused on, and making notes on how the project is structured and what’s needed to complete the task that will enable picking up the task again when the context window fills up. If the plan can be easily split up in such a way that it can be split into chunks and/or parallelized, that would be helpful for flexibility, but don’t distort the plan to fit it into this form.

---

For the confirmed feedback -- a bunch of these actually are done, and it looks like I forgot to save the file after marking their headings with '[done]' in my editor. I saved it now - please check which ones still aren't done. Also, don't include them in the tasks of these project; going in and fixing those issues is a separate thread that I'm working on in parallel. However, it'd be good to still mention them in the plan so we can avoid flagging them as errors that need to be corrected, since they are already on my task list.

For the cross-references, let's specify in the plan that when we get to that point we'll actually create a small utility to do this and add it to the project, so we can quickly re-check in the future.

For "Getting Help", we can remove that item from TODO.txt, as I updated it in the last edition. However, let's add a todo/fix to update the snippet of "Getting Help" about LLMs with more details about what currently works well and what doesn't; that part is definitely out of date.

Please note in the plan that the expected output for each phase is a `proofs/chapter-{number}.md` file listing any issues; the format of that filename can be adapted to work with things like front matter and takeaways as needed.

Also, a thing to check in the takeaways phases which I just realized - we should make sure that each takeaway is actually transcluded in an appropriate section. Since things have moved around I have encountered situations where I forgot to update a takeaway's `origin` field and it was included in a section where it didn't make sense, or not included in a section at all.


## Exercise Test Prompt

This one was not particularly successful; I'm not sure it really understood what I wanted it to do. Don't use this one without further tweaking and explanation.

Let's continue with the project of working your way through the exercises in Grok TiddlyWiki to verify if they are correct. As there have been many revisions, including reordering exercises, changing them, changing the way TiddlyWiki works, I'm no longer sure that all of them are consistent. For instance, in the past, there have been issues where earlier exercises were accidentally assuming the wiki you built out as a reader/learner was in a state it only reached after doing a later exercise. Or questions or answers might be subtly wrong.

So far we've done Chapter 1. Pick up with the existing wiki you created in a previous thread in the claude-test directory on this branch. Continue with Chapter 2, going through the sections and exercises in order. Read through the text because occasionally there are mentions in the text of things you should update in your wiki; but most of the things that need to be tested are in exercises boxes (which are separate tiddlers). Do each of these, and when they have a specific answer provided, in addition to actually doing the exercise, verify that the answer exactly as shown in the book is also correct, which might require making edits to however you solved it first.

Put your results in a 'results' subdirectory in 'claude-test' (already present), one Markdown file for each chapter, making notes on anything that is confusing or incorrect as you go. Unlike the previous chapter, please split the Markdown into two top-level sections: one where you record any interesting observations or things that might be helpful when you come back and do future chapters (similar to what the chapter 1 file looks like), and one where you specifically flag anything that might be an actual error or major confusion, so I can prioritize looking at those.

Let me know if you run into any questions.
