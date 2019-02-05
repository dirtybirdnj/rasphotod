# base-image for node on any machine using a template variable,
# see more about dockerfile templates here: https://www.balena.io/docs/learn/develop/dockerfile/#dockerfile-templates
# and about balena base images here: https://www.balena.io/docs/reference/base-images/base-images/
FROM balenalib/armv7hf-ubuntu


RUN install_packages libssl-dev build-essential curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_8.x  | bash -
RUN apt-get -y install nodejs
RUN node -v


RUN install_packages python2.7 python-setuptools python-dev
#Make sure the snake is cooperating
#RUN python --version
#RUN which python

RUN install_packages libcairo2-dev libgphoto2-6 libgphoto2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

#RUN install_packages libpango-1.0-0 libpangocairo-1.0-0
#RUN install_packages libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
#RUN install_packages cairo-dock libcairo2-dev libjpeg-dev libgif-dev 


# Defines our working directory in container
WORKDIR /usr/src/app

# Copies the package.json first for better cache on later pushes
COPY package.json package.json

# This install npm dependencies on the balena build server,
# making sure to clean up the artifacts it creates in order to reduce the image size.
RUN JOBS=MAX npm install --production --unsafe-perm && npm cache verify && rm -rf /tmp/*

# This will copy all files in our root to the working  directory in the container
COPY . ./

# Enable udevd so that plugged dynamic hardware devices show up in our container.
ENV UDEV=1

# server.js will run when container starts up on the device
CMD ["npm", "start"]