# memonto
<img align="center" src="https://i.imgur.com/XrNGYgw.png" width="100%"/>
Our goal is to give the possibility to the public transport users, figure out all their doubts about the service, before board a taxi


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites

To run memonto on dev mode, you must have:
- npm
- NodeJs
- Docker


To install npm
```
$ sudo npm install npm@latest -g
```
To install Docker
```
$ apt-cache policy docker-ce
$ sudo apt install docker-ce
```


### Building docker image and dependencies

Modules contain most of the faculties memonto dev uses.

```
$ sudo docker build -t me-monto-image .
```

### Running the project

The Docker image must be initialized.

To run the docker
```
$ sudo docker run -it -p 5003:5000 -v $(pwd):/meMonto me-monto-image
```

Shortly, a browser tab will pop-out with the project ready to use!


## Deployment

To begin deployment in AWS follow this tutorial made by AWS.
https://docs.aws.amazon.com/efs/latest/ug/gs-step-one-create-ec2-resources.html

then after having an instance enter to your server with the following information
```
ssh -i yourprivatekey.pem ubuntu@amazonserverip
```

Clone the repository and execute the backend as a pm2 instance and make a build of the front-end
```
$ git clone https://github.com/jalondono/meMonto.git
$ cd memonto/
$ sudo docker build -t me-monto-image .
$ sudo docker run -it -p 5003:5000 -v $(pwd):/meMonto me-monto-image
```

## Built With

* [NodeJs](https://nodejs.org/es/) - Backend environment execution.
* [ExpressJs](https://expressjs.com/es/) - Backend framework.
* [ReactJS](https://es.reactjs.org/) - Javascript library for frontend.
* [Bootstrap](https://getbootstrap.com/) - Frontend framework.
* [AWS](https://aws.amazon.com/) - Cloud platform dor deployement.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Authors

* **Juan Alberto Londono** - *Back-end Developer - Mobile Developer - Mechatronic Engineer* - [jalondono](https://github.com/jalondono)

* **Santiago Velez** - *Back-end Developer - Team leader - Project manager and business* - [svelezg](https://github.com/svelezg)

* **Cesar Velez** - *Full-stack engineer - DevOps - Electric and Electronics Engineer* - [cavb28](https://github.com/cavb28)


## Acknowledgments

* Hat tip to anyone whose code was used
* Holberton School students
* Inspiration
