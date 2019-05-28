import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {

  angForm: FormGroup;
  account: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private as: AccountService,
    private fb: FormBuilder) {
      this.createForm();
     }

  createForm() {
    this.angForm = this.fb.group({
        username: ['', Validators.required ],
        email: ['', Validators.required ],
        password: ['', Validators.required ]
      });
    }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.as.editAccount(params['id']).subscribe(res => {
        this.account = res;
      });
    });
  }

  updateAccount(username, email, password) {
   this.route.params.subscribe(params => {
      this.as.updateAccount(username, email, password, params['id']);
      this.router.navigate(['account']);
   });
}
}
