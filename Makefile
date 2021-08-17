.PHONY: all book web preview publish clean

# All target
all: book web


## Building the TW book ##
book: reversion shadowify wiki/pubfolder/output/index.html

reversion:
	cd wiki && scripts/reversion.sh

shadowify:
	cd wiki && scripts/shadowify.sh

wiki/pubfolder/output/index.html: wiki/plugins/* wiki/scripts/* wiki/tiddlers/*
	cd wiki && scripts/export.sh


## Building the website (including the latest version of the book) ##
web: _build/donate _build/thankyou _build/read/index.html

_build/donate: web/donate
	cp -r web/donate _build

_build/thankyou: web/thankyou
	cp -r web/thankyou/ _build

_build/read/index.html: wiki/pubfolder/output/index.html
	mkdir -p _build/read/
	cp wiki/pubfolder/output/index.html _build/read/index.html


#TW_BASE = /home/soren/cabinet/Me/Records/zettelkasten/tw-wiki/
#TW_OUTPUT = $(TW_BASE)/pubfolder/output/*

edit:
	cd wiki && tiddlywiki --listen port=8000

preview:
	cd _build && twistd web -n --path=. --port="tcp:port=8001"
	xdg-open http://localhost:8001/read/index.html

publish:
	-kill $(cat _build/twistd.pid)
	rm -f _build/twistd.*
	# Root /index.html sits in the container with a redirect on it and is NOT updated.
	# If I add more subfolders they have to be listed below:
	aws s3 sync --delete _build/read/ s3://groktiddlywiki-webserve/read
	aws s3 sync --delete _build/thankyou/ s3://groktiddlywiki-webserve/thankyou
	aws s3 sync --delete _build/donate/ s3://groktiddlywiki-webserve/donate
	aws cloudfront create-invalidation --distribution-id E165ACBA2QEFAJ --paths '/*'

clean:
	rm -rf wiki/pubfolder/
	rm -rf _build/
