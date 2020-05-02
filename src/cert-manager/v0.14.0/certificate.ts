import TempYaml from "../../TempYaml"

class Certificate {
    /**
     * Creates a ClusterIssuer resource using letsencrypt staging servers and returns the yaml as string.
     * 
     * @param name Name of the cluster issuer resource
     */
    public createCertificate(certName: string, namespace: string, dnsName: string, clusterIssuer: string) : TempYaml {
       
        var certificateTemplate =
`apiVersion: cert-manager.io/v1alpha2
kind: Certificate
metadata:
  name: ${certName}
  namespace: ${namespace}
spec:
  secretName: ${certName}
  commonName: ${dnsName}
  dnsNames:
    - ${dnsName}
  issuerRef:
    name: ${clusterIssuer}
    kind: ClusterIssuer`;
    
        return new TempYaml(certificateTemplate);
    }
}

export default Certificate;