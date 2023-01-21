import { Component, OnInit } from '@angular/core';
import { ToasterServiceService } from './toaster-service.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  constructor(private ToasterService:ToasterServiceService ) { }

  ngOnInit(): void {
  this.ToasterService.show.subscribe(d=>{
    console.log(d, "sugduisa");
  })
  }


  showPopUp(type:any , message:any){
    console.log(type, message);
  }

}
