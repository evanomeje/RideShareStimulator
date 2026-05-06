#!/bin/bash
cd frontend
npm run build
cd ..
git add .
git commit -m "build"
git push
sshcmd="ssh -t evan@api.evanomeje.xyz"
$sshcmd screen -S "deployment" /home/evan/RideShareStimulator/prod_deploy.sh
