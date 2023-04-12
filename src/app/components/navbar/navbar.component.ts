import { Component, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc'
import { authCodeFlowConfig } from 'src/app/sso-config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: string = ''
  constructor(private oauthService: OAuthService) { }
  ngOnInit(): void {
    this.configureSSO()
    const userClaims: any = this.oauthService.getIdentityClaims()
    this.name = userClaims.name ? userClaims.name : ''
  }
  configureSSO() {
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.tokenValidationHandler = new JwksValidationHandler()
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
  }
  login() {
    this.oauthService.initCodeFlow()
  }
  logout() {
    this.oauthService.logOut()
  }
  get token() {
    let claims: any = this.oauthService.getIdentityClaims()
    return claims ? claims : null
  }
}
