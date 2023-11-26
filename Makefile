include .env

MYSQL_ROOT_LOGIN_CMD = mysql -u root -p$(MYSQL_ROOT_PASSWORD)
MYSQL_USER_LOGIN_CMD = mysql -u $(MYSQL_USER_NAME) -p$(MYSQL_PASSWORD) $(MYSQL_DB_NAME)
DCE = docker compose exec
DEI = docker exec -it

# *****************************
# *      For First Build      *
# *****************************

# .envがなければ生成する
.PHONY: env
env:
	@if [ -e .env ] ; then \
		echo ".env already exists"; \
	else \
		cp .env.example .env; \
	fi

.PHONY: init
init:
	@make down
	@make build_c
	@make up
	@make migrate


# *****************************
# *     Container Controll    *
# *****************************
.PHONY: build_c
build_c:
	docker-compose build --no-cache --force-rm

.PHONY: build
build:
	docker compose build

.PHONY: up
up:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose stop

.PHONY: down
down:
	docker-compose down --remove-orphans

.PHONY: backend
backend:
	$(DCE) $(BACKEND_SERVICE_NAME) bash

.PHONY: db
db:
	$(DCE) db bash

.PHONY: restart
restart:
	@make down
	@make up

.PHONY: frontend
frontend:
	$(DCE) $(FRONTEND_SERVICE_NAME) bash

# *****************************
# *     Backend Controll    *
# *****************************
.PHONY: log
log:
	docker compose logs -f $(BACKEND_SERVICE_NAME)

.PHONY: format
format:
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "yapf --exclude '/app/app/infrastructure/database/migrations/*.py,/app/app/infrastructure/database/schema_model/*.py' -i -r ."

.PHONY: black
black:
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "black ."

# *****************************
# *      Python Command      *
# *****************************

.PHONY: migrate-init
migrate-init:
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "cd app/infrastructure/database && alembic init migrations"

# schema配下を読み取って自動でmigrationファイルを生成する
.PHONY: auto-generate
auto-generate:
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "cd app/infrastructure/database && alembic revision --autogenerate"

# migrations配下を読み取ってmigrationを実行する
.PHONY: migrate
migrate:
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "cd app/infrastructure/database && alembic upgrade head"

.PHONY: migrate-rollback
migrate-rollback:
	@read -p "Enter the number of steps to rollback: " STEPS; \
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "cd app/infrastructure/database && alembic downgrade $$STEPS"

.PHONY: migrate-drop
migrate-drop:
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "cd app/infrastructure/database && alembic downgrade base"

.PHONy: migrate-history
migrate-history:
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "cd app/infrastructure/database && alembic history --verbose"

# schemaで定義したクラスを参照にmigrationファイルを生成する. TITLEの例 : create user
.PHONY: migrate-file
migrate-file:
	@read -p "Enter the migrate title: " TITLE; \
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "cd app/infrastructure/database && alembic revision --autogenerate -m '$$TITLE'"

.PHONY:open-docs
open-docs:
	open http://localhost:8080/docs

.PHONY: seed
seed:
	$(DCE) $(BACKEND_SERVICE_NAME) bash -c "cd app/seeder && python run_seeder.py"

# *****************************
# *     Frontend Controll    *
# *****************************

# TODO: あとで追加

.PHONY: front-format
front-format:
	$(DCE) $(FRONTEND_SERVICE_NAME) bash -c "npm run format"

.PHONY: open-web
open-web:
	open http://localhost:3000

# *****************************
# *          MySQL            *
# *****************************
.PHONY: mysql
mysql:
	$(DCE) db bash -c '$(MYSQL_USER_LOGIN_CMD)'

.PHONY: mysql-root
mysql-root:
	$(DCE) db bash -c '$(MYSQL_ROOT_LOGIN_CMD)'

# Sequero Ace接続用
.PHONY: create-localuser
create-localuser:
	$(DEI) $(PROJECT_NAME)_db $(MYSQL_ROOT_LOGIN_CMD) --execute="CREATE USER 'chat-gpt-app_user'@'127.0.0.1' IDENTIFIED BY 'password'"

.PHONY: grant-dbuser
grant-dbuser:
	$(DEI) $(PROJECT_NAME)_db $(MYSQL_ROOT_LOGIN_CMD) --execute="GRANT ALL PRIVILEGES ON $(MYSQL_DB_NAME).* TO 'chat-gpt-app_user'@'127.0.0.1'"

.PHONY: show-dbuser
show-dbuser:
	$(DEI) $(PROJECT_NAME)_db $(MYSQL_ROOT_LOGIN_CMD) --execute="SELECT user, host FROM mysql.user ORDER BY user, host"

.PHONY: show-dbgrants
show-dbgrants:
	$(DEI) $(PROJECT_NAME)_db $(MYSQL_USER_LOGIN_CMD) --execute="SHOW GRANTS"

.PHONY: show-databases
show-databases:
	$(DEI) $(PROJECT_NAME)_db $(MYSQL_USER_LOGIN_CMD) --execute="SHOW DATABASES"


# *****************************
# *          Others           *
# *****************************
.PHONY: open-minio
open_minio:
	open http://localhost:9001

.PHONY: minio
minio:
	$(DEI) $(PROJECT_NAME)_minio bash