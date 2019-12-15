import TempYaml from "../../TempYaml"

class ClusterIssuer {
    
    /**
     * Creates a ClusterIssuer resource using letsencrypt staging servers and returns the yaml as string.
     * 
     * @param name Name of the cluster issuer resource
     */
    public createForStaging(name: String) : TempYaml {
        return this.createYaml(name, true);
    }

    /**
     * Creates a ClusterIssuer resource using letsencrypt production servers and returns the yaml as string.
     * 
     * @param name Name of the cluster issuer resource
     */
    public createForProd(name: String) : TempYaml {
        return this.createYaml(name, false);
    }

    private createYaml(name: String, forStaging: Boolean) : TempYaml {
        const acmeServer = 
          forStaging 
          ? "https://acme-staging-v02.api.letsencrypt.org/directory"
          : "https://acme-v02.api.letsencrypt.org/directory";

        const clusterIssuerTemplate = 
`apiVersion: cert-manager.io/v1alpha2
kind: ClusterIssuer
metadata:
  name: ${name}
  namespace: default
spec:
  acme:
    server: ${acmeServer}
    email: support@sarooma.de
    privateKeySecretRef:
      name: ${name}
          
    # this is the 'new' way of defining solvers
    solvers:
      # empty selector will match all Certificate resources that reference this issuer.
      # for selecting a specific solver from a Certificate resource (not required right now), see
      # https://docs.cert-manager.io/en/latest/tasks/upgrading/upgrading-0.7-0.8.html#performing-an-incremental-switch-to-the-new-format
      - selector: {}
        dns01:
          digitalocean:
            tokenSecretRef:
              name: dns01-solver-secret
              key: token
      - selector:
          matchLabels:
            use-http01-solver: "true"
        http01:
          ingress:
            class: nginx`;
    
        return new TempYaml(clusterIssuerTemplate);
    }
}

export default ClusterIssuer;
export { ClusterIssuer };

