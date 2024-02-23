import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/service/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false

  constructor(private fb: FormBuilder, private service: AuthserviceService, private toastr: ToastrService,
    private route: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      mobileNumber: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      gender: this.fb.control('', [Validators.required]),
      branch: this.fb.control('', [Validators.required])
    })
  }

  get name() {
    return this.registerForm.get('name')
  }
  get mobileNumber() {
    return this.registerForm.get('mobileNumber')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get gender() {
    return this.registerForm.get('gender')
  }
  get branch() {
    return this.registerForm.get('branch')
  }

  registerSubmit() {
    console.log(this.registerForm);
    this.submitted = true
    const reqbody = {
      name: this.registerForm?.get('name')?.value,
      email: this.registerForm?.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      mobileNumber: this.registerForm.get('mobileNumber')?.value,
      gender: this.registerForm.get('gender')?.value,
      branch: this.registerForm.get('branch')?.value,
    }

    if (this.registerForm.valid) {
      this.service.getReisterApi(reqbody).subscribe((res: any) => {
        console.log(res);
        if(res['message'] === 'Registerd successfylly'){
          this.toastr.success('Register sucess');
          this.route.navigate(['login']);
        } else {
          this.toastr.error(res['message']);
        }
      },
      (error: any) => {
        if (error.error) {
          this.toastr.error(error.message);
        }
      })
    }
    else {
      this.toastr.error("Something went wrong")
    }
  }
  login() {
    this.route.navigate(['login'])
  }

}
