import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FireStorageService {
  storageRef = firebase.app().storage().ref();

  constructor( private angularFirestore:AngularFirestore ) { }

  imagenes = [];

  async subirImgStorage(carpeta:string , nombre:string, imgBase64:any){
    try{
      let respuesta = await this.storageRef.child(carpeta +'/' + nombre).putString(imgBase64, 'data_url')
      return await respuesta.ref.getDownloadURL();
      
    }catch(err){
      return null;

    }

  }

}
