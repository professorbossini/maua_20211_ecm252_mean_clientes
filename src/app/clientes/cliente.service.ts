import { Inject, Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({providedIn: 'root'})
export class ClienteService{
  private clientes: Cliente[] = [];

  constructor (private httpClient: HttpClient, private router: Router){

  }

  private listaClientesAtualizada = new Subject <{clientes: Cliente[], maxClientes: number}>();

  private baseURL: string = 'http://localhost:3000/api/clientes';

  getClientes (pageSize: number, page: number): void{
    this.httpClient.get<{mensagem: string, clientes: any, maxClientes: number}>(`${this.baseURL}?pageSize=${pageSize}&page=${page}`)
      .pipe(map((dados) => {
        return {
          clientes: dados.clientes.map(cliente => {
            return {
              id: cliente._id,
              nome: cliente.nome,
              fone: cliente.fone,
              email: cliente.email,
              imagemURL: cliente.imagemURL
            }
          }),
          maxClientes: dados.maxClientes
        }
      }))
    .subscribe ((dados) => {
      this.clientes = dados.clientes;
      this.listaClientesAtualizada.next({
        clientes: [...this.clientes],
        maxClientes: dados.maxClientes
      });
    })
  }

  getCliente (idCliente: string){
    //return {...this.clientes.find((cli) => cli.id === idCliente)}
    return this.httpClient.get<{_id: string, nome: string, fone: string, email: string, imagemURL: string}>(`http://localhost:3000/api/clientes/${idCliente}`);
  }

  atualizarCliente (id: string, nome: string, fone: string, email: string, imagem: File | string){
    //const cliente: Cliente = {id, nome, fone, email, imagemURL: null};
    let clienteData: Cliente | FormData;
    if (typeof(imagem) === 'object'){
      clienteData = new FormData();
      clienteData.append('nome', nome);
      clienteData.append('fone', fone);
      clienteData.append('email', email);
      clienteData.append('imagem', imagem, nome);

    }
    else{
      clienteData = {id: id, nome: nome, fone: fone, email: email, imagemURL: imagem};

    }
    this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, clienteData)
    .subscribe((res) => {
      this.router.navigate(['/']);
    })

  }

  adicionarCliente(nome: string, fone: string, email: string, imagem : File){
    //const cliente: Cliente = {nome, fone, email};
    const dadosCliente = new FormData();
    dadosCliente.append("nome", nome);
    dadosCliente.append("fone", fone);
    dadosCliente.append("email", email);
    dadosCliente.append("imagem", imagem);
    this.httpClient.post<{mensagem: string, cliente: Cliente}>('http://localhost:3000/api/clientes', dadosCliente)
    .subscribe((dados) => {
      this.router.navigate(['/']);
    })
  }

  removerCliente (id: string){
    return this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`);

  }

  getListaDeClientesAtualizadaObservable(){
    return this.listaClientesAtualizada.asObservable();
  }
}
