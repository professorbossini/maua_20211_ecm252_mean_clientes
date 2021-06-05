import { ClienteService } from './../cliente.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from '../cliente.model';
import { Subscription, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = []
  private clientesSubscription: Subscription;
  public estaCarregando: boolean = false;
  totalDeClientes: number = 10;
  totalDeClientesPorPagina: number = 2;
  opcoesTotalDeClientesPorPagina = [2, 5, 10];
  paginaAtual: number = 1;

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
    this.clientesSubscription = this.clienteService.getListaDeClientesAtualizadaObservable()
    .subscribe ((clientes: Cliente[]) => {
      this.estaCarregando = false;
      this.clientes = clientes;
    });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  onDelete (id: string): void{
    this.clienteService.removerCliente(id);
  }

  onPaginaAlterada (dadosPagina: PageEvent){
    console.log(dadosPagina);
    this.estaCarregando = true;
    this.paginaAtual = dadosPagina.pageIndex + 1;
    this.totalDeClientesPorPagina = dadosPagina.pageSize;
    this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
  }
}
