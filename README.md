# api-jwt

A nodeJs API that implements authentication via JWTs.

## Endpoints
### Register:
Registers a user. Returns a valid token.

![register new user](/docs/register.png)

### Auth.me
With a user's _Bearer_ token in the Authorization header, it returns a user object.

![get current user with token](/docs/auth.me.png)

### Login
Logs in a user. If email and password match those stored, it returns a valid token

![Login to recieve token](/docs/login.png)


### Storing Keys
There is a way to store keys outside of a node application on Heroku. Generate a key and store it in an environment variable 
which can be added with:

heroku config:add ENV_VAR_NAME=value


### References

- [Securing Node.js RESTful APIs with JSON Web Tokens](https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52).  
- [JSON Web Token (JWT) — The right way of implementing, with Node.js](https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e).
