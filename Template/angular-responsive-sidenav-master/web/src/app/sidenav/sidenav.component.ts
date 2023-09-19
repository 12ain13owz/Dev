import { Component, OnInit, Input } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  opened = true;
  change = 'side';
  // expandHeight = '42px';
  // collapseHeight = '42px';
  // displayMode = 'flat'
  watcher: Subscription;
  // customCollapsedHeight: string = '90px'; //ความสูงของตัวปุ่มที่อยู่ข้างใน Sidenav 
  // customExpandedHeight: string = '90px';
  // rowHeight:string;
  // col:string;
  // rHeight:string;
  // innerWidth: any;
  // cols:string ="1";

  constructor(media: ObservableMedia) {
          this.opened = true; //กำหนดค่าเริ่มต้น
          this.change = 'side'; //กำหนด Mode Sidenav เริ่มต้นและจะมีอยู่ 3  Mode คือ  over', 'push' , 'side'
        // this.rowHeight = "2.5:1"; // card รายละเอียด
        // this.rHeight = "4:1"; // card สถานะเเละ API
        // this.col = "2";
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' ) { // ขนาดหน้าจอโทรศัพท์
        this.opened = false;
        this.change = 'over';
        // this.rowHeight = "0.6:0.9";  // card รายละเอียด
        // this.rHeight = "1.8:1"; // card สถานะเเละ API
        // this.col = "1";
      } else if(change.mqAlias === 'sm') { // ขนาดหน้าจอ tablets 
        this.opened = false;
        this.change = 'over';
        // this.rowHeight = "1.5:1";  // card รายละเอียด
        // this.rHeight = "3.2:1"; // card สถานะเเละ API
        // this.col = "1";
      } else if(change.mqAlias === 'md') { // ขนาดหน้าจอ small laptops เช่น Ipad
        this.opened = true;
        this.change = 'side';
        // this.rowHeight = "1.5:1";  // card รายละเอียด
        // this.rHeight = "3.2:1"; // card สถานะเเละ API
        // this.col = "1";
      }
      else { // ขนาดหน้าจอ laptops and desktops เช่น Ipad Pro , Notebook
        this.opened = true;
        this.change = 'side';
        // this.rowHeight = "2.5:1"; // card รายละเอียด
        // this.rHeight = "4:1"; // card สถานะเเละ API
        // this.col = "2";
      }
    });

  }

  ngOnInit() {
  }

}

