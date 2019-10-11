/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class UsersService extends __BaseService {
  static readonly GetAllUsersPath = '/Users/GetAllUsers';
  static readonly GetUserByIdPath = '/Users/GetUserById';
  static readonly AddUserPath = '/Users/AddUser';
  static readonly UpdateUserPath = '/Users/UpdateUser';
  static readonly DeleteUserPath = '/Users/DeleteUser';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  GetAllUsersResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Users/GetAllUsers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  GetAllUsers(): __Observable<null> {
    return this.GetAllUsersResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  GetUserByIdResponse(id?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Users/GetUserById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  GetUserById(id?: number): __Observable<null> {
    return this.GetUserByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UsersService.AddUserParams` containing the following parameters:
   *
   * - `Pass`:
   *
   * - `Name`:
   *
   * - `Login`:
   */
  AddUserResponse(params: UsersService.AddUserParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.Pass != null) __params = __params.set('Pass', params.Pass.toString());
    if (params.Name != null) __params = __params.set('Name', params.Name.toString());
    if (params.Login != null) __params = __params.set('Login', params.Login.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Users/AddUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `UsersService.AddUserParams` containing the following parameters:
   *
   * - `Pass`:
   *
   * - `Name`:
   *
   * - `Login`:
   */
  AddUser(params: UsersService.AddUserParams): __Observable<null> {
    return this.AddUserResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UsersService.UpdateUserParams` containing the following parameters:
   *
   * - `idUser`:
   *
   * - `Pass`:
   *
   * - `Name`:
   *
   * - `Login`:
   */
  UpdateUserResponse(params: UsersService.UpdateUserParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idUser != null) __params = __params.set('idUser', params.idUser.toString());
    if (params.Pass != null) __params = __params.set('Pass', params.Pass.toString());
    if (params.Name != null) __params = __params.set('Name', params.Name.toString());
    if (params.Login != null) __params = __params.set('Login', params.Login.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Users/UpdateUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `UsersService.UpdateUserParams` containing the following parameters:
   *
   * - `idUser`:
   *
   * - `Pass`:
   *
   * - `Name`:
   *
   * - `Login`:
   */
  UpdateUser(params: UsersService.UpdateUserParams): __Observable<null> {
    return this.UpdateUserResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  DeleteUserResponse(id?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Users/DeleteUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  DeleteUser(id?: number): __Observable<null> {
    return this.DeleteUserResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UsersService {

  /**
   * Parameters for AddUser
   */
  export interface AddUserParams {
    Pass?: string;
    Name?: string;
    Login?: string;
  }

  /**
   * Parameters for UpdateUser
   */
  export interface UpdateUserParams {
    idUser?: number;
    Pass?: string;
    Name?: string;
    Login?: string;
  }
}

export { UsersService }
