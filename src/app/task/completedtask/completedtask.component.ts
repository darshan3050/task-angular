import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms'

interface Entry {
  id: string;
  task: string;
  strikethrough: boolean;
  select: boolean;
}
@Component({
  selector: 'app-completedtask',
  templateUrl: './completedtask.component.html',
  styleUrls: ['./completedtask.component.css']
})
export class CompletedtaskComponent implements OnInit {
  addTaskForm: FormGroup;
  task: string = '';
  id: string = ""
  isUpdate: boolean = false
  btntogle: string = "Add Task"
  description: string = ""
  globalindex: number = -1
  showAdd: boolean = true
  showupdate: boolean = false
  existingEntries: Entry[] = [];
  allEntries: Entry[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.addTaskForm = formBuilder.group({
      taskinput: ['', Validators.required],
      taskdiscription: new FormControl(),
    })
  }
  ngOnInit(): void {

    this.getTask()
  }
  addTask() {

    console.log("Add task form value", this.addTaskForm)
    this.existingEntries = (JSON.parse(localStorage.getItem("allEntries") || '{}'));
    const entryId = this.existingEntries.length || 0
    let isupdate = false
    let toString = entryId.toString();
    let toConcat = toString + "";
    console.log("id", entryId)
    console.log("task:", this.task)

    if (this.task.length !== 0) {
      let entry: Entry = {
        id: toConcat,
        task: this.task,
        strikethrough: false,
        select: false
      }

      this.existingEntries?.push(entry);
      localStorage.setItem("allEntries", JSON.stringify(this.existingEntries));
      console.log(this.existingEntries);

      this.getTask()
      this.task = ""
    }
  }

  getTask() {
    this.allEntries = (JSON.parse(localStorage.getItem("allEntries") || '{}'));
  }

  removetask(id: string) {
    console.log("remove task id:", id)
    this.allEntries = (JSON.parse(localStorage.getItem("allEntries") || '{}'));
    const index = this.allEntries.findIndex(entry => entry.id === id);
    console.log("index :", index);
    this.allEntries.splice(index, 1);
    for (let index = 0; index < this.allEntries.length; index++) {
      const strindex = index + ""
      this.allEntries[index].id = strindex;
    }
    localStorage.setItem("allEntries", JSON.stringify(this.allEntries));
  }

  updatetask(id: string) {
    this.allEntries = (JSON.parse(localStorage.getItem("allEntries") || '{}'));
    const index = this.allEntries.findIndex(entry => entry.id === id);
    console.log("index :", index);
    this.task = this.allEntries[index].task
    this.globalindex = index
    this.disablebuttons()
  }

  disablebuttons() {
    this.isUpdate = true
    this.btntogle = "Update"
    this.showAdd = false
    this.showupdate = true
  }

  update() {
    console.log("update g index:", this.globalindex)
    this.allEntries[this.globalindex].task = this.task
    localStorage.setItem("allEntries", JSON.stringify(this.allEntries));
    this.getTask()
    this.enablebuttons()
    this.task = ""
  }

  enablebuttons() {
    this.isUpdate = false
    this.showAdd = true
    this.showupdate = false
  }
  boxupdate(index: string) {
    console.log("event", index)
    var intindex = +index
    this.allEntries = (JSON.parse(localStorage.getItem("allEntries") || '{}'));
    this.allEntries[intindex].strikethrough = !this.allEntries[intindex].strikethrough
    localStorage.setItem("allEntries", JSON.stringify(this.allEntries));
    this.getTask()
  }
} 
