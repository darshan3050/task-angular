import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title: string = "MultiPurpose Project"
  task: boolean = false;
  play: boolean = false;
  choice: boolean = true;

  todotask() {
    this.task = true
    this.choice = false
    this.title = "Task List"
  }
  game() {
    this.play = true
    this.choice = false
    this.title = "BlueBall"
  }

}
