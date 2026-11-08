# Mellifera Sentinel

<p align="center">
  <img src="assets/logo.png" alt="Mellifera Sentinel" width="220">
</p>

A Discord honeypot with one job: if a member speaks in a channel you mark as a trap, the bot bans them and writes a staff log. It does not scan the rest of the server, and it does not guess whether a message looks like a scam.

Discord 誘餌頻道機器人。只盯一個你指定的頻道。一般成員在裡面發言就封鎖，並在管理員頻道留下紀錄。

## 行為

- 只比對 `TRAP_CHANNEL_ID`。
- 略過其他機器人、私訊、伺服器擁有者，以及具有 Administrator 的成員。
- 封鎖原因是「在誘餌頻道發訊息，疑似詐騙帳號」。
- 封鎖成功後刪除那則訊息。
- 若有設定 `ADMIN_LOG_CHANNEL_ID`，只送出被封鎖的人與 ID，不含原訊息。

Discord 的身分組階層會拒絕封鎖跟機器人同級或更高的成員，伺服器擁有者也封不掉。程式再略過擁有者與 Administrator，是為了避免自己測試時留下一筆失敗的封鎖。

頻道裡任何一句話都會觸發，包含「你好」。這個頻道不該開放給一般成員。

## 需求

- Node.js 20 或以上
- 機器人權限：Ban Members、View Channels、Read Message History、Send Messages、Manage Messages
- Developer Portal 打開 **Message Content Intent**
- 機器人的最高身分組要高於要封鎖的成員

邀請時不要勾 Administrator。

## 本地執行

```bash
npm install
copy .env.example .env
npm start
```

| 變數 | 必填 | 用途 |
| --- | --- | --- |
| `DISCORD_TOKEN` | 是 | Bot token。只放本機 `.env` 或主機的環境變數。 |
| `TRAP_CHANNEL_ID` | 是 | 誘餌頻道的 ID。 |
| `ADMIN_LOG_CHANNEL_ID` | 否 | 封鎖後通知的頻道。 |

頻道 ID：Discord 開啟 Developer Mode，對頻道按右鍵，Copy Channel ID。

`npm run check` 只做語法檢查。程序會聽 `PORT`（預設 3000）。`GET /` 和 `GET /health` 回 `ok`。

## 部署

這是一條要一直連著 Discord 的程序。會在閒置後關閉的免費網站空間不適合，Render 的免費 Web Service 就是這種。

作者用 [Wispbyte](https://wispbyte.com)。在伺服器的 GitHub 頁綁這個倉庫的 `main`，Startup 指令填 `npm start`，三個環境變數設在面板，並勾 Auto-update on startup。不要上傳 `.env`。推上 `main` 之後要在面板按一次 Restart，它才會拉新程式並重連。

## 安全

回報方式與日誌原則見 [SECURITY.md](SECURITY.md)。

## 授權

[MIT](LICENSE)。[MoYan1250](https://github.com/MoYan1250)。
