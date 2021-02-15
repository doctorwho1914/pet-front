import { Component, OnInit } from '@angular/core';
import {CreateUser, UpdateUser, User} from "../interfaces/user.interface";
import {UsersService} from "./users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserListOptionsInterface} from "../interfaces/user-list-options.interface";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public createUserForm: FormGroup;
  public updateUserForm: FormGroup;
  public loadOptions: UserListOptionsInterface = {};

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) { }


  ngOnInit(): void {

    this.createUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    this.updateUserForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(5)])]
    });

    this.load();

  }

  createUser() {
    if (this.createUserForm.invalid) {
      return;
    }

    this.usersService.createUser({
      name: this.createUserForm.controls.name.value,
      email: this.createUserForm.controls.email.value,
      password: this.createUserForm.controls.password.value,
    })
      .then(() => {
        alert('Success');
        this.createUserForm.reset();
        this.load();
      })
      .catch(err => alert(`Error: ${JSON.stringify(err.error.message)}`))
  }

  updateUser() {
    if (this.updateUserForm.invalid) {
      return;
    }

    let userData: UpdateUser = {id: this.updateUserForm.controls.id.value};

    this.updateUserForm.controls.name.touched && (userData.name = this.updateUserForm.controls.name.value);
    this.updateUserForm.controls.email.touched && (userData.email = this.updateUserForm.controls.email.value);
    this.updateUserForm.controls.password.touched && (userData.password = this.updateUserForm.controls.password.value);

    this.usersService.updateUser(userData)
      .then(() => {
        alert('Success');
        this.updateUserForm.reset();
        this.load();
      })
      .catch(err => alert(`Error: ${JSON.stringify(err.error.message)}`))
  }

  load(key?: string, value?: string) {
    (key && value) && (this.loadOptions[key] = value);
    this.usersService.getUsers(this.loadOptions)
      .then(res => this.users = res)
  }

  removeUser(id: string) {
    if (confirm('Remove user?')) {
      this.usersService.deleteUser(id)
        .then(() => alert('Success'))
        .then(() => this.load())
        .catch(err => alert(`Error: ${JSON.stringify(err.error.message)}`))
    }
  }
}
