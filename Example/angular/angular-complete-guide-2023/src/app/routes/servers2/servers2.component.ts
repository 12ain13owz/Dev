import { Component } from '@angular/core';
import { Servers2Service } from './servers2.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers2',
  templateUrl: './servers2.component.html',
  styleUrls: ['./servers2.component.scss'],
})
export class Servers2Component {
  servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: Servers2Service,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // this.router.navigate(['/servers'], { relativeTo: this.route });
  }
}
