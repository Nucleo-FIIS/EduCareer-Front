import { Component } from '@angular/core';

@Component({
  selector: 'app-especializaciones-general',
  templateUrl: './especializaciones-general.component.html',
  styleUrls: ['./especializaciones-general.component.css']
})
export class EspecializacionesGeneralComponent  {
  filtroBusqueda:string='';
  ordenSeleccionado: string = 'asc';
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
  especialidades=[...this.especialidadesAll];
  
  buscarEspecialidad() {
    this.especialidades=[...this.especialidadesAll];
    this.especialidades = this.especialidades.filter(curso => curso.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(this.filtroBusqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()));
  }
  

  filtroEspecialidad(){
    this.especialidades=[...this.especialidadesAll];
    if (this.ordenSeleccionado === 'asc') {
      this.especialidades = this.especialidades.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.ordenSeleccionado === 'desc') {
      this.especialidades = this.especialidades.sort((a, b) => b.title.localeCompare(a.title));
    }
  }
}
