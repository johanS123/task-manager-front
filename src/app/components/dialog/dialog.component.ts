import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import Task from '../../models/task';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import User from '../../models/user';

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
  user: User = new User();
  task: Task = new Task();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private userService: UserService
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
        this.getUserForId(this.task.userAssignId);
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
      case 'delete':
        this.action = 3;
        this.title = 'Eliminar';
        break;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getUserForId(id: number) {
    this.userService
      .getUsersId(id)
      .subscribe((resp) => (this.user = resp.users));
  }
}
