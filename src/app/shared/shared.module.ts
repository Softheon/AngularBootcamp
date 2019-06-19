import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { NavButtonsComponent } from './components/nav-buttons/nav-buttons.component';
import { PanelSliderComponent } from './components/panel-slider/panel-slider.component';
import { LettersOnlyDirective } from './directives/letters-only.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { PhoneFormatPipe } from './pipes/phone-number';

@NgModule({
  declarations: [
    LettersOnlyDirective,
    PanelSliderComponent,
    NavButtonsComponent,
    NumbersOnlyDirective,
    PhoneFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LettersOnlyDirective,
    PanelSliderComponent,
    NavButtonsComponent,
    NumbersOnlyDirective,
    PhoneFormatPipe
  ]
})
export class SharedModule { }
