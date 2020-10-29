import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Photo } from 'src/app/_models/Photo.model';
import { AlertifyService } from 'src/app/_serwises/alertify/alertify.service';
import { AuthService } from 'src/app/_serwises/auth/auth.service';
import { UserService } from 'src/app/_serwises/user/user.service';
import { environment } from 'src/environments/environment';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getUserPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  response = '';


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/' + this.authService.dekoded.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, respons, status, headres) => {
      if (respons) {
        const res: Photo = JSON.parse(respons);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);

        // if (photo.isMain) {
        //   this.authService.changeUserPhoto(photo.url);
        //   this.authService.currentUser.photoUrl = photo.url;
        //   localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        // }
      }
    };
  }

  setMain(photo: Photo) {
    this.userService.setMainPhoto(this.authService.dekoded.nameid, photo.id)
      .subscribe(() => {
        console.log('success');
        this.currentMain = this.photos.filter(p => p.isMain === true)[0];
        this.currentMain.isMain = false;
        photo.isMain = true;
        this.getUserPhotoChange.emit(photo.url);
      }, error => {
        this.alertify.error(error);
      }
      );
  }



}
