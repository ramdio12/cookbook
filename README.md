# COOKBOOK - A Web Application

## A REACT TS Web application with PHP(PDO) REST API Authentication/CRUD and PDF Saver/exporter

## USED

- React Typescript
- Tailwind CSS
- TanStack Query v3
- PHP
- MySQL
- Axios
- React to Print

## Description

- This project is purposely for food enthusiasts and those who wanted to learn how to cook. Anyone can share their homemade recipes. Not only the user can create a recipe note but they can also download other user's recipe as well in PDF

## ALGORITHM

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

## Features to be added in the future or needed to improve

- DELETE : PUT and DELETE METHOD is not supported on 000webhost for non premium users, so as for the update method I use POST Method. And for the delete method , I replaced it with PDF export for now.
- Password changer
- UI of my project
- Strong validation and security for Login and Registration

###

![Alt text](/screenshots/add_recipe.JPG)<br>
