export const environment = {
  production: false,
  baseUrl: "http://localhost:80/",
  environment: 'WEB',
  keycloakConfig: {
    url: 'http://localhost:8080/auth',
    realm: 'hardhub',
    clientId: 'hardhub_angular'
  }
};
