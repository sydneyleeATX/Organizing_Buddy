import React from 'react';
import { useRouter } from 'next/router';

const steps = [
  { label: 'Zone', path: '/zone', instructions: 'Choose your zone to work on.' },
  { label: 'Empty', path: '/empty', instructions: 'Remove all items from the zone.' },
  { label: 'Declutter', path: '/declutter', instructions: 'Decide what to keep or discard.' },
  { label: 'Clean', path: '/clean', instructions: 'Clean your empty space.' },
  { label: 'Categorize', path: '/categorize', instructions: 'Sort items into categories.' },
  { label: 'Return', path: '/return', instructions: 'Return items to their new homes.' },
  { label: 'Complete', path: '/complete', instructions: 'Celebrate your organized space!' }
];


const Timeline = ({ currentStep }) => {
  // currentStep is the current step in the process
  const router = useRouter();
  const currentIdx = steps.findIndex(
    s => s.label.toLowerCase() === currentStep?.toLowerCase()
  );

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
      {/* Timeline with dots and labels */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '8px',
        paddingTop: '16px',
        paddingBottom: '16px',
        height: 'auto',
        maxHeight: '340px',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {steps.map((step, idx) => (
          <div key={step.label} style={{ 
            height: 38, 
            position: 'relative', 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center',
            width: '100%'
          }}>
            {/* Dot button */}
            <button
              aria-label={`Go to ${step.label}`}
              onClick={() => router.push(step.path)}
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                border: idx === currentIdx ? '3px solid #007bff' : '2px solid #b2e0eb',
                background: idx === currentIdx ? '#b2e0eb' : '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                transition: 'border 0.2s, background 0.2s',
                boxShadow: idx === currentIdx ? '0 0 0 2px #b2e0eb' : 'none',
                margin: 0,
                padding: 0,
                flexShrink: 0,
              }}
            >
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: idx === currentIdx ? '#007bff' : '#b2e0eb',
                transition: 'background 0.2s',
              }} />
            </button>
            
            {/* Step label */}
            <span 
              onClick={() => router.push(step.path)}
              style={{
                marginLeft: '12px',
                fontSize: '14px',
                color: '#333',
                cursor: 'pointer',
                fontWeight: idx === currentIdx ? 'bold' : 'normal',
                transition: 'font-weight 0.2s',
              }}
            >
              {step.label}
            </span>
            
            {/* Vertical line except for last dot */}
            {idx < steps.length - 1 && (
              <div style={{
                position: 'absolute',
                left: 10,
                top: 22,
                width: 2,
                height: 38,
                background: '#b2e0eb',
                zIndex: 1,
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
