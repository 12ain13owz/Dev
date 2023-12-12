import { Component } from '@angular/core';
import { Post } from '../../post.model';
import { PostService } from '../../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  private subscription: Subscription;
  posts: Post[] = [];
  isLoading: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts();
    this.subscription = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;

        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.postService.deletePost(id);
  }
}
