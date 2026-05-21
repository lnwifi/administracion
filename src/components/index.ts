/**
 * Centralized exports for all UI components
 * Import from '@/components' for cleaner imports
 */

// UI Components
export { Button } from './ui/button';
export { Input } from './ui/input';
export { Label } from './ui/label';
export { Textarea } from './ui/textarea';
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
export { Switch } from './ui/switch';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
export { Badge, badgeVariants } from './ui/badge';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './ui/select';
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './ui/collapsible';

// New components
export { EmptyState, EmptyStates } from './ui/empty-state';
export {
  LoadingState,
  CardSkeleton,
  TableSkeleton,
  StatsCardSkeleton,
} from './ui/loading-state';

// Specialized components
export { ImageUpload } from './ImageUpload';
export { default as EnvironmentConfig } from './EnvironmentConfig';

// Layout components
export { Layout } from './layout/Layout';
export { Sidebar } from './layout/Sidebar';

// Auth components
export { ProtectedRoute } from './auth/ProtectedRoute';
