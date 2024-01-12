import { Component } from '@angular/core';
import { GameStorageService } from '../../services/game-storage/game-storage.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  providers: [GameStorageService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
