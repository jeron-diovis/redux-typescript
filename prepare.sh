#!/bin/sh

DIR=$(basename $PWD)
HUSKY_DIR=".husky"

function report() {
  echo "husky - Git root found at '$(basename $PWD)'"
}

if [ -d .git ]; then
  report
  husky install $HUSKY_DIR
else
  cd ..
  if [ -d .git ]; then
    report
    husky install "$DIR/$HUSKY_DIR"
  else
    # If frontend folder is somewhere deeper in project, configure path manually
    # Looking for closest git root recursively is out of scope of this script
    echo Can\'t find git root folder to instal pre-commit hooks
  fi
fi
