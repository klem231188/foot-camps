import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage) {
  }

  uploadFile(filepath: string, file: any): AngularFireUploadTask {
    return this.storage.upload(filepath, file);
  }
}
