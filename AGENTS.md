# 兩個倉庫

這個資料夾同時接著私有部署倉庫和公開作品集。先看 `git branch` 和 `git remote -v`，再決定要推哪一邊。

## 私有：部署

- remote：`origin`
- 倉庫：`MoYan1250/Mellifera_Sentinel`
- 分支：`master`
- 維持 Private。不要改可見性，不要 force-push。
- 這條歷史裡有過 `.env`。禁止把 `master` 或這條歷史推到公開倉庫。
- 只有使用者明確說要推私有倉庫時，才執行 `git push origin master`。

## 公開：作品集

- remote：`portfolio`
- 倉庫：`MoYan1250/mellifera-sentinel`
- 本地分支：`portfolio-main`
- 遠端分支：`main`
- 只有使用者明確說要更新公開版時，才推這一邊。
- 推之前用 `git ls-tree -r --name-only HEAD` 確認沒有 `.env`。公開歷史裡也不能有 `.env`。
- 不要把 `origin/master` merge 進 `portfolio-main`。在 `master` 改完後，只把要公開的檔案帶到 `portfolio-main`，再 `git push portfolio portfolio-main:main`。

## 秘密

- 不把 `.env`、bot token、頻道訊息內文寫進 commit、README、日誌或回覆。
- token 只留在本機 `.env` 和 Wispbyte 的環境變數。
