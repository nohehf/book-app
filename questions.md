# Questions
## Exercice 1
1.  What crucial security feature are we missing here ?  

Password encryption, here we store plain passwords in the database, which is critical in case of leaks for example.  
Any logged user can retrieve an other user info, wich can be non desirable.
2.  Could you explain in a few words how the server can authenticate a user based on the token ?  

the token corresponds to a hash of the user made with a private key only avilable to the server. The server recives the JWT token,
decryps it with the private key, and check if it corresponds to any known user
3.  Which other authentication methods do you know ?
OAuth,
SSO,
2FA

## Exercice 2


multipart/form-data