import { Component,OnInit,inject,DestroyRef} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';
function MustContainQuestionmark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
return {doesNotContainQuestionMark: true};
}
function EmailIsUnique(control: AbstractControl){
  if(control.value !== 'swathipuskoori@gmail.com'){
    return of(null);
  }
return of({notUnique: true});
}
let initialEmailValue='';
const savedForm = window.localStorage.getItem('saved-form');
    if(savedForm){
    const loadedFormData = JSON.parse(savedForm);
    initialEmailValue = loadedFormData.email;
    }

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})


export class LoginComponent implements OnInit{
 private destroyRef = inject(DestroyRef)
  form = new FormGroup({
    email: new FormControl(initialEmailValue,{
      validators: [Validators.email, Validators.required],
      asyncValidators:[EmailIsUnique]
    }),
    password: new FormControl('',{
      validators: [Validators.required, Validators.minLength(6), MustContainQuestionmark]
    })
  });
  get emailIsInvalid(){
    return this.form.controls.email.touched && 
    this.form.controls.email.dirty && 
    this.form.controls.email.invalid
  }
  get passwordIsInvalid(){
  return this.form.controls.password.touched && 
  this.form.controls.password.dirty && 
  this.form.controls.password.invalid
  }
  ngOnInit() {
  //  const savedForm = window.localStorage.getItem('saved-form');
  //  if(savedForm){
  //   const loadedFormData = JSON.parse(savedForm);
  //   const savedEmail = loadedFormData.email;
  //   this.form.patchValue({
  //     email: savedEmail
  //   })
  //   setTimeout(()=>{
  //     this.form.controls['email'].setValue(savedEmail);
  //    },1);
  //  }

   const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value=>{
        window.localStorage.setItem('saved-form', JSON.stringify({email: value.email}))
      } 
    });
    this.destroyRef.onDestroy(()=> subscription?.unsubscribe());
  }
  onSubmit(){
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const entedPassword = this.form.value.password;
    console.log(enteredEmail,entedPassword);
  }
}