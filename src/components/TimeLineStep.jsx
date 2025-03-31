import React from 'react';
import { formatDate } from '../utils/formatDate'; // Formatierungsfunktion importieren

const TimeLineStep = ({ step, isCompleted, isCurrent, isLastStep, icon, description, order }) => {
    
    // Definieren von Farbklassen für verschiedene Statuszustände
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-100';
    const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
    const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-200';
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';

  return (
    <li className='relative mb-6 sm:mb-0 sm:pl-10'>
        <div className='flex items-center'>
            {/* Icon-Bereich */}
            <div className={`z-10 flex items-center justify-center w-6 h-6 rounded-full ${iconBgColor} ${iconTextColor}`}>
                <i className={`ri-${icon.iconName} text-xl`}></i>
            </div>

            {/* Verbindungsbalken zwischen den Schritten */}
            {!isLastStep && (
                <div className={`hidden sm:flex w-full h-0.5 ${connectorColor}`}>
                </div>
            )}  
        </div>

        {/* Beschreibungsbereich */}
        <div className='mt-3 sm:pe-8'>
             <h3 className={`font-medium text-base ${labelTextColor}`}>{step.label}</h3>
             
             {/* Zeitangabe mit formatierter Datumsausgabe */}
             <time className='block mb-2 text-sm font-normal leading-none text-gray-400'>
                 {order?.updatedAt ? formatDate(order.updatedAt) : 'Time'}
             </time>

             <p className={`text-base font-normal ${descriptionTextColor}`}>{description}</p>
        </div>
    </li>
  );
}

export default TimeLineStep;
