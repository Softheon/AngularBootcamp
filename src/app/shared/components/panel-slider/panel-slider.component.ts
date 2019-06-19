import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type PaneType = 'overlay' | 'main';

/** The slide panel component */
@Component({
  selector: 'shared-panel-slider',
  styleUrls: ['./panel-slider.component.scss'],
  templateUrl: './panel-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('overlay', style({ transform: 'translateX(0)', zIndex: '2', overflow: 'scroll' })),
      state('main', style({ transform: 'translateX(100%)', zIndex: '0' })),
      transition('* => *', animate(450))
    ]),
    trigger('hide', [
      state('overlay', style({ display: 'none' })),
      state('main', style({ display: 'inherit' })),
      transition('* => *', animate(450))
    ])
  ]
})
export class PanelSliderComponent {

  /** the active pain */
  @Input() public activePane: PaneType = 'main';

  /** whether or not to disable the animation - used on page init  */
  @Input() public disableAnimation: boolean;
}
