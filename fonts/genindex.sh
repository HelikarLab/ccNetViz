#!/bin/bash
root="."

dump_dir(){
    local dirname=$1
    echo $(basename "$dirname")
    echo "<ul>"
    for file in $dirname/*; do
      if [[ -d "${file}" ]]; then
        echo "<li>"
        echo "<ul>"
          dump_dir "${file}"
        echo "</ul>"
        echo "</li>"
      fi
    done
    
    for file in $dirname/*; do
      if [[ -f "${file}" ]]; then
        echo "<li>"
        echo "<a href='${file}'>$(basename "$file")</a>"
        echo "</li>"
      fi
    done
    echo "</ul>"
}

echo "<ul>"
for file in $root/*; do
  if [[ -d "${file}" ]]; then
    echo "  <li>"
      dump_dir "${file}"
    echo "  </li>"
  fi
done
echo "</ul>" 
