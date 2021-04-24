import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  // clientes = [
  //   {
  //     nome: 'José',
  //     fone: '11223344',
  //     email: 'jose@email.com'
  //   },
  //   {
  //     nome: 'Maria',
  //     fone: '77889988',
  //     email: 'maria@email.com'
  //   }
  // ]
  @Input() clientes: Cliente[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
