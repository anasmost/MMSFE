import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessageModule } from "primeng/message";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule,
    MessageModule,
  ],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent {
  email: string = "";
  message: string = "";
}
