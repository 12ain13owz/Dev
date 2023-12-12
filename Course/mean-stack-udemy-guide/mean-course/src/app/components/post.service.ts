import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<Post>('http://localhost:3000/api/posts/' + id);
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string; id: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.id;
        post.id = id;

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post) {
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/api/posts/' + post.id,
        post
      )
      .subscribe((responseData) => {
        const updatePosts = [...this.posts];
        const oldPostIndex = updatePosts.findIndex((p) => p.id === post.id);
        updatePosts[oldPostIndex] = post;
        this.posts = updatePosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(id: string) {
    this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
      const updatePosts = this.posts.filter((post) => post.id !== id);
      this.posts = updatePosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}