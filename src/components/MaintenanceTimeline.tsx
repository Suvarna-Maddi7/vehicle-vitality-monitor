
import React from 'react';
import { format } from 'date-fns';
import { MaintenanceRecord } from '@/data/mockData';
import { formatCurrency } from '@/utils/vehicleUtils';
import { Badge } from '@/components/ui/badge';

interface MaintenanceTimelineProps {
  records: MaintenanceRecord[];
  className?: string;
}

const MaintenanceTimeline: React.FC<MaintenanceTimelineProps> = ({ records, className }) => {
  // Severity badge color mapping
  const getSeverityColor = (severity: MaintenanceRecord['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-auto-danger text-white';
      case 'important':
        return 'bg-auto-warn text-black';
      default:
        return 'bg-slate-200 text-slate-700';
    }
  };

  return (
    <div className={`relative px-6 maintenance-timeline ${className || ''}`}>
      {records.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          No maintenance records available
        </div>
      ) : (
        records.map((record, index) => (
          <div key={record.id} className="relative pl-10 pb-8">
            <div className="timeline-dot" />
            <div className="bg-card shadow-sm rounded-md p-4 border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{record.description}</h3>
                <Badge className={getSeverityColor(record.severity)}>
                  {record.severity}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mb-2">
                {format(new Date(record.date), 'MMMM d, yyyy')}
              </div>
              
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Cost: </span>
                  <span className="font-medium">{formatCurrency(record.cost)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Mileage: </span>
                  <span className="font-medium">{record.mileage.toLocaleString()} mi</span>
                </div>
              </div>
              
              {(record.mechanic || record.notes) && (
                <div className="mt-2 pt-2 border-t text-sm">
                  {record.mechanic && (
                    <div>
                      <span className="text-muted-foreground">Service by: </span>
                      <span>{record.mechanic}</span>
                    </div>
                  )}
                  {record.notes && (
                    <div className="text-muted-foreground italic mt-1">{record.notes}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MaintenanceTimeline;
