# api-jwt

This is scaffolding for a nodeJs API that has authentication via 
[JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) (a.k.a, JWTs). 

This example API runs in [Express Js Server](https://expressjs.com/) on your local machine or in a cloud instance. It 
uses a private-public [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem) key pair for it's token signing _"secret"_. 
A User collection is stored in the [community edition](https://docs.mongodb.com/manual/administration/install-community/) 
of MongoDB running on your local machine or in a cloud instance.


# Setup

1. From a command shell, **clone** this repo: `git clone https://github.com/bobmacneal/node-api-jwt.git`.
2. From a command shell, **navigate** to the project root: `cd node-api-jwt`.
3. From a command shell, **install dependencies**: `npm i`.
4. From the project root in your command shell, create a new **private key file**: `touch private.key`.
5. From the project root in your command shell, create a new **public key file**: `touch public.key`.
6. Generate a 512 bit **RSA private-public key pair [here](http://travistidwell.com/jsencrypt/demo/)**. Be sure to set
the key size to _512 bit_ before clicking Generate (Note that a larger key would be tougher to crack, but every doubling 
of key size slows decryption by ~ 6X).
7. **Copy/Paste** the entire contents (i.e., including -----BEGIN and -----END) of the generated **private key** into your 
**private.key** file created in step #4.
8. **Copy/Paste** the entire contents (i.e., including -----BEGIN and -----END) of the generated **public key** into your 
**public.key** file created in step #5.
9. Install the community edition of MongoDB on [MacOs](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/),
   [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/), or [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/).
10. _Optionally_, install the MongoDB database client [Compass](https://docs.mongodb.com/compass/master/install/) so that
 it's easy to view and modify database collections (i.e., User in our case) and documents (i.e., Users in our case).
   
11. From a new tab in your command shell, kick off the MongoDB service: `mongod`.
12. Back in the tab at the root of the project, kick off the API on the express server: `npm run dev`. The _dev_ script
invokes [nodemon](https://nodemon.io/) to restart the server following any code updates.
13. Install an http client like [Insomnia](https://insomnia.rest/), [Postman](https://www.getpostman.com/downloads/), or 
[Paw](https://paw.cloud/#overview). Paw was used for the screenshots below.
14. Give it a try!


# Endpoints

### Register:
Registers a user. Returns a valid token.

![register new user](/docs/register.png)

### Auth.me
With a user's _Bearer_ token in the Authorization header, it returns a user object.

![get current user with token](/docs/auth.me.png)

### Login
Logs in a user. If email and password match those stored, it returns a valid token

![Login to recieve token](/docs/login.png)

### Users


# References

- [Securing Node.js RESTful APIs with JSON Web Tokens](https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52).  
- [JSON Web Token (JWT) — The right way of implementing, with Node.js](https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e).
