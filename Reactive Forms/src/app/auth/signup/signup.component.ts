import { Component, DestroyRef, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function checkPasswordEuality(controlName1: string, controlName2:string){
return (control: AbstractControl)=>{
  const val1 = control.get(controlName1)?.value;
  const val2 = control.get(controlName2)?.value;
  if(val1 === val2){
    return null;
  }
  return {valueEquality: true}
}
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },{validators:[checkPasswordEuality('password','confirmPassword')]}),

    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),

    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    agree: new FormControl(false, { validators: [Validators.required] }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ])
  });
  onSubmit() {
    console.log(this.form);
    const entedPassword = this.form.value.passwords?.password;
    const confirmpassword = this.form.value.passwords?.confirmPassword;
    console.log(entedPassword, confirmpassword);
    if(this.form.invalid){
      return;
    }
    console.log('Invalid Form');
  }
  onReset() {
    this.form.reset();
  }
}
