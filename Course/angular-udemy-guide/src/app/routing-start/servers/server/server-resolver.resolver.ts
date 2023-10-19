import { Injectable, inject } from '@angular/core';
import { ServersService } from './../servers.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface Server {
  id: number;
  name: string;
  status: string;
}

// old
@Injectable({ providedIn: 'root' })
export class ServerResolver implements Resolve<Server> {
  constructor(private ServersServiceL: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Server | Observable<Server> | Promise<Server> {
    return this.ServersServiceL.getServer(+route.params['id']);
  }
}

// new
export const serverResolver: ResolveFn<Server> = (route, state) => {
  const serversService = inject(ServersService);
  return serversService.getServer(+route.params['id']);
};
