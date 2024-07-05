#aim of docker is to execute the codes in the docker container 

#first the file asks for the base image, since the project is built on mern thus the base image would be node
#alpine is a linux distribution(flavour)
FROM node:18-alpine 

#we create an app folder in our working directory where we perform the tasks (storing code in app folder)
WORKDIR /app

RUN apk update && apk add --no-cache g++

#local - what code to input into the container folder 
#COPY <local> <container>
#as the entire backend(root directory for the docker file) code needs to be input into the container
#therefore "." sign is used to signify that the root directory code needs to be copied into the app folder - second "."
COPY package.json .

#if we want to work on a code that has already been pushed into the github, therefore we use npm i to install dependencies 
#we can have multiple run statements in the dockerfile  
RUN npm i

COPY . .

EXPOSE 8000
#to expose the port of the container

#CMD & ENTRYPOINT are the same things, these are used to run/start our project 
#we can only have 1 cmd in dockerfile as it is not feasable to run the project again over the previous run 
CMD ["node", "index.js"]

#command to run on the terminal - docker image build -t cpp-compiler .  (builds a docker image named cpp-compiler, "." is for the location of the docker file)
#we can create n number of containers for the same image 

#docker run -d --name con1 -p 8000:8000 cpp-compiler (to map our container(con1) backend with the local system 8000 port)
#this means that the systems 8000 port has been mapped with the containers 8000 port 
#5000:8000 means that the systems 5000 port has been mapped with the containers 8000 port thus, localhost 5000 would work fine 