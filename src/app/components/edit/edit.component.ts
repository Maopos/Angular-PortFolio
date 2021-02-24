import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/project";
import { ProjectService } from "../../services/project.service";
import { UploadService } from "../../services/upload.service";
import { Global } from "../../services/global";
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project
  public save_project: any; 
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;


        constructor(
          private _projectService: ProjectService,
          private _uploadService: UploadService,
          private _route: ActivatedRoute,
          private _router: Router          
          ) {
          this.title = 'Editar Proyecto';          
          this.status = '';
          this.filesToUpload = [];
          this.project = new Project('', '', '', '', '', 0, '');
          this.url = Global.url;
        }

        ngOnInit(){
          this._route.params.subscribe(params => {
             let id = params.id;
      
             this.getProject(id)
          });
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



        onSubmit(form: any) {
          console.log(this.project);
      
          //Guardar datos en mongo
          this._projectService.updateProject(this.project).subscribe(
            response => {
                if (response.project) {
                  
                  // Subir la imagen
                  if (this.filesToUpload) {
                    
                    this._uploadService.makeFileRequest(Global.url + 'uploadImage/' + response.project._id, [], this.filesToUpload, 'image')
                    .then((result:any) => {
                        
                        this.save_project = result.project;
        
                        this.status = 'success';
                          
                        
                          
                      });
                  }
                  else {
                    this.save_project = response.project;
        
                        this.status = 'success';
                  }

      
                }
                else {
                  this.status = 'failed';
                }
                
            },
            error => {
              console.log(<any>error);
              
            }
      
          )
        }
      
        fileChangeEvent(fileInput: any) {
            this.filesToUpload = <Array<File>>fileInput.target.files;
            
        }

}