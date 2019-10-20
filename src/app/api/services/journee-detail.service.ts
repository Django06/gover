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
class JourneeDetailService extends __BaseService {
  static readonly GetAllJourneeDetailPath = '/api/JourneeDetail/GetAllJourneeDetail';
  static readonly AddJourneeDetailPath = '/api/JourneeDetail/AddJourneeDetail';
  static readonly DeleteJourneeDetailPath = '/api/JourneeDetail/DeleteJourneeDetail';
  static readonly UpdateJourneeDetailPath = '/api/JourneeDetail/UpdateJourneeDetail';
  static readonly ChangeStatueJourneeDetailPath = '/api/JourneeDetail/ChangeStatueJourneeDetail';
  static readonly GetJourneeDetailsImpayePath = '/api/JourneeDetail/GetJourneeDetailsImpaye';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  GetAllJourneeDetailResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/JourneeDetail/GetAllJourneeDetail`,
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
  }  GetAllJourneeDetail(): __Observable<null> {
    return this.GetAllJourneeDetailResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `JourneeDetailService.AddJourneeDetailParams` containing the following parameters:
   *
   * - `Prix`:
   *
   * - `Motif`:
   */
  AddJourneeDetailResponse(params: JourneeDetailService.AddJourneeDetailParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.Prix != null) __params = __params.set('Prix', params.Prix.toString());
    if (params.Motif != null) __params = __params.set('Motif', params.Motif.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/JourneeDetail/AddJourneeDetail`,
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
   * @param params The `JourneeDetailService.AddJourneeDetailParams` containing the following parameters:
   *
   * - `Prix`:
   *
   * - `Motif`:
   */
  AddJourneeDetail(params: JourneeDetailService.AddJourneeDetailParams): __Observable<null> {
    return this.AddJourneeDetailResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param codeJourneeDetail undefined
   */
  DeleteJourneeDetailResponse(codeJourneeDetail?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (codeJourneeDetail != null) __params = __params.set('codeJourneeDetail', codeJourneeDetail.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/JourneeDetail/DeleteJourneeDetail`,
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
   * @param codeJourneeDetail undefined
   */
  DeleteJourneeDetail(codeJourneeDetail?: number): __Observable<null> {
    return this.DeleteJourneeDetailResponse(codeJourneeDetail).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `JourneeDetailService.UpdateJourneeDetailParams` containing the following parameters:
   *
   * - `codeJourneeDetail`:
   *
   * - `Prix`:
   *
   * - `Motif`:
   */
  UpdateJourneeDetailResponse(params: JourneeDetailService.UpdateJourneeDetailParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.codeJourneeDetail != null) __params = __params.set('codeJourneeDetail', params.codeJourneeDetail.toString());
    if (params.Prix != null) __params = __params.set('Prix', params.Prix.toString());
    if (params.Motif != null) __params = __params.set('Motif', params.Motif.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/JourneeDetail/UpdateJourneeDetail`,
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
   * @param params The `JourneeDetailService.UpdateJourneeDetailParams` containing the following parameters:
   *
   * - `codeJourneeDetail`:
   *
   * - `Prix`:
   *
   * - `Motif`:
   */
  UpdateJourneeDetail(params: JourneeDetailService.UpdateJourneeDetailParams): __Observable<null> {
    return this.UpdateJourneeDetailResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param idJourneeDetail undefined
   */
  ChangeStatueJourneeDetailResponse(idJourneeDetail?: Array<number>): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = idJourneeDetail;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/JourneeDetail/ChangeStatueJourneeDetail`,
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
   * @param idJourneeDetail undefined
   */
  ChangeStatueJourneeDetail(idJourneeDetail?: Array<number>): __Observable<null> {
    return this.ChangeStatueJourneeDetailResponse(idJourneeDetail).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `JourneeDetailService.GetJourneeDetailsImpayeParams` containing the following parameters:
   *
   * - `start`:
   *
   * - `idUser`:
   *
   * - `count`:
   */
  GetJourneeDetailsImpayeResponse(params: JourneeDetailService.GetJourneeDetailsImpayeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.start != null) __params = __params.set('start', params.start.toString());
    if (params.idUser != null) __params = __params.set('idUser', params.idUser.toString());
    if (params.count != null) __params = __params.set('count', params.count.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/JourneeDetail/GetJourneeDetailsImpaye`,
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
   * @param params The `JourneeDetailService.GetJourneeDetailsImpayeParams` containing the following parameters:
   *
   * - `start`:
   *
   * - `idUser`:
   *
   * - `count`:
   */
  GetJourneeDetailsImpaye(params: JourneeDetailService.GetJourneeDetailsImpayeParams): __Observable<null> {
    return this.GetJourneeDetailsImpayeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module JourneeDetailService {

  /**
   * Parameters for AddJourneeDetail
   */
  export interface AddJourneeDetailParams {
    Prix?: number;
    Motif?: string;
  }

  /**
   * Parameters for UpdateJourneeDetail
   */
  export interface UpdateJourneeDetailParams {
    codeJourneeDetail?: number;
    Prix?: number;
    Motif?: string;
  }

  /**
   * Parameters for GetJourneeDetailsImpaye
   */
  export interface GetJourneeDetailsImpayeParams {
    start?: number;
    idUser?: number;
    count?: number;
  }
}

export { JourneeDetailService }
