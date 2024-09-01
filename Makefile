.PHONY: all book web preview publish clean reversion shadowify

# All target
all: book web


## Building the TW book ##
book: wiki/package-lock.json reversion shadowify wiki/pubfolder/output/index.html wiki/pubfolder/output/static/

wiki/package-lock.json: wiki/tiddlywiki-git
	cd wiki && npm install

reversion:
	cd wiki && scripts/reversion.sh

shadowify:
	cd wiki && scripts/shadowify.sh 2>/dev/null

spaceify:
	cd wiki && \
		find plugins tiddlers -type f -name '*.tid' -print0 | \
		while IFS= read -r -d '' i; do \
			sed -e ':a' \
				-e 's/^\(\t*\)\t/\1  /;ta' \
				-e 's/^[[:space:]]*$$//' \
				-i '' "$$i"; \
		done

wiki/pubfolder/output/index.html: wiki/plugins/* wiki/scripts/* wiki/tiddlers/* wiki/tiddlywiki.info
	cd wiki && scripts/export.sh

# An inaccurate way to specify this rule, but trying to match tiddlers with
# their doubly URL-encoded names in GNU Make sounds like a nightmare I don't
# need. This appears to work fine since index.html should always update when
# any wiki content is updated, but possible ordering problems?
wiki/pubfolder/output/static/: wiki/pubfolder/output/index.html
	cd wiki/pubfolder && "$$(npm bin)/tiddlywiki" --build static


## Building the website (including the latest version of the book) ##
web: _build/donate _build/thankyou _build/read/index.html _build/static _build/static/index.html

_build/donate: web/donate
	cp -r web/donate _build

_build/thankyou: web/thankyou
	cp -r web/thankyou/ _build

_build/read/index.html: wiki/pubfolder/output/index.html
	mkdir -p _build/read/
	cp wiki/pubfolder/output/index.html _build/read/index.html

_build/static: wiki/pubfolder/output/static
	mkdir -p _build/static/
	cp wiki/pubfolder/output/static/* _build/static/

_build/static/index.html: _build/static/Welcome%20to%20Grok%20TiddlyWiki.html
	cp $< $@


## Utility functions
edit:
	cd wiki && npx tiddlywiki --listen port=2000

preview:
	cd _build && twistd web -n --path=. --port="tcp:port=8001"
	xdg-open http://localhost:8001/read/index.html

publish:
	-kill $(cat _build/twistd.pid)
	rm -f _build/twistd.*
	# Root /index.html sits in the container with a redirect on it and is NOT updated.
	# If I add more subfolders they have to be listed below:
	aws s3 sync --delete _build/donate/ s3://groktiddlywiki-webserve/donate
	aws s3 sync --delete _build/read/ s3://groktiddlywiki-webserve/read
	aws s3 sync --delete _build/static/ s3://groktiddlywiki-webserve/static
	aws s3 sync --delete _build/thankyou/ s3://groktiddlywiki-webserve/thankyou
	aws cloudfront create-invalidation --distribution-id E165ACBA2QEFAJ --paths '/*'

clean:
	rm -rf wiki/pubfolder/
	rm -rf _build/
