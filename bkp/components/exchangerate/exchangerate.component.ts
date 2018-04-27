import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ExchangeRate } from '../../models/ExchangeRate';
import { ExchangerateService } from '../../services/exchangerate.service';

@Component({
  selector: 'app-exchangerate',
  templateUrl: './exchangerate.component.html',
  styleUrls: ['./exchangerate.component.css']
})
export class ExchangerateComponent implements OnInit {
  //readonly ROOT_ONLY = 'https://jsonplaceholder.typicode.com';
  
  //exchangerates: any; 
  
  constructor(private exchangeservice: ExchangerateService) {
    //this.exchangerates = this.http.get(this.ROOT_ONLY + '/posts')
    //.map(res => res.json());
  }

  ngOnInit() {
  }
  
  getRates(){
    //this.exchangerates = this.http.get<ExchangeRate[]>(this.ROOT_ONLY + '/exchangerates')
  }
  
  getExchangeRate(){
    
  }

}
