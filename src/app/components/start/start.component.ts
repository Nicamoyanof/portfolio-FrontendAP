import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  faPen=faPen
  
  adminEdit:boolean=false;

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.router.url)
    this.isAdminEdit();
  }

  isAdminEdit(){

    let isLoged = localStorage.getItem('auth_token');

    if(this.router.url=='/admin' && isLoged ){
      this.adminEdit=true;
    }else{
      this.adminEdit=false;
    }
  }

    
}
