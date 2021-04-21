export const environment = {
  production: false,
  baseUrl: "http://localhost/",
  environment: 'LOCAL',
  keycloakConfig: {
    url: 'http://localhost:8080/auth',
    realm: 'hardhub',
    clientId: 'hardhub-angular'
  }
};
