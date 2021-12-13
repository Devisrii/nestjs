import * as Mongoose  from "mongoose"

export const ProductSchema = new Mongoose.Schema({
    title:{ type:String,require:true},
    desc:{ type:String,require:true},
    price:{ type:Number,require:true}
})
export interface Product extends Mongoose.Document{
         id:string; 
         title:string;
         desc:string;
         price:number;
}