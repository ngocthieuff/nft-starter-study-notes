# Docker Concepts

### Images & Containers:

While it's simplest to think of a container as a running image, this isn't quite accurate.

An image is really a template that can be turned into a container. 
To turn an image into a container, the Docker engine takes the image, adds a read-write filesystem on top and initializes various settings including network ports, container name, ID and resource limits.

#### Building our own Image with a Dockerfile

- Install Docker extension in Visual Studio Code.
```dockerfile
FROM node:12

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 80

CMD ["node", "server.js"]
```

- All caps FROM, this allows you to build your image up on another base image.
<sub>So now we're telling Docker, hey, in my own image, I wanna start by pulling in that node image.</sub>

- Next step, we wanna tell Docker, which files that live here on our local machine should go into the image.
  And for Docker get to copy command.
  ```dockerfile
  COPY . .
  ```
  Copy files or folders from ``source`` to the ``dest`` path in the image's filesystem.

><sub> **Keep in mind:** A container (and therefore also the image) contains ``environment + code``! Hence your code should go in there.</sub>

<img src="/assets/images/docker/copy.jpg"/>

<img src="/assets/images/docker/copy1.jpg"/>

- By default, all those commands will be executed in the working directory of your Docker container and image. And by default, that working directory is the root folder in that container file system.
  
  ```dockerfile
    RUN npm install
  ```

- ```WORKDIR /app``` tells Docker that all the subsequent commands will be executed from inside that folder.

- We could run node server but this would actually be incorrect node server.js,
  ```dockerfile
    RUN node server.js
  ```
   <sub>because this would be executed whenever this image is being built.
   But we just want to set up all dependencies and only start server if we start a container based on an image. Also, so that if we start multiple containers on one and the same image, we also start multiple node servers. </sub>
    
    <br/>

    So, here we will use ``CMD``(command), this just is executed when a container is started base on the image, not when the image is created.
    
    ```dockerfile
    CMD ["node", "server.js"]
    ```

    ><sub> **Keep in mind:** If you don't specify a CMD, the CMD of the base image will be executed. With no base image and no CMD, you'd get an error.</sub>

- After setting up everything, before specifying the command, which should always be that last instruction in your Dockerfile. 
  
    ```dockerfile
    EXPOSE 80
    ```

### References:

- [Udemy docker-kubernetes-the-practical-guide](https://www.udemy.com/course/docker-kubernetes-the-practical-guide/)
- [Stackoverflow what-is-the-difference-between-a-docker-image-and-a-container](https://stackoverflow.com/questions/23735149/what-is-the-difference-between-a-docker-image-and-a-container)