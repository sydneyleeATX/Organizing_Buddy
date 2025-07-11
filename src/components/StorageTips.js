import React from "react";
import Dropdown from "./Dropdown";

const StorageTips = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div style={inlineStyles.overlay}>
      <div style={inlineStyles.modal}>
        <button style={{...inlineStyles.closeButton, zIndex: 10, background: '#fff', color: '#333', border: '1px solid #ddd'}} onClick={onClose}>&times;</button>
        <h2>Storage Tips</h2>
        {/* creates horizontal flex container */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', marginTop: '20px' }}>
          {/* creates vertical flex container (column 1) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Dropdown
              label="Visibility is key"
              items={[
                "Use clear containers or bins so you can see what’s inside.",
                "Avoid stacking opaque boxes unless clearly labeled"
              ]}
            />
            <Dropdown
              label="Labeling is a must"
              items={[
                "Label both the front and the top of containers (especially for drawers or high shelves)",
                "Use large, simple fonts for quick scanning",
                "Bonus: Add dates to labels for expiration tracking (e.g., spices or beauty products)"
              ]}
            />
            <Dropdown
              label="Group like with like"
              items={[
                "Store similar items together (e.g., all batteries, all skincare, all pasta)",
                "This makes finding and returning items faster",
                "Helps avoid buying duplicates"
              ]}
            />
            <Dropdown
              label="Use vertical space"
              items={[
                "Install shelf risers, stackable bins, or over-the-door racks",
                "Use hooks for things like tools, bags, or accessories",
                "In deep cabinets, consider stacked drawers or tension rods"
              ]}
            />
            <Dropdown
              label="Assign zones within a space"
              items={[
                "Think of your pantry or cabinet as divided into labeled zones: snacks, cleaning, tools, hair products, etc.",
                "This makes restocking and tidying intuitive"
              ]}
            />
            <Dropdown
              label="Consider moisture and heat"
              items={[
                "In bathrooms or kitchens, use waterproof containers",
                "Don’t store heat-sensitive items near windows or appliances"
              ]}
            />
          </div>
          {/**/}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Dropdown
              label="Leave a little empty space"
              items={[
                "Don’t fill every shelf to the brim",
                "Allow room for growth, new purchases, or easier access"
              ]}
            />
            <Dropdown
              label="Use what you have before buying more"
              items={[
                "Shoeboxes, mason jars, trays, or bins from other rooms often work well",
                "Try a “no-spend organizing day” first"
              ]}
            />
            <Dropdown
              label="Make your storage easy to maintain"
              items={[
                "Avoid storage solutions that look pretty but are hard to use daily (e.g., lids that never get put back)",
                "Prioritize function over form if you want the system to stick"
              ]}
            />
            <Dropdown
              label="Label temporary items or zones"
              items={[
                "Use sticky notes or whiteboard labels when setting up so you can test before committing to permanent labels"
              ]}
            />
            <Dropdown
              label="Use color coding (optional)"
              items={[
                "Especially helpful in shared spaces or kids’ rooms",
                "One color per person or per category"
              ]}
            />
            <Dropdown
              label="Store things where you use them"
              items={[
                "Sounds obvious, but it’s often overlooked",
                "Keep trash bags near the trash can, hairbrushes in the bathroom, flashlights near the door"
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageTips;

const inlineStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  modal: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    minWidth: '340px',
    maxWidth: '90vw',
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
    position: 'relative',
    textAlign: 'left',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#888',
  },
};
