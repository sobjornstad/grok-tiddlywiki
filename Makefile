.PHONY: all book web reversion shadowify preview publish clean

# All target
all: book web


## Building the TW book ##
book: wiki/pubfolder/output/index.html

wiki/pubfolder/output/index.html: reversion shadowify wiki/plugins/* wiki/scripts/* wiki/tiddlers/*
	cd wiki && scripts/export.sh

reversion:
	cd wiki && scripts/reversion.sh

shadowify:
	cd wiki && scripts/shadowify.sh


## Building the website (including the latest version of the book) ##
web: _build/donate _build/thankyou _build/index.html

_build/donate: web/donate
	cp -r web/donate _build/donate

_build/thankyou: web/thankyou
	cp -r web/thankyou _build/thankyou

_build/index.html: wiki/pubfolder/output/index.html
	cp wiki/pubfolder/output/index.html _build/index.html


#TW_BASE = /home/soren/cabinet/Me/Records/zettelkasten/tw-wiki/
#TW_OUTPUT = $(TW_BASE)/pubfolder/output/*

edit:
	cd wiki && tiddlywiki --listen port=8000

preview:
	cd _build && twistd web -n --path=. --port="tcp:port=8001"

publish:
	mkdir -p _build
	#cd $(TW_BASE) && scripts/shadowify.sh && scripts/export.sh
	#cp -r "$(TW_OUTPUT)" _build
	cp index.html _build  # TODO: Remove this once we're ready to actually publish the wiki
	aws s3 cp _build/ s3://groktiddlywiki-webserve --recursive
	aws cloudfront create-invalidation --distribution-id E165ACBA2QEFAJ --paths '/*'

clean:
	rm -rf wiki/pubfolder/
	rm -rf _build/
