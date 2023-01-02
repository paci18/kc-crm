### STAGE 1: Build ###
FROM node:14 AS build
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD /usr/src/app/node_modules/.bin/ng serve  




# ### STAGE 2: Run ###
# FROM nginx:1.22
# COPY --from=build /usr/src/app/dist/kc-crm /usr/share/nginx/html
# EXPOSE 70