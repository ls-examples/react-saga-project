PROJECT_NAME := books-client
DOCKER_REGISTRY := registry.prod3.dsxack.com

.PHONY: all build push

all: build push

build:
	docker build -t ${DOCKER_REGISTRY}/${PROJECT_NAME} .

push:
	docker push ${DOCKER_REGISTRY}/${PROJECT_NAME}
