import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/project";
import { ProjectService } from "../../services/project.service";
import { Global } from "../../services/global";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

  public project: any;
  public url: string;
  public confirm: boolean;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.confirm = false;
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
       let id = params.id;

       this.getProject(id)
    })
  }

  getProject(id: any) {
    this._projectService.getProyect(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
        
      }
    )
  }

  setConfirm(confirm: boolean) {
    this.confirm = confirm;
  }

  deleteProject(id: any) {
    this._projectService.deleteProjects(id).subscribe(
      response => {
          if(response.project){
            this._router.navigate(['/proyectos']);
          }
      },
      error => {
        console.log(<any>error);
        
      }
    )
  }

}
