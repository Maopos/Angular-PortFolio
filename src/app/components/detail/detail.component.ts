import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/project";
import { ProjectService } from "../../services/project.service";
import { Global } from "../../services/global";
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

  public project: any;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    
    this.url = Global.url;
  }

  ngOnInit(): void {
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

}
