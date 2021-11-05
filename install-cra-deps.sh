# This script exists because of a quite weird behavior
# of create-react-app with it's indirect dependencies.
#
# CRA has a lot of eslint-related deps, defined in "react-scripts" package.
# When CRA is just created, all those deps are added to yarn.lock, but not to package.json –
# so they are indirect for your project.
#
# When packages are installed for the first time (no node_modules folder exists),
# those deps are installed correctly (as top-level deps).
# When adding a new package, it seems they persist if already installed.
#
# BUT in case of upgrading installed packages, those deps disappear from node_modules.
# (they move to `react-scripts/node_modules`, for some reason)
# I don't know WHY, I also don't know why they aren't installed despite of their presence in yarn.lock –
# but it's a fact: upgrading packages destroys your setup.
#
# So have to add those deps into package.json explicitly.
# Since there is a lot of them, supporting them manually is kinda pain,
# so it would be better to extract deps list from react-scripts as it is.

DEPS=$(node ./get-cra-deps)

if [[ -n $DEPS ]]; then
  echo 'Installing implicit CRA deps:'
  echo $DEPS | tr " " "\n" | xargs -I{} echo " – " {}

  echo $DEPS \
    | xargs yarn add --dev --ignore-scripts --silent
fi;
