
import { addDays, subDays } from 'date-fns';

export interface MaintenanceRecord {
  id: string;
  date: Date;
  partId: string;
  description: string;
  cost: number;
  mileage: number;
  mechanic?: string;
  notes?: string;
  severity: 'routine' | 'important' | 'critical';
}

export interface VehiclePart {
  id: string;
  name: string;
  category: 'engine' | 'transmission' | 'brakes' | 'suspension' | 'electrical' | 'cooling' | 'other';
  health: number; // 0-100
  lastServiced?: Date;
  estimatedLifespan: number; // in miles
  milesSinceLastService: number;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  currentMileage: number;
  overallHealth: number; // 0-100
  maintenanceCost: number;
  maintenanceCount: number;
  lastMaintenanceDate?: Date;
  image?: string;
}

// Mock data
export const mockVehicle: Vehicle = {
  id: 'v1',
  make: 'Toyota',
  model: 'Camry',
  year: 2018,
  licensePlate: 'ABC-1234',
  currentMileage: 45000,
  overallHealth: 78,
  maintenanceCost: 3250,
  maintenanceCount: 12,
  lastMaintenanceDate: subDays(new Date(), 45),
};

export const mockParts: VehiclePart[] = [
  {
    id: 'p1',
    name: 'Engine Oil',
    category: 'engine',
    health: 62,
    lastServiced: subDays(new Date(), 45),
    estimatedLifespan: 5000,
    milesSinceLastService: 1800,
  },
  {
    id: 'p2',
    name: 'Brake Pads',
    category: 'brakes',
    health: 84,
    lastServiced: subDays(new Date(), 90),
    estimatedLifespan: 30000,
    milesSinceLastService: 4800,
  },
  {
    id: 'p3',
    name: 'Air Filter',
    category: 'engine',
    health: 45,
    lastServiced: subDays(new Date(), 180),
    estimatedLifespan: 15000,
    milesSinceLastService: 8200,
  },
  {
    id: 'p4',
    name: 'Transmission Fluid',
    category: 'transmission',
    health: 90,
    lastServiced: subDays(new Date(), 300),
    estimatedLifespan: 50000,
    milesSinceLastService: 5000,
  },
  {
    id: 'p5',
    name: 'Battery',
    category: 'electrical',
    health: 72,
    lastServiced: subDays(new Date(), 400),
    estimatedLifespan: 40000,
    milesSinceLastService: 11000,
  },
  {
    id: 'p6',
    name: 'Coolant',
    category: 'cooling',
    health: 60,
    lastServiced: subDays(new Date(), 200),
    estimatedLifespan: 25000,
    milesSinceLastService: 10000,
  },
];

export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'm1',
    date: subDays(new Date(), 45),
    partId: 'p1',
    description: 'Oil Change',
    cost: 75,
    mileage: 43200,
    mechanic: 'Quick Lube Center',
    notes: 'Used synthetic oil as recommended',
    severity: 'routine',
  },
  {
    id: 'm2',
    date: subDays(new Date(), 90),
    partId: 'p2',
    description: 'Replaced front brake pads',
    cost: 220,
    mileage: 40200,
    mechanic: 'City Auto Repair',
    notes: 'Ceramic pads installed',
    severity: 'important',
  },
  {
    id: 'm3',
    date: subDays(new Date(), 180),
    partId: 'p3',
    description: 'Air filter replacement',
    cost: 45,
    mileage: 36800,
    mechanic: 'DIY',
    notes: 'Used OEM filter',
    severity: 'routine',
  },
  {
    id: 'm4',
    date: subDays(new Date(), 220),
    partId: 'p6',
    description: 'Coolant flush and replacement',
    cost: 120,
    mileage: 35000,
    mechanic: 'City Auto Repair',
    notes: 'System pressure tested, no leaks',
    severity: 'important',
  },
  {
    id: 'm5',
    date: subDays(new Date(), 250),
    partId: 'p1',
    description: 'Oil change and inspection',
    cost: 90,
    mileage: 33000,
    mechanic: 'Dealer Service',
    severity: 'routine',
  },
  {
    id: 'm6',
    date: subDays(new Date(), 365),
    partId: 'p5',
    description: 'Battery test and terminals cleaning',
    cost: 35,
    mileage: 24000,
    mechanic: 'Quick Lube Center',
    notes: 'Battery showing signs of wear but still good',
    severity: 'routine',
  },
  {
    id: 'm7',
    date: subDays(new Date(), 400),
    partId: 'p5',
    description: 'Battery replacement',
    cost: 165,
    mileage: 22000,
    mechanic: 'Auto Parts Store',
    notes: 'Replaced with 5-year warranty battery',
    severity: 'critical',
  },
];
