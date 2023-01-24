import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { addToCart } from "src/app/actions/addToCart.action";
import { HttpServiceService } from "src/app/services/http-service.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
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
  qty: number = 1;

  constructor(
    private httpService: HttpServiceService,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ cart: [] }>
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.queryParams.subscribe((params: any) =>
      this.getProductInfo(params.id)
    );
  }

  getProductInfo(id: string) {
    const url = `/shop/products/${id}`;

    this.httpService.get(url).subscribe({
      next: (res) => {
        console.log(res);
        this.product = res;
        this.profileImage = res.images[0].url;
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

  addToCart() {

    this.product["productId"] = this.product["_id"];
    this.product['qty'] = this.qty;
    this.store.dispatch(addToCart(this.product));
  }
}
