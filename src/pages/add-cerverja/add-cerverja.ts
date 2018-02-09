import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CervejaProvider, Cerveja } from '../../providers/cerveja/cerveja';



/**
 * Generated class for the AddCerverjaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@IonicPage()
@Component({
  selector: 'page-add-cerverja',
  templateUrl: 'add-cerverja.html',
})

export class AddCerverjaPage {
  @ViewChild('map') mapElement;
  model: Cerveja  = new Cerveja();
  seller_latitude: number = 0;

  constructor(    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private cervejaProvider: CervejaProvider) {

  }

  ionViewDidLoad() {
    this.initMap();

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
     return this.cervejaProvider.insert(this.model);
 }

 initMap(){
   let latLng = new google.maps.LatLng(-12.963833,-38.499116);
   let mapOptions = {
     center: latLng,
     zoom: 12,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   };

  var map =new google.maps.Map(this.mapElement.nativeElement,mapOptions );
  map.addListener('dblclick', function(e) {
    var latLng = new google.maps.LatLng(map.getBounds().b.b, map.getBounds().f.b);
    console.log(map.getBounds().b.b);
    this.seller_latitude = 1;
    console.log(this.seller_latitude);
  });
 }

}
