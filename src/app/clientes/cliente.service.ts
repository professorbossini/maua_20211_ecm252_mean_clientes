import { Inject, Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ClienteService{
  private clientes: Cliente[] = [];

  constructor (private httpClient: HttpClient){

  }

  private listaClientesAtualizada = new Subject <Cliente[]>();

  getClientes (): void{
    this.httpClient.get<{mensagem: string, clientes: any}>('http://localhost:3000/api/clientes')
      .pipe(map((dados) => {
        return dados.clientes.map(cliente => {
          return {
            id: cliente._id,
            nome: cliente.nome,
            fone: cliente.fone,
            email: cliente.email
          }
        })
      }))
    .subscribe ((clientes) => {
      this.clientes = clientes;
      this.listaClientesAtualizada.next([...this.clientes]);
    })
  }

  adicionarCliente(nome: string, fone: string, email: string){
    const cliente: Cliente = {nome, fone, email};
    this.httpClient.post<{mensagem: string, id: string}>('http://localhost:3000/api/clientes', cliente)
    .subscribe((dados) => {
      cliente.id = dados.id;
      this.clientes.push(cliente);
      this.listaClientesAtualizada.next([...this.clientes]);
    })
  }

  removerCliente (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`)
    .subscribe(() => {
      console.log(`Cliente de id ${id} removido`);
      this.clientes = this.clientes.filter(cliente => cliente.id !== id);
      this.listaClientesAtualizada.next([...this.clientes]);
    });
  }

  getListaDeClientesAtualizadaObservable(){
    return this.listaClientesAtualizada.asObservable();
  }
}
