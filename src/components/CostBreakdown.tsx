
import React from 'react';
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MaintenanceRecord } from '@/data/mockData';
import { formatCurrency } from '@/utils/vehicleUtils';

interface CostBreakdownProps {
  maintenanceRecords: MaintenanceRecord[];
  className?: string;
}

interface CategoryCost {
  category: string;
  cost: number;
  color: string;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ maintenanceRecords, className }) => {
  // Calculate costs by part category
  const calculateCostsByCategory = (): CategoryCost[] => {
    const categoryMap = new Map<string, number>();
    
    // Group costs by category
    maintenanceRecords.forEach(record => {
      const partId = record.partId;
      const category = getPartCategory(partId);
      
      if (category) {
        const currentAmount = categoryMap.get(category) || 0;
        categoryMap.set(category, currentAmount + record.cost);
      }
    });
    
    // Transform to array for chart
    const categoryColors: Record<string, string> = {
      'engine': '#0F52BA',
      'transmission': '#3498db',
      'brakes': '#e74c3c',
      'suspension': '#9b59b6',
      'electrical': '#f1c40f',
      'cooling': '#1abc9c',
      'other': '#7f8c8d',
    };
    
    return Array.from(categoryMap.entries()).map(([category, cost]) => ({
      category: capitalizeFirstLetter(category),
      cost,
      color: categoryColors[category.toLowerCase()] || '#7f8c8d',
    })).sort((a, b) => b.cost - a.cost); // Sort by cost descending
  };
  
  // Helper to get part category from part ID
  const getPartCategory = (partId: string): string => {
    // Map from our mock data
    const categoryMap: Record<string, string> = {
      'p1': 'Engine',
      'p2': 'Brakes',
      'p3': 'Engine',
      'p4': 'Transmission',
      'p5': 'Electrical',
      'p6': 'Cooling',
    };
    
    return categoryMap[partId] || 'Other';
  };
  
  // Helper to capitalize first letter
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const costData = calculateCostsByCategory();
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-md shadow-md">
          <p className="font-medium">{payload[0].payload.category}</p>
          <p className="text-auto-blue font-medium">
            {formatCurrency(payload[0].payload.cost)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Maintenance Cost Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {costData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No maintenance data available
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={costData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.length > 8 ? `${value.substring(0, 8)}...` : value}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value).replace('.00', '')}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="cost" 
                  name="Cost" 
                  fill="#0F52BA"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          {costData.map((item) => (
            <div key={item.category} className="flex justify-between items-center px-2 py-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm truncate">{item.category}</span>
              </div>
              <span className="text-sm font-medium">{formatCurrency(item.cost)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;
