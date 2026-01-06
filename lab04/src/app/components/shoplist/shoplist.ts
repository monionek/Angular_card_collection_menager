import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shoplist',
  imports: [FormsModule, CommonModule],
  templateUrl: './shoplist.html',
  styleUrl: './shoplist.scss',
})
export class Shoplist {
  @Input() public products: Product[] = [];
}
