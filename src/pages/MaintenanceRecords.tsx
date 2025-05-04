
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaintenanceTimeline from '@/components/MaintenanceTimeline';
import MaintenanceForm from '@/components/MaintenanceForm';
import { MaintenanceFormData } from '@/components/MaintenanceForm';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { mockMaintenanceRecords, mockParts, MaintenanceRecord } from '@/data/mockData';
import { sortMaintenanceByDate } from '@/utils/vehicleUtils';

const MaintenanceRecords = () => {
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords);
  
  const toggleForm = () => setShowForm(!showForm);

  const handleAddMaintenance = (data: MaintenanceFormData) => {
    const newRecord: MaintenanceRecord = {
      id: `m${records.length + 1}`,
      ...data,
      severity: data.severity,
    };
    
    setRecords([newRecord, ...records]);
    setShowForm(false);
  };
  
  const sortedRecords = sortMaintenanceByDate(records);
  
  return (
    <div className="container px-4 py-6 mx-auto max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Maintenance Records</h1>
        <Button onClick={toggleForm} className="flex items-center gap-1">
          {showForm ? (
            <>
              <X className="h-4 w-4" /> Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add Record
            </>
          )}
        </Button>
      </div>
      
      {showForm && (
        <Card className="mb-6 border-auto-blue">
          <CardHeader>
            <CardTitle>Add New Maintenance Record</CardTitle>
          </CardHeader>
          <CardContent>
            <MaintenanceForm
              parts={mockParts}
              onAddMaintenance={handleAddMaintenance}
            />
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance History</CardTitle>
        </CardHeader>
        <CardContent>
          <MaintenanceTimeline records={sortedRecords} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceRecords;
