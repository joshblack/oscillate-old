.PHONY: up
up: ## Start development-related services, like Postgres
	docker-compose -f ci/development/docker-compose.yml up -d

.PHONY: down
down: ## Clean-up a development environment by closing all our services
	docker-compose -f ci/development/docker-compose.yml down --remove-orphans

.PHONY: lint
lint: ## Run our linter against our project
	mix credo --strict

.PHONY: migrate
migrate: ## Run a migration
	mix ecto.create
	mix ecto.migrate
	mix run priv/repo/seeds.exs

.PHONY: seed-dev
seed-dev: ## Seed in a development context
	mix ecto.drop
	mix ecto.create
	mix ecto.migrate
	mix run priv/repo/seeds.exs

.PHONY: setup
setup: ## Setup our test environment (namely our Test Database)
	docker-compose -f ci/test/docker-compose.yml up -d

.PHONY: schema
schema: ## Generate a schema for consumption by a UI.
	mix absinthe.schema.json ${OUTPUT_DIR} --pretty

.PHONY: start
start: ## Start-up the server
	mix phoenix.server

.PHONY: help
help: ## Tries to help out
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

