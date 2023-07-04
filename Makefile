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
