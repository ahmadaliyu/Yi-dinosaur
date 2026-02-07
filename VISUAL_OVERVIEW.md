# 🎨 WALLET TRACKER - VISUAL OVERVIEW

## 🎯 Page Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVBAR                                │
│  [Yi Logo] [Nav Links...] [Connect Wallet] [Menu]            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   TRACKER SECTION                            │
│                                                              │
│  ⚡ Wallet Tracker & Analytics                              │
│  Track wallet performance, view trading history, discover   │
│                                                              │
│  [🔍 Tracker] [🏆 Leaderboard] [💎 Tokens]                  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  CONNECT WALLET CTA (if not connected)                │  │
│  │  [Connect Wallet] ×                                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─ WALLET TRACKER TAB ──────────────────────────────────┐  │
│  │                                                        │  │
│  │  Search Bar:                                          │  │
│  │  🔍 [Enter Solana wallet address...] [Track Wallet]  │  │
│  │                                                        │  │
│  │  Tracked Wallets:                                     │  │
│  │  [Wallet1 ×] [Wallet2 ×] [Wallet3 ×]                │  │
│  │                                                        │  │
│  │  Performance Grid:                                    │  │
│  │  ┌────────────────┐ ┌────────────────┐              │  │
│  │  │ Realized PnL   │ │ ROI            │              │  │
│  │  │ 💰$2,850.75    │ │ 📈145.6%       │              │  │
│  │  │ All time       │ │ Return on...   │              │  │
│  │  └────────────────┘ └────────────────┘              │  │
│  │  ┌────────────────┐ ┌────────────────┐              │  │
│  │  │ Win Rate       │ │ Total Trades   │              │  │
│  │  │ 🎯 62.3%       │ │ 📊 127         │              │  │
│  │  │ 79/127 wins    │ │ Last 30 days   │              │  │
│  │  └────────────────┘ └────────────────┘              │  │
│  │                                                        │  │
│  │  Timeframe Performance:                               │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐               │  │
│  │  │ 1d      │ │ 7d      │ │ 30d     │               │  │
│  │  │ +$250   │ │ +$1.2K  │ │ +$2.8K  │               │  │
│  │  │ 12.3%   │ │ 58.5%   │ │ 145.6%  │               │  │
│  │  └─────────┘ └─────────┘ └─────────┘               │  │
│  │                                                        │  │
│  │  Filters Section:                                     │  │
│  │  Timeframe: [1d] [7d] [30d]                         │  │
│  │  Type: [All] [Buys] [Sells]                         │  │
│  │  Sort: [PnL] [ROI] [Date]                           │  │
│  │                                                        │  │
│  │  Transaction History (100 rows):                     │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │ Type │ Token │ Amount │ Price │ PnL │ Time  │   │  │
│  │  ├──────────────────────────────────────────────┤   │  │
│  │  │ BUY  │ COPE  │ 5,000  │ 2.50  │ +50 │ 2m    │   │  │
│  │  │ SELL │ DUST  │ 1,000  │ 0.01  │ -12 │ 5m    │   │  │
│  │  │ BUY  │ RAY   │ 100    │ 8.50  │ +35 │ 10m   │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │  [Load More]                                         │  │
│  │                                                        │  │
│  │  Premium Banner:                                      │  │
│  │  👑 Unlock Premium Features                           │  │
│  │  Advanced alerts, live terminals, expanded board     │  │
│  │  [Upgrade Now]                                        │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─ LEADERBOARD TAB ─────────────────────────────────────┐  │
│  │                                                        │  │
│  │  Top Traders Leaderboard                              │  │
│  │  Timeframe: [24h] [7d] [30d]                         │  │
│  │                                                        │  │
│  │  👑 #1 J7wR...2xKp                                    │  │
│  │  ├─ PnL: $1.25M | ROI: 324% | Trades: 487            │  │
│  │  ├─ Win: 68.5% | Trend: ↑ UP                         │  │
│  │  └─ [Track]                                           │  │
│  │                                                        │  │
│  │  🥈 #2 K9mQ...5pLx                                    │  │
│  │  ├─ PnL: $890K | ROI: 287% | Trades: 234            │  │
│  │  ├─ Win: 65.2% | Trend: ↑ UP                         │  │
│  │  └─ [Track]                                           │  │
│  │                                                        │  │
│  │  🥉 #3 L4nP...8rQy                                    │  │
│  │  ├─ PnL: $654K | ROI: 245% | Trades: 156            │  │
│  │  ├─ Win: 62.1% | Trend: ↓ DOWN                       │  │
│  │  └─ [Track]                                           │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─ TRENDING TOKENS TAB ─────────────────────────────────┐  │
│  │                                                        │  │
│  │  Trending Tokens                                      │  │
│  │                                                        │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │  │
│  │  │ 💵 USDC      │ │ 💳 USDT      │ │ 🥭 MNGO     │  │  │
│  │  │ Holders:    │ │ Holders:    │ │ Holders:    │  │  │
│  │  │ 125K        │ │ 98K         │ │ 45K         │  │  │
│  │  │ Volume: $45M│ │ Volume: $38M│ │ Volume: $12M│  │  │
│  │  │ +0.02%      │ │ +0.01%      │ │ +5.2%       │  │  │
│  │  │ [View Token]│ │ [View Token]│ │ [View Token]│  │  │
│  │  └──────────────┘ └──────────────┘ └──────────────┘  │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        FOOTER                                │
│  [Links] © 2026 Yi Dinosaur Solana                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 COLOR & STYLE GUIDE

### Colors
```
Background:      #0a0e27 (Dark Navy)
Primary Text:    #ffffff (White)
Secondary Text:  #a0aec0 (Gray)
Accent Primary:  #00ff88 (Bright Green) - Positive
Accent Secondary:#00d4ff (Cyan) - Neutral
Accent Danger:   #ff6b6b (Red) - Negative
Warning:         #ffd700 (Gold) - Premium
```

### Typography
```
Headers (h1, h2): 'Orbitron' or sans-serif, 600-700 weight
Body Text:        sans-serif, 400 weight
Monospace (Addresses, Numbers): 'Space Mono'
```

### Spacing
```
Small:  8px / 4px
Medium: 16px / 12px
Large:  24px / 20px
XL:     40px / 32px
```

### Borders
```
Light Border:     1px solid rgba(255, 255, 255, 0.08)
Hover Border:     1px solid rgba(255, 255, 255, 0.15)
Active Border:    1px solid #00d4ff (Cyan)
```

---

## 📱 RESPONSIVE DESIGNS

### DESKTOP (1024px+)
```
Full 4-column grids for performance cards
Side-by-side layouts for controls
Horizontal scrolling for tables
Multi-column leaderboard
```

### TABLET (768px-1023px)
```
2-column grids for performance cards
Stacked controls with flex wrap
Scrollable tables with limited columns
Single column leaderboard
```

### MOBILE (<768px)
```
1-column stacked layout
Full-width cards
Vertical scrolling only
Touch-friendly button sizes (44px minimum)
Collapsible sections
```

---

## 🎬 ANIMATIONS & TRANSITIONS

### Page Load
```
Fade In + Slide Up
Duration: 0.6s
Easing: ease-out
```

### Tab Switch
```
Fade Out Current + Fade In New
Duration: 0.3s
```

### Button Hover
```
Transform: translateY(-2px)
Duration: 0.3s
Shadow: 0 8px 25px rgba(0, 212, 255, 0.3)
```

### Card Hover
```
Transform: translateY(-5px)
Duration: 0.3s
Background: rgba(255, 255, 255, 0.02)
```

### Loading State
```
Spinning rotation
Duration: 1s (infinite)
```

---

## 🔘 INTERACTIVE ELEMENTS

### Buttons
```
Primary: Cyan gradient background
Secondary: Transparent with border
Danger: Red background
Success: Green background
Large: 16px padding
Small: 8px padding
```

### Input Fields
```
Background: rgba(255, 255, 255, 0.03)
Border: 1px solid rgba(255, 255, 255, 0.1)
Focus: Border becomes Cyan, bg increases opacity
```

### Tabs
```
Inactive: Transparent with gray text
Active: Cyan background with dark text
Hover: Background increases opacity
```

### Cards
```
Background: rgba(255, 255, 255, 0.02)
Border: 1px solid rgba(255, 255, 255, 0.08)
Hover: Background & border opacity increase
```

---

## 📊 DATA VISUALIZATION

### Color Coding
```
✅ GREEN    → BUY, PROFIT, GAIN, UP TREND
❌ RED      → SELL, LOSS, NEGATIVE, DOWN TREND
🔵 CYAN     → NEUTRAL, LINKS, SECONDARY
⚪ GRAY     → INACTIVE, SECONDARY TEXT
🟡 GOLD     → PREMIUM, SPECIAL
```

### Icons Used
```
Icons from lucide-react:
• Search - magnifying glass
• Wallet - wallet shape
• TrendingUp/Down - trend arrows
• Activity - activity chart
• Award - trophy for leaderboard
• Star - bookmark/favorite
• Crown - premium/rank 1
• Zap - lightning/speed
```

---

## 🎯 STATE FLOWS

### Wallet Search
```
IDLE → LOADING → SUCCESS → DISPLAY DATA
         ↓
      ERROR → SHOW TOAST → CLEAR
```

### Tab Navigation
```
TRACKER → [Click Leaderboard] → LEADERBOARD
   ↓                              ↓
ANIMATE OUT                  ANIMATE IN
```

### Filter Application
```
SELECT FILTER → COMPUTE FILTERED DATA → UPDATE DISPLAY
    ↑                                         ↓
    └─────── <1ms calculation ───────────────┘
```

---

## 🔐 Accessibility Features

```
✅ Keyboard Navigation
✅ Focus Indicators
✅ Color Contrast Ratios
✅ Semantic HTML
✅ ARIA Labels Ready
✅ Touch Targets (44px min)
✅ Screen Reader Friendly
```

---

## 📈 Performance Targets

```
First Contentful Paint: < 2s
Time to Interactive:   < 3s
Largest Contentful Paint: < 3s
Cumulative Layout Shift: < 0.1
Filter Operations: < 1ms
Tab Switching: < 300ms (with animation)
```

---

## 🎓 Component Hierarchy

```
WalletTracker (Main)
├── Header Section
│   ├── Title
│   └── Subtitle
├── Tab Navigation
│   ├── Tracker Button
│   ├── Leaderboard Button
│   └── Tokens Button
├── Content Area (Animated Tabs)
│   ├── Tracker Tab
│   │   ├── Connect CTA
│   │   ├── Search Form
│   │   ├── Tracked Wallets
│   │   ├── Performance Grid
│   │   ├── Timeframe Cards
│   │   ├── Filter Controls
│   │   ├── Transaction Table
│   │   └── Premium Banner
│   ├── Leaderboard Tab
│   │   ├── Header with Timeframe
│   │   └── Trader Cards (x3)
│   └── Tokens Tab
│       └── Token Cards Grid
└── Footer
```

---

## 🖼️ Visual Hierarchy

```
Level 1 (Highest): Page Title "Wallet Tracker & Analytics"
Level 2: Tab Navigation & Main Section Headers
Level 3: Performance Cards & Metrics
Level 4: Filter Controls & Action Buttons
Level 5: Transaction Details & Table Data
Level 6: Secondary Text & Hints
```

---

## 🎨 Dark Mode Considerations

Current implementation is **dark-first**:
- All backgrounds are dark navy (#0a0e27)
- Text is light (white/gray)
- Accents are bright (green, cyan)
- Ready for light mode toggle with CSS variables

---

**This visual guide can be used during:**
- Design reviews
- Development handoffs
- UI/UX improvements
- Mobile responsiveness testing
- Accessibility audits

---

**Print Friendly: Yes ✅**  
**Mobile Friendly: Yes ✅**  
**Last Updated: February 7, 2026**
