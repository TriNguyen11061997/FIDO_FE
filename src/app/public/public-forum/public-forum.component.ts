import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-forum',
  templateUrl: './public-forum.component.html',
  styleUrls: ['./public-forum.component.css']
})
export class PublicForumComponent implements OnInit {

  constructor() { }
  public data = [
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
  ];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}
