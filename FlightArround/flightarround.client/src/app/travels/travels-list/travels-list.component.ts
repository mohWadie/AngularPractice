import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TravelsService } from '../travels.service';
import { Travel } from '../travel.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-travels-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './travels-list.component.html',
  styleUrl: './travels-list.component.css',
})
export class TravelsListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private travelsService = inject(TravelsService);

  travels = signal<Travel[] | null>(null);
  error = signal('');

  ngOnInit(): void {
    var sub = this.travelsService.GetTravels().subscribe({
      next: (t) => this.travels.set(t),
      error: (err) => console.log(err),
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
