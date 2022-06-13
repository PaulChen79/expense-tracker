# 老爸的私房錢

這是一個使用 express 與 Node.js 打造的網頁記帳 App
使用者可以註冊自己的帳號來登入使用

使用者可以查看自己的總支出、每筆支出細節，以及新增、編輯、刪除、分類查看支出細節

## Images 網頁圖片

![image](./static/localhost_3000_home.png)
![image](<./static/localhost_3000_users_login%20(1).png>)
![image](./static/localhost_3000_records_new.png)

### Installing 安裝流程

先將此專案 Clone 到主機的資料夾

```
git clone 此專案連結
```

在下載的資料夾底下安裝 dependencies

```
npm install
```

下載完成後新增一個.env，放入 MONGODB_URI，連結你的 mongoBD

```
MONGODB_URI = mongodb+srv://<你的mongoDB帳號>:<你的mongoDB密碼>@cluster0.xxxx.xxxx.net/<你的MongoDB Table><?retryWrites=true&w=majority
```

連結完成後使用以下 command 生成種子資料

```
npm run seed
```

種子資料會有 2 個 user 資料：

```
{
		name: 'user1',
		email: 'user1@example.com',
		password: '12345678'
	},
	{
		name: 'user2',
		email: 'user2@example.com',
		password: '12345678'
	}
```

種子資料完成後執行 add.js 檔案

```
npm start
```

如果 ternimal 有出現 "Server is running on port 3000" 字樣，即可在 http://localhost:3000 看到此網頁

## Features 功能

-首頁可以瀏覽所有支出項目以及總支出  
-可以分類顯示不同類別的支出，總支出會依不同種類變化  
-可以新增新的支出  
-可以編輯單筆支出的詳細資訊  
-可以刪除你想刪除的支出

## Dependencies 使用套件

Node.js v4.16.0  
express  
express-handlebars  
express-session  
connect-flash  
dotenv  
method-override  
mongoose  
passport  
modemon  
bycryptjs

## Contributor 開發人員

Pin Hsu Chen & AC
