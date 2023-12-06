import { Component, OnInit } from '@angular/core';
import { CoreModule } from '../../../core/core.module';
import { Post } from '../../post.model';
import { PostService } from '../../post.service';
import { Subscription } from 'rxjs';
import { PostModule } from '../../post.module';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CoreModule, PostModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  private subscription: Subscription;
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.subscription = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
