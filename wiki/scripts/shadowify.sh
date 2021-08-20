#!/usr/bin/env bash

### Sanity check ###
if [ ! -f "tiddlywiki.info" ]; then
    echo "Please run this script from the root directory."
    exit 1
fi


### Setup ###
shopt -s nullglob
shopt -s extglob
pushd tiddlers >/dev/null


### TakeAway plugin ###
for i in '$__plugins_sobjornstad_TakeAway_'*; do
    mv "$i" "../plugins/takeaway/src/${i##*_}"
done

for i in '$__config_sobjornstad_TakeAway_'*; do
    mv "$i" "../plugins/takeaway/config/${i##*_}"
done

for i in Take[aA]way*; do
    mv "$i" ../plugins/takeaway/ui/
done


### Content ###
for i in Ta_*; do
    sed -Ee '1,/^$/ { /^[[:space:]]*"?(due|ease|ivl|seen|lapses)"?:/d }' "$i" >"../plugins/content/takeaways/$i"
done

for i in Sn_*; do
    mv "$i" ../plugins/content/snippets/
done

for i in Ex_*; do
    mv "$i" ../plugins/content/exercises/
done

for i in Wr_*; do
    mv "$i" ../plugins/content/wikitext-reference/
done

for i in Ltc_*; do
    mv "$i" ../plugins/content/lies/
done

find . -mindepth 1 -not -name 'Ta_*' -not -name 'Meta_*' -not -name '$__*' -exec mv -t ../plugins/content/book '{}' +
mv -f '$__config_SecretPasswordExample.tid' ../plugins/content/book/
mv -f '$__favicon.ico.png'* ../plugins/content/book/
mv -f '$__config_sobjornstad_GrokTiddlyWiki_'*.tid ../plugins/content/book/
mv -f '$__GrokTiddlyWikiUpgrader'*.tid ../plugins/content/meta/

for i in '$__sib_'*; do
    mv "$i" ../plugins/content/sib/
done

for i in '$__plugins_sobjornstad_GrokTiddlyWiki_Changes'*; do
    mv "$i" ../plugins/content/meta/changes/
done


### Cleanup ###
popd >/dev/null
