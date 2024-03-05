import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-profesor',
  templateUrl: './detalle-profesor.component.html',
  styleUrls: ['./detalle-profesor.component.css']
})
export class DetalleProfesorComponent {
  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    console.log({slug});
  }
}
