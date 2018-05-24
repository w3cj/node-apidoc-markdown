<a name="top"></a>
# apidoc-example v0.3.0

apidoc example project

- [User](#user)
	- [Read data of a User](#read-data-of-a-user)
	- [Create a new User](#create-a-new-user)
	- [Change a new User](#change-a-new-user)
	


# <a name='user'></a> User

## <a name='read-data-of-a-user'></a> Read data of a User
[Back to top](#top)

Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.

	GET /user/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  id | String | The Users-ID.|
### Examples

CURL example:

```
   curl -i -X POST http://localhost:3001/example
        -H 'Content-Type: application/json' \
        -d '{ "id": "4711" }'

```

### Param Examples

(json)
Param example:

```
{
  "group": Paramter,
  "type": String
  "filed": id,
  "optional": false,
  "description": The Users-ID.
}
```

### Success Response

Success-Response (example):

```
   HTTP/1.1 200 OK
   {
     "id": "4711"
     "registered": "31.01.2013"
     "name": "John Doe"
   }

```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  id | String | The Users-ID.|
|  registered | Date | Registration Date.|
|  name | Date | Fullname of the User.|

### Error Response

Error-Response (example):

```
   HTTP/1.1 401 Not Authenticated
   {
     "error": "NoAccessRight"
   }

```
## <a name='create-a-new-user'></a> Create a new User
[Back to top](#top)

In this case "apiErrorStructure" is defined and used.
Define blocks with params that will be used in several functions, so you dont have to rewrite them.

	POST /user





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  name | String | Name of the User.|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  id | String | The new Users-ID.|

### Error Response

 Response (example):

```
   HTTP/1.1 400 Bad Request
   {
     "error": "UserNameTooShort"
   }

```
## <a name='change-a-new-user'></a> Change a new User
[Back to top](#top)

This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"

	PUT /user/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  name | String | Name of the User.|




### Error Response

 Response (example):

```
   HTTP/1.1 400 Bad Request
   {
     "error": "UserNameTooShort"
   }

```
