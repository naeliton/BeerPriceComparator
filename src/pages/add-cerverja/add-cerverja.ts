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
declare var lng;
declare let lat;
@IonicPage()
@Component({
  selector: 'page-add-cerverja',
  templateUrl: 'add-cerverja.html',
})

export class AddCerverjaPage {
  @ViewChild('map') mapElement;
  model: Cerveja  = new Cerveja();

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

  private getLat(){
    return lat;
  }

 private saveCerveja() {
   console.log(this.getLat());
    return this.cervejaProvider.insert(this.model);
 }

 initMap(){
   let latLng = new google.maps.LatLng(-12.963833,-38.499116);
   var map =new google.maps.Map(document.getElementById('map'),{
     center:{
       lat: -12.963833,
       lng: -38.499116
     },zoom:15
   });
   let mapOptions = {
     center: latLng,
     zoom: 12,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   };

  let marker = new google.maps.Marker({
      position:{
        lat: -12.963833,
        lng: -38.499116
      },
      map: map,
      draggable: true
   });
  //var map =new google.maps.Map(this.mapElement.nativeElement,mapOptions,marker);
    google.maps.event.addListener(marker,'dragend',function(){
        this.lat = marker.getPosition().lat();
        this.lng = marker.getPosition().lng();
    });
 }
}
