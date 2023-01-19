import { Component, OnInit } from "@angular/core";
import { HttpServiceService } from "src/app/services/http-service.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.scss"],
})
export class CheckOutComponent implements OnInit {
  
  items: any;
  total: any;

  constructor() {}

  ngOnInit(): void {
    
    this.getItems();
  }

  getItems() {
    this.items = JSON.parse(localStorage.getItem("cart") || "[]");
    this.total = parseInt(
      JSON.parse(localStorage.getItem("totalAmount") || "0")
    );
    this.items = this.items.map((item: any) => {
      delete item["_org"];
      delete item["_id"];
      delete item["createdAt"];
      delete item["images"];
      delete item["description"];

      return item;
    });
  }
}

