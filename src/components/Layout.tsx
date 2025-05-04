import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ClipboardList, Settings, Bell, Search, GaugeCircle, Menu, X } from 'lucide-react';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigation = [{
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard
  }, {
    name: 'Maintenance',
    href: '/maintenance',
    icon: ClipboardList
  }, {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }];
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  return <div className="min-h-screen bg-slate-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <GaugeCircle className="h-6 w-6 text-auto-blue mr-2" />
          <span className="font-bold text-lg">Vehicle Vitality</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && <div className="lg:hidden fixed inset-0 z-10 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-16 left-0 w-64 h-screen bg-white" onClick={e => e.stopPropagation()}>
            <div className="pt-2 pb-4">
              {navigation.map(item => <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)} className={cn("flex items-center gap-3 px-4 py-3 text-base font-medium", isActive(item.href) ? "bg-slate-100 text-auto-blue" : "text-slate-600 hover:bg-slate-50")}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>)}
            </div>
          </div>
        </div>}
      
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:bg-white lg:pb-4 lg:border-r">
        <div className="flex items-center h-16 px-6 border-b">
          <GaugeCircle className="h-6 w-6 text-auto-blue mr-2" />
          <span className="font-bold text-lg">Vehicle Vitality</span>
        </div>
        <nav className="mt-6">
          <ul className="space-y-1 px-3">
            {navigation.map(item => <li key={item.name}>
                <Link to={item.href} className={cn("group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium", isActive(item.href) ? "bg-slate-100 text-auto-blue" : "text-slate-600 hover:bg-slate-50")}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>)}
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className={cn("min-h-screen pt-16 lg:pt-0 lg:pl-64")}>
        <header className="hidden lg:flex h-16 items-center gap-4 border-b bg-white px-6">
          <Button variant="outline" size="icon" className="rounded-full">
            <Search className="h-4 w-4" />
          </Button>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>;
};
export default Layout;