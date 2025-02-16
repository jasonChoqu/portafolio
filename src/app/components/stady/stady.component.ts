import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-stady',
  templateUrl: './stady.component.html',
  styleUrls: ['./stady.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class StadyComponent {
    @Input()  currentSection: string = 'hello';
    @ViewChild('certifications', { static: true }) aboutMe!: ElementRef;
    @ViewChild('achivements ', { static: true }) timeline!: ElementRef;


    ngAfterViewInit() { 
      gsap.fromTo(this.aboutMe.nativeElement, 
        { opacity: 0, x: -250, scale: 0.8 },  // Comienza desde la izquierda
        { 
          opacity: 1, 
          x: 0,   // Se mueve a su posición original
          scale: 1,
          duration: 1, 
          ease: "power3.out",  // Hace la animación más natural
          scrollTrigger: {
            trigger: this.aboutMe.nativeElement,
            start: 'top 80%',  // Aparece más abajo para mejor visibilidad
            end: 'top 40%',
            scrub: 1,  // Transición más suave
          }
        }
      );
  
  
      gsap.fromTo(this.timeline.nativeElement, 
        { opacity: 0, x: 80, scale: 0.8 },  // Ajusta los valores iniciales
        { 
          opacity: 1, 
          x: 0,   // Se mueve a su posición original
          scale: 1,
          duration: 1, 
          ease: "power3.out",  // Hace la animación más natural
          scrollTrigger: {
            trigger: this.timeline.nativeElement,
            start: 'top 80%',  // Aparece más abajo para mejor visibilidad
            end: 'top 40%',
            scrub: 1,  // Transición más suave
          }
        }
      );

    }
}
