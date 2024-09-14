import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../models/task';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, TaskFormComponent, MatCardModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.sass',
})
export class DialogComponent {
  title: string = 'Detalles';
  action: number = 0;
  actions: string[] = ['detalles', 'crear', 'editar', 'eliminar'];
  task: Task = {
    id: 0,
    title: '',
    description: '',
    expirationDate: '',
    isActive: false,
    isComplete: false,
    userCreateId: 0,
    userAssignId: 0,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.showScreen();
  }

  showScreen() {
    let { action, item } = this.data;

    switch (action) {
      case 'view':
        this.action = 0;
        this.title = 'Detalles';
        this.task = item;
        break;
      case 'add':
        this.action = 1;
        this.title = 'Crear';
        break;
      case 'edit':
        this.action = 2;
        this.title = 'Editar';
        this.task = item;
        break;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
