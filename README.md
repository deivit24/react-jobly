# React Jobly

This is a project using React to create the front end for the Jobly API.

[Click here to see the project on Netlify](https://dreamy-austin-f3aff9.netlify.app/)

## Step Zero: Setup

Download the starter code. Note: this is the backend. You’ll start the front end yourself.

- Create a database, **jobly**, and use the seed data provided. You can run the seed file using psql jobly < data.sql

- Create a new React project.

* It may help to take a few minutes to look over the backend to remind yourself of the most important routes.

* Start up the backend. We have it starting on port 3001, so you can run the React front end on 3000.

## Step One: Design Component Hierarchy

It will help you first get a sense of how this app should work.

We have a demo running at https://jobly-app.herokuapp.com/. Take a tour and note the features.

You can register as a new user and explore the site or log in as our test user, “rithmtest” (password: “rithmtest”).

### =STOP=

A big skill in learning React is to learn to design component hierarchies.

Take time to diagram what components you think you’ll need in this application, and what the most important parts of state are, and where they might live.

Notice how some things are common: the appearance of a job on the company detail page is the same as on the jobs page. You should be able to re-use that component.

**Spend time here**. This may be one of the most important parts of this exercise. We suggest you show your proposed design with an instructor, to get feedback before proceeding.

## Step Two: Make an API Helper

Many of the components will need to talk to the backend (the company detail page will need to load data about the company, for example).

It will be messy and hard to debug if these components all had AJAX calls buried inside of them.

Instead, make a single **JoblyAPI** class, which will have helper methods for centralizing this information. This is conceptually similar to having a model class to interact with the database, instead of having SQL scattered all over your routes.

## Step Three: Make Your Routes File

Look at the working demo to see the routes you’ll need:

- **/** - Homepage — just a simple welcome message
- **/companies** - List all companies
- **/companies/apple** - View details of this company
- **/jobs** - List all jobs
- **/login** - Login/signup form
- **/profile** - Edit profile page

Make your routes file that allows you to navigate a skeleton of your site. Make simple placeholder components for each of the feature areas.

Make a navigation component to be the top-of-window navigation bar, linking to these different sections.

When you work on authentication later, you need to add more things here. But for now, you should be able to browse around the site and see your placeholder components.

## Step Four: Companies & Company Detail

Flesh out your components for showing detail on a company, showing the list of all companies, and showing simple info about a company on the list (we called these **Company**, **Companies**, and **CompanyCard**, respectively—but you might have used different names).

Make your companies list have a searchbox, which filters companies to those matching the search (remember: there’s a backend endpoint for this!). Do this filtering in the backend — **not** by loading all companies and filtering in the front end!

## Step Five: Jobs

Similarly, flesh out the page that lists all jobs, and the “job card”, which shows info on a single job. You can use this component on both the list-all-jobs page as well as the show-detail-on-a-company page.

Don’t worry about the “apply” button for now — you’ll add that later, when there’s authentication for the app.

## Step Six: Authentication

This step is tricky. Go slowly and test your work carefully.

You need to add the following to your app:

- A route that that lets the user log in. This will use the login endpoint on the server.

      	Rather than keeping this login token in React state, store in your browser’s localStorage. This way, if the user refreshes their page or closes the the browser window, they’ll stay logged in (more on this in the next step).

      	Edit the JoblyApi file to extract the token from localStorage, rather than using that hardcoded “testuser” token.

      	Make your navigation bar only show only the login link if the user isn’t logged in. Make it show a “logout” link when they are, along with the other links.

T

- he registration process is similar to the login process: the fields gathered are different, and the backend endpoint is different, but the process is the same: call the endpoint, get the token, and store in localStorage. In our solution, we used one component for both of these. You can do this, or use two different components.

* Have homepage show a login button if the user isn’t logged in.

- Have the navigation bar show either a login or logout button.

Figure out how logout should work.

## Step Seven: Remembering Login Status

Once you can log in and sign up, a new problem emerges: what happens when you hard refresh the page? You need to make sure the app can recover your login status.

To handle this problem in your top-level **App** component, add a **localStorage** check inside of **useEffect**. If there’s a valid token in **localStorage**, then ping the **API** to get all of the information on the current user and store it in the **App** component’s state. This will let you pass current info down as a prop to any descendant component, too.

Once React knows whether or not there’s a current user, you can start protecting certain views! Next, make sure that on the front-end, you need to be logged in if you want to access the companies page, the jobs page, or a company details page.

As a bonus, you can write a **useLocalStorage** hook to manage the user data in local storage!

## Step Eight: Profile Page

Add a feature where the logged-in user can edit their profile.

## Step Nine: Job Applications

A user should be able to apply for jobs (there’s already a backend endpoint for this!).

On the job info (both on the jobs page, as well as the company detail page), add a button to apply for a job. This should change if this is a job the user has already applied to.
