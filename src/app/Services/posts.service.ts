import { Injectable } from '@angular/core';
import { post } from '../types/post.interface';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  private posts: post[] = [];
  private postsUpdated = new Subject<post[]>();

  getPost() {
    this.http.get<{message: string, posts: any}>("http://localhost:3000/api/posts")
    .pipe(map((postData)=>{
      return postData.posts.map((post: { title: String; content: String; _id: String; })=>{
        return{
          title: post.title,
          content: post.content,
          id: post._id,
        }
      });
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: post = {id: "", title: title, content: content};
    this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts", post).subscribe((responseData) => {
      const Id = responseData.postId;
      post.id = Id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(id: string) {
    this.http.delete("http://localhost:3000/api/posts/" + id)
      .subscribe(()=>{
        const updatedPosts = this.posts.filter((post)=>post.id!==id);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
