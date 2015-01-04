#!/bin/bash
# Concatenates and minifies all css files
rm ./css/site.css ./css/site.min.css
cat ./css/*.css > ./css/site.css
yui-compressor ./css/site.css > ./css/site.min.css

