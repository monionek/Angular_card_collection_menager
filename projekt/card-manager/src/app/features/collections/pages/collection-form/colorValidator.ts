import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function colorsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as Record<string, boolean>;

    const selectedValues = Object.values(value);
    const selectedCount = selectedValues.filter(Boolean).length;
    const isColorlessSelected = value['COLORLESS'] === true;

    if (selectedCount === 0) {
      return { noColorSelected: true };
    }

    if (isColorlessSelected && selectedCount > 1) {
      return { invalidColorCombination: true };
    }

    return null;
  };
}