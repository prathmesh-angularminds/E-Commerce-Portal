import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from "src/app/services/http-service.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  productForm: FormGroup;
  imagesList: any;
  productFormData: FormData;
  errorMsg: string = "Show Something";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  productList: any;

  constructor(private httpService: HttpServiceService) {}

  ngOnInit(): void {
    this.getProductList();
    this.setProductForm();
  }

  // Getter methods
  get getName() {
    return this.productForm.get("name");
  }

  get getDesc() {
    return this.productForm.get("description");
  }

  get getPrice() {
    return this.productForm.get("price");
  }

  // gget product list
  getProductList(sort:string = "name",page:number = 1) {
    const url = `/products?sortBy=${sort}&page=${page}`;

    this.httpService.get(url).subscribe({
      next: (res) => (this.productList = res.results),
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Get image form frontend
  getSelectedImage(event: Event): void {
    let images: any = (event.target as HTMLInputElement).files;

    images = Object.values(images);

    this.imagesList =
      this.imagesList === undefined ? images : [...images, ...this.imagesList];
  }

  // Set Product Form
  setProductForm() {
    this.productForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
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

  // Delete Product
  deleteProduct(id: string) {
    const url = `/products/${id}`;
    this.httpService.delete(url).subscribe({
      next: (res) => {
        this.showPop("Product Deleted Successfully");
        this.getProductList();
      },
      error: (err) => console.log(err),
    });
    console.log(id);
  }

  submitForm() {
    let productForm = this.productForm.value;
    let productData: FormData = new FormData();
    const url = "/products";

    productData.append("name", productForm.name);
    productData.append("description", productForm.description);
    productData.append("price", productForm.price);

    this.imagesList.map((data: File) => productData.append("images", data));

    this.httpService.post(url, "", productData).subscribe({
      next: (res) => {
        this.showPop("Product Added Successfully");
        this.getProductList();
      },
      error: (err) => this.showPop(err.error.message),
    });
  }
}
