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
              imagePath: post.imagePath,
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

  addPost(post: Post, image: File | string) {
    const postData = new FormData();

    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image);

    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((responseData) => {
        const postData = {
          id: responseData.post.id,
          title: post.title,
          content: post.content,
          imagePath: responseData.post.imagePath,
        };

        this.posts.push(postData);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', image, post.title);
    } else {
      postData = {
        title: post.title,
        content: post.content,
        imagePath: image,
      };
    }

    this.http
      .put<{ message: string; imagePath: string }>(
        'http://localhost:3000/api/posts/' + post.id,
        postData
      )
      .subscribe((responseData) => {
        const updatePosts = [...this.posts];
        const oldPostIndex = updatePosts.findIndex((p) => p.id === post.id);
        const postData = {
          id: post.id,
          title: post.title,
          content: post.content,
          imagePath: responseData.imagePath,
        };

        updatePosts[oldPostIndex] = postData;
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
