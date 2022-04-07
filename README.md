# expense-tracke

本專案提供特定使用者記帳管理

## 基本功能
。註冊帳號
  註冊之後，可以登入/登出

。使用者能在首頁一次瀏覽所有支出的清單

。使用者能：
  。在首頁看到所有支出清單的總金額
  。新增一筆支出 
  。編輯支出的屬性 
  。刪除任何一筆支出 
  。根據「類別」篩選支出(總金額的計算只會包括被篩選出來的支出總和)

### Installing

Clone the repo

Open the project's root directory

Use npm to install dependencies

```
npm install
```

Run the project

```
npm run dev
```

That's it, now the app should be running on http://localhost:3000

## 使用工具

  "bcryptjs": "^2.4.3",
  "connect-flash": "^0.1.1",
  "dotenv": "^8.2.0",
  "express": "^4.17.2",
  "express-handlebars": "^4.0.2",
  "express-session": "^1.17.1",
  "method-override": "^3.0.0",
  "mongoose": "^6.1.5",
  "passport": "^0.4.1",
  "passport-facebook": "^3.0.0",
  "passport-local": "^1.0.0"
