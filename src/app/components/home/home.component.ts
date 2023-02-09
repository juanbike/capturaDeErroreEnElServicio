import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Produtcs} from '../../models/produtcs'
// Darse de baja del observable

import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  //Instancia Subject para darnos de baja del observable
  destroy$: Subject<boolean> = new Subject<boolean>();

  
  products: Produtcs[] = []; 

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe(data => {
      
      console.log(data);
      this.products = data;
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
    console.log("Recursos liberados")
  }

} 

