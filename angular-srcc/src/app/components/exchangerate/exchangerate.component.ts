import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from '../../models/Post';
import { ExchangerateService } from '../../services/exchangerate.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-exchangerate',
  templateUrl: './exchangerate.component.html',
  styleUrls: ['./exchangerate.component.css']
})
export class ExchangerateComponent implements OnInit {
  
  
  //newrate: Observable<Post>;
  
  constructor(private exchangeservice: ExchangerateService) {
    //this.exchangerates = this.exchangeservice.getExchangeRate();
    /*const data: Post = {
      id: null,
      userId: 23,
      title: "New title post",
      body: "this is new post"
    }*/
    
    //this.newrate = this.exchangeservice.createExchangeRate(data);
    
    
    //this.exchangerates = this.http.get(this.ROOT_ONLY + '/posts')
    //.map(res => res.json());
  }

  ngOnInit() {
  }
  
}
