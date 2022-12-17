import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersdataService } from 'src/app/services/usersdata.service';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  // Instance of FormGroup for form
  registerForm: FormGroup;
  checked: boolean = false;
  errorMsg: string = "";
  errorMsgClass: {snackbar: boolean, show: boolean} = {
    snackbar: true,
    show: false
  };

  constructor(private usersData: UsersdataService, private router: Router,
    private httpService: HttpServiceService,private recaptchaV3Service: ReCaptchaV3Service) {}

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*$'),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'), // Validator for email
      ]),
      company: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      confPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      captcha: new FormControl((''),[Validators.required])
    });
  }

  // Getter Methods
  get getName() {
    return this.registerForm.get('name');
  }

  get getEmail() {
    return this.registerForm.get('email');
  }

  get getCompName() {
    return this.registerForm.get('company');
  }

  get getPass() {
    return this.registerForm.get('password');
  }

  get getConfPass() {
    return this.registerForm.get('confPassword');
  }

  get getCaptcha() {

    return this.registerForm.get('captcha');
  }

  // captcha function
  public onCaptchaChecked(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => this.registerForm.value.captcha = token);
  }

  // show popup code
  showPop(message: string) {

    this.errorMsgClass.show = true;
    this.errorMsg = message
    setTimeout(() =>{  
      this.errorMsgClass.show = false;
    }, 3000)
  }

  // Function which is called when a user clicks on register btn
  registerAUser() {
    if (this.registerForm.invalid) {
        this.showPop("Form submitted is invalid")
    } else {

      let url = "/auth/register";
      let registerValue = this.registerForm.value;

      // removing captcha and password btn
      delete registerValue.confPassword;  

      this.httpService.setToDB(registerValue,url).subscribe((data) => {
        this.showPop("User Registered Successfully");
        setTimeout(() => this.router.navigate(['/auth/login']),3000)
      },
      (err) => {
        this.showPop(err.error.message)
      })             
    }
  }

  // This function helps in showing and hidding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }
}