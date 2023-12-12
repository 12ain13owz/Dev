import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Route } from '@angular/router';
import { PostService } from '../../post.service';
import { Post } from '../../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  private mode = mode.create;
  private postId: string;

  post: Post = {
    title: '',
    content: '',
  };
  isLoading: boolean = false;

  constructor(private postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isLoading = true;
        this.mode = mode.edit;
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
      } else {
        this.mode = mode.create;
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;

    const post: Post = {
      id: this.postId,
      title: form.value.title,
      content: form.value.content,
    };

    if (this.mode === mode.create) {
      this.postService.addPost(post);
      form.resetForm();
    }

    if (this.mode === mode.edit) {
      this.postService.updatePost(post);
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}

enum mode {
  create,
  edit,
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
