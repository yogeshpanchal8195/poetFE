import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { DataModel } from './models/dataModel';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'poetFrontEnd';
  // inputData: string;
  outputArray: Array<any>;
  showLoader: boolean = false;
  input: any;
  durations: Array<any> = [];
  suggestionsArray: Array<any> = []
  inputData = new FormControl();
  showList: boolean = false;
  filteredOptions: Array<any>
  recentlyUsedWords:Array<any>=[]
  showRecent:boolean=false;
  previousValue:string=""

  constructor(
    private httpServive: HttpService
  ) {
  }

  ngOnInit() {
    this.showLoader=true;
    this.durations = [];
    this.inputData.setValue("");
    // this.input = document.getElementById('inputField');
    // this.input.addEventListener('keyup', (function (e) {
    //   //console.log(e);
    // }))
    this.httpServive.favouriteData('http://localhost:8080/rhymes/recent', {}, (data) => {
      //console.log(data);
      this.recentlyUsedWords=data;
      this.showLoader=false;
      this.showRecent=true;
    }, (err) => {
      //console.log(err);
    })

  }

  clickFn() {
    this.showList = false;
    let obj: DataModel = new DataModel;
    obj.name = this.inputData.value;
    obj.date = new Date();
    this.showLoader = true;
    //console.log(this.inputData.value.trim().length)
    if(this.inputData.value.trim().length){
      this.httpServive.fetchData('http://localhost:8080/rhymes', obj, (output) => {
      if (output) {
        this.outputArray = output;
        this.showLoader = false;
        this.showRecent=false;
      }
    }, (err) => {
      //console.log(err);
    })
    }else{
      this.showLoader=false;
    }
  }

  recentClick(element:string){
    this.inputData.setValue(element);
    this.clickFn();
  }

  keyUp(event) {
    this.showList = true;
    console.log(event.keyCode,event.code);
    if (event.keyCode == 13) {
      this.showList = false;
    }

    let obj: DataModel = new DataModel();
    obj.name = this.inputData.value;
    //console.log(this.inputData.value.trim().length)
    if (this.inputData.value.trim().length && this.previousValue != this.inputData.value) {
      this.httpServive.fetchData('http://localhost:8080/rhymes/suggestions', obj, (output) => {
        if (output) {
          this.suggestionsArray = [];
          //console.log(output);
          output.forEach(element => {
            if (element.word) {
              this.suggestionsArray.push(element.word);
            }
          });
        }
      }, (err) => {
        //console.log(err);
      })
    }else{
      this.showLoader=false;
    }
    this.previousValue = this.inputData.value;
  }


  updateValue(option: string) {
    this.inputData.setValue(option);
    this.showList = false;
  }

  hideList() {
    this.showList = false;
  }

}
