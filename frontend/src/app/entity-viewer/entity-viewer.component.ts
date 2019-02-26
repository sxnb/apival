import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'entity-viewer',
  templateUrl: './entity-viewer.component.html',
  styleUrls: ['./entity-viewer.component.scss']
})
export class EntityViewerComponent implements OnInit {

  @Input('entity')
  public entity: any;

  constructor() { }

  ngOnInit() {
  }

}
