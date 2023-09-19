import { v4 as uuidv4 } from 'uuid';

export class Note {
  id: string = '';

  constructor(title: string, content: string) {
    this.id = uuidv4();
  }
}
