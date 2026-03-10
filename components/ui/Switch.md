# Switch Component

A toggle control component with smooth animations, proper states, and full accessibility support.

## Features

- ✅ Smooth toggle animation (200ms with ease-out timing)
- ✅ Three states: checked, unchecked, and disabled
- ✅ Full keyboard navigation (Space/Enter to toggle)
- ✅ Proper ARIA attributes for screen readers
- ✅ Focus indicators for keyboard users
- ✅ Optional label support
- ✅ Uses design tokens for consistent theming
- ✅ Dark mode compatible

## Usage

### Basic Usage

```tsx
import Switch from "@/components/ui/Switch";

function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
    />
  );
}
```

### With Label

```tsx
<Switch
  checked={notifications}
  onChange={setNotifications}
  label="Enable notifications"
/>
```

### Disabled State

```tsx
<Switch
  checked={true}
  disabled
  label="This setting is locked"
/>
```

### Custom ID

```tsx
<Switch
  id="my-custom-switch"
  checked={value}
  onChange={setValue}
  label="Custom switch"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the switch is in the checked state |
| `onChange` | `(checked: boolean) => void` | - | Callback fired when the switch state changes |
| `disabled` | `boolean` | `false` | Whether the switch is disabled |
| `label` | `string` | - | Optional label text displayed next to the switch |
| `id` | `string` | auto-generated | Custom ID for the switch element |
| `className` | `string` | `""` | Additional CSS classes for the wrapper div |

## Accessibility

The Switch component follows WAI-ARIA best practices:

- Uses `role="switch"` for proper semantic meaning
- Implements `aria-checked` to communicate state
- Uses `aria-labelledby` to associate with label
- Supports keyboard navigation:
  - **Space**: Toggle the switch
  - **Enter**: Toggle the switch
  - **Tab**: Focus the switch
- Provides visible focus indicators
- Properly communicates disabled state

## Examples

### Settings Panel

```tsx
function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Push Notifications</p>
          <p className="text-sm text-muted">Receive push notifications</p>
        </div>
        <Switch
          checked={settings.notifications}
          onChange={(checked) => 
            setSettings(s => ({ ...s, notifications: checked }))
          }
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Dark Mode</p>
          <p className="text-sm text-muted">Use dark theme</p>
        </div>
        <Switch
          checked={settings.darkMode}
          onChange={(checked) => 
            setSettings(s => ({ ...s, darkMode: checked }))
          }
        />
      </div>
    </div>
  );
}
```

### Form Integration

```tsx
function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save preferences
  };

  return (
    <form onSubmit={handleSubmit}>
      <Switch
        checked={preferences.emailNotifications}
        onChange={(checked) => 
          setPreferences(p => ({ ...p, emailNotifications: checked }))
        }
        label="Email Notifications"
      />
      
      <Switch
        checked={preferences.smsNotifications}
        onChange={(checked) => 
          setPreferences(p => ({ ...p, smsNotifications: checked }))
        }
        label="SMS Notifications"
      />
      
      <Switch
        checked={preferences.marketingEmails}
        onChange={(checked) => 
          setPreferences(p => ({ ...p, marketingEmails: checked }))
        }
        label="Marketing Emails"
      />
      
      <button type="submit">Save Preferences</button>
    </form>
  );
}
```

## Design Tokens Used

The Switch component uses the following design tokens from `app/globals.css`:

- `--color-primary-500` - Checked state background
- `--color-primary-600` - Checked state hover
- `--color-neutral-300` - Unchecked state background
- `--color-neutral-400` - Unchecked state hover
- `--foreground` - Label text color
- Focus ring uses primary color with 40% opacity

## Demo

Visit `/switch-demo` to see all variations and states of the Switch component in action.

## Integration

The Switch component is already integrated into:

- **Dashboard Settings** (`app/dashboard/settings/page.tsx`) - Notification preferences

## Related Components

- **Checkbox** - For multi-select options
- **Radio** - For single-select from multiple options
- **Button** - For action triggers
