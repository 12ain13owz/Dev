import { FormControl } from '@angular/forms';

export interface SignUpForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
}
