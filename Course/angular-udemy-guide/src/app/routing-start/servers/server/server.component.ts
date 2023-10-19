import { Component } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent {
  server: { id: number; name: string; status: string };
  subscription: Subscription;

  constructor(
    // private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
    // this.subscription = this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}

// this.router.navigate(['servers', id, 'edit'], {
//   relativeTo: this.route,
//   queryParams: { allowEdit: '1' },
//   fragment: 'loading',
// });
