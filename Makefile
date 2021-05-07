TW_BASE = /home/soren/cabinet/Me/Records/zettelkasten/tw-wiki/
TW_OUTPUT = $(TW_BASE)/pubfolder/output/*

publish:
	mkdir -p _build
	#cd $(TW_BASE) && scripts/shadowify.sh && scripts/export.sh
	#cp -r "$(TW_OUTPUT)" _build
	cp index.html _build  # TODO: Remove this once we're ready to actually publish the wiki
	aws s3 cp _build/ s3://groktiddlywiki-webserve --recursive
	aws cloudfront create-invalidation --distribution-id E165ACBA2QEFAJ --paths '/*'
