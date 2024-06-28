#!/bin/bash

files=$(ls posts/*.md | sort)
last_file=$(echo "$files" | tail -n 1)
last_filename=$(basename "$last_file" .md)
next_number=$((10#${last_filename} + 1))
filename=$(printf "posts/%03d.md" $next_number)

cat <<EOF > "${filename}"
---
Title: #$next_number
Date: $(date +'%Y-%m-%d')
Orientation: vertical
Cover: 
---

EOF 
