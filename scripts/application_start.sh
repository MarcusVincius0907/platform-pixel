#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/pixel/platform-pixel

#navigate into our working directory where we have all our github files
cd /home/ec2-user/pixel/platform-pixel

#install node modules
npm install

npm install --prefix /home/ec2-user/pixel/platform-pixel/server

#build app
npm run build:cb

#start our node app
/usr/local/bin/pm2 restart pixel-platform