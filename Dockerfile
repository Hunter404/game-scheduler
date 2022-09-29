FROM node:17-alpine

RUN mkdir -p /usr/src/app/frontend/node_modules && mkdir -p /usr/src/app/backend/node_modules && mkdir -p /usr/src/app/backend/data/
WORKDIR /usr/src/app/backend

COPY --chown=node:node ./frontend /usr/src/app/frontend
COPY --chown=node:node ./backend /usr/src/app/backend

RUN apk add --no-cache --update --virtual .build build-base \
    && cd /usr/src/app/frontend/ && npm ci && npm run build \
    && cd /usr/src/app/backend/ && npm ci \
    && apk del .build

RUN echo "{\"JgN4N\":{\"days\":7,\"startHour\":17,\"endHour\":23,\"hours\":6,\"data\":[]}}" > "/usr/src/app/backend/data/db.json"

RUN chown -R node:node /usr/src/app

USER node

# replace this with your application's default port
EXPOSE 8000
VOLUME /usr/src/app/backend/data
CMD [ "node", "main.js" ]
