import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string =
    this.defaultColor;

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;

    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'blue'
    // );
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
  }

  @HostListener('mouseenter') mouseover(evenData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'blue'
    // );

    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseout(evenData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'transparent'
    // );

    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
    this.backgroundColor = this.defaultColor;
  }
}
