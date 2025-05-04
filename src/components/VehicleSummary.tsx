
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Vehicle } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/utils/vehicleUtils';
import { CarFront, Calendar, Wrench, DollarSign } from 'lucide-react';

interface VehicleSummaryProps {
  vehicle: Vehicle;
  className?: string;
}

const VehicleSummary: React.FC<VehicleSummaryProps> = ({ vehicle, className }) => {
  return (
    <Card className={`overflow-hidden ${className || ''}`}>
      <div className="bg-auto-blue h-24 relative flex items-center justify-center">
        <CarFront className="text-white h-16 w-16 opacity-20" />
        <div className="absolute inset-0 flex items-center px-6">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
            <p className="opacity-90">{vehicle.licensePlate}</p>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded">
              <Wrench className="h-5 w-5 text-auto-blue" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Current Mileage</div>
              <div className="font-medium">{vehicle.currentMileage.toLocaleString()} miles</div>
            </div>
          </div>
          
          {vehicle.lastMaintenanceDate && (
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded">
                <Calendar className="h-5 w-5 text-auto-blue" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Last Maintenance</div>
                <div className="font-medium">{formatDate(vehicle.lastMaintenanceDate)}</div>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded">
              <DollarSign className="h-5 w-5 text-auto-blue" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Maintenance Cost</div>
              <div className="font-medium">{formatCurrency(vehicle.maintenanceCost)}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded">
              <Wrench className="h-5 w-5 text-auto-blue" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Maintenance Records</div>
              <div className="font-medium">{vehicle.maintenanceCount} services</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleSummary;
