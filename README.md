# Shortster

This docs present the Shortster API - URL shortening service. Its MVP, tech-stack and documentation, as well as assumptions and decisions taken during the creation process.

---

### 🔎`Table of contenets`

1. [Getting started](#getting-started)
2. [User stories](#user-stories)
3. [MVP](#mvp)
4. [Decision process](#decision-process)
5. [API Documentation](#api-documentation)
6. [Tests](#tests)
7. [Next steps](#next-steps)

---

### Getting started

Starting Shorster is very easy. Just run these commands in your terminal.

```bash
https://github.com/rafwit/shortster
cd shortster
npm install
npm start
```

Then navigate to `http://localhost:3001`

---

### User stories

API gives the user ability to:

- Share a long URL as a short URL so it's easier to copy/paste in emails.
- Customize the short URL to recall what URL it is referencing or give it a cool name.
- See a report of created short URLs, when it was created, and how many times it was clicked.

---

### MVP

✅ User can submit an URL and receive a unique shortcode in response. 

✅ User can submit an URL and shortcode and will receive the chosen shortcode if available. 

✅ User can access a `/:shortcode` endpoint and be redirected to the URL associated with that 

​	shortcode, if exists. 

✅ All shortcodes can contain digits, uppercase and lowercase letters. It is case sensitive. 

✅ Automatically allocated shortcodes are exactly 6 characters long. 

✅ User submitted shortcodes must be at least 4 characters long. 

✅ User can access a `/:shortcode/stats` endpoint in order to see when the shortcode was registered last 	accessed, and how many times it was used. 

---

### Decision process

As Shortster is as microservice in Movingworlds environment, hence assumption was made that the user is already authenticated and authorized to use the service. In addition, I decided to use database.

**Tech-stach**:

- Node.js with Express - backend environment where I currently feel most comfortable.
- MongoDB - scalable and developer friendly database; every shortcode is going to be unique, hence I opted for non-relational collection of objects.
- Jest - testing framework that I like to use.

---

### API Documentation

#### ➡ POST `'/'`

Get shortcode of your an URL

##### Request body example value

```json
{
  "originUrl": "www.movingworlds.org",
  "customUrl": "COOL"
}
```

If `customUrl` is `null` or omitted random 6 digit shortcode is generated in response. If `customUrl` is provided and with length in range 4-6 inclusive and it is not in use, Shortster will assign `originURL` to your provided `customUrl`.

##### Responses

Code:

- 200 OK

**Example value**

```json
{
  "_id": "60170addec5de55dacdc5484",
  "origin": "www.movingworlds.org",
  "origin_short": "Z5hgxJ",
  "created_at": "2021-01-31T19:54:05.704Z",
  "numbers_clicked": 0,
  "last_clicked": 0
}
```

- 400 Bad request

**Example value**

```json
{
  "code": 400,
  "message": "CustomUrl length must be in range 4-6 inclusive, provided customUrl length is: 3"
}
```

#### ⬅ GET `'/:shortcode'`

Get your original URL to use it to redirect to origin URL

##### Responses

Code:

- 200 OK

**Example value**

```json
{
  "origin": "www.movingworlds.org"
}
```

- 404 Not Found

**Example value**

```json
{
  "code": 404,
  "message": "This shortURL does not exist in our database."
}
```

#### ⬅ GET `'/:shortcode/stats'`

Get statistics of your Shortcode

##### Responses

Code:

- 200 OK

**Example value**

```json
{
  "_id": "601712226655756042af3234",
  "origin": "www.4ocean.com",
  "origin_short": "YWXmB3",
  "created_at": "2021-01-31T20:25:06.704Z",
  "numbers_clicked": 3,
  "last_clicked": 1612124731233
}
```

Value of `last_clicked` is return value of `Date.now()` method of last successful request to `/:shortcode`

- 404 Bad request

**Example value**

```json
{
  "code": 404,
  "message": "This shortURL does not exist in our database."
}
```

---

### Tests

Shortster includes extensive test suit.

- Integration tests
  - Shortcode generation algorithm. Core feature of Shortster is to provide unique shortcodes, hence it was heavily tested.
  - API controllers and models integration tests. This API cuold not serve its purpose without correct communication between server and database, therefore tests cover their interactions.
- Unit tests
  - Error handlers
  - Shortcode generators
  - Data model

------------

### Next steps

This part describes proposed next steps to take in order to further develop Shortster.

 💡 Develop browser client layer to increase user base

 💡 Develop cache to improve performance

 💡 Add authentication and authorization for increased security

 💡 Add e2e tests for maintance and stability
