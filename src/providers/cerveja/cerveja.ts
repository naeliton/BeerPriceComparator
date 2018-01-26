import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
/*
  Generated class for the CervejaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CervejaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(cerveja: Cerveja) {
   return this.dbProvider.getDB()
     .then((db: SQLiteObject) => {
       let sql = 'insert into cerveja (descricao, local, preco, tam,precoMl) values (?, ?, ?, ?,?)';
       let data = [cerveja.descricao, cerveja.local, cerveja.preco, cerveja.tam,cerveja.precoMl];
       console.log(data);
       return db.executeSql(sql, data)
         .catch((e) => console.error(e));
     })
     .catch((e) => console.error(e));
 }

 public remove(id: number) {
     return this.dbProvider.getDB()
       .then((db: SQLiteObject) => {
         let sql = 'delete from cerveja where id = ?';
         let data = [id];
           console.log(sql + data);
         return db.executeSql(sql, data)
           .catch((e) => console.error(e));
       })
       .catch((e) => console.error(e));
   }

   public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from cerveja where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let cerveja = new Cerveja();
              cerveja.id = item.id;
              cerveja.descricao = item.descricao;
              cerveja.local = item.local;
              cerveja.preco = item.preco;
              cerveja.tam= item.tam;
              cerveja.precoMl = item.precoMl;
              return cerveja;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

 public getAll() {
  return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM cerveja';
      var data: any[] = [];
      return db.executeSql(sql,{})
        .then((data: any) => {
          if (data.rows.length > 0) {
            let cervejas: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var cerveja = data.rows.item(i);
              cervejas.push(cerveja);
            }
            return cervejas;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
}
}

export class Cerveja {
  id: number;
  descricao: string;
  local: string;
  preco: number;
  tam: number;
  precoMl : string;
}
