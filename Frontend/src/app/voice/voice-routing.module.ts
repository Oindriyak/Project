import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoiceComponent } from './voice/voice.component';
const routes: Routes = [
  {
    path:'',
    component:VoiceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoiceRoutingModule { }
