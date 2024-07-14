import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../modelo/cliente.model';
import { ClienteServicio } from '../../servicios/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit{
  cliente: Cliente = {
    nombre: '',
    apellido:'',
    email: '',
    saldo: 0
  }

  id!: string;

  constructor(private clientesServicio: ClienteServicio, private toastr: ToastrService, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe(cliente => {
      if (cliente) {
        this.cliente = cliente;
      } else {
        alert('Cliente no encontrado');
        this.router.navigate(['/']);
      }
    });
  }

  guardar({value, valid}: {value: Cliente, valid: boolean | null}){
    if(!valid){
      alert('Por favor llena el formulario correctamente');
    } else{
      value.id = this.id;
      this.clientesServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if(confirm('¿Seguro que desea eliminar este cliente?')){
        this.clientesServicio.eliminarCliente(this.cliente);
        this.router.navigate(['/']);
    }
  }
}
