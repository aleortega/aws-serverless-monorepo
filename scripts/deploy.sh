# Build step

cd services
cd auth
yarn && yarn deploy
cd ../candidates
yarn  && yarn deploy
cd ../jobOffers
yarn  && yarn deploy
cd ../recruiters
yarn  && yarn deploy