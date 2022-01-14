# 導入
[Node.js](https://nodejs.org/ja/)の導入が済んでいない場合は、インストールしてください。
開発はv16.3.1 Ubuntuで行っています。 
MySQLが必要なため、こちらの導入も済んでいない場合はインストールしてください。
1. 適当なディレクトリへ`git clone`します
1. `cd na2na_tools`します
1. `cp sql/sample.sql sql/production.sql`します
1. `sql/production.sql`の下部にあるユーザーを適切なユーザー/パスワードに変更してください。
1. `cp .env_sample .env`して、中のコメントを参考に設定してください。2の手順で設定したDBユーザー/パスワードを使用してください。
1. `npm install`します
1. `npm run build`します
1. `npm start`します
1. ローカルホストの`.env`で設定したポートへ接続し、表示されれば正常に動いています。

# TODO
- [ ] [待機リスト] リスト削除時のアラートが意味をなしていない問題の対処
