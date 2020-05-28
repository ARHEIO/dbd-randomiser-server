FROM alpine:3.5
 
# install node 
RUN apk add --no-cache nodejs
# set working directory
WORKDIR /root/chat
# copy project file
COPY package.json .
# install node packages
RUN npm set progress=false && \
    npm ci
COPY . .
CMD npm run build