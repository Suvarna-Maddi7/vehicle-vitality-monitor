
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockVehicle } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';

const Settings = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      make: mockVehicle.make,
      model: mockVehicle.model,
      year: mockVehicle.year,
      licensePlate: mockVehicle.licensePlate,
      currentMileage: mockVehicle.currentMileage,
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted with:', data);
    toast({
      title: "Settings updated",
      description: "Your vehicle information has been updated successfully.",
    });
  };

  return (
    <div className="container px-4 py-6 mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="vehicle" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vehicle">Vehicle Information</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vehicle">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
              <CardDescription>Update information about your vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" {...register('make')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" {...register('model')} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" {...register('year')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input id="licensePlate" {...register('licensePlate')} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentMileage">Current Mileage</Label>
                  <Input id="currentMileage" type="number" {...register('currentMileage')} />
                </div>
                
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when maintenance is needed
                    </p>
                  </div>
                  <Switch id="maintenance-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="service-reminders">Service Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about upcoming routine service
                    </p>
                  </div>
                  <Switch id="service-reminders" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="health-updates">Health Status Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Weekly updates about vehicle's health status
                    </p>
                  </div>
                  <Switch id="health-updates" />
                </div>
                
                <Button className="mt-4" onClick={() => toast({ title: "Notification settings saved" })}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="user@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" defaultValue="John Smith" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" defaultValue="••••••••" />
                </div>
                
                <Button onClick={() => toast({ title: "Account settings saved" })}>
                  Update Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
