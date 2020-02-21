import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  form;
  emailPattern: string= '/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required,
         Validators.minLength(3), 
         Validators.maxLength(15)]
        ],
      email: ['', [Validators.required,
        Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
    repeatPassword: ['']
    });
    
  }

  register(){
    console.log(this.form);
  }

  get f(){
    return this.form.controls;
  }
}
