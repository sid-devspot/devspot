import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  screenWidth: number = window.innerWidth;
  screenHeight: number = window.innerHeight;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    const sections = gsap.utils.toArray<HTMLElement>(
      '.app-home, .app-about, .app-project, .app-contact'
    );

    sections.forEach((section) => {
      // 🔹 MAIN REVEAL
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 120,
          scale: 0.96,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
          });
        },
        onLeave: () => {
          gsap.to(section, {
            opacity: 0.6,
            scale: 0.98,
            duration: 0.4,
          });
        },
        onEnterBack: () => {
          gsap.to(section, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            opacity: 0.6,
            scale: 0.98,
            duration: 0.4,
          });
        },
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}