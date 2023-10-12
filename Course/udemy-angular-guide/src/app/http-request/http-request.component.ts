import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-http-request',
  templateUrl: './http-request.component.html',
  styleUrls: ['./http-request.component.scss'],
})
export class HttpRequestComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit(): void {
    this.subscription = this.postsService.error.subscribe(
      (errorMessage: string) => (this.error = errorMessage)
    );
    this.onFetchPosts();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(
      (posts: Post[]) => {
        setTimeout(() => {
          this.isFetching = false;
          this.loadedPosts = posts;
        }, 800);
      },
      (error) => {
        console.log(error);
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.deletePosts().subscribe(() => {
      this.isFetching = false;
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }
}
