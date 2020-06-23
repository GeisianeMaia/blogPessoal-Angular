import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Postagem } from '../model/postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
  };

  // CRUD - Create(post), Read(get), Update(put) e Delete(delete)
  getAllPostagens(){
    return this.http.get('http://31.220.57.14:8080/postagens');
  }

  postPostagem(postagem: Postagem){
    return this.http.post('http://31.220.57.14:8080/postagens', postagem, this.token)
  }

  putPostagem(postagem: Postagem){
    return this.http.put('http://31.220.57.14:8080/postagens', postagem, this.token)
  }

  getByIdPostagem(id:number){
    return this.http.get(`http://31.220.57.14:8080/postagens/${id}`, this.token)
  }

  deletePostagem(id:number){
    return this.http.delete(`http://31.220.57.14:8080/titulo/${id}`, this.token)
  }

  findByTitulo(titulo:string){
    return this.http.get(`http://31.220.57.14:8080/postagens/titulo/${titulo}`, this.token)
  }

}
