FROM node:12-alpine3.11

RUN adduser -D appuser
USER appuser

RUN mkdir -p /home/appuser/app
WORKDIR /home/appuser/app

COPY package.json package-lock.json /home/appuser/app/
RUN npm install --production

COPY . .

CMD [ "npm", "start" ]
EXPOSE 3000