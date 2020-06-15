import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  private passwordMinLength: number = 6;

  constructor(private fb: FormBuilder,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required,
    ]],
      email: ['', [Validators.required,
      Validators.email]],
      password: ['', [Validators.required,
          Validators.minLength(this.passwordMinLength)
      ]],
      repeatPassword: ['',]
    });
  }
  
  get f(){
    return this.registerForm.controls;
  }

  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }

    this.authService.register(this.f.email.value, this.f.password.value);
  }
}
