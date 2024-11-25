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
  "phone_number": "string",
  "gender": "string",
  "address": "string"
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
