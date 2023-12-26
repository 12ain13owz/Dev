import { Component } from '@angular/core';
import { Post } from '../../post.model';
import { PostService } from '../../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  private subscription: Subscription;
  posts: Post[] = [];
  isLoading: boolean = false;
  totalPosts: number = 0;
  postsPerPage: number = 5;
  currentPage: number = 1;
  pageSizeOptins: number[] = [1, 2, 5, 10];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.subscription = this.postService
      .getPostUpdateListener()
      .subscribe(({ posts, postCount }) => {
        this.posts = posts;
        this.totalPosts = postCount;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);

    setTimeout(() => {
      this.isLoading = true;
    }, 200);
  }
}
