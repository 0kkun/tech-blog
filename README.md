## 概要

- Teck Blog開発リポジトリ

## 環境情報

|*Tool*|*Version*|
|---|---|
|python|3.9.16|
|FastAPI|0.95.1|
|React|17.0.2|
|typescript|5.0.2|

## 環境構築

- .envがない場合は生成する

```
$ make env
```

```
$ make init
```

- 以下でログが見れることを確認

```
$ make log
```

## APIドキュメント

- 自動でSwaggerUIにて出力されている

> http://localhost:8080/docs

## コード規約

`PEP 8`が指針。`$ make format`を実行すること。
https://pep8-ja.readthedocs.io/ja/latest/

name|case|example
|---|---|---
変数名|スネークケース|user_name
メソッド名|スネークケース|get_name
クラス名|キャメルケース|UserProfile
ファイル名|スネークケース|user_profile.py

## テーブルの作成方法

- model fileの作成

- `backend/db/migrations/env.pyのimportにモデルクラスを追加する

- modelで定義したクラスをもとにmigration fileを生成する。

```
$ make auto-generate
```

- migrateの実行

```
$ make migrate
```