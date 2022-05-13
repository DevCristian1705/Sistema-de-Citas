import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-dias-atencion',
  templateUrl: './crear-dias-atencion.component.html',
  styleUrls: ['./crear-dias-atencion.component.scss']
})
export class CrearDiasAtencionComponent implements OnInit {

  Form: FormGroup;
  dataHorarios: any;

  constructor() { }

  ngOnInit(): void {
  }

  onGuardar(){}
  

}
