import { Component } from '@angular/core';
import { Servers2Service } from '../servers2.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server2',
  templateUrl: './server2.component.html',
  styleUrls: ['./server2.component.scss'],
})
export class Server2Component {
  server: { id: number; name: string; status: string };
  subscriptiom = new Subscription();

  constructor(
    private serversService: Servers2Service,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.subscriptiom = this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // });

    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }

  ngOnDestroy(): void {
    this.subscriptiom.unsubscribe();
  }
}
