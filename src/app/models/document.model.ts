import {DocumentType} from './document-type.enum';

export interface Document {
  type: DocumentType;
  url: string;
}
