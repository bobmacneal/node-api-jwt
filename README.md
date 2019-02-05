# node-api-jwt

**node-api-jwt** is a scaffolding template for a nodeJs API that uses [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) 
(a.k.a, JWTs) for authentication. 

The API provides example endpoints to register, identify, and login a User (see _authController.js_) as well as endpoints 
to create, update, and delete a User (see _userController.js_). 

The API runs in [Express Js Server](https://expressjs.com/) on your local machine (or in a cloud instance). This example 
implements a private-public [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem) key pair for it's token signing _"secret"_. 

A User collection is stored in the [community edition](https://docs.mongodb.com/manual/administration/install-community/) 
of MongoDB running on your local machine or in a cloud instance.

# Setup

1. From a command shell, **clone** this repository: `git clone https://github.com/bobmacneal/node-api-jwt.git`
2. From a command shell, **navigate** to the project root of the clone repo: `cd node-api-jwt`
3. From a command shell, **install dependencies**: `npm i`
4. From the project root in your command shell, create a new **private key file**: `touch private.key`
5. From the project root in your command shell, create a new **public key file**: `touch public.key`
6. Generate a 512-bit **RSA private-public key pair*** [here](http://travistidwell.com/jsencrypt/demo/). Be sure to set
the key size to 512-bit before clicking Generate. Note that a larger key would be tougher to crack, but every doubling 
of key size slows the decryption step by ~ 6X.
7. **Copy/Paste** the entire contents (i.e., including -----BEGIN and -----END) of the generated **private key** into your 
**private.key** file created in step #4.
8. **Copy/Paste** the entire contents (i.e., including -----BEGIN and -----END) of the generated **public key** into your 
**public.key** file created in step #5.
9. Install the community edition of MongoDB on [MacOs](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/),
   [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/), or [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/) 
   per the instructions provided.
10. _Optionally_, you might choose to install the MongoDB database client [Compass](https://docs.mongodb.com/compass/master/install/).
 Compass makes it easy to view and modify database collections (i.e., the User collection in our case) and documents (i.e., User documents in our case).
   
11. From a new tab in your command shell, kick off the MongoDB service using: `mongod`
12. Back in the tab at the root of the project, spin up the API on your local express server: `npm run dev`. The _dev_ script
invokes [nodemon](https://nodemon.io/) to restart the server following any code updates.
13. Install an http client like [Insomnia](https://insomnia.rest/), [Postman](https://www.getpostman.com/downloads/), or 
[Paw](https://paw.cloud/#overview). Paw was used to create the screenshots in the endpoints documentation below.
14. Give it a try!

Using an http client, issue a GET request against the URL: `http://localhost:4000/api/v1/`
The API should return a **_200 OK_** along with  the message **_API v1 running_**.
 
Now try registering yourself (see register screen shot) using a POST against the `/api/v1/authentication/register` endpoint. After 
successfully registering, use the token you rec'd in the register response to verify that the token is recognized by the API as you 
using a GET against the `/api/v1/authentication/me` endpoint.


# Endpoints

### Register a new user:
Registers a user. Returns a valid token.

![register new user](/docs/register.png)

### Determine the user behind token:
With a user's _Bearer_ token submitted in the Authorization header, the API returns a user object. Note the Bearer token 
in the authorization header. The word Bearer is combined with the token returned upon registration (e.g., `Bearer eyJhbGciOiJSUzI1NiIsInR...`).

![get current user with token](/docs/auth.me.1.png)

Also note that your application name should be passed as a URL parameter called application (e.g., 
application=`application name`):

![get current user with token](/docs/auth.me.2.png)

Posting an application name in the request provides for an extra verification step on the server.

### Login:
Logs in a user. If the registered email and password match those stored in MongoDB, the API returns a valid token

![Login to recieve token](/docs/login.png)

### Users
Fetches all users store in the MongoDB user collection. 

![fetch all users](/docs/all.users.png)

Note that as a security measure, code was added to the User model to avert including the user's password hash in the response.

The three remaining endpoints in _userController.js_ (e.g., get by id, update, and delete) do not require a JWT token, 
however in most cases a token would be advisable to protect records from being updated or deleted by an unauthenticated user.


# References

- [Securing Node.js RESTful APIs with JSON Web Tokens](https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52).  
- [JSON Web Token (JWT) — The right way of implementing, with Node.js](https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e).
- [JWT](https://jwt.io/) - debugger / decoder
