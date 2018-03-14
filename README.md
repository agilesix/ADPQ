![A2 Landing](https://github.com/agilesix/ADPQ/blob/PO_branch/artifacts/A2%20Landing.png)
# PQVP AD-DS Refresh

The prototype is located at https://a2.agile6.com

login accounts: [found in the wiki](https://github.com/agilesix/ADPQ/wiki)


### How we approached the Prototype:
---
[Agile Six](https://agile6.com/) is a California based DVBE founded in response to the US Digital Service. For this effort, we teamed with [Fearless Solutions](https://fearless.tech/) and [Skylight Digital](https://skylight.digital/). We are very proud to submit our prototype and our team for consideration. Looking forward, we have captured several bugs and a future roadmap in our [product backlog](https://trello.com/b/Ww8O7aX7/adpq2018).


The team (described under item B below) conducted a one-week Runway Sprint (UX discovery/architecture/infrastructure), where we defined and proofed the core architecture of the site as well as settled upon a number of toolsets and processes, including those we would leverage for CI, CM, Deployment, Version Control, and general communication within the team. The runway sprint was followed by a 3-day intense feature development sprint in which the feature-based user stories were implemented and tested by the team, then we followed with  a usability testing and remediation sprint.

The team organized its work using a [Trello board](https://trello.com/b/Ww8O7aX7/adpq2018) and a Slack Channel and uberconference to facilitate quick communication, we used Google Drive for internal artifacts for access until they could later be uploaded to the repo for evaluation. Please note that file dates in the submitted repo (e.g. for HCD artifacts) do not match creation dates in google drive.  We leveraged Google Drive as a collaborative document repository, and GitHub as a version control repository.

Our team employs ***[Domain Driven Design](https://github.com/agilesix/ADPQ/wiki/A2-Architecture#domain-driven-design)*** in the construction of services and applications. One of the first artifacts we created, and rapidly iterated on in collaboration with users and SMEs, was a [domain model](https://github.com/agilesix/ADPQ/wiki/A2-Architecture#domain-driven-design), which helped the team gain an understanding of the concepts and real-world objects with which our users engage. The domain model drove the initial creation of entities and data objects in our services and application. This results in close alignment between the user's understanding of their task and the entities represented in code.

In order to support agility and keep the domain model from going stale, the team has leveraged an open source modeling tool, called [ERD](https://github.com/amatsuda/erd), which tightly integrates with the application; in fact it runs as part of the development build (and only the development build). With this tool and the Rails database modules (ie. versioned database migrations and ActiveRecord), we can continue to rapidly iterate on the domain model as well as its representation in code, keeping the database schema, source code and domain model all in sync. 

One of the first decisions was to build or repurpose. Whenever possible, we want to make these decisions based on empirical knowledge, rather than simply making a "guess". We used a technique called "Concurrent Set Based Engineering" (CSBE), by which the team pursued multiple different development approaches in parallel. In this case, we pursued two approaches for two hours: one approach leveraged an [open source knowledge management platform written using Rails](https://github.com/charusat09/kms), and the other building a platform from scratch. At the end of the timebox, the team decided based to continue with the custom applicaiton itt was outpacing the re-purposing option.  The custom solution aligned better with our domain model (because it was built with reference to it), and leveraged an authentication mechanism that matched our requirement. The team then took a mobile-first approach to design. Because this was an MVP prototype with a necessarily limited budget, we were necessarily limited in the amount of progressive enhancement for larger screen sizes that we were able to accomplish.

### Technology Stack
---
Our application architecture and infrastructure were anchored by a number of key principles that overlap and align with the US Digital Service Playbook. 

These include:

**Principle 1:** Leverage a modern, open source technology stack.  [Our technology stack](https://github.com/agilesix/ADPQ/wiki/A2-Architecture#technology-stack) is comprised entirely of open source frameworks and components.

**Principle 2:** Leverage pre-built components. In our view, it always makes sense to weigh the cost of building features from scratch against leveraging a suitable COTS and Open-Source components available. In this case, we decided to build the application from scratch.

**Principle 3:** Design for and Deploy to the Cloud. An application that makes no assumptions about where and how it is hosted enables it to leverage Cloud-based infrastructures such as AWS, and scale on demand as usage patterns change. Our ***A2*** application runs in Docker containers that can be hosted on any Linux environment, and is deployed to an AWS  environment that can be scaled on demand as needed.

**Principle 4:** Leverage Automated Processes. As the codebase for an application or system grows, it it essential to have an automated build, test, deployment, and monitoring infrastructure in place.  For ***A2***, our team leverages open source testing frameworks for automated testing, CircleCI for continuous integration and continuous deployment, and Amazon CloudWatch for performance monitoring.

[See our System Overview](https://github.com/agilesix/ADPQ/wiki/A2-Architecture#technology-stack) for a graphical depiction of the technologies used in this prototype.

### Our approach to Human-Centered Design (HCD)
---
We think of HCD as being in **3** repeating phases:

1. ***Hear*** – Listen to your users in as many ways as possible.

2. ***Create*** – Build prototypes and MVPs based on user input.

3. ***Deliver*** – Launch as soon as a minimum feature set is reached and continue to iterate over time as the demands of your users change.

### How we handled the specific RFI Requirements
---

**A.** Team Agile Six was lead by Product Owner/Manager Robert Rasmussen who had complete responsibility for the product as well as the team. Mr. Rasmussen is a certified Product Owner, Scrum Master, Project Manager and Scrum Coach (CSPO, CSM, PMP, CSP, PSPO2, PSM).

**B.** Team Agile Six was cross-functional and included:

- **Robert Rasmussen** (Agile Six - 35 hrs) - *Product Manager, Agile Coach*

- **Delali Dziaras** (Fearless) - *Agile Coach, Content Writer*

- **Dan Levenson** (Agile Six 20 hrs) - *Content Writer*

- **Brian Derfer** (Agile Six - )  - *Technical Architect*

- **Aurora Hay** (Agile Six)  - *Fullstack Web Developer, DevOps Engineer*

- **Chris Cairns** (Skylight - 9 hrs) - *Content Writer, Usability Tester*

- **Nick Bristow** (Skylight - 2 hrs) - *Content Writer, Usability Tester*

- **Allan Schougaard** (Agile Six)  - *Technical Architect, Back-end Web Developer*

- **David Gage** (Fearless) - *Fullstack Web Developer*

- **Bethany Halteman** (Fearless) -  *Visual Designer, Usability Designer*

- **Edward Teeple** (Agile Six - 4 hrs)  - *Security Engineer*

**C.** Agile Six included end-users from the inception of our prototype; see artifact links under requirement D.

Our approach was as follows:

- ***Hear Phase*** -  We performed [Design Research Interviews](https://drive.google.com/drive/folders/163f2UsKxhqRlkdyK3SK6H7fESrUpo2wk?usp=sharing) and surveys of actual contracting professionals asking question about their Movitations, Expertise and Personality on the topic of Agile Acquisition as documented in our [Personas](https://app.xtensio.com/folio/y0wgeokr). We presented the entire development team with an overview of these findings during a workshop before we started any application design, where they could ask additional questions of the users.

- ***Create Phase*** - After listening to our users both with interviews and surveys we created [drawings](artifacts/A2%20Tool%20Concept.pdf) and [wirefames](https://github.com/agilesix/ADPQ/wiki/A2-Wireframes)  Based on this experience we were ready to start building our prototype with a goal of getting something in the users hands fast. 

- ***Deliver Phase*** - After the first iteration was pushed to QA environment we were able to start exposing the application to our users. We were quickly able to identify gaps (notice black label items in our [product backlog](https://trello.com/b/Ww8O7aX7/adpq2018) were learned from user testing), which informed subsequent iterations of our prototype. We plan in the future to frequently add new features in similar fashion (expose to small subset of users, analyze, slowly roll out).

- ***Future Backlog*** - The following link shows the Trello board we used as both a product and sprint [backlogs](https://trello.com/b/Ww8O7aX7/adpq2018).

**D.** Agile Six used at least 4 user design techniques


- [Design Research Interviews](https://drive.google.com/drive/folders/163f2UsKxhqRlkdyK3SK6H7fESrUpo2wk?usp=sharing)

- [Personas](https://app.xtensio.com/folio/y0wgeokr)

- [Wireframes](https://github.com/agilesix/ADPQ/wiki/A2-Wireframes)

- [Usability Testing](https://drive.google.com/open?id=1Gk2jxA2E0F5bU2UV6LJkFfydR31iFcM-)


**E.** We used only one [repository](https://github.com/agilesix/ADPQ) where all code commits documented.

**F.** We have documented a subset of the **A2 RESTful API** in order to demonstrate our understanding of how to use Swagger to [document RESTful APIs](https://prod-agilesix-adpq-2018-backend.us-west-2.elasticbeanstalk.com/api-docs).

**G.** For accessibility, we followed the http://www.ca.gov/Accessibility guidelines, and [WCAG 2.0](https://www.w3.org/TR/WCAG20/) where we targeted compliance with level A (the lowest level). 

We deployed a set of tools: [Evaluera](http://www.evaluera.co.uk/atester) and the Chrome Accessibility Developer Tools plugin to do a first pass of the site as it is developed. We followed that with a human review for finding further issues where the tools fall short, which revealed several issues that were not found by the tools, in part due to the use of Javascript.

Notice Red labels in our [product backlog](https://trello.com/b/Ww8O7aX7/adpq2018) indicate future 508 improvments. 

**H.** [Our style guide](https://github.com/agilesix/ADPQ/wiki/A2-Style-Guide) is based on [USWDS](https://designsystem.digital.gov/) and [Materialize](http://materializecss.com/).

**I.** Recordings of User Testing Sessions can be found here: [User Testing Sessions](https://drive.google.com/open?id=1Gk2jxA2E0F5bU2UV6LJkFfydR31iFcM-).

**J.** We believe strongly in frequent iterations based on user feedback. Therefore, we focus on getting an MVP in the hands of users ASAP . Due to the time constraints, we performed only one post production iteration. User feedback that was not prioritized for our iteration was put into the prioritized [product backlog](https://trello.com/b/Ww8O7aX7/adpq2018) for use in future releases(see black labels).  

**K.** The user-facing features of our prototype leverage USWDS's grid system and employ responsive techniques, resulting in an excellent user experience regardless of the kind or size of device used. Our team utilized a mobile-first approach on the custom features we implemented, creating initial designs to work on phones and small mobile devices, then progressively enhancing this design for larger devices. 

**L.** Our solution is comprised entirely of modern open source technologies, including:

- [Ruby on Rails](https://github.com/rails/rails) `5.0.6` as a webdevelopment language/framework

- [Materialize](http://materializecss.com/) `0.100.2` as a responsive UI framework

- [USWDS](https://designsystem.digital.gov/) `1.4.6` as a responsive UI framework

- [JQuery](https://github.com/jquery/jquery) `2.2.4` as a JavaScript Library

- [nginx](https://www.nginx.com/) `1.13.9` as a web server

- [Puma](https://github.com/puma/puma) `3.11.0` as an application server

- [PostgreSQL](https://git.postgresql.org/gitweb/) `9.6.2` as a relational DBMS

- [AngularJS](https://angularjs.org/) `5.2.5` as a JavaScript front-end framework

- [Docker/docker-compose](https://www.docker.com/) as our containerized deployment/development tool

and many more.

**M.** We deployed the prototype on [AWS ElasticBeanstalk](https://aws.amazon.com/elasticbeanstalk/), a **PaaS** provider. 

**N.** Our functional testing strategy includes two modes: Back-end testing and front-end testing with the goal of achieving full feature coverage and 100% line coverage.

The backend, which is a Rails stack, is tested at two levels: at the domain model layer, using rspec with shoulda matchers, and at the full-stack or integration level, using rspec with [rswag](https://github.com/domaindrivendev/rswag), a Swagger integration Gem.

The front-end is written in Angular 5 to allow rapid prototyping using pure HTML (given the composition of the development team). Our preferred testing tool, **[Protractor](http://www.protractortest.org/#/)**, is not well supported yet for Angular 5, and given the limited number of functional features implemented so far, we have written a minimal set of automated functional tests for the front-end using **[Jasmine](https://jasmine.github.io/)** and Protractor. We have supplemented these automated tests with manual testing for some areas of functionality for this MVP release. We have also added user stories to the backlog to increase the coverage of automated tests on the front-end. 

**O.** We used [CircleCI](https://circleci.com) for **continuous integration** and, once the builds on our master branch were *successful*, set up the infrastructure to **deploy to AWSELB**. [Here are our builds](https://circleci.com/gh/agilesix/ADPQ).

**P.** [AWSELB](https://aws.amazon.com/elasticbeanstalk/) provides configuration management.
![AWSELB](https://github.com/agilesix/ADPQ/blob/PO_branch/A2%20AWS%20Elastic%20Beanstalk.png)
**Q.** The team leveraged **[Amazon Cloud Watch](https://aws.amazon.com/cloudwatch/)** to continuously monitor the availability and performance of the the application. We set up a dashboard in **Cloudwatch** that displayed a variety of **EC2 metrics**, including Network-In, Network-Out, CPU utilization, and Status Check Failures on each production web server. Because we used **Elastic Beanstalk** to manage our application instances, we were able to set up metrics and alarms on EB auto-scaling groups as well. We configured alarms to alert our DevOps personnel whenever the site became unavailable, as well as “self-healing” alarms to automatically add an instance whenever the in-service instance pool dropped below a certain threshold.

![CloudWatch](https://github.com/agilesix/ADPQ/blob/PO_branch/A2%20AWS%20CloudWatch.png)

**R.** We deployed our **Docker** containers using **AWS ELB's infrastructure as code**.

**S.** [Setup instructions can be found here](https://github.com/agilesix/ADPQ/wiki/Development-Environment-Setup-Instructions).

**T.** Our entire software stack is [open source](https://opensource.org/) and provided *free of charge*.
