import { DeviceModel } from '~local/types';

// Hardware catalogue shared by every city, so it isn't city-scoped. `name` is
// what devices carry in their `model` property. A lamp's model is its luminaire
// controller; the luminaire it drives is listed with it.
export const DEVICE_MODELS: DeviceModel[] = [
  {
    name: 'LC2M1806R',
    type: 'Luminaire controller',
    controlType: 'DALI',
    hardwareVersion: '1.00ZHAGA',
    luminaire: 'SRL040730L07B024SNMG1',
    wattage: 40,
    driverModel: 'DR-040-350',
    driverProducer: 'Drivers Inc.',
  },
  {
    name: 'LC2M2305R',
    type: 'Luminaire controller',
    controlType: 'DALI',
    hardwareVersion: '1.00ZHAGA',
    luminaire: 'SRL068757L11B032SNMG1',
    wattage: 68,
    driverModel: 'DR-075-700',
    driverProducer: 'Drivers Inc.',
  },
  {
    name: 'LC2M3008H',
    type: 'Luminaire controller',
    controlType: 'DALI-2',
    hardwareVersion: '1.10ZHAGA',
    luminaire: 'SRL096740L09B064SNWH1',
    wattage: 96,
    driverModel: 'DR-100-700',
    driverProducer: 'Drivers Inc.',
  },
  {
    name: 'SCM24UL8-868-44',
    type: 'Segment controller',
    controlType: 'RF mesh, 868 MHz',
    hardwareVersion: '2.4',
  },
  {
    name: 'SCM32UL10-868-55',
    type: 'Segment controller',
    controlType: 'RF mesh, 868 MHz',
    hardwareVersion: '3.2',
  },
];
