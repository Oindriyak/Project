import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoiceRoutingModule } from './voice-routing.module';
import { VoiceComponent } from './voice/voice.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    VoiceComponent
  ],
  imports: [
    CommonModule,
    VoiceRoutingModule,
    SharedModule
  ]
})
export class VoiceModule { }
