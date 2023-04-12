export const envirenment = {
    production: false,
    keycloak:{
        issuer:'http://localhost:8080/auth/realms/rhssoApp',
        redirectUri:'http://localhost:4200',
        clientId:'rhsso-app',
        scope:'openid profile email offline_access'
    }
}