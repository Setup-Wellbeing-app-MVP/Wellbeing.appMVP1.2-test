# PWA Component Library

A comprehensive library of **50+ reusable, production-ready PWA components** built with React, TypeScript, and your design system tokens.

## 📁 Component Organization

All components are stored in `/components/library/` and are **fully reusable** across your entire application. Each component uses design system tokens from `/styles/globals.css` for consistent styling.

## ⚡ Quick Import Reference

**ALL components must be imported from `/components/library/` ONLY:**

```tsx
import { 
  Button, 
  Input, 
  Card, 
  Dialog,
  // ... any component 
} from './components/library';
```

**❌ NEVER import from `/components/ui/`** - This is deprecated.

## 📋 Complete Component List

### Navigation (3)
- `BottomNav` - Mobile bottom navigation bar
- `TopBar` + `IconButton` - App header with actions
- `Tabs` + `TabPanel` - Tab navigation

### Actions (4)
- `Button` - Primary button with multiple variants
- `FloatingActionButton` - FAB with extended support
- `BottomSheet` + `BottomSheetActions` - Mobile action sheet
- `Modal` - Centered modal dialog

### Forms & Inputs (12)
- `Form`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `FormField` - Form components with validation
- `Input` - Text input field
- `Textarea` - Multiline text input
- `Label` - Form label
- `Checkbox` - Checkbox input
- `RadioGroup` + `RadioGroupItem` - Radio button group
- `Select` + subcomponents - Dropdown select
- `Slider` - Range slider
- `Toggle` - Toggle button
- `SearchBar` - Search input with icon
- `Switch` - Toggle switch
- `Chip` - Tag/filter chip

### Lists & Tables (5)
- `ListItem` + `Avatar` + `ListSection` - List components
- `Table` + subcomponents - Data tables
- `Accordion` + subcomponents - Collapsible content

### Feedback (7)
- `LoadingSpinner` + `LoadingOverlay` - Loading indicators
- `Skeleton` + variants - Content placeholders
- `ProgressBar` + `CircularProgress` - Progress indicators
- `Toast` - Notifications
- `EmptyState` - Empty screen placeholder
- `Alert` + `AlertTitle` + `AlertDescription` - Inline alerts
- `AlertDialog` + subcomponents - Confirmation dialogs

### Layout (7)
- `Card` + `CardHeader` + `CardContent` + `CardFooter` - Content container
- `Badge` + `NotificationBadge` - Status indicators
- `Divider` - Visual separator
- `Separator` - Section separator
- `ScrollArea` + `ScrollBar` - Scrollable container
- `Collapsible` + subcomponents - Collapsible panel

### Dialogs & Overlays (4)
- `Dialog` + subcomponents - Modal dialog
- `DropdownMenu` + subcomponents - Dropdown menus
- `Popover` + subcomponents - Popover overlays
- `Tooltip` + subcomponents - Tooltip overlays

## 🧩 Component Documentation

### Navigation Components

#### `BottomNav`
Mobile-first bottom navigation bar with badge support.

```tsx
import { BottomNav } from './components/library/BottomNav';

<BottomNav
  items={[
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon />,
      badge: 5, // Optional notification badge
    },
  ]}
  activeId="home"
  onItemClick={(id) => console.log(id)}
/>
```

#### `TopBar` + `IconButton`
Sticky header with left/right actions.

```tsx
import { TopBar, IconButton } from './components/library/TopBar';

<TopBar
  title="Page Title"
  subtitle="Optional subtitle"
  leftAction={<IconButton icon={<MenuIcon />} onClick={() => {}} ariaLabel="Menu" />}
  rightActions={[
    <IconButton icon={<SearchIcon />} onClick={() => {}} ariaLabel="Search" />,
  ]}
/>
```

#### `Tabs`
Tab navigation with badge support and two variants.

```tsx
import { Tabs } from './components/library/Tabs';

<Tabs
  tabs={[
    { id: 'all', label: 'All', badge: 12 },
    { id: 'active', label: 'Active' },
  ]}
  activeTab="all"
  onChange={setActiveTab}
  variant="default" // or "pills"
/>
```

---

### Action Components

#### `FloatingActionButton`
Primary action button with multiple positions and variants.

```tsx
import { FloatingActionButton } from './components/library/FloatingActionButton';

<FloatingActionButton
  icon={<PlusIcon />}
  label="Create New" // Optional for extended FAB
  onClick={() => {}}
  variant="primary" // primary | secondary | success
  position="bottom-right" // bottom-right | bottom-center | bottom-left
  extended={true} // Shows label
/>
```

#### `BottomSheet` + `BottomSheetActions`
Mobile action sheet that slides up from bottom.

```tsx
import { BottomSheet, BottomSheetActions } from './components/library/BottomSheet';

<BottomSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Choose an action"
  height="auto" // auto | half | full
>
  <BottomSheetActions
    actions={[
      { label: 'Share', icon: <ShareIcon />, onClick: () => {} },
      { label: 'Delete', icon: <TrashIcon />, onClick: () => {}, variant: 'destructive' },
    ]}
  />
</BottomSheet>
```

#### `Modal`
Centered modal dialog with backdrop.

```tsx
import { Modal } from './components/library/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md" // sm | md | lg
  footer={<div>Footer content</div>}
>
  <p>Modal content</p>
</Modal>
```

---

### List Components

#### `ListItem` + `Avatar` + `ListSection`
Flexible list items with support for icons, avatars, and sections.

```tsx
import { ListItem, Avatar, ListSection } from './components/library/ListItem';

<ListSection title="Recent">
  <ListItem
    title="Item Title"
    subtitle="Optional subtitle"
    leftContent={<Avatar fallback="JD" alt="John Doe" />}
    rightContent={<Badge>5</Badge>}
    onClick={() => {}}
    divider={true}
  />
</ListSection>
```

---

### Feedback Components

#### `LoadingSpinner` + `LoadingOverlay`
Loading indicators in multiple sizes.

```tsx
import { LoadingSpinner, LoadingOverlay } from './components/library/LoadingSpinner';

<LoadingSpinner size="md" variant="primary" />
<LoadingOverlay message="Loading..." />
```

#### `Skeleton` + Variants
Content placeholders while loading.

```tsx
import { Skeleton, SkeletonListItem, SkeletonCard } from './components/library/Skeleton';

<Skeleton width="200px" height="20px" />
<SkeletonListItem />
<SkeletonCard />
```

#### `ProgressBar` + `CircularProgress`
Progress indicators with multiple variants.

```tsx
import { ProgressBar, CircularProgress } from './components/library/ProgressBar';

<ProgressBar value={65} max={100} variant="primary" label="Upload Progress" showValue />
<CircularProgress value={75} size={64} variant="success" />
```

#### `Toast`
Temporary notification messages.

```tsx
import { Toast } from './components/library/Toast';

<Toast
  message="Action completed!"
  variant="success" // default | success | warning | error
  duration={3000}
  onClose={() => {}}
/>
```

#### `EmptyState`
Placeholder for empty lists or screens.

```tsx
import { EmptyState } from './components/library/EmptyState';

<EmptyState
  icon={<InboxIcon />}
  title="No items found"
  description="Get started by creating your first item."
  action={{ label: 'Create Item', onClick: () => {} }}
/>
```

---

### Input Components

#### `SearchBar`
Search input with clear button.

```tsx
import { SearchBar } from './components/library/SearchBar';

<SearchBar
  value={searchValue}
  onChange={setSearchValue}
  placeholder="Search..."
  autoFocus={false}
/>
```

#### `Switch`
Toggle switch for settings.

```tsx
import { Switch } from './components/library/Switch';

<Switch
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
  disabled={false}
/>
```

#### `Chip`
Tags and removable pills.

```tsx
import { Chip } from './components/library/Chip';

<Chip
  label="React"
  variant="primary" // default | primary | success | warning | error
  icon={<TagIcon />}
  onClick={() => {}} // Makes chip clickable
  onRemove={() => {}} // Adds remove button
/>
```

#### `Divider`
Visual separator with optional label.

```tsx
import { Divider } from './components/library/Divider';

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" spacing="md" />
```

---

### Layout Components

#### `Card` + Subcomponents
Flexible card container with header, content, and footer sections.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from './components/library/Card';

<Card variant="default" padding="md">
  <CardHeader
    title="Card Title"
    subtitle="Optional subtitle"
    action={<button>Action</button>}
  />
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter align="right">
    <button>Cancel</button>
    <button>Save</button>
  </CardFooter>
</Card>

// Clickable card
<Card onClick={() => {}} variant="elevated">
  <h3>Clickable Card</h3>
</Card>
```

**Variants:**
- `default` - White background with border
- `elevated` - White background with shadow (no border)
- `outlined` - Transparent background with thicker border

#### `Badge` + `NotificationBadge`
Status indicators and notification counters.

```tsx
import { Badge, NotificationBadge } from './components/library/Badge';

// Status badge
<Badge variant="success" size="md">Active</Badge>

// Dot badge
<Badge variant="primary" dot>Online</Badge>

// Notification badge (absolute positioned)
<div className="relative">
  <button>Notifications</button>
  <NotificationBadge count={5} variant="error" max={99} />
</div>
```

---

## 🎨 Design System Integration

All components use CSS custom properties from `/styles/globals.css`:

- **Colors**: `--primary`, `--secondary`, `--success`, `--warning`, `--destructive`, etc.
- **Spacing**: `--space-1` through `--space-96`
- **Border Radius**: `--radius-sm`, `--radius-md`, `--radius-lg`, etc.
- **Typography**: `--font-family-heading`, `--font-family-body`, `--font-family-label`
- **Elevations**: `--elevation-sm`, `--elevation-md`, `--elevation-lg`, `--elevation-xl`

### Why This Matters
When you update tokens in `/styles/globals.css`, **all components automatically update** across your entire app. No need to manually change component code!

---

## 📱 PWA-Specific Features

### Mobile-First Design
- **Touch targets**: All interactive elements are minimum 44×44px
- **No hover-only**: All interactions work on touch devices
- **Responsive**: Components adapt to different screen sizes

### Accessibility
- **Focus states**: Keyboard navigation support
- **ARIA labels**: Screen reader friendly
- **Semantic HTML**: Proper button/link/heading usage

### Performance
- **CSS custom properties**: Fast runtime styling
- **No inline styles**: Better performance and CSP compliance
- **Minimal dependencies**: Lightweight bundle size

---

## 🚀 Usage Examples

### Building a Mobile Screen

```tsx
// Clean imports from index
import {
  TopBar,
  IconButton,
  ListItem,
  Avatar,
  BottomNav,
  FloatingActionButton,
} from './components/library';

export default function MobileScreen() {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <TopBar
        title="My App"
        leftAction={<IconButton icon={<MenuIcon />} onClick={() => {}} ariaLabel="Menu" />}
      />

      {/* Content */}
      <div className="p-4 space-y-2">
        <ListItem title="Item 1" leftContent={<Avatar fallback="A" />} onClick={() => {}} />
        <ListItem title="Item 2" leftContent={<Avatar fallback="B" />} onClick={() => {}} />
      </div>

      {/* FAB */}
      <FloatingActionButton icon={<PlusIcon />} onClick={() => {}} />

      {/* Bottom Navigation */}
      <BottomNav
        items={[
          { id: 'home', label: 'Home', icon: <HomeIcon /> },
          { id: 'profile', label: 'Profile', icon: <UserIcon /> },
        ]}
        activeId="home"
        onItemClick={() => {}}
      />
    </div>
  );
}
```

---

## ✅ Component Checklist

All components follow these standards:

- ✅ Uses design system tokens (no hardcoded colors/spacing)
- ✅ 44×44px minimum touch targets
- ✅ Responsive design (mobile-first)
- ✅ TypeScript typed props
- ✅ Accessibility features (ARIA, keyboard nav)
- ✅ No hover-only interactions
- ✅ Reusable across entire app

---

## 📝 Adding New Components

When creating new components:

1. **Create in `/components/library/ComponentName.tsx`**
2. **Use design system tokens** (never hardcode colors/spacing)
3. **Export interfaces** for TypeScript support
4. **Follow PWA guidelines** (touch targets, responsive, accessible)
5. **Add to this README** with usage example
6. **Import in showcase** at `/pages/ComponentShowcase.tsx`

---

## 🔗 Related Files

- `/styles/globals.css` - Design system tokens
- `/pages/ComponentShowcase.tsx` - Live component demos
- `/guidelines/Design System Rules.md` - Design system documentation
- `/guidelines/Guidelines.md` - Project guidelines
