import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';
import { Configuracion } from '../modelo/configuracion.model';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

@Injectable()

export class  ConfiguracionServicio{
  configuracionDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<any>;
  id = "1";

  constructor(
    private db: AngularFirestore){}

    getConfiguracion(): Observable <Configuracion>{
      this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
      this.configuracion = this.configuracionDoc.valueChanges();
      return this.configuracion;
    }
    modificarConfiguaracion(configuracion: any){
      this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
      this.configuracionDoc.update(configuracion);

    }

  }
