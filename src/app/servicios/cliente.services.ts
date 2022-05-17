import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable, Subscribable } from "rxjs";
import {map} from 'rxjs/operators';
import { Cliente } from 'src/app/modelo/cliente.model';




@Injectable()
export class ClientesServicio {

  clientesColleccion: AngularFirestoreCollection <Cliente>;
  clienteDoc!: AngularFirestoreDocument<Cliente>;
  clientes!: Observable<Cliente[]>;
  cliente: Observable <Cliente> | any ;



  constructor (private db: AngularFirestore ){
    this.clientesColleccion = db.collection ('clientes', ref => ref.orderBy('nombre', 'asc'));
  }

  getCliente(): Observable<Cliente[]>{
    this.clientes = this.clientesColleccion.snapshotChanges().pipe(
      map ( cambios => {
       return cambios.map( accion =>{
         const datos = accion.payload.doc.data() as Cliente;
         datos.id = accion.payload.doc.id;
         return datos;
       })
     })
    );
    return this.clientes;
  }
    agregarcliente(cliente: Cliente){
      this.clientesColleccion.add(cliente);
    }


    //codigo medificado del curso
   /* get_Cliente(id: string): void{
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
        this.cliente = this.clienteDoc.snapshotChanges().pipe(
          map( accion=>{
              if(accion.payload.exists === false){
                return null;
              }

              else{
                const datos = accion.payload.data() as Cliente;
                datos.id = accion.payload.id;
                return datos;

              }
            })
          );
          return this.cliente;
    }*/


    get_Cliente(id: string){
      this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
      this.cliente = this.clienteDoc.snapshotChanges().pipe(
          map( accion => {
              if(accion.payload.exists === false){
                  return null;
              }
              else{
                  const datos = accion.payload.data() as Cliente;
                  datos.id = accion.payload.id;
                  return datos;
              }
          })
      );
      return this.cliente;
  }
    modificarCliente(cliente:Cliente){
      this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
      this.clienteDoc.update(cliente);
    }

    eliminarCliente(cliente:Cliente){

    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.delete();
    }
}
