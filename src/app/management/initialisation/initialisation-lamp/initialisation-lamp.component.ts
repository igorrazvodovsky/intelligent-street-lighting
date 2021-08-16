import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'initialisation-lamp',
  templateUrl: './initialisation-lamp.component.html',
  styleUrls: ['./initialisation-lamp.component.scss']
})
export class InitialisationLampComponent implements OnInit {
  date = new FormControl(new Date());
  lampModel = 'MSLC205RL'
  luminaireModel = 'SRL 068757 L11B032 SNMG1'
  lampModels = [
    'LC2M2305R',
    'MSLC205RL',
    'LC.ZHAGA.2.0',
    'LSLC205RG',
    'ELC2M1205R',
    'Z8LC205R',
    'MSLC205R',
    'MSLC205RS',
    'MSLC205RG'
  ];
  luminaireModels = [
    'SRL 068757 L11B032 SNMG1',
    'SRL 096740 L09B064 SNWH1',
    'MRS 057740 L02E036 SNWH1',
    'SR 120740 L02C078 SNDG1',
    'SR 096740 L01B048 SNWH1',
    'SRL 037730 L02B016 ANWG1',
    'SRL 103740 L22G064 BNWH1',
    'SRL 103740 L22G064 BNWH1',
    'SRL 067740 L22B032 SNWH1'
  ];
  poleTypes = ['Metal', 'Plastic', 'Composit', 'Custom'];
  poleType = 'Metal';
  poleHeights = [6, 10]
  poleHeight = 6;
  sensors = ['Motion sensor', 'Traffic radar']

  constructor() { }

  ngOnInit(): void {
  }

}
