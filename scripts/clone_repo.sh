#!/bin/bash
# Clone Node.js application from GitHub repository using SSH

# Set the GitHub repository URL (SSH)
REPO_URL="git@github.com:MarcusVincius0907/platform-pixel.git"

# Set the branch or tag to clone (optional)
BRANCH="main"

if [ ! -d /home/ec2-user/pixel/platform-pixel ]; then
  mkdir /home/ec2-user/pixel/platform-pixel
fi

# Set the directory to clone the repository to
APP_DIR="/home/ec2-user/pixel/platform-pixel"

# Clone the repository
if [ ! -d "$APP_DIR" ]; then
  # If the application directory does not exist, clone the repository
  git clone --branch $BRANCH $REPO_URL $APP_DIR
else
  # If the application directory already exists, pull the latest changes from the repository
  cd $APP_DIR
  git pull origin $BRANCH
fi