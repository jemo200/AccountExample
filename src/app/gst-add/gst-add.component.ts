import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private as: AccountService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  addAccount(username, email, password) {
    this.as.addAccount(username, email, password);
  }

  ngOnInit() {
  }

}
