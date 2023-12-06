import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

@NgModule({
  imports: [HeaderComponent, PostCreateComponent, PostListComponent],
  exports: [HeaderComponent, PostCreateComponent, PostListComponent],
})
export class ComponentsModule {}
