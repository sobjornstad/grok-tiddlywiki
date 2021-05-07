#!/usr/bin/env bash

FILT='[all[tiddlers]] -[prefix[$:/plugins/tiddlywiki/codemirror]] -[[$:/plugins/tiddlywiki/tiddlyweb]] -[[$:/plugins/tiddlywiki/filesystem]] -[prefix[$:/state]] -[prefix[Tr:]] -[tag[Meta]]'
public_edits_file="$PWD/scripts/public-edits.conf"

if [ ! -f "tiddlywiki.info" ]; then
    echo "Please run this script from the ZK root directory."
    exit 1
fi

rm -rf pubfolder
tiddlywiki . --savewikifolder pubfolder "$FILT"
pushd pubfolder

pushd tiddlers
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
popd

tiddlywiki --rendertiddler '$:/core/save/all' index.html "text/plain"
popd
