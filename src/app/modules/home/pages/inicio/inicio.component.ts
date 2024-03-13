import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  infoDesarrolloDeSoftware: string = 'Los desarrolladores de software se centran en crear aplicaciones y programas eficientes, seguros y funcionales para satisfacer las necesidades de los usuarios y las empresas. Pueden especializarse en diferentes lenguajes de programación y tecnologías.';

  infoGestionDeProyectos: string = 'Los profesionales en gestión de proyectos de tecnología de la información (TI) se centran en planificar, ejecutar y controlar proyectos relacionados con sistemas de información. Gestionan recursos, plazos y presupuestos para lograr los objetivos del proyecto.';

  infoCibersegiuridad: string = 'Los expertos en ciberseguridad se centran en proteger los sistemas de información y redes contra amenazas y ataques cibernéticos. Desarrollan estrategias de seguridad, implementan medidas de prevención y responden a incidentes de seguridad.';

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }


}
