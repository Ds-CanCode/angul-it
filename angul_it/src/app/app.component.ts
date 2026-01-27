import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, MatDialogModule, HttpClientModule, CommonModule],
})
export class AppComponent {}