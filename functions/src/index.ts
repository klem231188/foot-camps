import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as ImportDataToFirestore from './import-data-to-firestore'

admin.initializeApp(functions.config().firebase)

export const importDataToFirestore = ImportDataToFirestore.listener
