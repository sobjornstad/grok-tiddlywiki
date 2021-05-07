#!/bin/bash

if [ ! -f "tiddlywiki.info" ]; then
    echo "Please run this script from the wiki root directory."
    exit 1
fi

myversion=$(jq .version plugins/content/book/Metadata.json)
mytwversion=$(jq '.["tw-version"]' plugins/content/book/Metadata.json)

gtw_plugin_version=$(jq .version plugins/content/plugin.info)
gtw_plugin_core_version=$(jq '.["core-version"]' plugins/content/plugin.info)

if [ ! "$gtw_plugin_version" = "$myversion" ]; then
    echo "Oops, the GTW plugin version $gtw_plugin_version is not equal to the metadata version $myversion."
    exit 1
fi
