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
      {/* Timeline dots only, left-aligned, compact */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '8px', // small margin from left edge
        marginRight: '12px',
        paddingTop: '16px',
        paddingBottom: '16px',
        height: 'auto',
        maxHeight: '340px', // compact, not full screen
        justifyContent: 'center',
        position: 'relative',
      }}>
        {steps.map((step, idx) => (
          <div key={step.label} style={{ height: 38, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      {/* The rest of the page content should go here, not in Timeline */}
    </div>
  );
};

export default Timeline;
