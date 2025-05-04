
import { Vehicle, VehiclePart, MaintenanceRecord } from "../data/mockData";
import { format, isAfter, compareDesc } from "date-fns";

// Format currency for display
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date for display
export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

// Sort maintenance records by date (newest first)
export const sortMaintenanceByDate = (records: MaintenanceRecord[]): MaintenanceRecord[] => {
  return [...records].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
};

// Calculate health color based on health score
export const getHealthColor = (health: number): string => {
  if (health >= 75) return 'auto-success';
  if (health >= 50) return 'auto-warn';
  return 'auto-danger';
};

// Get part status text
export const getPartStatus = (part: VehiclePart): {
  status: 'good' | 'warning' | 'danger';
  message: string;
} => {
  const percentUsed = (part.milesSinceLastService / part.estimatedLifespan) * 100;
  
  if (percentUsed > 90) {
    return {
      status: 'danger',
      message: 'Requires immediate attention',
    };
  } else if (percentUsed > 70) {
    return {
      status: 'warning',
      message: 'Service needed soon',
    };
  }
  return {
    status: 'good',
    message: 'In good condition',
  };
};

// Calculate maintenance summary statistics
export const getMaintenanceStats = (records: MaintenanceRecord[]): {
  totalCost: number;
  averageCost: number;
  mostExpensiveRepair: MaintenanceRecord | null;
  recentRecords: MaintenanceRecord[];
} => {
  if (records.length === 0) {
    return {
      totalCost: 0,
      averageCost: 0,
      mostExpensiveRepair: null,
      recentRecords: [],
    };
  }

  const totalCost = records.reduce((sum, record) => sum + record.cost, 0);
  const averageCost = totalCost / records.length;
  
  // Find most expensive repair
  const mostExpensiveRepair = records.reduce((max, record) => 
    record.cost > (max?.cost || 0) ? record : max, records[0]);
  
  // Get 3 most recent records
  const recentRecords = sortMaintenanceByDate(records).slice(0, 3);
  
  return {
    totalCost,
    averageCost,
    mostExpensiveRepair,
    recentRecords,
  };
};

// Get upcoming maintenance recommendations
export const getUpcomingMaintenanceRecommendations = (
  parts: VehiclePart[]
): { partId: string; partName: string; urgency: 'high' | 'medium' | 'low'; message: string }[] => {
  return parts
    .filter(part => part.health < 75)
    .map(part => {
      let urgency: 'high' | 'medium' | 'low' = 'low';
      let message = '';

      if (part.health < 30) {
        urgency = 'high';
        message = `${part.name} is critically low and should be serviced immediately`;
      } else if (part.health < 50) {
        urgency = 'medium';
        message = `${part.name} should be serviced in the next 1-2 weeks`;
      } else {
        message = `${part.name} should be checked during your next service`;
      }

      return {
        partId: part.id,
        partName: part.name,
        urgency,
        message,
      };
    })
    .sort((a, b) => {
      const urgencyOrder = { high: 1, medium: 2, low: 3 };
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    });
};

// Get health indicator text
export const getHealthIndicatorText = (health: number): string => {
  if (health >= 80) return 'Excellent';
  if (health >= 70) return 'Good';
  if (health >= 50) return 'Fair';
  if (health >= 30) return 'Poor';
  return 'Critical';
};
