# COOKBOOK - A Web Application

## A REACT TS Web application with PHP(PDO) REST API Authentication/CRUD and PDF Saver/exporter

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

- The frontend is hosted on vercel while my PHP files for backend is hosted on 000webhost

## INSTRUCTIONS

- The user need to register first, and then login
- When the user logged in they can either create a recipe or check other users recipe
- The user can also export or save other user's recipe in PDF

## PAGES SPECIFICATIONS

### HOME SECTION (DASHBOARD)

- A page where all of the users' recipes will be displayed. With the help of React Query, I can display data even without using useEffect Hook

### MY RECIPE (WITH USER PROFILE COMPONENT)

- The specific user's recipe will only be displayed in table form, where they can either view or edit the recipe
- Along with the recipes, it also have the users profile beside it. They can either change profile photo or edit their information

### ADD RECIPE

- It is only a form where a user can add recipes to be displayed on home page

## Challenges

    - Since PUT and DELETE METHOD is not supported on 000webhost for non premium users,  I used Axios.post for the update method. And as for the delete method , I replaced it with PDF export for now.
    - Fetching with axios.get and useEffect could be troublesome sometimes, so I used useQuery at the homepage  to fetch all data. With useQuery, I was able to fetch all fresh data without refreshing the homepage.

## Features to be added in the future or needed to improve

- DELETE button
- Password changer
- UI of my project
- More stronger validation and security for Login and Registration
- search bar and button
- filtering for faster search (ex: by category or by date or by title)
- Group by category (Example: pork,beef,fish,chicken or breakfast, lunch, snack, and dinner)
- Need a better state management that handles Authentication and CRUD Functions aside from using ContextProvider

<br>
<br>
<br>

## Login

![Alt text](/screenshots/login.JPG)<br>

## Register

![Alt text](/screenshots/register.JPG)<br>

## Home Page

![Alt text](/screenshots/homepage.JPG)<br>

## User's Recipe List and Profile

![Alt text](/screenshots/users_recipelist_and_profile.JPG)<br>

## Update Profile

![Alt text](/screenshots/update_profile.JPG)<br>

## Update Recipe

![Alt text](/screenshots/update_recipe.JPG)<br>

## Add Recipe

![Alt text](/screenshots/add_recipe.JPG)<br>

## Before Exporting Recipe to PDF

![Alt text](/screenshots/before_saving_recipe.JPG)<br>

## After Exporting

![Alt text](/screenshots/after_saving_recipe.JPG)<br>
