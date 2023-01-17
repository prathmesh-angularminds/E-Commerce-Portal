import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  profileImage: string;
  errorMsg: string = "Show Something";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  imagesList: any;
  formType = ""
  
  constructor(private httpService: HttpServiceService) { }


  ngOnInit(): void {
    this.getProductInfo();
  }

  getProductInfo() {

    console.log(history.state[0])
    const url = `/shop/products/${history.state[0]}`
    this.httpService.get(url).subscribe({
      next: res => {
        console.log(res)
        this.product = res;
        this.profileImage = res.images[0].url;
      },
      error: err => console.log(err)
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

  // changing profile image
  changeProfileImage(index: number) {

    this.profileImage = this.product.images[index].url;
  }

  // Get image form frontend
  getSelectedImage(event: Event): void {

    let images: any = (event.target as HTMLInputElement).files;
    images = Object.values(images);

    this.imagesList =
      this.imagesList === undefined ? images : [...images, ...this.imagesList];
  }
}
