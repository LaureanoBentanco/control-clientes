import { Cliente } from './../../modelo/cliente.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientesServicio } from 'src/app/servicios/cliente.services';


@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  clientes: Cliente [];

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0

  }
    id: string;
  constructor(private clienteservicio: ClientesServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  //codigo del Curso
 /* ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.clienteservicio.get_Cliente(this.id).subscribe( (cliente: Cliente) => {
        this.cliente = cliente;
      });
}*/

//codigo de prueba


ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.clienteservicio.get_Cliente(this.id).subscribe( (cliente: Cliente) => {
  this.cliente = cliente;
  })
}
guardar({value, valid}: {value: Cliente, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Complete el Formulario Correctamente',
                        {cssClass:'alert-danger',
                        timeout: 4000});
    }
    else{
      value.id = this.id;
      //Modificar Cliente
      this.clienteservicio.modificarCliente(value);
      this.router.navigate(['']);

    }
}

eliminar(){
  if(confirm('Seguro que desea eliminar el cliente?')){
    this.clienteservicio.eliminarCliente(this.cliente);
    this.router.navigate(['/']);
  }
}

  }



