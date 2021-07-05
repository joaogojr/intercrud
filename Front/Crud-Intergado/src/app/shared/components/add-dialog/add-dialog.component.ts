import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  addForm: FormGroup;

  onLoading = false;

  constructor(private http: HttpClient, public dialogRef: MatDialog, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { 
    this.addForm = this.formBuilder.group({
      handling: formBuilder.control('', [ Validators.required ]),
      tag: formBuilder.control('', [ Validators.required ])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.onLoading = true;
    this.http.post('http://localhost:5050/api/animal/', { manejo: this.addForm.value.handling, tag: this.addForm.value.tag }).pipe(take(1)).subscribe(() => {
      this.snackBar.open('Registro salvo com sucesso!', '', { panelClass: 'success', horizontalPosition: 'right', verticalPosition: 'top', duration: 2500 });
      this.onLoading = false;
      this.dialogRef.closeAll();
    }, error => {
      this.snackBar.open('Erro ao salvar, tente novamente mais tarde!', '', { panelClass: 'error', horizontalPosition: 'right', verticalPosition: 'top', duration: 2500 });
      this.onLoading = false;
    });
  }

  public control(name: string) {
    return this.addForm.get(name);
  }
}
