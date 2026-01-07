import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BlogPost } from '../../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: BlogPost[] = [];
  private readonly postsPerPage: number = 2;
  private currentPage: number = 1;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        this.posts = JSON.parse(savedPosts);
      }
    }
  }
  private savePostsToStorage(): void {
    localStorage.setItem('blogPosts', JSON.stringify(this.posts));
  }
  public addPost(title: string, content: string): void {
    const date: Date = new Date();
    const postId: number = Math.floor((Math.random()*100))+17;
    const newPost: BlogPost = {
      id: postId,
      title: title,
      content: content,
      createdAt: date,
      modifiedAt: null
    };
    this.posts.push(newPost);
    this.savePostsToStorage();
  }

  public modifyPost(id: number, newTitle: string, newContent: string) {
    const post: BlogPost | undefined = this.posts.find((p: BlogPost) => p.id == id);
    if (post) {
      post.title = newTitle;
      post.content = newContent;
      post.modifiedAt = new Date();
      this.savePostsToStorage();
    }
  }

  public deletePost(id: number) {
    this.posts = this.posts.filter((p: BlogPost) => p.id !== id);
    this.savePostsToStorage();
  }

  public getPosts(): BlogPost[] {
    return [...this.posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getPost(id: number): BlogPost | undefined {
    return this.posts.find((p: BlogPost) => p.id == id);
  }
  public getPaginatedPosts(): BlogPost[] {
  const startIndex = (this.currentPage - 1) * this.postsPerPage;
  const endIndex = startIndex + this.postsPerPage;

  return [...this.posts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(startIndex, endIndex);
  }
  public getTotalPages(): number {
    return Math.ceil(this.posts.length / this.postsPerPage);
  }
  public nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  public getCurrentPage(): number {
    return this.currentPage;
  }


}
