import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  bookId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: ['']
  });
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');

    if (this.bookId) {
      this.isEditMode = true;
      const book = this.bookService.getBook(this.bookId);
      if (book) {
        this.bookForm.patchValue(book);
      }
    }
  }

  submit(): void {
    if (this.bookForm.invalid) return;

    const book: Book = {
      id: this.bookId ?? crypto.randomUUID(),
      ...this.bookForm.value as Omit<Book, 'id'>
    };

    this.isEditMode
      ? this.bookService.updateBook(book)
      : this.bookService.addBook(book);

    this.router.navigate(['/book/list']);
  }
}
