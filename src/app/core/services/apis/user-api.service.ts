import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {

  constructor(private http: HttpClient) {}
  private getReq(id: string): Observable<object> {
    return this.http.get(`/api/user/${id}`) as Observable<JSON>;
  }
  private postReq(username: string, password: string): Observable<JSON> {
    return this.http.post(`/api/user/`, {
      username,
      password,
    }) as Observable<JSON>;
  }

  reqUser(id: string) {
    return this.getReq(id).pipe(
      take(1),
      map((orig: any) => {
        const val = orig.results;
        return typeof val === 'object'
          ? {
              ...val,
              name: {
                ...(val as User).name,
                full: `${(val as User).name!.first} ${
                  (val as User).name!.last
                }`,
              },
            }
          : val;
      })
    );
  }
  validateUser(username: string, password: string): Observable<User | string> {
    return this.postReq(username, password).pipe(
      take(1),
      map((orig: any) => {
        const val = orig.results;
        return typeof val === 'object'
          ? {
              ...val,
              name: {
                ...(val as User).name,
                full: `${(val as User).name!.first} ${
                  (val as User).name!.last
                }`,
              },
            }
          : val;
      })
    );
  }
}
