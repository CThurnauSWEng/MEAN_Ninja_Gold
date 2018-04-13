import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { 
  }

  getGameData(){
    return this._http.get('/game');
  }

  updateGameData(gameData){
    return this._http.put('/game/'+gameData['id'], gameData);
  }
}
