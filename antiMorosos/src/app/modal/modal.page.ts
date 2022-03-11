import { Component, Input, OnInit } from '@angular/core';
import {  DataService, Moroso } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';
 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  moroso: Moroso = null;
 
  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }
 
  ngOnInit() {
    this.dataService.getMorosoById(this.id).subscribe(res => {
      this.moroso = res;
    });
  }
 
  async deleteMoroso() {
    await this.dataService.deleteMoroso(this.moroso)
    this.modalCtrl.dismiss();
  }
 
  async updateMoroso() {
    await this.dataService.updateMoroso(this.moroso);
    const toast = await this.toastCtrl.create({
      message: 'Moroso actualizado.',
      duration: 2000
    });
    toast.present();
 
  }
}
