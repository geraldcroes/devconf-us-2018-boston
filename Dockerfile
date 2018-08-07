FROM node:10.7-alpine

LABEL Maintainers="Damien DUPORTAL<damien.duportal@gmail.com>"

# Install Global dependencies
RUN apk add --no-cache \
  curl \
  git \
  tini

# Install App's dependencies (dev and runtime)
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install

ENV PATH=/app/node_modules/.bin:$PATH

COPY ./gulp/tasks /app/tasks
COPY ./gulp/gulpfile.js /app/gulpfile.js

VOLUME ["/app"]

# HTTP
EXPOSE 8000

ENTRYPOINT ["/sbin/tini","-g","gulp"]
CMD ["default"]
