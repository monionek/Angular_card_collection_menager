import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedBooks = localStorage.getItem('books');
      if (savedBooks) {
        this.books = JSON.parse(savedBooks);
      }
    }
  }

  private save() {
    localStorage.setItem("books", JSON.stringify(this.books)) 
  }

  addBook(book: Book): void {
    this.books.push(book);
    this.save();
  }
  getBooks() {
    return [...this.books];
  }
  getBook(id: string) {
    return this.books.find((b: Book) => b.id === id);
  }
  deleteBook(id: string) {
    this.books = this.books.filter((b: Book) => b.id !== id);
    this.save();
  }
  updateBook(updated: Book): void {
    this.books = this.books.map(b => b.id === updated.id ? updated : b);
    this.save();
  }
}
