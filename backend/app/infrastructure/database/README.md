## migration作成方法


1. `backend/infrastructure/database/schema_model` にて、生成したいスキーマモデルを実装する

2. `backend/infrastructure/database/migration/env.py` にて、以下のように追加したモデルをimportする

    ```
    from infrastructure.database.schema_model import user
    ```

3. `make migrate-file` コマンドを実行し、migrationのコメントを入れて実行する
    ```
    $ migrate-file
    Enter the migrate title: create user
    ```

4. `make migrate` を実行するとmigrationに沿ったテーブルが生成される
