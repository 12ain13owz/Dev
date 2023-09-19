import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../model/account.model';

@Pipe({
  name: 'role',
})
export class RolePipe implements PipeTransform {
  transform(value: Role, ...args: unknown[]): unknown {
    return Object.values(Role)[value];
  }
}
