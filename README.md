# store-api

Evaluarion test for backend Dev using **nodejs + mongoDB**

In order to run locally this project you must follow the next steps:
----------------------------------------------------------------------
*MongoDB has to be installed in your computer*

1.-clone this repo to your computer
------------------------------------

2.-get into the project folder :
------------------------------------
    cd store-api

3.- restore the database (MongoDB) :
    execute this command : 
----------------------------------------------------
    mongorestore ~/wherever/your/project/is/database/first_backup/

4.- execute in your terminal (this will download the required packages):
---------------------------------------
    npm install 

5.-then to run locally execute :
-----------------------------------
    node server/server

6.-and there you go, now you can perform request using postman.
-----------------------------------------------------------------



**AVAILABLE REQUEST**
------------------------------------------------------------
https://www.getpostman.com/collections/22a4d06927919e5d8f8d

1.- Add Product:
-------------------------------------------
    POST : localhost:3000/product
    body : {
                "name" : "crackers",
                "description":"cookies",
                "price" : 0.95,
                "quantity" : 12
            }
    headers: {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }

{{token}} : should be changed by a valid token

to get a new token you must need to get login with a valid user,
only users with ADMIN_ROLES can perform this action


2.- Remove Product:
-------------------------------------------
    DELETE  : localhost:3000/product/{{id}}

    headers : {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }

{{token}} : should be changed by a valid token

to get a new token you must need to get login with a valid user,
only users with ADMIN_ROLES can perform this action


3.- Modify the Stock quantity
-------------------------------------------
    PUT  : localhost:3000/product/stock/{{id}}
    body : {
                "quantity" : 11
            }
    headers : {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }
{{id}} : should be changed by a valid product id

{{token}} : should be changed by a valid token

to get a new token you must need to get login with a valid user,
only users with ADMIN_ROLES can perform this action


4.- Modify the price of products
-------------------------------------------
    PUT  : localhost:3000/product/price/{{id}}
    body : {
                "price" : 0.95
            }
    headers : {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }
{{id}} : should be changed by a valid product id

{{token}} : should be changed by a valid token

to get a new token you must need to get login with a valid user,
only users with ADMIN_ROLES can perform this action


5.- Purchase a Product
-------------------------------------------
    PUT  : localhost:3000/product/purchase/{{id}}
    body : {
                "quantity" : 1
            }
    headers : {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }
{{id}} : should be changed by a valid product id

{{token}} : should be changed by a valid token

to get a new token you must need to get login with a valid user,
only users with ADMIN_ROLES can perform this action

6.- Like a Product
-------------------------------------------
    POST  : localhost:3000/like/{{id}}

    headers : {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }
{{id}} : should be changed by a valid product id

{{token}} : should be changed by a valid token

to get a new token you must need to get login with a valid user,
only users with ADMIN_ROLES can perform this action


7.- List of available products
-------------------------------------------
    GET  : localhost:3000/product/availables?from={{from}}&step={{step}}

    headers : {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }
List of Available Products.
{{from}} : is the initial boundary, by default is zero if you don't pass the key-pair value
{{step}} : is the final boundary, by default is 5 if you don't pass the key-pair value


8.- Search Products by Name
-------------------------------------------
    GET  : localhost:3000/product/search/{{name}}

    headers : {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }
{{name}} need to be change by a name, it doesn't matter if is just one part of a name.


9.- Create Users
-------------------------------------------
    POST  : localhost:3000/user
    body : {
                "name" : "Ambar Artiga",
                "email" : "Ambar@gmail.com",
                "password" : "qwerty1234",
                "role" : "USER_ROLE"
            }
    headers : {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }
This is helpful to create a new user and their roles.
the Actual Valid Roles are :
ADMIN_ROLE
USER_ROLE


10.- Login
-------------------------------------------
    POST  : localhost:3000/login?email={{email}}&password={{password}}
    headers : {
                Content-Type : "application/x-www-form-urlencoded",
                token : {{token}}
             }
login and get a valid token to get access to many apis
{{email}}: the email need to be change for a valid that exists in the DB 
{{password}} : need to be change for the password that come along with the email as well


List of products:
---------------------------------------------
GET :
-   localhost:3000/products
-   localhost:3000/likes
-   localhost:3000/log/prices/product
-   localhost:3000/log/prices/product/{{id}}
-   localhost:3000/log/purchase/products
-   localhost:3000/log/purchase/products/{{id}}
