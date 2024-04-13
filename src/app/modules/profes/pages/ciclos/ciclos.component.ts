import { Component } from '@angular/core';
import { Ciclos, Result } from 'src/app/models/ciclos-model';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.css']
})
export class CiclosComponent {

  ciclos !: Result[];

  constructor( private ciclosService: CiclosService ) {
  }

  ngOnInit(): void {
    this.getCycles();
  }


  getCycles() {
    this.ciclosService.getAllCycles().subscribe( (ciclos: Ciclos) => {
      this.ciclos = ciclos.data.results;
    });
  }
  
}
