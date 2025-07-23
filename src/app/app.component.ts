import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currecntComp: string = 'home';
  @ViewChildren('sectionRef') sections!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('projectContainer', { static: false })
  projectContainer!: ElementRef<HTMLDivElement>;
  // isDarkMode = false;
  // newTheme!: string;
  screenWidth: number = window.innerWidth;
  screenHeight: number = window.innerHeight;

  constructor(private router: Router) {}

  ngOnInit() {
    // const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    // this.isDarkMode = savedTheme === 'dark-mode';
    // document.body.classList.add(savedTheme);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegment = event.urlAfterRedirects.split('/').pop() || 'home';
        this.currecntComp = urlSegment;
      }
    });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            section.classList.remove('inactive');
          } else {
            section.classList.add('inactive');
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    this.sections.forEach((section) => observer.observe(section.nativeElement));
  }

  // Listener for screen resize
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  // private theme = new BehaviorSubject<string>(
  //   localStorage.getItem('theme') || 'dark-mode'
  // );
  // currentTheme = this.theme.asObservable();

  // setTheme(theme: string): void {
  //   const oldTheme = this.isDarkMode ? 'dark-mode' : 'light-mode';
  //   document.body.classList.remove(oldTheme);
  //   document.body.classList.add(theme);
  //   this.isDarkMode = theme === 'dark-mode';

  //   this.theme.next(theme);
  //   localStorage.setItem('theme', theme);
  // }

  // toggleTheme(): void {
  //   this.newTheme = this.isDarkMode ? 'light-mode' : 'dark-mode';
  //   this.setTheme(this.newTheme);
  // }

  scrollLeft() {
    this.projectContainer.nativeElement.scrollBy({
      left: -400, // You can adjust how much to scroll
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.projectContainer.nativeElement.scrollBy({
      left: 400, // Positive value to scroll right
      behavior: 'smooth',
    });
  }
}
