import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/Services/posts.service';
import { post } from 'src/app/types/post.interface';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {

  enteredValue = "";
  enteredTitle = "";

  constructor(public postService: PostsService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm){ 
    if (form.invalid) {
      return;
    }
    this.postService.addPost(form.value.enteredText, form.value.enteredValue)
    form.resetForm();
  }
}
