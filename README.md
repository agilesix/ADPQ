# PQVP AD-DS Refresh

### How we approached the Prototype:
---
[Agile Six](https://agile6.com/) is a small firm founded in response to the US Digital Service. Therefore, we plan to invest often in competitions like ADPQ and have won a few (i.e. as subs on GSA 18F and DHS Flash). However, we have learned to team with smart partners and minimize investments required in order to be able to compete with large firms. For this effort, we teamed with [Fearless Solutions](https://fearless.tech/) and [Skylight Digital](https://skylight.digital/)  and intentionally limited our total investment to 300 total man hours. We hope that the State will view our input with this context as evidence of how agile we can be, meeting demanding budget constraints, while still respecting the values and techniques of the USDS Playbook. Looking forward, we have captured several bugs and a future roadmap in our [product backlog](https://trello.com/b/Ww8O7aX7/adpq2018).

The team (described under item B below) conducted a one-week Runway Sprint (infrastructure/architecture/ux discovery), where we defined and proofed the core architecture of the site as well as settled upon a number of toolsets and processes, including those we would leverage for CI, CM, Deployment, Version Control, and general communication within the team. The runway sprint was followed by a 3 day intense feature development sprint in which the feature-based user stories were implemented and tested by the team, then we followed with  a usability testing and remediation sprint.

The team organized its work using a [Trello board](https://trello.com/b/Ww8O7aX7/adpq2018). We also set up a Slack Channel to facilitate quick communication among team members, as well as uber conference videoconferencing, we used Google Drive to store our internal artifacts for access until they could later be uploaded to the repo for evalutation. Please note that file dates in the subnmitted repo (e.g. for HCD artifacts) do not match creation dates in google drive.  We leveraged Google Drive as a collaborative document repository, and GitHub as a version control repository.

The prototype is located at https://a2.agile6.com.

Our team employs ***Domain Driven Design*** in the construction of services and applications. One of the first artifacts we created, and rapidly iterated on in collaboration with users and SMEs, was a [domain model](architecture/Domain%20Model%20-%20Domain%20Model.png), which helped the team gain an understanding of the concepts and real-world objects with which our users engage. The domain model droe the initial creation of entities and data objects in our services and application. This reults in close alignment between the user's understanding of their task and the entities represented in code.

However, once development begins, we have found that the domain model can become stale as the application continues to evolve. In order to support agility and keep the domain model from going stale, the team has leveraged an open source modeling tool, called [ERD](https://github.com/amatsuda/erd), which tightly integrates with the application; in fact it runs as part of the development build (and only the development build). With this tool and the Rails database modules (ie. versioned database migrations and ActiveRecord), we can continue to rapidly iterate on the domain model as well as its representation in code, keeping the database schema, source code and domain model all in sync. 

One of the first decisions the team encountered in creating a basic architecture for the project was the decision whether to leverage an existing open source Knowledge Management platform as the starting point for development, or whether we should build a custom application from scratch. Whenever possible, we want to make these decisions based on empirical knowledge and experience, rather than simply making a "guess" up-front and hoping it was right. To arrive at empirical knowledge quickly, we use a technique called "Concurrent Set Based Engineering" (CSBE), by which the team pursues multiple different development approaches in parallel for one or more short timeboxes. At the end of each timebox, the team decides if it has gathered enough information to make an empirical determination of whether any approaches can be eliminated -- based on technical feasibility, alignment to evolving requirements, time-to-market, etc.

In this case, we pursued two approaches in parallel for two hours: one approach leveraged an [open source knowledge management platform written using Rails](https://github.com/charusat09/kms), and the other approach building a platform from scratch. After the two hour timebox, the team came back together and made a collective decision that we could eliminate the existing open source platform. The decision was based on the fact that at the end of the timebox, the team had a custom solution that aligned with our domain model (because it was built with reference to it), and leveraged an authentication mechanism that matched our requirements, while there was still substantial customization required on the open source platform to meet the application requirements.
The team took a mobile-first approach to design. Because this was an MVP prototype with a necessarily limited budget, we were necessarily limited in the amount of progressive enhancement for larger screen sizes that we were able to accomplish.

### Technology Stack
---
Our application architecture and infrastructure were anchored by a number of key principles that overlap and align with the US Digital Service Playbook. 

These include:

**Principle 1:** Leverage a modern, open source technology stack. Using a modern technology stack supported by a thriving open source community mitigates a number of technical risks, including reduced security vulnerabilities, increased availability of technical resources familiar with the technologies, alignment with modern devices and usage scenarios, and the ability to leverage a large ecosystem of pre-built components based on these toolsets. [Our technology stack](architecture/Domain%20Model%20-%20Tech%20Stack.jpeg) is comprised entirely of open source frameworks and components.

**Principle 2:** Leverage pre-built components. In our view, it always makes sense to weigh the cost of building features from scratch against leveraging a suitable COTS and Open-Source components available. In this case, we decided to build the application from scratch.

**Principle 3:** Design for and Deploy to the Cloud. An application that makes no assumptions about where and how it is hosted enables it to leverage Cloud-based infrastructures such as AWS, and scale on demand as usage patterns change. Our ***a2*** application runs in Docker containers that can be hosted on any Linux environment, and is deployed to an AWS  environment that can be scaled on demand as needed.

**Principle 4:** Leverage Automated Processes. As the codebase for an application or system grows, it it essential to have an automated build, test, deployment, and monitoring infrastructure in place. Automated processes allow the team to focus on forward-looking feature development, and not on basic maintenance, testing, and infrastructure tasks. For ***a2***, our team leverages open source testing frameworks for automated testing, CircleCI for continuous integration and continuous deployment, and Amazon CloudWatch for performance monitoring.

See our System Overview for a graphical depiction of the technologies used in this prototype.

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

- **Robert Rasmussen** (Agile Six) - *Product Manager, Agile Coach*

- **Delali Dziaras** (Fearless) - *Agile Coach, Content Writer*

- **Dan Levenson** (Agile Six) - *Content Writer*

- **Brian Derfer** (Agile Six)  - *Technical Architect*

- **Aurora Hay** (Agile Six)  - *Fullstack Web Developer, DevOps Engineer*

- **Chris Cairns** (Skylight)- *Content Writer, Usability Tester*

- **Allan Schougaard** (Agile Six)  - *Technical Architect, Back-end Web Developer*

- **David Gage** (Fearless) - *Fullstack Web Developer*

- **Bethany Halteman** (Fearless) -  *Visual Designer, Usability Designer*

- **Edward Teeple** (Agile Six)  - *Security Engineer*

**C.** Agile Six included end-users from the inception of our prototype , see [test videos here](../artifacts/videos).

Our approach was as follows:

- ***Hear Phase*** -  We performed a usability study survey of actual contracting professionals asking question about their Movitations, Expertise and Personality on the topic of Agile Acquisition.  We then performed User Interviews concerning thier workflows and their expectations as documented in our Empathy Map and Personas. We presented the entire development team with an overview of these findings during a workshop before we started any applicaiton design, where they could ask additional questions of the users.

- ***Create Phase*** - After listening to our users both with interviews and surveys we created [drawings](../vision) and [wirefames](../artifacts)  Based on this experience we were ready to start building our prototype with a goal of getting something in the users hands fast. 

- ***Deliver Phas*e** - After the first iteration was pushed to QA environment we were able to start exposing the applciation to our users. We were quickly able to identify gaps, bugs and ideas which informed subsequent iterations of our prototype. We plan in the future to frequently add new features in similar fashion (expose to small subset of users, analyze, slowly roll out).

- ***Future Backlog*** - The following link shows the trello board we used as both a product and sprint [backlogs](https://trello.com/b/Ww8O7aX7/adpq2018).

**D.** Agile Six used at least 4 user design techniques

- [Personas & Surveys](https://app.xtensio.com/folio/y0wgeokr)

- [User Interviews](http://XXX)

- [Usability Testing](../../tree/master/artifacts/artifacts/videos)

- [Empathy Map](../../tree/master/artifacts/eMap)

- [Wireframes](../../tree/master/artifacts)

**E.** We used only one [repository](https://github.com/agilesix/ADPQ) where all code and artifacts are stored and all code commits documented.

**F.** We have documented a subset of the **A2 RESTful API** in order to demonstrate our understanding of how to use Swagger to [document RESTful APIs](https://https://prod-agilesix-adpq-2018-backend.us-west-2.elasticbeanstalk.com/api-docs).

**G.** We followed WCAG 2.0 as well as http://www.ca.gov/Accessibility. We also leveraged XXX

H. We followed a style guide based on [USWDS](https://designsystem.digital.gov/) and [Materialize](http://materializecss.com/).

**I.** Recordings of User Testing Sessions can be found here: [User Testing Sessions](../artifacts/videos).

**J.** We believe strongly in frequent iterations based on user feedback. Therefore, we focus on getting an MVP in the hands of users ASAP (usually within 30 days). In the case of this prototype we had very limited time and budget. Therefore we performed only one post production iteration based one user test sessions. User feedback that was not prioritized for our iteration was put into the prioritized [product backlog](https://trello.com/b/Ww8O7aX7/adpq2018) for use in future releases.  

**K.** The user-facing features of our prototype leverage Bootstrap's grid system and employ responsive techniques, resulting in an excellent user experience regardless of the kind or size of device used. Our team utilized a mobile-first approach on the custom features we implemented, creating initial designs to work on phones and small mobile devices, then progressively enhancing this design for larger devices. 

**L.** Our solution is comprised entirely of modern open source technologies, including:

- [Ruby on Rails](https://github.com/rails/rails) `5.0.6` as a webdevelopment language/framework

- [Materialize](http://materializecss.com/) `0.100.2` as a responsive UI framework

- [USWDS](https://designsystem.digital.gov/) `1.4.6` as a responsive UI framework

- [JQuery](https://github.com/jquery/jquery) `2.2.4` as a JavaScript Library

- [nginx](https://www.nginx.com/) `1.13.9` as a web server

- [Puma](https://github.com/puma/puma) `3.11.0` as an application server

- [PostgreSQL](https://git.postgresql.org/gitweb/) `9.6.2` as a relational DBMS

- [AngularJS](https://angularjs.org/) `5.2.5` as a JavaScript frontend framework

- [Docker/docker-compose](https://www.docker.com/) as our containerized deployment/development tool

and many more.

**M.** We deployed the prototype on [AWS ElasticBeanstalk](https://aws.amazon.com/elasticbeanstalk/), a **PaaS** provider. 

**N.** We developed automated unit tests for our code using **[Rspec](http://rspec.info/)**, **[Jasmine](https://jasmine.github.io/)**, and **[Protractor](http://www.protractortest.org/#/)**.

**O.** We used [CircleCI](https://circleci.com) for **continuous integration** and, once the builds on our master branch were *successful*, set up the infrastructure to **deploy to AWSELB**. [Here are our builds](https://circleci.com/gh/agilesix/ADPQ).

**P.** [AWSELB](https://aws.amazon.com/elasticbeanstalk/) provides configuration management.

**Q.** **Continuous Monitoring** - The team leveraged **[Amazon Cloud Watch](https://aws.amazon.com/cloudwatch/)** to continuously monitor the availability and performance of the the application. We set up a dashboard in **Cloudwatch** that displayed a variety of **EC2 metrics**, including Network-In, Network-Out, CPU utilization, and Status Check Failures on each production web server. Because we used **Elastic Beanstalk** to manage our application instances, we were able to set up metrics and alarms on EB auto-scaling groups as well. We configured alarms to alert our DevOps personnel whenever the site became unavailable, as well as “self-healing” alarms to automatically add an instance whenever the in-service instance pool dropped below a certain threshold.

**R.** We deployed our **Docker** containers using **AWS ELB's infrastructure as code**.

**S.** [Setup instructions can be found here](https://github.com/agilesix/ADPQ/wiki/Development-Environment-Setup-Instructions).

**T.** Our entire software stack is [open source](https://opensource.org/) and provided *free of charge*.
