import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor() { }

  scrollTopHome() {
    try {
      const home: any = document.getElementById('home');
      home.scrollTop = 0;
    } catch (err) {
      console.log(err);
    }
  }
}
