export const keycloak = {
  issuer: process.env.KEYCLOAK_URL!,
  clientId: process.env.KEYCLOAK_CLIENT_ID!,
  realm: process.env.KEYCLOAK_REALM!,
  redirectUri: new URL('/api/auth/callback', process.env.NEXT_APP_URL!).toString(),
  appUrl: process.env.NEXT_APP_URL!,
  authUrl() {
    return `${this.issuer}/realms/${this.realm}/protocol/openid-connect/auth`;
  },
  tokenUrl() {
    return `${this.issuer}/realms/${this.realm}/protocol/openid-connect/token`;
  },
  logoutUrl() {
    return `${this.issuer}/realms/${this.realm}/protocol/openid-connect/logout`;
  },
  userInfoUrl() {
    return `${this.issuer}/realms/${this.realm}/protocol/openid-connect/userinfo`;
  },
  registerUrl() {
    return `${this.issuer}/realms/${this.realm}/protocol/openid-connect/registrations`;
  }
};
