import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './Views/Posts/post-list/post-list.component';
import { PostsComponent } from './Views/Posts/posts-create/posts.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostsComponent },
  { path: 'edit/:postId', component: PostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
