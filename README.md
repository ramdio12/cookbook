# COOKBOOK - A Web Application

## A REACT Web application with PHP(PDO) REST API Authentication/CRUD and PDF Saver/exporter

## TOOLDS USED

- React Typescript
- Tailwind CSS
- TanStack Query v3
- PHP
- MySQL
- Axios
- React to Print

## Description

- Instead of making a basic React CRUD for my portfolio project, I decided to make a more complex CRUD(minus DELETE- for now) with PHP REST API and authentication (Login and Register) as well. This project is a combination of HTML,CSS,Javascript(React JS) , PHP and Mysql

- This project is purposely for food enthusiasts and those who wanted to learn how to cook. Anyone can share their homemade recipes. Not only the user can create a recipe note but they can also download other user's recipe as well in PDF.

- The frontend is hosted on vercel while my PHP files for backend is hosted on 000webhost(hostinger)

## PHP FILE LOCATION

This is my github link for all PHP files that I used for the project's backend

- https://github.com/ramdio12/php_files_for_cookbook_webapp

## INSTRUCTIONS

- The user need to register first, and then login
- When the user logged in they can either create a recipe or check other users recipe
- The user can also export or save other user's recipe in PDF

## PAGES SPECIFICATIONS

### AUTHENTICATION PAGE

- The first page you will see is the authentication page, any attempt to enter the dashboard will be failed because the components are protected. You can register your credentials to the sign up page. If successful, you will be redirected to the login page

### HOME SECTION (DASHBOARD)

- A page where all of the users' recipes will be displayed. With the help of React Query, I can display data even without using useEffect Hook

### MY RECIPES

- The specific user's recipe will only be displayed in table form, where they can either view or edit the recipe

### ADD RECIPE

- It is only a form where a user can add recipes to be displayed on home page

### PROFILE

- This page has the user's Info, they can change the default profile pic or edit their info

## Challenges

    - Since PUT and DELETE METHOD is not supported on 000webhost for non premium users,  I used Axios.post for the update method. And as for the delete method , I replaced it with PDF export for now.
    - Fetching with axios.get and useEffect could be troublesome sometimes, so I used useQuery at the homepage  to fetch all data. With useQuery, I was able to fetch all fresh data without refreshing the homepage.

## Features to be added in the future or needed to improve

There are lots of things that I needed to improve in this project it includes:

- Adding DELETE button
- Password changer
- Make a better UI of my project
- More stronger validation and security for Login and Registration
- search bar and button
- filtering for faster search (ex: by category or by date or by title)
- Group by category (Example: pork,beef,fish,chicken or breakfast, lunch, snack, and dinner)
- Need a better state management that handles Authentication and CRUD Functions aside from using ContextProvider
- Add much more constraints of all data types in my code instead of using generic type "any"

<br>
<br>
<br>

## Login

![Alt text](/screenshots/login_new.PNG)<br>

## Register

![Alt text](/screenshots/register_new.PNG)<br>

## Home Page

![Alt text](/screenshots/dashboard_new.PNG)<br>

## Recipe 1

![Alt text](/screenshots/recipe_new1.PNG)<br>

## Recipe 2

![Alt text](/screenshots/recipe_new2.PNG)<br>

## User's Recipe List

![Alt text](/screenshots/userrecipes_new.PNG)<br>

## Profile Page

![Alt text](/screenshots/userprofile_new.PNG)<br>

## Update Profile

![Alt text](/screenshots/updateprofile_new.PNG)<br>

## Update Recipe

![Alt text](/screenshots/editrecipe_new.PNG)<br>

## Add Recipe

![Alt text](/screenshots/addrecipe_new.PNG)<br>

## Before Exporting Recipe to PDF

![Alt text](/screenshots/before_saving_recipe.JPG)<br>

## After Exporting

![Alt text](/screenshots/after_saving_recipe.JPG)<br>
