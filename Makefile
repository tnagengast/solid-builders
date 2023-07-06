# Load environment variables from .env file if it exists
-include .env
export

REGISTRY = tomnagengast
IMAGE_NAME = solid-builders
FULL_IMAGE_NAME = $(REGISTRY)/$(IMAGE_NAME)
IMAGE_VERSION = 0.0.1
CHANNEL = Unstable

.PHONY: build
build:
	#### Build the docker image and load into the local kind cluster
	docker build website -t $(FULL_IMAGE_NAME)-macos:$(IMAGE_VERSION)
	kind load docker-image $(FULL_IMAGE_NAME)-macos:$(IMAGE_VERSION)
	docker exec -it kind-control-plane crictl images

.PHONY: run
run:
	#### Run the docker image
	open http://localhost:8080
	docker run --rm -it -p 8080:8080 $(FULL_IMAGE_NAME)-macos:$(IMAGE_VERSION)

.PHONY: reset-cluster
reset-cluster:
	#### Reset the kind cluster
	kind delete cluster
	kind create cluster --config kind-config.yaml
	kind load docker-image $(FULL_IMAGE_NAME)-macos:$(IMAGE_VERSION)
	kubectl cluster-info --context kind-kind

.PHONY: install-extensions
install-extensions:
	helm upgrade --install ingress-nginx ingress-nginx \
	  --repo https://kubernetes.github.io/ingress-nginx \
	  --namespace ingress-nginx --create-namespace

.PHONY: helm-update
helm-update:
	#### Update the helm chart
	rm solid-builders-*.tgz || true
	rm -rf helm/charts || true
	helm dependency update ./helm
	helm package ./helm -u ./helm --version $(IMAGE_VERSION) --app-version $(IMAGE_VERSION)
	helm upgrade -i solid-builders helm -n solid-builders --create-namespace --values ./helm/values.dev.yaml

.PHONY: publish
publish:
	#### Publish the docker image to dockerhub
	docker build --platform=linux/amd64 website -t $(FULL_IMAGE_NAME)-linux:$(IMAGE_VERSION)
	docker push $(FULL_IMAGE_NAME)-linux:$(IMAGE_VERSION)
	replicated release create --chart=$(IMAGE_NAME)-$(IMAGE_VERSION).tgz --promote=$(CHANNEL)

.PHONY: connect
connect:
	ssh -i ~/.ssh/aws/data-team.pem ubuntu@$(AWS_INSTANCE)
