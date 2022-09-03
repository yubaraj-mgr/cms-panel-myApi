# Api server for the ecommerce admin css

Here is the repo for the frontend app ....

## APIs

All the api lend points will follow the following patterns `{rootUrl}/api/v1`

### Admin user api

This api edpoint is responsifble for handeling all the admin user related request.

All the Admin api endpoints will follow the following patterns `{rootUrl}/api/v1/admin-user`

| #   | PATH            | VERB/METHOD | PRIVATE | DESCRIPTION                                                                                                                                                                            |
| --- | --------------- | ----------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.  | "/"             | POST        | NO      | Receives new admin data and create new admin in our database. If admin user's email already exist, it will return error otherwise it will return success with user info from database. |
| 2.  | "/verify-email" | PATCH       | NO      | Receives `{email, verificationCode}` to verify newly created user account, return success or error accordingly.                                                                        |
| 3.  | "/login"        | POST        | NO      | Receives `{email, password}` and checks if the user exist for that combination in our database, if it does it will handle all the login process.                                       |
