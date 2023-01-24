import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";
import { addToCart } from "src/app/actions/addToCart.action";
import { Store } from "@ngrx/store";
import { SearchDataService } from "src/app/services/search-data.service";

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

  constructor(
    private httpService: HttpServiceService,
    private search: SearchDataService,
    private router: Router,
    private store: Store<{ cart: [] }>
  ) {}

  ngOnInit(): void {
    let name: string = "";

    this.setParams(name);

    this.search.searchObserver.subscribe((data) => {
      if (data === true) {
        setTimeout(() => {
          name = this.search.getSearchValue();
          this.setParams(name);
          this.search.searchObserver.next(false);
        }, 0);
      }
    });
  }

  setParams(name: string) {
    const params =
      name === undefined || name === ""
        ? `page=${1}&limit=${this.limit}&sortBy=${this.sortBy}`
        : `name=${name}&page=${1}&limit=${this.limit}&sortBy=${this.sortBy}`;
    console.log(params);
    this.getProductList(params);
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

  // Get image form frontend
  getSelectedImage(event: Event): void {
    let images: any = (event.target as HTMLInputElement).files;

    images = Object.values(images);

    this.imagesList =
      this.imagesList === undefined ? images : [...images, ...this.imagesList];
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

  getSelected(event: any, page: number, type: string) {
    this.sortBy = type === "sortBy" ? event.target.value : "name";
    this.limit = type === "limit" ? event.target.value : 10;

    const params =
      type === "sortBy"
        ? `sortBy=${this.sortBy}&page=${page}&limit=${this.products.limit}`
        : `limit=${this.limit}&page=${page}&sortBy=${this.sortBy}`;

    this.getProductList(params);
  }

  viewProduct(id: string) {

    this.router.navigate(['/app/product/product-details'],{queryParams: {id: id}});
  }
}
