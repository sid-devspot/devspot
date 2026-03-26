import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currecntComp: string = 'home';
  @ViewChildren('sectionRef') sections!: QueryList<ElementRef<HTMLElement>>;
  screenWidth: number = window.innerWidth;
  screenHeight: number = window.innerHeight;

  projects: any = {
    walrec: [
      {
        img: './assets/Walrec/screenshot-01.png',
        alt: 'Screenshot 01',
        title: 'Login & Signup',
        content: 'Basic username/password auth & Email',
      },
      {
        img: './assets/Walrec/screenshot-02.png',
        alt: 'Screenshot 02',
        title: 'Dashboard',
        content: 'Income & expenses in chart/calendar view',
      },
      {
        img: './assets/Walrec/screenshot-03.png',
        alt: 'Screenshot 03',
        title: 'Expense & Income',
        content: 'Add expenses with custom',
      },
      {
        img: './assets/Walrec/screenshot-04.png',
        alt: 'Screenshot 04',
        title: 'Budget',
        content: 'Track EMIs, subscriptions, etc.',
      },
      {
        img: './assets/Walrec/screenshot-05.png',
        alt: 'Screenshot 05',
        title: 'Record',
        content: 'Deatiled Record about Income and Expense',
      },
      {
        img: './assets/Walrec/screenshot-06.png',
        alt: 'Screenshot 06',
        title: 'Profile',
        content: 'Emoji-based avatar and user info',
      },
    ],
    tarvellerSpond: [
      {
        img: './assets/Travellerspond/screenshot-01.png',
        alt: 'Screenshot 01',
        title: 'Home',
        content: 'Highlights travel categories with eye-catching visuals',
      },
      {
        img: './assets/Travellerspond/screenshot-02.png',
        alt: 'Screenshot 02',
        title: 'Tour Listings',
        content: 'Detailed international & domestic packages',
      },
      {
        img: './assets/Travellerspond/screenshot-03.png',
        alt: 'Screenshot 03',
        title: 'Tour Listings',
        content: 'Detailed international & domestic packages',
      },
      {
        img: './assets/Travellerspond/screenshot-04.png',
        alt: 'Screenshot 04',
        title: 'Contact',
        content: 'Users can submit queries for quick follow-up',
      },
      {
        img: './assets/Travellerspond/screenshot-05.png',
        alt: 'Screenshot 05',
        title: 'Admin Login',
        content: 'Authenticated access for travel agency staff',
      },
      {
        img: './assets/Travellerspond/screenshot-06.png',
        alt: 'Screenshot 06',
        title: 'Responsive Design',
        content: 'Mobile-optimized and touch-friendly UI',
      },
    ],
  };

  walrecCount = 0;
  walrectCurrentProject: any = this.projects.walrec[this.walrecCount];
  travellerCount = 0;
  travellerCurrentProject: any = this.projects.tarvellerSpond[this.travellerCount];

  constructor() {}

  ngOnInit() {}

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

  nextProject(param: string) {
    if (param === 'walrec') {
      if (this.walrecCount < this.projects.walrec.length - 1) {
        this.walrecCount++;
        this.walrectCurrentProject =
          this.projects.walrec[this.walrecCount];
      }
    }

    if (param === 'travellerspond') {
      if (this.travellerCount < this.projects.tarvellerSpond.length - 1) {
        this.travellerCount++;
        this.travellerCurrentProject =
          this.projects.tarvellerSpond[this.travellerCount];
      }
    }
  }

  previousProject(param: string) {
    if (param === 'walrec') {
      if (this.walrecCount > 0) {
        this.walrecCount--;
        this.walrectCurrentProject =
          this.projects.walrec[this.walrecCount];
      }
    }

    if (param === 'travellerspond') {
      if (this.travellerCount > 0) {
        this.travellerCount--;
        this.travellerCurrentProject =
          this.projects.tarvellerSpond[this.travellerCount];
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}
