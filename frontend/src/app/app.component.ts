import { Component, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  public exportedData: any = {};
  public rawData: string = '';
  public importData: string = '';

  public downloadJsonHref: any;
  modalRef: BsModalRef;

  constructor(private sanitizer: DomSanitizer, private modalService: BsModalService, public data: DataService) {

  }

  openExportModal(template: TemplateRef<any>) {
    this.export();
    let theJSON = JSON.stringify(this.exportedData, null, 4);
    let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
    this.modalRef = this.modalService.show(template);
  }

  public export() {
      this.exportedData = this.data.export();
      this.rawData = JSON.stringify(this.exportedData, null, 4);
  }

  openImportModal(template: TemplateRef<any>) {
    this.importData = '';
    this.modalRef = this.modalService.show(template);
  }

  public import() {
    this.data.import(this.importData);
    this.modalRef.hide();
  }

  public restoreFromStorage() {
    this.data.restoreFromStorage();
    alert('Data restored.');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
