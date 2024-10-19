1. Update changes list.
2. Update version numbers in `Metadata` tiddler, then in `wiki/plugins/*/plugin.info`.
   Run `make shadowify` to migrate these changes to the plugin.
   Commit changes.
3. Run `make`.
3. Update changes list again with the resulting commit hash.
4. Run `make`.
5. Open `_build/read/index.html` and `_build/static/index.html`
   and make sure they look OK and have the correct book and TW version #'s
   (can use `make preview` to web-serve the `_build` folder).
6. Run `make publish`.
7. Double-check live version on the web.
