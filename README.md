# PQVP AD-DS Refresh

How we approached the Prototype:
Agile Six is a small firm founded in response to the US Digital Service. Therefore, we plan to invest often in competitions like ADPQ and have won a few (i.e. as subs on GSA 18F and DHS Flash). However, we have learned to team with smart partners and minimize investments required in order to be able to compete with large firms. For this effort, we teamed with Fearless Solutions and Skylight Digital  and intentionally limited our total investment to 300 total man hours. We hope that the State will view our input with this context as evidence of how agile we can be, meeting demanding budget constraints, while still respecting the values and techniques of the USDS Playbook. Looking forward, we have captured several bugs and a future roadmap in our product backlog viewable at https://trello.com/b/Ww8O7aX7/adpq2018

The team (described under item B below) conducted a one-week Runway Sprint (infrastructure/architecture/ux discovery), where we defined and proofed the core architecture of the site as well as settled upon a number of toolsets and processes, including those we would leverage for CI, CM, Deployment, Version Control, and general communication within the team. The runway sprint was followed by a 3 day intense feature development sprint in which the feature-based user stories were implemented and tested by the team, then we followed with a usability testing and remediation sprint.

The team organized its work using a Trello board. We also set up a Slack Channel to facilitate quick communication among team members, as well as uber conference videoconferencing, we used Google Drive to store our internal artifacts for access until they could later be uploaded to the repo for evalutation. Please note that file dates in the subnmitted repo (e.g. for HCD artifacts) do not match creation dates in google drive.  We leveraged Google Drive as a collaborative document repository, and GitHub as a version control repository.

The prototype is located at https://XXX

Our team employs Domain Driven Design ithe construction of services and applications. One of the first artifacts we created, and rapidly iterated on in collaboration with users and SMEs, was a domain model (architecture/Domain%20Model%20-%20Tech%20Stack%20(2).jpeg), which helped the team gain an understanding of the concepts and real-world objects with which our users engage. The domain model droe the initial creation of entities and data objects in our services and application. This reults in close alignment between the user's understanding of their task and the entities represented in code.

However, once development begins, we have found that the domain model can become stale as the application continues to evolve. In order to support agility and keep the domain model from going stale, the team has leveraged an open source modeling tool, called ERD (https://github.com/amatsuda/erd), which tightly integrates with the application; in fact it runs as part of the development build (and only the development build). With this tool and the Rails database modules (ie. versioned database migrations and ActiveRecord), we can continue to rapidly iterate on the domain model as well as its representation in code, keeping the database schema, source code and domain model all in sync.

One of the first decisions the team encountered in creating a basic architecture for the project was the decision whether to leverage an existing open source Knowledge Management platform as the starting point for development, or whether we should build a custom application from scratch. Whenever possible, we want to make these decisions based on empirical knowledge and experience, rather than simply making a "guess" up-front and hoping it was right. To arrive at empirical knowledge quickly, we use a technique called "Concurrent Set Based Engineering" (CSBE), by which the team pursues multiple different development approaches in parallel for one or more short timeboxes. At the end of each timebox, the team decides if it has gathered enough information to make an empirical determination of whether any approaches can be eliminated -- based on technical feasibility, alignment to evolving requirements, time-to-market, etc.

In this case, we pursued two approaches in parallel for two hours: one approach leveraged an open source knowledge management platform written using Rails (https://github.com/charusat09/kms), and the other approach building a platform from scratch. After the two hour timebox, the team came back together and made a collective decision that we could eliminate the existing open source platform. The decision was based on the fact that at the end of the timebox, the team had a custom solution that aligned with our domain model (because it was built with reference to it), and leveraged an authentication mechanism that matched our requirements, while there was still substantial customization required on the open source platform to meet the application requirements.
The team took a mobile-first approach to design. Because this was an MVP prototype with a necessarily limited budget, we were necessarily limited in the amount of progressive enhancement for larger screen sizes that we were able to accomplish.
Technology Stack
Our application architecture and infrastructure were anchored by a number of key principles that overlap and align with the US Digital Service Playbook. These include

Principle 1: Leverage a modern, open source technology stack. Using a modern technology stack supported by a thriving open source community mitigates a number of technical risks, including reduced security vulnerabilities, increased availability of technical resources familiar with the technologies, alignment with modern devices and usage scenarios, and the ability to leverage a large ecosystem of pre-built components based on these toolsets. Our technology stack is comprised entirely of open source frameworks and components, including Ruby on Rails, JQuery, Bootstrap, Puma, PostgreSQL, Capybara, Sniffybara, and NewRelic (see System Overview below).

Principle 2: Leverage pre-built components. In our view, it always makes sense to weigh the cost of building features from scratch against leveraging a suitable COTS and Open-Source components available. In this case, we decided to build the application from scratch.

Principle 3: Design for and Deploy to the Cloud. An application that makes no assumptions about where and how it is hosted enables it to leverage Cloud-based infrastructures such as AWS and Heroku, and scale on demand as usage patterns change. Our OrderIT application runs in a virtual LXC container that can be hosted on any Linux environment, and is deployed to a Heroku Cloud environment that can be scaled on demand as needed.

Principle 4: Leverage Automated Processes. As the codebase for an application or system grows, it it essential to have an automated build, test, deployment, and monitoring infrastructure in place. Automated processes allow the team to focus on forward-looking feature development, and not on basic maintenance, testing, and infrastructure tasks. For OrderIT our team leverages the open source Capybara and Sniffybara testing frameworks for automated testing, CircleCI for continuous integration and automated builds, Heroku for automated deployments, and NewRelic for performance monitoring.

See our System Overview for a graphical depiction of the technologies used in this prototype.

Our approach to Human-Centered Design (HCD):
We think of HCD as being in 3 repeating phases (read more here: Agile Six's Human Centered Design Presentation)

Hear – Listen to your users in as many ways as possible
Create – Build prototypes and MVPs based on user input
Deliver – Launch as soon as a minimum feature set is reached and continue to iterate over time as the demands of your users change.
How we handled the specific RFI Requirements
A. Team Agile Six was lead by Product Owner/Manager Robert Rasmussen who had complete responsibility for the product as well as the team. Mr. Rasmussen is a certified Product Owner, Scrum Master, Project Manager and Scrum Coach (CSPO, CSM, PMP, CSP, PSPO2, PSM).

B. Team Agile Six was cross-functional and included (see our website www.agile6.com for profiles):

Robert Rasmussen (Agile Six) - Product Manager, Agile Coach
Delali Dziaras (Fearless) - Agile Coach, Content Writer
Dan Levenson (Agile Six) - Content Writer
Brian Derfer (Agile Six)  - Technical Architect
Aurora Hay (Agile Six)  - Front-end Web Developer
Chris Cairns (Skylight)- Content Writer, Usability Tester
Allan Schougaard (Agile Six)  - Technical Architect, DevOps Engineer & Back-end Web Developer
David Gage (Fearless) - Back-end Web Developer
Bethany Halteman (Fearless) -  Visual Designer, Usability Tester
Edward Teeple (Agile Six)  - Security Engineer

C. Agile Six included end-users from the inception of our prototype (see tests here XXX).

Our approach was as follows:

Hear Phase:  We performed a usability study survey (ADKAR) of actual contracting professionals asking question about their Awarness, Desire, Knowledge, Ability and Reinforcement on the topic of Agile Acquisition.  We had open discussions about the app and their expectations as documented in our Empathy Map and Personas. The workshop and map focused on what the user sees, hears, thinks, says and does. Then we used this information to consider the pains and gains involved in engagement with such apps in order to maximize the value to the end user in the design.
Create Phase: After listening to our users we created user personas [Personas](XXX), which we felt reflected a fair segmentation of our users. We then chose 4 users to represent these profiles and held a User Empathy Workshop for the entire development team.  During this workshop the four users where present to discuss the findings of their personas and took actual questions from the development team (we acknowledge that this pool is small and intentionally abbreviated for this prototype). With these personas and empathy map in hand, we met as a team to whiteboard the application flow [Sketch](XXX). Based on this experience we were ready to build our prototype. Rough sketches, which allowed the team to quickly iterate on design ideas, were followed by wireframes: XXX  During our feature sprints (1-3), we iterated on these wire frames and developed a .....
Deliver Phase - If we were to proceed with this application, we would enter our 3rd phase of HCD which would include frequently adding new features in similar fashion (expose to small subset of users, analyze, slowly roll out). We never stop soliciting feedback from users, never stop improving the User Experience and we update journey maps with the users as they evolve.
Future Backlog - The following link shows the trello board we used as both a product and sprint backlog: https://trello.com/b/Ww8O7aX7/adpq2018

D. Agile Six used 4 user design techniques

  [Personas](XXX)
  [Empathy Map](XX)
  User Testing Sessions
  [Wireframe](XXX)

E. We used only one repository located at https://github.com/agilesix/ADPQ where all code and artifacts are stored and all code commits documented.

F. We have documented a subset of the Spree RESTful API in order to demonstrate our understanding of how to use Swagger to document RESTful APIs https://XXX

G. We followed WCAG 2.0 as well as http://www.ca.gov/Accessibility. We also leveraged Sniffybara, a Ruby gem that adds automatic 508 accessibility compliance checks into your Capybara specs. Report screenshot can be found here 508 Report.

H. We created and followed a style guide based on USWDS here: OrderIT Style Guide

I. Recordings of User Testing Sessions can be found here: User Testing Sessions

J. We believe strongly in frequent iterations based on user feedback. Therefore, we focus on getting an MVP in the hands of users ASAP (usually within 30 days). In the case of this prototype we had very limited time and budget. Therefore we performed only one post production iteration based one user test sessions. User feedback that was not prioritized for our iteration was put into the prioritized product backlog for use in future releases and can be found here: https://trello.com/b/Ww8O7aX7/adpq2018

K. The user-facing features of our prototype leverage Bootstrap's grid system and employ responsive techniques, resulting in an excellent user experience regardless of the kind or size of device used. Our team utilized a mobile-first approach on the custom features we implemented, creating initial designs to work on phones and small mobile devices, then progressively enhancing this design for larger devices. We chose SpreeCommerce understanding that any choice of a third-party open source component entails trade-off decisions. In this case, Spree's admin functionality did not support responsive design, but the team felt that administrative functions would not typically be performed on mobile devices, and hence determined that the advantages gained by leveraging a pre-built component outweighed this disadvantage.

L. Our solution is comprised entirely of modern open source technologies, including:

Rails 5.0.1 as a webdevelopment language/framework - https://github.com/rails/rails
SpreeCommerce 3.2.0 as an e-commerce platform - https://github.com/spree
Bootstrap 3.3.7 as a responsive UI framework - https://github.com/twbs
JQuery 3.1.1 as a Javascript Library - https://github.com/jquery/jquery
Puma 3.7.1 as a web server - https://github.com/puma/puma
Capybara 2.12.1 as a Testing Framework - https://github.com/teamcapybara/capybara
Sniffybara 0.0.1 as a 508 Compliance Testing Framework - https://github.com/department-of-veterans-affairs/sniffybara
PostgreSQL 9.6.2 as a relational DBMS - https://git.postgresql.org/gitweb/
NewRelic RPM 3.18.1 as a Application Performance Monitoring Framework - https://github.com/newrelic/rpm
M. We deployed the prototype on Heroku, a PaaS provider. Heroku integrates with GitHub, allowing for easy automated deployment.

Hosting and Deployment: Deployment to Heroku

N. We developed automated unit tests for our code using Rspec

O. We used CircleCI for continuous integration and our builds can be found here: Agile Six ADPQ Builds

Sample report here: Sample Report. Every time we do a code checkin, reports are produced under the corresponding build in CircleCI.

P. Setup or used configuration management;

This was managed via GitHub https://github.com/agilesix/ADPQ/

Q. We used New Relic for Continous Monitoring, Error Collection & Alerting New Relic

R. We deployed to the LXC open source container system: https://linuxcontainers.org/

S. Instructions can be found here: Setup Instructions

T. Our entire software stack is open source and provided free of charge.
