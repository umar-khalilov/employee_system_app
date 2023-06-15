## Description

Vanilla Node.js REST API in which you can manage employees

### Requirements

Node.js 20 version

### Installing the dependencies

```bash
$ yarn install
```

### Running the app in development mode

```bash
$ yarn start:dev
```

### Running the app in production mode

```bash
$ yarn build
$ yarn start:prod
```

### Documentation

#### Base route

```http request
 http://localhost:4000/api
```

#### Sign in route - POST

```http request
 http://localhost:4000/api/sign-in
```

-   {
    "email": "test0@gmail.com",
    "password": "3f4Ij40)LW_2!i0"
    }

#### Sign up route - POST

```http request
 http://localhost:4000/api/sign-in
```

-   {
    "name": "Arnold",
    "email": "first1@gmail.com",
    "salary": 145000,
    "currency": "USD",
    "department": "Engineering",
    "sub_department": "Platform",
    "password": "3f4Ij40)LW_2!i1"
    }

### Attention!!!

1. After sign in or sign up you get auth data with token.
2. Other routes is protected. Therefore you need insert this token
   to header as {"Authorization": "Bearer **_token_**"} and exec protected requests.

#### Get all employees - GET

1. Without query params you get all employees!
2. Available params for search:

-   department (enum):
    Engineering,
    Banking,
    Operations,
    Administration.

-   subdepartment (enum):  
    Platform,
    Loan,
    CustomerOnboarding,
    Agriculture.

-   contract (enum): true, false.

```http request
http://localhost:4000/api/employees
```

```http request
http://localhost:4000/api/employees?department=Banking
```

#### Get one employee by id - GET

```http request
http://localhost:4000/api/employees/1
```

#### Update one employee by id - PUT

```http request
http://localhost:4000/api/employees/1
```

-   {
    "name": "Arnold",
    "email": "first1@gmail.com",
    "salary": 145000,
    "currency": "USD",
    "department": "Engineering",
    "sub_department": "Platform",
    "password": "3f4Ij40)LW_2!i1"
    }

#### Delete one employee by id - DELETE

```http request
http://localhost:4000/api/employees/1
```
