This branch is used by ArgoCD to track K8 manifests. Any update to this branch will trigger an update to the ArgoCD instance(through GitHub webhook). Check the [ArgoCD Documentation](https://argoproj.github.io/cd/) for more information on ArgoCD. 

The CI tasks are run through GitHub actions and CD is handled by ArgoCD which has excellent integration with K8s 
.
