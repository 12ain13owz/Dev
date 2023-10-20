import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flex-layout';
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  private watcher?: Subscription;
  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver
  ) {}

  ngOnInit(): void {
    this.watcher = this.mediaObserver.asObservable().subscribe((change) => {
      console.log(change);
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.watcher?.unsubscribe();
  }
}

interface Food {
  value: string;
  viewValue: string;
}
