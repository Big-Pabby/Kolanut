# User Store & Toast Usage

## User Store (Zustand)

The user store persists user data in localStorage and provides a reactive way to access user information throughout the app.

### Usage

```typescript
import { useUserStore } from "@/lib/store/user-store";

// In a component
function MyComponent() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  // Access user data
  if (user) {
    console.log(user.full_name);
    console.log(user.email);
    console.log(user.role);
  }

  // Clear user (logout)
  const handleLogout = () => {
    clearUser();
  };
}
```

### Available Methods

- `user`: The current user data (null if not logged in)
- `setUser(user)`: Set the user data
- `clearUser()`: Clear the user data (used for logout)

## Toast Notifications

The toast utility provides consistent notification messages throughout the app.

### Usage

```typescript
import { toast } from "@/lib/utils/toast";

// Success toast
toast.success("Operation successful", {
  description: "Your changes have been saved.",
});

// Error toast
toast.error("Operation failed", {
  description: "Please try again later.",
});

// Info toast
toast.info("Information", {
  description: "Here's some useful information.",
});

// Warning toast
toast.warning("Warning", {
  description: "Please review before proceeding.",
});

// Loading toast
const toastId = toast.loading("Processing...");
// Later, dismiss it or replace with success/error

// Promise toast (shows loading, then success/error)
toast.promise(
  fetchData(),
  {
    loading: "Loading data...",
    success: "Data loaded successfully!",
    error: "Failed to load data",
  }
);
```

### Available Methods

- `toast.success(message, options?)`: Show success notification
- `toast.error(message, options?)`: Show error notification
- `toast.info(message, options?)`: Show info notification
- `toast.warning(message, options?)`: Show warning notification
- `toast.loading(message)`: Show loading notification
- `toast.promise(promise, options)`: Show promise-based notification

