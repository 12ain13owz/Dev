import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss'],
  // ต่างกันที่ css function นี้ใช้ในการคุม css ระหว่าง component
  // encapsulation: ViewEncapsulation.Emulated, default
  // encapsulation: ViewEncapsulation.None,     css จะออกไปนอก component Ex. label red
  // encapsulation: ViewEncapsulation.ShadowDom ,
})
export class ServerElementComponent {
  @Input('srvElement') element: {
    type: string;
    name: string;
    content: string;
  };

  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  constructor() {
    console.log('1. constructor called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('2. ngOnChanges called', changes);
  }

  ngOnInit(): void {
    console.log('3. ngOnInit called');
    console.log(
      '%cText Content:',
      'color: #ffa500',
      this.header.nativeElement.textContent
    );
    console.log(
      '%cText Content of paragraph:',
      'color:#3cb371',
      this.paragraph.nativeElement.textContent
    );
  }

  ngDoCheck(): void {
    console.log('4. ngDoCheck called');
  }

  ngAfterContentInit(): void {
    console.log('5. ngAfterContentInit called');
    console.log(
      '%cText Content of paragraph:',
      'color:#3cb371',
      this.paragraph.nativeElement.textContent
    );
  }

  ngAfterContentChecked(): void {
    console.log('6. ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    console.log('7. ngAfterViewInit called');
    console.log(
      '%cText Content:',
      'color: #ffa500',
      this.header.nativeElement.textContent
    );
  }

  ngAfterViewChecked(): void {
    console.log('8. ngAfterViewChecked called');
  }

  ngOnDestroy(): void {
    console.log('9. ngOnDestroy called');
  }
}
