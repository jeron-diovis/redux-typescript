#!/bin/sh

#echo "[prepare] check create-react-app dependencies"
#./install-cra-deps.sh

echo "[prepare] check json-server dependencies"
cd server
yarn install
cd ..

DIR=$(basename $PWD)
HUSKY_DIR=".husky"

if [ -d .git ]; then
  echo "[prepare] git root found at '$(basename $PWD)' dir. Installing hooks"
  husky install $HUSKY_DIR
else
  cd ..
  if [ -d .git ]; then
    echo "[prepare] git root found at '$(basename $PWD)' dir. Installing hooks"
    husky install "$DIR/$HUSKY_DIR"
  else
    # If frontend folder is somewhere deeper in project, configure path manually
    # Looking for closest git root recursively is out of scope of this script
    echo Can\'t find git root folder to instal pre-commit hooks
  fi
fi
