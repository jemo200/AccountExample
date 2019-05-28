import { Component, OnInit } from '@angular/core';
import Account from '../Account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  accounts: Account[];

  constructor(private as: AccountService) { }

  ngOnInit() {
    this.as
      .getAccounts()
      .subscribe((data: Account[]) => {
        this.accounts = data;
    });
  }

  deleteAccount(id) {
    this.as.deleteAccount(id).subscribe(res => {
      console.log('Deleted');
    });
  }

}
