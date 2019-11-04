/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { JourneeDetailCretaria } from '../models/journee-detail-cretaria';
@Injectable({
  providedIn: 'root',
})
class JourneeService extends __BaseService {
  static readonly GetAllJourneePath = '/api/Journee/GetAllJournee';
  static readonly GetPath = '/api/Journee/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `JourneeService.GetAllJourneeParams` containing the following parameters:
   *
   * - `start`:
   *
   * - `criteria`:
   *
   * - `count`:
   */
  GetAllJourneeResponse(params: JourneeService.GetAllJourneeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.start != null) __params = __params.set('start', params.start.toString());
    __body = params.criteria;
    if (params.count != null) __params = __params.set('count', params.count.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Journee/GetAllJournee`,
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
   * @param params The `JourneeService.GetAllJourneeParams` containing the following parameters:
   *
   * - `start`:
   *
   * - `criteria`:
   *
   * - `count`:
   */
  GetAllJournee(params: JourneeService.GetAllJourneeParams): __Observable<null> {
    return this.GetAllJourneeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetResponse(id: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Journee/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  Get(id: number): __Observable<string> {
    return this.GetResponse(id).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module JourneeService {

  /**
   * Parameters for GetAllJournee
   */
  export interface GetAllJourneeParams {
    start?: number;
    criteria?: JourneeDetailCretaria;
    count?: number;
  }
}

export { JourneeService }
