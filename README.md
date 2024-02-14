# Temp-Mail.org API for JavaScript (with Fetch API)

## Install
```
npm install temp-mail.org
```

## Usage

```js
import TempMail from 'temp-mail.org'

// Generate new mailbox
const client = await new TempMail().init()

// Email address
console.log(client.mailbox)

// Refresh inbox
await client.receive()
console.log(client.inbox)

// Get message object
const { _id } = client.inbox[0]
const data = await client.message(_id)
console.log(data)

// Destroy & Regenerate mailbox (new email address)
await client.init()
```