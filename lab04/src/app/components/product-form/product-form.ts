import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-form',
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  public productName: string = '';

  @Output() public add: EventEmitter<string> = new EventEmitter();

  public submit(): void {
    this.add.emit(this.productName);
    this.productName = '';
  }
}
