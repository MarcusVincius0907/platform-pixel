#!/bin/bash

if [ ! -d /home/ec2-user/pixel/platform-pixel ]; then
  mkdir /home/ec2-user/pixel/platform-pixel
fi

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/pixel/platform-pixel

#navigate into our working directory where we have all our github files
cd /home/ec2-user/pixel/platform-pixel

#install node modules
npm install