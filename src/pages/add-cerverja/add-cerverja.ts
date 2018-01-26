import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CervejaProvider, Cerveja } from '../../providers/cerveja/cerveja'


/**
 * Generated class for the AddCerverjaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-cerverja',
  templateUrl: 'add-cerverja.html',
})
export class AddCerverjaPage {
  model: Cerveja;

  constructor(    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private cervejaProvider: CervejaProvider) {
  this.model = new Cerveja();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCerverjaPage');
  }

  save() {
   this.saveCerveja()
     .then(() => {
       this.toast.create({ message: 'Cerveja salvo.', duration: 3000, position: 'botton' }).present();
       this.navCtrl.pop();
     })
     .catch(() => {
       this.toast.create({ message: 'Erro ao salvar a Cerveja.', duration: 3000, position: 'botton' }).present();
     });
 }

 private saveCerveja() {
     var preco = this.model.preco;
     var tam = this.model.tam;
     var precofinal = preco/tam;
     this.model.precoMl = precofinal.toFixed(3);
     return this.cervejaProvider.insert(this.model);
 }

}
