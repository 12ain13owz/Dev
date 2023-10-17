import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from './post.model';
import { Subject, catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class PostsService {
  private apiUrl = environment.apiUrl;
  error = new Subject<string>();
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(this.apiUrl + 'posts.json', postData, {
        observe: 'response',
      })
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(this.apiUrl + 'posts.json', {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello',
        }),
        params: searchParams,
        responseType: 'json',
      })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            // console.log(key);
            // console.log(responseData[key]);
            if (responseData.hasOwnProperty(key))
              postsArray.push({ ...responseData[key], id: key });
          }
          return postsArray;
        }),
        catchError((errorRes) => throwError(() => errorRes))
      );
  }

  deletePosts() {
    return this.http
      .delete(this.apiUrl + 'posts.json', {
        observe: 'events',
        responseType: 'text',
      })
      .pipe(
        tap((event) => {
          console.log('Event:', event);

          if (event.type === HttpEventType.Sent) {
            console.log('Sent :', event);
          }
          if (event.type === HttpEventType.Response) {
            console.log('Response:', event.body);
          }
        })
      );
  }
}
