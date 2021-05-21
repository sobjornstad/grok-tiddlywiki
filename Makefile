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

publish:
	rm -f _build/twistd.log
	aws s3 cp _build/ s3://groktiddlywiki-webserve --recursive
	aws cloudfront create-invalidation --distribution-id E165ACBA2QEFAJ --paths '/*'

clean:
	rm -rf wiki/pubfolder/
	rm -rf _build/
