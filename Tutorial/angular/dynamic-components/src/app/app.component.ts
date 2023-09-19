import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ContentDirective } from './content.directive';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(ContentDirective, { static: true }) content!: ContentDirective;
  componentFactoryResolver = inject(ComponentFactoryResolver);

  title = 'dynamic-components';
  message: string[] = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum possimus suscipit maiores! Amet, accusamus aut. Odit placeat distinctio enim ratione doloribus quos est? Veritatis itaque tenetur deserunt aperiamfugit consectetur?',
    'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
  ];
  index = 0;

  ngOnInit(): void {
    this.loadComponent();
    this.onChangeMessage();
  }

  loadComponent() {
    if (this.index > 2) this.index = 0;
    const contentCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(ContentComponent);
    const viewContainerRef = this.content.ViewContainerRef;
    viewContainerRef.clear();

    const componentRef =
      viewContainerRef.createComponent<ContentComponent>(contentCmpFactory);

    componentRef.instance.message = this.message[this.index];
  }

  onChangeMessage() {
    setInterval(() => {
      this.index++;
      this.loadComponent();
    }, 3000);
  }
}
