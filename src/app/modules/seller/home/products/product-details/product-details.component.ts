import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  updateForm: FormGroup;
  imageForm: FormGroup;
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

  // Getter Methods

  get getName() {

    return this.updateForm.get('name');
  }

  get getDesc() {

    return this.updateForm.get('desc');
  }

  get getPrice() {

    return this.updateForm.get('price');
  }

  setUpdateForm() {

    this.updateForm = new FormGroup({
      name: new FormControl(this.product.name,[Validators.required]),
      description: new FormControl(this.product.description,[Validators.required]),
      price: new FormControl(this.product.price,[Validators.required]),
    });
  }

  setImageForm() {

    this.imageForm = new FormGroup({
      images: new FormControl("",[Validators.required])
    })
  }

  getProductInfo() {

    console.log(history.state[0])
    const url = `/products/${history.state[0]}`
    this.httpService.get(url).subscribe({
      next: res => {
        console.log(res)
        this.product = res;
        this.profileImage = res.images[0].url;
        this.setUpdateForm();
        this.setImageForm();
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

  // Delete Image
  deleteImage(public_id: string) {

    const url = `/products/images/${history.state[0]}`;
    
    this.httpService.patch(url,"",{delete: public_id}).subscribe({
      next: res => {
        this.showPop("Image deleted successfully");
        this.getProductInfo();
      },
      error: err => this.showPop(err.error.msg),
    });
  }

  // Get image form frontend
  getSelectedImage(event: Event): void {

    let images: any = (event.target as HTMLInputElement).files;
    images = Object.values(images);

    this.imagesList =
      this.imagesList === undefined ? images : [...images, ...this.imagesList];
  }

  // Update product
  updateProduct() {
    
    const url=`/products/${this.product._id}`
    this.httpService.patch(url,"",this.updateForm.value).subscribe({
      next: res => {this.showPop("Product updated successfully"); this.product = res},
      error: err => this.showPop(err.error.message)
    })
  }

  // Add Image 
  updateImage() {

    let images = new FormData();
    this.imagesList.map((data: File) => images.append("new_images", data));

    const url = `/products/images/${history.state[0]}`;
    
    this.httpService.patch(url,"",images).subscribe({
      next: res => {
        this.showPop("Image Added successfully");
        this.getProductInfo();
      },
      error: err => this.showPop(err.error.msg),
    });
  }
}
