import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { AnyObject, Card } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() card?: Card;

  @Input() visible: boolean = false;

  getCardImage(card: Card): AnyObject {
    return { 'background-image': `url(${card.fields.image.url})` };
  }
}
