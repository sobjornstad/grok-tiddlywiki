#!/usr/bin/env bash

FILT='[all[tiddlers]] -[prefix[$:/plugins/tiddlywiki/codemirror]] -[[$:/plugins/tiddlywiki/tiddlyweb]] -[[$:/plugins/tiddlywiki/filesystem]] -[prefix[$:/state]] -[prefix[Tr:]] -[tag[Meta]] -[[Ta:20210214165634956]]'
public_edits_file="$PWD/scripts/public-edits.conf"

if [ ! -f "tiddlywiki.info" ]; then
    echo "Please run this script from the ZK root directory."
    exit 1
fi

# create new public wiki
rm -rf pubfolder
npx tiddlywiki . --savewikifolder pubfolder "$FILT"

# add build commands to public wiki's tiddlywiki.info
jq ".build = $(jq '.build' <tiddlywiki.info)" <pubfolder/tiddlywiki.info >pubfolder/tiddlywiki.info.new
rm pubfolder/tiddlywiki.info
mv pubfolder/tiddlywiki.info.new pubfolder/tiddlywiki.info

pushd pubfolder >/dev/null
pushd tiddlers >/dev/null
sed -Ei'' -e '/^tags:/d' '$__core_ui_SideBar_Recent.tid' '$__core_ui_SideBar_Tools.tid'
sed -Ei'' -e 's/^(list:).*/\1 [[Welcome to Grok TiddlyWiki]]/' '$__StoryList.tid'

# Write new values to config tiddlers. Touches only tiddler text, no other fields.
mapfile -t confarr <"$public_edits_file"
for write in "${confarr[@]}"; do
    IFS=$'\t' read -r key value <<<"$write"
    awk '/^$/ { print; print "'"$value"'"; nextfile } { print $0 }' <"$key" >"out.txt"
    mv out.txt "$key"
    perl -pi -e 'chomp if eof' "$key"  # remove final newline of file
done
popd >/dev/null

npx tiddlywiki --rendertiddler '$:/core/save/all' index.html "text/plain"
popd >/dev/null
