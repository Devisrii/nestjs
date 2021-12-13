import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
constructor( private readonly productService: ProductService){}


@Post()
async addProduct(
    @Body('title') prodTitle:string,
    @Body('description') prodDesc:string,
    @Body('price') prodPrice:number)
     { 
        const generatedId= await this.productService.insertProduct(prodTitle,prodDesc,prodPrice);
        return {id:generatedId};
    }

@Get()
async getAllProducts(){
    const products= await this.productService.getProducts();
    return products;
}

@Get(':id')
async getProduct(@Param('id') prodId:string){
    const product = await this.productService.getSingleProduct(prodId);
    return product;
}

@Patch(':id')
async updateProduct(
    @Param('id') prodId:string,
    @Body('title') prodTitle:string,
    @Body('description') prodDesc:string,
    @Body('price') prodPrice:number) {
        const updproduct=this.productService.updateProduct(prodId,prodTitle,prodDesc,prodPrice)
        return updproduct;

}

@Delete(':id')
async removeProduct(@Param('id') prodId:string){
   const removeproduct = this.productService.deleteProduct(prodId);
    if (removeproduct) {
        const products= await this.productService.getProducts();
        return products;  
    }
    }
}