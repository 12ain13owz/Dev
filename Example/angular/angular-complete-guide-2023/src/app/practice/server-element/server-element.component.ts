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
  encapsulation: ViewEncapsulation.Emulated,
})
export class ServerElementComponent {
  @Input('srvElement') element: { type: string; name: string; content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  constructor() {
    console.log('1. constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('2. ngOnChanges', changes);
  }

  ngOnInit(): void {
    console.log('3. ngOnInit');
    console.log('3. Text Content: ' + this.header.nativeElement.textContent);
    console.log(
      'Text Content of paragraph: ' + this.paragraph.nativeElement.textContent
    );
  }

  ngDoCheck(): void {
    console.log('4. ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('5. ngAfterContentInit');
    console.log(
      'Text Content of paragraph: ' + this.paragraph.nativeElement.textContent
    );
  }

  ngAfterContentChecked(): void {
    console.log('6. ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('7. ngAfterViewInit');
    console.log('7. Text Content: ' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('8. ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('9. ngOnDestroy');
  }
}
