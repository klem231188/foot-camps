import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Injectable} from '@angular/core';

@Injectable()
export class UploadService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(filepath: string, file: any): AngularFireUploadTask {
    return this.storage.upload(filepath, file);
  }
}
