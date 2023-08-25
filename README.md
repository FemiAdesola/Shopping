# Shopping Project

![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.14-drakblue)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![bootswatch.com](https://img.shields.io/badge/Bootswatch-v.4.0-blue)

## Table of content

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Installation](#installation)
- [Getting started](#getting-started)

## Introduction

## Technologies
- Backend
    + PostgreSQL
    + ASP .NET Core, 
    + Entity Framework Core
    + Stripe
- Frontend
    + RectJS
    + Bootsrap (for design and styling)
    + TypeScript
    + Redux
    + react-router-dom
    + Redux RTK Query
    + jwt-decode
    + bootswatch.com
    + React Stripe


## Installation
- Steps to perform the installation for the `Backend`
    + Register the database server with PostgreSQL
    + Check your local machine for .NET Core compatibility from microsoft webiste
    + Create an `appsettings.json` file in to main root like [example.json](/FullStack/Backend/example.json) file
    + Perform these following commands
        1. dotnet restore
        2. dotnet build
        3. dotnet run
    + For database migration
        1. dotnet ef migrations  add [added new name here]
        2. dotnet ef database update
- Steps to perform the installation for the `Frontend`
    + Install all the dependencies
        1. Write `npm install` on your terminal 
    + Runs the app in the development mode.
        1.  Write `npm start` on your terminal 

## Getting started
- Users have to generate a token and insert it before they could be able to get total access to all the functionality at backend.

### Frontend product page

![Frontend](/FullStack/img/FrontPage.png)

### Product page by admin user

+ Only admin can update or delete the product

![Frontend](/FullStack/img/Productlist.png)

### Order list page by admin user

+ Only admin can view this page 

![Frontend](/FullStack/img/Orderlist.png)

### Order Summary page by admin user

+ Only admin can view this page, by following the processing 

![Frontend](/FullStack/img/OrderSummary.png)

+ For customer order's summary page 

![Frontend](/FullStack/img/Usersummary.png)
