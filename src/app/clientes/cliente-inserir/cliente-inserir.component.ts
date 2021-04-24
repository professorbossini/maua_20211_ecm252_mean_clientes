import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css']
})
export class ClienteInserirComponent implements OnInit {

  nome: string;
  fone: string;
  email: string;

  @Output() clienteAdicionado = new EventEmitter<Cliente>();
  constructor() { }

  ngOnInit(): void {
  }

  onAdicionarCliente(){
    const cliente: Cliente = {
      nome: this.nome,
      fone: this.fone,
      email: this.email
    }
    this.clienteAdicionado.emit(cliente);
    //console.log("Adicionando cliente...");
  }

}
