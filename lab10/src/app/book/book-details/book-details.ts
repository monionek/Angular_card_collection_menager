import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book-service';
@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
})
export class BookDetails implements OnInit {

  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.book = this.bookService.getBook(id);
    }

    // jeśli ktoś ręcznie wpisze złe id
    if (!this.book) {
      this.router.navigate(['/not-found']);
    }
  }

  deleteBook(): void {
    if (!this.book) return;

    this.bookService.deleteBook(this.book.id);
    this.router.navigate(['/book/list']);
  }

  goBack(): void {
    this.location.back();
  }
}