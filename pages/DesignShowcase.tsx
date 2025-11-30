import { useState, useEffect, useCallback } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  Button,
  Input,
  Label,
  Textarea,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  Slider,
  SearchBar,
  Chip,
  Toggle,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  ListItem,
  Avatar,
  ListSection,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  ProgressBar,
  CircularProgress,
  LoadingSpinner,
  LoadingOverlay,
  Skeleton,
  SkeletonListItem,
  SkeletonCard,
  Toast,
  EmptyState,
  Divider,
  Separator,
  NotificationBadge,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Tabs,
  TabPanel,
  TopBar,
  BottomNav,
  FloatingActionButton,
  Modal,
  BottomSheet,
  ScrollArea,
  ScrollBar,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '../components/library';
import { 
  HeartIcon, 
  StarIcon, 
  BellIcon, 
  UserIcon, 
  MailIcon,
  CheckIcon,
  AlertCircleIcon,
  InfoIcon,
  XCircleIcon,
  HomeIcon,
  SearchIcon,
  PlusIcon,
  InboxIcon,
  SettingsIcon,
  TrashIcon,
  Trash2Icon,
  EditIcon,
  DownloadIcon,
  ChevronDownIcon,
  MoreVerticalIcon,
  HelpCircleIcon,
  LogOutIcon,
  CopyIcon,
  ShareIcon,
  FileIcon,
  FolderIcon,
  ImageIcon,
  ChevronRightIcon,
  MenuIcon,
} from 'lucide-react';

// Comprehensive hex values for all 29 color palettes
const colorHexValues = {
  primary: { 50: '#EBF1FF', 100: '#D6E3FF', 200: '#B3CCFF', 300: '#80AAFF', 400: '#4D7FFF', 500: '#003CFF', 600: '#0030CC', 700: '#002499', 800: '#001866', 900: '#000F3D', 950: '#000820' },
  gray: { 50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DC', 400: '#99A1AF', 500: '#6A7282', 600: '#4A5565', 700: '#364153', 800: '#1E2939', 900: '#101828', 950: '#030712' },
  success: { 50: '#F0FDF4', 100: '#DCFCE7', 200: '#B9F8CF', 300: '#7BF1A8', 400: '#05DF72', 500: '#00C950', 600: '#00A63E', 700: '#008236', 800: '#016630', 900: '#0D542B', 950: '#032E15' },
  warning: { 50: '#FFFBEB', 100: '#FEF3C6', 200: '#FEE685', 300: '#FFD230', 400: '#FFB900', 500: '#FE9A00', 600: '#E17100', 700: '#BB4D00', 800: '#973C00', 900: '#7B3306', 950: '#461901' },
  error: { 50: '#FEF2F2', 100: '#FFE2E2', 200: '#FFC9C9', 300: '#FFA2A2', 400: '#FF6467', 500: '#FB2C36', 600: '#E7000B', 700: '#C10007', 800: '#9F0712', 900: '#82181A', 950: '#460809' },
  info: { 50: '#FAF5FF', 100: '#F3E8FF', 200: '#E9D4FF', 300: '#DAB2FF', 400: '#C27AFF', 500: '#AD46FF', 600: '#9810FA', 700: '#8200DB', 800: '#6E11B0', 900: '#59168B', 950: '#3C0366' },
  red: { 50: '#FEF2F2', 100: '#FFE2E2', 200: '#FFC9C9', 300: '#FFA2A2', 400: '#FF6467', 500: '#FB2C36', 600: '#E7000B', 700: '#C10007', 800: '#9F0712', 900: '#82181A', 950: '#460809' },
  orange: { 50: '#FFF7ED', 100: '#FFEDD4', 200: '#FFD6A8', 300: '#FFB86A', 400: '#FF8904', 500: '#FF6900', 600: '#F54900', 700: '#CA3500', 800: '#9F2D00', 900: '#7E2A0C', 950: '#441306' },
  amber: { 50: '#FFFBEB', 100: '#FEF3C6', 200: '#FEE685', 300: '#FFD230', 400: '#FFB900', 500: '#FE9A00', 600: '#E17100', 700: '#BB4D00', 800: '#973C00', 900: '#7B3306', 950: '#461901' },
  yellow: { 50: '#FEFCE8', 100: '#FEF9C2', 200: '#FFF085', 300: '#FFDF20', 400: '#FDC700', 500: '#F0B100', 600: '#D08700', 700: '#A65F00', 800: '#894B00', 900: '#733E0A', 950: '#432004' },
  lime: { 50: '#F7FEE7', 100: '#ECFCCA', 200: '#D8F999', 300: '#BBF451', 400: '#9AE600', 500: '#7CCF00', 600: '#5EA500', 700: '#497D00', 800: '#3C6300', 900: '#35530E', 950: '#192E03' },
  green: { 50: '#F0FDF4', 100: '#DCFCE7', 200: '#B9F8CF', 300: '#7BF1A8', 400: '#05DF72', 500: '#00C950', 600: '#00A63E', 700: '#008236', 800: '#016630', 900: '#0D542B', 950: '#032E15' },
  emerald: { 50: '#ECFDF5', 100: '#D0FAE5', 200: '#A4F4CF', 300: '#5EE9B5', 400: '#00D492', 500: '#00BC7D', 600: '#009966', 700: '#007A55', 800: '#006045', 900: '#004F3B', 950: '#002C22' },
  teal: { 50: '#F0FDFA', 100: '#CBFBF1', 200: '#96F7E4', 300: '#46ECD5', 400: '#00D5BE', 500: '#00BBA7', 600: '#009689', 700: '#00786F', 800: '#005F5A', 900: '#0B4F4A', 950: '#022F2E' },
  cyan: { 50: '#ECFEFF', 100: '#CEFAFE', 200: '#A2F4FD', 300: '#53EAFD', 400: '#00D3F3', 500: '#00B8DB', 600: '#0092B8', 700: '#007595', 800: '#005F78', 900: '#104E64', 950: '#053345' },
  sky: { 50: '#F0F9FF', 100: '#DFF2FE', 200: '#B8E6FE', 300: '#74D4FF', 400: '#00BCFF', 500: '#00A6F4', 600: '#0084D1', 700: '#0069A8', 800: '#00598A', 900: '#024A70', 950: '#052F4A' },
  blue: { 50: '#EFF6FF', 100: '#DBEAFE', 200: '#BEDBFF', 300: '#8EC5FF', 400: '#51A2FF', 500: '#2B7FFF', 600: '#155DFC', 700: '#1447E6', 800: '#193CB8', 900: '#1C398E', 950: '#162456' },
  indigo: { 50: '#EEF2FF', 100: '#E0E7FF', 200: '#C6D2FF', 300: '#A3B3FF', 400: '#7C86FF', 500: '#615FFF', 600: '#4F39F6', 700: '#432DD7', 800: '#372AAC', 900: '#312C85', 950: '#1E1A4D' },
  violet: { 50: '#F5F3FF', 100: '#EDE9FE', 200: '#DDD6FF', 300: '#C4B4FF', 400: '#A684FF', 500: '#8E51FF', 600: '#7F22FE', 700: '#7008E7', 800: '#5D0EC0', 900: '#4D179A', 950: '#2F0D68' },
  purple: { 50: '#FAF5FF', 100: '#F3E8FF', 200: '#E9D4FF', 300: '#DAB2FF', 400: '#C27AFF', 500: '#AD46FF', 600: '#9810FA', 700: '#8200DB', 800: '#6E11B0', 900: '#59168B', 950: '#3C0366' },
  fuchsia: { 50: '#FDF4FF', 100: '#FAE8FF', 200: '#F6CFFF', 300: '#F4A8FF', 400: '#ED6AFF', 500: '#E12AFB', 600: '#C800DE', 700: '#A800B7', 800: '#8A0194', 900: '#721378', 950: '#4B004F' },
  pink: { 50: '#FDF2F8', 100: '#FCE7F3', 200: '#FCCEE8', 300: '#FDA5D5', 400: '#FB64B6', 500: '#F6339A', 600: '#E60076', 700: '#C6005C', 800: '#A3004C', 900: '#861043', 950: '#510424' },
  rose: { 50: '#FFF1F2', 100: '#FFE4E6', 200: '#FFCCD3', 300: '#FFA1AD', 400: '#FF637E', 500: '#FF2056', 600: '#EC003F', 700: '#C70036', 800: '#A50036', 900: '#8B0836', 950: '#4D0218' },
  slate: { 50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CAD5E2', 400: '#90A1B9', 500: '#62748E', 600: '#45556C', 700: '#314158', 800: '#1D293D', 900: '#0F172B', 950: '#020618' },
  zinc: { 50: '#FAFAFA', 100: '#F4F4F5', 200: '#E4E4E7', 300: '#D4D4D8', 400: '#9F9FA9', 500: '#71717B', 600: '#52525C', 700: '#3F3F47', 800: '#27272A', 900: '#18181B', 950: '#09090B' },
  neutral: { 50: '#FAFAFA', 100: '#F5F5F5', 200: '#E5E5E5', 300: '#D4D4D4', 400: '#A1A1A1', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0A0A0A' },
  stone: { 50: '#FAFAF9', 100: '#F5F5F4', 200: '#E7E5E4', 300: '#D6D3D1', 400: '#A6A09B', 500: '#79716B', 600: '#57534D', 700: '#44403B', 800: '#292524', 900: '#1C1917', 950: '#0C0A09' },
  secondary: { 50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CAD5E2', 400: '#90A1B9', 500: '#62748E', 600: '#45556C', 700: '#314158', 800: '#1D293D', 900: '#0F172B', 950: '#020618' },
};

export default function DesignShowcase() {
  const [mainTab, setMainTab] = useState<'variables' | 'tokens' | 'foundation' | 'components' | 'patterns'>('variables');
  const [variablesTab, setVariablesTab] = useState('colors');
  const [tokensTab, setTokensTab] = useState('color-tokens');
  const [foundationTab, setFoundationTab] = useState('colors');
  const [componentsTab, setComponentsTab] = useState('navigation');
  const [patternsTab, setPatternsTab] = useState('forms');

  // Sample data for patterns
  const [searchValue, setSearchValue] = useState('');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [sliderValue, setSliderValue] = useState([50]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Asset management state
  const [icons, setIcons] = useState<{ name: string; signedUrl: string }[]>([]);
  const [illustrations, setIllustrations] = useState<{ name: string; signedUrl: string }[]>([]);
  const [logos, setLogos] = useState<{ name: string; signedUrl: string }[]>([]);
  const [loadingIcons, setLoadingIcons] = useState(false);
  const [loadingIllustrations, setLoadingIllustrations] = useState(false);
  const [loadingLogos, setLoadingLogos] = useState(false);
  const [assetsError, setAssetsError] = useState<string | null>(null);

  // Memoized fetch functions with abort controller support
  const fetchIcons = useCallback(async () => {
    const abortController = new AbortController();
    
    setLoadingIcons(true);
    setAssetsError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b9baeec9/assets/icons`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          signal: abortController.signal,
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch icons: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Icons response:', data);
      
      if (data.error) {
        setAssetsError(`Icons: ${data.error}`);
      }
      
      const validIcons = (data.files || []).filter((f: any) => f.signedUrl);
      console.log(`Loaded ${validIcons.length} icons out of ${data.files?.length || 0} total files`);
      setIcons(validIcons);
    } catch (error) {
      // Ignore abort errors - they're expected during cleanup
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Error fetching icons:', error);
      setAssetsError(`Icons error: ${String(error)}`);
    } finally {
      setLoadingIcons(false);
    }

    // Return cleanup function
    return () => abortController.abort();
  }, []);

  const fetchIllustrations = useCallback(async () => {
    const abortController = new AbortController();
    
    setLoadingIllustrations(true);
    setAssetsError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b9baeec9/assets/illustrations`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          signal: abortController.signal,
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch illustrations: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Illustrations response:', data);
      
      if (data.error) {
        setAssetsError(`Illustrations: ${data.error}`);
      }
      
      const validIllustrations = (data.files || []).filter((f: any) => f.signedUrl);
      console.log(`Loaded ${validIllustrations.length} illustrations out of ${data.files?.length || 0} total files`);
      setIllustrations(validIllustrations);
    } catch (error) {
      // Ignore abort errors - they're expected during cleanup
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Error fetching illustrations:', error);
      setAssetsError(`Illustrations error: ${String(error)}`);
    } finally {
      setLoadingIllustrations(false);
    }

    // Return cleanup function
    return () => abortController.abort();
  }, []);

  const fetchLogos = useCallback(async () => {
    const abortController = new AbortController();
    
    setLoadingLogos(true);
    setAssetsError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b9baeec9/assets/logos`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          signal: abortController.signal,
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch logos: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Logos response:', data);
      
      if (data.error) {
        setAssetsError(`Logos: ${data.error}`);
      }
      
      const validLogos = (data.files || []).filter((f: any) => f.signedUrl);
      console.log(`Loaded ${validLogos.length} logos out of ${data.files?.length || 0} total files`);
      setLogos(validLogos);
    } catch (error) {
      // Ignore abort errors - they're expected during cleanup
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Error fetching logos:', error);
      setAssetsError(`Logos error: ${String(error)}`);
    } finally {
      setLoadingLogos(false);
    }

    // Return cleanup function
    return () => abortController.abort();
  }, []);

  // Fetch assets when respective tabs are activated - with proper dependencies
  useEffect(() => {
    if (foundationTab === 'icons' && icons.length === 0 && !loadingIcons) {
      fetchIcons();
    }
  }, [foundationTab, icons.length, loadingIcons, fetchIcons]);

  useEffect(() => {
    if (foundationTab === 'illustrations' && illustrations.length === 0 && !loadingIllustrations) {
      fetchIllustrations();
    }
  }, [foundationTab, illustrations.length, loadingIllustrations, fetchIllustrations]);

  useEffect(() => {
    if (foundationTab === 'logos' && logos.length === 0 && !loadingLogos) {
      fetchLogos();
    }
  }, [foundationTab, logos.length, loadingLogos, fetchLogos]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-primary">Design Showcase</h1>
              <p className="text-muted-foreground">Real-world examples and patterns using the design system</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span 
                className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                style={{ letterSpacing: 'var(--letter-spacing-wide)' }}
              >
                319 Colors
              </span>
              <span 
                className="text-xs px-3 py-1 bg-success/10 text-success rounded-full"
                style={{ letterSpacing: 'var(--letter-spacing-wide)' }}
              >
                50+ Components
              </span>
              <span 
                className="text-xs px-3 py-1 bg-info/10 text-info rounded-full"
                style={{ letterSpacing: 'var(--letter-spacing-wide)' }}
              >
                Mobile First
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation - Tier 1 */}
      <nav className="border-b border-border bg-card sticky top-[88px] md:top-[96px] z-50">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs
            tabs={[
              { id: 'variables', label: 'Variables' },
              { id: 'tokens', label: 'Tokens' },
              { id: 'foundation', label: 'Foundations' },
              { id: 'components', label: 'Components' },
              { id: 'patterns', label: 'Patterns' },
            ]}
            activeTab={mainTab}
            onChange={(tabId) => setMainTab(tabId as 'variables' | 'tokens' | 'foundation' | 'components' | 'patterns')}
          />
        </div>
      </nav>

      {/* Variables Tab Content */}
      {mainTab === 'variables' && (
        <>
          {/* Secondary Navigation - Tier 2 */}
          <nav className="border-b border-border bg-card sticky top-[144px] md:top-[152px] z-40">
            <div className="max-w-7xl mx-auto px-4">
              <div className="overflow-x-auto">
                <Tabs
                  tabs={[
                    { id: 'colors', label: 'Color Variables' },
                    { id: 'spacing', label: 'Spacing Variables' },
                    { id: 'typography', label: 'Typography Variables' },
                    { id: 'borders', label: 'Border Variables' },
                    { id: 'radius', label: 'Radius Variables' },
                    { id: 'animation', label: 'Animation Variables' },
                  ]}
                  activeTab={variablesTab}
                  onChange={setVariablesTab}
                />
              </div>
            </div>
          </nav>

          {/* Variables Content */}
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-12">
              {/* Color Variables */}
              {variablesTab === 'colors' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Color Variables</h2>
                    <p className="text-muted-foreground">
                      Raw color values (hex codes) that serve as the atomic building blocks of the design system. These are referenced by semantic tokens.
                    </p>
                  </div>

                  <Card className="p-6">
                    <div className="space-y-8">
                      {/* Primary Colors */}
                      <div>
                        <h3 className="mb-4">Primary (Blue)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                            <div key={shade} className="space-y-2">
                              <div 
                                className="h-20 rounded-lg border border-border"
                                style={{ backgroundColor: `var(--color-primary-${shade})` }}
                              />
                              <div className="space-y-1">
                                <p className="text-xs">
                                  <code className="bg-muted px-2 py-1 rounded">--color-primary-{shade}</code>
                                </p>
                                <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                  {shade === 50 ? '#EBF1FF' : 
                                   shade === 100 ? '#D6E3FF' :
                                   shade === 200 ? '#B3CCFF' :
                                   shade === 300 ? '#80AAFF' :
                                   shade === 400 ? '#4D7FFF' :
                                   shade === 500 ? '#003CFF' :
                                   shade === 600 ? '#0030CC' :
                                   shade === 700 ? '#002499' :
                                   shade === 800 ? '#001866' :
                                   shade === 900 ? '#000F3D' : '#000820'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gray Colors */}
                      <div>
                        <h3 className="mb-4">Gray</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                            <div key={shade} className="space-y-2">
                              <div 
                                className="h-20 rounded-lg border border-border"
                                style={{ backgroundColor: `var(--color-gray-${shade})` }}
                              />
                              <div className="space-y-1">
                                <p className="text-xs">
                                  <code className="bg-muted px-2 py-1 rounded">--color-gray-{shade}</code>
                                </p>
                                <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                  {colorHexValues.gray[shade as keyof typeof colorHexValues.gray]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Success Colors */}
                      <div>
                        <h3 className="mb-4">Success (Green)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                            <div key={shade} className="space-y-2">
                              <div 
                                className="h-20 rounded-lg border border-border"
                                style={{ backgroundColor: `var(--color-success-${shade})` }}
                              />
                              <div className="space-y-1">
                                <p className="text-xs">
                                  <code className="bg-muted px-2 py-1 rounded">--color-success-{shade}</code>
                                </p>
                                <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                  {colorHexValues.success[shade as keyof typeof colorHexValues.success]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Warning Colors */}
                      <div>
                        <h3 className="mb-4">Warning (Amber)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                            <div key={shade} className="space-y-2">
                              <div 
                                className="h-20 rounded-lg border border-border"
                                style={{ backgroundColor: `var(--color-warning-${shade})` }}
                              />
                              <div className="space-y-1">
                                <p className="text-xs">
                                  <code className="bg-muted px-2 py-1 rounded">--color-warning-{shade}</code>
                                </p>
                                <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                  {colorHexValues.warning[shade as keyof typeof colorHexValues.warning]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Error Colors */}
                      <div>
                        <h3 className="mb-4">Error (Red)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                            <div key={shade} className="space-y-2">
                              <div 
                                className="h-20 rounded-lg border border-border"
                                style={{ backgroundColor: `var(--color-error-${shade})` }}
                              />
                              <div className="space-y-1">
                                <p className="text-xs">
                                  <code className="bg-muted px-2 py-1 rounded">--color-error-{shade}</code>
                                </p>
                                <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                  {colorHexValues.error[shade as keyof typeof colorHexValues.error]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Info Colors */}
                      <div>
                        <h3 className="mb-4">Info (Purple)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                            <div key={shade} className="space-y-2">
                              <div 
                                className="h-20 rounded-lg border border-border"
                                style={{ backgroundColor: `var(--color-info-${shade})` }}
                              />
                              <div className="space-y-1">
                                <p className="text-xs">
                                  <code className="bg-muted px-2 py-1 rounded">--color-info-{shade}</code>
                                </p>
                                <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                  {colorHexValues.info[shade as keyof typeof colorHexValues.info]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pure Colors - Special Purpose */}
                      <div>
                        <h3 className="mb-4">Pure Colors (Semantic Tokens)</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Absolute values used in semantic tokens like <code className="bg-muted px-1.5 py-0.5 rounded text-xs">--foreground</code> and <code className="bg-muted px-1.5 py-0.5 rounded text-xs">--background</code>. For tints and shades, use the gray scale families (Gray, Slate, Zinc, Neutral, Stone).
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <div 
                              className="h-20 rounded-lg border-2 border-border" 
                              style={{ backgroundColor: '#000000' }}
                            />
                            <div className="space-y-1">
                              <p className="text-xs">
                                <code className="bg-muted px-2 py-1 rounded">Pure Black</code>
                              </p>
                              <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                #000000
                              </p>
                              <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                Used in: --foreground
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div 
                              className="h-20 rounded-lg border-2 border-border" 
                              style={{ backgroundColor: '#FFFFFF' }}
                            />
                            <div className="space-y-1">
                              <p className="text-xs">
                                <code className="bg-muted px-2 py-1 rounded">Pure White</code>
                              </p>
                              <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                #FFFFFF
                              </p>
                              <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                Used in: --background, --card
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <AlertTitle>What are Variables?</AlertTitle>
                        <AlertDescription>
                          Variables are raw, technical values (like hex codes) that form the foundation of your design system. They are referenced by semantic tokens to create meaningful, reusable styles. All 319 color variables follow this pattern: <code className="bg-background px-2 py-1 rounded text-xs">--color-[name]-[shade]</code>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </Card>
                </div>
              )}

              {/* Spacing Variables */}
              {variablesTab === 'spacing' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Spacing Variables</h2>
                    <p className="text-muted-foreground">
                      38 spacing values in rem units following an 8px-based grid system. These raw values are referenced by semantic spacing tokens.
                    </p>
                  </div>

                  <Card className="p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96].map((size) => (
                          <div key={size} className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div 
                                className="bg-primary h-12 rounded"
                                style={{ width: `var(--space-${size})` }}
                              />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs">
                                <code className="bg-muted px-2 py-1 rounded">--space-{size}</code>
                              </p>
                              <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                                {size === 0 ? '0' : `${size * 0.25}rem`} ({size * 4}px)
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Alert>
                        <AlertTitle>8px Grid System</AlertTitle>
                        <AlertDescription>
                          All spacing follows an 8px base unit. Each increment represents 0.25rem (4px). This creates a consistent, harmonious spacing rhythm throughout your interface.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </Card>
                </div>
              )}

              {/* Typography Variables */}
              {variablesTab === 'typography' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Typography Variables</h2>
                    <p className="text-muted-foreground">
                      Raw font size and weight values that form the foundation of the typography system.
                    </p>
                  </div>

                  {/* Font Sizes */}
                  <Card className="p-6">
                    <h3 className="mb-6">Font Size Variables</h3>
                    <div className="space-y-6">
                      {[
                        { name: 'xs', rem: '0.75rem', px: '12px' },
                        { name: 'sm', rem: '0.875rem', px: '14px' },
                        { name: 'base', rem: '1rem', px: '16px' },
                        { name: 'lg', rem: '1.125rem', px: '18px' },
                        { name: 'xl', rem: '1.25rem', px: '20px' },
                        { name: '2xl', rem: '1.5rem', px: '24px' },
                        { name: '3xl', rem: '1.875rem', px: '30px' },
                        { name: '4xl', rem: '2.25rem', px: '36px' },
                        { name: '5xl', rem: '3rem', px: '48px' },
                        { name: '6xl', rem: '3.75rem', px: '60px' },
                      ].map((size) => (
                        <div key={size.name} className="flex items-baseline justify-between gap-6 pb-4 border-b border-border last:border-0">
                          <div className="flex-1">
                            <p style={{ fontSize: `var(--font-size-${size.name})` }}>
                              The quick brown fox jumps over the lazy dog
                            </p>
                          </div>
                          <div className="text-right space-y-1 min-w-[200px]">
                            <p className="text-xs">
                              <code className="bg-muted px-2 py-1 rounded">--font-size-{size.name}</code>
                            </p>
                            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                              {size.rem} ({size.px})
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Font Weights */}
                  <Card className="p-6">
                    <h3 className="mb-6">Font Weight Variables</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'thin', value: '100' },
                        { name: 'extralight', value: '200' },
                        { name: 'light', value: '300' },
                        { name: 'normal', value: '400' },
                        { name: 'medium', value: '500' },
                        { name: 'semibold', value: '600' },
                        { name: 'bold', value: '700' },
                        { name: 'extrabold', value: '800' },
                        { name: 'black', value: '900' },
                      ].map((weight) => (
                        <div key={weight.name} className="flex items-center justify-between gap-6 pb-4 border-b border-border last:border-0">
                          <p style={{ fontWeight: `var(--font-weight-${weight.name})` }}>
                            The quick brown fox jumps over the lazy dog
                          </p>
                          <div className="text-right space-y-1 min-w-[220px]">
                            <p className="text-xs">
                              <code className="bg-muted px-2 py-1 rounded">--font-weight-{weight.name}</code>
                            </p>
                            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                              {weight.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Border Variables */}
              {variablesTab === 'borders' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Border Variables</h2>
                    <p className="text-muted-foreground">
                      Raw border width and style values for creating consistent borders throughout the design system.
                    </p>
                  </div>

                  <Card className="p-6">
                    <h3 className="mb-6">Border Width Variables</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { name: '0', px: '0px' },
                        { name: 'thin', px: '1px' },
                        { name: 'base', px: '1px' },
                        { name: 'medium', px: '2px' },
                        { name: 'thick', px: '3px' },
                        { name: 'heavy', px: '4px' },
                        { name: '6', px: '6px' },
                        { name: '8', px: '8px' },
                      ].map((border) => (
                        <div key={border.name} className="space-y-3">
                          <div 
                            className="h-16 bg-muted rounded-lg"
                            style={{ 
                              borderWidth: `var(--border-width-${border.name})`,
                              borderStyle: 'solid',
                              borderColor: 'var(--primary)'
                            }}
                          />
                          <div className="space-y-1">
                            <p className="text-xs">
                              <code className="bg-muted px-2 py-1 rounded">--border-width-{border.name}</code>
                            </p>
                            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                              {border.px}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-6">Border Style Variables</h3>
                    <div className="space-y-6">
                      {['solid', 'dashed', 'dotted'].map((style) => (
                        <div key={style} className="space-y-3">
                          <div 
                            className="h-16 bg-muted rounded-lg"
                            style={{ 
                              borderWidth: '2px',
                              borderStyle: `var(--border-style-${style})`,
                              borderColor: 'var(--primary)'
                            }}
                          />
                          <p className="text-xs">
                            <code className="bg-muted px-2 py-1 rounded">--border-style-{style}</code>
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Radius Variables */}
              {variablesTab === 'radius' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Radius Variables</h2>
                    <p className="text-muted-foreground">
                      Raw border radius values for creating consistent rounded corners throughout the design system.
                    </p>
                  </div>

                  <Card className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {[
                        { name: 'none', value: '0' },
                        { name: 'sm', value: '0.125rem' },
                        { name: 'base', value: '0.25rem' },
                        { name: 'md', value: '0.375rem' },
                        { name: 'lg', value: '0.5rem' },
                        { name: 'xl', value: '0.75rem' },
                        { name: '2xl', value: '1rem' },
                        { name: '3xl', value: '1.5rem' },
                        { name: 'full', value: '9999px' },
                      ].map((radius) => (
                        <div key={radius.name} className="space-y-3">
                          <div 
                            className="h-24 bg-primary"
                            style={{ borderRadius: `var(--radius-${radius.name})` }}
                          />
                          <div className="space-y-1">
                            <p className="text-xs">
                              <code className="bg-muted px-2 py-1 rounded">--radius-{radius.name}</code>
                            </p>
                            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                              {radius.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Animation Variables */}
              {variablesTab === 'animation' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Animation Variables</h2>
                    <p className="text-muted-foreground">
                      Raw duration and easing values for creating consistent animations and transitions.
                    </p>
                  </div>

                  <Card className="p-6">
                    <h3 className="mb-6">Duration Variables</h3>
                    <div className="space-y-6">
                      {[
                        { name: 'instant', ms: '0ms' },
                        { name: 'fast', ms: '100ms' },
                        { name: 'normal', ms: '200ms' },
                        { name: 'base', ms: '300ms' },
                        { name: 'slow', ms: '400ms' },
                        { name: 'slower', ms: '500ms' },
                      ].map((duration) => (
                        <div key={duration.name} className="flex items-center justify-between gap-6 pb-6 border-b border-border last:border-0">
                          <div className="flex-1">
                            <div 
                              className="h-12 w-12 bg-primary rounded-lg cursor-pointer hover:translate-x-32"
                              style={{ 
                                transition: `transform var(--transition-duration-${duration.name}) ease-in-out`
                              }}
                            />
                            <p className="text-xs text-muted-foreground mt-2">Hover to see animation</p>
                          </div>
                          <div className="text-right space-y-1 min-w-[240px]">
                            <p className="text-xs">
                              <code className="bg-muted px-2 py-1 rounded">--transition-duration-{duration.name}</code>
                            </p>
                            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)' }}>
                              {duration.ms}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Alert>
                    <AlertTitle>Variables vs Tokens</AlertTitle>
                    <AlertDescription>
                      Variables are raw values. Tokens are semantic references to variables. For example, <code className="bg-background px-2 py-1 rounded text-xs">--transition-duration-base</code> is a variable, while a token might reference it as <code className="bg-background px-2 py-1 rounded text-xs">--duration-modal-fade</code> to give it contextual meaning.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* Tokens Tab Content */}
      {mainTab === 'tokens' && (
        <>
          {/* Secondary Navigation - Tier 2 */}
          <nav className="border-b border-border bg-card sticky top-[144px] md:top-[152px] z-40">
            <div className="max-w-7xl mx-auto px-4">
              <div className="overflow-x-auto">
                <Tabs
                  tabs={[
                    { id: 'color-tokens', label: 'Color Tokens' },
                    { id: 'typography-tokens', label: 'Typography Tokens' },
                    { id: 'spacing-tokens', label: 'Spacing Tokens' },
                    { id: 'layout-tokens', label: 'Layout Tokens' },
                    { id: 'motion-tokens', label: 'Motion Tokens' },
                  ]}
                  activeTab={tokensTab}
                  onChange={setTokensTab}
                />
              </div>
            </div>
          </nav>

          {/* Tokens Content */}
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-12">
              {/* Color Tokens */}
              {tokensTab === 'color-tokens' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Color Tokens</h2>
                    <p className="text-muted-foreground">
                      Semantic color tokens that reference raw color variables. These provide contextual meaning and enable theme changes by updating a single token value.
                    </p>
                  </div>

                  <Card className="p-6">
                    <h3 className="mb-6">Primary UI Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--primary', variable: 'var(--color-primary-500)', description: 'Primary brand color for buttons, links, active states' },
                        { token: '--primary-foreground', variable: '#ffffff', description: 'Text/icons on primary colored backgrounds' },
                        { token: '--secondary', variable: 'var(--color-secondary-900)', description: 'Secondary actions and subtle elements' },
                        { token: '--secondary-foreground', variable: '#ffffff', description: 'Text/icons on secondary colored backgrounds' },
                        { token: '--accent', variable: 'var(--color-primary-500)', description: 'Accent highlights, links, interactive elements' },
                        { token: '--accent-foreground', variable: '#ffffff', description: 'Text/icons on accent colored backgrounds' },
                      ].map((item) => (
                        <div key={item.token} className="flex items-center gap-6 pb-6 border-b border-border last:border-0">
                          <div 
                            className="w-20 h-20 rounded-lg border border-border flex-shrink-0"
                            style={{ backgroundColor: `var(${item.token})` }}
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                              <span className="text-muted-foreground">→</span>
                              <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-6">Feedback State Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--success', variable: 'var(--color-success-500)', description: 'Success states, confirmations, positive feedback' },
                        { token: '--success-foreground', variable: '#ffffff', description: 'Text/icons on success backgrounds' },
                        { token: '--warning', variable: 'var(--color-warning-500)', description: 'Warning states, cautionary messages' },
                        { token: '--warning-foreground', variable: '#000000', description: 'Text/icons on warning backgrounds' },
                        { token: '--destructive', variable: 'var(--color-error-500)', description: 'Error states, destructive actions (delete, remove)' },
                        { token: '--destructive-foreground', variable: '#ffffff', description: 'Text/icons on destructive backgrounds' },
                        { token: '--info', variable: 'var(--color-info-500)', description: 'Informational messages, tooltips, help text' },
                        { token: '--info-foreground', variable: '#ffffff', description: 'Text/icons on info backgrounds' },
                      ].map((item) => (
                        <div key={item.token} className="flex items-center gap-6 pb-6 border-b border-border last:border-0">
                          <div 
                            className="w-20 h-20 rounded-lg border border-border flex-shrink-0"
                            style={{ backgroundColor: `var(${item.token})` }}
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                              <span className="text-muted-foreground">→</span>
                              <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-6">Surface & Background Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--background', variable: '#ffffff', description: 'Main application background (light mode)' },
                        { token: '--foreground', variable: '#000000', description: 'Main text color on background' },
                        { token: '--card', variable: '#ffffff', description: 'Card/container backgrounds' },
                        { token: '--card-foreground', variable: '#000000', description: 'Text on card backgrounds' },
                        { token: '--popover', variable: '#ffffff', description: 'Popover/dropdown backgrounds' },
                        { token: '--popover-foreground', variable: '#000000', description: 'Text on popover backgrounds' },
                        { token: '--muted', variable: 'var(--color-gray-100)', description: 'Muted backgrounds, disabled states' },
                        { token: '--muted-foreground', variable: 'var(--color-gray-500)', description: 'Muted text, secondary information' },
                      ].map((item) => (
                        <div key={item.token} className="flex items-center gap-6 pb-6 border-b border-border last:border-0">
                          <div 
                            className="w-20 h-20 rounded-lg border border-border flex-shrink-0"
                            style={{ backgroundColor: `var(${item.token})` }}
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                              <span className="text-muted-foreground">→</span>
                              <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-6">Border & Input Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--border', variable: 'var(--color-gray-200)', description: 'Default border color for inputs, cards, dividers' },
                        { token: '--input', variable: 'transparent', description: 'Input field background (filled state)' },
                        { token: '--input-background', variable: '#ffffff', description: 'Input field background color' },
                        { token: '--ring', variable: 'var(--color-primary-500)', description: 'Focus ring color for interactive elements' },
                      ].map((item) => (
                        <div key={item.token} className="flex items-center gap-6 pb-6 border-b border-border last:border-0">
                          <div 
                            className="w-20 h-20 rounded-lg border border-border flex-shrink-0"
                            style={{ backgroundColor: `var(${item.token})` }}
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                              <span className="text-muted-foreground">→</span>
                              <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-6">Sidebar & Navigation Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--sidebar', variable: 'var(--color-secondary-50)', description: 'Sidebar background color' },
                        { token: '--sidebar-foreground', variable: '#000000', description: 'Text on sidebar' },
                        { token: '--sidebar-primary', variable: 'var(--color-primary-500)', description: 'Primary elements in sidebar' },
                        { token: '--sidebar-primary-foreground', variable: '#ffffff', description: 'Text on sidebar primary elements' },
                        { token: '--sidebar-accent', variable: 'var(--color-primary-500)', description: 'Accent highlights in sidebar' },
                        { token: '--sidebar-accent-foreground', variable: '#ffffff', description: 'Text on sidebar accent elements' },
                        { token: '--sidebar-border', variable: 'var(--color-gray-200)', description: 'Sidebar borders and dividers' },
                        { token: '--sidebar-ring', variable: 'var(--color-primary-500)', description: 'Focus ring in sidebar' },
                      ].map((item) => (
                        <div key={item.token} className="flex items-center gap-6 pb-6 border-b border-border last:border-0">
                          <div 
                            className="w-20 h-20 rounded-lg border border-border flex-shrink-0"
                            style={{ backgroundColor: `var(${item.token})` }}
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                              <span className="text-muted-foreground">→</span>
                              <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-6">Chart Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--chart-1', variable: 'var(--color-primary-500)', description: 'Primary chart series color' },
                        { token: '--chart-2', variable: 'var(--color-blue-500)', description: 'Secondary chart series color' },
                        { token: '--chart-3', variable: 'var(--color-primary-300)', description: 'Tertiary chart series color' },
                        { token: '--chart-4', variable: 'var(--color-cyan-400)', description: 'Fourth chart series color' },
                        { token: '--chart-5', variable: 'var(--color-primary-200)', description: 'Fifth chart series color' },
                      ].map((item) => (
                        <div key={item.token} className="flex items-center gap-6 pb-6 border-b border-border last:border-0">
                          <div 
                            className="w-20 h-20 rounded-lg border border-border flex-shrink-0"
                            style={{ backgroundColor: `var(${item.token})` }}
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                              <span className="text-muted-foreground">→</span>
                              <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Alert>
                    <AlertTitle>Complete Token System</AlertTitle>
                    <AlertDescription>
                      Your design system includes <strong>39 semantic color tokens</strong> covering all UI scenarios. Each token references raw color variables, allowing you to rebrand your entire application by updating just a few values in globals.css. Light/dark mode is automatically handled via the .dark class.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Typography Tokens */}
              {tokensTab === 'typography-tokens' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Typography Tokens</h2>
                    <p className="text-muted-foreground">
                      Semantic typography tokens that reference raw font variables and provide contextual meaning for different text elements.
                    </p>
                  </div>

                  <Card className="p-6">
                    <h3 className="mb-6">Font Family Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--font-family-heading', variable: 'var(--font-family-lufga)', usage: 'h1, h2, h3, h4, h5, h6' },
                        { token: '--font-family-body', variable: 'var(--font-family-lufga)', usage: 'p, div, span' },
                        { token: '--font-family-button', variable: 'var(--font-family-lufga)', usage: 'button, a.button' },
                        { token: '--font-family-label', variable: 'var(--font-family-geist)', usage: 'label, small' },
                      ].map((item) => (
                        <div key={item.token} className="pb-6 border-b border-border last:border-0">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                            <span className="text-muted-foreground">→</span>
                            <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                          </div>
                          <p style={{ fontFamily: `var(${item.token})` }} className="text-lg mb-2">
                            The quick brown fox jumps over the lazy dog
                          </p>
                          <p className="text-sm text-muted-foreground">Used for: {item.usage}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-6">Font Size Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--font-size-heading-6xl', variable: 'var(--font-size-6xl)', usage: 'Hero text' },
                        { token: '--font-size-heading-4xl', variable: 'var(--font-size-4xl)', usage: 'h1' },
                        { token: '--font-size-heading-3xl', variable: 'var(--font-size-3xl)', usage: 'h2' },
                        { token: '--font-size-heading-2xl', variable: 'var(--font-size-2xl)', usage: 'h3' },
                        { token: '--font-size-heading-xl', variable: 'var(--font-size-xl)', usage: 'h4' },
                        { token: '--font-size-body-base', variable: 'var(--font-size-base)', usage: 'Default body text' },
                        { token: '--font-size-body-sm', variable: 'var(--font-size-sm)', usage: 'Small text' },
                      ].map((item) => (
                        <div key={item.token} className="pb-6 border-b border-border last:border-0">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                            <span className="text-muted-foreground">→</span>
                            <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                          </div>
                          <p style={{ fontSize: `var(${item.token})` }}>
                            The quick brown fox jumps over the lazy dog
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">Used for: {item.usage}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-6">Font Weight Tokens</h3>
                    <div className="space-y-4">
                      {[
                        { token: '--font-weight-heading', variable: 'var(--font-weight-semibold)', value: '600' },
                        { token: '--font-weight-body', variable: 'var(--font-weight-normal)', value: '400' },
                        { token: '--font-weight-label', variable: 'var(--font-weight-medium)', value: '500' },
                        { token: '--font-weight-button', variable: 'var(--font-weight-medium)', value: '500' },
                      ].map((item) => (
                        <div key={item.token} className="pb-4 border-b border-border last:border-0">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                            <span className="text-muted-foreground">→</span>
                            <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                            <span className="text-xs text-muted-foreground">({item.value})</span>
                          </div>
                          <p style={{ fontWeight: `var(${item.token})` }}>
                            The quick brown fox jumps over the lazy dog
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Spacing Tokens */}
              {tokensTab === 'spacing-tokens' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Spacing Tokens</h2>
                    <p className="text-muted-foreground">
                      Semantic spacing tokens that reference raw spacing variables and provide contextual meaning for different layout contexts.
                    </p>
                  </div>

                  <Card className="p-6">
                    <h3 className="mb-6">Component Spacing Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--space-component-xs', variable: 'var(--space-2)', value: '0.5rem (8px)', usage: 'Tight spacing within components' },
                        { token: '--space-component-sm', variable: 'var(--space-3)', value: '0.75rem (12px)', usage: 'Small component spacing' },
                        { token: '--space-component-md', variable: 'var(--space-4)', value: '1rem (16px)', usage: 'Default component spacing' },
                        { token: '--space-component-lg', variable: 'var(--space-6)', value: '1.5rem (24px)', usage: 'Large component spacing' },
                        { token: '--space-component-xl', variable: 'var(--space-8)', value: '2rem (32px)', usage: 'Extra large component spacing' },
                      ].map((item) => (
                        <div key={item.token} className="pb-6 border-b border-border last:border-0">
                          <div className="flex items-center gap-6">
                            <div 
                              className="bg-primary rounded flex-shrink-0"
                              style={{ width: `var(${item.token})`, height: '48px' }}
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                                <span className="text-muted-foreground">→</span>
                                <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.value}</p>
                              <p className="text-sm">{item.usage}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-6">Section Spacing Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--space-section-sm', variable: 'var(--space-12)', value: '3rem (48px)', usage: 'Small section spacing' },
                        { token: '--space-section-md', variable: 'var(--space-16)', value: '4rem (64px)', usage: 'Medium section spacing' },
                        { token: '--space-section-lg', variable: 'var(--space-24)', value: '6rem (96px)', usage: 'Large section spacing' },
                        { token: '--space-section-xl', variable: 'var(--space-32)', value: '8rem (128px)', usage: 'Extra large section spacing' },
                      ].map((item) => (
                        <div key={item.token} className="pb-6 border-b border-border last:border-0">
                          <div className="flex items-center gap-6">
                            <div 
                              className="bg-success rounded flex-shrink-0"
                              style={{ width: `var(${item.token})`, height: '48px' }}
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <code className="text-sm bg-success/10 text-success px-3 py-1 rounded">{item.token}</code>
                                <span className="text-muted-foreground">→</span>
                                <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.value}</p>
                              <p className="text-sm">{item.usage}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Alert>
                    <AlertTitle>Semantic Spacing</AlertTitle>
                    <AlertDescription>
                      Instead of using <code className="bg-background px-2 py-1 rounded text-xs">--space-4</code> directly, use <code className="bg-background px-2 py-1 rounded text-xs">--space-component-md</code>. This makes your intent clear and allows you to adjust all "component medium spacing" values across your app by changing one token.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Layout Tokens */}
              {tokensTab === 'layout-tokens' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Layout Tokens</h2>
                    <p className="text-muted-foreground">
                      Semantic tokens for z-index layering, container sizes, and layout-related values.
                    </p>
                  </div>

                  <Card className="p-6">
                    <h3 className="mb-6">Z-Index Tokens</h3>
                    <div className="space-y-4">
                      {[
                        { token: '--z-index-base', value: '0', usage: 'Base layer' },
                        { token: '--z-index-dropdown', value: '1000', usage: 'Dropdown menus' },
                        { token: '--z-index-sticky', value: '1010', usage: 'Sticky elements' },
                        { token: '--z-index-fixed', value: '1020', usage: 'Fixed elements' },
                        { token: '--z-index-modal-backdrop', value: '1030', usage: 'Modal backdrop' },
                        { token: '--z-index-modal', value: '1050', usage: 'Modal dialogs' },
                        { token: '--z-index-tooltip', value: '1070', usage: 'Tooltips' },
                        { token: '--z-index-toast', value: '1080', usage: 'Toast notifications' },
                        { token: '--z-index-max', value: '1090', usage: 'Maximum layer' },
                      ].map((item) => (
                        <div key={item.token} className="flex items-center justify-between gap-6 pb-4 border-b border-border last:border-0">
                          <div className="flex-1">
                            <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                            <p className="text-sm text-muted-foreground mt-2">{item.usage}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-mono">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Alert>
                    <AlertTitle>Layering System</AlertTitle>
                    <AlertDescription>
                      Z-index tokens ensure elements stack correctly. Toast notifications always appear above modals, which appear above dropdowns, maintaining a consistent visual hierarchy across your application.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Motion Tokens */}
              {tokensTab === 'motion-tokens' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Motion Tokens</h2>
                    <p className="text-muted-foreground">
                      Semantic motion tokens that reference raw duration variables and provide contextual meaning for different animation contexts.
                    </p>
                  </div>

                  <Card className="p-6">
                    <h3 className="mb-6">Duration Tokens</h3>
                    <div className="space-y-6">
                      {[
                        { token: '--duration-quick', variable: 'var(--transition-duration-fast)', value: '100ms', usage: 'Quick feedback (hover, focus)' },
                        { token: '--duration-base', variable: 'var(--transition-duration-base)', value: '300ms', usage: 'Default transitions' },
                        { token: '--duration-modal-fade', variable: 'var(--transition-duration-base)', value: '300ms', usage: 'Modal fade in/out' },
                        { token: '--duration-page-transition', variable: 'var(--transition-duration-slow)', value: '400ms', usage: 'Page transitions' },
                      ].map((item) => (
                        <div key={item.token} className="pb-6 border-b border-border last:border-0">
                          <div className="flex items-center gap-6 mb-4">
                            <div 
                              className="w-16 h-16 bg-primary rounded-lg cursor-pointer hover:scale-110 hover:rotate-12"
                              style={{ 
                                transition: `all var(${item.token}) ease-in-out`
                              }}
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <code className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{item.token}</code>
                                <span className="text-muted-foreground">→</span>
                                <code className="text-xs bg-muted px-2 py-1 rounded">{item.variable}</code>
                                <span className="text-xs text-muted-foreground">({item.value})</span>
                              </div>
                              <p className="text-sm">{item.usage}</p>
                              <p className="text-xs text-muted-foreground">Hover the box to see animation</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* Foundation Tab Content */}
      {mainTab === 'foundation' && (
        <>
          {/* Secondary Navigation - Tier 2 */}
          <nav className="border-b border-border bg-card sticky top-[144px] md:top-[152px] z-40">
            <div className="max-w-7xl mx-auto px-4">
              <div className="overflow-x-auto">
                <Tabs
                  tabs={[
                    { id: 'colors', label: 'Color Palette' },
                    { id: 'typography', label: 'Typography' },
                    { id: 'spacing', label: 'Spacing System' },
                    { id: 'borders', label: 'Borders & Radius' },
                    { id: 'shadows', label: 'Shadows & Elevation' },
                    { id: 'effects', label: 'Effects & Animations' },
                    { id: 'layout', label: 'Layout & Z-Index' },
                    { id: 'interactivity', label: 'Scroll & Touch' },
                    { id: 'special', label: 'Special Purpose' },
                    { id: 'states', label: 'Interactive States' },
                    { id: 'icons', label: 'Icons' },
                    { id: 'illustrations', label: 'Illustrations' },
                    { id: 'logos', label: 'Logos' },
                  ]}
                  activeTab={foundationTab}
                  onChange={setFoundationTab}
                />
              </div>
            </div>
          </nav>

          {/* Foundation Content */}
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-12">
              {/* Colors Section */}
              {foundationTab === 'colors' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Color System</h2>
                    <p className="text-muted-foreground">
                      Complete color system with 29 palettes × 11 shades = 319 colors
                    </p>
                  </div>

                  {/* Semantic Colors */}
                  <Card className="p-6">
                    <h3 className="mb-2">Semantic Colors</h3>
                    <p className="text-muted-foreground mb-6">Primary colors used throughout the app</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <ColorSwatch name="Primary" varName="--primary" />
                      <ColorSwatch name="Secondary" varName="--secondary" />
                      <ColorSwatch name="Success" varName="--success" />
                      <ColorSwatch name="Warning" varName="--warning" />
                      <ColorSwatch name="Error" varName="--destructive" />
                      <ColorSwatch name="Info" varName="--info" />
                    </div>
                  </Card>

                  {/* Background & Surface Colors */}
                  <Card className="p-6">
                    <h3 className="mb-2">Backgrounds & Surfaces</h3>
                    <p className="text-muted-foreground mb-6">Foundation colors for layouts and containers</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <ColorSwatch name="Background" varName="--background" />
                      <ColorSwatch name="Card" varName="--card" />
                      <ColorSwatch name="Muted" varName="--muted" />
                      <ColorSwatch name="Accent" varName="--accent" />
                      <ColorSwatch name="Popover" varName="--popover" />
                      <ColorSwatch name="Border" varName="--border" />
                    </div>
                  </Card>

                  {/* Text Colors */}
                  <Card className="p-6">
                    <h3 className="mb-2">Text Colors</h3>
                    <p className="text-muted-foreground mb-6">Foreground colors for text and icons</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <ColorSwatch name="Foreground" varName="--foreground" />
                      <ColorSwatch name="Primary Foreground" varName="--primary-foreground" />
                      <ColorSwatch name="Secondary Foreground" varName="--secondary-foreground" />
                      <ColorSwatch name="Muted Foreground" varName="--muted-foreground" />
                      <ColorSwatch name="Accent Foreground" varName="--accent-foreground" />
                      <ColorSwatch name="Card Foreground" varName="--card-foreground" />
                    </div>
                  </Card>

                  {/* Color Palettes - All 29 Palettes */}
                  <Card className="p-6">
                    <h3 className="mb-2">Color Palettes (29 Palettes × 11 Shades = 319 Colors)</h3>
                    <p className="text-muted-foreground mb-6">Complete color system with 50-950 shades</p>
                    <div className="space-y-8">
                      <ColorPalette name="Primary" prefix="primary" />
                      <ColorPalette name="Gray" prefix="gray" />
                      <ColorPalette name="Red" prefix="red" />
                      <ColorPalette name="Orange" prefix="orange" />
                      <ColorPalette name="Amber" prefix="amber" />
                      <ColorPalette name="Yellow" prefix="yellow" />
                      <ColorPalette name="Lime" prefix="lime" />
                      <ColorPalette name="Green" prefix="green" />
                      <ColorPalette name="Emerald" prefix="emerald" />
                      <ColorPalette name="Teal" prefix="teal" />
                      <ColorPalette name="Cyan" prefix="cyan" />
                      <ColorPalette name="Sky" prefix="sky" />
                      <ColorPalette name="Blue" prefix="blue" />
                      <ColorPalette name="Indigo" prefix="indigo" />
                      <ColorPalette name="Violet" prefix="violet" />
                      <ColorPalette name="Purple" prefix="purple" />
                      <ColorPalette name="Fuchsia" prefix="fuchsia" />
                      <ColorPalette name="Pink" prefix="pink" />
                      <ColorPalette name="Rose" prefix="rose" />
                      <ColorPalette name="Slate" prefix="slate" />
                      <ColorPalette name="Zinc" prefix="zinc" />
                      <ColorPalette name="Neutral" prefix="neutral" />
                      <ColorPalette name="Stone" prefix="stone" />
                      <ColorPalette name="Success" prefix="success" />
                      <ColorPalette name="Warning" prefix="warning" />
                      <ColorPalette name="Error" prefix="error" />
                      <ColorPalette name="Info" prefix="info" />
                    </div>
                  </Card>
                </div>
              )}

              {/* Typography Section */}
              {foundationTab === 'typography' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Typography System</h2>
                    <p className="text-muted-foreground">
                      Complete typography system with Lufga and Geist fonts, semantic tokens, and font weight scale
                    </p>
                  </div>

                  {/* Font Families */}
                  <Card className="p-6">
                    <h3 className="mb-2">Font Families</h3>
                    <p className="text-muted-foreground mb-6">Two typefaces for different use cases</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="p-4 border border-border rounded-lg">
                          <p style={{ fontFamily: 'var(--font-family-lufga)' }}>Lufga Font Family</p>
                          <code className="text-xs text-muted-foreground mt-2 block">--font-family-lufga</code>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Used for: Headings, Body text, Buttons, Inputs
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 border border-border rounded-lg">
                          <label style={{ fontFamily: 'var(--font-family-geist)' }}>Geist Font Family</label>
                          <code className="text-xs text-muted-foreground mt-2 block">--font-family-geist</code>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Used for: Labels only
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Semantic Font Families */}
                  <Card className="p-6">
                    <h3 className="mb-2">Semantic Font Family Tokens</h3>
                    <p className="text-muted-foreground mb-6">Consistent typography patterns across the application</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Heading Font (h1-h6)</p>
                          <code className="text-xs text-muted-foreground">--font-family-heading</code>
                        </div>
                        <span className="text-muted-foreground">→ Lufga</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Body Font (p, div, span)</p>
                          <code className="text-xs text-muted-foreground">--font-family-body</code>
                        </div>
                        <span className="text-muted-foreground">→ Lufga</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <label>Label Font</label>
                          <code className="text-xs text-muted-foreground block">--font-family-label</code>
                        </div>
                        <span className="text-muted-foreground">→ Geist</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Button Font</p>
                          <code className="text-xs text-muted-foreground">--font-family-button</code>
                        </div>
                        <span className="text-muted-foreground">→ Lufga</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Input Font</p>
                          <code className="text-xs text-muted-foreground">--font-family-input</code>
                        </div>
                        <span className="text-muted-foreground">→ Lufga</span>
                      </div>
                    </div>
                  </Card>

                  {/* Heading Scale */}
                  <Card className="p-6">
                    <h3 className="mb-2">Heading Scale (Lufga)</h3>
                    <p className="text-muted-foreground mb-6">Hierarchical heading sizes with proper line height and wide letter spacing for improved readability</p>
                    <div className="space-y-6">
                      <div>
                        <h1>Heading 1 - Page Title</h1>
                        <div className="flex items-center gap-4 mt-2">
                          <code className="text-xs text-muted-foreground">{'<h1>'}</code>
                          <code className="text-xs text-muted-foreground">40px / --font-size-heading-4xl</code>
                          <code className="text-xs text-muted-foreground">line-height: 1.2</code>
                          <code className="text-xs text-muted-foreground">letter-spacing: wide (0.025em)</code>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <h2>Heading 2 - Section Title</h2>
                        <div className="flex items-center gap-4 mt-2">
                          <code className="text-xs text-muted-foreground">{'<h2>'}</code>
                          <code className="text-xs text-muted-foreground">32px / --font-size-heading-3xl</code>
                          <code className="text-xs text-muted-foreground">line-height: 1.25</code>
                          <code className="text-xs text-muted-foreground">letter-spacing: wide (0.025em)</code>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <h3>Heading 3 - Subsection Title</h3>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <code className="text-xs text-muted-foreground">{'<h3>'}</code>
                          <code className="text-xs text-muted-foreground">24px / --font-size-heading-2xl</code>
                          <code className="text-xs text-muted-foreground">line-height: 1.33</code>
                          <code className="text-xs text-muted-foreground">letter-spacing: wide (0.025em)</code>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <h4>Heading 4 - Card Title</h4>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <code className="text-xs text-muted-foreground">{'<h4>'}</code>
                          <code className="text-xs text-muted-foreground">20px / --font-size-heading-xl</code>
                          <code className="text-xs text-muted-foreground">line-height: 1.4</code>
                          <code className="text-xs text-muted-foreground">letter-spacing: wide (0.025em)</code>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <h5>Heading 5 - Small Title</h5>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <code className="text-xs text-muted-foreground">{'<h5>'}</code>
                          <code className="text-xs text-muted-foreground">18px / --font-size-heading-lg</code>
                          <code className="text-xs text-muted-foreground">line-height: 1.4</code>
                          <code className="text-xs text-muted-foreground">letter-spacing: wide (0.025em)</code>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <h6>Heading 6 - Smallest Title</h6>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <code className="text-xs text-muted-foreground">{'<h6>'}</code>
                          <code className="text-xs text-muted-foreground">16px / --font-size-heading-base</code>
                          <code className="text-xs text-muted-foreground">line-height: 1.5</code>
                          <code className="text-xs text-muted-foreground">letter-spacing: wide (0.025em)</code>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Body Text Scale */}
                  <Card className="p-6">
                    <h3 className="mb-2">Body Text Scale (Lufga)</h3>
                    <p className="text-muted-foreground mb-6">Body text sizes with wide letter spacing for improved readability</p>
                    <div className="space-y-6">
                      <div>
                        <p style={{ fontSize: 'var(--font-size-body-lg)' }}>
                          Large body text - For emphasized paragraphs or introductory content.
                        </p>
                        <code className="text-xs text-muted-foreground mt-2 block">
                          18px / --font-size-body-lg
                        </code>
                      </div>
                      <Divider />
                      <div>
                        <p>
                          Base body text - Default paragraph and content text. Optimized for readability with proper line height (1.31) and wide letter spacing (0.025em).
                        </p>
                        <code className="text-xs text-muted-foreground mt-2 block">
                          {'<p>'} - 16px / --font-size-body-base
                        </code>
                      </div>
                      <Divider />
                      <div>
                        <p style={{ fontSize: 'var(--font-size-body-sm)' }}>
                          Small body text - For secondary content, captions, or supporting information.
                        </p>
                        <code className="text-xs text-muted-foreground mt-2 block">
                          14px / --font-size-body-sm
                        </code>
                      </div>
                    </div>
                  </Card>

                  {/* Label Sizes */}
                  <Card className="p-6">
                    <h3 className="mb-2">Label Sizes (Geist)</h3>
                    <p className="text-muted-foreground mb-6">Form labels and micro-copy</p>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="demo-input-1">Base Label - Default form labels</Label>
                        <Input id="demo-input-1" placeholder="Input field" className="mt-2" />
                        <code className="text-xs text-muted-foreground mt-2 block">
                          {'<label>'} - 14px / --font-size-label-base / weight: 500
                        </code>
                      </div>
                      <Divider />
                      <div>
                        <label style={{ fontSize: 'var(--font-size-label-sm)' }}>
                          Small Label - Helper text, captions
                        </label>
                        <code className="text-xs text-muted-foreground mt-2 block">
                          12px / --font-size-label-sm
                        </code>
                      </div>
                    </div>
                  </Card>

                  {/* Font Weight Scale */}
                  <Card className="p-6">
                    <h3 className="mb-2">Font Weight Scale</h3>
                    <p className="text-muted-foreground mb-6">Complete font weight range (100-900)</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ fontWeight: 'var(--font-weight-thin)' }}>Thin (100)</p>
                        <code className="text-xs text-muted-foreground">--font-weight-thin</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ fontWeight: 'var(--font-weight-extralight)' }}>Extra Light (200)</p>
                        <code className="text-xs text-muted-foreground">--font-weight-extralight</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ fontWeight: 'var(--font-weight-light)' }}>Light (300)</p>
                        <code className="text-xs text-muted-foreground">--font-weight-light</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ fontWeight: 'var(--font-weight-normal)' }}>Normal (400)</p>
                        <code className="text-xs text-muted-foreground">--font-weight-normal</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ fontWeight: 'var(--font-weight-medium)' }}>Medium (500)</p>
                        <code className="text-xs text-muted-foreground">--font-weight-medium</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ fontWeight: 'var(--font-weight-semibold)' }}>Semi Bold (600)</p>
                        <code className="text-xs text-muted-foreground">--font-weight-semibold</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ fontWeight: 'var(--font-weight-bold)' }}>Bold (700)</p>
                        <code className="text-xs text-muted-foreground">--font-weight-bold</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ fontWeight: 'var(--font-weight-extrabold)' }}>Extra Bold (800)</p>
                        <code className="text-xs text-muted-foreground">--font-weight-extrabold</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ fontWeight: 'var(--font-weight-black)' }}>Black (900)</p>
                        <code className="text-xs text-muted-foreground">--font-weight-black</code>
                      </div>
                    </div>
                  </Card>

                  {/* Semantic Font Weights */}
                  <Card className="p-6">
                    <h3 className="mb-2">Semantic Font Weight Tokens</h3>
                    <p className="text-muted-foreground mb-6">Consistent typography patterns</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p style={{ fontWeight: 'var(--font-weight-heading)' }}>Heading Weight</p>
                          <code className="text-xs text-muted-foreground">--font-weight-heading</code>
                        </div>
                        <span className="text-muted-foreground">600 (Semibold)</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p style={{ fontWeight: 'var(--font-weight-body)' }}>Body Weight</p>
                          <code className="text-xs text-muted-foreground">--font-weight-body</code>
                        </div>
                        <span className="text-muted-foreground">400 (Normal)</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <label style={{ fontWeight: 'var(--font-weight-label)' }}>Label Weight</label>
                          <code className="text-xs text-muted-foreground block">--font-weight-label</code>
                        </div>
                        <span className="text-muted-foreground">500 (Medium)</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p style={{ fontWeight: 'var(--font-weight-button)' }}>Button Weight</p>
                          <code className="text-xs text-muted-foreground">--font-weight-button</code>
                        </div>
                        <span className="text-muted-foreground">500 (Medium)</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p style={{ fontWeight: 'var(--font-weight-emphasis)' }}>Emphasis Weight</p>
                          <code className="text-xs text-muted-foreground">--font-weight-emphasis</code>
                        </div>
                        <span className="text-muted-foreground">700 (Bold)</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p style={{ fontWeight: 'var(--font-weight-subtle)' }}>Subtle Weight</p>
                          <code className="text-xs text-muted-foreground">--font-weight-subtle</code>
                        </div>
                        <span className="text-muted-foreground">300 (Light)</span>
                      </div>
                    </div>
                  </Card>

                  {/* Letter Spacing */}
                  <Card className="p-6">
                    <h3 className="mb-2">Letter Spacing (Tracking)</h3>
                    <p className="text-muted-foreground mb-6">Professional typography tracking for polished text</p>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ letterSpacing: 'var(--letter-spacing-tighter)' }}>
                          Tighter - Available but not used by default (-0.05em)
                        </p>
                        <code className="text-xs text-muted-foreground">--letter-spacing-tighter</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ letterSpacing: 'var(--letter-spacing-tight)' }}>
                          Tight - Available but not used by default (-0.025em)
                        </p>
                        <code className="text-xs text-muted-foreground">--letter-spacing-tight</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ letterSpacing: 'var(--letter-spacing-normal)' }}>
                          Normal - Available for special cases (0em)
                        </p>
                        <code className="text-xs text-muted-foreground">--letter-spacing-normal</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg bg-primary/5">
                        <p style={{ letterSpacing: 'var(--letter-spacing-wide)' }}>
                          <strong>Wide - DEFAULT for all headings (h1-h6), body text, buttons, and labels (0.025em)</strong>
                        </p>
                        <code className="text-xs text-muted-foreground">--letter-spacing-wide</code>
                        <p className="text-xs text-muted-foreground mt-2">✅ Improved readability across all content</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ letterSpacing: 'var(--letter-spacing-wider)', textTransform: 'uppercase' }}>
                          Wider - For all-caps text (0.05em)
                        </p>
                        <code className="text-xs text-muted-foreground">--letter-spacing-wider</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p style={{ letterSpacing: 'var(--letter-spacing-widest)', textTransform: 'uppercase', fontSize: 'var(--font-size-xs)' }}>
                          Widest - For small all-caps labels (0.1em)
                        </p>
                        <code className="text-xs text-muted-foreground">--letter-spacing-widest</code>
                      </div>
                    </div>
                  </Card>

                  {/* Component Typography Examples */}
                  <Card className="p-6">
                    <h3 className="mb-2">Component Typography Examples</h3>
                    <p className="text-muted-foreground mb-6">Real-world usage of typography tokens</p>
                    <div className="space-y-6">
                      <div>
                        <h4 className="mb-4">Buttons (Lufga, Semibold, Wide Tracking)</h4>
                        <div className="flex flex-wrap gap-4">
                          <Button variant="default">Default Button</Button>
                          <Button variant="secondary">Secondary Button</Button>
                          <Button variant="outline">Outline Button</Button>
                          <Button variant="ghost">Ghost Button</Button>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <h4 className="mb-4">Inputs (Lufga, Normal Weight)</h4>
                        <Input placeholder="Type something..." />
                      </div>
                      <Divider />
                      <div>
                        <h4 className="mb-4">Textarea (Lufga, Normal Weight)</h4>
                        <Textarea placeholder="Enter your message..." rows={3} />
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Spacing Section */}
              {foundationTab === 'spacing' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Spacing System</h2>
                    <p className="text-muted-foreground">
                      Complete spacing system with 39 foundation tokens + semantic spacing patterns
                    </p>
                  </div>

                  {/* Foundation Spacing Scale - Compact View */}
                  <Card className="p-6">
                    <h3 className="mb-2">Foundation Spacing Scale</h3>
                    <p className="text-muted-foreground mb-6">Complete scale from 0 to 96 (0px to 384px)</p>
                    <div className="space-y-6">
                      {/* Micro Spacing (0-4) */}
                      <div>
                        <h4 className="mb-4">Micro Spacing (0-4px)</h4>
                        <div className="space-y-3">
                          <SpacingRow token="0" value="0px" variable="--space-0" />
                          <SpacingRow token="px" value="1px" variable="--space-px" />
                          <SpacingRow token="0.5" value="2px / 0.125rem" variable="--space-0_5" />
                          <SpacingRow token="1" value="4px / 0.25rem" variable="--space-1" />
                        </div>
                      </div>

                      <Divider />

                      {/* Small Spacing (6-16px) */}
                      <div>
                        <h4 className="mb-4">Small Spacing (6-16px)</h4>
                        <div className="space-y-3">
                          <SpacingRow token="1.5" value="6px / 0.375rem" variable="--space-1_5" />
                          <SpacingRow token="2" value="8px / 0.5rem" variable="--space-2" />
                          <SpacingRow token="2.5" value="10px / 0.625rem" variable="--space-2_5" />
                          <SpacingRow token="3" value="12px / 0.75rem" variable="--space-3" />
                          <SpacingRow token="3.5" value="14px / 0.875rem" variable="--space-3_5" />
                          <SpacingRow token="4" value="16px / 1rem" variable="--space-4" />
                        </div>
                      </div>

                      <Divider />

                      {/* Medium Spacing (20-48px) */}
                      <div>
                        <h4 className="mb-4">Medium Spacing (20-48px)</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <SpacingRow token="5" value="20px / 1.25rem" variable="--space-5" />
                          <SpacingRow token="6" value="24px / 1.5rem" variable="--space-6" />
                          <SpacingRow token="7" value="28px / 1.75rem" variable="--space-7" />
                          <SpacingRow token="8" value="32px / 2rem" variable="--space-8" />
                          <SpacingRow token="9" value="36px / 2.25rem" variable="--space-9" />
                          <SpacingRow token="10" value="40px / 2.5rem" variable="--space-10" />
                          <SpacingRow token="11" value="44px / 2.75rem" variable="--space-11" />
                          <SpacingRow token="12" value="48px / 3rem" variable="--space-12" />
                        </div>
                      </div>

                      <Divider />

                      {/* Large Spacing (56-128px) */}
                      <div>
                        <h4 className="mb-4">Large Spacing (56-128px)</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <SpacingRow token="14" value="56px / 3.5rem" variable="--space-14" />
                          <SpacingRow token="16" value="64px / 4rem" variable="--space-16" />
                          <SpacingRow token="20" value="80px / 5rem" variable="--space-20" />
                          <SpacingRow token="24" value="96px / 6rem" variable="--space-24" />
                          <SpacingRow token="28" value="112px / 7rem" variable="--space-28" />
                          <SpacingRow token="32" value="128px / 8rem" variable="--space-32" />
                        </div>
                      </div>

                      <Divider />

                      {/* Extra Large Spacing (144-384px) */}
                      <div>
                        <h4 className="mb-4">Extra Large Spacing (144-384px)</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <SpacingRow token="36" value="144px / 9rem" variable="--space-36" />
                          <SpacingRow token="40" value="160px / 10rem" variable="--space-40" />
                          <SpacingRow token="44" value="176px / 11rem" variable="--space-44" />
                          <SpacingRow token="48" value="192px / 12rem" variable="--space-48" />
                          <SpacingRow token="52" value="208px / 13rem" variable="--space-52" />
                          <SpacingRow token="56" value="224px / 14rem" variable="--space-56" />
                          <SpacingRow token="60" value="240px / 15rem" variable="--space-60" />
                          <SpacingRow token="64" value="256px / 16rem" variable="--space-64" />
                          <SpacingRow token="72" value="288px / 18rem" variable="--space-72" />
                          <SpacingRow token="80" value="320px / 20rem" variable="--space-80" />
                          <SpacingRow token="96" value="384px / 24rem" variable="--space-96" />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Semantic Spacing - Section Spacing */}
                  <Card className="p-6">
                    <h3 className="mb-2">Semantic Spacing - Sections</h3>
                    <p className="text-muted-foreground mb-6">Large vertical rhythm between major page sections</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Small Section Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-section-sm</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">48px</p>
                          <code className="text-xs text-muted-foreground">→ --space-12</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Medium Section Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-section-md</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">64px</p>
                          <code className="text-xs text-muted-foreground">→ --space-16</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Large Section Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-section-lg</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">96px</p>
                          <code className="text-xs text-muted-foreground">→ --space-24</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Extra Large Section Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-section-xl</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">128px</p>
                          <code className="text-xs text-muted-foreground">→ --space-32</code>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Semantic Spacing - Component Spacing */}
                  <Card className="p-6">
                    <h3 className="mb-2">Semantic Spacing - Components</h3>
                    <p className="text-muted-foreground mb-6">Internal component padding and gaps</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Tiny Component Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-component-xxs</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">4px</p>
                          <code className="text-xs text-muted-foreground">→ --space-1</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Extra Small Component Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-component-xs</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">8px</p>
                          <code className="text-xs text-muted-foreground">→ --space-2</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Small Component Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-component-sm</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">12px</p>
                          <code className="text-xs text-muted-foreground">→ --space-3</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Medium Component Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-component-md</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">16px</p>
                          <code className="text-xs text-muted-foreground">→ --space-4</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Large Component Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-component-lg</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">24px</p>
                          <code className="text-xs text-muted-foreground">→ --space-6</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Extra Large Component Spacing</p>
                          <code className="text-xs text-muted-foreground">--space-component-xl</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">32px</p>
                          <code className="text-xs text-muted-foreground">→ --space-8</code>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Visual Examples - Padding */}
                  <Card className="p-6">
                    <h3 className="mb-2">Visual Examples - Padding</h3>
                    <p className="text-muted-foreground mb-6">Common padding values in action</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">p-2 (8px)</p>
                        <div className="bg-muted">
                          <div className="p-2 bg-primary/20">
                            <div className="bg-primary rounded h-8"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">p-4 (16px)</p>
                        <div className="bg-muted">
                          <div className="p-4 bg-primary/20">
                            <div className="bg-primary rounded h-8"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">p-6 (24px)</p>
                        <div className="bg-muted">
                          <div className="p-6 bg-primary/20">
                            <div className="bg-primary rounded h-8"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">p-8 (32px)</p>
                        <div className="bg-muted">
                          <div className="p-8 bg-primary/20">
                            <div className="bg-primary rounded h-8"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">p-12 (48px)</p>
                        <div className="bg-muted">
                          <div className="p-12 bg-primary/20">
                            <div className="bg-primary rounded h-8"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">p-16 (64px)</p>
                        <div className="bg-muted">
                          <div className="p-16 bg-primary/20">
                            <div className="bg-primary rounded h-8"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Visual Examples - Gap */}
                  <Card className="p-6">
                    <h3 className="mb-2">Visual Examples - Gap</h3>
                    <p className="text-muted-foreground mb-6">Flexbox and grid gap spacing</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-3">gap-2 (8px)</p>
                        <div className="flex gap-2">
                          <div className="h-12 w-12 bg-primary rounded"></div>
                          <div className="h-12 w-12 bg-primary rounded"></div>
                          <div className="h-12 w-12 bg-primary rounded"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-3">gap-4 (16px)</p>
                        <div className="flex gap-4">
                          <div className="h-12 w-12 bg-secondary rounded"></div>
                          <div className="h-12 w-12 bg-secondary rounded"></div>
                          <div className="h-12 w-12 bg-secondary rounded"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-3">gap-6 (24px)</p>
                        <div className="flex gap-6">
                          <div className="h-12 w-12 bg-success rounded"></div>
                          <div className="h-12 w-12 bg-success rounded"></div>
                          <div className="h-12 w-12 bg-success rounded"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-3">gap-8 (32px)</p>
                        <div className="flex gap-8">
                          <div className="h-12 w-12 bg-info rounded"></div>
                          <div className="h-12 w-12 bg-info rounded"></div>
                          <div className="h-12 w-12 bg-info rounded"></div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Visual Examples - Margin */}
                  <Card className="p-6">
                    <h3 className="mb-2">Visual Examples - Margin</h3>
                    <p className="text-muted-foreground mb-6">Margin spacing between elements</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-3">mb-4 (16px bottom margin)</p>
                        <div className="bg-muted p-4">
                          <div className="bg-primary rounded h-8 mb-4"></div>
                          <div className="bg-secondary rounded h-8"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-3">mb-8 (32px bottom margin)</p>
                        <div className="bg-muted p-4">
                          <div className="bg-primary rounded h-8 mb-8"></div>
                          <div className="bg-secondary rounded h-8"></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Borders & Radius Section */}
              {foundationTab === 'borders' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Borders, Radius & Outlines</h2>
                    <p className="text-muted-foreground">
                      Complete border, radius, and outline system with foundation and semantic tokens
                    </p>
                  </div>

                  {/* Border Radius - Foundation */}
                  <Card className="p-6">
                    <h3 className="mb-2">Border Radius - Foundation Tokens</h3>
                    <p className="text-muted-foreground mb-6">9 radius values from none to full</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="h-24 bg-primary rounded-none mb-3 border border-border"></div>
                        <p className="mb-1">None (0px)</p>
                        <code className="text-xs text-muted-foreground">--radius-none</code>
                      </div>
                      <div className="text-center">
                        <div className="h-24 bg-primary rounded-sm mb-3"></div>
                        <p className="mb-1">Small (2px)</p>
                        <code className="text-xs text-muted-foreground">--radius-sm</code>
                      </div>
                      <div className="text-center">
                        <div className="h-24 bg-primary rounded mb-3"></div>
                        <p className="mb-1">Base (4px)</p>
                        <code className="text-xs text-muted-foreground">--radius-base</code>
                      </div>
                      <div className="text-center">
                        <div className="h-24 bg-primary rounded-md mb-3"></div>
                        <p className="mb-1">Medium (6px)</p>
                        <code className="text-xs text-muted-foreground">--radius-md</code>
                      </div>
                      <div className="text-center">
                        <div className="h-24 bg-primary rounded-lg mb-3"></div>
                        <p className="mb-1">Large (8px)</p>
                        <code className="text-xs text-muted-foreground">--radius-lg</code>
                      </div>
                      <div className="text-center">
                        <div className="h-24 bg-primary rounded-xl mb-3"></div>
                        <p className="mb-1">XL (12px)</p>
                        <code className="text-xs text-muted-foreground">--radius-xl</code>
                      </div>
                      <div className="text-center">
                        <div className="h-24 bg-primary rounded-2xl mb-3"></div>
                        <p className="mb-1">2XL (16px)</p>
                        <code className="text-xs text-muted-foreground">--radius-2xl</code>
                      </div>
                      <div className="text-center">
                        <div className="h-24 bg-primary rounded-3xl mb-3"></div>
                        <p className="mb-1">3XL (24px)</p>
                        <code className="text-xs text-muted-foreground">--radius-3xl</code>
                      </div>
                      <div className="text-center">
                        <div className="h-24 bg-primary rounded-full mb-3"></div>
                        <p className="mb-1">Full (9999px)</p>
                        <code className="text-xs text-muted-foreground">--radius-full</code>
                      </div>
                    </div>
                  </Card>

                  {/* Border Radius - Semantic */}
                  <Card className="p-6">
                    <h3 className="mb-2">Border Radius - Semantic Tokens</h3>
                    <p className="text-muted-foreground mb-6">Component-specific radius values</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Button Radius</p>
                          <code className="text-xs text-muted-foreground">--radius-button</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">4px</p>
                          <code className="text-xs text-muted-foreground">→ --radius-base</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Input Radius</p>
                          <code className="text-xs text-muted-foreground">--radius-input</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">4px</p>
                          <code className="text-xs text-muted-foreground">→ --radius-base</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Card Radius</p>
                          <code className="text-xs text-muted-foreground">--radius-card</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">8px</p>
                          <code className="text-xs text-muted-foreground">→ --radius-lg</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Modal Radius</p>
                          <code className="text-xs text-muted-foreground">--radius-modal</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">12px</p>
                          <code className="text-xs text-muted-foreground">→ --radius-xl</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Tooltip Radius</p>
                          <code className="text-xs text-muted-foreground">--radius-tooltip</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">6px</p>
                          <code className="text-xs text-muted-foreground">→ --radius-md</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Badge Radius</p>
                          <code className="text-xs text-muted-foreground">--radius-badge</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">9999px</p>
                          <code className="text-xs text-muted-foreground">→ --radius-full</code>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Border Width - Foundation */}
                  <Card className="p-6">
                    <h3 className="mb-2">Border Width - Foundation Tokens</h3>
                    <p className="text-muted-foreground mb-6">4 border width values</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="h-24 bg-muted border-0 border-primary rounded-lg mb-3"></div>
                        <p className="mb-1">None (0px)</p>
                        <code className="text-xs text-muted-foreground">--border-width-0</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted border border-primary rounded-lg mb-3"></div>
                        <p className="mb-1">Default (1px)</p>
                        <code className="text-xs text-muted-foreground">--border-width-DEFAULT</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted border-2 border-primary rounded-lg mb-3"></div>
                        <p className="mb-1">2px</p>
                        <code className="text-xs text-muted-foreground">--border-width-2</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted border-4 border-primary rounded-lg mb-3"></div>
                        <p className="mb-1">4px</p>
                        <code className="text-xs text-muted-foreground">--border-width-4</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted border-8 border-primary rounded-lg mb-3"></div>
                        <p className="mb-1">8px</p>
                        <code className="text-xs text-muted-foreground">--border-width-8</code>
                      </div>
                    </div>
                  </Card>

                  {/* Border Width - Semantic */}
                  <Card className="p-6">
                    <h3 className="mb-2">Border Width - Semantic Tokens</h3>
                    <p className="text-muted-foreground mb-6">Component-specific border widths</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Card Border Width</p>
                          <code className="text-xs text-muted-foreground">--border-width-card</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1px</p>
                          <code className="text-xs text-muted-foreground">→ --border-width-DEFAULT</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Input Border Width</p>
                          <code className="text-xs text-muted-foreground">--border-width-input</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1px</p>
                          <code className="text-xs text-muted-foreground">→ --border-width-DEFAULT</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Divider Border Width</p>
                          <code className="text-xs text-muted-foreground">--border-width-divider</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1px</p>
                          <code className="text-xs text-muted-foreground">→ --border-width-DEFAULT</code>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Focus Border Width</p>
                          <code className="text-xs text-muted-foreground">--border-width-focus</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">2px</p>
                          <code className="text-xs text-muted-foreground">→ --border-width-2</code>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Border Styles */}
                  <Card className="p-6">
                    <h3 className="mb-2">Border Styles</h3>
                    <p className="text-muted-foreground mb-6">4 border style options</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="h-24 bg-muted border-2 border-primary rounded-lg mb-3" style={{ borderStyle: 'solid' }}></div>
                        <p className="mb-1">Solid (Default)</p>
                        <code className="text-xs text-muted-foreground">--border-style-solid</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted border-2 border-primary rounded-lg mb-3" style={{ borderStyle: 'dashed' }}></div>
                        <p className="mb-1">Dashed</p>
                        <code className="text-xs text-muted-foreground">--border-style-dashed</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted border-2 border-primary rounded-lg mb-3" style={{ borderStyle: 'dotted' }}></div>
                        <p className="mb-1">Dotted</p>
                        <code className="text-xs text-muted-foreground">--border-style-dotted</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted rounded-lg mb-3" style={{ borderStyle: 'none' }}></div>
                        <p className="mb-1">None</p>
                        <code className="text-xs text-muted-foreground">--border-style-none</code>
                      </div>
                    </div>
                  </Card>

                  {/* Outline Width */}
                  <Card className="p-6">
                    <h3 className="mb-2">Outline Width (Focus Rings)</h3>
                    <p className="text-muted-foreground mb-6">Accessibility-focused outline widths</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="h-24 bg-muted rounded-lg mb-3 flex items-center justify-center" style={{ outline: '0px solid var(--ring)' }}>
                          <p>No Outline</p>
                        </div>
                        <p className="mb-1">None (0px)</p>
                        <code className="text-xs text-muted-foreground">--outline-width-0</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted rounded-lg mb-3 flex items-center justify-center" style={{ outline: '2px solid var(--ring)' }}>
                          <p>Default</p>
                        </div>
                        <p className="mb-1">Default (2px) - WCAG</p>
                        <code className="text-xs text-muted-foreground">--outline-width-DEFAULT</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted rounded-lg mb-3 flex items-center justify-center" style={{ outline: '4px solid var(--ring)' }}>
                          <p>High Visibility</p>
                        </div>
                        <p className="mb-1">4px</p>
                        <code className="text-xs text-muted-foreground">--outline-width-4</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted rounded-lg mb-3 flex items-center justify-center" style={{ outline: '8px solid var(--ring)' }}>
                          <p>Accessibility</p>
                        </div>
                        <p className="mb-1">8px - Accessibility Mode</p>
                        <code className="text-xs text-muted-foreground">--outline-width-8</code>
                      </div>
                    </div>
                  </Card>

                  {/* Outline Styles */}
                  <Card className="p-6">
                    <h3 className="mb-2">Outline Styles</h3>
                    <p className="text-muted-foreground mb-6">Focus ring style variations</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="h-24 bg-muted rounded-lg mb-3 flex items-center justify-center" style={{ outline: '3px solid var(--ring)' }}>
                          <p>Solid</p>
                        </div>
                        <p className="mb-1">Solid (Default)</p>
                        <code className="text-xs text-muted-foreground">--outline-style-solid</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted rounded-lg mb-3 flex items-center justify-center" style={{ outline: '3px dashed var(--ring)' }}>
                          <p>Dashed</p>
                        </div>
                        <p className="mb-1">Dashed</p>
                        <code className="text-xs text-muted-foreground">--outline-style-dashed</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted rounded-lg mb-3 flex items-center justify-center" style={{ outline: '3px dotted var(--ring)' }}>
                          <p>Dotted</p>
                        </div>
                        <p className="mb-1">Dotted</p>
                        <code className="text-xs text-muted-foreground">--outline-style-dotted</code>
                      </div>
                      <div>
                        <div className="h-24 bg-muted rounded-lg mb-3 flex items-center justify-center" style={{ outline: 'none' }}>
                          <p>None</p>
                        </div>
                        <p className="mb-1">None</p>
                        <code className="text-xs text-muted-foreground">--outline-style-none</code>
                      </div>
                    </div>
                  </Card>

                  {/* Outline Offset */}
                  <Card className="p-6">
                    <h3 className="mb-2">Outline Offset</h3>
                    <p className="text-muted-foreground mb-6">Distance between element and focus ring</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="h-24 bg-primary rounded-lg mb-3 flex items-center justify-center" style={{ outline: '2px solid var(--ring)', outlineOffset: '0px' }}>
                          <p>No Offset</p>
                        </div>
                        <p className="mb-1">0px - Attached</p>
                        <code className="text-xs text-muted-foreground">--outline-offset-0</code>
                      </div>
                      <div>
                        <div className="h-24 bg-primary rounded-lg mb-3 flex items-center justify-center" style={{ outline: '2px solid var(--ring)', outlineOffset: '2px' }}>
                          <p>Default</p>
                        </div>
                        <p className="mb-1">2px - Visual Clarity</p>
                        <code className="text-xs text-muted-foreground">--outline-offset-DEFAULT</code>
                      </div>
                      <div>
                        <div className="h-24 bg-primary rounded-lg mb-3 flex items-center justify-center" style={{ outline: '2px solid var(--ring)', outlineOffset: '4px' }}>
                          <p>Separated</p>
                        </div>
                        <p className="mb-1">4px - Distinct Separation</p>
                        <code className="text-xs text-muted-foreground">--outline-offset-4</code>
                      </div>
                      <div>
                        <div className="h-24 bg-primary rounded-lg mb-3 flex items-center justify-center" style={{ outline: '2px solid var(--ring)', outlineOffset: '8px' }}>
                          <p>Maximum</p>
                        </div>
                        <p className="mb-1">8px - High Contrast</p>
                        <code className="text-xs text-muted-foreground">--outline-offset-8</code>
                      </div>
                    </div>
                  </Card>

                  {/* Real-World Examples */}
                  <Card className="p-6">
                    <h3 className="mb-2">Real-World Component Examples</h3>
                    <p className="text-muted-foreground mb-6">Borders, radius, and outlines in action</p>
                    <div className="space-y-6">
                      <div>
                        <h4 className="mb-4">Buttons with Radius</h4>
                        <div className="flex flex-wrap gap-4">
                          <Button variant="default">Default Button</Button>
                          <Button variant="outline">Outline Button</Button>
                          <Badge variant="default">Badge (Full Radius)</Badge>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <h4 className="mb-4">Inputs with Border & Radius</h4>
                        <Input placeholder="Input with border..." />
                      </div>
                      <Divider />
                      <div>
                        <h4 className="mb-4">Cards with Border & Radius</h4>
                        <Card className="p-6">
                          <p>This card uses --radius-card (8px) and --border-width-card (1px)</p>
                        </Card>
                      </div>
                      <Divider />
                      <div>
                        <h4 className="mb-4">Focus States (Try tabbing through)</h4>
                        <div className="flex gap-4">
                          <Button variant="outline">Focus Me</Button>
                          <Input placeholder="Tab to focus..." className="max-w-xs" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Focus rings use --outline-width-DEFAULT (2px) with --outline-offset-DEFAULT (2px)
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Shadows & Elevation Section */}
              {foundationTab === 'shadows' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Shadows & Elevation</h2>
                    <p className="text-muted-foreground">
                      8 shadow tokens for creating depth and visual hierarchy
                    </p>
                  </div>

                  {/* Shadow Scale */}
                  <Card className="p-6">
                    <h3 className="mb-2">Shadow Scale</h3>
                    <p className="text-muted-foreground mb-6">Progressive elevation levels from subtle to dramatic</p>
                    <div className="space-y-6">
                      <div>
                        <div className="h-32 bg-card rounded-lg flex items-center justify-center mb-3" style={{ boxShadow: 'var(--shadow-none)' }}>
                          <p className="text-muted-foreground">No Shadow</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p>None</p>
                            <code className="text-xs text-muted-foreground">--shadow-none</code>
                          </div>
                          <p className="text-xs text-muted-foreground">Flat, no elevation</p>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <div className="h-32 bg-card rounded-lg flex items-center justify-center mb-3" style={{ boxShadow: 'var(--shadow-sm)' }}>
                          <p>Small Shadow</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p>Small</p>
                            <code className="text-xs text-muted-foreground">--shadow-sm</code>
                          </div>
                          <p className="text-xs text-muted-foreground">Subtle depth</p>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <div className="h-32 bg-card rounded-lg flex items-center justify-center mb-3" style={{ boxShadow: 'var(--shadow-DEFAULT)' }}>
                          <p>Default Shadow</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p>Default</p>
                            <code className="text-xs text-muted-foreground">--shadow-DEFAULT</code>
                          </div>
                          <p className="text-xs text-muted-foreground">Standard cards, dropdowns</p>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <div className="h-32 bg-card rounded-lg flex items-center justify-center mb-3" style={{ boxShadow: 'var(--shadow-md)' }}>
                          <p>Medium Shadow</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p>Medium</p>
                            <code className="text-xs text-muted-foreground">--shadow-md</code>
                          </div>
                          <p className="text-xs text-muted-foreground">Elevated cards</p>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <div className="h-32 bg-card rounded-lg flex items-center justify-center mb-3" style={{ boxShadow: 'var(--shadow-lg)' }}>
                          <p>Large Shadow</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p>Large</p>
                            <code className="text-xs text-muted-foreground">--shadow-lg</code>
                          </div>
                          <p className="text-xs text-muted-foreground">Modals, dialogs</p>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <div className="h-32 bg-card rounded-lg flex items-center justify-center mb-3" style={{ boxShadow: 'var(--shadow-xl)' }}>
                          <p>Extra Large Shadow</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p>Extra Large</p>
                            <code className="text-xs text-muted-foreground">--shadow-xl</code>
                          </div>
                          <p className="text-xs text-muted-foreground">Major overlays</p>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <div className="h-32 bg-card rounded-lg flex items-center justify-center mb-3" style={{ boxShadow: 'var(--shadow-2xl)' }}>
                          <p>2XL Shadow</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p>2XL</p>
                            <code className="text-xs text-muted-foreground">--shadow-2xl</code>
                          </div>
                          <p className="text-xs text-muted-foreground">Maximum elevation</p>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <div className="h-32 bg-card rounded-lg flex items-center justify-center mb-3" style={{ boxShadow: 'var(--shadow-inner)' }}>
                          <p>Inner Shadow</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p>Inner</p>
                            <code className="text-xs text-muted-foreground">--shadow-inner</code>
                          </div>
                          <p className="text-xs text-muted-foreground">Inset depth effect</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Real-World Shadow Examples */}
                  <Card className="p-6">
                    <h3 className="mb-2">Real-World Examples</h3>
                    <p className="text-muted-foreground mb-6">Shadows in common UI components</p>
                    <div className="space-y-6">
                      <div>
                        <h4 className="mb-4">Card Elevation Levels</h4>
                        <div className="grid md:grid-cols-3 gap-6">
                          <Card className="p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                            <h5 className="mb-2">Low Elevation</h5>
                            <p className="text-muted-foreground">shadow-sm</p>
                          </Card>
                          <Card className="p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
                            <h5 className="mb-2">Medium Elevation</h5>
                            <p className="text-muted-foreground">shadow-md</p>
                          </Card>
                          <Card className="p-6" style={{ boxShadow: 'var(--shadow-lg)' }}>
                            <h5 className="mb-2">High Elevation</h5>
                            <p className="text-muted-foreground">shadow-lg</p>
                          </Card>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <h4 className="mb-4">Button with Shadow</h4>
                        <div className="flex gap-4">
                          <Button variant="default" style={{ boxShadow: 'var(--shadow-sm)' }}>
                            Elevated Button
                          </Button>
                          <div className="rounded-lg p-4 bg-muted" style={{ boxShadow: 'var(--shadow-inner)' }}>
                            Inner Shadow Box
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Effects & Animations Section */}
              {foundationTab === 'effects' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Effects & Animations</h2>
                    <p className="text-muted-foreground">
                      Transition durations, opacity, blur effects, and animation tokens
                    </p>
                  </div>

                  {/* Transition Durations */}
                  <Card className="p-6">
                    <h3 className="mb-2">Transition Durations</h3>
                    <p className="text-muted-foreground mb-6">5 timing values for smooth animations</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Instant</p>
                          <code className="text-xs text-muted-foreground">--transition-duration-instant</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">100ms</p>
                          <p className="text-xs text-muted-foreground">Quick feedback</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Fast</p>
                          <code className="text-xs text-muted-foreground">--transition-duration-fast</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">200ms</p>
                          <p className="text-xs text-muted-foreground">Hover states</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Base</p>
                          <code className="text-xs text-muted-foreground">--transition-duration-base</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">300ms</p>
                          <p className="text-xs text-muted-foreground">Default transitions</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Slow</p>
                          <code className="text-xs text-muted-foreground">--transition-duration-slow</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">500ms</p>
                          <p className="text-xs text-muted-foreground">Modals, drawers</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Slower</p>
                          <code className="text-xs text-muted-foreground">--transition-duration-slower</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">700ms</p>
                          <p className="text-xs text-muted-foreground">Complex animations</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Opacity Values */}
                  <Card className="p-6">
                    <h3 className="mb-2">Opacity Semantic Tokens</h3>
                    <p className="text-muted-foreground mb-6">Consistent opacity states for interactive elements</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Disabled State</p>
                          <code className="text-xs text-muted-foreground">--opacity-disabled</code>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-12 bg-primary rounded" style={{ opacity: 'var(--opacity-disabled)' }}></div>
                          <p className="text-muted-foreground">0.5 (50%)</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Muted</p>
                          <code className="text-xs text-muted-foreground">--opacity-muted</code>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-12 bg-primary rounded" style={{ opacity: 'var(--opacity-muted)' }}></div>
                          <p className="text-muted-foreground">0.6 (60%)</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Overlay</p>
                          <code className="text-xs text-muted-foreground">--opacity-overlay</code>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-12 bg-primary rounded" style={{ opacity: 'var(--opacity-overlay)' }}></div>
                          <p className="text-muted-foreground">0.75 (75%)</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Hover State</p>
                          <code className="text-xs text-muted-foreground">--opacity-hover</code>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-12 bg-primary rounded" style={{ opacity: 'var(--opacity-hover)' }}></div>
                          <p className="text-muted-foreground">0.9 (90%)</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Focus State</p>
                          <code className="text-xs text-muted-foreground">--opacity-focus</code>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-12 bg-primary rounded" style={{ opacity: 'var(--opacity-focus)' }}></div>
                          <p className="text-muted-foreground">0.95 (95%)</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Blur Values */}
                  <Card className="p-6">
                    <h3 className="mb-2">Blur Effects (filter: blur)</h3>
                    <p className="text-muted-foreground mb-6">8 blur intensity levels</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-card/50" style={{ backdropFilter: 'blur(0px)' }}>
                            <div className="h-full flex items-center justify-center">
                              <p>None</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">None (0px)</p>
                        <code className="text-xs text-muted-foreground">--blur-none</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0" style={{ filter: 'blur(4px)' }}>
                            <div className="h-full flex items-center justify-center bg-card/50">
                              <p>Small</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">Small (4px)</p>
                        <code className="text-xs text-muted-foreground">--blur-sm</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0" style={{ filter: 'blur(8px)' }}>
                            <div className="h-full flex items-center justify-center bg-card/50">
                              <p>Default</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">Default (8px)</p>
                        <code className="text-xs text-muted-foreground">--blur-DEFAULT</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0" style={{ filter: 'blur(12px)' }}>
                            <div className="h-full flex items-center justify-center bg-card/50">
                              <p>Medium</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">Medium (12px)</p>
                        <code className="text-xs text-muted-foreground">--blur-md</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0" style={{ filter: 'blur(16px)' }}>
                            <div className="h-full flex items-center justify-center bg-card/50">
                              <p>Large</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">Large (16px)</p>
                        <code className="text-xs text-muted-foreground">--blur-lg</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0" style={{ filter: 'blur(24px)' }}>
                            <div className="h-full flex items-center justify-center bg-card/50">
                              <p>XL</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">XL (24px)</p>
                        <code className="text-xs text-muted-foreground">--blur-xl</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0" style={{ filter: 'blur(40px)' }}>
                            <div className="h-full flex items-center justify-center bg-card/50">
                              <p>2XL</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">2XL (40px)</p>
                        <code className="text-xs text-muted-foreground">--blur-2xl</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0" style={{ filter: 'blur(64px)' }}>
                            <div className="h-full flex items-center justify-center bg-card/50">
                              <p>3XL</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">3XL (64px)</p>
                        <code className="text-xs text-muted-foreground">--blur-3xl</code>
                      </div>
                    </div>
                  </Card>

                  {/* Backdrop Blur */}
                  <Card className="p-6">
                    <h3 className="mb-2">Backdrop Blur (backdrop-filter)</h3>
                    <p className="text-muted-foreground mb-6">Glass morphism effects for modern UI</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-card/50" style={{ backdropFilter: 'blur(0px)' }}>
                            <div className="h-full flex items-center justify-center">
                              <p>None</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">None (0px)</p>
                        <code className="text-xs text-muted-foreground">--backdrop-blur-none</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-card/50" style={{ backdropFilter: 'blur(4px)' }}>
                            <div className="h-full flex items-center justify-center">
                              <p>Small</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">Small (4px)</p>
                        <code className="text-xs text-muted-foreground">--backdrop-blur-sm</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-card/50" style={{ backdropFilter: 'blur(8px)' }}>
                            <div className="h-full flex items-center justify-center">
                              <p>Default</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">Default (8px)</p>
                        <code className="text-xs text-muted-foreground">--backdrop-blur-DEFAULT</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-card/50" style={{ backdropFilter: 'blur(12px)' }}>
                            <div className="h-full flex items-center justify-center">
                              <p>Medium</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">Medium (12px)</p>
                        <code className="text-xs text-muted-foreground">--backdrop-blur-md</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-card/50" style={{ backdropFilter: 'blur(16px)' }}>
                            <div className="h-full flex items-center justify-center">
                              <p>Large</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">Large (16px)</p>
                        <code className="text-xs text-muted-foreground">--backdrop-blur-lg</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-card/50" style={{ backdropFilter: 'blur(24px)' }}>
                            <div className="h-full flex items-center justify-center">
                              <p>XL</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">XL (24px)</p>
                        <code className="text-xs text-muted-foreground">--backdrop-blur-xl</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-card/50" style={{ backdropFilter: 'blur(40px)' }}>
                            <div className="h-full flex items-center justify-center">
                              <p>2XL</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">2XL (40px)</p>
                        <code className="text-xs text-muted-foreground">--backdrop-blur-2xl</code>
                      </div>
                      <div>
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-lg mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-card/50" style={{ backdropFilter: 'blur(64px)' }}>
                            <div className="h-full flex items-center justify-center">
                              <p>3XL</p>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">3XL (64px)</p>
                        <code className="text-xs text-muted-foreground">--backdrop-blur-3xl</code>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Layout & Z-Index Section */}
              {foundationTab === 'layout' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Layout & Z-Index</h2>
                    <p className="text-muted-foreground">
                      Z-index layering system to prevent stacking conflicts
                    </p>
                  </div>

                  {/* Z-Index Tokens */}
                  <Card className="p-6">
                    <h3 className="mb-2">Z-Index Semantic Tokens</h3>
                    <p className="text-muted-foreground mb-6">Consistent component layering (0-1090)</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Base Layer</p>
                          <code className="text-xs text-muted-foreground">--z-index-base</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">0</p>
                          <p className="text-xs text-muted-foreground">Normal document flow</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Dropdown</p>
                          <code className="text-xs text-muted-foreground">--z-index-dropdown</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1000</p>
                          <p className="text-xs text-muted-foreground">Dropdown menus</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Sticky</p>
                          <code className="text-xs text-muted-foreground">--z-index-sticky</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1020</p>
                          <p className="text-xs text-muted-foreground">Sticky headers</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Fixed</p>
                          <code className="text-xs text-muted-foreground">--z-index-fixed</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1030</p>
                          <p className="text-xs text-muted-foreground">Fixed elements</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Modal Backdrop</p>
                          <code className="text-xs text-muted-foreground">--z-index-modal-backdrop</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1040</p>
                          <p className="text-xs text-muted-foreground">Modal overlay</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Modal</p>
                          <code className="text-xs text-muted-foreground">--z-index-modal</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1050</p>
                          <p className="text-xs text-muted-foreground">Modal dialogs</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Popover</p>
                          <code className="text-xs text-muted-foreground">--z-index-popover</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1060</p>
                          <p className="text-xs text-muted-foreground">Popovers</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Tooltip</p>
                          <code className="text-xs text-muted-foreground">--z-index-tooltip</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1070</p>
                          <p className="text-xs text-muted-foreground">Tooltips</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Toast</p>
                          <code className="text-xs text-muted-foreground">--z-index-toast</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1080</p>
                          <p className="text-xs text-muted-foreground">Toast notifications</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Overlay</p>
                          <code className="text-xs text-muted-foreground">--z-index-overlay</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">1090</p>
                          <p className="text-xs text-muted-foreground">Full screen overlays</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Visual Z-Index Demonstration */}
                  <Card className="p-6">
                    <h3 className="mb-2">Visual Layering Example</h3>
                    <p className="text-muted-foreground mb-6">Stacking order demonstration</p>
                    <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                      {/* Base Layer */}
                      <div className="absolute top-4 left-4 w-32 h-32 bg-gray-500 rounded-lg flex items-center justify-center text-white" style={{ zIndex: 0 }}>
                        <div className="text-center">
                          <p>Base</p>
                          <p className="text-xs">z: 0</p>
                        </div>
                      </div>
                      {/* Dropdown */}
                      <div className="absolute top-12 left-12 w-32 h-32 bg-primary rounded-lg flex items-center justify-center text-white" style={{ zIndex: 1000 }}>
                        <div className="text-center">
                          <p>Dropdown</p>
                          <p className="text-xs">z: 1000</p>
                        </div>
                      </div>
                      {/* Sticky */}
                      <div className="absolute top-20 left-20 w-32 h-32 bg-secondary rounded-lg flex items-center justify-center" style={{ zIndex: 1020 }}>
                        <div className="text-center">
                          <p>Sticky</p>
                          <p className="text-xs">z: 1020</p>
                        </div>
                      </div>
                      {/* Modal */}
                      <div className="absolute top-28 left-28 w-32 h-32 bg-success rounded-lg flex items-center justify-center text-white" style={{ zIndex: 1050 }}>
                        <div className="text-center">
                          <p>Modal</p>
                          <p className="text-xs">z: 1050</p>
                        </div>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute top-36 left-36 w-32 h-32 bg-warning rounded-lg flex items-center justify-center" style={{ zIndex: 1070 }}>
                        <div className="text-center">
                          <p>Tooltip</p>
                          <p className="text-xs">z: 1070</p>
                        </div>
                      </div>
                      {/* Toast */}
                      <div className="absolute top-44 left-44 w-32 h-32 bg-info rounded-lg flex items-center justify-center text-white" style={{ zIndex: 1080 }}>
                        <div className="text-center">
                          <p>Toast</p>
                          <p className="text-xs">z: 1080</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Each layer is positioned above the previous, demonstrating the z-index hierarchy
                    </p>
                  </Card>
                </div>
              )}

              {/* Scroll & Touch Section */}
              {foundationTab === 'interactivity' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Scroll & Touch Interactivity</h2>
                    <p className="text-muted-foreground">
                      PWA-critical tokens for scroll behavior and touch optimization
                    </p>
                  </div>

                  {/* Touch Action Tokens */}
                  <Card className="p-6">
                    <h3 className="mb-2">Touch Action (PWA Critical)</h3>
                    <p className="text-muted-foreground mb-6">
                      Controls touch behavior and removes 300ms tap delay on mobile for native app-like responsiveness
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Auto</p>
                          <code className="text-xs text-muted-foreground">--touch-action-auto</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">auto</p>
                          <p className="text-xs text-muted-foreground">Browser default behavior</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>None</p>
                          <code className="text-xs text-muted-foreground">--touch-action-none</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">none</p>
                          <p className="text-xs text-muted-foreground">Disable all touch behaviors</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Pan X</p>
                          <code className="text-xs text-muted-foreground">--touch-action-pan-x</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">pan-x</p>
                          <p className="text-xs text-muted-foreground">Horizontal scrolling only</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Pan Y</p>
                          <code className="text-xs text-muted-foreground">--touch-action-pan-y</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">pan-y</p>
                          <p className="text-xs text-muted-foreground">Vertical scrolling only</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-primary/5">
                        <div>
                          <p>Manipulation ⭐</p>
                          <code className="text-xs text-muted-foreground">--touch-action-manipulation</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">manipulation</p>
                          <p className="text-xs text-muted-foreground">Removes 300ms delay - PWA best practice</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-info/10 border border-info rounded-lg">
                      <h4 className="mb-2 flex items-center gap-2">
                        <span>💡</span>
                        <span>PWA Performance Note</span>
                      </h4>
                      <p className="text-muted-foreground mb-2">
                        All interactive elements (buttons, links) automatically have <code className="text-xs bg-muted px-1 py-0.5 rounded">touch-action: manipulation</code> applied globally via <code className="text-xs bg-muted px-1 py-0.5 rounded">@layer base</code>.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        This eliminates the 300ms tap delay on mobile devices, providing instant feedback for a native app-like experience.
                      </p>
                    </div>
                  </Card>

                  {/* Scroll Behavior Tokens */}
                  <Card className="p-6">
                    <h3 className="mb-2">Scroll Behavior</h3>
                    <p className="text-muted-foreground mb-6">
                      Controls scrolling behavior for anchor navigation and better UX
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p>Auto</p>
                          <code className="text-xs text-muted-foreground">--scroll-behavior-auto</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">auto</p>
                          <p className="text-xs text-muted-foreground">Instant scrolling (browser default)</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-primary/5">
                        <div>
                          <p>Smooth ⭐</p>
                          <code className="text-xs text-muted-foreground">--scroll-behavior-smooth</code>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">smooth</p>
                          <p className="text-xs text-muted-foreground">Animated scrolling - better UX</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-success/10 border border-success rounded-lg">
                      <h4 className="mb-2 flex items-center gap-2">
                        <span>✅</span>
                        <span>Applied Globally</span>
                      </h4>
                      <p className="text-muted-foreground">
                        Smooth scrolling is enabled by default on the <code className="text-xs bg-muted px-1 py-0.5 rounded">&lt;html&gt;</code> element for all anchor link navigation.
                      </p>
                    </div>
                  </Card>

                  {/* Interactive Demo - Scroll Behavior */}
                  <Card className="p-6">
                    <h3 className="mb-2">Interactive Demo: Smooth Scrolling</h3>
                    <p className="text-muted-foreground mb-6">
                      Click the buttons to see smooth scrolling in action
                    </p>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <a href="#demo-section-1" className="inline-flex">
                          <Button variant="outline">Scroll to Section 1</Button>
                        </a>
                        <a href="#demo-section-2" className="inline-flex">
                          <Button variant="outline">Scroll to Section 2</Button>
                        </a>
                        <a href="#demo-section-3" className="inline-flex">
                          <Button variant="outline">Scroll to Section 3</Button>
                        </a>
                      </div>
                      <Divider />
                      <div id="demo-section-1" className="p-6 bg-primary/10 border border-primary rounded-lg">
                        <h4 className="mb-2">📍 Section 1</h4>
                        <p className="text-muted-foreground">
                          Notice how the page smoothly animates to this section instead of jumping instantly.
                        </p>
                      </div>
                      <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Spacer Content</p>
                      </div>
                      <div id="demo-section-2" className="p-6 bg-secondary/10 border border-secondary rounded-lg">
                        <h4 className="mb-2">📍 Section 2</h4>
                        <p className="text-muted-foreground">
                          This smooth scrolling behavior is controlled by <code className="text-xs bg-muted px-1 py-0.5 rounded">--scroll-behavior-smooth</code>.
                        </p>
                      </div>
                      <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Spacer Content</p>
                      </div>
                      <div id="demo-section-3" className="p-6 bg-success/10 border border-success rounded-lg">
                        <h4 className="mb-2">📍 Section 3</h4>
                        <p className="text-muted-foreground">
                          All anchor links in your PWA will automatically have this smooth scrolling behavior.
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Interactive Demo - Touch Action */}
                  <Card className="p-6">
                    <h3 className="mb-2">Interactive Demo: Touch Response</h3>
                    <p className="text-muted-foreground mb-6">
                      Tap these buttons on mobile to experience instant feedback (no 300ms delay)
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-3">Standard Buttons (touch-action: manipulation)</h4>
                        <div className="flex flex-wrap gap-4">
                          <Button 
                            variant="default"
                            onClick={() => alert('Instant feedback! No delay.')}
                          >
                            Tap Me (Instant)
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => alert('Native app-like response!')}
                          >
                            Tap Me Too
                          </Button>
                          <Button 
                            variant="secondary"
                            onClick={() => alert('No 300ms delay!')}
                          >
                            Fast Response
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          On mobile, these buttons respond immediately without the traditional 300ms delay thanks to <code className="bg-muted px-1 py-0.5 rounded">touch-action: manipulation</code>.
                        </p>
                      </div>
                      <Divider />
                      <div>
                        <h4 className="mb-3">Swipeable Container (touch-action: pan-y)</h4>
                        <div className="overflow-x-auto">
                          <div 
                            className="flex gap-4 pb-4 min-w-max"
                            style={{ touchAction: 'pan-y' }}
                          >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <Card key={i} className="p-6 min-w-[200px]">
                                <h5 className="mb-2">Card {i}</h5>
                                <p className="text-muted-foreground">Swipe horizontally →</p>
                              </Card>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          This horizontal scroll container uses <code className="bg-muted px-1 py-0.5 rounded">touch-action: pan-y</code> to allow vertical page scrolling while enabling horizontal swipes.
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Best Practices */}
                  <Card className="p-6">
                    <h3 className="mb-2">Best Practices for PWA Touch & Scroll</h3>
                    <p className="text-muted-foreground mb-6">
                      Guidelines for optimal mobile experience
                    </p>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center">
                          ✓
                        </div>
                        <div>
                          <h4 className="mb-1">Use touch-action: manipulation for all buttons</h4>
                          <p className="text-muted-foreground">
                            This is already applied globally in your design system, providing instant tap feedback across your PWA.
                          </p>
                        </div>
                      </div>
                      <Divider />
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center">
                          ✓
                        </div>
                        <div>
                          <h4 className="mb-1">Enable smooth scrolling for better UX</h4>
                          <p className="text-muted-foreground">
                            Applied globally on <code className="text-xs bg-muted px-1 py-0.5 rounded">&lt;html&gt;</code> for all anchor navigation.
                          </p>
                        </div>
                      </div>
                      <Divider />
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center">
                          ✓
                        </div>
                        <div>
                          <h4 className="mb-1">Use pan-x or pan-y for directional scrolling</h4>
                          <p className="text-muted-foreground">
                            Apply to carousels, horizontal scrollers, or custom scroll containers to control scroll direction.
                          </p>
                        </div>
                      </div>
                      <Divider />
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-warning text-warning-foreground flex items-center justify-center">
                          ⚠
                        </div>
                        <div>
                          <h4 className="mb-1">Avoid touch-action: none unless necessary</h4>
                          <p className="text-muted-foreground">
                            Only use for custom gesture handlers (like drawing canvases). This disables all browser touch behaviors.
                          </p>
                        </div>
                      </div>
                      <Divider />
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-info text-info-foreground flex items-center justify-center">
                          💡
                        </div>
                        <div>
                          <h4 className="mb-1">Test on real mobile devices</h4>
                          <p className="text-muted-foreground">
                            Touch behaviors and scroll performance vary between browsers and devices. Always test on actual hardware.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Token Reference */}
                  <Card className="p-6">
                    <h3 className="mb-2">Complete Token Reference</h3>
                    <p className="text-muted-foreground mb-6">
                      All 7 scroll and touch tokens
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3">Token</th>
                            <th className="text-left p-3">Value</th>
                            <th className="text-left p-3">Use Case</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="p-3">
                              <code className="text-xs">--touch-action-auto</code>
                            </td>
                            <td className="p-3">auto</td>
                            <td className="p-3 text-muted-foreground">Browser default touch behavior</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-3">
                              <code className="text-xs">--touch-action-none</code>
                            </td>
                            <td className="p-3">none</td>
                            <td className="p-3 text-muted-foreground">Custom gesture handlers (canvas, drawing apps)</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-3">
                              <code className="text-xs">--touch-action-pan-x</code>
                            </td>
                            <td className="p-3">pan-x</td>
                            <td className="p-3 text-muted-foreground">Horizontal carousels, image galleries</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-3">
                              <code className="text-xs">--touch-action-pan-y</code>
                            </td>
                            <td className="p-3">pan-y</td>
                            <td className="p-3 text-muted-foreground">Vertical lists with horizontal swipe gestures</td>
                          </tr>
                          <tr className="border-b border-border bg-primary/5">
                            <td className="p-3">
                              <code className="text-xs">--touch-action-manipulation</code>
                            </td>
                            <td className="p-3">manipulation</td>
                            <td className="p-3 text-muted-foreground">⭐ All buttons, links (removes 300ms delay)</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-3">
                              <code className="text-xs">--scroll-behavior-auto</code>
                            </td>
                            <td className="p-3">auto</td>
                            <td className="p-3 text-muted-foreground">Instant scrolling (browser default)</td>
                          </tr>
                          <tr className="bg-primary/5">
                            <td className="p-3">
                              <code className="text-xs">--scroll-behavior-smooth</code>
                            </td>
                            <td className="p-3">smooth</td>
                            <td className="p-3 text-muted-foreground">⭐ Animated scrolling for all anchor links</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}

              {/* Special Purpose Section */}
              {foundationTab === 'special' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Special Purpose Tokens</h2>
                    <p className="text-muted-foreground">
                      Specialized tokens for inputs, focus states, and elevation effects
                    </p>
                  </div>

                  {/* Input Styling Tokens */}
                  <Card className="p-6">
                    <h3 className="mb-2">Input Styling Tokens</h3>
                    <p className="text-muted-foreground mb-6">
                      Specialized tokens for form inputs, text areas, and other input elements
                    </p>
                    
                    <div className="space-y-6">
                      {/* Token Reference Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3">Token</th>
                              <th className="text-left p-3">Value</th>
                              <th className="text-left p-3">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="p-3">
                                <code className="text-xs">--input-background</code>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-12 h-12 rounded border border-border"
                                    style={{ backgroundColor: 'var(--input-background)' }}
                                  />
                                  <code className="text-xs">#ffffff</code>
                                </div>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                Default background for input fields and textareas
                              </td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3">
                                <code className="text-xs">--input</code>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-12 h-12 rounded border border-border"
                                    style={{ backgroundColor: 'var(--input)' }}
                                  />
                                  <code className="text-xs">transparent</code>
                                </div>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                Background color once text is filled (should match input-background or be transparent)
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <Divider />

                      {/* Visual Demo */}
                      <div>
                        <h4 className="mb-4">Visual Demonstration</h4>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="demo-input-1">Standard Input</Label>
                            <Input 
                              id="demo-input-1"
                              placeholder="Uses --input-background token"
                              className="mt-2"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              Background: <code className="bg-muted px-1 py-0.5 rounded">var(--input-background)</code>
                            </p>
                          </div>

                          <div>
                            <Label htmlFor="demo-input-2">Input with Value</Label>
                            <Input 
                              id="demo-input-2"
                              defaultValue="Filled input uses --input token"
                              className="mt-2"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              Background when filled: <code className="bg-muted px-1 py-0.5 rounded">var(--input)</code> (transparent)
                            </p>
                          </div>

                          <div>
                            <Label htmlFor="demo-textarea">Textarea</Label>
                            <Textarea 
                              id="demo-textarea"
                              placeholder="Textareas also use --input-background"
                              rows={3}
                              className="mt-2"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              Background: <code className="bg-muted px-1 py-0.5 rounded">var(--input-background)</code>
                            </p>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Usage Example */}
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="mb-3">CSS Usage Example</h4>
                        <pre className="text-xs overflow-x-auto">
{`/* Custom input styling */
.custom-input {
  background-color: var(--input-background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.custom-input:focus {
  background-color: var(--input);
  outline: 2px solid var(--ring);
}`}
                        </pre>
                      </div>
                    </div>
                  </Card>

                  {/* Focus/Ring Tokens */}
                  <Card className="p-6">
                    <h3 className="mb-2">Focus & Ring Tokens</h3>
                    <p className="text-muted-foreground mb-6">
                      Accessibility-critical tokens for focus indicators and keyboard navigation
                    </p>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                        <h4 className="mb-2 flex items-center gap-2">
                          <span>⚠️</span>
                          <span>Accessibility Critical</span>
                        </h4>
                        <p className="text-muted-foreground">
                          The <code className="text-xs bg-muted px-1 py-0.5 rounded">--ring</code> token is essential for WCAG 2.1 compliance. 
                          It ensures keyboard users can see which element has focus.
                        </p>
                      </div>

                      {/* Token Reference */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3">Token</th>
                              <th className="text-left p-3">Value</th>
                              <th className="text-left p-3">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border bg-primary/5">
                              <td className="p-3">
                                <code className="text-xs">--ring</code>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-12 h-12 rounded border-2"
                                    style={{ borderColor: 'var(--ring)' }}
                                  />
                                  <code className="text-xs">var(--color-primary-500)</code>
                                </div>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                Primary focus ring color for all interactive elements
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <Divider />

                      {/* Interactive Demo */}
                      <div>
                        <h4 className="mb-4">Interactive Focus Demo</h4>
                        <p className="text-muted-foreground mb-4">
                          Click or tab through these elements to see the focus ring in action:
                        </p>
                        <div className="space-y-6">
                          {/* Buttons */}
                          <div>
                            <h5 className="mb-3">Buttons</h5>
                            <div className="flex flex-wrap gap-4">
                              <Button variant="default">Primary Button</Button>
                              <Button variant="outline">Outline Button</Button>
                              <Button variant="secondary">Secondary Button</Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                              Focus ring uses <code className="bg-muted px-1 py-0.5 rounded">var(--ring)</code> with 2px offset
                            </p>
                          </div>

                          <Divider />

                          {/* Inputs */}
                          <div>
                            <h5 className="mb-3">Form Inputs</h5>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="focus-input">Text Input</Label>
                                <Input id="focus-input" placeholder="Click or tab here" className="mt-2" />
                              </div>
                              <div>
                                <Label htmlFor="focus-select">Select Input</Label>
                                <Select>
                                  <option>Option 1</option>
                                  <option>Option 2</option>
                                </Select>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                              Input focus rings use <code className="bg-muted px-1 py-0.5 rounded">var(--ring)</code> color
                            </p>
                          </div>

                          <Divider />

                          {/* Links */}
                          <div>
                            <h5 className="mb-3">Links</h5>
                            <div className="space-y-2">
                              <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-1">
                                Focusable Link 1
                              </a>
                              <br />
                              <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-1">
                                Focusable Link 2
                              </a>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                              Links with <code className="bg-muted px-1 py-0.5 rounded">focus:ring-2 focus:ring-ring</code> classes
                            </p>
                          </div>

                          <Divider />

                          {/* Checkboxes & Radio */}
                          <div>
                            <h5 className="mb-3">Form Controls</h5>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <Checkbox id="focus-check-1" />
                                <Label htmlFor="focus-check-1">Checkbox Option 1</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox id="focus-check-2" />
                                <Label htmlFor="focus-check-2">Checkbox Option 2</Label>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                              Custom form controls use <code className="bg-muted px-1 py-0.5 rounded">var(--ring)</code> on focus
                            </p>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Best Practices */}
                      <Card className="p-4 bg-info/10 border-info">
                        <h4 className="mb-3">Focus Ring Best Practices</h4>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs">
                              ✓
                            </span>
                            <div>
                              <p className="font-medium">Always use --ring for focus indicators</p>
                              <p className="text-xs text-muted-foreground">Ensures brand consistency</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs">
                              ✓
                            </span>
                            <div>
                              <p className="font-medium">Use 2px ring width minimum</p>
                              <p className="text-xs text-muted-foreground">Meets WCAG 2.1 AA requirements</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs">
                              ✓
                            </span>
                            <div>
                              <p className="font-medium">Add ring offset for visual separation</p>
                              <p className="text-xs text-muted-foreground">Use <code className="bg-muted px-1 py-0.5 rounded">ring-offset-2</code> or similar</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs">
                              ✗
                            </span>
                            <div>
                              <p className="font-medium">Never remove focus indicators entirely</p>
                              <p className="text-xs text-muted-foreground">Avoid <code className="bg-muted px-1 py-0.5 rounded">outline: none</code> without replacement</p>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Usage Example */}
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="mb-3">CSS Usage Example</h4>
                        <pre className="text-xs overflow-x-auto">
{`/* Tailwind utility classes */
<button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Button
</button>

/* Custom CSS */
.custom-button:focus {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* Alternative with box-shadow */
.custom-input:focus-visible {
  box-shadow: 0 0 0 2px var(--ring);
}`}
                        </pre>
                      </div>
                    </div>
                  </Card>

                  {/* Elevation Tokens */}
                  <Card className="p-6">
                    <h3 className="mb-2">Elevation Tokens</h3>
                    <p className="text-muted-foreground mb-6">
                      Specialized elevation shadows using rgba syntax (different from standard shadow tokens)
                    </p>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-info/10 border border-info rounded-lg">
                        <h4 className="mb-2 flex items-center gap-2">
                          <span>💡</span>
                          <span>Elevation vs Shadow</span>
                        </h4>
                        <div className="space-y-2">
                          <p className="text-muted-foreground">
                            <strong>Elevation tokens</strong> use <code className="text-xs bg-muted px-1 py-0.5 rounded">rgba(0, 0, 0, 0.X)</code> syntax for compatibility with certain frameworks.
                          </p>
                          <p className="text-muted-foreground">
                            <strong>Shadow tokens</strong> use modern <code className="text-xs bg-muted px-1 py-0.5 rounded">rgb(0 0 0 / X%)</code> syntax.
                          </p>
                          <p className="text-muted-foreground">
                            Both create the same visual effect—use elevation for legacy support.
                          </p>
                        </div>
                      </div>

                      {/* Token Reference */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3">Token</th>
                              <th className="text-left p-3">Value</th>
                              <th className="text-left p-3">Use Case</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="p-3">
                                <code className="text-xs">--elevation-sm</code>
                              </td>
                              <td className="p-3">
                                <code className="text-xs">0 1px 2px 0 rgba(0, 0, 0, 0.05)</code>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                Subtle lift for cards, list items
                              </td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3">
                                <code className="text-xs">--elevation-md</code>
                              </td>
                              <td className="p-3">
                                <code className="text-xs">0 4px 6px -1px rgba(0, 0, 0, 0.1), ...</code>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                Medium elevation for dropdowns, popovers
                              </td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3">
                                <code className="text-xs">--elevation-lg</code>
                              </td>
                              <td className="p-3">
                                <code className="text-xs">0 10px 15px -3px rgba(0, 0, 0, 0.1), ...</code>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                Strong elevation for modals, dialogs
                              </td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3">
                                <code className="text-xs">--elevation-xl</code>
                              </td>
                              <td className="p-3">
                                <code className="text-xs">0 20px 25px -5px rgba(0, 0, 0, 0.1), ...</code>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                Maximum elevation for overlays, tooltips
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <Divider />

                      {/* Visual Demo */}
                      <div>
                        <h4 className="mb-4">Visual Demonstration</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                          <div className="text-center">
                            <div 
                              className="w-full h-32 bg-card rounded-lg flex items-center justify-center mb-3"
                              style={{ boxShadow: 'var(--elevation-sm)' }}
                            >
                              <p className="text-muted-foreground">Small</p>
                            </div>
                            <p className="font-medium mb-1">elevation-sm</p>
                            <code className="text-xs text-muted-foreground">Subtle lift</code>
                          </div>

                          <div className="text-center">
                            <div 
                              className="w-full h-32 bg-card rounded-lg flex items-center justify-center mb-3"
                              style={{ boxShadow: 'var(--elevation-md)' }}
                            >
                              <p className="text-muted-foreground">Medium</p>
                            </div>
                            <p className="font-medium mb-1">elevation-md</p>
                            <code className="text-xs text-muted-foreground">Dropdown height</code>
                          </div>

                          <div className="text-center">
                            <div 
                              className="w-full h-32 bg-card rounded-lg flex items-center justify-center mb-3"
                              style={{ boxShadow: 'var(--elevation-lg)' }}
                            >
                              <p className="text-muted-foreground">Large</p>
                            </div>
                            <p className="font-medium mb-1">elevation-lg</p>
                            <code className="text-xs text-muted-foreground">Modal height</code>
                          </div>

                          <div className="text-center">
                            <div 
                              className="w-full h-32 bg-card rounded-lg flex items-center justify-center mb-3"
                              style={{ boxShadow: 'var(--elevation-xl)' }}
                            >
                              <p className="text-muted-foreground">Extra Large</p>
                            </div>
                            <p className="font-medium mb-1">elevation-xl</p>
                            <code className="text-xs text-muted-foreground">Maximum depth</code>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Stacking Demo */}
                      <div>
                        <h4 className="mb-4">Elevation Hierarchy Demo</h4>
                        <p className="text-muted-foreground mb-4">
                          Different elevations create visual hierarchy and component stacking:
                        </p>
                        <div className="relative h-80 bg-muted/30 rounded-lg p-8">
                          {/* Base layer */}
                          <div 
                            className="absolute inset-8 bg-card rounded-lg flex items-center justify-center"
                            style={{ boxShadow: 'var(--elevation-sm)' }}
                          >
                            <p className="text-muted-foreground">Base Card (sm)</p>
                          </div>

                          {/* Medium layer */}
                          <div 
                            className="absolute top-16 left-16 right-16 bottom-16 bg-card rounded-lg flex items-center justify-center"
                            style={{ boxShadow: 'var(--elevation-md)' }}
                          >
                            <p className="text-muted-foreground">Dropdown (md)</p>
                          </div>

                          {/* Large layer */}
                          <div 
                            className="absolute top-24 left-24 right-24 bottom-24 bg-card rounded-lg flex items-center justify-center"
                            style={{ boxShadow: 'var(--elevation-lg)' }}
                          >
                            <p className="text-muted-foreground">Modal (lg)</p>
                          </div>

                          {/* XL layer */}
                          <div 
                            className="absolute top-32 left-32 right-32 bottom-32 bg-card rounded-lg flex items-center justify-center"
                            style={{ boxShadow: 'var(--elevation-xl)' }}
                          >
                            <p className="font-medium">Tooltip (xl)</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 text-center">
                          Each layer uses progressively stronger elevation to appear "above" the previous layer
                        </p>
                      </div>

                      <Divider />

                      {/* Comparison with Shadow Tokens */}
                      <Card className="p-4 bg-muted">
                        <h4 className="mb-3">When to Use Elevation vs Shadow</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="mb-2 flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs">E</span>
                              <span>Elevation Tokens</span>
                            </h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Legacy browser support needed</li>
                              <li>• Working with older frameworks</li>
                              <li>• rgba() syntax required</li>
                              <li>• Component libraries compatibility</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="mb-2 flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-secondary text-secondary-foreground flex items-center justify-center text-xs">S</span>
                              <span>Shadow Tokens</span>
                            </h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Modern browser support (default)</li>
                              <li>• Cleaner CSS syntax</li>
                              <li>• Better Tailwind integration</li>
                              <li>• Recommended for new projects</li>
                            </ul>
                          </div>
                        </div>
                      </Card>

                      {/* Usage Example */}
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="mb-3">CSS Usage Example</h4>
                        <pre className="text-xs overflow-x-auto">
{`/* Using elevation tokens */
.card {
  box-shadow: var(--elevation-sm);
}

.dropdown {
  box-shadow: var(--elevation-md);
}

.modal {
  box-shadow: var(--elevation-lg);
}

.tooltip {
  box-shadow: var(--elevation-xl);
}

/* Hover effects */
.card:hover {
  box-shadow: var(--elevation-md);
  transition: box-shadow 200ms ease;
}`}
                        </pre>
                      </div>
                    </div>
                  </Card>

                  {/* Summary Card */}
                  <Card className="p-6 bg-primary/5 border-primary">
                    <h3 className="mb-4">Special Purpose Tokens Summary</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="mb-2 flex items-center gap-2">
                          <span>📝</span>
                          <span>Input Styling</span>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">2 tokens for form inputs</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• --input-background</li>
                          <li>• --input</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 flex items-center gap-2">
                          <span>🎯</span>
                          <span>Focus & Ring</span>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">1 critical accessibility token</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• --ring (WCAG required)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 flex items-center gap-2">
                          <span>⬆️</span>
                          <span>Elevation</span>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">4 elevation levels</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• --elevation-sm</li>
                          <li>• --elevation-md</li>
                          <li>• --elevation-lg</li>
                          <li>• --elevation-xl</li>
                        </ul>
                      </div>
                    </div>
                    <Divider className="my-6" />
                    <p className="text-center text-muted-foreground">
                      <strong>Total: 7 specialized tokens</strong> for forms, accessibility, and elevation effects
                    </p>
                  </Card>
                </div>
              )}

              {/* Interactive States Section */}
              {foundationTab === 'states' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Interactive States</h2>
                    <p className="text-muted-foreground">
                      Hover, active, focus, and disabled states for interactive elements
                    </p>
                  </div>

                  {/* Button States */}
                  <div>
                    <h3 className="mb-4">Button States</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h4 className="mb-4">Primary Button</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Default</p>
                            <Button variant="default">Primary Button</Button>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Hover (hover over it)</p>
                            <Button variant="default">Hover Me</Button>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Disabled</p>
                            <Button variant="default" disabled>Disabled</Button>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-6">
                        <h4 className="mb-4">Secondary Button</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Default</p>
                            <Button variant="secondary">Secondary Button</Button>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Hover (hover over it)</p>
                            <Button variant="secondary">Hover Me</Button>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Disabled</p>
                            <Button variant="secondary" disabled>Disabled</Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Input States */}
                  <div>
                    <h3 className="mb-4">Input States</h3>
                    <Card className="p-6">
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="default-input">Default State</Label>
                          <Input id="default-input" placeholder="Type something..." />
                        </div>
                        <Divider />
                        <div>
                          <Label htmlFor="focused-input">Focused State (click inside)</Label>
                          <Input id="focused-input" placeholder="Click to focus..." />
                        </div>
                        <Divider />
                        <div>
                          <Label htmlFor="disabled-input">Disabled State</Label>
                          <Input id="disabled-input" placeholder="Disabled" disabled />
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Interactive Elements */}
                  <div>
                    <h3 className="mb-4">Switch & Checkbox States</h3>
                    <Card className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                          <Label>Toggle Switch</Label>
                        </div>
                        <Divider />
                        <div className="flex items-center gap-4">
                          <Switch disabled />
                          <Label>Disabled Switch</Label>
                        </div>
                        <Divider />
                        <div className="flex items-center gap-4">
                          <Checkbox checked={checkboxChecked} onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)} />
                          <Label>Checkbox</Label>
                        </div>
                        <Divider />
                        <div className="flex items-center gap-4">
                          <Checkbox disabled />
                          <Label>Disabled Checkbox</Label>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Icons Section */}
              {foundationTab === 'icons' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Icons</h2>
                    <p className="text-muted-foreground">
                      Icon assets from the design system stored in Supabase Storage
                    </p>
                  </div>

                  {loadingIcons && (
                    <div className="flex items-center justify-center py-12">
                      <LoadingSpinner size="lg" />
                    </div>
                  )}

                  {assetsError && !loadingIcons && (
                    <Alert variant="destructive">
                      <AlertTitle>Error Loading Icons</AlertTitle>
                      <AlertDescription>{assetsError}</AlertDescription>
                    </Alert>
                  )}

                  {!loadingIcons && !assetsError && icons.length === 0 && (
                    <EmptyState
                      icon={<InboxIcon />}
                      title="No Icons Found"
                      description="The Icon bucket appears to be empty"
                    />
                  )}

                  {!loadingIcons && icons.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {icons.map((icon) => (
                        <Card key={icon.name} className="p-4 flex flex-col items-center gap-3 hover:border-primary transition-colors">
                          <div className="w-16 h-16 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                            <img
                              src={icon.signedUrl}
                              alt={icon.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <p className="text-xs text-center text-muted-foreground truncate w-full" title={icon.name}>
                            {icon.name}
                          </p>
                        </Card>
                      ))}
                    </div>
                  )}

                  {!loadingIcons && icons.length > 0 && (
                    <p className="text-center text-muted-foreground">
                      <strong>{icons.length} icon{icons.length !== 1 ? 's' : ''}</strong> available in the design system
                    </p>
                  )}
                </div>
              )}

              {/* Illustrations Section */}
              {foundationTab === 'illustrations' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Illustrations</h2>
                    <p className="text-muted-foreground">
                      Illustration assets from the design system stored in Supabase Storage
                    </p>
                  </div>

                  {loadingIllustrations && (
                    <div className="flex items-center justify-center py-12">
                      <LoadingSpinner size="lg" />
                    </div>
                  )}

                  {assetsError && !loadingIllustrations && (
                    <Alert variant="destructive">
                      <AlertTitle>Error Loading Illustrations</AlertTitle>
                      <AlertDescription>{assetsError}</AlertDescription>
                    </Alert>
                  )}

                  {!loadingIllustrations && !assetsError && illustrations.length === 0 && (
                    <EmptyState
                      icon={<InboxIcon />}
                      title="No Illustrations Found"
                      description="The illus bucket appears to be empty"
                    />
                  )}

                  {!loadingIllustrations && illustrations.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {illustrations.map((illustration) => (
                        <Card key={illustration.name} className="p-4 flex flex-col gap-3 hover:border-primary transition-colors">
                          <div className="w-full aspect-square flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                            <img
                              src={illustration.signedUrl}
                              alt={illustration.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <p className="text-xs text-center text-muted-foreground truncate w-full" title={illustration.name}>
                            {illustration.name}
                          </p>
                        </Card>
                      ))}
                    </div>
                  )}

                  {!loadingIllustrations && illustrations.length > 0 && (
                    <p className="text-center text-muted-foreground">
                      <strong>{illustrations.length} illustration{illustrations.length !== 1 ? 's' : ''}</strong> available in the design system
                    </p>
                  )}
                </div>
              )}

              {/* Logos Section */}
              {foundationTab === 'logos' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Logos</h2>
                    <p className="text-muted-foreground">
                      Logo assets from the design system stored in Supabase Storage
                    </p>
                  </div>

                  {loadingLogos && (
                    <div className="flex items-center justify-center py-12">
                      <LoadingSpinner size="lg" />
                    </div>
                  )}

                  {assetsError && !loadingLogos && (
                    <Alert variant="destructive">
                      <AlertTitle>Error Loading Logos</AlertTitle>
                      <AlertDescription>{assetsError}</AlertDescription>
                    </Alert>
                  )}

                  {!loadingLogos && !assetsError && logos.length === 0 && (
                    <EmptyState
                      icon={<InboxIcon />}
                      title="No Logos Found"
                      description="The Logos bucket appears to be empty"
                    />
                  )}

                  {!loadingLogos && logos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {logos.map((logo) => (
                        <Card key={logo.name} className="p-6 flex flex-col items-center gap-3 hover:border-primary transition-colors">
                          <div className="w-full aspect-square flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                            <img
                              src={logo.signedUrl}
                              alt={logo.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <p className="text-xs text-center text-muted-foreground truncate w-full" title={logo.name}>
                            {logo.name}
                          </p>
                        </Card>
                      ))}
                    </div>
                  )}

                  {!loadingLogos && logos.length > 0 && (
                    <p className="text-center text-muted-foreground">
                      <strong>{logos.length} logo{logos.length !== 1 ? 's' : ''}</strong> available in the design system
                    </p>
                  )}
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* Components Tab Content */}
      {mainTab === 'components' && (
        <>
          {/* Secondary Navigation - Tier 2 */}
          <nav className="border-b border-border bg-card sticky top-[144px] md:top-[152px] z-40">
            <div className="max-w-7xl mx-auto px-4">
              <div className="overflow-x-auto">
                <Tabs
                  tabs={[
                    { id: 'navigation', label: 'Navigation' },
                    { id: 'actions', label: 'Actions' },
                    { id: 'inputs', label: 'Inputs' },
                    { id: 'display', label: 'Display' },
                    { id: 'feedback', label: 'Feedback' },
                    { id: 'lists', label: 'Lists & Tables' },
                    { id: 'layout', label: 'Layout' },
                    { id: 'dialogs', label: 'Dialogs' },
                    { id: 'menus', label: 'Menus' },
                    { id: 'overlays', label: 'Overlays' },
                  ]}
                  activeTab={componentsTab}
                  onChange={setComponentsTab}
                />
              </div>
            </div>
          </nav>

          {/* Components Content */}
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-12">
              {/* Navigation Components */}
              {componentsTab === 'navigation' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Navigation Components</h2>
                    <p className="text-muted-foreground">
                      Components for app navigation and content organization
                    </p>
                  </div>

                  {/* Tabs Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Tabs</h3>
                      <p className="text-muted-foreground mb-4">
                        Tab navigation component with default and pills variants, badge support
                      </p>
                    </div>

                    <Card className="p-6">
                      {/* Default Variant */}
                      <div>
                        <h4 className="mb-4">Default Variant (Underline)</h4>
                        <p className="text-muted-foreground mb-4">
                          Classic tab navigation with bottom border indicator
                        </p>
                        <div className="space-y-4">
                          <TabsExample1 />
                        </div>
                      </div>

                      <Divider />

                      {/* Pills Variant */}
                      <div>
                        <h4 className="mb-4">Pills Variant (Rounded)</h4>
                        <p className="text-muted-foreground mb-4">
                          Modern pill-style tabs with background highlight
                        </p>
                        <div className="space-y-4">
                          <TabsExample2 />
                        </div>
                      </div>

                      <Divider />

                      {/* With Badges */}
                      <div>
                        <h4 className="mb-4">Tabs with Badges</h4>
                        <p className="text-muted-foreground mb-4">
                          Add notification counts or status indicators to tabs
                        </p>
                        <div className="space-y-6">
                          <div>
                            <p className="text-sm mb-3">Default variant with badges:</p>
                            <TabsExample3 />
                          </div>
                          <div>
                            <p className="text-sm mb-3">Pills variant with badges:</p>
                            <TabsExample4 />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* TopBar Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">TopBar</h3>
                      <p className="text-muted-foreground mb-4">
                        Application header with title, optional back button, and action buttons
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Basic TopBar</h4>
                      <div className="border border-border rounded-lg overflow-hidden">
                        <div className="bg-background">
                          <div className="border-b border-border bg-card">
                            <div className="px-4 py-4 flex items-center justify-between">
                              <h3>Dashboard</h3>
                              <div className="flex items-center gap-2">
                                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-muted active:bg-muted transition-colors">
                                  <BellIcon className="size-5" />
                                </button>
                                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-muted active:bg-muted transition-colors">
                                  <UserIcon className="size-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-muted-foreground">TopBar provides consistent app header across all screens</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">title</code> - Header title text</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">showBackButton</code> - Optional back button</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">onBackClick</code> - Back button callback</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">actions</code> - Action buttons (React nodes)</p>
                      </div>
                    </Card>
                  </div>

                  {/* BottomNav Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">BottomNav</h3>
                      <p className="text-muted-foreground mb-4">
                        Mobile-first bottom navigation bar with badge support
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Bottom Navigation Example</h4>
                      <div className="border border-border rounded-lg overflow-hidden">
                        <div className="bg-background min-h-[300px] flex flex-col">
                          <div className="flex-1 p-6">
                            <p className="text-muted-foreground">Main content area</p>
                          </div>
                          <div className="border-t border-border bg-card">
                            <div className="flex items-center justify-around px-4 py-3">
                              {[
                                { icon: <HomeIcon className="size-5" />, label: 'Home', active: true },
                                { icon: <SearchIcon className="size-5" />, label: 'Search', badge: 3 },
                                { icon: <BellIcon className="size-5" />, label: 'Alerts', badge: 12 },
                                { icon: <UserIcon className="size-5" />, label: 'Profile' },
                              ].map((item, i) => (
                                <button
                                  key={i}
                                  className={`flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center rounded-lg px-3 py-2 transition-colors ${
                                    item.active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                  }`}
                                >
                                  <div className="relative">
                                    {item.icon}
                                    {item.badge && (
                                      <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full size-4 flex items-center justify-center">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-xs">{item.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">items</code> - Navigation items array (id, label, icon, badge)</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">activeId</code> - Currently active item id</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">onItemClick</code> - Callback when item is clicked</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Actions Components */}
              {componentsTab === 'actions' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Actions Components</h2>
                    <p className="text-muted-foreground">
                      Buttons and action triggers for user interactions
                    </p>
                  </div>

                  {/* Button Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Button</h3>
                      <p className="text-muted-foreground mb-4">
                        Flexible button component with multiple variants, sizes, and states from /components/library/Button.tsx
                      </p>
                    </div>

                    <Card className="p-6">
                      {/* All Variants */}
                      <div className="mb-6">
                        <h4 className="mb-4">Button Variants</h4>
                        <p className="text-muted-foreground mb-4">
                          Six button variants for different use cases and visual hierarchy
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button variant="default">Default</Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                          <Button variant="destructive">Destructive</Button>
                          <Button variant="link">Link</Button>
                        </div>
                      </div>

                      <Divider />

                      {/* Sizes */}
                      <div className="mb-6">
                        <h4 className="mb-4">Button Sizes</h4>
                        <p className="text-muted-foreground mb-4">
                          Three size options: small, default, and large
                        </p>
                        <div className="flex flex-wrap gap-3 items-center">
                          <Button size="sm">Small</Button>
                          <Button size="default">Default</Button>
                          <Button size="lg">Large</Button>
                        </div>
                      </div>

                      <Divider />

                      {/* With Icons */}
                      <div className="mb-6">
                        <h4 className="mb-4">Buttons with Icons</h4>
                        <p className="text-muted-foreground mb-4">
                          Combine buttons with icons for better visual communication
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button variant="default">
                            <PlusIcon className="size-4" />
                            Add Item
                          </Button>
                          <Button variant="outline">
                            <CheckIcon className="size-4" />
                            Confirm
                          </Button>
                          <Button variant="destructive">
                            <Trash2Icon className="size-4" />
                            Delete
                          </Button>
                          <Button variant="ghost">
                            <SettingsIcon className="size-4" />
                            Settings
                          </Button>
                        </div>
                      </div>

                      <Divider />

                      {/* Icon Only */}
                      <div className="mb-6">
                        <h4 className="mb-4">Icon Buttons</h4>
                        <p className="text-muted-foreground mb-4">
                          Square buttons with icons only, perfect for compact UIs
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button variant="default" size="icon">
                            <PlusIcon className="size-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <SearchIcon className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreVerticalIcon className="size-4" />
                          </Button>
                        </div>
                      </div>

                      <Divider />

                      {/* States */}
                      <div className="mb-6">
                        <h4 className="mb-4">Button States</h4>
                        <p className="text-muted-foreground mb-4">
                          Normal and disabled states for all variants
                        </p>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-3">
                            <Button variant="default">Normal</Button>
                            <Button variant="default" disabled>Disabled</Button>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <Button variant="outline">Normal</Button>
                            <Button variant="outline" disabled>Disabled</Button>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <Button variant="destructive">Normal</Button>
                            <Button variant="destructive" disabled>Disabled</Button>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Full Width */}
                      <div>
                        <h4 className="mb-4">Full Width Buttons</h4>
                        <p className="text-muted-foreground mb-4">
                          Buttons that span the full container width
                        </p>
                        <div className="space-y-3">
                          <Button variant="default" className="w-full">Full Width Default</Button>
                          <Button variant="outline" className="w-full">Full Width Outline</Button>
                        </div>
                      </div>
                    </Card>

                    {/* API Reference */}
                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Button Props</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-background px-2 py-1 rounded">variant</code> - "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">size</code> - "sm" | "default" | "lg" | "icon"</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">disabled</code> - Boolean to disable button</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">asChild</code> - Compose with other elements</p>
                      </div>
                    </Card>
                  </div>

                  {/* FloatingActionButton Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">FloatingActionButton (FAB)</h3>
                      <p className="text-muted-foreground mb-4">
                        Primary action button that floats above content, commonly used for main screen actions
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">FAB Positions</h4>
                      <p className="text-muted-foreground mb-4">
                        FloatingActionButton can be positioned in corners of the screen
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm mb-3">Bottom Right (Default):</p>
                          <div className="relative h-64 bg-muted rounded-lg border border-border overflow-hidden">
                            <div className="p-4">
                              <p className="text-sm text-muted-foreground">Main content area</p>
                            </div>
                            <FloatingActionButton
                              icon={<PlusIcon />}
                              onClick={() => {}}
                              ariaLabel="Add item"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm mb-3">With Label:</p>
                          <div className="relative h-64 bg-muted rounded-lg border border-border overflow-hidden">
                            <div className="p-4">
                              <p className="text-sm text-muted-foreground">Main content area</p>
                            </div>
                            <FloatingActionButton
                              icon={<EditIcon />}
                              label="Compose"
                              onClick={() => {}}
                              ariaLabel="Compose new message"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">FAB Variants</h4>
                      <p className="text-muted-foreground mb-4">
                        Different icon options for various primary actions
                      </p>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm mb-3">Add Action:</p>
                          <div className="relative h-48 bg-muted rounded-lg border border-border overflow-hidden">
                            <FloatingActionButton
                              icon={<PlusIcon />}
                              onClick={() => {}}
                              ariaLabel="Add"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm mb-3">Edit Action:</p>
                          <div className="relative h-48 bg-muted rounded-lg border border-border overflow-hidden">
                            <FloatingActionButton
                              icon={<EditIcon />}
                              onClick={() => {}}
                              ariaLabel="Edit"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm mb-3">Settings Action:</p>
                          <div className="relative h-48 bg-muted rounded-lg border border-border overflow-hidden">
                            <FloatingActionButton
                              icon={<SettingsIcon />}
                              onClick={() => {}}
                              ariaLabel="Settings"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">Extended FAB</h4>
                      <p className="text-muted-foreground mb-4">
                        FloatingActionButton with text label for better context
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm mb-3">Create New:</p>
                          <div className="relative h-48 bg-muted rounded-lg border border-border overflow-hidden">
                            <FloatingActionButton
                              icon={<PlusIcon />}
                              label="Create"
                              onClick={() => {}}
                              ariaLabel="Create new item"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm mb-3">Share Content:</p>
                          <div className="relative h-48 bg-muted rounded-lg border border-border overflow-hidden">
                            <FloatingActionButton
                              icon={<ShareIcon />}
                              label="Share"
                              onClick={() => {}}
                              ariaLabel="Share content"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">FloatingActionButton Props</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-background px-2 py-1 rounded">icon</code> - Icon element to display (required)</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">onClick</code> - Click handler callback</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">ariaLabel</code> - Accessibility label (required)</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">label</code> - Optional text label for extended FAB</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">className</code> - Additional CSS classes</p>
                      </div>
                    </Card>
                  </div>

                </div>
              )}

              {/* Input Components */}
              {componentsTab === 'inputs' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Input Components</h2>
                    <p className="text-muted-foreground">
                      Form inputs and interactive controls
                    </p>
                  </div>

                  {/* Input Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Input</h3>
                      <p className="text-muted-foreground mb-4">
                        Text input field component with support for all HTML input types from /components/library/Input.tsx
                      </p>
                    </div>

                    <Card className="p-6">
                      {/* Basic Inputs */}
                      <div className="mb-6">
                        <h4 className="mb-4">Basic Input Fields</h4>
                        <p className="text-muted-foreground mb-4">
                          Standard text input fields with labels and placeholders
                        </p>
                        <div className="space-y-4 max-w-md">
                          <div>
                            <Label htmlFor="input-text">Text Input</Label>
                            <Input
                              id="input-text"
                              type="text"
                              placeholder="Enter your name..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="input-email">Email Input</Label>
                            <Input
                              id="input-email"
                              type="email"
                              placeholder="your.email@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="input-password">Password Input</Label>
                            <Input
                              id="input-password"
                              type="password"
                              placeholder="Enter password..."
                            />
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Input States */}
                      <div className="mb-6">
                        <h4 className="mb-4">Input States</h4>
                        <p className="text-muted-foreground mb-4">
                          Normal, disabled, and error states
                        </p>
                        <div className="space-y-4 max-w-md">
                          <div>
                            <Label htmlFor="input-normal">Normal State</Label>
                            <Input
                              id="input-normal"
                              type="text"
                              placeholder="Normal input..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="input-disabled" className="text-muted-foreground">Disabled State</Label>
                            <Input
                              id="input-disabled"
                              type="text"
                              placeholder="Disabled input..."
                              disabled
                            />
                          </div>
                          <div>
                            <Label htmlFor="input-error" className="text-destructive">Error State</Label>
                            <Input
                              id="input-error"
                              type="text"
                              placeholder="Invalid input..."
                              aria-invalid="true"
                              className="border-destructive"
                            />
                            <p className="text-xs text-destructive mt-1">This field is required</p>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Input with Icons */}
                      <div className="mb-6">
                        <h4 className="mb-4">Input with Icons</h4>
                        <p className="text-muted-foreground mb-4">
                          Input fields with leading icons for better visual context
                        </p>
                        <div className="space-y-4 max-w-md">
                          <div>
                            <Label htmlFor="input-search">Search</Label>
                            <div className="relative">
                              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                              <Input
                                id="input-search"
                                type="text"
                                placeholder="Search..."
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="input-user">Username</Label>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                              <Input
                                id="input-user"
                                type="text"
                                placeholder="johndoe"
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="input-mail">Email with Icon</Label>
                            <div className="relative">
                              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                              <Input
                                id="input-mail"
                                type="email"
                                placeholder="email@example.com"
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Input Types */}
                      <div>
                        <h4 className="mb-4">Input Types</h4>
                        <p className="text-muted-foreground mb-4">
                          Support for various HTML5 input types
                        </p>
                        <div className="space-y-4 max-w-md">
                          <div>
                            <Label htmlFor="input-number">Number</Label>
                            <Input
                              id="input-number"
                              type="number"
                              placeholder="0"
                              min="0"
                              max="100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="input-date">Date</Label>
                            <Input
                              id="input-date"
                              type="date"
                            />
                          </div>
                          <div>
                            <Label htmlFor="input-time">Time</Label>
                            <Input
                              id="input-time"
                              type="time"
                            />
                          </div>
                          <div>
                            <Label htmlFor="input-url">URL</Label>
                            <Input
                              id="input-url"
                              type="url"
                              placeholder="https://example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="input-tel">Telephone</Label>
                            <Input
                              id="input-tel"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* API Reference */}
                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Input Props</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-background px-2 py-1 rounded">type</code> - "text" | "email" | "password" | "number" | "date" | "time" | "url" | "tel" | etc.</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">placeholder</code> - Placeholder text</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">disabled</code> - Boolean to disable input</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">aria-invalid</code> - Boolean to indicate error state</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">value / onChange</code> - Controlled input</p>
                      </div>
                    </Card>
                  </div>

                  {/* Other Input Controls */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Other Form Controls</h3>
                      <p className="text-muted-foreground mb-4">
                        Additional input components for different interaction patterns
                      </p>
                    </div>

                    <Card className="p-6">
                      {/* Textarea */}
                      <div className="mb-6">
                        <h4 className="mb-4">Textarea</h4>
                        <p className="text-muted-foreground mb-4">
                          Multi-line text input for longer content
                        </p>
                        <div className="max-w-md">
                          <Label htmlFor="textarea-example">Description</Label>
                          <Textarea
                            id="textarea-example"
                            placeholder="Enter a detailed description..."
                            rows={4}
                          />
                        </div>
                      </div>

                      <Divider />

                      {/* Switch */}
                      <div className="mb-6">
                        <h4 className="mb-4">Switch</h4>
                        <p className="text-muted-foreground mb-4">
                          Toggle switch for binary choices
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Switch id="switch-1" />
                            <Label htmlFor="switch-1">Enable notifications</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch id="switch-2" defaultChecked />
                            <Label htmlFor="switch-2">Auto-save enabled</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch id="switch-3" disabled />
                            <Label htmlFor="switch-3" className="text-muted-foreground">Disabled option</Label>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Checkbox */}
                      <div className="mb-6">
                        <h4 className="mb-4">Checkbox</h4>
                        <p className="text-muted-foreground mb-4">
                          Checkbox for multiple selections
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Checkbox id="checkbox-1" />
                            <Label htmlFor="checkbox-1">Accept terms and conditions</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox id="checkbox-2" defaultChecked />
                            <Label htmlFor="checkbox-2">Subscribe to newsletter</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox id="checkbox-3" disabled />
                            <Label htmlFor="checkbox-3" className="text-muted-foreground">Unavailable option</Label>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Radio Group */}
                      <div className="mb-6">
                        <h4 className="mb-4">Radio Group</h4>
                        <p className="text-muted-foreground mb-4">
                          Radio buttons for single selection from multiple options
                        </p>
                        <RadioGroup defaultValue="option-1">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="option-1" id="radio-1" />
                            <Label htmlFor="radio-1">Option 1</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="option-2" id="radio-2" />
                            <Label htmlFor="radio-2">Option 2</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="option-3" id="radio-3" />
                            <Label htmlFor="radio-3">Option 3</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Divider />

                      {/* Slider */}
                      <div>
                        <h4 className="mb-4">Slider</h4>
                        <p className="text-muted-foreground mb-4">
                          Range slider for numeric value selection
                        </p>
                        <div className="space-y-6 max-w-md">
                          <div>
                            <Label>Volume</Label>
                            <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
                          </div>
                          <div>
                            <Label>Brightness</Label>
                            <Slider defaultValue={[75]} max={100} step={1} className="mt-2" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* SearchBar Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">SearchBar</h3>
                      <p className="text-muted-foreground mb-4">
                        Dedicated search input component with integrated icon and clear functionality
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">SearchBar Examples</h4>
                      <p className="text-muted-foreground mb-4">
                        Pre-configured search input with icon, optimized for search patterns
                      </p>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="search-basic">Basic Search</Label>
                          <SearchBar
                            id="search-basic"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="search-products">Search Products</Label>
                          <SearchBar
                            id="search-products"
                            placeholder="Search products, categories..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="search-disabled" className="text-muted-foreground">Disabled State</Label>
                          <SearchBar
                            id="search-disabled"
                            placeholder="Search disabled..."
                            disabled
                          />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">SearchBar Props</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-background px-2 py-1 rounded">placeholder</code> - Placeholder text</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">value / onChange</code> - Controlled input</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">disabled</code> - Boolean to disable search</p>
                      </div>
                    </Card>
                  </div>

                  {/* Select Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Select (Dropdown)</h3>
                      <p className="text-muted-foreground mb-4">
                        Feature-rich dropdown select component with search and grouping support
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Basic Select</h4>
                      <p className="text-muted-foreground mb-4">
                        Single selection dropdown with custom styling
                      </p>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="select-country">Country</Label>
                          <Select>
                            <SelectTrigger id="select-country">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="select-priority">Priority</Label>
                          <Select>
                            <SelectTrigger id="select-priority">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">Select with Groups</h4>
                      <p className="text-muted-foreground mb-4">
                        Organized options with section labels
                      </p>
                      <div className="max-w-md">
                        <Label htmlFor="select-grouped">Timezone</Label>
                        <Select>
                          <SelectTrigger id="select-grouped">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>North America</SelectLabel>
                              <SelectItem value="est">Eastern Time</SelectItem>
                              <SelectItem value="cst">Central Time</SelectItem>
                              <SelectItem value="mst">Mountain Time</SelectItem>
                              <SelectItem value="pst">Pacific Time</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Europe</SelectLabel>
                              <SelectItem value="gmt">GMT</SelectItem>
                              <SelectItem value="cet">Central European Time</SelectItem>
                              <SelectItem value="eet">Eastern European Time</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Select Props</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-background px-2 py-1 rounded">SelectTrigger</code> - Clickable button to open dropdown</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">SelectValue</code> - Displays selected value or placeholder</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">SelectContent</code> - Dropdown content wrapper</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">SelectItem</code> - Individual option</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">SelectGroup</code> - Group wrapper for sections</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">SelectLabel</code> - Section label</p>
                      </div>
                    </Card>
                  </div>

                  {/* Chip Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Chip (Tags)</h3>
                      <p className="text-muted-foreground mb-4">
                        Interactive tag/chip component for filters, selections, and labels
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Basic Chips</h4>
                      <p className="text-muted-foreground mb-4">
                        Chips with optional remove functionality
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Chip label="React" />
                        <Chip label="TypeScript" />
                        <Chip label="Tailwind" />
                        <Chip label="Next.js" />
                        <Chip label="Node.js" />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">Removable Chips</h4>
                      <p className="text-muted-foreground mb-4">
                        Chips with close button for filtering or multi-select
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Chip label="Design" onRemove={() => {}} />
                        <Chip label="Development" onRemove={() => {}} />
                        <Chip label="Marketing" onRemove={() => {}} />
                        <Chip label="Sales" onRemove={() => {}} />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">Chip Variants</h4>
                      <p className="text-muted-foreground mb-4">
                        Different visual styles for various use cases
                      </p>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm mb-2">Default:</p>
                          <div className="flex flex-wrap gap-2">
                            <Chip label="Active" />
                            <Chip label="Pending" />
                            <Chip label="Completed" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm mb-2">With icons:</p>
                          <div className="flex flex-wrap gap-2">
                            <Chip label="Featured" icon={<StarIcon className="size-3" />} />
                            <Chip label="New" icon={<BellIcon className="size-3" />} />
                            <Chip label="Popular" icon={<HeartIcon className="size-3" />} />
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Chip Props</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-background px-2 py-1 rounded">label</code> - Text content of the chip</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">onRemove</code> - Optional callback to show remove button</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">icon</code> - Optional leading icon</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">onClick</code> - Click handler for chip</p>
                      </div>
                    </Card>
                  </div>

                  {/* Toggle Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Toggle</h3>
                      <p className="text-muted-foreground mb-4">
                        Toggle button for binary on/off states with visual feedback
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Toggle Examples</h4>
                      <p className="text-muted-foreground mb-4">
                        Interactive toggle buttons with different states
                      </p>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          <Toggle aria-label="Toggle bold">
                            <span className="font-bold">B</span>
                          </Toggle>
                          <Toggle aria-label="Toggle italic">
                            <span className="italic">I</span>
                          </Toggle>
                          <Toggle aria-label="Toggle underline">
                            <span className="underline">U</span>
                          </Toggle>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Toggle aria-label="Toggle heart">
                            <HeartIcon className="size-4" />
                          </Toggle>
                          <Toggle aria-label="Toggle star">
                            <StarIcon className="size-4" />
                          </Toggle>
                          <Toggle aria-label="Toggle bell">
                            <BellIcon className="size-4" />
                          </Toggle>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Toggle disabled aria-label="Disabled toggle">
                            <span>Disabled</span>
                          </Toggle>
                          <Toggle defaultPressed aria-label="Default pressed">
                            <span>Active</span>
                          </Toggle>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">Toggle with Text</h4>
                      <p className="text-muted-foreground mb-4">
                        Toggles with icon and label combinations
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Toggle aria-label="Enable notifications">
                          <BellIcon className="mr-2 size-4" />
                          Notifications
                        </Toggle>
                        <Toggle aria-label="Favorite">
                          <HeartIcon className="mr-2 size-4" />
                          Favorite
                        </Toggle>
                        <Toggle aria-label="Archive">
                          <InboxIcon className="mr-2 size-4" />
                          Archive
                        </Toggle>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Toggle Props</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-background px-2 py-1 rounded">pressed</code> - Controlled pressed state</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">defaultPressed</code> - Default pressed state</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">onPressedChange</code> - State change callback</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">disabled</code> - Boolean to disable toggle</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">variant</code> - Visual style variant</p>
                      </div>
                    </Card>
                  </div>

                  {/* Form Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Form (with Validation)</h3>
                      <p className="text-muted-foreground mb-4">
                        Complete form system with validation, error handling, and accessibility support
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Form Example</h4>
                      <p className="text-muted-foreground mb-4">
                        Form with spacing, labels, inputs, and validation messages
                      </p>
                      <div className="max-w-md space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="form-name">Full Name</Label>
                          <Input id="form-name" placeholder="John Doe" />
                          <p className="text-sm text-muted-foreground">
                            Enter your full name as it appears on official documents
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="form-email">Email Address</Label>
                          <Input id="form-email" type="email" placeholder="john@example.com" />
                          <p className="text-sm text-muted-foreground">
                            We'll never share your email with anyone else
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="form-password" className="text-destructive">Password (Error Example)</Label>
                          <Input id="form-password" type="password" placeholder="••••••••" className="border-destructive" aria-invalid="true" />
                          <p className="text-sm text-destructive">Password must be at least 8 characters long</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="form-bio">Bio</Label>
                          <Textarea id="form-bio" placeholder="Tell us about yourself..." rows={3} />
                          <p className="text-sm text-muted-foreground">
                            Brief description for your profile (max 200 characters)
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Checkbox id="terms-form-checkbox" />
                          <Label htmlFor="terms-form-checkbox">
                            I agree to the terms and conditions
                          </Label>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" type="button">Cancel</Button>
                          <Button type="submit">Submit</Button>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Form Components (react-hook-form)</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground mb-3">
                          <strong>Note:</strong> Form components require <code className="text-xs bg-background px-2 py-1 rounded">useForm()</code> and <code className="text-xs bg-background px-2 py-1 rounded">FormProvider</code> wrapper from react-hook-form@7.55.0
                        </p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">Form</code> - FormProvider wrapper (required)</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">FormField</code> - Field with validation controller</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">FormItem</code> - Wrapper for form field with spacing</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">FormLabel</code> - Accessible label for form field</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">FormControl</code> - Wrapper for input element</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">FormDescription</code> - Help text below input</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">FormMessage</code> - Error message display</p>
                        <p className="text-muted-foreground mt-3">
                          For simple forms without validation, use <code className="text-xs bg-background px-2 py-1 rounded">Label</code> + <code className="text-xs bg-background px-2 py-1 rounded">Input</code> directly
                        </p>
                      </div>
                    </Card>
                  </div>

                </div>
              )}

              {/* Display Components */}
              {componentsTab === 'display' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Display Components</h2>
                    <p className="text-muted-foreground">
                      Components for displaying content and status
                    </p>
                  </div>

                  {/* Card Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Card</h3>
                      <p className="text-muted-foreground mb-4">
                        Flexible container for content with header, content, and footer sections
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Card Example</h4>
                      <Card>
                        <CardHeader>
                          <h4>Card Title</h4>
                          <p className="text-muted-foreground">Card description goes here</p>
                        </CardHeader>
                        <CardContent>
                          <p>Card content with design system styling applied automatically.</p>
                        </CardContent>
                      </Card>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">Card</code> - Main container</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">CardHeader</code> - Header section</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">CardContent</code> - Content section</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">CardFooter</code> - Footer section</p>
                      </div>
                    </Card>
                  </div>

                  {/* Badge Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Badge</h3>
                      <p className="text-muted-foreground mb-4">
                        Status indicator badge with multiple variants
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Badge Variants</h4>
                      <div className="flex flex-wrap gap-3">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="destructive">Error</Badge>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">variant</code> - "default" | "secondary" | "outline" | "success" | "warning" | "destructive"</p>
                      </div>
                    </Card>
                  </div>

                  {/* Avatar Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Avatar</h3>
                      <p className="text-muted-foreground mb-4">
                        User avatar with fallback initials
                      </p>
                    </div>

                    <Card className="p-6">
                      <div className="flex gap-4">
                        <Avatar fallback="JD" />
                        <Avatar fallback="AB" />
                        <Avatar fallback="XY" />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">src</code> - Image source</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">fallback</code> - Fallback text/initials</p>
                      </div>
                    </Card>
                  </div>

                  {/* NotificationBadge Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">NotificationBadge</h3>
                      <p className="text-muted-foreground mb-4">
                        Small notification counter badge
                      </p>
                    </div>

                    <Card className="p-6">
                      <div className="flex gap-6">
                        <div className="relative">
                          <BellIcon className="size-6" />
                          <NotificationBadge count={3} />
                        </div>
                        <div className="relative">
                          <MailIcon className="size-6" />
                          <NotificationBadge count={12} />
                        </div>
                        <div className="relative">
                          <UserIcon className="size-6" />
                          <NotificationBadge count={99} max={99} />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">count</code> - Notification count</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">max</code> - Maximum number to display before showing "+"</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Feedback Components */}
              {componentsTab === 'feedback' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Feedback Components</h2>
                    <p className="text-muted-foreground">
                      Components for user feedback and loading states
                    </p>
                  </div>

                  {/* Alert Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Alert</h3>
                      <p className="text-muted-foreground mb-4">
                        Inline alert messages with multiple variants
                      </p>
                    </div>

                    <Card className="p-6">
                      <div className="space-y-4">
                        <Alert>
                          <InfoIcon className="size-4" />
                          <AlertTitle>Information</AlertTitle>
                          <AlertDescription>
                            This is an informational alert message.
                          </AlertDescription>
                        </Alert>
                        <Alert variant="success">
                          <CheckIcon className="size-4" />
                          <AlertTitle>Success</AlertTitle>
                          <AlertDescription>
                            Your changes have been saved successfully.
                          </AlertDescription>
                        </Alert>
                        <Alert variant="warning">
                          <AlertCircleIcon className="size-4" />
                          <AlertTitle>Warning</AlertTitle>
                          <AlertDescription>
                            Please review your input before proceeding.
                          </AlertDescription>
                        </Alert>
                        <Alert variant="destructive">
                          <XCircleIcon className="size-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>
                            An error occurred while processing your request.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">variant</code> - "default" | "success" | "warning" | "destructive"</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AlertTitle</code> - Alert title component</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AlertDescription</code> - Alert description component</p>
                      </div>
                    </Card>
                  </div>

                  {/* LoadingSpinner Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">LoadingSpinner</h3>
                      <p className="text-muted-foreground mb-4">
                        Animated loading indicator
                      </p>
                    </div>

                    <Card className="p-6">
                      <div className="flex justify-center">
                        <LoadingSpinner />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">size</code> - Spinner size (optional)</p>
                      </div>
                    </Card>
                  </div>

                  {/* ProgressBar Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">ProgressBar</h3>
                      <p className="text-muted-foreground mb-4">
                        Linear progress indicator
                      </p>
                    </div>

                    <Card className="p-6">
                      <div className="space-y-6">
                        <div>
                          <Label className="mb-2 block">25% Complete</Label>
                          <ProgressBar value={25} />
                        </div>
                        <div>
                          <Label className="mb-2 block">50% Complete</Label>
                          <ProgressBar value={50} />
                        </div>
                        <div>
                          <Label className="mb-2 block">75% Complete</Label>
                          <ProgressBar value={75} />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">value</code> - Progress value (0-100)</p>
                      </div>
                    </Card>
                  </div>

                  {/* EmptyState Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">EmptyState</h3>
                      <p className="text-muted-foreground mb-4">
                        Placeholder for empty screens
                      </p>
                    </div>

                    <Card className="p-6">
                      <EmptyState
                        icon={<InboxIcon className="size-12" />}
                        title="No messages"
                        description="Your inbox is empty. New messages will appear here."
                      />
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">icon</code> - Icon element</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">title</code> - Empty state title</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">description</code> - Description text</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">action</code> - Optional action button</p>
                      </div>
                    </Card>
                  </div>

                  {/* Skeleton Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Skeleton</h3>
                      <p className="text-muted-foreground mb-4">
                        Content placeholder loader for improved perceived performance
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Basic Skeletons</h4>
                      <div className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-8 w-1/2" />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">Skeleton Card</h4>
                      <SkeletonCard />
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">Skeleton List</h4>
                      <div className="space-y-2">
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">className</code> - Custom sizing and styling</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">SkeletonCard</code> - Pre-built card skeleton</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">SkeletonListItem</code> - Pre-built list item skeleton</p>
                      </div>
                    </Card>
                  </div>

                  {/* CircularProgress Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">CircularProgress</h3>
                      <p className="text-muted-foreground mb-4">
                        Circular progress indicator with percentage display
                      </p>
                    </div>

                    <Card className="p-6">
                      <div className="flex justify-center gap-8">
                        <CircularProgress value={25} />
                        <CircularProgress value={50} />
                        <CircularProgress value={75} />
                        <CircularProgress value={100} />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">value</code> - Progress value (0-100)</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">size</code> - Circle size in pixels</p>
                      </div>
                    </Card>
                  </div>

                  {/* Toast Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Toast</h3>
                      <p className="text-muted-foreground mb-4">
                        Temporary notification snackbar messages
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Toast Examples</h4>
                      <div className="space-y-2">
                        <Button onClick={() => Toast.show('Default toast message')}>
                          Show Default Toast
                        </Button>
                        <Button onClick={() => Toast.success('Successfully saved!')}>
                          Show Success Toast
                        </Button>
                        <Button onClick={() => Toast.error('Something went wrong!')}>
                          Show Error Toast
                        </Button>
                        <Button onClick={() => Toast.info('Informational message')}>
                          Show Info Toast
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">Toast.show(message)</code> - Show default toast</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">Toast.success(message)</code> - Show success toast</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">Toast.error(message)</code> - Show error toast</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">Toast.info(message)</code> - Show info toast</p>
                      </div>
                    </Card>
                  </div>

                  {/* AlertDialog Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">AlertDialog</h3>
                      <p className="text-muted-foreground mb-4">
                        Modal dialog for important confirmations and alerts
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Confirmation Dialog</h4>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AlertDialogTrigger</code> - Opens the dialog</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AlertDialogContent</code> - Dialog content wrapper</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AlertDialogTitle</code> - Dialog title</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AlertDialogDescription</code> - Dialog description</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AlertDialogAction</code> - Primary action button</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AlertDialogCancel</code> - Cancel button</p>
                      </div>
                    </Card>
                  </div>

                  {/* LoadingOverlay Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">LoadingOverlay</h3>
                      <p className="text-muted-foreground mb-4">
                        Full-page loading overlay with spinner
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Loading Overlay Preview</h4>
                      <div className="relative h-48 bg-background border border-border rounded-lg overflow-hidden">
                        <div className="p-4">
                          <p>Page content...</p>
                        </div>
                        <LoadingOverlay />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">No props</code> - Renders full-page overlay with spinner</p>
                        <p>Use conditionally: {`{isLoading && <LoadingOverlay />}`}</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Lists & Tables Components */}
              {componentsTab === 'lists' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Lists & Tables</h2>
                    <p className="text-muted-foreground">
                      Components for displaying structured data
                    </p>
                  </div>

                  {/* ListItem Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">ListItem</h3>
                      <p className="text-muted-foreground mb-4">
                        Reusable list item with avatar, content, and actions
                      </p>
                    </div>

                    <Card className="p-6">
                      <div className="space-y-2">
                        <ListItem
                          avatar={<Avatar fallback="JD" />}
                          title="John Doe"
                          subtitle="john@example.com"
                          onClick={() => {}}
                        />
                        <ListItem
                          avatar={<Avatar fallback="AB" />}
                          title="Alice Brown"
                          subtitle="alice@example.com"
                          trailing={<Badge>Admin</Badge>}
                          onClick={() => {}}
                        />
                        <ListItem
                          avatar={<Avatar fallback="CD" />}
                          title="Charlie Davis"
                          subtitle="charlie@example.com"
                          trailing={<Button variant="ghost" size="sm">View</Button>}
                          onClick={() => {}}
                        />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">avatar</code> - Leading avatar/icon</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">title</code> - Primary text</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">subtitle</code> - Secondary text</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">trailing</code> - Trailing content</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">onClick</code> - Click handler</p>
                      </div>
                    </Card>
                  </div>

                  {/* Table Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Table</h3>
                      <p className="text-muted-foreground mb-4">
                        Data table with header, body, and responsive design
                      </p>
                    </div>

                    <Card className="p-6 overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>John Doe</TableCell>
                            <TableCell>john@example.com</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell><Badge variant="success">Active</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Alice Brown</TableCell>
                            <TableCell>alice@example.com</TableCell>
                            <TableCell>Editor</TableCell>
                            <TableCell><Badge variant="success">Active</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Charlie Davis</TableCell>
                            <TableCell>charlie@example.com</TableCell>
                            <TableCell>Viewer</TableCell>
                            <TableCell><Badge variant="secondary">Inactive</Badge></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">Table</code> - Main table container</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">TableHeader</code> - Table header section</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">TableBody</code> - Table body section</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">TableRow</code> - Table row</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">TableHead</code> - Header cell</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">TableCell</code> - Data cell</p>
                      </div>
                    </Card>

                    <Card className="p-6 overflow-x-auto">
                      <h4 className="mb-4">With Footer & Caption</h4>
                      <Table>
                        <TableCaption>A list of recent transactions</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>2024-01-15</TableCell>
                            <TableCell>Purchase</TableCell>
                            <TableCell className="text-right">$50.00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2024-01-14</TableCell>
                            <TableCell>Refund</TableCell>
                            <TableCell className="text-right">-$25.00</TableCell>
                          </TableRow>
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="text-right">$25.00</TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </Card>
                  </div>

                  {/* ListSection Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">ListSection</h3>
                      <p className="text-muted-foreground mb-4">
                        Grouped list items with section header
                      </p>
                    </div>

                    <Card className="p-6">
                      <ListSection title="Team Members">
                        <ListItem
                          avatar={<Avatar fallback="JD" />}
                          title="John Doe"
                          subtitle="john@example.com"
                          onClick={() => {}}
                        />
                        <ListItem
                          avatar={<Avatar fallback="AB" />}
                          title="Alice Brown"
                          subtitle="alice@example.com"
                          onClick={() => {}}
                        />
                      </ListSection>
                      
                      <Divider className="my-4" />
                      
                      <ListSection title="External Collaborators">
                        <ListItem
                          avatar={<Avatar fallback="CD" />}
                          title="Charlie Davis"
                          subtitle="charlie@example.com"
                          onClick={() => {}}
                        />
                      </ListSection>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">title</code> - Section header title</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">children</code> - ListItem components</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Layout Components */}
              {componentsTab === 'layout' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Layout Components</h2>
                    <p className="text-muted-foreground">
                      Components for structuring and organizing content
                    </p>
                  </div>

                  {/* Divider Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Divider</h3>
                      <p className="text-muted-foreground mb-4">
                        Visual separator between content sections
                      </p>
                    </div>

                    <Card className="p-6">
                      <div className="space-y-4">
                        <p>Content above divider</p>
                        <Divider />
                        <p>Content below divider</p>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p>No props - Uses design system border tokens</p>
                      </div>
                    </Card>
                  </div>

                  {/* Separator Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Separator</h3>
                      <p className="text-muted-foreground mb-4">
                        Section separator with optional label
                      </p>
                    </div>

                    <Card className="p-6">
                      <div className="space-y-6">
                        <Separator />
                        <div className="flex items-center gap-4">
                          <Separator orientation="vertical" className="h-12" />
                          <p>Vertical separator</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">orientation</code> - "horizontal" | "vertical"</p>
                      </div>
                    </Card>
                  </div>

                  {/* ScrollArea Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">ScrollArea</h3>
                      <p className="text-muted-foreground mb-4">
                        Custom-styled scrollable container with design system scrollbars
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Vertical Scroll</h4>
                      <ScrollArea className="h-48 w-full rounded-lg border border-border">
                        <div className="p-4 space-y-4">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="p-4 bg-muted rounded-lg">
                              Item {i + 1}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">Horizontal Scroll</h4>
                      <ScrollArea className="w-full whitespace-nowrap rounded-lg border border-border">
                        <div className="flex gap-4 p-4">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                              {i + 1}
                            </div>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">className</code> - Set height/width constraints</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">ScrollBar</code> - Optional scrollbar component</p>
                      </div>
                    </Card>
                  </div>

                  {/* Accordion Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Accordion</h3>
                      <p className="text-muted-foreground mb-4">
                        Collapsible content sections with smooth animations
                      </p>
                    </div>

                    <Card className="p-6">
                      <Accordion type="single" collapsible className="space-y-2">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                          <AccordionContent>
                            We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact our support team for a full refund.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>How do I track my order?</AccordionTrigger>
                          <AccordionContent>
                            Once your order ships, you'll receive a tracking number via email. Use this number on our tracking page to see real-time updates.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                          <AccordionContent>
                            Yes! We ship to over 100 countries worldwide. Shipping costs and delivery times vary by location.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">type</code> - "single" | "multiple" (allow multiple open)</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">collapsible</code> - Allow closing all items</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AccordionItem</code> - Individual accordion section</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AccordionTrigger</code> - Clickable header</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">AccordionContent</code> - Collapsible content</p>
                      </div>
                    </Card>
                  </div>

                  {/* Collapsible Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Collapsible</h3>
                      <p className="text-muted-foreground mb-4">
                        Simple collapsible panel with custom trigger
                      </p>
                    </div>

                    <Card className="p-6">
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="w-full justify-between">
                            <span>View Details</span>
                            <ChevronDownIcon className="w-4 h-4" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-4">
                          <div className="space-y-2 text-sm">
                            <p>This is the collapsible content area.</p>
                            <p>You can put any content here that should be hidden/shown.</p>
                            <p>It animates smoothly when opened and closed.</p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">open</code> - Controlled open state</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">onOpenChange</code> - State change handler</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">CollapsibleTrigger</code> - Click target to toggle</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">CollapsibleContent</code> - Content to show/hide</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Dialog Components */}
              {componentsTab === 'dialogs' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Dialog Components</h2>
                    <p className="text-muted-foreground">
                      Modal dialogs and overlay components
                    </p>
                  </div>

                  {/* Modal Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Modal</h3>
                      <p className="text-muted-foreground mb-4">
                        Centered modal dialog overlay for focused interactions and important information
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Modal Example</h4>
                      <p className="text-muted-foreground mb-4">
                        Modal component renders a centered dialog overlay with backdrop
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">isOpen</code> - Controls visibility state</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">onClose</code> - Close handler callback</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">title</code> - Modal title text</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">children</code> - Modal content</p>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Use Cases</h4>
                      <div className="space-y-2 text-sm">
                        <p>• Confirmation dialogs</p>
                        <p>• Form submissions</p>
                        <p>• Image galleries</p>
                        <p>• Important notifications</p>
                      </div>
                    </Card>
                  </div>

                  {/* BottomSheet Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">BottomSheet</h3>
                      <p className="text-muted-foreground mb-4">
                        Mobile-optimized sheet that slides up from the bottom, ideal for mobile actions and selections
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">BottomSheet Examples</h4>
                      <p className="text-muted-foreground mb-4">
                        Sheet component that slides from the bottom with smooth animations
                      </p>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm mb-3">Basic BottomSheet:</p>
                          <div className="border border-border rounded-lg p-4 bg-muted/30">
                            <p className="text-sm text-muted-foreground">
                              BottomSheet appears at bottom of screen, great for mobile actions like share, delete, or filter options
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm mb-3">With Actions:</p>
                          <div className="border border-border rounded-lg overflow-hidden">
                            <div className="bg-card p-4 border-b border-border">
                              <h4 className="mb-1">Select Action</h4>
                              <p className="text-sm text-muted-foreground">Choose an option below</p>
                            </div>
                            <div className="bg-card">
                              <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors border-b border-border">
                                <ShareIcon className="size-5 text-muted-foreground" />
                                <span>Share</span>
                              </button>
                              <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors border-b border-border">
                                <EditIcon className="size-5 text-muted-foreground" />
                                <span>Edit</span>
                              </button>
                              <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors border-b border-border text-destructive">
                                <Trash2Icon className="size-5" />
                                <span>Delete</span>
                              </button>
                              <button className="w-full px-4 py-3 text-center hover:bg-muted transition-colors">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">BottomSheet Props</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-background px-2 py-1 rounded">isOpen</code> - Controls visibility state</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">onClose</code> - Close handler callback</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">title</code> - Optional sheet title</p>
                        <p><code className="text-xs bg-background px-2 py-1 rounded">children</code> - Sheet content</p>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Best Practices</h4>
                      <div className="space-y-2 text-sm">
                        <p>• Use for mobile-first action sheets</p>
                        <p>• Great for quick actions and selections</p>
                        <p>• Include clear cancel/close option</p>
                        <p>• Keep actions focused and limited (3-5 options)</p>
                        <p>• Use destructive styling for dangerous actions</p>
                      </div>
                    </Card>
                  </div>

                  {/* Dialog Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Dialog</h3>
                      <p className="text-muted-foreground mb-4">
                        Composable dialog component with full control over structure
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Dialog Example</h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label htmlFor="name">Name</Label>
                              <Input id="name" defaultValue="John Doe" />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" defaultValue="john@example.com" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="ghost">Cancel</Button>
                            <Button>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DialogTrigger</code> - Opens the dialog</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DialogContent</code> - Dialog content wrapper</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DialogHeader</code> - Header section</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DialogTitle</code> - Dialog title</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DialogDescription</code> - Description text</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DialogFooter</code> - Footer for actions</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Menus Components */}
              {componentsTab === 'menus' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Menu Components</h2>
                    <p className="text-muted-foreground">
                      Dropdown menus and context menus for actions and navigation
                    </p>
                  </div>

                  {/* DropdownMenu Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">DropdownMenu</h3>
                      <p className="text-muted-foreground mb-4">
                        Feature-rich dropdown menu with support for submenus, separators, checkboxes, and radio groups
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Basic Dropdown</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Open Menu
                            <ChevronDownIcon className="ml-2 w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <EditIcon className="mr-2 w-4 h-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CopyIcon className="mr-2 w-4 h-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShareIcon className="mr-2 w-4 h-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <TrashIcon className="mr-2 w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">With Labels & Groups</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Actions
                            <MoreVerticalIcon className="ml-2 w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <UserIcon className="mr-2 w-4 h-4" />
                              Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <SettingsIcon className="mr-2 w-4 h-4" />
                              Settings
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <LogOutIcon className="mr-2 w-4 h-4" />
                            Log out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">With Checkboxes</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">View Options</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Show Columns</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>
                            Name
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem checked>
                            Email
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Phone
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">With Radio Group</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Sort By</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup value="date">
                            <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">With Submenu</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">File</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>New File</DropdownMenuItem>
                          <DropdownMenuItem>Open...</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <FileIcon className="mr-2 w-4 h-4" />
                              Recent Files
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>document.pdf</DropdownMenuItem>
                              <DropdownMenuItem>image.png</DropdownMenuItem>
                              <DropdownMenuItem>report.xlsx</DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Save</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DropdownMenuTrigger</code> - Opens the menu</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DropdownMenuContent</code> - Menu content wrapper</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DropdownMenuItem</code> - Individual menu item</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DropdownMenuLabel</code> - Section label</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DropdownMenuSeparator</code> - Visual separator</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DropdownMenuCheckboxItem</code> - Checkbox option</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DropdownMenuRadioGroup</code> - Radio button group</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">DropdownMenuSub</code> - Submenu wrapper</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Overlays Components */}
              {componentsTab === 'overlays' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Overlay Components</h2>
                    <p className="text-muted-foreground">
                      Popover and tooltip components for contextual information
                    </p>
                  </div>

                  {/* Popover Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Popover</h3>
                      <p className="text-muted-foreground mb-4">
                        Floating content panel anchored to a trigger element
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Basic Popover</h4>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">Open Popover</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-4">
                            <div>
                              <h4 className="mb-2">Dimensions</h4>
                              <p className="text-sm text-muted-foreground">
                                Set the dimensions for the layer.
                              </p>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <Label htmlFor="width">Width</Label>
                                <Input id="width" defaultValue="100%" />
                              </div>
                              <div>
                                <Label htmlFor="height">Height</Label>
                                <Input id="height" defaultValue="25px" />
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">With Actions</h4>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <SettingsIcon className="mr-2 w-4 h-4" />
                            Settings
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="mb-1">Quick Settings</h4>
                              <p className="text-sm text-muted-foreground">
                                Adjust your preferences
                              </p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="notifications">Notifications</Label>
                                <Switch checked={notificationsEnabled} onChange={setNotificationsEnabled} />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="auto-save">Auto-save</Label>
                                <Switch checked={autoSaveEnabled} onChange={setAutoSaveEnabled} />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">Cancel</Button>
                              <Button size="sm">Apply</Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">PopoverTrigger</code> - Opens the popover</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">PopoverContent</code> - Popover content wrapper</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">PopoverAnchor</code> - Optional anchor element</p>
                      </div>
                    </Card>
                  </div>

                  {/* Tooltip Component */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Tooltip</h3>
                      <p className="text-muted-foreground mb-4">
                        Short informational hints that appear on hover
                      </p>
                    </div>

                    <Card className="p-6">
                      <h4 className="mb-4">Tooltip Examples</h4>
                      <TooltipProvider>
                        <div className="flex gap-4">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                                <HelpCircleIcon className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Need help? Click here for assistance</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                                <DownloadIcon className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download file</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                                <ShareIcon className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share with others</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-4">On Text Elements</h4>
                      <TooltipProvider>
                        <div className="space-y-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="underline decoration-dotted cursor-help">
                                Hover over me
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This is a helpful tooltip!</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </Card>

                    <Card className="p-6">
                      <h4 className="mb-2">API</h4>
                      <div className="space-y-2 text-sm">
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">TooltipProvider</code> - Wrap all tooltips in provider</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">TooltipTrigger</code> - Element that triggers tooltip</p>
                        <p><code className="text-xs bg-muted px-2 py-1 rounded">TooltipContent</code> - Tooltip content</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* Patterns Tab Content */}
      {mainTab === 'patterns' && (
        <>
          {/* Secondary Navigation - Tier 2 */}
          <nav className="border-b border-border bg-card sticky top-[144px] md:top-[152px] z-40">
            <div className="max-w-7xl mx-auto px-4">
              <div className="overflow-x-auto">
                <Tabs
                  tabs={[
                    { id: 'forms', label: 'Forms' },
                    { id: 'navigation', label: 'Navigation' },
                    { id: 'data-display', label: 'Data Display' },
                    { id: 'page-layouts', label: 'Page Layouts' },
                  ]}
                  activeTab={patternsTab}
                  onChange={setPatternsTab}
                />
              </div>
            </div>
          </nav>

          {/* Patterns Content */}
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-12">
              {/* Forms Patterns */}
              {patternsTab === 'forms' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Form Patterns</h2>
                    <p className="text-muted-foreground">
                      Complete form patterns showing how multiple components work together to create functional user experiences.
                    </p>
                  </div>

                  {/* Login Form Pattern */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Login Form Pattern</h3>
                      <p className="text-muted-foreground mb-4">
                        Standard login form with email, password, remember me, and social auth options
                      </p>
                    </div>

                    <Card className="p-6 max-w-md mx-auto">
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <h3>Welcome Back</h3>
                          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
                        </div>

                        <Divider />

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="pattern-login-email">Email</Label>
                            <Input 
                              id="pattern-login-email" 
                              type="email" 
                              placeholder="you@example.com"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="pattern-login-password">Password</Label>
                              <a href="#" className="text-sm text-primary hover:underline">
                                Forgot password?
                              </a>
                            </div>
                            <Input 
                              id="pattern-login-password" 
                              type="password" 
                              placeholder="••••••••"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <Checkbox id="pattern-remember" />
                            <Label htmlFor="pattern-remember" className="text-sm">
                              Remember me for 30 days
                            </Label>
                          </div>

                          <Button className="w-full">
                            Sign In
                          </Button>

                          <div className="relative">
                            <Divider />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="bg-card px-2 text-xs text-muted-foreground">OR</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline">
                              Google
                            </Button>
                            <Button variant="outline">
                              GitHub
                            </Button>
                          </div>
                        </div>

                        <Divider />

                        <p className="text-center text-sm text-muted-foreground">
                          Don't have an account?{' '}
                          <a href="#" className="text-primary hover:underline">
                            Sign up
                          </a>
                        </p>
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Components Used</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Card</Badge>
                        <Badge variant="secondary">Input</Badge>
                        <Badge variant="secondary">Label</Badge>
                        <Badge variant="secondary">Button</Badge>
                        <Badge variant="secondary">Checkbox</Badge>
                        <Badge variant="secondary">Divider</Badge>
                      </div>
                    </Card>
                  </div>

                  <Alert>
                    <AlertTitle>More Form Patterns</AlertTitle>
                    <AlertDescription>
                      Additional form patterns (signup, search with filters, multi-step) follow similar composition principles using library components.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Navigation Patterns */}
              {patternsTab === 'navigation' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Navigation Patterns</h2>
                    <p className="text-muted-foreground">
                      Complete navigation patterns showing how to structure app navigation.
                    </p>
                  </div>

                  {/* App Shell Pattern */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">App Shell Pattern</h3>
                      <p className="text-muted-foreground mb-4">
                        Standard mobile app structure with TopBar, content area, and BottomNav
                      </p>
                    </div>

                    <Card className="p-0 overflow-hidden">
                      <div className="bg-muted/30 h-[600px] flex flex-col">
                        <TopBar 
                          title="Dashboard"
                          leftAction={
                            <button className="p-2 -ml-2 hover:bg-muted rounded-lg">
                              <MenuIcon className="w-5 h-5" />
                            </button>
                          }
                          rightAction={
                            <button className="p-2 -mr-2 hover:bg-muted rounded-lg relative">
                              <BellIcon className="w-5 h-5" />
                              <NotificationBadge count={3} position="top-right" />
                            </button>
                          }
                        />

                        <main className="flex-1 overflow-auto p-4">
                          <div className="space-y-4">
                            <Card className="p-6">
                              <h4 className="mb-2">Welcome Back!</h4>
                              <p className="text-sm text-muted-foreground">
                                Your main content goes here. The app shell provides consistent navigation structure.
                              </p>
                            </Card>

                            <Card className="p-6">
                              <h5 className="mb-2">Recent Activity</h5>
                              <div className="space-y-3">
                                <ListItem
                                  avatar={<Avatar fallback="JD" />}
                                  title="New message from John"
                                  subtitle="2 minutes ago"
                                />
                                <ListItem
                                  avatar={<Avatar fallback="SM" />}
                                  title="Task completed"
                                  subtitle="1 hour ago"
                                />
                              </div>
                            </Card>
                          </div>
                        </main>

                        <BottomNav
                          items={[
                            { id: 'home', icon: <HomeIcon className="w-5 h-5" />, label: 'Home' },
                            { id: 'search', icon: <SearchIcon className="w-5 h-5" />, label: 'Search' },
                            { id: 'notifications', icon: <BellIcon className="w-5 h-5" />, label: 'Notifications', badge: 3 },
                            { id: 'profile', icon: <UserIcon className="w-5 h-5" />, label: 'Profile' },
                          ]}
                          activeId="home"
                          onItemClick={(id) => console.log('Navigate to:', id)}
                        />
                      </div>
                    </Card>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">App Shell Structure</h4>
                      <div className="space-y-2 text-sm">
                        <p>1. <strong>TopBar</strong> - Fixed header with title and actions</p>
                        <p>2. <strong>Main Content</strong> - Scrollable content area</p>
                        <p>3. <strong>BottomNav</strong> - Fixed bottom navigation</p>
                      </div>
                    </Card>
                  </div>

                  {/* Tabbed Content Pattern */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Tabbed Content Pattern</h3>
                      <p className="text-muted-foreground mb-4">
                        Content organization using tabs with panel switching
                      </p>
                    </div>

                    <Card className="p-6">
                      <TabsExample1 />
                    </Card>
                  </div>
                </div>
              )}

              {/* Data Display Patterns */}
              {patternsTab === 'data-display' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Data Display Patterns</h2>
                    <p className="text-muted-foreground">
                      Patterns for displaying and interacting with data in lists, tables, and cards.
                    </p>
                  </div>

                  {/* Card Grid Pattern */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Card Grid Pattern</h3>
                      <p className="text-muted-foreground mb-4">
                        Responsive card grid for displaying items with images, titles, and actions
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <Card key={i} className="overflow-hidden">
                          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-muted-foreground" />
                          </div>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h5>Project Title {i}</h5>
                                  <Badge variant="secondary">Active</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Brief description of the project goes here.
                                </p>
                              </div>
                              <Divider />
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar size="sm" fallback="JS" />
                                  <span className="text-sm">John Smith</span>
                                </div>
                                <Button size="sm" variant="outline">
                                  View
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card className="p-6 bg-muted/50">
                      <h4 className="mb-3">Responsive Grid</h4>
                      <p className="text-sm text-muted-foreground">
                        Mobile: 1 column • Tablet: 2 columns • Desktop: 3 columns
                      </p>
                    </Card>
                  </div>

                  {/* Empty State Pattern */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Empty State Pattern</h3>
                      <p className="text-muted-foreground mb-4">
                        Helpful empty states that guide users to take action
                      </p>
                    </div>

                    <Card className="p-12">
                      <EmptyState
                        icon={<FileIcon className="w-12 h-12" />}
                        title="No projects yet"
                        description="Get started by creating your first project."
                        action={
                          <Button>
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Create Project
                          </Button>
                        }
                      />
                    </Card>
                  </div>
                </div>
              )}

              {/* Page Layouts */}
              {patternsTab === 'page-layouts' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-2">Page Layout Patterns</h2>
                    <p className="text-muted-foreground">
                      Complete page layouts showing how to structure entire screens.
                    </p>
                  </div>

                  {/* Settings Page Pattern */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Settings Page Pattern</h3>
                      <p className="text-muted-foreground mb-4">
                        Standard settings page with sections and form elements
                      </p>
                    </div>

                    <Card className="p-0 overflow-hidden">
                      <div className="p-6 border-b border-border">
                        <div>
                          <h3>Settings</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Manage your account settings and preferences
                          </p>
                        </div>
                      </div>

                      <div className="divide-y divide-border">
                        <div className="p-6 space-y-6">
                          <div>
                            <h4 className="mb-4">Profile Information</h4>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Avatar size="lg" fallback="JD" />
                                <div className="space-y-2">
                                  <Button size="sm" variant="outline">Change Photo</Button>
                                  <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="pattern-settings-firstname">First Name</Label>
                                  <Input id="pattern-settings-firstname" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="pattern-settings-lastname">Last Name</Label>
                                  <Input id="pattern-settings-lastname" defaultValue="Doe" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 space-y-4">
                          <h4>Notifications</h4>
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p>Email Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive email updates</p>
                            </div>
                            <Switch 
                              checked={notificationsEnabled}
                              onCheckedChange={setNotificationsEnabled}
                            />
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex justify-end gap-3">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Alert>
                    <AlertTitle>More Patterns Coming Soon</AlertTitle>
                    <AlertDescription>
                      Additional patterns: Dashboard layout, Profile page, Error pages (404/500), and more complex workflows.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

// Tabs Example Components

function TabsExample1() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <TabPanel isActive={activeTab === 'overview'}>
        <Card className="p-6">
          <h5 className="mb-2">Overview Content</h5>
          <p className="text-muted-foreground">
            This is the overview tab content. The Tabs component handles the navigation UI,
            while TabPanel conditionally renders content based on the active tab.
          </p>
        </Card>
      </TabPanel>
      <TabPanel isActive={activeTab === 'details'}>
        <Card className="p-6">
          <h5 className="mb-2">Details Content</h5>
          <p className="text-muted-foreground">
            Details tab is now active. Notice how the underline indicator moves smoothly
            between tabs using CSS transitions.
          </p>
        </Card>
      </TabPanel>
      <TabPanel isActive={activeTab === 'settings'}>
        <Card className="p-6">
          <h5 className="mb-2">Settings Content</h5>
          <p className="text-muted-foreground">
            Settings tab content. Each TabPanel only renders when its isActive prop is true,
            ensuring efficient rendering.
          </p>
        </Card>
      </TabPanel>
    </div>
  );
}

function TabsExample2() {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
      <TabPanel isActive={activeTab === 'profile'}>
        <Card className="p-6">
          <h5 className="mb-2">Profile Settings</h5>
          <p className="text-muted-foreground">
            The pills variant provides a more modern, compact look with rounded backgrounds.
            Perfect for settings panels and compact interfaces.
          </p>
        </Card>
      </TabPanel>
      <TabPanel isActive={activeTab === 'account'}>
        <Card className="p-6">
          <h5 className="mb-2">Account Settings</h5>
          <p className="text-muted-foreground">
            Notice how the active pill has a white background with shadow, while inactive
            pills have transparent backgrounds with hover effects.
          </p>
        </Card>
      </TabPanel>
      <TabPanel isActive={activeTab === 'notifications'}>
        <Card className="p-6">
          <h5 className="mb-2">Notification Preferences</h5>
          <p className="text-muted-foreground">
            The pills variant works great in both light and dark modes, with automatic
            color adjustments based on the design system tokens.
          </p>
        </Card>
      </TabPanel>
    </div>
  );
}

function TabsExample3() {
  const [activeTab, setActiveTab] = useState('inbox');
  
  const tabs = [
    { id: 'inbox', label: 'Inbox', badge: 12 },
    { id: 'unread', label: 'Unread', badge: 5 },
    { id: 'archive', label: 'Archive', badge: 0 },
    { id: 'spam', label: 'Spam', badge: 3 },
  ];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <TabPanel isActive={activeTab === 'inbox'}>
        <Card className="p-6">
          <h5 className="mb-2">Inbox (12)</h5>
          <p className="text-muted-foreground">
            Badge counts are automatically displayed next to tab labels. Badges with value 0
            are hidden to reduce visual clutter.
          </p>
        </Card>
      </TabPanel>
      <TabPanel isActive={activeTab === 'unread'}>
        <Card className="p-6">
          <h5 className="mb-2">Unread Messages (5)</h5>
          <p className="text-muted-foreground">
            Badges use the primary color with low opacity background, ensuring they're
            noticeable without overwhelming the interface.
          </p>
        </Card>
      </TabPanel>
      <TabPanel isActive={activeTab === 'archive'}>
        <Card className="p-6">
          <h5 className="mb-2">Archive</h5>
          <p className="text-muted-foreground">
            This tab has no badge because the count is 0. Badges are only shown when
            the value is greater than 0.
          </p>
        </Card>
      </TabPanel>
      <TabPanel isActive={activeTab === 'spam'}>
        <Card className="p-6">
          <h5 className="mb-2">Spam (3)</h5>
          <p className="text-muted-foreground">
            Badge styling is consistent across all tabs, using design system tokens
            for colors, spacing, and typography.
          </p>
        </Card>
      </TabPanel>
    </div>
  );
}

function TabsExample4() {
  const [activeTab, setActiveTab] = useState('tasks');
  
  const tabs = [
    { id: 'tasks', label: 'Tasks', badge: 8 },
    { id: 'in-progress', label: 'In Progress', badge: 3 },
    { id: 'completed', label: 'Completed', badge: 0 },
  ];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
      <TabPanel isActive={activeTab === 'tasks'}>
        <Card className="p-6">
          <h5 className="mb-2">All Tasks (8)</h5>
          <p className="text-muted-foreground">
            Pills variant with badges creates a modern, compact navigation that works
            especially well in sidebars and narrow spaces.
          </p>
        </Card>
      </TabPanel>
      <TabPanel isActive={activeTab === 'in-progress'}>
        <Card className="p-6">
          <h5 className="mb-2">In Progress (3)</h5>
          <p className="text-muted-foreground">
            The pill background and badge styling complement each other, maintaining
            visual hierarchy and readability.
          </p>
        </Card>
      </TabPanel>
      <TabPanel isActive={activeTab === 'completed'}>
        <Card className="p-6">
          <h5 className="mb-2">Completed Tasks</h5>
          <p className="text-muted-foreground">
            Completed tasks have no pending items, so the badge is hidden. The pills
            variant maintains consistent spacing regardless of badge presence.
          </p>
        </Card>
      </TabPanel>
    </div>
  );
}

// Helper Components for Color Display

function ColorSwatch({ name, varName }: { name: string; varName: string }) {
  return (
    <div className="space-y-2">
      <div
        className="h-20 rounded-lg border border-border"
        style={{ backgroundColor: `var(${varName})` }}
      />
      <div>
        <Label className="block">{name}</Label>
        <p className="text-xs text-muted-foreground">{varName}</p>
      </div>
    </div>
  );
}

function ColorPalette({ name, prefix }: { name: string; prefix: string }) {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  
  return (
    <div>
      <Label className="block mb-3">{name}</Label>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {shades.map((shade) => {
          const hexValue = colorHexValues[prefix as keyof typeof colorHexValues]?.[shade as keyof typeof colorHexValues.primary];
          return (
            <div key={shade} className="flex-shrink-0 space-y-1">
              <div
                className="w-16 h-16 rounded border border-border"
                style={{ backgroundColor: `var(--color-${prefix}-${shade})` }}
              />
              <p className="text-xs text-center text-muted-foreground">{shade}</p>
              {hexValue && (
                <p className="text-xs text-center text-muted-foreground" style={{ fontFamily: 'var(--font-family-label)', fontSize: '0.65rem' }}>
                  {hexValue}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpacingRow({ token, value, variable }: { token: string; value: string; variable: string }) {
  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
      <div className="flex items-center gap-4">
        <code className="text-xs min-w-[60px]">{token}</code>
        <div
          className="bg-primary rounded h-4"
          style={{ width: `var(${variable})`, maxWidth: '200px', minWidth: '4px' }}
        />
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">{value}</p>
        <code className="text-xs text-muted-foreground">{variable}</code>
      </div>
    </div>
  );
}
