import { FormGroup, FormControl } from "@angular/forms";

export type LoginForm = FormGroup <{
    login: FormControl<string>,
    password: FormControl<string>
}>