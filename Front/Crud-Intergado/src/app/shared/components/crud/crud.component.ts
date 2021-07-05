import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-crud",
  templateUrl: "./crud.component.html",
  styleUrls: ["./crud.component.css"]
})
export class CrudComponent implements OnInit {
  animalList;

  emptyTable = false;

  constructor(private http: HttpClient, public dialogRef: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadAnimalList();
  }

  loadAnimalList() {
    this.http.get('http://localhost:5050/api/animal/').pipe(take(1)).subscribe(data => {
      this.animalList = data;
      if (this.animalList.length === 0) {
        this.emptyTable = true;
      } else {
        this.emptyTable = false;
      }
    }, error => {
      this.snackBar.open('Erro ao carregar a tabela, tente novamente mais tarde!', '', { panelClass: 'error', horizontalPosition: 'right', verticalPosition: 'top', duration: 2500 });
    });
  }

  deleteAnimal(id) {
    this.http.delete(`http://localhost:5050/api/animal/${id}`).pipe(take(1)).subscribe(data => {
      this.loadAnimalList();
      this.snackBar.open('Registro excluído com sucesso!', '', { panelClass: 'success', horizontalPosition: 'right', verticalPosition: 'top', duration: 2500 });
    }, error => {
      this.snackBar.open('Erro ao excluir, tente novamente mais tarde!', '', { panelClass: 'error', horizontalPosition: 'right', verticalPosition: 'top', duration: 2500 });
    });
  }

  openInfoDialog() {
    this.dialogRef.open(InfoDialogComponent);
  }

  openAddDialog() {
    const openDialog = this.dialogRef.open(AddDialogComponent, {width: '600px', disableClose: true});
    openDialog.afterClosed().subscribe(data => {
      if (data === undefined) {
        this.loadAnimalList();
      }
    });
  }
}
