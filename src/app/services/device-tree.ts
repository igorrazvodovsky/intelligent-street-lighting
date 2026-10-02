import { Device, DeviceGroup } from '../types';

// Pure helpers for the group hierarchy, shared by services and components.
// Groups nest one level deep: top-level groups (areas) hold child groups
// (streets), so a group and its child groups is the whole of its subtree.

export function lamps(devices: Device[]): Device[] {
  return devices.filter(device => device.type === 'lamp');
}

export function childGroups(groups: DeviceGroup[], groupId: number): DeviceGroup[] {
  return groups.filter(group => group.parentId === groupId);
}

// The lamps a group covers: its own and those of its child groups
export function lampsInGroup(devices: Device[], groups: DeviceGroup[], groupId: number): Device[] {
  const groupIds = [groupId, ...childGroups(groups, groupId).map(group => group.id)];
  return lamps(devices).filter(lamp => groupIds.includes(lamp.groupId));
}

// The group and its ancestors, top-level group first. Empty for an unknown id.
export function groupChain(groups: DeviceGroup[], groupId: number): DeviceGroup[] {
  const chain: DeviceGroup[] = [];
  let group = groups.find(g => g.id === groupId);
  while (group) {
    chain.unshift(group);
    const parentId = group.parentId;
    group = parentId != null ? groups.find(g => g.id === parentId) : undefined;
  }
  return chain;
}

// A controller drives the lamps in its own group and that group's child
// groups, so a lamp's controller sits in its group or the parent group. Same
// rule as the controller's Segment tab.
export function segmentController(device: Device, devices: Device[], groups: DeviceGroup[]): Device | undefined {
  const group = groups.find(g => g.id === device.groupId);
  const controllerIn = (groupId: number) => devices.find(d => d.type === 'sc' && d.groupId === groupId);
  return controllerIn(device.groupId) ?? (group?.parentId != null ? controllerIn(group.parentId) : undefined);
}
