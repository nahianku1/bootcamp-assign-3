### Car Booking Management REST API:

---

This is a simple **Car Booking Management** api. Admin can create car, update car and delete car. User can also get car booked by their `Id`. Admin can get all cars booked by users. When car returned by user admin can update car accordingly.

### Features:

- The app has two user role (admin | user) and anyone can register and login with their credential.
- Admin can create car, update car and delete car.
- User can book car.
- User can view their booked car.
- When car is returned by user admin can update the car accordingly.

### Technology Used:

- NodeJS.
- Typescript.
- ExpressJS.
- JWT Authentication.
- MongoDB as primary database.
- Mongoose as ODM.
- ZOD Validation.
- GIT Hub Action for CI/CD.

### How to run locally:

###### Create a new environment file and put it these variables:

```javascript
DB_URL=<DB URL>
PORT=<PORT>
BCRYPT_SALT_ROUNDS=<BCRYPT SALT>
JWT_ACCESS_SECRET=<ACCESS TOKEN>
JWT_REFRESH_SECRET=<REFRESH TOKEN>
JWT_ACCESS_TOKEN_EXPIRES=<ACCESS TOKEN EXPIRY>
JWT_REFRESH_TOKEN_EXPIRES=<REFRESH TOKEN EXPIRY>
NODE_ENV=<NODE ENVIRONMENT>


```

###### You have to run these commands to run typescript locally:

```javascript
npm install
npm run dev
```

###### You have to run these commands to run javascript locally:

```javascript
  npm run build
  npm start
```

###### You have to run this command for linting:

```javascript
  npm run lint
```

### Links:

###### Deployment: [Live Link](https://bootcamp-assign-3.vercel.app/)

