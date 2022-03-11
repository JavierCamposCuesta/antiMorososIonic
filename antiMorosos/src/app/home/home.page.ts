import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService, Message, Moroso } from '../services/data.service';
// import { ViewMessagePage } from '../view-message/view-message.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  morosos: Moroso[] = [];
  constructor(private dataService: DataService,
    private cd: ChangeDetectorRef,
     private alertCtrl: AlertController,
     private modalCtrl: ModalController) {
       this.getMorosos();
     }

     async addMoroso() {
      const alert = await this.alertCtrl.create({
        header: 'Añadir Moroso',
        inputs: [
          {
            name: 'nombre',
            placeholder: 'Nombre del moroso',
            type: 'text'
          },
          {
            name: 'cantidad',
            placeholder: 'Total a deber',
            type: 'number'
          },
          {
            name: 'telefono',
            placeholder: 'Teléfono del moroso',
            type: 'text'
          },
          {
            name: 'fechaPrestamo',
            placeholder: 'Fecha del préstamo',
            type: 'text'
          },
          {
            name: 'fechaCobro',
            placeholder: 'Fecha del cobro',
            type: 'text'
          },
          {
            name: 'descripcion',
            placeholder: 'Descripción del préstamo',
            type: 'textarea'
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Añadir',
            handler: res => {
              this.dataService.addMoroso({ nombre: res.nombre,
                cantidad: res.cantidad,
                telefono: res.telefono,
                fechaPrestamo: res.fechaPrestamo,
                fechaCobro: res.fechaCobro,
                descripcion: res.descripcion
           });
            }
          }
        ]
      });
   
      await alert.present();
    }

    async mostrarMoroso(moroso: Moroso) {
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: { id: moroso.id },
        breakpoints: [0, 1, 5],
        initialBreakpoint: 0.7,
        
      });
   
      await modal.present();
    }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMorosos() {
    this.dataService.getMorosos().subscribe(res => {
      this.morosos = res;
      this.cd.detectChanges();
    });
  }

}
