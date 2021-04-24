import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[] = []

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
  }

}
