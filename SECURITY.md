# Security

## Reporting

請用 [GitHub Security Advisories](https://github.com/MoYan1250/mellifera-sentinel/security/advisories/new) 回報漏洞，不要開公開 issue，也不要把 token、頻道 ID 或日誌貼上來。

## Secrets

`DISCORD_TOKEN` 只放在本機 `.env` 或主機的環境變數。`.env.example` 只留空白鍵名。

Token 一旦進過 git、日誌、截圖或聊天，就當成已經外洩。到 Discord Developer Portal 的 Bot 頁面按 **Reset Token**，更新主機上的環境變數，並把含有舊 token 的 commit 從要公開的歷史裡拿掉。只在新 commit 刪除 `.env` 不夠，舊 commit 還讀得到。

## Logging

標準輸出不印 token、不印 token 前綴、不訂閱 discord.js 的 `debug` 事件，也不印誘餌頻道的訊息內文。管理員頻道只收到「誰被封鎖」。

## Scope

這個機器人會封鎖在誘餌頻道發言的一般成員。只邀請到你有管理權的伺服器，並把機器人的角色放在要封鎖的成員之上。伺服器擁有者與具 Administrator 權限的成員不會被封鎖。
