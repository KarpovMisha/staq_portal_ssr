export const keycloak = {
  issuer: process.env.KEYCLOAK_ISSUER!,
  clientId: process.env.KEYCLOAK_CLIENT_ID!,
  redirectUri: process.env.KEYCLOAK_REDIRECT_URI!,
  appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  authUrl() {
    return `${this.issuer}/protocol/openid-connect/auth`;
  },
  tokenUrl() {
    return `${this.issuer}/protocol/openid-connect/token`;
  },
  logoutUrl() {
    return `${this.issuer}/protocol/openid-connect/logout`;
  },
  userInfoUrl() {
    return `${this.issuer}/protocol/openid-connect/userinfo`;
  },
  registerUrl() {
    return `${this.issuer}/protocol/openid-connect/registrations`;
  }
};
