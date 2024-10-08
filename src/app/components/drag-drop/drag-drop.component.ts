import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import Task from '../../models/task';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    FilterPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragDropComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  @Output() isSave = new EventEmitter<void>();

  tasks: Task[] = [];
  todo: Task[] = [];
  done: Task[] = [];
  findTask: string = '';
  pageSize: number = 10;

  dataSource1 = new MatTableDataSource<any>(this.todo);
  dataSource2 = new MatTableDataSource<any>(this.done);

  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData(this.pageSize);
  }

  async getTasks(pageSize: number) {
    let params = { pageSize };

    this.taskService.getTasks(params).subscribe((response: any) => {
      this.tasks = response?.data.map((el: Task) => {
        el.isComplete = el.isComplete;
        el.isActive = el.isActive;
        return el;
      });

      this.todo = this.tasks.filter((el: Task) => !el.isComplete);
      this.done = this.tasks.filter((el: Task) => el.isComplete);

      this.cdr.detectChanges();
    });
  }

  drop(event: CdkDragDrop<Task[]>, list: string): void {
    if (list === 'todo') {
      if (event.previousContainer === event.container) {
        moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
      } else {
        const movedItem = this.done[event.previousIndex];
        movedItem.isComplete = false; // Cambiar el valor de isComplete
        transferArrayItem(
          this.done,
          this.todo,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else if (list === 'done') {
      if (event.previousContainer === event.container) {
        moveItemInArray(this.done, event.previousIndex, event.currentIndex);
      } else {
        const movedItem = this.todo[event.previousIndex];
        movedItem.isComplete = true; // Cambiar el valor de isComplete
        transferArrayItem(
          this.todo,
          this.done,
          event.previousIndex,
          event.currentIndex
        );
        this.updateCompleteTask(movedItem);
      }
    }
  }

  openDialog(action: string, item: Task = new Task()) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action,
        item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getTasks(this.pageSize);
    });
  }

  loadData(pageSize: number) {
    this.getTasks(pageSize).then(() => (this.dataSource1.data = this.tasks));
  }

  onPageChange(event: PageEvent) {
    this.loadData(event.pageSize);
  }

  deleteTask(item: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(item.id).subscribe((resp) => {
          this.notificationService.showMessage(
            'Tarea eliminada Exitosamente!!'
          );
          this.getTasks(this.pageSize);
        });
      }
    });
  }

  updateCompleteTask(item: Task) {
    let { isComplete } = item;
    let body = {
      isComplete,
    };

    this.taskService
      .patchTask(body, item.id)
      .subscribe((resp) => console.log('resp', resp));
  }
}
