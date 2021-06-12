import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  baseURL: string = "http://localhost:3000/api/usuarios";
  constructor(private httpClient: HttpClient) {

  }

  criarUsuario (email: string, password: string){
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.httpClient.post(`${this.baseURL}/signup`, authData)
    .subscribe(
      resposta => console.log(resposta)
    )
  }
}
