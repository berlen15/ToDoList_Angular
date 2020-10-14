import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { TaskServiceService } from './services/taskService/task-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[]=[];
  idNumber: number;
  newTask: Task = {id: -1, title: "", completed: false};


  constructor(private taskService: TaskServiceService) {
    this.getAllTask();
    this.idNumber = this.tasks.length * 100;
   }


  getAllTask(): void {
    this.taskService.getAllTasks()
      .then(response => {
        this.tasks=response;
      })
  }

  addTask(){
      console.log("Entrando a add");
      this.taskService.addTask(this.newTask)
        .then(task=>{
          this.tasks.push(task);
        });
  }

 editTask(task){
  const title = prompt('Nuevo nombre de la tarea: ');
  this.taskService.editTask(task, title)
  .then(data =>{
    task.title=title;
   })
 }

deleteTask(id: number){
  this.taskService.deleteTask(id)
    .then(unused=>{
      this.tasks=this.tasks.filter(task => task.id != id);
    })
 }

}
