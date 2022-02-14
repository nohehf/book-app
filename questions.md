# Questions
## Exercice 1
### Special instructions:
If you want the following query to work:
```bash
curl -d '{"email":"jean@my-school.com", "password":"my-password"}' \
-H "Content-Type: application/json" -X POST \ 
"http://localhost:3000/login"
```
You first must create this user:
```bash
curl -d '{"email":"jean@my-school.com", "password":"my-password"}' \
-H "Content-Type: application/json" -X POST \ 
"http://localhost:3000/register"
```

1.  What crucial security feature are we missing here ?  

Password encryption, here we store plain passwords in the database, which is critical in case of leaks for example.  
Any logged user can retrieve an other user info, wich can be non desirable.  

2. Could you explain in a few words how the server can authenticate a user based on the token ?  

the token corresponds to a hash of the user made with a private key only avilable to the server. The server recives the JWT token,
decryps it with the private key, and check if it corresponds to any known user

3. Which other authentication methods do you know ?  

OAuth,
SSO,
2FA

## Exercice 2
1. What is the required header for sending binary files over an HTTP request ? 

form-data  

2. What are the security flaws of the upload endpoint (if you meet precisely the validation criteria of the exercise) ?  

Everybody logged in can (for now) upload a file.
Also, we could probably think of uploading pdfs containing malwares.

## Exercice 3 
1. There are many ways to securize an endpoint in NestJS, can you mention two of them and common scenarios where they fit well ?  

Roles -> Allows different users to interact with different sections.
Middlwares -> Allow to intercept the request before the handler, for example to prevent the user for submiting malicious or incorrect
data (cross site scripting for example)

## Bonus 
1. If you were to deploy for real such an application, what would you need to change in it ?  

Actually a lot, first they are still many potential security issues such as the fact that anny loggued user can retrieve an other user infos via `GET /users/:id`. And the other security issues mentioned above.

Then I will change the database, sqlite not being known to be the best one for production needs.

Also, I will write automatic testing scripts, and combine it with CI/CD features.


2. For sake of simplicity, our persistence layer is very light (knex + sqlite). Would you have made a different choice for your own application ? Why ?  

As said above, sqlite is not known to be the more production ready database (at least I think but maybe I'm wrong). But this depends also a lot on the application needs, and if the database usage is rather small it should be sufficient. If not something like postegreSQL could fit the needs.  

3. The application is not tested, but if you had to provide a covered application, how would you have proceeded ? (what to test ?, what testing tools to use ?)  

For manual testing I used postman, but for automatic testing we could use nest included tools. 

4. The repository features minimal dev experience, what would you have added for improving DX ? 

CI as mentioned above, some commit linting, a great readme, and more importantly, as this is an api, auto generated docs served on some static server.