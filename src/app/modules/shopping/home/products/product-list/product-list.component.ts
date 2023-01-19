import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";
import { addToCart } from "src/app/actions/addToCart.action";
import { Store } from "@ngrx/store";

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
  products: any;
  limit: number = 10;
  sortBy: string = "name";
  searched: string = "";

  constructor(private httpService: HttpServiceService, private router: Router,private store: Store<{ cart: [] }>) {}

  ngOnInit(): void {
    const params = `page=${1}&limit=${this.limit}&sortBy=${this.sortBy}`;

    this.getProductList(params);
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

  // Set Page limit [Completed]
  setDataLimit(limit: number, page: number) {
    if (this.products.results.length < limit) {
      page = page - 1;
    }
    this.limit = limit;
    this.getProductList(`limit=${limit}&page=${page}&sortBy=${this.sortBy}`);
  }

  // get product list
  getProductList(params: string = "") {
    const url = `/shop/products?`;

    this.httpService.get(url, params).subscribe({
      next: (res) => {
        this.products = res;
        console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clicked() {
    console.log("Hello");
    
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

  // function to apply pagination
  applyPagination(page: number) {
    let params = `limit=${this.limit}&page=${page}&sortBy=${this.sortBy}`;
    this.getProductList(params);
  }

  submitForm() {
    let productForm = this.productForm.value;
    let productData: FormData = new FormData();
    const url = "/products";
    const params = `page=${this.products.page}&limit=${
      this.limit
    }&sortBy=${"name"}`;

    productData.append("name", productForm.name);
    productData.append("description", productForm.description);
    productData.append("price", productForm.price);

    this.imagesList.map((data: File) => productData.append("images", data));

    this.httpService.post(url, "", productData).subscribe({
      next: (res) => {
        this.showPop("Product Added Successfully");
        this.getProductList(params);
      },
      error: (err) => this.showPop(err.error.message),
    });
  }

  getSelected(event: any, page: number, type: string) {
    
    this.sortBy = type === "sortBy" ? event.target.value : "name";
    this.limit = type === "limit" ? event.target.value : 10;

    const params =
      type === "sortBy"
        ? `sortBy=${this.sortBy}&page=${page}&limit=${this.products.limit}`
        : `limit=${this.limit}&page=${page}&sortBy=${this.sortBy}`;

    this.getProductList(params);
  }

  getSearched() {
    const params =
      this.searched === ""
        ? `page=${1}&limit=${this.limit}&sortBy=${this.sortBy}`
        : `name=${this.searched}`;
    this.getProductList(params);
  }

  addToCart(product: any) {

    product['productId'] = product['_id'];

    this.store.dispatch(addToCart(product))
  }

  getId(product: any) {
    console.log(product._id);
  }
}
