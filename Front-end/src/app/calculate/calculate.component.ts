import { Component, OnInit } from '@angular/core';
import { CalculateService } from 'src/app/calculate/calculate.service';
import { ActivatedRoute } from '@angular/router';
import { Vyraz } from 'src/app/calculate/vyraz.model';

import { interval } from 'rxjs';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {
  
  digit:string = "";
  vyraz = {
    a: 0,
    b: 0,
    sign: "",
    sum3: 0,
    _vyraz: ""
  };

  line: Vyraz[];

  constructor( private _calculateServise: CalculateService, 
    private _route: ActivatedRoute) { 
      this._route.snapshot.params['id'];
    }

  ngOnInit() {
    interval(10)
    .pipe( take(1))
    .subscribe( next => { this.digit; this.line});
    // interval(10)
    // .pipe( take(1))
    // .subscribe( next => { this.digit});
    interval(10)
    .pipe( take(1))
    .subscribe( next => { this._calculateServise.getAllvyraz().subscribe( vyraz => this.line = vyraz);});
  }

  

  add(number: string){
    this.digit += number; 
  }

  plus(){
    this.vyraz.a = parseInt(this.digit);
    this.digit = "";
    this.vyraz.sign+= "+";
  }

  minus(){
    this.vyraz.a = parseInt(this.digit);
    this.digit = "";
    this.vyraz.sign+= "-";
  }

  mulp(){
    this.vyraz.a = parseInt(this.digit);
    this.digit = "";
    this.vyraz.sign+= "*";
  }

  div(){
    this.vyraz.a = parseInt(this.digit);
    this.digit = "";
    this.vyraz.sign+= "/";
  }

  sum_end(){
    this.vyraz.b = parseInt(this.digit);

    if(this.vyraz.sign== "+"){
      this.vyraz.sum3 = this.vyraz.a + this.vyraz.b;
    }
    else if(this.vyraz.sign == "-"){
      this.vyraz.sum3 = this.vyraz.a - this.vyraz.b;
    }
    else if(this.vyraz.sign == "*"){
      this.vyraz.sum3 = this.vyraz.a * this.vyraz.b;
    }
    else if(this.vyraz.sign == "/"){
      this.vyraz.sum3 = this.vyraz.a / this.vyraz.b;
    }

    this.digit = String(this.vyraz.sum3);
    this.vyraz._vyraz = this.vyraz.a + this.vyraz.sign + this.vyraz.b + "=" + this.vyraz.sum3;
    
    this._calculateServise.post({vyraz: this.vyraz._vyraz}) 
    .subscribe( () => console.log("Add new!"), err => console.log(err));
  }

  clean(){
    this.digit = "";
    this.vyraz.sum3 = 0;
    this.vyraz.a = 0;
    this.vyraz.b = 0;
    this.vyraz.sign = "";
    this.vyraz._vyraz = "";
  }
}
