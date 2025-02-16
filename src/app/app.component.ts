import { Component, HostListener,Input,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentSection = 'hello';
  isModalOpen = false; 
  isClosing = false; 


  @ViewChild('menu') menu!: ElementRef;

  // Cierra el modal si se hace clic fuera de él
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modal = document.querySelector('.modal-open'); // Selecciona el modal
    const button = document.querySelector('.menu-activador'); // Selecciona el botón de hamburguesa

    // Verifica si el clic fue fuera del modal y del botón
    if (this.isModalOpen && !modal?.contains(event.target as Node) && !button?.contains(event.target as Node)) {
      this.toggleModal();
    }
  }

  scrollToSection(section: string, event: Event) {
    document.querySelector('#' + section)?.scrollIntoView({ behavior: 'smooth' });
    const buttons = document.querySelectorAll('.nav-bullet');
    buttons.forEach(button => button.classList.remove('active'));

    const clickedButton = event.currentTarget as HTMLElement;
    clickedButton.classList.add('active');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const sections = ['hello', 'aboutme', 'skill', 'otherskill', 'stady', 'contact']; // Asegúrate de que estos IDs existan
    const scrollPosition = window.pageYOffset;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const element = document.querySelector('#' + section) as HTMLElement;
       if (element && scrollPosition >= element.offsetTop - element.clientHeight / 3) {
          this.currentSection = section;
          console.log(this.currentSection);
         break;
       }
    }
  }

  ngAfterViewInit() {
    // Inicializar el menú oculto
    gsap.set(this.menu.nativeElement, { x: '100%' });
  }

  toggleMenu() {
    const isMenuOpen = gsap.getProperty(this.menu.nativeElement, 'x') === '0%';
    gsap.to(this.menu.nativeElement, { x: isMenuOpen ? '100%' : '0%', duration: 0.5 });
  }

  toggleModal() {
    if (this.isModalOpen) {
      this.isClosing = true; // Activa la animación de cierre
      setTimeout(() => {
        this.isModalOpen = false; // Cierra el modal después de la animación
        this.isClosing = false; // Restablece el estado
      }, 300); // Duración de la animación (0.3s)
    } else {
      this.isModalOpen = true; // Abre el modal
    }
  }

}