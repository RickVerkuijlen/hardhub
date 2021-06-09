export const environment = {
  production: false,
  baseUrl: "http://localhost/",
  environment: 'WEB',
  keycloakConfig: {
    url: 'http://localhost:8080/auth',
    realm: 'hardhub',
    clientId: 'hardhub_angular'
  }
};
