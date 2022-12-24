import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";

@Component({
  selector: "app-verify-account",
  templateUrl: "./verify-account.component.html",
  styleUrls: ["./verify-account.component.scss"],
})
export class VerifyAccountComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.httpService
      .post(
        "/auth/verify-email",
        `?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2ExZWNlY2I5ZDlmMGVkMjYxOGNmNzAiLCJpYXQiOjE2NzE4ODgxMTcsImV4cCI6MTY3MTg5MTcxNywidHlwZSI6InZlcmlmeUVtYWlsIn0.q0iT2FCwNZsTmyIS7xKIxucFNwTmlcz2dvwHfeLN1SY`,
        {}
      )
      .subscribe({
        next: (res) => console.log("res: ", res),
        error: (err) => console.log("err: ", err),
      });
    this.route.queryParams.subscribe((token) => {});
  }
}
