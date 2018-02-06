import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the CervejaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CervejaProvider {

  private API_URL = 'http://agora-server.herokuapp.com/';
  constructor(private dbProvider: DatabaseProvider,public http: Http) { }

  public insert(cerveja: Cerveja) {
    return new Promise((resolve, reject) => {
      var data = {
        beer_name: cerveja.beer_name,
        volume: cerveja.volume,
        price_per_ml: cerveja.price_per_ml,
        seller_latitude: cerveja.seller_latitude,
        seller_longitude: cerveja.seller_longitude,
      };
      this.http.post(this.API_URL + '/beersale', data,{})
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
 }

 public remove(id: number) {
   return new Promise((resolve, reject) => {
     let url = this.API_URL + 'beersale/' + id;
     this.http.delete(url)
       .subscribe((result: any) => {
         resolve(result.json());
       },
       (error) => {
         reject(error.json());
       });
   });

   }

   public get(id: number) {
     return new Promise((resolve, reject) => {
     let url = this.API_URL + '/beersale/' + id;

     this.http.get(url)
       .subscribe((result: any) => {
         resolve(result.json());
       },
       (error) => {
         reject(error.json());
       });
   });
  }

 public getAll() {
   return new Promise((resolve, reject) => {
         let url = this.API_URL + 'beersales';

         this.http.get(url)
           .subscribe((result: any) => {
             resolve(result.json());
           },
           (error) => {
             reject(error.json());
           });
       });
}
}

export class Cerveja {
  id: number;
  beer_name: string;
  price_per_ml: number;
  volume: number;
  seller_latitude: number;
  seller_longitude: number;
}
