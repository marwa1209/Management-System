import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  searchQuery: string = '';
  _Router: Router = inject(Router);
  _SearchService: SearchService = inject(SearchService);
  onSearch(): void {
    if (this.searchQuery) {
      this._Router.navigate(['/home']);
      this._SearchService.setSearchQuery(this.searchQuery);
    }
  }
onQueryChange(value: string): void {
  if (value === '') {
    this._SearchService.setSearchQuery(' ');
  }
}
}
