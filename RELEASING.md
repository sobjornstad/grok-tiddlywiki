1. Write changelog and update changes list in [[Changes]]
   (clone a $:/plugins/sobjornstad/GrokTiddlyWiki/Changes/* tiddler to add an entry).
2. Update version numbers in `Metadata` tiddler, then in `wiki/plugins/*/plugin.info`.
   Run `make shadowify` to migrate these changes to the plugin.
   Commit changes.
3. Run `make`.
4. Open `_build/read/index.html` and `_build/static/index.html`
   and make sure they look OK and have the correct book and TW version #'s
   (you can use `make preview` to web-serve the `_build` folder).
   Make any required fixes.
5. Update the Changes tiddler again with the commit hash of your "bump version" commit.
   Run `make shadowify`.
6. Run `make`.
7. Do step 4 again, just verifying that commit hash & release date is correct.
8. Run `make publish`.
9. Double-check live version on the web.
10. Commit the commit-hash-updating version (this must not contain any content
    changes!) and push to bring the repo up to date.
11. Upload `_build/read/index.html` to the `grok-tiddlywiki-official` site on TiddlyHost
    (https://tiddlyhost.com/sites/31788/upload_form).
    Launch the site and verify it’s the new version.
12. Post announcement to https://talk.tiddlywiki.org, if there have been significant
    changes (can skip if it’s typo fixes or whatever).
13. Create a release on GitHub.
    Populate text from the changelog tiddler,
    and link to the announcement post if available.
