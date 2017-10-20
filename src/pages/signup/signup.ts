import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // New user object to be used for [(ngModel)] in form
  newUser: any = {};
  billing_shipping_same: boolean;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    //Initilaizes the billing address object within newUser object
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false;

    this.WooCommerce = WC({
      url: "http://localhost:8888/woocommerce",
      consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
      consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
    });

  }

setBillingToShipping(){
  this.billing_shipping_same = !this.billing_shipping_same;
}


checkEmail(){
 let validEmail = false;
 let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 //Validates email with regular expression
 if(reg.test(this.newUser.email)){
   this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then((data) => {
    let res = (JSON.parse(data.body));

    if(res.errors){
      validEmail = true;

       this.toastCtrl.create({
         message: "Email is good to go",
         duration: 3000
       }).present();

    } else {
      validEmail = false;
      this.toastCtrl.create({
        message: "Email is registered to another account",
        showCloseButton: true
      }).present();
    }

    console.log(validEmail);

   })
 } else {
   validEmail = false;
     console.log(validEmail);
     this.toastCtrl.create({
       message: "Invalid email, please check",
       showCloseButton: true
     }).present();
 }

}

}