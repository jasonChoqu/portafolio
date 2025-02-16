import { Component, AfterViewInit,ElementRef, Input, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-others-skils',
  templateUrl: './others-skils.component.html',
  styleUrls: ['./others-skils.component.css']
})
export class OthersSkilsComponent implements AfterViewInit {
 
  @Input()  currentSection: string = 'otherskill';
  @ViewChild('carusel', { static: true }) carusel!: ElementRef;
  
  images: string[] = [
    '/assets/labgroLogin.GIF',
    '/assets/prosic.GIF',
    '/assets/vinesense.GIF',
    '/assets/mariolin.GIF',
    '/assets/logistica.GIF',
    '/assets/appgemglo.png',
    '/assets/socerclub.png',
    '/assets/driver.GIF'
  ];

  titles: string[] = [
    'Labgro',
    'Prosic',
    'Vinesense',
    'Mariolin',
    'PuntoVenta',
    'Appgemglo',
    'SoccerClub',
    'Correspondencia'
  ]

  imageTitles: string[] = [
    'This project was developed for the UMSS university, with tecnologies like Angular, Laravel and JWT for the authentication. The project is a platform for the management of the Wherehouse and Produccion.',
    'This project was developed for the company OA FOODS, using technologies like Business Central integration, OneDrive integration, and other tools. The project is a discount system designed to streamline and automate discount management within the company. The backend was developed using Laravel, while the frontend was built with Angular.',
    'Vinesense is a platform developed with Laravel and JavaScript, designed to analyze and optimize the distribution of vineyard-produced wines. The system helps track wine production, distribution, and consumption, providing insights to improve logistics and market strategies.',
    'Marionil is an e-commerce platform built with Laravel and JavaScript, designed to facilitate online sales and manage stock efficiently. It includes features for inventory control, order processing, and customer management, providing a seamless shopping experience.',
     'This project was developed for several companies, with tecnologies like  Php, Javascript. The project is a platform for the management of the Orders Sales, Wherehouse and sales.',
    'An ERP application developed using Flutter for the frontend and Laravel for the backend. The system manages payments, cash flow, sales, and electronic invoicing, providing a comprehensive solution for business administration.',
    'An application developed in Flutter to manage a soccer school, allowing the administration of student registrations and payment control',
    'A web platform for document and procedure management, developed using Java Spring Boot and Angular.',
  ];

  imageDates: string[] = [
    '2021',
    '2024',
    '2022',
    '2023',
    '2023',
    '2022',
    '2023',
    '2024',
  ];




  imageLinks: string[] = [
    'https://labgro-umss.netlify.app/#/',
    'https://prosic1.buygreenfit.com/#/',
    'https://vinesence.com/',
    'https://mariolin.net/',
    'https://inventario.coderblend.com/',
    'https://drive.google.com/file/d/13EX3DKy4kegx3QO_2HBTFUokHNvardGz/view',
    'https://drive.google.com/file/d/13EX3DKy4kegx3QO_2HBTFUokHNvardGz/view',
    'http://correspondencia.gobernaciondecochabamba.bo'
  ];

  currentIndex: number = 0;
  loading: boolean = true;


  ngOnInit() {
    this.preloadImages();
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  ngAfterViewInit() {
    // Lógica adicional si es necesario
    gsap.fromTo(this.carusel.nativeElement, 
      { opacity: 0, y: -200, scale: 0.8 },  // Comienza desde arriba y más pequeño
      { 
        opacity: 1, 
        y: 0,   // Se mueve a su posición original
        scale: 1,
        duration: 1.7, 
        ease: "power3.out",  // Hace la animación más natural
        scrollTrigger: {
          trigger: this.carusel.nativeElement,
          start: 'top 40%',  // Aparece más abajo para mejor visibilidad
          end: 'top 20%',
          scrub: true  // Transición más suave
        }
      }
    );
  }

  preloadImages() {
    this.images.forEach((image, index) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        if (index === this.currentIndex) {
          this.loading = false;
        }
      };
    });
  }
}