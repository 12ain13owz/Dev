import { Component, OnInit, Output } from '@angular/core';
import { AccountService } from './using-services/account.service';
import { ObsUserService } from './observables/obs-user.service';
import { Subscription } from 'rxjs';
import { AuthService } from './shopping/auth/auth.service';
import { LoggingService2 } from './logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './shopping/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Angular';
  name: string = 'Max';

  serverElements = [
    { type: 'server', name: 'Test Server', content: 'Just a Test!' },
  ];

  onServerAdded(serverData: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

  onBlueprintAdded(blueprintData: {
    serverName: string;
    serverContent: string;
  }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent,
    });
  }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestoryFirst() {
    this.serverElements.splice(0, 1);
  }

  oddNumbers: number[] = [];
  evenNumbers: number[] = [];
  onInterval(i: number) {
    if (i % 2) this.oddNumbers.push(i);
    else this.evenNumbers.push(i);
  }

  // บทที่ 6
  loadedFeature = 'recipe';
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  // บทที่ 9

  // accounts = [
  //   {
  //     name: 'Master Account',
  //     status: 'active',
  //   },
  //   {
  //     name: 'Testaccount',
  //     status: 'inactive',
  //   },
  //   {
  //     name: 'Hidden Account',
  //     status: 'unknown',
  //   },
  // ];

  // onAccountAdded(newAccount: { name: string; status: string }) {
  //   this.accounts.push(newAccount);
  // }

  // onStatusChanged(updateInfo: { id: number; newStatus: string }) {
  //   this.accounts[updateInfo.id].status = updateInfo.newStatus;
  // }

  accounts: { name: string; status: string }[] = [];

  constructor(
    private AccountService: AccountService,
    private obsUser: ObsUserService,
    private authService: AuthService,
    private loggingService: LoggingService2,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // Rxjs
    // this.authService.autoLogin();

    // Ngrx
    this.store.dispatch(AuthActions.AutoLoginAction());
    this.loggingService.printLog('Hello from AppComponent');
  }

  // Practice Lesson 9

  // ngOnInit(): void {
  //   this.accounts = this.AccountService.accounts;
  // }

  // activeUser: string[] = ['Max', 'Anna'];
  // inactiveUser: string[] = ['Chris', 'Manu'];

  // onSetToActive(index: number) {
  //   this.activeUser.push(this.inactiveUser[index]);
  //   this.inactiveUser.splice(index, 1);
  // }

  // onSetToInActive(index: number) {
  //   this.inactiveUser.push(this.activeUser[index]);
  //   this.activeUser.splice(index, 1);
  // }

  // Learning Lesson 13 eventemit / subject
  // userActivated = false;
  // userSubject = false;
  // private activatedSub: Subscription;

  // ngOnInit(): void {
  //   this.activatedSub = this.obsUser.activatedEmitter.subscribe(
  //     (didActivete) => {
  //       this.userActivated = didActivete;
  //     }
  //   );

  //   this.activatedSub = this.obsUser.activateSubject.subscribe(
  //     (didActivete) => {
  //       this.userSubject = didActivete;
  //     }
  //   );
  // }

  // ngOnDestroy(): void {
  //   this.activatedSub.unsubscribe();
  // }
}
