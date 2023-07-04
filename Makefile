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

.PHONY: app
app:
	$(DCE) app bash

.PHONY: db
db:
	$(DCE) db bash

.PHONY: restart
restart:
	@make down
	@make up

# *****************************
# *     Backend Controll    *
# *****************************
.PHONY: log
log:
	docker compose logs -f app

.PHONY: format
format:
	$(DCE) app bash -c "yapf -i -r ."

# *****************************
# *      Python Command      *
# *****************************

.PHONY: migrate-init
migrate-init:
	$(DCE) app bash -c "cd db && alembic revision -m 'Initial migration'"

# schema配下を読み取って自動でmigrationファイルを生成する
.PHONY: auto-generate
auto-generate:
	$(DCE) app bash -c "cd db && alembic revision --autogenerate"

# migrations配下を読み取ってmigrationを実行する
.PHONY: migrate
migrate:
	$(DCE) app bash -c "cd db && alembic upgrade head"

.PHONY: migrate-rollback
migrate-rollback:
	@read -p "Enter the number of steps to rollback: " STEPS; \
	$(DCE) app bash -c "cd db && alembic downgrade $$STEPS"

.PHONY: migrate-drop
migrate-drop:
	$(DCE) app bash -c "cd db && alembic downgrade base"

.PHONy: migrate-log
migrate-log:
	$(DCE) app bash -c "cd db && alembic history --verbose"

# schemaで定義したクラスを参照にmigrationファイルを生成する. TITLEの例 : create user
.PHONY: schema
schema:
	@read -p "Enter the migrate title: " TITLE; \
	$(DCE) app bash -c "cd db && alembic revision --autogenerate -m '$$TITLE'"