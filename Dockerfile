FROM node:8.9-alpine
# ENV NODE_ENV production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
#RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm i
COPY . /usr/src/app
RUN npm run web:prod
RUN npm run tsc
EXPOSE 7001
CMD npm run docker