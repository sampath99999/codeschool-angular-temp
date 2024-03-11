import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {RestApiService} from "../services/rest-api.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
  })
  formSubmitted: boolean = false;
  apiService: RestApiService = inject(RestApiService);
  router = inject(Router);
  http = inject(HttpClient);

  login(): any {
    this.formSubmitted = true;
    console.log(this.loginFormGroup.get("username")?.errors);
    if (this.loginFormGroup.invalid) {
      return false;
    }

    this.apiService.postData("/login.php", this.loginFormGroup.value).then((res: any) => {
      Swal.fire("Success", "Login successful", "success");
      localStorage.setItem("token", res.token);
      this.router.navigate(["dashboard"]);
    }, (err: any) => {
      console.log(err);
    })
  }

  isFieldInvalid(field: string) {
    return this.loginFormGroup.get(field)?.invalid && (this.loginFormGroup.get(field)?.touched || this.loginFormGroup.get(field)?.dirty || this.formSubmitted)
  }

  getErrorMessage(field: string, label: string): string {
    let formControlErrors = this.loginFormGroup.get(field)?.errors;
    if (formControlErrors) {
      let firstError = Object.keys(this.loginFormGroup.get(field)?.errors as Object)[0];
      switch (firstError) {
        case 'required':
          return `${label} is required`;
        case 'minlength':
          return `${label} must be at least ${formControlErrors['minlength']?.requiredLength} characters`;
        case 'maxlength':
          return `${label} must be at most ${formControlErrors['maxlength']?.requiredLength} characters`;
      }
    }
    return '';
  }
}
