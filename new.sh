#!/bin/bash

files=$(ls posts/*.md | sort)
last_file=$(echo "$files" | tail -n 1)
last_filename=$(basename "$last_file" .md)
next_number=$((10#${last_filename} + 1))
prefixed_number=$(printf "%03d" $next_number)
filename=$(printf "posts/%s.md" $prefixed_number)

cat <<EOL > "${filename}"
---
Title:
Date: $(date +'%Y-%m-%d')
Orientation: vertical
Cover: images/$prefixed_number-.webp
---

![](images/$prefixed_number-@2x.webp)

EOL
