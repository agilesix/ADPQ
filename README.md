# ADPQ

## Development Environment Setup Instructions
#### Pre-requisites

- command line such as `bash`
- [Docker/docker-compose](https://www.docker.com/get-docker)
- [git](https://git-scm.com/downloads)

For Ubuntu, see:
- [How To Install and Use Docker on Ubuntu 16.04]https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04
- [How To Install Docker Compose on Ubuntu 16.04]https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04

**If you do not wish to develop with docker**

In this `README`, there are no instructions on how to set up without `docker/docker-compose`.
Please contact a developer if you want to know how to do this.

- Backend stack:
    - ruby 2.3.1
    - postgresql
    - bundler

- Frontend stack:
    - node 8+    

## Set up Backend for development
### Within the command line:

1. Clone this repository

    `git clone https://github.com/agilesix/ADPQ.git`

2. Change directory into the newly created project directory

    `cd ADPQ`

3. Change directory into the backend project

    `cd backend`

4. Build the development environment with docker-compose (this may take a while)

    `docker-compose -f docker-compose-development.yml build`

5. Spin up the backend development server

    `docker-compose -f docker-compose-development.yml up`

6. In a browser, browse to `http://localhost:8000` to make sure everything built correctly.

### How to run commands for backend web project

To do this, run these commands:

`docker-compose -f docker-compose-development.yml run web <COMMAND>`

ex:

`docker-compose -f docker-compose-development.yml run web bundle install`

#### How to run tests
In order to run the tests, the test environment must be built first. This environment includes browsers and settings for testing purposes.

`docker-compose -f docker-compose-test.yml build`

`docker-compose -f docker-compose-test.yml run web bundle exec rails db:migrate`

`docker-compose -f docker-compose-test.yml run web bundle exec rspec`

## Set up Frontend for development

#### Dependencies
- If you wish to use the `API`, the `backend` project must be running

### Within the command line:

1. Clone this repository, if you have not already

    `git clone https://github.com/agilesix/ADPQ.git`

2. Change directory into the newly created project directory

    `cd ADPQ`

3. Change directory into the backend project

    `cd frontend`

4. Build the development environment with docker-compose (this may take a while)

    `docker-compose -f docker-compose-development.yml build`

5. Spin up the frontend development server

    `docker-compose -f docker-compose-development.yml up`

6. In a browser, browse to `http://localhost:8080` to make sure everything built correctly.

### How to run commands for frontend web project

`docker-compose -f docker-compose-development.yml run angular-dev <COMMAND>`

ex:

`docker-compose -f docker-compose-development.yml run angular-dev ng g c home`

#### How to run tests

`docker-compose -f docker-compose-development.yml run angular-dev npm test`
