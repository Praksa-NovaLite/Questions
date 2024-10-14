import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  
  ngOnInit(): void{

    this.route.queryParamMap.subscribe(params => {
    const tokenParam =  params.get('token');
    const token = sessionStorage.getItem('token')
    if(params.has('token')){
      sessionStorage.setItem('token', tokenParam!);
      window.location.href = location.origin;
    }else if(!token){
      const url = 'https://localhost:7206';
      window.location.href = `${url}?redirectUri=${location.origin}`
    }
  })
  }
}
