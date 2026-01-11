import { FormControl } from "@angular/forms";

export interface LoginFormModel {
    login: FormControl<string>,
    password: FormControl<string>
}