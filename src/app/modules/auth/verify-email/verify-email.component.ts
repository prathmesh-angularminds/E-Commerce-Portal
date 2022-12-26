import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  token: string;

  constructor(private router: Router, private httpService: HttpServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getParams();
    this.verifyEmail();
  }

  // Get Params
  getParams() {

    this.route.queryParams.subscribe(
      params => this.token = params["token"]
    )
  }

  verifyEmail() {

    const url = "/auth/verify-email?"
    const params = `token=${this.token}`;

    this.httpService.post(url,params).subscribe({
      next: (res) => {console.log("res: ",res), this.router.navigate(['/app/my-profile'])},
      error: (err) => console.log("err: ",err)
    }); 
  }
}
