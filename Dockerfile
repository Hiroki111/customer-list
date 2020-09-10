# This is an example of multi-stage builds, aimed to reduce
# the image size by running only the React artifact (i.e. build).
# docker run -p 3000:80 hiroki111/customer-list:latest

# The 1st stage
FROM node:12.14 as builder
# WORKDIR sets the working directory for RUN, CMD, ENTRYPOINT, COPY, ADD
# It's recommended to use WORKDIR instead of proliferating instructions
# (e.g. RUN cd … && do-something) to improve readability
# /usr/src/app is suggested by the official doc of Node
WORKDIR /usr/src/app
# Copy package.json & yarn.lock into the image, then run yarn
# The destination (./) is WORKDIR
COPY package.json yarn.lock ./
RUN yarn
# copy everything other than files written in .dockerignore
COPY . ./
RUN yarn build

# From here, the 2nd stage begins
FROM nginx:1.12-alpine
# --from=<name> line copies just the built artifact from the previous stage
# into this new stage. In this way, everything other than "build" will be
# left behind. "/usr/share/nginx/html" is the image's default directory
# for static contents (Check Nginx's registory on docker hub).
# (Nginx's default directory varies from distro to distro.
# e.g. it can be "/var/www/nginx-default")
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
# the daemon off; directive tells Nginx to stay in the foreground. 
# For containers this is useful as best practice is for one container = one process. 
# One server (container) has only one service.
CMD ["nginx", "-g", "daemon off;"]

# What are the differences between CMD and RUN?

# CMD ["executable","param1","param2"] or CMD ["param1","param2"] or CMD command param1 param2
# CMD lets you define a default command to run when your container starts.
# There can only be one CMD instruction in a Dockerfile.

# RUN ["executable", "param1", "param2"] or RUN <command>
# RUN lets you execute commands inside of your Docker image. 
# The RUN instruction will execute any commands in a new layer on
# top of the current image and commit the results. 
