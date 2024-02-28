import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-especializacion',
  templateUrl: './especializacion.component.html',
  styleUrls: ['./especializacion.component.css']
})
export class EspecializacionComponent {
  public hasLoaded: boolean = false;
  
  constructor(private activateRoute:ActivatedRoute){
    console.log(this.activateRoute.snapshot.params['id'])
    console.log(this.especialidad)
  }
  especialidadesAll = [
    {id:1,title:'Desarrollo Web',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:2,title:'Gestión de proyectos',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:3,title:'Seguridad informática',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:4,title:'Desarrollo de software',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:5,title:'Infraestructura de TI',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:6,title:'Visualización de datos e información',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:7,title:'Análisis de datos y negocios',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:8,title:'Análisis y Diseño de Sistemas',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:9,title:'Tecnologías emergentes',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:10,title:'Visualización de datos e información',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
    {id:10,title:'Visualización de datos e información',description:'El desarrollo web es el proceso de creación y mantenimiento de sitios web. Puede implicar una amplia gama de acciones, desde la codificación y el diseño hasta la gestión de contenidos y la administración del servidor web.',img:'https://tekla.io/wp-content/uploads/2022/03/Recurso1.png'},
  ];
  especialidad=this.especialidadesAll.find(c=>c.id==this.activateRoute.snapshot.params['id']);

  onLoad() {
    this.hasLoaded = true;
  }
  
}
