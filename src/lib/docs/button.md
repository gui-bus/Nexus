### Button
A button is an interactive UI element used to trigger actions such as navigation, form submissions, or contextual commands.

**Import Path**:
```typescript
import { Button } from "@/components/ui/button/button";
```

#### Default
A standard button component displaying a neutral primary action state.

```tsx
<Button>Default Button</Button>
```

#### Variants
Defines the visual appearance of buttons through the 'variant' prop.

```tsx
<div className="flex flex-wrap gap-4">
  <Button variant="default">Default</Button>
  <Button variant="bordered">Bordered</Button>
  <Button variant="flat">Flat</Button>
  <Button variant="light">Light</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="shadow">Shadow</Button>
  <Button variant="link">Link</Button>
</div>
```

#### Colors
Defines the button color scheme through the 'color' prop. Each color is shown across all seven variants for a complete reference.

```tsx
<Button color="primary" variant="default">Default</Button>
<Button color="primary" variant="bordered">Bordered</Button>
<Button color="primary" variant="flat">Flat</Button>
<Button color="primary" variant="light">Light</Button>
<Button color="primary" variant="ghost">Ghost</Button>
<Button color="primary" variant="shadow">Shadow</Button>
<Button color="primary" variant="link">Link</Button>
```

#### Sizes
Adjusts the visual scale of buttons through the 'size' prop.

```tsx
<div className="flex flex-wrap items-center gap-3">
  <Button size="xs">xs</Button>
  <Button size="sm">sm</Button>
  <Button size="md">md</Button>
  <Button size="lg">lg</Button>
  <Button size="xl">xl</Button>
  <Button size="2xl">2xl</Button>
  <Button size="3xl">3xl</Button>
</div>
```

#### Radius
Adjusts the border radius of buttons through the 'radius' prop.

```tsx
<div className="flex flex-wrap items-center gap-3">
  <Button radius="none">none</Button>
  <Button radius="sm">sm</Button>
  <Button radius="md">md</Button>
  <Button radius="lg">lg</Button>
  <Button radius="xl">xl</Button>
  <Button radius="full">Full</Button>
</div>
```

#### Hovers
Controls micro-interaction motion on user hover using the 'hover' prop ('scale' or 'lift').

```tsx
<div className="flex items-center gap-4">
  <Button hover="scale">Scale Hover</Button>
  <Button hover="lift">Lift Hover</Button>
</div>
```

#### Icons
Adds icons to the button at the start or end position to enhance visual recognition.

```tsx
<Button
  color="primary"
  startContent={<Icon icon="hugeicons:home-03" className="size-5" />}
>
  Home
</Button>
```

#### Icon Only
Displays a compact button with only an icon. Mandatory 'ariaLabel' ensures full accessibility.

```tsx
<Button
  isIconOnly
  color="primary"
  ariaLabel="Settings"
  startContent={<Icon icon="hugeicons:settings-01" className="size-5" />}
/>
```

#### Loading state
Displays an active loading spinner and disables user interaction during async processes.

```tsx
<Button isLoading color="primary">Loading...</Button>
```

#### Full Width
Expands the button to span 100% of its parent container width.

```tsx
<Button isFullWidth color="primary">
  Full Width Action
</Button>
```

#### Disable Ripple
Set 'disableRipple' to remove the click ripple effect. Useful for icon-only buttons or when integrating with custom interaction feedback.

```tsx
<Button color="primary">With Ripple</Button>
<Button color="primary" disableRipple>No Ripple</Button>
```

#### Copy Button
A specialized button type configured by passing the 'isCopy' prop. When clicked, it copies the string text (either from its 'copyText' property or directly from its text children) and transitions to showing a smooth animated checkmark and a 'Copied' state.

```tsx
<Button isCopy copyText="npm install bloom-ui">
  Copy command
</Button>
<Button isCopy variant="flat" color="primary" copyText="Hello from Bloom UI!">
  Copy Greeting
</Button>
```

#### Disabled State
Disables the button, preventing interaction and applying muted opacity styling.

```tsx
<Button isDisabled color="primary">Disabled Primary</Button>
```

#### Props — Button
Core properties for configuring the Button component.

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | 'default' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow' | 'link' | 'default' | Visual style variant of the button. |
| color | 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'default' | Color theme of the button. |
| size | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'md' | Controls size scale and density. |
| radius | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'xl' | Border radius scale. |
| hover | 'scale' | 'lift' | 'scale' | Micro-animation hover behavior. |
| isIconOnly | boolean | false | Compact icon-only button mode. Requires 'ariaLabel'. |
| isLoading | boolean | false | Shows loading spinner and disables interactions. |
| isDisabled | boolean | false | Disables user interaction. |
| disableRipple | boolean | false | Disables click ripple effect. |
| isCopy | boolean | false | Enables copying functionality and animation. |
| copyText | string | — | The specific text to be copied to the clipboard. Defaults to children. |

