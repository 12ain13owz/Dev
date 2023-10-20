import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  group,
  AnimationEvent,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px)',
        })
      ),
      transition('normal <=> highlighted', animate(300)),
    ]),

    trigger('wideState', [
      state(
        'normal',
        style({
          backgroundColor: 'red',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          backgroundColor: 'green',
          transform: 'translateX(0) scale(0.5)',
        })
      ),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange',
        }),
        animate(
          1000,
          style({
            borderRadius: '50px',
          })
        ),
        animate(500),
      ]),
    ]),

    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0,
            transform: 'translateX(100px)',
          })
        ),
      ]),
      // transition('* => void', [
      //   style({
      //     opacity: 0,
      //     transform: 'translateX(100px)',
      //   }),
      //   animate(300),
      // ]),
    ]),

    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
          color: 'red',
          transition: '0.5s',
        })
      ),
      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.4,
            }),
            style({
              transform: 'translateX(0)',
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('* => void', [
        group([
          animate(
            300,
            style({
              color: 'blue',
            })
          ),
          animate(
            800,
            style({
              opacity: 0,
              transform: 'translateX(100px)',
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class AnimationComponent {
  state = 'highlighted';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item: string) {
    this.list.push(item);
  }

  onDelete(item: string) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    // this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.state == 'normal'
      ? (this.state = 'highlighted')
      : (this.state = 'normal');

    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  animationStarted(event: AnimationEvent) {
    console.log('Start:', event);
  }

  animationEnded(event: AnimationEvent) {
    console.log('End:', event);
  }
}
