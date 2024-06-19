import { Component, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('scanner') scan?: ZXingScannerComponent;

  title = 'qr-scanner';
  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_128,
    BarcodeFormat.ITF,
  ];

  isCamera: boolean = false;
  resultCamera: string = '';

  scanSuccess(text: string) {
    console.log(text);
    this.resultCamera = text;
  }

  startCamera() {
    //console.log(this.scan);

    this.isCamera = true;
  }

  stopCamera() {
    this.isCamera = false;
  }
}
