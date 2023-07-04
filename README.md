# 概要

- Teck Blog開発リポジトリ

# 環境情報

|*Tool*|*Version*|
|---|---|
|python|3.9.16|
|FastAPI|0.95.1|

# 環境構築

- .envがない場合は生成する

```
$ make env
```

```
$ make init
```

# APIドキュメント

- 自動でSwaggerUIにて出力されている

> http://localhost:8080/docs

# コード規約

`PEP 8`が指針。
https://pep8-ja.readthedocs.io/ja/latest/

name|case|example
|---|---|---
変数名|スネークケース|user_name
メソッド名|スネークケース|get_name
クラス名|キャメルケース|UserProfile
ファイル名|スネークケース|user_profile.py
