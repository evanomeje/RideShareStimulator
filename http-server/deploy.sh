#!/bin/bash
cd frontend
npm run build
cd ..
git add -f .
git commit -m "build"
git push origin main
sshcmd="ssh -t evan@api.evanomeje.xyz"
$sshcmd screen -S "deployment" /home/evan/RideShareStimulator/http-server/prod_deploy.sh
