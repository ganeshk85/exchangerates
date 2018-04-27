import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable }        from 'rxjs/Observable';
import { ExchangeRate, CurrencyType } from '../../models/ExchangeRate';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { ExchangerateService } from '../../services/exchangerate.service';

@Component({
  selector: 'app-add-exchange-rate',
  templateUrl: './add-exchange-rate.component.html',
  styleUrls: ['./add-exchange-rate.component.css']
})
export class AddExchangeRateComponent implements OnChanges {
  
  exchangerate: ExchangeRate;

  rateForm: FormGroup;
  currency_types: Array<any> = [];
  
  constructor(private fb: FormBuilder,
              private exchangerateService: ExchangerateService,
              private router: Router,
              private flashMessage: FlashMessagesService) { 
    this.createForm();
  }

  ngOnInit() {
    this.exchangerateService.getCurrencyTypes().subscribe(data => {
        console.log(data);
        this.currency_types = data;
      }
    );
  }
  
  createForm() {
    this.rateForm = this.fb.group({
      date_recorded: ['',Validators.required],
      currency_type: '',
      rate: ['',Validators.required],
    });
  }
  
  rebuildForm(){
    this.rateForm.reset({
      date_recorded: this.exchangerate.date_recorded,
      currency_type: this.exchangerate.currency_type,
      rate: this.exchangerate.rate,
    });
  }
  
  onSubmit() {
    this.exchangerate = this.prepareSaveRate();
    this.exchangerateService.createExchangeRate(this.exchangerate).subscribe(data => {
        //console.log(data);
        if(data.success) {
          this.flashMessage.show('New Exchange Rate has been added', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/exchangerate']);
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/exchangerate']);
        }
      });
    this.rebuildForm();
  }
  
  ngOnChanges() {
    this.rebuildForm();
  }
  
  prepareSaveRate(): ExchangeRate {
    const formModel = this.rateForm.value;
    
    let dp = new DatePipe(navigator.language);
    let p = 'yyyy-MM-dd';
    let dtr = dp.transform(formModel.date_recorded, p );
    
    //console.log(dtr);
 
    const saveRate: ExchangeRate = {
      date_recorded: dtr,
      currency_type: formModel.currency_type,
      rate: formModel.rate,
    };
    
    return saveRate;
  }

  revert() { 
    this.rebuildForm();
  }
}
