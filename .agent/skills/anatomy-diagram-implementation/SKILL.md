---
name: anatomy-diagram-implementation
description: Guide for creating interactive Component Anatomy diagrams with measurement and token inspection features.
---

# Anatomy Diagram Implementation Guide

This skill provides a standardized approach to building interactive Anatomy diagrams for the Design System documentation. It covers layout, labeling, color token mapping, and measurement integration.

## Core Capabilities
- **Structural Analysis**: Visualize component parts (Container, Trigger, Indicator, etc.).
- **Token Inspection**: interactive color labels that reveal token usage.
- **Measurement Mode**: Precise pixel-perfect measurement overlays.
- **Interactive Feedback**: Hover effects and synchronized info panels.

## 1. Component Structure

Create a new Anatomy component (e.g., `TabsAnatomy.tsx`) or add logic to `AnatomyPreview.tsx`.
The component should use relative positioning to serve as the anchor for absolute-positioned labels.

```tsx
<div className="relative flex items-center justify-center p-8 select-none">
  {/* Actual Component Representation */}
  <div className="relative ...">
    {/* ... rendered component ... */}
  </div>

  {/* Labels */}
  <AnatomyLabel ... />
  <ColorLabel ... />
</div>
```

## 2. Using Core Components

### AnatomyLabel (Structural)
Used to identify physical parts of the component (e.g., "Container", "Handle").

```tsx
<AnatomyLabel
  label="Container"         // Display text
  direction="left"          // Line direction: 'top' | 'bottom' | 'left' | 'right'
  length={32}               // Length of the indicator line (px)
  isActive={hoveredPart === 'Container'}
  isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
  onMouseEnter={() => handleHoverChange('Container')}
  onMouseLeave={() => handleHoverChange(null)}
  offset={0}                // Fine-tune connection point
/>
```

### ColorLabel (Tokens)
Used to identify color tokens (e.g., "Background", "Text Color").

```tsx
<ColorLabel
  color="bg-muted"          // Token key (must match color token system)
  label="Background"        // Display text
  direction="bottom"        // Line direction
  length={24}
  isActive={hoveredColor === 'bg-muted'}
  isDimmed={hoveredColor !== null && hoveredColor !== 'bg-muted'}
  onMouseEnter={() => handleColorHoverChange('bg-muted', 'Background Name')} // Pass custom name!
  onMouseLeave={() => handleColorHoverChange(null)}
  offset={0}
  isTextColor={false}       // Set true if labeling text color (adjusts dot style)
/>
```

### Passing Custom Names
Critically, `handleColorHoverChange` should pass a human-readable name (2nd arg) so the `AnatomyInfoPanel` displays it nicely (e.g., "Active Tab Label" instead of generic internal usage).

## 3. Integration with ComponentDetailPage

The `AnatomyPreview` wrapper handles state and passes it to `ComponentDetailPage`.

```tsx
// ComponentDetailPage.tsx
<AnatomyPreview
  onColorHoverChange={(color, name) => {
    setHoveredColorToken(color);
    setHoveredColorName(name); // Capture custom name
  }}
  // ...
/>
<AnatomyInfoPanel
  customColorName={hoveredColorName} // Pass to panel
  // ...
/>
```

## 4. Best Practices

### Layout & Alignment
- **Direction**: Choose `direction` based on available white space. Avoid crossing lines.
- **Offset**: Use `offset` to ensure the line tip touches the *exact* pixel of the element being described.
- **Flexbox**: Use Flexbox for the main container to center the component easily.

### Measurement Accuracy
- **MeasureOverlay**: Automatically detects padding/margin if the DOM structure is clean.
- **Container Sizing**: Ensure containers have explicit or correct computed heights (e.g., `h-9` for 36px) if `MeasureOverlay` reports incorrect values due to border/padding ambiguities.

### Interaction
- **Hover Priority**: Ensure labels don't block interaction with the component itself (use `pointer-events-none` on overlays if needed, but Labels usually need pointer events).
- **Dimming**: Implementing `isDimmed` logic improves focus when many labels exist.

## 5. Example Template

```tsx
const ButtonAnatomy = ({ onHoverChange, onColorHoverChange }) => {
  return (
    <div className="relative inline-flex">
      <button className="bg-primary text-primary-foreground h-10 px-4 rounded-md">
        Button
      </button>

      <ColorLabel
        color="bg-primary"
        label="Background"
        direction="top"
        length={24}
        onMouseEnter={() => onColorHoverChange('bg-primary', 'Button Background')}
        onMouseLeave={() => onColorHoverChange(null)}
        className="top-0 left-1/2 -translate-x-1/2 -translate-y-full"
      />
    </div>
  );
};
```
