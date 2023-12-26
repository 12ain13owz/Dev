import { FormControl } from '@angular/forms';

export interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface LogIn {
  email: string;
  password: string;
}
