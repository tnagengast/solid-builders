# Solid Builders

### Docker

Build
```sh
docker build . -t tomnagengast/solid-builders-macos:latest
docker push tomnagengast/solid-builders-macos:latest
docker run --rm -it -p 8080:8080 tomnagengast/solid-builders-macos:latest
```

```sh
docker build --platform=linux/amd64 . -t tomnagengast/solid-builders-linux:latest
docker push tomnagengast/solid-builders-linux:latest
docker run --rm -it -p 8080:8080 tomnagengast/solid-builders-macos:latest
```

### Helm
```sh
# Update dependencies from `chart/`
helm dep update

# Package
helm package .

# Install (will use `chart/values.yaml` by default)
helm upgrade -i solid-builders . -n solid-builders --create-namespace --values values-dev.yaml
helm upgrade -i solid-builders . -n solid-builders --create-namespace --values values.yaml
```

### Deploy to Replicated

https://docs.replicated.com/vendor/private-images-replicated
```sh
# Login to Replicated
docker login registry.replicated.com -u <username> -p <token>
# Build (or tag) image
docker build . -t registry.replicated.com/solid-builders/solid-builders-linux:latest
# Push image
docker push registry.replicated.com/solid-builders/solid-builders-linux:latest
```

https://docs.replicated.com/vendor/replicated-sdk-using
```sh
# Create a release
replicated release create --chart=solid-builders-0.0.1.tgz --promote=Unstable

# Create customer license

# Login folling the Helm install instructions
helm registry login registry.replicated.com --username han@rebels.org --password <password>

# Install the helm chart
helm upgrade -i solid-builders oci://registry.replicated.com/solid-builders/unstable/solid-builders -n solid-builders --create-namespace
```

## Test in AWS

```sh
# Setup cluster and connect
make connect

# Install k9s
curl -sS https://webinstall.dev/k9s | bash

# Install k0s
curl -sSLf https://get.k0s.sh | sudo sh
sudo k0s install controller --single
sudo k0s start
sudo k0s status
sudo k0s kubectl get nodes

# Setup kubeconfig
sudo cp /var/lib/k0s/pki/admin.conf ~/admin.conf
export KUBECONFIG=~/admin.conf
sudo chown ubuntu ~/admin.conf

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
   
# Install Helm
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh


# Install App
helm registry login registry.replicated.com --username han@rebels.org --password <password>
helm upgrade -i solid-builders oci://registry.replicated.com/solid-builders/unstable/solid-builders
```


### Notes

The "exec /docker-entrypoint.sh: exec format error" means that the image is build under the wrong architecture
"Error: create: failed to create: Secret "sh.helm.release.v1.solid-builders.v1" is invalid: data: Too long: must have at most 1048576 bytes" means the tar.gz is too big. Delete the existing, repackage, and cut a new release.
