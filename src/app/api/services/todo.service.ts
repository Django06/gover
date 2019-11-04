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
class TodoService extends __BaseService {
  static readonly GetAllTodosPath = '/api/Todo/GetAllTodos';
  static readonly AddTodoPath = '/api/Todo/AddTodo';
  static readonly ClouturerTodoPath = '/api/Todo/ClouturerTodo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  GetAllTodosResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Todo/GetAllTodos`,
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
  }  GetAllTodos(): __Observable<null> {
    return this.GetAllTodosResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param name undefined
   */
  AddTodoResponse(name?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Todo/AddTodo`,
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
   * @param name undefined
   */
  AddTodo(name?: string): __Observable<null> {
    return this.AddTodoResponse(name).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `TodoService.ClouturerTodoParams` containing the following parameters:
   *
   * - `prix`:
   *
   * - `idTodo`:
   */
  ClouturerTodoResponse(params: TodoService.ClouturerTodoParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.prix != null) __params = __params.set('prix', params.prix.toString());
    if (params.idTodo != null) __params = __params.set('idTodo', params.idTodo.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Todo/ClouturerTodo`,
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
   * @param params The `TodoService.ClouturerTodoParams` containing the following parameters:
   *
   * - `prix`:
   *
   * - `idTodo`:
   */
  ClouturerTodo(params: TodoService.ClouturerTodoParams): __Observable<null> {
    return this.ClouturerTodoResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module TodoService {

  /**
   * Parameters for ClouturerTodo
   */
  export interface ClouturerTodoParams {
    prix?: number;
    idTodo?: number;
  }
}

export { TodoService }
