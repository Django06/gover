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
class AUTHService extends __BaseService {
  static readonly AuthentificationPath = '/AUTH/Authentification';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `AUTHService.AuthentificationParams` containing the following parameters:
   *
   * - `pass`:
   *
   * - `login`:
   */
  AuthentificationResponse(params: AUTHService.AuthentificationParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.pass != null) __params = __params.set('pass', params.pass.toString());
    if (params.login != null) __params = __params.set('login', params.login.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/AUTH/Authentification`,
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
   * @param params The `AUTHService.AuthentificationParams` containing the following parameters:
   *
   * - `pass`:
   *
   * - `login`:
   */
  Authentification(params: AUTHService.AuthentificationParams): __Observable<null> {
    return this.AuthentificationResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AUTHService {

  /**
   * Parameters for Authentification
   */
  export interface AuthentificationParams {
    pass?: string;
    login?: string;
  }
}

export { AUTHService }
