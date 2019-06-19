import { Injectable } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';

import { ApiService } from '../api.service';

/**
 * The User Service
 */
@Injectable()
export class UserService {

  /**
   * The constructor
   * @param oauthService The oauth service
   * @param apiService the api service
   */
  constructor(
    private oauthService: OAuthService,
    private apiService: ApiService
  ) { }

  /**
   * Gets the User
   */
  public async getUser(): Promise<any> {
    return this.oauthService.loadUserProfile()
      .then((user: User) => {
        this.apiService.get<any>(`api/user/${user.sub}`)
          .then(result => {
            user.folderId = result.folderId;
            user.sub = result.subId;
            // You can pull other information from this as well if you wish to use this user info. Information includes:
            // email, phoneNumber, provider, firstName, lastName, lastLogIn, and a role object containing the role.Application, role.AccessLevel, role.drawerId and role.folderId
            // Where the drawer id and folder id are for accessing that roles information (like getting broker info from a broker folder)
          });

        return user;
        // Success
      }
      );
  }

  /**
   * Gets the User Name from the Oath Service User Profile
   */
  public async getUserName(): Promise<string> {
    return this.oauthService.loadUserProfile()
      .then((user: User) => user.name);
  }

  /**
   * Gets the UPN from the Oath Service User Profile
   */
  public async getUPN(): Promise<string> {
    return this.oauthService.loadUserProfile()
    .then((user: User) => user.upn);
  }

  /**
   * Assigns a role to the given user, this implementation and use should vary depending on the application building from this template.
   */
  public assignRole(): void {
    this.oauthService.loadUserProfile()
      .then((user: User) => {
        this.apiService.put(`/api/user/assign?id=${user.folderId}&role=admin`, '');
      });
  }
}

/**
 * The User Class
 */
class User {
  // the user name
  public name: string;

  // the user upn
  public upn: string;

  // the user subID
  public sub: string;

  // the user folderId
  public folderId: number;
}
