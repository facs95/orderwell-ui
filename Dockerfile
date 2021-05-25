FROM node:15-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
COPY yarn.lock /app
RUN yarn install --frozen-lockfile --silent
COPY . /app
RUN yarn run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 30
CMD ["nginx", "-g", "daemon off;"]