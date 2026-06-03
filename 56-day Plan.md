This is a 56-day schedule built around one capstone project:

**Capstone:** Team Task Tracker  
**Frontend:** React + Vite  
**Backend:** ASP.NET Core Web API  
**Database:** EF Core + SQL Server  
\---

# Week 1 — Environment, architecture, and first API connection

## Day 1

Set up the workspace.

* Create the root repo with `frontend/` and `backend/`
* Initialize the React app with Vite
* Create the ASP.NET Core Web API project
* Run both apps locally
* Create a basic GitHub repo structure and first commit

**Output:** both frontend and backend run on your machine

## Day 2

Set up backend fundamentals.

* Learn the role of Program.cs, DI, middleware, controllers, and appsettings
* Create one test controller: `/api/health`
* Return a simple JSON response
* Add basic logging
* Confirm the endpoint works in browser/Postman/Swagger

**Output:** working health endpoint

## Day 3

Set up frontend fundamentals.

* Clean the default Vite starter code
* Create a basic app shell: header, sidebar, main content area
* Add React Router
* Create placeholder pages: Dashboard, Tasks, Projects, Login
* Build a reusable layout component

**Output:** navigable frontend shell

## Day 4

Connect frontend to backend.

* Configure CORS in ASP.NET Core
* Call `/api/health` from React using `fetch`
* Show loading, success, and error states
* Create a small API utility file on the frontend
* Document the frontend-backend URLs in a `.env` file

**Output:** React successfully fetches backend data

## Day 5

Build the first real feature vertically.

* Define a simple Task model in the backend
* Create an in-memory list of tasks
* Add `GET /api/tasks`
* On frontend, create a task list page that fetches and displays tasks
* Show empty state if no tasks exist

**Output:** task list page backed by API

## Day 6

Add create-task flow.

* Add `POST /api/tasks`
* Create a frontend form with controlled inputs
* Submit task creation to the API
* Refresh the list after creation
* Add simple validation on both frontend and backend

**Output:** create + list tasks end to end

## Day 7

Review and stabilize Week 1.

* Re-run everything from scratch
* Refactor file names and folder organization
* Fix obvious issues
* Write a short README section: how to run frontend and backend
* Commit a clean checkpoint

**Output:** stable Week 1 baseline

\---

# Week 2 — React productivity and UI structure

## Day 8

Learn component design properly.

* Study component composition and props
* Split the task page into smaller components
* Create reusable Button, Input, Card, and SectionHeader
* Replace duplicated JSX with reusable pieces

**Output:** cleaner component-based UI

## Day 9

Improve state management basics.

* Review `useState`, lifting state up, and controlled forms
* Refactor task create form state
* Move shared data/state to the appropriate parent
* Remove awkward prop flow where possible

**Output:** cleaner state flow

## Day 10

Handle async UI well.

* Improve loading, error, and retry states
* Add a reusable loading component
* Add a reusable error message component
* Prevent broken UI during failed API calls

**Output:** more production-like async behavior

## Day 11

Add task details and edit flow.

* Add a task details page route
* Add `GET /api/tasks/{id}`
* Display a single task on the details page
* Create an edit form page layout

**Output:** details page working

## Day 12

Implement update flow.

* Add `PUT /api/tasks/{id}`
* Connect the edit form to the API
* Pre-fill form data from existing task
* Save and redirect back to task details or list

**Output:** edit task flow working

## Day 13

Add delete and confirmation flow.

* Add `DELETE /api/tasks/{id}`
* Add delete button and confirmation UI
* Remove deleted item from the frontend state
* Handle deletion failure gracefully

**Output:** full CRUD on tasks

## Day 14

Review and stabilize Week 2.

* Refactor repeated API logic
* Create a simple custom hook if useful
* Improve page layout consistency
* Write notes: what React patterns felt natural vs awkward

**Output:** clean CRUD frontend

\---

# Week 3 — Proper ASP.NET Core API structure

## Day 15

Introduce DTOs and separation of concerns.

* Learn why DTOs exist
* Create Task DTOs for request and response
* Stop returning entity-shaped raw objects directly
* Refactor controller method signatures

**Output:** DTO-based task API

## Day 16

Create a service layer.

* Move task business logic out of controllers
* Create `ITaskService` and `TaskService`
* Register service in DI
* Keep controllers thin

**Output:** controller-service separation

## Day 17

Add validation and better errors.

* Learn ASP.NET Core model validation basics
* Add request validation for create/update DTOs
* Return structured validation errors
* Add clear status codes: 400, 404, 201, etc.

**Output:** more professional API behavior

## Day 18

Add project domain.

* Create Project model, DTOs, service, controller
* Add `GET`, `POST`, `PUT`, `DELETE` for projects
* Create a Projects page in React
* Allow basic project listing and creation

**Output:** second domain area added

## Day 19

Link tasks to projects.

* Add project association to tasks
* Update DTOs and in-memory data shape
* Show project name on tasks
* Update forms so a task can belong to a project

**Output:** tasks and projects connected

## Day 20

Add filtering, sorting, and pagination.

* Add query parameters to tasks endpoint
* Support status filter, search term, page number, page size
* Add corresponding frontend controls
* Show pagination UI simply

**Output:** more realistic API consumption

## Day 21

Review and stabilize Week 3.

* Open Swagger and test all main endpoints
* Remove code smells in controllers and services
* Standardize response shapes where useful
* Write a short architecture note in the repo

**Output:** structured backend foundation

\---

# Week 4 — Database and EF Core

## Day 22

Set up EF Core.

* Pick PostgreSQL or SQL Server
* Install EF Core packages
* Create `DbContext`
* Add connection string to configuration
* Register the context in the backend

**Output:** EF Core wired into the app

## Day 23

Create entities and first migration.

* Create Task and Project entities
* Replace in-memory collections with database sets
* Create first migration
* Apply migration to local database

**Output:** database created from migration

## Day 24

Refactor services to use EF Core.

* Replace in-memory CRUD with real EF Core queries
* Handle async database access properly
* Test all task and project endpoints again
* Fix any serialization or tracking issues

**Output:** database-backed API

## Day 25

Add relationships properly.

* Set up one-to-many: Project -> Tasks
* Configure foreign keys
* Update create/update flows to use real project IDs
* Validate project existence before linking tasks

**Output:** relational data working correctly

## Day 26

Seed dev data.

* Add basic seed data strategy
* Seed sample users/projects/tasks
* Ensure the app starts with usable demo data
* Reset and recreate the DB once to prove the flow

**Output:** seeded development environment

## Day 27

Add timestamps and audit-like fields.

* Add `CreatedAt` and `UpdatedAt`
* Update entities and migrations
* Automatically set timestamps in service or entity flow
* Show dates in frontend list/details pages

**Output:** better data quality and realism

## Day 28

Review and stabilize Week 4.

* Re-test CRUD with DB persistence
* Fix migration issues or naming inconsistencies
* Document DB setup in README
* Commit a stable checkpoint

**Output:** solid persistence layer

\---

# Week 5 — Authentication, authorization, and security basics

## Day 29

Learn the auth architecture before coding.

* Study authentication vs authorization
* Decide your implementation scope for the capstone
* Plan simple user roles: User and Admin
* Decide which pages/endpoints need protection

**Output:** written auth plan for the project

## Day 30

Create user model and auth foundation.

* Add User entity and migration
* Create registration and login DTOs
* Hash passwords securely
* Add registration endpoint

**Output:** user registration backend

## Day 31

Implement login.

* Add login endpoint
* Return a token or session-based auth response
* Add frontend login page
* Store auth state on the frontend properly

**Output:** working login flow

## Day 32

Protect backend endpoints.

* Add authorization to task/project endpoints as appropriate
* Require authenticated access for create/update/delete
* Leave some read-only endpoints public only if intentional
* Test authorized vs unauthorized requests

**Output:** protected API routes

## Day 33

Protect frontend routes.

* Add route guards or protected route wrappers
* Redirect unauthenticated users to login
* Hide protected UI where appropriate
* Keep auth state persistent across refresh if your approach supports it

**Output:** protected frontend pages

## Day 34

Add role-based authorization.

* Add admin-only capability, such as project deletion or user list
* Enforce role checks in backend
* Reflect admin-only controls in frontend
* Test forbidden access path

**Output:** basic role-based authorization

## Day 35

Review and stabilize Week 5.

* Recheck CORS, secrets, and configuration
* Ensure passwords are not stored in plain text
* Clean auth-related code and naming
* Write auth flow notes in README

**Output:** working auth + authorization baseline

\---

# Week 6 — Testing and code quality

## Day 36

Set up backend test project.

* Create a test project for the backend
* Learn the distinction between unit and integration tests
* Add first unit test for a simple service method
* Make tests runnable with one command

**Output:** test infrastructure exists

## Day 37

Write service-level unit tests.

* Test create task logic
* Test invalid create scenarios
* Test update behavior
* Test not-found behavior

**Output:** core task service tests

## Day 38

Write project-related unit tests.

* Test project creation and retrieval logic
* Test project-task relationship constraints
* Cover at least one edge case
* Clean test names for readability

**Output:** broader service test coverage

## Day 39

Set up integration tests for API.

* Add integration test setup
* Test health endpoint and one task retrieval endpoint
* Validate status codes and payload shapes
* Confirm app boots in test environment

**Output:** first API integration tests

## Day 40

Expand integration tests.

* Test registration/login flow
* Test protected endpoint access
* Test forbidden/unauthorized cases
* Test create task via real API call in test environment

**Output:** key API flows covered

## Day 41

Frontend quality pass.

* Add linting and formatting if not already set
* Add at least a few frontend tests, or if time is tight, create strong manual test cases document
* Refactor messy components
* Improve naming and folder structure

**Output:** cleaner frontend codebase

## Day 42

Review and stabilize Week 6.

* Run full test suite
* Fix flaky or brittle tests
* Remove dead code
* Update README with test commands

**Output:** project feels engineered, not improvised

\---

# Week 7 — Deployment and production readiness

## Day 43

Prepare production config.

* Separate dev and production environment variables
* Clean connection strings and API base URL handling
* Check logging and error exposure
* Confirm the app can build cleanly in production mode

**Output:** production-ready config structure

## Day 44

Prepare frontend production build.

* Build the React app for production
* Test the built frontend locally
* Check routing behavior in production build
* Fix any environment variable issues

**Output:** successful production frontend build

## Day 45

Containerize the backend.

* Write a Dockerfile for ASP.NET Core backend
* Build the image locally
* Run the container and test endpoints
* Confirm environment variables work in container

**Output:** Dockerized backend

## Day 46

Prepare database for deployment.

* Set up a production or staging DB
* Apply migrations to deployed DB
* Confirm the app can connect from deployed environment
* Plan seed/demo data carefully

**Output:** hosted or deployment-ready DB

## Day 47

Deploy backend.

* Deploy the backend to your chosen platform
* Verify health endpoint and Swagger/OpenAPI if exposed appropriately
* Fix hosting/network/config issues
* Document the deployment steps while doing them

**Output:** live backend

## Day 48

Deploy frontend.

* Deploy the React frontend
* Point it to the live backend
* Test login, list, create, update, delete
* Fix cross-origin or auth issues

**Output:** live full-stack app

## Day 49

Review and stabilize Week 7.

* End-to-end test the live system
* Fix critical bugs only
* Take screenshots for portfolio use
* Write deployment and environment setup sections in README

**Output:** deployed and usable capstone

\---

# Week 8 — Portfolio polish and interview readiness

## Day 50

Improve UX and polish.

* Improve spacing, headings, buttons, empty states
* Standardize status badges and form feedback
* Improve error messages
* Clean obvious visual rough edges

**Output:** more polished UI

## Day 51

Add one strong “extra” feature.
Choose one:

* activity log
* dashboard summary counts
* task comments
* optimistic UI update
* due dates and status board

Spend the full 3 hours finishing one feature well.

**Output:** one standout extra feature

## Day 52

Write technical documentation.

* Write project overview
* Write architecture summary
* Write feature list
* Write how to run locally
* Write tech stack and design decisions

**Output:** strong README draft

## Day 53

Prepare interview explanations.

* Write short explanations for:

  * React state flow
  * component design
  * API request flow
  * ASP.NET Core middleware
  * DI
  * EF Core migrations
  * auth vs authorization
* Practice saying each in plain language

**Output:** interview explanation notes

## Day 54

Prepare project walkthrough.

* Rehearse a 5-10 minute walkthrough of your app
* Explain architecture from browser to database
* Explain one difficult bug you solved
* Explain one design tradeoff you made

**Output:** portfolio demo narrative

## Day 55

Final bug fixing and cleanup.

* Fix remaining medium-priority issues
* Remove TODOs you can finish quickly
* Check consistency of names, routes, DTOs, and UI labels
* Tag a release or final checkpoint commit

**Output:** polished final version

## Day 56

Final review day.

* Run the app from scratch
* Run tests
* Review README
* Review deployed version
* Write a final self-assessment:

  * what you can now build
  * what you still need to improve
  * what to study next

**Output:** completed junior-ready portfolio project

\---

# What you should have at the end of Day 56

You should have:

* one working React + ASP.NET Core full-stack project
* CRUD with real database
* auth and protected routes
* basic authorization
* testing
* deployment
* a readable README
* a project you can explain in an interview



