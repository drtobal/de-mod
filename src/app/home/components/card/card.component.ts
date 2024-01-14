import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { AnyObject, Card } from '../../types';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { TRANSITION_EXIT_PERMANENT } from '../../../app/constants';

/** only displays a card */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeOut', [
      transition(':leave', [style({ opacity: 1 }), animate(TRANSITION_EXIT_PERMANENT, style({ opacity: 0 }))]),
    ]),
  ],
})
export class CardComponent {
  /** card to display */
  @Input() card?: Card;

  /** check the side displayed */
  @Input() visible: boolean = false;

  /** display completed animation */
  @Input() completed: boolean = false;

  /** get css style to show the image of the card */
  getCardImage(card: Card): AnyObject {
    return { 'background-image': `url(${card.fields.image.url})` };
  }
}