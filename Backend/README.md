# BANTULINK API

## Endpoint

54.255.179.252:5000

## Register User

**Request** :

- Endpoint : `/users`
- Method : POST
- Header :
  - Content-Type: application/json | application/x-www-form-urlencoded
  - Accept: application/json
- Body :

```json
{
  "fullname": "string",
  "email": "string, unique",
  "password": "string, minlenght(6)",
  "phone_number": "string pattern(/^(?:+62|62|0)[2-9][0-9]{8,12}$/)", //+62, 62, atau 0 diikuti 8-12 digit
  "gender": "string",
  "address": "string, minlenght(10)"
}
```

**Response** :

```json
{
  "status": "success",
  "message": "User berhasil ditambahkan",
  "data": {
    "userId": "user-hEAW5bCYLb_w3Mma"
  }
}
```

**=======================================================================================**

## Get User Profile

**Request** :

- Endpoint : `/users/{userId}`
- Method : GET
- Header :
  - Accept: application/json

**Response** :

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user-S0SSViM-ZJqJ2mgl",
      "fullname": "User Test",
      "email": "usertest@gmail.com",
      "phone_number": "081266677738",
      "address": "jl. merak no 21 medan"
    }
  }
}
```

**========================================================================================**

## Update User Profile

**Request** :

- Endpoint : `/users/{userId}`
- Method : PUT
- Header :
  - Accept: application/json
  - Content-Type: application/json | application/x-www-form-urlencoded
- Body :

```json
{
  "fullname": "string",
  "email": "string, unique",
  "password": "string, minlenght(6)",
  "phone_number": "string pattern(/^(?:+62|62|0)[2-9][0-9]{8,12}$/)", //+62, 62, atau 0 diikuti 8-12 digit
  "gender": "string",
  "address": "string, minlenght(10)"
}
```

**Response** :

```json
{
  "status": "success",
  "message": "Profile berhasil di Update"
}
```

**=======================================================================================**

## Login User

**Request** :

- Endpoint : `/authentications`
- Method : POST
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "email": "string",
  "password": "string"
}
```

**Response** :

```json
{
  "status": "success",
  "message": "Authentication berhasil ditambahkan",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummyAccessToken",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummyRefreshToken"
  }
}
```
