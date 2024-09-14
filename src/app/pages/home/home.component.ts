import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DragDropComponent } from '../../components/drag-drop/drag-drop.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { HeaderMenuComponent } from '../../components/header-menu/header-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DragDropComponent,
    TaskFormComponent,
    HeaderMenuComponent,
  ],
})
export class HomeComponent {
  constructor() {}
}
