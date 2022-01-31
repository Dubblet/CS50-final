import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { GeneralComponent } from './general/general.component';
import { SearchComponent } from './search/search.component';
import { InfoComponent } from './info/info.component';
import { StatsComponent } from './info/stats/stats.component';
import { MovesComponent } from './info/moves/moves.component';
import { TmsComponent } from './info/tms/tms.component';
import { EvolutionsComponent } from './info/evolutions/evolutions.component';
import { BioComponent } from './info/bio/bio.component';
import { DexComponent } from './info/dex/dex.component';
import { AbilitiesComponent } from './info/abilities/abilities.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    SearchComponent,
    InfoComponent,
    StatsComponent,
    MovesComponent,
    TmsComponent,
    EvolutionsComponent,
    BioComponent,
    DexComponent,
    AbilitiesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
