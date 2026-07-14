import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Technology {
  id: string;
  title: string;
  iconClass: string;
  svg: SafeHtml;
  features: { title: string; description: string }[];
}

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning.component.html',
  styleUrl: './learning.component.css'
})
export class LearningComponent implements OnInit, OnDestroy {
  technologies: Technology[] = [];
  activeIndex = 0;
  isPaused = false;
  private intervalId: any;
  private timeoutId: any;

  constructor(private sanitizer: DomSanitizer) {
    this.technologies = [
      {
        id: 'angular',
        title: 'Angular',
        iconClass: 'angular-icon',
        svg: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" width="30" height="30"><path fill="#DD0031" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z"/><path fill="#C3002F" d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z"/><path fill="#FFA3B1" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/><path fill="#F2F2F2" d="M125 52.1v67.8l-17 40.9h34l11.7 29.2H183L125 52.1z"/></svg>'),
        features: [
          { title: 'Component-Based Architecture', description: 'Angular encourages a modular approach where the UI is broken down into reusable, self-contained components, making large codebases scalable and easy to maintain.' },
          { title: 'Dependency Injection (DI)', description: 'A powerful built-in design pattern that manages how components get their dependencies (like data services), promoting flexibility and highly testable code.' },
          { title: 'Signals & Reactivity', description: 'Modern Angular leverages Signals for fine-grained reactivity, allowing the framework to efficiently update the DOM exactly where and when data changes.' }
        ]
      },
      {
        id: 'node',
        title: 'Node.js',
        iconClass: 'node-icon',
        svg: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 35.21" width="45" height="45"><path fill="#43853d" d="M34.8 17.58l-12.72-7.36v-7.33l12.72 7.36v7.33zM20.89 9.53l-12.71-7.36v-1.12l12.71 7.34v1.14zM8.18 10.23L20.9 17.58v7.34L8.18 17.57v-7.34zM22.09 17.58l12.71-7.35v-7.34L22.09 10.24v7.34zM22.09 18.27v7.35l12.71-7.36v-7.33l-12.71 7.34zM20.89 18.27L8.18 25.62v7.34L20.89 25.6v-7.33zM6.98 17.58L.62 13.91V6.57l6.36 3.67v7.34zM20.89 26.3v7.33l-6.36 3.67v-7.33l6.36-3.67zM36 17.58l6.36-3.67V6.57l-6.36 3.67v7.34z"/><path fill="#43853d" d="M22.09 26.3l6.36 3.67v7.33l-6.36-3.67V26.3zM13.35 15.63v4.61H12V9.38h1.84l4.24 6.78V9.38h1.34v10.86h-1.68l-4.39-4.61zM28.45 15.11c0 3.32-2.14 5.28-5.3 5.28-3.15 0-5.28-1.96-5.28-5.28s2.13-5.28 5.28-5.28c3.16 0 5.3 1.96 5.3 5.28zm-1.4 0c0-2.58-1.52-4-3.9-4-2.37 0-3.89 1.42-3.89 4s1.52 4 3.89 4c2.38 0 3.9-1.42 3.9-4zM36.19 19.33h-1.34V9.38h2.95c3.08 0 4.63 1.7 4.63 4.5 0 2.37-1.12 3.98-3.13 4.41l3.35 4.54H41.1l-3.08-4.22h-1.83v2.72zm0-3.79h1.56c2.25 0 3.3-1.04 3.3-3.21 0-2.19-1.05-3.22-3.3-3.22h-1.56v6.43zM50.41 15.65h-5v3.25h5.43v1.34h-6.77V9.38h6.63v1.33h-5.29v3.6h5v1.34z"/></svg>'),
        features: [
          { title: 'Asynchronous & Event-Driven', description: 'Node.js uses a non-blocking I/O model, meaning it can efficiently handle thousands of concurrent connections without waiting for operations like database queries to finish.' },
          { title: 'Single-Threaded Scalability', description: 'Despite running on a single thread, Node.js leverages the Event Loop and underlying worker pools to achieve massive scalability for data-intensive, real-time applications.' },
          { title: 'V8 JavaScript Engine', description: 'Built on Google Chrome\'s V8 engine, Node.js compiles JavaScript directly into native machine code, providing blazing fast execution speeds for backend operations.' }
        ]
      },
      {
        id: 'rest',
        title: 'REST APIs',
        iconClass: 'rest-icon',
        svg: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>'),
        features: [
          { title: 'Stateless Architecture', description: 'REST APIs are stateless, meaning each request from a client contains all the information the server needs to fulfill it, improving reliability and simplifying server design.' },
          { title: 'Standard HTTP Methods', description: 'Utilizes standard verbs (GET, POST, PUT, DELETE) to map directly to CRUD operations, creating a predictable and intuitive interface for clients to consume.' },
          { title: 'JSON Payloads', description: 'Data is transmitted primarily as JSON, making it lightweight, easily parseable by JavaScript clients, and language-agnostic across different platforms.' }
        ]
      },
      {
        id: 'mongo',
        title: 'MongoDB',
        iconClass: 'mongo-icon',
        svg: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="#47A248" d="M11.96 0C8.5 0 6.64 3.73 6.64 6.8c0 5.4 4.54 9.17 4.96 17.2h.7c.43-8 4.97-11.8 4.97-17.2C17.27 3.73 15.4 0 11.96 0zm-1.07 10.98a1.27 1.27 0 112.54 0 1.27 1.27 0 01-2.54 0z"/></svg>'),
        features: [
          { title: 'NoSQL Document Store', description: 'Stores data in flexible, JSON-like BSON documents. This structure pairs naturally with JavaScript applications, avoiding the need for complex object-relational mapping.' },
          { title: 'Flexible Schema', description: 'Documents in the same collection don\'t need to have the same set of fields, allowing for rapid iteration and highly adaptable data models.' },
          { title: 'High Scalability', description: 'Built with horizontal scaling in mind, MongoDB utilizes sharding and replica sets to handle immense loads and ensure high availability across distributed systems.' }
        ]
      },
      {
        id: 'postgres',
        title: 'PostgreSQL',
        iconClass: 'postgres-icon',
        svg: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="#336791" d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 2.25c5.38 0 9.75 4.37 9.75 9.75S17.38 21.75 12 21.75 2.25 17.38 2.25 12 6.62 2.25 12 2.25zm.5 2.1c-.8.15-1.55.5-2.2 1-.5.4-1 1-1.25 1.7-.1.3-.15.65-.15 1v6.5c0 1.45.9 2.7 2.25 3.1.25.1.55.15.85.15 1.5 0 2.85-.9 3.25-2.25.1-.3.15-.65.15-1v-4.5c0-.4-.3-.75-.75-.75h-1c-.4 0-.75.3-.75.75v4.5c0 .65-.55 1.2-1.2 1.2s-1.2-.55-1.2-1.2v-6.5c0-.4.3-.75.75-.75h2.5c.4 0 .75-.3.75-.75V7.1c0-.4-.3-.75-.75-.75h-2v-2z"/></svg>'),
        features: [
          { title: 'Relational Integrity', description: 'A highly advanced open-source relational database that ensures strict data integrity, full ACID compliance, and robust transaction management.' },
          { title: 'Complex Queries & Indexing', description: 'Supports advanced SQL querying, powerful joins, and various indexing techniques (like B-Tree, GiST, GIN) for highly optimized data retrieval.' },
          { title: 'Extensibility', description: 'Highly extensible architecture allows defining custom data types, operators, and robust extensions like PostGIS for geographical data.' }
        ]
      },
      {
        id: 'git',
        title: 'Git/GitHub',
        iconClass: 'git-icon',
        svg: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="30" height="30"><path fill="#F1502F" d="M123.6 59.8L68.2 4.4c-2.4-2.4-6.3-2.4-8.8 0L42.2 21.6 55.4 34.8c2.9-1 6.1-.2 8.3 2 2.7 2.7 3.2 6.7 1.6 9.8l13 13c3.1-1.6 7.1-1.1 9.8 1.6 3.4 3.4 3.4 9 0 12.4-3.4 3.4-9 3.4-12.4 0-2.7-2.7-3.2-6.7-1.6-9.8l-12.4-12.4v26.1c1.5 1 2.6 2.5 3 4.2 1 3.5-1 7.1-4.5 8.1-3.5 1-7.1-1-8.1-4.5-1-3.5 1-7.1 4.5-8.1.9-.3 1.9-.3 2.8-.1v-26.6c-1.6-1.1-2.7-2.8-3.1-4.8l-13.6-13.6-26.9 26.9c-2.4 2.4-2.4 6.3 0 8.8l55.4 55.4c2.4 2.4 6.3 2.4 8.8 0l46.2-46.2c2.4-2.4 2.4-6.4 0-8.8z"/></svg>'),
        features: [
          { title: 'git clone', description: 'Downloads an existing repository from GitHub to your local machine.' },
          { title: 'git add', description: 'Stages your modified files, preparing them for a commit.' },
          { title: 'git commit -m "msg"', description: 'Saves your staged changes to the local repository with a descriptive message.' },
          { title: 'git push', description: 'Uploads your local commits to the remote GitHub repository.' },
          { title: 'git pull', description: 'Fetches and merges any new changes from the remote repository to your local branch.' }
        ]
      }
    ];
  }

  ngOnInit() {
    this.startAutoRotate();
  }

  ngOnDestroy() {
    this.stopAutoRotate();
  }

  startAutoRotate() {
    this.isPaused = false;
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.technologies.length;
    }, 5000); // 5 seconds per tab
  }

  stopAutoRotate() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  selectTab(index: number) {
    this.activeIndex = index;
    this.stopAutoRotate();
    this.isPaused = true;
    
    // Pause for 30 seconds before resuming
    this.timeoutId = setTimeout(() => {
      this.startAutoRotate();
    }, 30000);
  }
}
