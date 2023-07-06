Chart.yaml
```
dependencies:
- name: replicated
  repository: oci://registry.replicated.com/library
  version: 0.0.1-alpha.15
```

values.yaml
```
image: registry.replicated.com/solid-builders/solid-builders
solid-builders.localhost
secretName: replicated-image-pull-secret
host: solid-builders.localhost

replicated:
  integration:
    licenseID: <LicenseID>
```
