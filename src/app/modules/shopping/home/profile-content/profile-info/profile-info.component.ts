import { Component, OnInit } from "@angular/core";
import { UsersdataService } from "src/app/services/usersdata.service";
import { HttpServiceService } from "src/app/services/http-service.service";

@Component({
  selector: "app-profile-info",
  templateUrl: "./profile-info.component.html",
  styleUrls: ["./profile-info.component.scss"],
})
export class ProfileInfoComponent implements OnInit {
  customerInfo: any;
  addressList: any;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };

  constructor(
    private userData: UsersdataService,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.customerInfo = this.userData.getUser("customerLogged");
    this.getAddress();
  }

  getAddress() {
    const url = "/customers/address";
    this.httpService.get(url).subscribe({
      next: (res) => {
        this.addressList = res;
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  // show popup code
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

  afterImageOperation() {
    this.userData.setUser(this.customerInfo, "customerLogged");
    this.customerInfo = this.userData.getUser("customerLogged");
    this.userData.updateDetails.next(true);
    setTimeout(() => {
      this.userData.updateDetails.next(false);
    }, 200);
  }

  editImage() {
    let input: any = document.createElement("input");
    input.type = "file";
    input.onchange = (event: any) => {
      // you can use this method to get file and perform respective operations
      // let files = Array.from(input.files);
      // console.log(files);
      const url = "/customers/profile-picture";
      let picture: any = new FormData();
      picture.append("picture", input.files[0]);

      this.httpService.post(url, "", picture).subscribe({
        next: (res) => {
          this.showPop("Image is updated successfully");
          this.customerInfo.picture = res.picture;
          this.afterImageOperation();
        },
        error: (err) => console.log(err),
      });
    };
    input.click();
  }

  deleteAddress(id: string) {
    console.log("address");
    const url = `/customers/address/${id}`;
    this.httpService.delete(url).subscribe({
      next: (res) => {
        this.showPop("Address deleted successfully");
        this.getAddress();
      },
      error: (err) => this.showPop(err.error.message),
    });
  }

  deleteImage() {
    console.log("delete");

    this.httpService.delete("/customers/profile-picture").subscribe({
      next: (res) => {
        this.showPop("Image is deleted successfully");
        this.customerInfo.picture = res;
        this.afterImageOperation();
      },
      error: (err) => console.log(err),
    });
  }
}
