#!/bin/sh

DIR=$(basename $PWD)
HUSKY_DIR=".husky"
HUSKY_PATH="$HUSKY_DIR"

function report() {
  echo "husky - Git root found at '$(basename $PWD)'"
}

# ---
# Look for the git root to install husky

if [ -d .git ]; then
  report
  npx husky $HUSKY_DIR
else
  cd ..
  if [ -d .git ]; then
    report
    HUSKY_PATH="$DIR/$HUSKY_DIR"
    npx husky "$HUSKY_PATH"
  else
    # If frontend folder is somewhere deeper in project, configure path manually
    # Looking for closest git root recursively is out of scope of this script
    echo Can\'t find git root folder to instal pre-commit hooks
  fi
fi

# ---
# Create actual hook script

PRE_COMMIT_PATH="$HUSKY_PATH/pre-commit"
PRE_COMMIT_SRC="#!/bin/sh
npx lint-staged"

echo "$PRE_COMMIT_SRC" > "$PRE_COMMIT_PATH"

git add "$PRE_COMMIT_PATH"
