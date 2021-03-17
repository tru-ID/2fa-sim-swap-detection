# Adding SIM Swap Detection to your Web App's 2FA Login Flow with Twilio Verify & tru.ID SIMCheck API

## Requirements

The requirements for these project are:

- Node 10 or higher
- A [Twilio Account](https://www.twilio.com)
- A [tru.ID Account](https://tru.id)
- [SQLite3](https://www.sqlite.org/download.html)

## Getting Started

This project uses Twilio's [verify-v2-quick-start-node](https://github.com/TwilioDevEd/verify-v2-quickstart-node) as the base in the `starter-files` branch.

Clone the `starter-files` branch via:

```
git clone -b starter-files --single-branch https://github.com/tru-ID/sms-2fa-sim-swap-detection.git
```

If you're only interested in the finished code in `main` then run:

```
git clone -b main https://github.com/tru-ID/sms-2fa-sim-swap-detection.git
```

Next you need to configure Twilio using your account credentials.

Copy the values of `.env.example` into a `.env` file via:

```
cp .env.example .env
```

Open the `.env` file and configure the following values:

- `TWILIO_ACCOUNT_SID`: Your Twilio account SID found [here](https://www.twilio.com/console)
- `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token that can be found [here](https://www.twilio.com/console/)
- `VERIFICATION_SID`: This project uses Twilio Verify to send verification codes and to check their status - [create a service here](https://www.twilio.com/console/verify/services)

Next, Create a [tru.ID Account](https://tru.id)

Install the **tru.ID** CLI via:

```bash
npm i -g @tru_id/cli

```

Input your **tru.ID** credentials which can be found within the tru.ID [console](https://developer.tru.id/console)

Create a new **tru.ID** project via:

```
tru projects:create sms-2fa
```

configure the following values in your `.env`:

- `TRU_ID_CLIENT`: The client ID found in the `tru.json` file in the newly created **tru.ID** project.
- `TRU_ID_SECRET`: The client secret found in the `tru.json` file in the newly created **tru.ID** project.

Finally start up `sqlite3`

## Restoring Dependencies

In order to restore dependencies run:

```bash
npm install
```

This comes will also run Database migrations creating the `users` table.

If you would like to seed the project with a user:

Navigate to `seeders/createUser.js` and replace the `phoneNumber` value with your own `phoneNumber`

Next seed the database by running:

```
npm run seed
```

## Starting Project

In order to start the project run:

```bash
npm run linuxstart #for running on Linux machines e.g. Mac
# or
npm run winstart #for running on Windows machines
```

## References

- [**tru.ID** docs](https://developer.tru.id/docs)
- [Twilio's verify-v2-quick-start-node](https://github.com/TwilioDevEd/verify-v2-quickstart-node)

## Meta

Distributed under the MIT License. See [LICENSE](https://github.com/tru-ID/sms-2fa-sim-swap-detection/blob/main/LICENSE.md)

[**tru.ID**](https://tru.id)
