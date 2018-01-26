import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CervejaProvider, Cerveja } from '../../providers/cerveja/cerveja'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    cervejas: any[] = [];

    constructor(public navCtrl: NavController, private toast: ToastController, private cervejaProvider: CervejaProvider) { }
    ionViewDidEnter() {
      this.getAllCervejas();
    }

  getAllCervejas() {
    this.cervejaProvider.getAll()
      .then((result: any[]) => {
        this.cervejas = result;
      });
  }

  addCervejas() {
    this.navCtrl.push('AddCerverjaPage');
  }

  removeCerveja(cerveja: Cerveja) {
    this.cervejaProvider.remove(cerveja.id)
      .then(() => {
        var index = this.cervejas.indexOf(cerveja);
        this.cervejas.splice(index, 1);
        this.toast.create({ message: 'Cerveja removido com sucesso!', duration: 3000, position: 'botton' }).present();
      })
  }

}
