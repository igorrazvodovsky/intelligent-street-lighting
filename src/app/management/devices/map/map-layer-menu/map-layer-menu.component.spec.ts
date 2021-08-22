import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLayerMenuComponent } from './map-layer-menu.component';

describe('MapLayerMenuComponent', () => {
  let component: MapLayerMenuComponent;
  let fixture: ComponentFixture<MapLayerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapLayerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLayerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
