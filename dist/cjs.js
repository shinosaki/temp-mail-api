var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var work_exports = {};
__export(work_exports, {
  TempMail: () => TempMail,
  default: () => work_default
});
module.exports = __toCommonJS(work_exports);
class TempMail {
  constructor(options = {}) {
    this.API_HOST = "https://web2.temp-mail.org";
    this.token = options.token;
    this.mailbox = options.mailbox;
    this.inbox = [];
    return this;
  }
  async api(path, opts = {}) {
    const req = new Request(this.API_HOST + path, opts);
    if (this.token) {
      req.headers.set("Authorization", `Bearer ${this.token}`);
    }
    return await fetch(req).then((r) => r.json());
  }
  async init() {
    const { token, mailbox } = await this.api("/mailbox", { method: "POST" });
    this.token = token;
    this.mailbox = mailbox;
    return this;
  }
  async receive() {
    const { messages } = await this.api("/messages");
    this.inbox = messages;
    return messages;
  }
  async message(id) {
    return await this.api(`/messages/${id}`);
  }
}
var work_default = TempMail;
