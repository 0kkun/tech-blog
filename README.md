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

## アーキテクチャ

DDDを採用。

```
root/
    ├── main.py  # FastAPIアプリケーションのエントリーポイント
    ├── app/
    │    ├── __init__.py
    │    ├── api/  # APIエンドポイントのためのディレクトリ
    │    │    ├── __init__.py
    │    │    └── v1/  # APIのバージョン1のディレクトリ
    │    │         ├── __init__.py
    │    │         └── endpoints/  # APIエンドポイントの実装
    │    │              ├── __init__.py
    │    │              ├── user.py  # ユーザーに関するエンドポイント
    │    │              └── item.py  # 商品に関するエンドポイント
    │    ├── core/  # ドメインモデル、リポジトリ、サービス
    │    │    ├── __init__.py
    │    │    ├── models/  # ドメインモデルのクラス
    │    │    │    ├── __init__.py
    │    │    │    ├── user.py  # ユーザーに関するモデル
    │    │    │    └── item.py  # 商品に関するモデル
    │    │    ├── repositories/  # ドメインリポジトリの実装
    │    │    │    ├── __init__.py
    │    │    │    ├── user_repository.py  # ユーザーリポジトリ
    │    │    │    └── item_repository.py  # 商品リポジトリ
    │    │    └── services/  # ドメインサービスの実装
    │    │         ├── __init__.py
    │    │         ├── user_service.py  # ユーザーサービス
    │    │         └── item_service.py  # 商品サービス
    │    └── infrastructure/  # データベース、外部APIなどの実装
    │         ├── __init__.py
    │         ├── database/  # データベース接続とモデル
    │         │    ├── __init__.py
    │         │    ├── migrations/ # マイグレーションファイル
    │         │    ├── database.py  # データベース接続
    │         │    └── schema_model/ # データベースのスキーマモデル
    │         │         ├── item_model.py
    │         │         └── user_model.py
    │         └── external/  # 外部API接続など
    │              ├── __init__.py
    │              └── external_api.py  # 外部API接続クラス
    ├── config/
    └── util/
```