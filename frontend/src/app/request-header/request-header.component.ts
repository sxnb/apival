import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-header',
  templateUrl: './request-header.component.html',
  styleUrls: ['./request-header.component.scss']
})
export class RequestHeaderComponent implements OnInit {

  @Input('header')
  public header: any = {};

  public defaultList: any = ['A-IM', 'Accept', 'Accept-Charset', 'Accept-Encoding', 'Accept-Language',
    'Accept-Datetime', 'Access-Control-Request-Method', 'Access-Control-Request-Headers',
    'Authorization', 'Cache-Control', 'Connection', 'Content-Length', 'Content-MD5', 'Content-Type',
    'Cookie', 'Date', 'Expect', 'Forwarded', 'From', 'Host', 'HTTP2-Settings', 'If-Match',
    'If-Modified-Since', 'If-None-Match', 'If-Range', 'If-Unmodified-Since', 'Max-Forwards', 'Origin',
    'Pragma', 'Proxy-Authorization', 'Range', 'Referer [sic]', 'TE', 'User-Agent', 'Upgrade', 'Via', 'Warning'];

  constructor() { }

  ngOnInit() {
  }

  handleResultSelected(e: any) {
    this.header.name = e;
  }

}
