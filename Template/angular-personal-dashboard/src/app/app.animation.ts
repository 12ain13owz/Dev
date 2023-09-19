import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const routeFadeAnimation = trigger('routeFadeAnimation', [
  transition('* => *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0 })], {
      optional: true,
    }),

    group([
      query(
        ':leave',
        [
          animate(
            500,
            style({
              opacity: 0,
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            500,
            style({
              opacity: 1,
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

const routeSlideAnimation = trigger('routeSlideAnimation', [
  transition(':increment', [
    style({ position: 'relative', overflow: 'hidden' }),

    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [
          animate(
            '200ms ease-in',
            style({
              opacity: 0,
              transform: 'translateX(-80px)',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            opacity: 0,
            transform: 'translateX(80px)',
          }),
          animate(
            '200ms 100ms ease-out',
            style({
              opacity: 1,
              transform: 'translateX(0px)',
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  transition(':decrement', [
    style({ position: 'relative', overflow: 'hidden' }),

    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [
          animate(
            '200ms ease-in',
            style({
              opacity: 0,
              transform: 'translateX(80px)',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            opacity: 0,
            transform: 'translateX(-80px)',
          }),
          animate(
            '200ms 100ms ease-out',
            style({
              opacity: 1,
              transform: 'translateX(0px)',
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
export { routeFadeAnimation, routeSlideAnimation };
