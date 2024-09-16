import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.sass',
})
export class TaskFormComponent implements OnChanges {
  @Input({ required: true }) action!: string;
  @Input({ required: false }) data!: Task;
  @Output() closeDialog = new EventEmitter<void>();

  form: FormGroup;
  usersOptions: User[] = [];
  idUserCreate: number = 0;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      expirationDate: ['', Validators.required],
      userAssign: ['', Validators.required],
    });

    this.getUsers();
    this.idUserCreate = this.authService.getIdUserLogged();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.action == 'editar') {
      let { title, description, expirationDate, userAssignId, ...rest } =
        this.data;

      this.getUserForId(userAssignId);
      let formatDate = this.getDate(expirationDate);
      this.form.controls['title'].setValue(title);
      this.form.controls['description'].setValue(description);
      this.form.controls['expirationDate'].setValue(formatDate);
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe((resp) => {
      this.usersOptions = resp;
    });
  }

  getUserForId(id: number) {
    this.userService
      .getUsersId(id)
      .subscribe((resp) =>
        this.form.controls['userAssign'].setValue(resp.users.id)
      );
  }

  onSubmit() {
    let { expirationDate, ...rest } = this.form.value;
    let formatDate = new Date(expirationDate);
    let expirate = `${formatDate.getFullYear()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getDate()}`;

    console.log('ex', expirationDate, expirate);

    let body = {
      expirationDate: expirate,
      ...rest,
      userCreate: this.idUserCreate,
    };

    if (this.action == 'crear') {
      this.taskService.postTask(body).subscribe((resp) => {
        if (resp.status === 201) {
          this.notificationService.showMessage('Tarea Creada Exitosamente!!');
          this.closeDialog.emit();
        }
      });
    } else {
      this.taskService.putTask(body, this.data.id).subscribe((resp) => {
        if (resp.status === 201) {
          this.notificationService.showMessage('Tarea editada Exitosamente!!');
          this.closeDialog.emit();
        }
      });
    }
  }

  getDate(date: string) {
    let [year, month, day] = [
      date.split('-')[0],
      date.split('-')[1],
      Number(date.split('-')[2]) + 1,
    ];
    return new Date(`${year}-${month}-${day}`);
  }
}
