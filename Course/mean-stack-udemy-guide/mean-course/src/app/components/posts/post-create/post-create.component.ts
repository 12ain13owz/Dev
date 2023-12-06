import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreModule } from '../../../core/core.module';
import { Post } from '../../post.model';
import { PostService } from '../../post.service';
import { PostModule } from '../../post.module';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CoreModule, PostModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  constructor(private postService: PostService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) return;

    this.postService.addPost(form.value);
    form.resetForm();
  }
}

// newPost: string = 'No content';
// input3: string;
// @ViewChild('postInput', { static: true }) input: ElementRef;
// @ViewChild('textInput', { static: true }) input2: ElementRef;
// onAddPost() {
//   this.newPost = "The user's new post";
//   const input = this.input.nativeElement as HTMLInputElement;
//   const input2 = <HTMLInputElement>this.input2.nativeElement;
//   console.log('Input 1', input.value);
//   console.log('Input 2', input2.value);
//   console.log('Input 3', this.input3);
// }
