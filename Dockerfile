FROM node:15.14.0-alpine3.10
RUN mkdir -p /usr/nodeapps/test
WORKDIR /usr/nodeapps/test
COPY app/ /usr/nodeapps/test
EXPOSE 3030
CMD [ "npm", "start" ]