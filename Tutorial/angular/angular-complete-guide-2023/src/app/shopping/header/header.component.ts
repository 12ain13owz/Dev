import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DataStroageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription, map } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  // @Output() featureSelected: EventEmitter<string> = new EventEmitter();

  //   onSelect(feature: string) {
  //     this.featureSelected.emit(feature);
  //   }

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStroageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // Rxjs
    // this.userSub = this.authService.user.subscribe((user) => {
    //   this.isAuthenticated = !!user;
    //   console.log('Rxjs', user);
    // });

    // Ngrx
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log('Ngrx', user);
        console.log('Ngrx', !user);
        console.log('Ngrx', !!user);
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
