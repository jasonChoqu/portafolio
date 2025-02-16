import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {
  @Input()  currentSection: string = 'hello';
  @ViewChild('foregroundImage', { static: true }) foregroundImage!: ElementRef;
  @ViewChild('backgroundImage', { static: true }) backgroundImage!: ElementRef;
  @ViewChild('aboutMe', { static: true }) aboutMe!: ElementRef;
  @ViewChild('timeline', { static: true }) timeline!: ElementRef;

  ngAfterViewInit() {
    gsap.fromTo(this.foregroundImage.nativeElement, 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 1, 
        scrollTrigger: {
          trigger: this.foregroundImage.nativeElement,
          start: 'top 95%',
          end: 'top 60%',
          scrub: true
        }
      }
    );

    gsap.fromTo(this.backgroundImage.nativeElement, 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 1, 
        scrollTrigger: {
          trigger: this.backgroundImage.nativeElement,
          start: 'top 50%',
          end: 'top 30%',
          scrub: true
        }
      }
    );
   
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
