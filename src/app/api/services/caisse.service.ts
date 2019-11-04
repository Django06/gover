/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CaisseIn } from '../models/caisse-in';
@Injectable({
  providedIn: 'root',
})
class CaisseService extends __BaseService {
  static readonly GetAllCaissePath = '/Caisse/GetAllCaisse';
  static readonly AddCaissePath = '/Caisse/AddCaisse';
  static readonly GetCaisseEnCoursPath = '/Caisse/GetCaisseEnCours';
  static readonly CloturerLaCaissePath = '/Caisse/CloturerLaCaisse';
  static readonly GetSumByIdUserPath = '/Caisse/GetSumByIdUser';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  GetAllCaisseResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Caisse/GetAllCaisse`,
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
  }  GetAllCaisse(): __Observable<null> {
    return this.GetAllCaisseResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param Caisse undefined
   */
  AddCaisseResponse(Caisse?: CaisseIn): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Caisse;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Caisse/AddCaisse`,
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
   * @param Caisse undefined
   */
  AddCaisse(Caisse?: CaisseIn): __Observable<null> {
    return this.AddCaisseResponse(Caisse).pipe(
      __map(_r => _r.body as null)
    );
  }
  GetCaisseEnCoursResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Caisse/GetCaisseEnCours`,
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
  }  GetCaisseEnCours(): __Observable<null> {
    return this.GetCaisseEnCoursResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param prixFinal undefined
   */
  CloturerLaCaisseResponse(prixFinal?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (prixFinal != null) __params = __params.set('prixFinal', prixFinal.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Caisse/CloturerLaCaisse`,
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
   * @param prixFinal undefined
   */
  CloturerLaCaisse(prixFinal?: number): __Observable<null> {
    return this.CloturerLaCaisseResponse(prixFinal).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param idUser undefined
   */
  GetSumByIdUserResponse(idUser?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUser != null) __params = __params.set('idUser', idUser.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Caisse/GetSumByIdUser`,
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
   * @param idUser undefined
   */
  GetSumByIdUser(idUser?: number): __Observable<null> {
    return this.GetSumByIdUserResponse(idUser).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CaisseService {
}

export { CaisseService }
