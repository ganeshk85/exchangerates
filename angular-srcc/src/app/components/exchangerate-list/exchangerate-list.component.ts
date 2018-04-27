import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { ExchangeRate } from '../../models/ExchangeRate';
import { ExchangerateService } from '../../services/exchangerate.service';

@Component({
  selector: 'app-exchangerate-list',
  templateUrl: './exchangerate-list.component.html',
  styleUrls: ['./exchangerate-list.component.css']
})
export class ExchangerateListComponent implements OnInit {

  //exchangerates: Observable<ExchangeRate[]>;
  exchangerates: Array<any> = [];
  errorMessage;
  isLoading = false;
  
  constructor(private exchangerateService: ExchangerateService) { }

  ngOnInit() {
    //this.getExchangeRates();
  }
  
  getExchangeRates(){
    this.isLoading = true;
    this.exchangerateService.getRates().subscribe(data => {
      console.log(data);
      this.exchangerates = data;  
      this.isLoading = false;
    });
    //this.exchangerates = this.exchangeservice.getRates().finally(() => this.isLoading = false);
    
    
    
    //error => this.errorMessage = error
  }

}
