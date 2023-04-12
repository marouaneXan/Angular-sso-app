import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc'
import { authCodeFlowConfig } from 'src/app/sso-config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: string = ''
  constructor(private oauthService: OAuthService,private router:Router) { }
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
    this.router.navigateByUrl('home')
  }
  logout() {
    this.oauthService.logOut()
  }
  get token() {
    let claims: any = this.oauthService.getIdentityClaims()
    return claims ? claims : null
  }
}
