import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {CreateUser, UpdateUser, User} from "../interfaces/user.interface";
import {UserListOptionsInterface} from "../interfaces/user-list-options.interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl + '/users/';

  getUsers(options?: UserListOptionsInterface): Promise<User[]> {
    return this.http.get<User[]>(this.baseUrl, {params: {...options}}).toPromise();
  }

  getUserById(id: string) {
    return this.http.get(this.baseUrl + id);
  }

  createUser(user: CreateUser) {
    return this.http.post(this.baseUrl, user).toPromise();
  }

  updateUser(user: UpdateUser) {
    return this.http.put(this.baseUrl + user.id, user).toPromise();
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + id).toPromise();
  }
}
