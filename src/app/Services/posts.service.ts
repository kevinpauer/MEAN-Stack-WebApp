import { Injectable } from '@angular/core';
import { post } from '../types/post.interface';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  private posts: post[] = [];
  private postsUpdated = new Subject<post[]>();
  
  getPost() {
    this.http.get<{message: string, posts: post[]}>("http://localhost:3000/api/posts")
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: post = {id: "", title: title, content: content};
    this.http.post<{message: string}>("http://localhost:3000/api/posts", post).subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
  
}
