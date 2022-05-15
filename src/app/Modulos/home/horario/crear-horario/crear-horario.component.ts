import { Component, OnInit } from '@angular/core';
import { InterfaceColumnasGrilla } from 'src/app/Shared/interfaces/shared.interfaces';
import { HorarioService } from '../service/horario.service';

@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.scss']
})
export class CrearHorarioComponent implements OnInit {

  dataHorarios:any 
  cols : InterfaceColumnasGrilla[]= [];
  Listahorarios :any;

  constructor(
    private apiService: HorarioService
  ) { }

  ngOnInit(): void {
  }

  onGuardar(){

  }




}
