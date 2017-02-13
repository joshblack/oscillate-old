NODE_ENV ?= development
NODE_CONFIG_DIR ?= ci
TEST_DIR ?= ci/test

.PHONY: build
build: ## Build our production-assets, including js, css, and media
	node scripts/build.js

.PHONY: coverage
coverage: ## Run a coverage report from our tests
	$$(yarn bin)/jest --no-cache --verbose --coverage

.PHONY: dev
dev: ## Run a development environment
	$$(yarn bin)/cross-env \
		NODE_CONFIG_DIR=$(NODE_CONFIG_DIR)/$(NODE_ENV) \
		node scripts/dev.js

setup: ## Setup our environment for e2e testing
	docker-compose -f $(TEST_DIR)/docker-compose.yml build
	docker-compose -f $(TEST_DIR)/docker-compose.yml up -d

teardown: ## Clean-up our environment
	docker-compose -f $(TEST_DIR)/docker-compose.yml down --remove-orphans

e2e: ## Run our e2e tests
	$$(yarn bin)/nightwatch -e default,firefox -c $(TEST_DIR)/nightwatch.json

.PHONY: lint
lint: ## Lint the source files in the project
	$$(yarn bin)/eslint src

.PHONY: start
start: ## Run our production Node.js server
	$$(npm bin)/cross-env \
		NODE_CONFIG_DIR=$(NODE_CONFIG_DIR)/$(NODE_ENV) \
		node src/server/index.js

.PHONY: help
help: ## Tries to help out
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
