# peer-sms-call

## Getting Started

A simple sms and call application. User's basically can send free sms and make a free call. Powered by Twilio API.

## Images

<div align="center"> 
 <img src="https://user-images.githubusercontent.com/103638111/225198937-1565c7ad-08d8-408d-906b-1e58cfd23f20.png" alt="screenshot" />
</div>

## Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/Arianejay/Peer-SMS-Call-React-NodeJS.git
cd client
npm install
cd server
npm install
```

## Available Scripts

-   `dev` - runs the app

## Technologies
## Client Side

-   [Vite][Vite]
-   [Socket.io-client][Socket.io-client]
-   [Sass][Sass]
-   [Twilio-Voice-Sdk][Twilio-Voice-Sdk]
-   [Typescript][Typescript]

## Server Side

-   [NodeJS][NodeJS]
-   [Socket.io][Socket.io]
-   [Twilio][Twilio]
-   [Typescript][Typescript]

## Todos

-   [ ] Fix call function
-   [ ] Fix maximum character count

# env

```sh
// server
TWILIO_ACCOUNT_SID="XXXXXX"
TWILIO_AUTH_TOKEN="XXXXXX"
TWILIO_PHONE_NUMBER="+XXXXXX"
TWILIO_API_KEY="XXXXXX"
TWILIO_SECRET="XXXXXX"
TWILIO_APP_SID="XXXXXX"
```

[Vite]: https://vitejs.dev/
[Sass]: https://sass-lang.com/
[Twilio-Voice-Sdk]: https://www.npmjs.com/package/@twilio/voice-sdk
[Twilio]: https://www.npmjs.com/package/twilio
[NodeJS]: https://nodejs.org/en/
[socket.io]: https://www.npmjs.com/package/socket.io
[socket.io-client]: https://www.npmjs.com/package/socket.io-client
[Typescript]: https://www.typescriptlang.org/
