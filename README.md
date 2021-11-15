# pwa-Backend
Backend of pwa app written with Node,express &amp; Mongo DB. you can find Frontend [here](https://github.com/chandra-teja/ProjectPwa).

# Deployment
Backend is deployed on [heroku](https://www.heroku.com/what) hosting platform using heroku CLI. We used [helmet](https://www.npmjs.com/package/helmet) to secure our app and [multer](https://www.npmjs.com/package/multer) for uploading images.

# Getting Started
download zip file or clone the repo and install node modules in root folder.
```bash
npm install
```

Open [2factor](https://2factor.in/v3/?at_category=2factor&at_event_action=spr&service=BULK-SMS-OTP-SERVICE-PROVIDER) create an account and get otp service for sending Login authentication.


create a .env file in root directory.
now create following variables inside .env file
```bash
url = <your database connecting URL>
API_KEY = <Api key which you get from 2factor.in>
HOST_NAME = 2factor.in
JWT_AUTH_TOKEN = 8ca903eb7e3c03a4ddfbcf893d570c91b6642d4d91bb5a8a2ed62148eb157b1c5bcb743a942e78281b19cf6b56dab05bfa666106da0f53d2e83e2a38ba68ac3a
JWT_REFRESH_TOKEN = 2d408d3709ca4555097af74ad481be167ce161d1a3570f30640e61a6c04a3bb06ed02a9c781f7b87586d1c2a436c079200053d9b8467f1f01bebaacf5617ac01


```
# References
- [Node.Js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/) - express is a framework for Node.Js.
- [Mongo DB](https://www.mongodb.com/) - Mongo Db is a NoSQL database.
- [Heroku](https://www.heroku.com/what) - Hosting platform
