import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ExchangeRate, CurrencyType } from '../models/ExchangeRate';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ExchangerateService {
  readonly ROOT_ONLY = 'http://exchangerates-gkhandare.c9users.io:8080/api';
  
  constructor(public http: HttpClient) { 
      console.log('ExchangerateService connected.');
  }
  
  getRates(): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRate[]>(this.ROOT_ONLY + '/exchangerate')
                    .catch(this.errorHandler);
  }
  
  errorHandler(error: HttpErrorResponse)
  {
    return Observable.throw(error.message || "Http service get error");
  }
  
  /*getExchangeRate(){
    let params = new HttpParams().set('userId', '1');
    
    return this.http.get<ExchangeRate[]>(this.ROOT_ONLY + '/posts', { params })
  }*/
  
  createExchangeRate(data): Observable<any>{
    //console.log(data);
      return this.http.post<ExchangeRate>(this.ROOT_ONLY + '/exchangerate/create', data);
  }
  
  getCurrencyTypes(): Observable<CurrencyType[]> {
    return this.http.get<CurrencyType[]>(this.ROOT_ONLY + '/exchangerate/currencytypes')
                    .catch(this.errorHandler);
  }

}
