import {
  AfterViewChecked,
  Component,
  computed,
  Inject,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { BadgeModule } from "primeng/badge";
import { SplitterModule } from "primeng/splitter";
import { ToolbarModule } from "primeng/toolbar";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { CartService } from "./shared/cart/cart.service";
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { DataViewModule } from "primeng/dataview";
import { CommonModule } from "@angular/common";
import { ProductsService } from "./products/data-access/products.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    RouterModule,
    SplitterModule,
    ToolbarModule,
    PanelMenuComponent,
    BadgeModule,
    OverlayPanelModule,
    DataViewModule,
    CommonModule,
  ],
})
export class AppComponent {
  title = "ALTEN SHOP";
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductsService);

  public readonly cart = computed(() =>
    this.cartService
      .cart()
      .map((item) =>
        this.productService.products().find((p) => p.id === item.id)
      )
  );
}
