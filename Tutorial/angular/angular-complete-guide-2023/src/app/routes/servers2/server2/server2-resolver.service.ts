import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Servers2Service } from '../servers2.service';
import { Injectable } from '@angular/core';

interface Server2 {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class Server2Resolver implements Resolve<Server2> {
  constructor(private serversService: Servers2Service) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server2> | Promise<Server2> | Server2 {
    return this.serversService.getServer(+route.params['id']);
  }
}
