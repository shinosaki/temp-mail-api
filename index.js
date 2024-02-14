export class TempMail {
  constructor(options = {}) {
    this.API_HOST = 'https://web2.temp-mail.org'
    this.token = options.token
    this.mailbox = options.mailbox
    this.inbox = []

    return this
  }

  async api(path, opts = {}) {
    const req = new Request(this.API_HOST + path, opts)
    if (this.token) {
      req.headers.set('Authorization', `Bearer ${this.token}`)
    }

    return await fetch(req).then(r => r.json())
  }

  async init() {
    const { token, mailbox } = await this.api('/mailbox', { method: 'POST' })
    this.token = token
    this.mailbox = mailbox
    return this
  }

  async receive() {
    const { messages } = await this.api('/messages')
    this.inbox = messages
    return messages
  }

  async message(id) {
    return await this.api(`/messages/${id}`)
  }
}

export default TempMail