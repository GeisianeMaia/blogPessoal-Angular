import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/postagem';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  nome: string = localStorage.getItem('nome');
  
  key = 'data'
  reverse =true
   
  listaPostagens: Postagem[]

  postagem: Postagem = new Postagem

  alerta:boolean = false

  titulo:string

  constructor(private postagemService: PostagemService, 
    private router: Router,
    private route: ActivatedRoute,
    private locationPage: Location) { }

  ngOnInit() {
    let token = localStorage.getItem('token');

    if(token == null){
      alert('Faça o login antes de acessar a página feed');
      this.router.navigate(['/login']);
    }

    this.findallPostagens()

    let item:String = localStorage.getItem('delOk')
   
    if(item == "true"){
      this.alerta = true
      localStorage.clear();
      setTimeout(()=>{
        location.assign('/feed')
      }, 3000)
      
    }

    window.scroll(0, 0)
    // usado para fazer o botão feed ir para parte de cima da página feed
  }
  findallPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  publicar(){
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      location.assign('/feed')
    })
  }

  pesquisarPorTitulo(){
    this.postagemService.findByTitulo(this.titulo).subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }
}
