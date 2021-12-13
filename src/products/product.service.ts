import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.model";

@Injectable()
export class ProductService{
// private products:Product[] = [];
constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

    async insertProduct(title:string,desc:string,price:number){
        const newproduct=new this.productModel({title,desc,price});
        const result= await newproduct.save(); 
        return result;
    }

    async getProducts(){
       const productList= await this.productModel.find();
        return productList;
    }

    async getSingleProduct(productID:String){
        const product= await this.productModel.findById(productID);
        if (!product) {
        throw new NotFoundException('could not find product')
        }
        return product;
    }
    
    async updateProduct(productID:String,title:string,desc:string,price:number){
        const updatedProduct= await this.productModel.findByIdAndUpdate(productID);
        if(title){
            updatedProduct.title=title;
        }
        if(desc){
            updatedProduct.desc=desc;
        }
        if(price){
            updatedProduct.price=price;
        }
        const updresult= await updatedProduct.save();
        return updresult;
    }

    async deleteProduct(prodID:String){
        const index= await this.productModel.findByIdAndDelete(prodID);
        console.log(index);
        if (index) {
            const productList= await this.productModel.find();
            return productList;  
        }
    }

    // private findProduct(id:String):[Product,number]{
    //     const productIndex=this.products.findIndex(prod => prod.id==id);
    //     const product=this.products[productIndex]
    //     if(!product){
    //         throw new NotFoundException('could not find product') 
    //     }
    //     return [product,productIndex];
    // }
   
}
