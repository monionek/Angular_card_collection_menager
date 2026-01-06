import { Component, signal } from '@angular/core';
import { Shoplist } from './components/shoplist/shoplist';
import { Product } from '../models/product';
import { Alert } from './components/alert/alert';
import { ProductForm } from './components/product-form/product-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Shoplist, Alert, ProductForm, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lab04');
  public shoplist: Product[] = [];
  public errMessage: string | null = null;
  public addProduct(name: string): void {
    const trimmedName: string = name.trim();

    if (!trimmedName) {
      this.errMessage = "Nie można dodać pustego produktu";
      return
    }

    if (this.shoplist.some((p:Product) => p.name == trimmedName)) {
      this.errMessage = "Ten produkt już jest dodany do listy";
      return
    }

    this.shoplist.push({name: trimmedName, bought: false})
    this.errMessage = null;
  }

  public removeBought(): void {
    this.shoplist = this.shoplist.filter((p: Product) => !p.bought);
  }

  public clearErr(): void {
    this.errMessage = null
  }
}
