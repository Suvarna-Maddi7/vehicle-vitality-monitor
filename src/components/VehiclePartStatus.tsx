
import React from 'react';
import { VehiclePart } from '@/data/mockData';
import { getPartStatus, formatDate } from '@/utils/vehicleUtils';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface VehiclePartStatusProps {
  part: VehiclePart;
  className?: string;
}

const VehiclePartStatus: React.FC<VehiclePartStatusProps> = ({ part, className }) => {
  const { status, message } = getPartStatus(part);
  
  const getStatusIcon = () => {
    switch (status) {
      case 'danger':
        return <AlertCircle className="h-5 w-5 text-auto-danger" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-auto-warn" />;
      default:
        return <CheckCircle className="h-5 w-5 text-auto-success" />;
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case 'danger':
        return 'text-auto-danger border-auto-danger';
      case 'warning':
        return 'text-auto-warn border-auto-warn';
      default:
        return 'text-auto-success border-auto-success';
    }
  };
  
  const getProgressColor = () => {
    switch (status) {
      case 'danger':
        return 'bg-auto-danger';
      case 'warning':
        return 'bg-auto-warn';
      default:
        return 'bg-auto-success';
    }
  };
  
  const usagePercentage = Math.round((part.milesSinceLastService / part.estimatedLifespan) * 100);
  
  return (
    <div className={`border rounded-md p-4 ${className || ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg">{part.name}</h3>
          <div className="text-sm text-muted-foreground">
            {part.category.charAt(0).toUpperCase() + part.category.slice(1)} Component
          </div>
        </div>
        <div>{getStatusIcon()}</div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Usage</span>
          <span className={usagePercentage >= 90 ? 'text-auto-danger' : ''}>
            {part.milesSinceLastService.toLocaleString()} / {part.estimatedLifespan.toLocaleString()} mi
          </span>
        </div>
        <Progress 
          value={usagePercentage} 
          className={`h-2 ${getProgressColor()}`}
        />
      </div>
      
      <div className="flex justify-between text-sm mb-2">
        <span>Health Score:</span>
        <span 
          className={part.health < 50 ? 'text-auto-danger font-medium' : 
                    part.health < 75 ? 'text-auto-warn font-medium' : 
                    'text-auto-success font-medium'}
        >
          {part.health}%
        </span>
      </div>
      
      {part.lastServiced && (
        <div className="text-sm">
          <span className="text-muted-foreground">Last serviced: </span> 
          <span>{formatDate(new Date(part.lastServiced))}</span>
        </div>
      )}
      
      <div className={`mt-3 py-2 px-3 text-sm border rounded ${getStatusColor()}`}>
        {message}
      </div>
    </div>
  );
};

export default VehiclePartStatus;
