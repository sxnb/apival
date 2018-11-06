import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataService } from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apidoc';

  public exportedData = {};
  public rawData = '';

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, public data: DataService) {

  }

  openExportModal(template: TemplateRef<any>) {
    this.export();

    this.modalRef = this.modalService.show(template);
  }

  public export() {
      this.exportedData = this.data.export();
      this.rawData = JSON.stringify(this.exportedData, null, 4);
  }
}
