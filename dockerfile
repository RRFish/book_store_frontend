FROM node:14.16-alpine
COPY ./ /usr/src/app
WORKDIR /usr/src/app

RUN npm set strict-ssl false && npm install && chown 1001 -R .

USER 1001
EXPOSE 3000

CMD ["npm", "run", "start"]