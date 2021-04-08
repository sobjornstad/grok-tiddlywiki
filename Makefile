.PHONY: all book shadowify clean

all: book

book: pubfolder/output/index.html

pubfolder/output/index.html: plugins/* scripts/* tiddlers/*
	scripts/export.sh

shadowify:
	scripts/shadowify.sh

clean:
	rm -rf pubfolder/
