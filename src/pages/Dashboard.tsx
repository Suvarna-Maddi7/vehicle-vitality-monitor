import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import HealthMeter from '@/components/HealthMeter';
import MaintenanceTimeline from '@/components/MaintenanceTimeline';
import VehiclePartStatus from '@/components/VehiclePartStatus';
import VehicleSummary from '@/components/VehicleSummary';
import CostBreakdown from '@/components/CostBreakdown';
import { mockVehicle, mockParts, mockMaintenanceRecords, VehiclePart } from '@/data/mockData';
import { sortMaintenanceByDate, getUpcomingMaintenanceRecommendations } from '@/utils/vehicleUtils';
import { AlertTriangle } from 'lucide-react';
const Dashboard = () => {
  const sortedRecords = sortMaintenanceByDate(mockMaintenanceRecords);
  const recommendations = getUpcomingMaintenanceRecommendations(mockParts);

  // Filter for parts that need attention
  const partsNeedingAttention = mockParts.filter(p => p.health < 75).sort((a, b) => a.health - b.health);
  return <div className="container px-4 py-6 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Vehicle Maintainance </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <VehicleSummary vehicle={mockVehicle} />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Vehicle Health</CardTitle>
              <CardDescription>Overall condition of your vehicle</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pt-2">
              <HealthMeter health={mockVehicle.overallHealth} size="lg" />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
          <TabsTrigger value="parts">Parts Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Upcoming Maintenance
                  {recommendations.length > 0 && <Badge variant="outline" className="ml-2 bg-auto-warn text-black">
                      {recommendations.length} Items
                    </Badge>}
                </CardTitle>
                <CardDescription>Items that require attention</CardDescription>
              </CardHeader>
              <CardContent>
                {recommendations.length === 0 ? <div className="py-8 text-center text-muted-foreground">
                    No upcoming maintenance required
                  </div> : <div className="space-y-3">
                    {recommendations.map(rec => <div key={rec.partId} className={`p-3 rounded-md border flex items-start gap-3 ${rec.urgency === 'high' ? 'bg-red-50 border-red-200' : rec.urgency === 'medium' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                        <AlertTriangle className={`h-5 w-5 mt-0.5 ${rec.urgency === 'high' ? 'text-auto-danger' : rec.urgency === 'medium' ? 'text-auto-warn' : 'text-auto-blue'}`} />
                        <div>
                          <p className="font-medium mb-1">{rec.partName}</p>
                          <p className="text-sm">{rec.message}</p>
                        </div>
                      </div>)}
                  </div>}
              </CardContent>
            </Card>
            
            <CostBreakdown maintenanceRecords={mockMaintenanceRecords} />
          </div>
          
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Recent Maintenance</CardTitle>
              <CardDescription>Last 3 maintenance records</CardDescription>
            </CardHeader>
            <CardContent>
              <MaintenanceTimeline records={sortedRecords.slice(0, 3)} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
              <CardDescription>Record of all maintenance performed on your vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <MaintenanceTimeline records={sortedRecords} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="parts" className="pt-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Parts Needing Attention</h2>
            {partsNeedingAttention.length === 0 ? <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">All parts are in good condition</p>
                </CardContent>
              </Card> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {partsNeedingAttention.map(part => <VehiclePartStatus key={part.id} part={part} />)}
              </div>}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>All Vehicle Parts</CardTitle>
              <CardDescription>Status of all monitored vehicle components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockParts.map(part => <VehiclePartStatus key={part.id} part={part} />)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Dashboard;