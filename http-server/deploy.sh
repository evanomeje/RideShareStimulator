#!/bin/bash
sshcmd="ssh -t evan@api.evanomeje.xyz"
$sshcmd screen -S "deployment" /home/evan/RideShareStimulator/http-server/prod_deploy.sh
