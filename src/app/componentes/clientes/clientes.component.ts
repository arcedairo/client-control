import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.model';
import { FormsModule, NgForm } from '@angular/forms';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{
  clientes: Cliente[]  | undefined;
  cliente: Cliente = {
    nombre: '',
    apellido:'',
    email: '',
    saldo: 0
  }

  @ViewChild('clienteForm') clienteForm!: NgForm;
  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(private clientesServicio: ClienteServicio, private toastr: ToastrService){}

  ngOnInit(){
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }

    )
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
        this.clientes.forEach(cliente => {
          if(cliente.saldo !== undefined && cliente.saldo !== null){
            saldoTotal += cliente.saldo;
          }        
        })
    }
    return saldoTotal;
  }

  agregar(form: NgForm){
    const {value, valid} = form;
    if(!valid){
        console.log('Invalid!')
        this.toastr.error('Por favor llena el formulario correctamente', 'Error');
    } else{
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
}
