import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from 'src/app/Services/posts.service';
import { post } from 'src/app/types/post.interface';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  enteredValue = '';
  enteredTitle = '';

  private mode = 'create';
  private postId: string;
  post: post;

  constructor(public postService: PostsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);
      } else {
        this.mode = 'create:';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.postService.addPost(form.value.enteredText, form.value.enteredValue);
    } else {
      this.postService.updatePost(
        this.postId,
        form.value.enteredText,
        form.value.enteredValue
      );
    }
    form.resetForm();
  }
}
