# Way-Farer  [![Build Status](https://travis-ci.org/joaquinto/Way-Farer.svg?branch=develop)](https://travis-ci.org/joaquinto/Way-Farer)  [![Maintainability](https://api.codeclimate.com/v1/badges/78445729bfe0eb071b2d/maintainability)](https://codeclimate.com/github/joaquinto/Way-Farer/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/78445729bfe0eb071b2d/test_coverage)](https://codeclimate.com/github/joaquinto/Way-Farer/test_coverage)  [![Coverage Status](https://coveralls.io/repos/github/joaquinto/Way-Farer/badge.svg?branch=develop)](https://coveralls.io/github/joaquinto/Way-Farer?branch=develop)
Way-Farer is a public bus transportation booking server.

___

**Features Implemented**
1. User sign up.
2. User sign in.
3. Admin can create a trip.
4. Admin can cancel a trip.
5. Both Admin and Users can see all trips.
6. Users can book a seat on a trip.
7. View all bookings. An Admin can see all bookings, while user can see all of his/her
bookings.
8. Users can delete their booking.
9. Users can specify their seat numbers when making a booking.
___


## Technologies Used
* [Node.js](https://nodejs.org/en/) - A runtime environment based off of Chromes's V8 Engine for writing Javascript server-side applications.
* [Express.js](https://expressjs.com/) - Web application framework based on Node.js.
* [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
* [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.

___


## Testing Tools
* [Mocha](https://mochajs.org/) - A JavaScript test framework.
* [Chai](https://www.chaijs.com/) - A test assertion library for JavaScript.
* [Chai-Http](https://www.npmjs.com/package/chai-http) - A module that provides high-level abstraction for HTTP testing.

___

## API Information
The API endpoints are hosted on Heroku - [WAY-FARER](https://way-farerapp.herokuapp.com/)

|METHOD  |DESCRIPTION                        |ENDPOINT                                  |
|------- |-----------------------------------|------------------------------------------|
|POST    |Sign Up                            |/api/v1/auth/signup                        |
|POST    |Sign In                            |/api/v1/auth/signin                        |
|POST    |Create a trip           |/api/v1/trips                         |
|GET   | Get all trips           | /api/v1/trips  |
|POST    | Book a seat on a trip        | /api/v1/bookings  |
|GET    | View all bookings                | /api/v1/bookings   |
|DELETE   | Delete a booking                    | /api/v1/bookings/:bookingId   |
|PATCH    | Cancel a trip        | /api/v1/trips/:tripId      |





|DESCRIPTION         |REQUIRED FIELDS                                                    |                 
|--------------------|-------------------------------------------------------------------|
|Sign Up             |firstname, lastname, email, password                              |
|Sign In             |email, password                                                    |
|Create a trip| trip id, bus id, origin, destination, trip date, fare   |
|Book a seat on a trip | trip id, seat number   |


___
## The Endpoints can be accessed remotely or locally.

#### Accessing the endpoints remotely via POSTMAN
You will need to have [POSTMAN](https://www.getpostman.com/downloads/) app installed on your computer.

##### Example 
###### Sign In
1. Launch POSTMAN
2. Click the dropdown menu to the left of the URL bar and select POST as a method.
3. To access the Sign In endpoint, at the end of WAY-FARER's URL attach the sign in endpoint to it as seen in step 4
4. https://way-farerapp.herokuapp.com/api/v1/auth/signin 
5. Then paste the full URL in the URL bar.
6. Click 'Body' tab below the URL, then select x-www-form-urlencoded radio button.
7. Fill in the required fields correctly.
8. Click the blue Send button to the right of the URL bar.
9. And wait for a response below.


#### Accessing the endpoints locally via POSTMAN

1. On the terminal of your computer, navigate into the cloned repo's folder
2. Click [npm](https://www.npmjs.com/get-npm) and [Node.js](https://nodejs.org/en/) to get npm and node respectively.
3. Clone WAY-FARER repo `https://github.com/joaquinto/Way-Farer.git` on your local machine.
4. Run `$ npm install` to install All of Way-Farer's dependencies.
5. Run `$ npm start` to power up the server.
6. The procedure for using POSTMAN here is the same as when accessing the endpoint remotely except that you make use of http://localhost:5000 as the full URL's prefix in place of the app's URL on heroku
e.g To access Sign In endpoint you will have a full URL like http://localhost:5000/api/v1/auth/signin

#### Test
You can locally run the test by running `npm test` in the cloned repo directory opened in a new terminal window while the server runs on the first window. It is important that the server is running for the tests to pass.

___

## Author
### Odjegba Jonathan (Joaquinto)
