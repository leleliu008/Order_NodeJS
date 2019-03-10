FROM node:11-alpine
MAINTAINER leleliu008@gmail.com
WORKDIR /root
ADD package.json .
ADD build build
ADD node_modules node_modules
EXPOSE 3000
CMD ["npm", "start"]
