import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
  WooCommerce: any;
  products: any[];
  page: number;
  category: any;
  moreProducts: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   //Displays products from the first page
   this.page = 1;
   //receives catagory from nav params sent from the MenuPage
   this.category = this.navParams.get('category');
   console.log('cat', this.category);
    this.WooCommerce = WC({
      url: "http://localhost:8888/woocommerce",
      consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
      consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
    });

    //Get products by category from api
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then( (data)=> {
      this.products = JSON.parse(data.body).products;
      console.log(this.products);
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  loadMoreProducts(event){
   this.page++;
   console.log("getting page" + this.page);
   this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then( (data)=> {
    let temp = (JSON.parse(data.body).products);
    this.products = this.products.concat(JSON.parse(data.body).products);
    console.log(this.products);
    event.complete();

    if(temp.length < 10){
      event.enable(false);
    }
   })

  }

openProductPage(product){
 this.navCtrl.push(ProductDetailsPage, {"product": product});
}

}
