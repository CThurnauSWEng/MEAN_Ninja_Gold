import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  gold = 0;
  activityArr = [];
  id = ""

  ngOnInit(){
    this.createGame();
  }

  constructor(private _httpService:HttpService){

  }

  farm(){
    var rand_num: number;
    rand_num = Math.floor(Math.random() * 4) + 2;
    console.log("rand_num: ", rand_num);
    this.gold = this.gold + rand_num;
    var activityStr: string;
    var activityStr = "You earned " + rand_num + " gold at the farm."
    this.activityArr.push(activityStr);
    console.log(this.activityArr);
    this.updateGame();
  }

  createGame(){
    let observerable = this._httpService.getGameData();
    observerable.subscribe(data => {
      this.id = data['id'];
    })
  }

  updateGame(){
    let observerable = this._httpService.updateGameData(
      {"gold": this.gold, "activityLog": this.activityArr,"id":this.id}
    );
    observerable.subscribe(data => {
      console.log("Update response from server: ",data['Status']);
    })
  }
}
