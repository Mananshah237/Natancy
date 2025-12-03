# Natancy's Birthday Microsite - Interaction Design

## Core Interactive Components

### 1. 3D Birthday Cake with Blow Detection
**Location**: Main page center stage
**Interaction Flow**:
- 3D cake rises from bottom with smooth animation
- Candle flame flickers with realistic physics using Three.js
- Floating petals drift around the cake
- Instructional text: "Natancy, make a wish… blow to begin."
- Microphone input detection for blowing action
- Fallback tap/click interaction for devices without microphone
- Candle extinguishes with particle effect on successful blow
- Smooth transition to letter reveal

**Technical Implementation**:
- Three.js for 3D cake rendering
- Web Audio API for microphone input
- Particle system for candle flame and extinguishing effect
- Physics simulation for floating petals

### 2. Letter Reveal Animation
**Location**: Letter page center
**Interaction Flow**:
- Elegant card appears with floral corner decorations
- Letter text reveals line-by-line with subtle fade-in animations
- Each line has staggered timing for dramatic effect
- Soft glow effects on text appearance
- No user interaction required - automatic reveal sequence
- Continuous petal falling in background

**Technical Implementation**:
- CSS animations with JavaScript timing control
- Intersection Observer for scroll-triggered reveals
- Gradient text effects for romantic styling

### 3. Ambient Particle System
**Location**: Throughout both pages
**Interaction Flow**:
- Daisy and jasmine petals float continuously
- Gentle physics with wind simulation
- Particles respond to mouse movement subtly
- Different layers for depth effect
- Never obstruct main content

**Technical Implementation**:
- Canvas-based particle system
- Matter.js for physics simulation
- Mouse tracking for interactive response

## User Journey

1. **Entry**: Dark screen with Natancy's name glowing, soft particles
2. **Cake Moment**: Interactive 3D cake with blow-to-continue mechanic
3. **Transition**: Smooth fade with chime sound effect
4. **Letter**: Romantic letter unfolds line by line
5. **Ending**: Final candle reappears with closing message

## Accessibility Considerations

- Microphone permission request with clear instructions
- Alternative tap interaction for blow detection
- Keyboard navigation support
- Screen reader friendly text alternatives
- Mobile responsive design

## Performance Optimization

- Lazy loading for 3D components
- Efficient particle pooling
- Optimized animations for 60fps
- Progressive enhancement for older devices