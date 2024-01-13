import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { AnyObject, Card } from '../../types';
import { CommonModule } from '@angular/common';

/** only displays a card */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  /** card to display */
  @Input() card?: Card;

  /** check the side displayed */
  @Input() visible: boolean = false;

  /** get css style to show the image of the card */
  getCardImage(card: Card): AnyObject {
    return { 'background-image': `url(${card.fields.image.url})` };
  }
}
