import { CommonModule, CurrencyPipe } from "@angular/common";
import {
  Component,
  NgModule,
  OnInit,
  Signal,
  ViewEncapsulation,
  inject,
  signal,
} from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { RatingModule } from "primeng/rating";
import { TooltipModule } from "primeng/tooltip";
import { TagModule } from "primeng/tag";
import { CartService } from "app/shared/cart/cart.service";
import { BadgeModule } from "primeng/badge";
import { Cart } from "app/shared/cart/cart.model";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [
    DataViewModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ProductFormComponent,
    RatingModule,
    FormsModule,
    CurrencyPipe,
    TooltipModule,
    TagModule,
    BadgeModule,
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService: CartService = inject(CartService);

  public readonly products = this.productsService.products;
  public readonly cartProducts: Signal<Cart> = this.cartService.cart;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  public addToCart(product: Product) {
    this.cartService.add(product);
  }
  public removeFromCart(product: Product) {
    this.cartService.remove(product.id);
  }

  public getProductQuantity(product: Product): number {
    return this.cartProducts().find((p) => p.id === product.id)?.quantity ?? 0;
  }
}
