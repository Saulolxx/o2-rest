FROM node:16 AS build
ENV YARN_VERSION 1.16.0
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn --frozen-lockfile
COPY . /app/
RUN yarn build

FROM node:16-slim
ENV YARN_VERSION 1.16.0
WORKDIR /app
COPY package.json /app/
RUN npm install --ignore-scripts --omit=dev
COPY --from=build /app/dist  /app/
EXPOSE 3000
CMD ["npm", "start"]
