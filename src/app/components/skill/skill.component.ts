import { Component, QueryList, ViewChildren ,ElementRef, Input, ViewChild, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {
  @Input()  currentSection: string = 'hello';
  @ViewChild('figures', { static: true }) figures!: ElementRef;
  @ViewChildren('efectElement') efectElements!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.efectElements.forEach((el) => {
      this.renderer.listen(el.nativeElement, 'mouseenter', () => {
        this.renderer.setStyle(el.nativeElement, 'transform', 'rotateY(180deg)');
      });

      this.renderer.listen(el.nativeElement, 'mouseleave', () => {
        this.renderer.setStyle(el.nativeElement, 'transform', 'rotateY(0deg)');
      });
    });

    gsap.fromTo(this.figures.nativeElement, 
      { opacity: 0, y: 50, scale: 0.8 }, 
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1, 
        scrollTrigger: {
          trigger: this.figures.nativeElement,
          start: 'top 95%',
          end: 'top 50%',
          scrub: true
        }
      }
    );
  }


}
