import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { ProductServiceService } from '../service/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
  
  products: any=[];
  searchKeyword: any;
  currentPage = 1;
  itemsPerPage = 5;
  editedProductId: any;
  isAddingProduct = false;
  newProduct: any = {
    id:'',
    title: '',
    price:'',
    description:'',
    category:'',
    image: '',
    rate:'',
    count:'',

  };

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.getProducts();
  }


  //get data from api
  getProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.map((product) => ({
          ...product,
          
        }));
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
 //searching operation
  searchProducts(): void {
    if (this.searchKeyword) {
      this.products = this.products.filter((product:any) =>
        product.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
      this.currentPage = 1; // Reset the current page when searching
    } else {
      this.getProducts();
    }
  }
  

  //delet operation
  deleteProduct(id: number): void {
    this.products = this.products.filter((product:any) => product.id !== id);
  }


 //add product 
  addProduct(): void {
    this.isAddingProduct = true;
    this.newProduct = {
      idd:'',
    title: '',
    price:'',
    description:'',
    category:'',
    image: '',
    rate:'',
    count:'',

    };
  }
  //save product
  saveProduct(): void {
   
    if (this.newProduct.title && this.newProduct.image) {
     
      const newProductId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
      
      const newProduct = {
        id: newProductId,
        idd:this.newProduct.idd,
        title: this.newProduct.title,
       price:this.newProduct.price,
       description:this.newProduct.description,
       category:this.newProduct.category,
        image: this.newProduct.image,
        rate: this.newProduct.rate,
        count: this.newProduct.count,

      };
      // Add the new product to the list
      this.products.push(newProduct);
       
      this.newProduct = {
        id:'',
        title: '',
        price:'',
        description:'',
        category:'',
        image: '',
        rate:'',
        count:'',

      };
      this.isAddingProduct = false;
    }
  }

  updateProduct(product: any): void {
    this.editedProductId = product.id;
  }

  saveProductChanges(product: any): void {
    const editedProduct = this.products.find((p: any) => p.id === product.id);
    if (editedProduct) {
      editedProduct.id = product.id;
      editedProduct.title = product.title;
      editedProduct.price = product.price;
      editedProduct.description = product.description;
      editedProduct.category = product.category;
      editedProduct.rate = product.rate;
      editedProduct.count = product.count;
      // Update the image property
      editedProduct.image = product.image;
    }
    this.editedProductId = 0;
  }
  

  cancelProductChanges(): void {
    this.editedProductId = null;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Update the producs image property
        this.newProduct.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
 
}
