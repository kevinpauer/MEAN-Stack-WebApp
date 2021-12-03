import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { PostsService } from 'src/app/Services/posts.service';
import { post } from './../../../types/post.interface'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, OnDestroy {

  posts: post[] = []
  private postsSub: Subscription = new Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPost();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
