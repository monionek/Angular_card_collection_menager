import { Component } from '@angular/core';
import { PostService } from '../../service/post-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-post-form-component',
  imports: [FormsModule],
  templateUrl: './post-form-component.html',
  styleUrl: './post-form-component.scss',
})
export class PostFormComponent {
  public title: string = '';
  public content: string = '';

  constructor(private postService: PostService) {}

  public add() {
    this.postService.addPost(this.title, this.content);
  }
}
