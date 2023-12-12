import { NgModule } from '@angular/core';
import { PostService } from './post.service';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [CoreModule, RouterModule, PostRoutingModule],
  providers: [PostService],
})
export class PostModule {}
