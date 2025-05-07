FROM node:20

# 作業ディレクトリを作成
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# TypeScriptのインストール
RUN npm install -g typescript

# アプリケーションのコードをコピー
COPY . .

# アプリケーションのポートを開放
EXPOSE 4000

# ts-nodeでアプリケーションを起動
CMD ["npm", "run", "start"]
