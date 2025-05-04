
import React from 'react';
import { cn } from '@/lib/utils';
import { getHealthIndicatorText } from '@/utils/vehicleUtils';

interface HealthMeterProps {
  health: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const HealthMeter: React.FC<HealthMeterProps> = ({ 
  health, 
  size = 'md', 
  showLabel = true,
  className 
}) => {
  const healthPercentage = Math.max(0, Math.min(100, health));
  
  // Dynamic sizes based on prop
  const dimensions = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  // Health status color
  const getColor = () => {
    if (health >= 75) return 'text-auto-success';
    if (health >= 50) return 'text-auto-warn';
    return 'text-auto-danger';
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div 
        className={cn(
          dimensions[size],
          'relative rounded-full flex items-center justify-center'
        )}
        style={{ 
          '--health-percentage': `${healthPercentage}%`,
          background: `conic-gradient(
            #4CAF50 0% ${healthPercentage}%, 
            #FFD700 ${healthPercentage}% ${Math.min(healthPercentage + 35, 100)}%,
            #FF4136 ${Math.min(healthPercentage + 35, 100)}% 100%
          )`
        } as React.CSSProperties}
      >
        <div className={cn('bg-background rounded-full flex items-center justify-center', {
          'w-16 h-16': size === 'sm',
          'w-28 h-28': size === 'md',
          'w-36 h-36': size === 'lg',
        })}>
          <span className={cn(textSizes[size], 'font-bold', getColor())}>
            {health}%
          </span>
        </div>
      </div>
      
      {showLabel && (
        <div className={cn('mt-2 font-medium', labelSizes[size], getColor())}>
          {getHealthIndicatorText(health)}
        </div>
      )}
    </div>
  );
};

export default HealthMeter;
