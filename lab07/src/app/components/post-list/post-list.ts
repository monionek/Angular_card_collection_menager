import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../../models/post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../service/post-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList implements OnInit {
  public posts: BlogPost[] = [];
  public editingPostId: number | null = null;
  public newTitle: string = ''
  public newContent: string = ''

  constructor(public postService: PostService) {}

  public deletePost(id: number): void {
    this.postService.deletePost(id);
    this.updatePosts();
  }

  public modifyPost(id: number, newTitle: string, newContent: string): void {
    this.postService.modifyPost(id, newTitle, newContent);
    this.updatePosts();
  }

  public enableEditing(id:number) {
    const post = this.posts.find((p: BlogPost) => p.id === id)
    if (post) {
      this.editingPostId = id
      this.newTitle = post.title;
      this.newContent = post.content;
    }
  }
  public cancelEditing(): void {
    this.editingPostId = null;
    this.newTitle = '';
    this.newContent = '';
  }

  public updatePosts(): void {
    this.posts = this.postService.getPaginatedPosts();
    this.editingPostId = null;
  }

  ngOnInit(): void {
    this.updatePosts();
  }

  public nextPage(): void {
    this.postService.nextPage();
    this.updatePosts();
  }

  public prevPage(): void {
    this.postService.prevPage();
    this.updatePosts();
  }

}
