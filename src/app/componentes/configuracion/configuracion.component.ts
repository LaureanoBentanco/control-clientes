import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  permitirRegistro = false;
  constructor(
    private router: Router,
    private cofiguracionServicio: ConfiguracionServicio

  ) { }

  ngOnInit(): void {
    this.cofiguracionServicio.getConfiguracion().subscribe(
      (configuracion: any) => {
        this.permitirRegistro = configuracion.premitirRegistro;
      }
    )
  }

  guardar(){
    let configuracion = {permitirRegistro: this.permitirRegistro}
    this.cofiguracionServicio.modificarConfiguaracion(configuracion);
    this.router.navigate(['/']);

  }

}
