import { useState, useEffect, useCallback } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { 
  Card, 
  CardHeader, 
  CardContent,
  CardFooter,
  Button,
  Input,
  Textarea,
  Label,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SearchBar,
  Slider,
  Chip,
  Toggle,
  ListItem,
  Avatar,
  Alert,
  AlertTitle,
  AlertDescription,
  ProgressBar,
  LoadingSpinner,
  Skeleton,
  Toast,
  Badge,
  Modal,
  BottomSheet,
  TopBar,
  BottomNav,
  FloatingActionButton,
  Divider,
  Separator,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  EmptyState,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '../components/library';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  HomeIcon, 
  SettingsIcon, 
  UserIcon, 
  PlusIcon, 
  SearchIcon,
  BellIcon,
  CheckIcon,
  XIcon,
  AlertCircleIcon,
  InfoIcon,
  ChevronDownIcon,
  MenuIcon,
  InboxIcon
} from 'lucide-react';

export default function DesignSystemShowcase() {
  const [activeMainTab, setActiveMainTab] = useState('tokens');
  const [activeSubTab, setActiveSubTab] = useState('colors');

  // Asset management state
  const [icons, setIcons] = useState<{ name: string; signedUrl: string }[]>([]);
  const [illustrations, setIllustrations] = useState<{ name: string; signedUrl: string }[]>([]);
  const [logos, setLogos] = useState<{ name: string; signedUrl: string }[]>([]);
  const [loadingIcons, setLoadingIcons] = useState(false);
  const [loadingIllustrations, setLoadingIllustrations] = useState(false);
  const [loadingLogos, setLoadingLogos] = useState(false);
  const [assetsError, setAssetsError] = useState<string | null>(null);

  // Color palettes data
  const colorPalettes = [
    { name: 'Primary', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Gray', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Success', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Warning', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Error', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Info', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Red', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Orange', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Amber', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Yellow', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Lime', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Green', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Emerald', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Teal', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Cyan', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Sky', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Blue', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Indigo', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Violet', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Purple', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Fuchsia', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Pink', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Rose', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Slate', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Zinc', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Neutral', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Stone', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
    { name: 'Secondary', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] },
  ];

  // Semantic color tokens
  const semanticColorTokens = {
    'Primary UI': [
      { name: '--primary', value: 'var(--color-primary-500)', desc: 'Primary brand color' },
      { name: '--primary-foreground', value: '#ffffff', desc: 'Text on primary' },
      { name: '--accent', value: 'var(--color-primary-500)', desc: 'Accent highlights' },
      { name: '--accent-foreground', value: '#ffffff', desc: 'Text on accent' },
      { name: '--ring', value: 'var(--color-primary-500)', desc: 'Focus ring color' },
      { name: '--secondary', value: 'var(--color-secondary-900)', desc: 'Secondary actions' },
    ],
    'Feedback States': [
      { name: '--success', value: 'var(--color-success-500)', desc: 'Success messages' },
      { name: '--success-foreground', value: '#ffffff', desc: 'Text on success' },
      { name: '--warning', value: 'var(--color-warning-500)', desc: 'Warning messages' },
      { name: '--warning-foreground', value: '#000000', desc: 'Text on warning' },
      { name: '--destructive', value: 'var(--color-error-500)', desc: 'Error/destructive actions' },
      { name: '--destructive-foreground', value: '#ffffff', desc: 'Text on destructive' },
      { name: '--info', value: 'var(--color-info-500)', desc: 'Info messages' },
      { name: '--info-foreground', value: '#ffffff', desc: 'Text on info' },
    ],
    'Surface & Background': [
      { name: '--background', value: '#ffffff', desc: 'Page background' },
      { name: '--foreground', value: '#000000', desc: 'Default text color' },
      { name: '--card', value: '#ffffff', desc: 'Card background' },
      { name: '--card-foreground', value: '#000000', desc: 'Text on cards' },
      { name: '--popover', value: '#ffffff', desc: 'Popover background' },
      { name: '--popover-foreground', value: '#000000', desc: 'Text on popovers' },
      { name: '--muted', value: 'var(--color-gray-100)', desc: 'Muted backgrounds' },
      { name: '--muted-foreground', value: 'var(--color-gray-500)', desc: 'Muted text' },
    ],
    'Border & Input': [
      { name: '--border', value: 'var(--color-gray-200)', desc: 'Default borders' },
      { name: '--input', value: 'var(--color-gray-200)', desc: 'Input borders' },
      { name: '--input-background', value: '#ffffff', desc: 'Input backgrounds' },
      { name: '--input-foreground', value: '#000000', desc: 'Input text' },
    ],
    'Sidebar & Navigation': [
      { name: '--sidebar', value: 'var(--color-secondary-50)', desc: 'Sidebar background' },
      { name: '--sidebar-foreground', value: '#000000', desc: 'Sidebar text' },
      { name: '--sidebar-primary', value: 'var(--color-primary-500)', desc: 'Sidebar primary actions' },
      { name: '--sidebar-accent', value: 'var(--color-primary-500)', desc: 'Sidebar accents' },
      { name: '--sidebar-border', value: 'var(--color-gray-200)', desc: 'Sidebar borders' },
      { name: '--sidebar-ring', value: 'var(--color-primary-500)', desc: 'Sidebar focus rings' },
    ],
    'Chart Colors': [
      { name: '--chart-1', value: 'var(--color-primary-500)', desc: 'Chart color 1' },
      { name: '--chart-2', value: 'var(--color-blue-500)', desc: 'Chart color 2' },
      { name: '--chart-3', value: 'var(--color-primary-300)', desc: 'Chart color 3' },
      { name: '--chart-4', value: 'var(--color-primary-700)', desc: 'Chart color 4' },
      { name: '--chart-5', value: 'var(--color-blue-300)', desc: 'Chart color 5' },
    ],
  };

  // Main tab configuration
  const mainTabs = [
    { id: 'tokens', label: 'Design Tokens' },
    { id: 'foundation', label: 'Foundation' },
    { id: 'components', label: 'Components' },
    { id: 'patterns', label: 'Patterns' },
  ];

  // Subtab configuration for each main tab
  const subTabs: Record<string, Array<{ id: string; label: string }>> = {
    tokens: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'borders-radius', label: 'Borders & Radius' },
      { id: 'layout', label: 'Layout' },
      { id: 'motion', label: 'Motion' },
    ],
    foundation: [
      { id: 'color-system', label: 'Color System' },
      { id: 'typography-scale', label: 'Typography Scale' },
      { id: 'spacing-examples', label: 'Spacing Examples' },
      { id: 'borders-radius-examples', label: 'Borders & Radius' },
      { id: 'shadows', label: 'Shadows & Elevation' },
      { id: 'effects', label: 'Effects & Animations' },
      { id: 'layout-zindex', label: 'Layout & Z-Index' },
      { id: 'interactive-states', label: 'Interactive States' },
      { id: 'icons', label: 'Icons' },
      { id: 'brand-assets', label: 'Brand Assets (Logos)' },
      { id: 'icons-assets', label: 'Icon Assets' },
      { id: 'illustrations', label: 'Illustrations' },
    ],
    components: [
      { id: 'navigation', label: 'Navigation' },
      { id: 'actions', label: 'Actions' },
      { id: 'inputs', label: 'Inputs' },
      { id: 'display', label: 'Display' },
      { id: 'feedback', label: 'Feedback' },
      { id: 'lists-tables', label: 'Lists & Tables' },
      { id: 'layout-components', label: 'Layout' },
      { id: 'dialogs', label: 'Dialogs' },
      { id: 'menus', label: 'Menus' },
      { id: 'overlays', label: 'Overlays' },
    ],
    patterns: [
      { id: 'forms', label: 'Forms' },
      { id: 'navigation-patterns', label: 'Navigation' },
      { id: 'data-display', label: 'Data Display' },
      { id: 'page-layouts', label: 'Page Layouts' },
    ],
  };

  // Get current subtabs based on active main tab
  const currentSubTabs = subTabs[activeMainTab] || [];

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
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          signal: abortController.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('Server error loading icons:', data.error);
        setAssetsError(data.error);
        setIcons([]);
      } else {
        console.log(`✅ Loaded ${data.files?.length || 0} icons from server`);
        setIcons(data.files || []);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching icons:', error);
        setAssetsError(error.message || 'Failed to load icons');
      }
    } finally {
      setLoadingIcons(false);
    }

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
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          signal: abortController.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('Server error loading illustrations:', data.error);
        setAssetsError(data.error);
        setIllustrations([]);
      } else {
        console.log(`✅ Loaded ${data.files?.length || 0} illustrations from server`);
        setIllustrations(data.files || []);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching illustrations:', error);
        setAssetsError(error.message || 'Failed to load illustrations');
      }
    } finally {
      setLoadingIllustrations(false);
    }

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
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          signal: abortController.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('Server error loading logos:', data.error);
        setAssetsError(data.error);
        setLogos([]);
      } else {
        console.log(`✅ Loaded ${data.files?.length || 0} logos from server`);
        setLogos(data.files || []);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching logos:', error);
        setAssetsError(error.message || 'Failed to load logos');
      }
    } finally {
      setLoadingLogos(false);
    }

    return () => abortController.abort();
  }, []);

  // Load assets when navigating to asset tabs
  useEffect(() => {
    if (activeMainTab === 'foundation') {
      if (activeSubTab === 'icons-assets' && icons.length === 0 && !loadingIcons) {
        fetchIcons();
      } else if (activeSubTab === 'illustrations' && illustrations.length === 0 && !loadingIllustrations) {
        fetchIllustrations();
      } else if (activeSubTab === 'brand-assets' && logos.length === 0 && !loadingLogos) {
        fetchLogos();
      }
    }
  }, [activeMainTab, activeSubTab, icons.length, illustrations.length, logos.length, loadingIcons, loadingIllustrations, loadingLogos, fetchIcons, fetchIllustrations, fetchLogos]);

  // Update subtab when main tab changes
  const handleMainTabChange = (tabId: string) => {
    setActiveMainTab(tabId);
    setActiveSubTab(subTabs[tabId]?.[0]?.id || '');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-8">
          <h1>Design System Showcase</h1>
          <h2 className="text-muted-foreground mt-2">Living Styleguide</h2>
          <p className="text-muted-foreground mt-4">
            Comprehensive documentation of design tokens, components, and patterns with interactive examples.
          </p>
        </div>
      </header>

      {/* Main Tabs */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleMainTabChange(tab.id)}
                className={`px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeMainTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subtabs */}
      {currentSubTabs.length > 0 && (
        <div className="border-b border-border bg-card sticky top-[57px] z-10">
          <div className="container mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2">
              {currentSubTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                    activeSubTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        {/* DESIGN TOKENS TAB */}
        {activeMainTab === 'tokens' && (
          <>
            {/* Colors Subtab */}
            {activeSubTab === 'colors' && (
              <div className="space-y-8">
                {/* Section 1: Raw Color Variables */}
                <section>
                  <h3 className="mb-6">Raw Color Variables</h3>
                  <p className="text-muted-foreground mb-6">
                    Foundation color palettes with 11 shades each. Use these for building semantic tokens.
                  </p>
                  
                  <div className="space-y-8">
                    {colorPalettes.map((palette) => (
                      <div key={palette.name}>
                        <h4 className="mb-4">{palette.name}</h4>
                        <div className="grid grid-cols-11 gap-2">
                          {palette.shades.map((shade) => {
                            const varName = `--color-${palette.name.toLowerCase()}-${shade}`;
                            return (
                              <div key={shade} className="space-y-2">
                                <div
                                  className="h-20 rounded-md border border-border"
                                  style={{ backgroundColor: `var(${varName})` }}
                                />
                                <div className="text-center">
                                  <div className="text-xs font-mono">{shade}</div>
                                  <div className="text-xs text-muted-foreground font-mono mt-1">
                                    {varName}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <Divider />

                {/* Section 2: Semantic Color Tokens */}
                <section>
                  <h3 className="mb-6">Semantic Color Tokens</h3>
                  <p className="text-muted-foreground mb-6">
                    Context-aware tokens that reference raw color variables. Use these in your UI components.
                  </p>

                  <div className="space-y-8">
                    {Object.entries(semanticColorTokens).map(([category, tokens]) => (
                      <div key={category}>
                        <h4 className="mb-4">{category}</h4>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {tokens.map((token) => (
                            <Card key={token.name}>
                              <CardContent className="p-4">
                                <div className="flex gap-4 items-center">
                                  <div
                                    className="w-16 h-16 rounded-md border border-border shrink-0"
                                    style={{ backgroundColor: token.value.startsWith('var(') 
                                      ? token.value 
                                      : token.value 
                                    }}
                                  />
                                  <div className="min-w-0 flex-1">
                                    <div className="font-mono text-sm truncate">{token.name}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {token.desc}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-mono mt-1 truncate">
                                      {token.value}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <Divider />

                {/* Section 3: Usage Guide */}
                <section>
                  <h3 className="mb-6">Usage Guide</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <h4>Raw Variables</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Use raw color variables when building new semantic tokens or when you need a specific shade.
                        </p>
                        <div className="bg-muted p-4 rounded-md font-mono text-sm">
                          <div>background: var(--color-primary-500);</div>
                          <div>color: var(--color-gray-900);</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h4>Semantic Tokens</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Prefer semantic tokens in UI components for consistent theming and easier maintenance.
                        </p>
                        <div className="bg-muted p-4 rounded-md font-mono text-sm">
                          <div>background: var(--primary);</div>
                          <div>color: var(--primary-foreground);</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            )}

            {/* Typography Subtab */}
            {activeSubTab === 'typography' && (
              <div className="space-y-8">
                {/* Section 1: Raw Typography Variables */}
                <section>
                  <h3 className="mb-6">Raw Typography Variables</h3>
                  <p className="text-muted-foreground mb-6">
                    Foundation typography system including font families, sizes, weights, and spacing.
                  </p>

                  <div className="space-y-8">
                    {/* Font Families */}
                    <div>
                      <h4 className="mb-4">Font Families</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div>
                                <div className="font-mono text-sm text-muted-foreground">--font-family-lufga</div>
                                <div style={{ fontFamily: 'var(--font-family-lufga)' }} className="text-2xl mt-2">
                                  The quick brown fox jumps over the lazy dog
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Primary font for headings, body text, and buttons
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div>
                                <div className="font-mono text-sm text-muted-foreground">--font-family-geist</div>
                                <div style={{ fontFamily: 'var(--font-family-geist)' }} className="text-2xl mt-2">
                                  The quick brown fox jumps over the lazy dog
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Used exclusively for labels (form labels, UI labels)
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Font Sizes */}
                    <div>
                      <h4 className="mb-4">Font Sizes</h4>
                      <div className="space-y-2">
                        {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].map((size) => (
                          <div key={size} className="flex items-baseline gap-4 p-4 border border-border rounded-md">
                            <div className="w-24 font-mono text-sm text-muted-foreground">--font-size-{size}</div>
                            <div style={{ fontSize: `var(--font-size-${size})` }}>
                              Sample Text {size}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Font Weights */}
                    <div>
                      <h4 className="mb-4">Font Weights</h4>
                      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
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
                          <div key={weight.name} className="p-4 border border-border rounded-md">
                            <div className="font-mono text-sm text-muted-foreground">
                              --font-weight-{weight.name}
                            </div>
                            <div style={{ fontWeight: weight.value }} className="text-lg mt-2">
                              {weight.name} ({weight.value})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <Divider />

                {/* Section 2: Semantic Typography Tokens */}
                <section>
                  <h3 className="mb-6">Semantic Typography Tokens</h3>
                  <p className="text-muted-foreground mb-6">
                    Context-aware typography tokens for specific UI elements.
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <h4>Heading Tokens</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">--font-family-heading</div>
                          <div className="text-muted-foreground text-sm">Value: var(--font-family-lufga)</div>
                        </div>
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">--font-weight-heading</div>
                          <div className="text-muted-foreground text-sm">Value: 700 (bold)</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h4>Body Tokens</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">--font-family-body</div>
                          <div className="text-muted-foreground text-sm">Value: var(--font-family-lufga)</div>
                        </div>
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">--font-weight-body</div>
                          <div className="text-muted-foreground text-sm">Value: 400 (normal)</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h4>Label Tokens</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">--font-family-label</div>
                          <div className="text-muted-foreground text-sm">Value: var(--font-family-geist)</div>
                        </div>
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">--font-weight-label</div>
                          <div className="text-muted-foreground text-sm">Value: 500 (medium)</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h4>Button Tokens</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">--font-family-button</div>
                          <div className="text-muted-foreground text-sm">Value: var(--font-family-lufga)</div>
                        </div>
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">--font-weight-button</div>
                          <div className="text-muted-foreground text-sm">Value: 600 (semibold)</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <Divider />

                {/* Section 3: Usage Guide */}
                <section>
                  <h3 className="mb-6">Usage Guide</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <h4>For Headings</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Use Lufga font family for all headings (h1-h6).
                        </p>
                        <div className="bg-muted p-4 rounded-md font-mono text-sm">
                          <div>font-family: var(--font-family-heading);</div>
                          <div>font-weight: var(--font-weight-heading);</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h4>For Labels</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Use Geist font family exclusively for form labels and UI labels.
                        </p>
                        <div className="bg-muted p-4 rounded-md font-mono text-sm">
                          <div>font-family: var(--font-family-label);</div>
                          <div>font-weight: var(--font-weight-label);</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            )}

            {/* Spacing Subtab */}
            {activeSubTab === 'spacing' && (
              <div className="space-y-8">
                {/* Section 1: Raw Spacing Variables */}
                <section>
                  <h3 className="mb-6">Raw Spacing Variables</h3>
                  <p className="text-muted-foreground mb-6">
                    Foundation spacing scale from 0 to 96 (in pixels).
                  </p>

                  <div className="space-y-2">
                    {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96].map((size) => (
                      <div key={size} className="flex items-center gap-4 p-4 border border-border rounded-md">
                        <div className="w-32 font-mono text-sm">--spacing-{size}</div>
                        <div className="text-sm text-muted-foreground w-16">{size}px</div>
                        <div
                          className="h-8 bg-primary"
                          style={{ width: `${size}px` }}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <Divider />

                {/* Section 2: Semantic Spacing Tokens */}
                <section>
                  <h3 className="mb-6">Semantic Spacing Tokens</h3>
                  <p className="text-muted-foreground mb-6">
                    Context-aware spacing tokens for sections and components.
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <h4>Section Spacing</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {['sm', 'md', 'lg', 'xl'].map((size) => (
                          <div key={size}>
                            <div className="font-mono text-sm">--spacing-section-{size}</div>
                            <div className="text-sm text-muted-foreground">
                              For spacing between major page sections
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h4>Component Spacing</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {['xxs', 'xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                          <div key={size}>
                            <div className="font-mono text-sm">--spacing-component-{size}</div>
                            <div className="text-sm text-muted-foreground">
                              For spacing within components
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <Divider />

                {/* Section 3: Usage Guide */}
                <section>
                  <h3 className="mb-6">Usage Guide</h3>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground">
                        Use spacing tokens for consistent padding, margins, and gaps throughout your UI.
                      </p>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm space-y-2">
                        <div>/* Component spacing */</div>
                        <div>padding: var(--spacing-component-md);</div>
                        <div>gap: var(--spacing-component-sm);</div>
                        <div></div>
                        <div>/* Section spacing */</div>
                        <div>margin-bottom: var(--spacing-section-lg);</div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
            )}

            {/* Borders & Radius Subtab */}
            {activeSubTab === 'borders-radius' && (
              <div className="space-y-8">
                {/* Section 1: Raw Border & Radius Variables */}
                <section>
                  <h3 className="mb-6">Raw Border & Radius Variables</h3>
                  
                  <div className="space-y-8">
                    {/* Border Widths */}
                    <div>
                      <h4 className="mb-4">Border Widths</h4>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
                          { name: 'none', value: '0' },
                          { name: 'DEFAULT', value: '1px' },
                          { name: '2', value: '2px' },
                          { name: '4', value: '4px' },
                          { name: '8', value: '8px' },
                        ].map((border) => (
                          <Card key={border.name}>
                            <CardContent className="p-6">
                              <div className="font-mono text-sm text-muted-foreground mb-4">
                                --border-width-{border.name}
                              </div>
                              <div
                                className="h-20 bg-muted"
                                style={{
                                  border: `${border.value} solid var(--border)`,
                                }}
                              />
                              <div className="text-sm text-muted-foreground mt-2">{border.value}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Border Radius */}
                    <div>
                      <h4 className="mb-4">Border Radius</h4>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
                          { name: 'none', value: '0' },
                          { name: 'sm', value: '0.125rem' },
                          { name: 'DEFAULT', value: '0.25rem' },
                          { name: 'md', value: '0.375rem' },
                          { name: 'lg', value: '0.5rem' },
                          { name: 'xl', value: '0.75rem' },
                          { name: '2xl', value: '1rem' },
                          { name: '3xl', value: '1.5rem' },
                          { name: 'full', value: '9999px' },
                        ].map((radius) => (
                          <Card key={radius.name}>
                            <CardContent className="p-6">
                              <div className="font-mono text-sm text-muted-foreground mb-4">
                                --radius-{radius.name}
                              </div>
                              <div
                                className="h-20 bg-primary"
                                style={{
                                  borderRadius: radius.value,
                                }}
                              />
                              <div className="text-sm text-muted-foreground mt-2">{radius.value}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <Divider />

                {/* Section 2: Semantic Radius Tokens */}
                <section>
                  <h3 className="mb-6">Semantic Radius Tokens</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      { name: 'button', desc: 'Button border radius' },
                      { name: 'input', desc: 'Input field border radius' },
                      { name: 'card', desc: 'Card border radius' },
                      { name: 'modal', desc: 'Modal border radius' },
                      { name: 'tooltip', desc: 'Tooltip border radius' },
                      { name: 'badge', desc: 'Badge border radius' },
                    ].map((token) => (
                      <Card key={token.name}>
                        <CardContent className="p-6">
                          <div className="font-mono text-sm text-muted-foreground mb-2">
                            --radius-{token.name}
                          </div>
                          <div className="text-sm text-muted-foreground mb-4">{token.desc}</div>
                          <div
                            className="h-16 bg-primary"
                            style={{
                              borderRadius: `var(--radius-${token.name})`,
                            }}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <Divider />

                {/* Section 3: Usage Guide */}
                <section>
                  <h3 className="mb-6">Usage Guide</h3>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground">
                        Use semantic radius tokens for specific UI elements to maintain consistency.
                      </p>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm space-y-2">
                        <div>/* Semantic tokens (preferred) */</div>
                        <div>border-radius: var(--radius-button);</div>
                        <div>border-radius: var(--radius-card);</div>
                        <div></div>
                        <div>/* Raw values (for custom elements) */</div>
                        <div>border-radius: var(--radius-lg);</div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
            )}

            {/* Layout Subtab */}
            {activeSubTab === 'layout' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Layout Tokens</h3>
                  <p className="text-muted-foreground mb-6">
                    Z-index scale and container max-widths for consistent layout.
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <h4>Z-Index Scale</h4>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {[
                          { name: 'base', value: '0' },
                          { name: 'dropdown', value: '1000' },
                          { name: 'sticky', value: '1020' },
                          { name: 'fixed', value: '1030' },
                          { name: 'modal-backdrop', value: '1040' },
                          { name: 'modal', value: '1050' },
                          { name: 'popover', value: '1060' },
                          { name: 'tooltip', value: '1070' },
                          { name: 'toast', value: '1080' },
                          { name: 'overlay', value: '1090' },
                        ].map((z) => (
                          <div key={z.name} className="flex justify-between items-center p-2 border border-border rounded">
                            <span className="font-mono text-sm">--z-{z.name}</span>
                            <span className="text-muted-foreground">{z.value}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h4>Container Max-Widths</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm">
                          Use container tokens for responsive layouts.
                        </p>
                        <div className="bg-muted p-4 rounded-md font-mono text-sm space-y-2">
                          <div>max-width: var(--container-sm);</div>
                          <div>max-width: var(--container-md);</div>
                          <div>max-width: var(--container-lg);</div>
                          <div>max-width: var(--container-xl);</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            )}

            {/* Motion Subtab */}
            {activeSubTab === 'motion' && (
              <div className="space-y-8">
                {/* Section 1: Raw Animation Variables */}
                <section>
                  <h3 className="mb-6">Raw Animation Variables</h3>
                  <p className="text-muted-foreground mb-6">
                    Foundation transition durations for animations.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      { name: 'instant', value: '0ms', desc: 'No animation' },
                      { name: 'fast', value: '100ms', desc: 'Quick interactions' },
                      { name: 'base', value: '200ms', desc: 'Default transitions' },
                      { name: 'slow', value: '300ms', desc: 'Deliberate animations' },
                      { name: 'slower', value: '500ms', desc: 'Emphasized motion' },
                    ].map((duration) => (
                      <Card key={duration.name}>
                        <CardContent className="p-6">
                          <div className="font-mono text-sm text-muted-foreground mb-2">
                            --duration-{duration.name}
                          </div>
                          <div className="text-sm text-muted-foreground mb-4">{duration.desc}</div>
                          <div className="text-lg">{duration.value}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <Divider />

                {/* Section 2: Motion Tokens */}
                <section>
                  <h3 className="mb-6">Motion Tokens</h3>
                  <p className="text-muted-foreground mb-6">
                    Semantic tokens for consistent motion design.
                  </p>

                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="font-mono text-sm">--transition-fast</div>
                        <div className="text-sm text-muted-foreground">
                          For hover states and quick feedback: 100ms
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-mono text-sm">--transition-base</div>
                        <div className="text-sm text-muted-foreground">
                          For most UI transitions: 200ms
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-mono text-sm">--transition-slow</div>
                        <div className="text-sm text-muted-foreground">
                          For modals and overlays: 300ms
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                <Divider />

                {/* Section 3: Usage Guide */}
                <section>
                  <h3 className="mb-6">Usage Guide</h3>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground">
                        Apply consistent transition durations to create smooth, predictable animations.
                      </p>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm space-y-2">
                        <div>/* Hover states */</div>
                        <div>transition: background-color var(--duration-fast);</div>
                        <div></div>
                        <div>/* Modal animations */</div>
                        <div>transition: opacity var(--duration-slow);</div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
            )}
          </>
        )}

        {/* FOUNDATION TAB */}
        {activeMainTab === 'foundation' && (
          <>
            {/* Color System */}
            {activeSubTab === 'color-system' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Color System Applications</h3>
                  <p className="text-muted-foreground mb-6">
                    Visual examples of semantic colors in use across UI elements.
                  </p>

                  <div className="space-y-8">
                    {/* Primary UI Colors */}
                    <div>
                      <h4 className="mb-4">Primary UI Colors</h4>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                          <div className="font-mono text-sm mb-2">primary</div>
                          <p>Primary brand color for buttons, links, and key actions</p>
                        </div>
                        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                          <div className="font-mono text-sm mb-2">secondary</div>
                          <p>Secondary actions and alternative styling</p>
                        </div>
                        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
                          <div className="font-mono text-sm mb-2">accent</div>
                          <p>Accent highlights and emphasized elements</p>
                        </div>
                      </div>
                    </div>

                    {/* Feedback States */}
                    <div>
                      <h4 className="mb-4">Feedback States</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Alert variant="success">
                          <CheckIcon className="h-4 w-4" />
                          <AlertTitle>Success</AlertTitle>
                          <AlertDescription>
                            This is a success message using --success color token.
                          </AlertDescription>
                        </Alert>
                        <Alert variant="warning">
                          <AlertCircleIcon className="h-4 w-4" />
                          <AlertTitle>Warning</AlertTitle>
                          <AlertDescription>
                            This is a warning message using --warning color token.
                          </AlertDescription>
                        </Alert>
                        <Alert variant="destructive">
                          <XIcon className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>
                            This is an error message using --destructive color token.
                          </AlertDescription>
                        </Alert>
                        <Alert variant="info">
                          <InfoIcon className="h-4 w-4" />
                          <AlertTitle>Info</AlertTitle>
                          <AlertDescription>
                            This is an info message using --info color token.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>

                    {/* Surface & Background */}
                    <div>
                      <h4 className="mb-4">Surface & Background</h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-6 bg-background border border-border rounded-lg">
                          <div className="font-mono text-sm mb-2">background</div>
                          <p className="text-foreground">Main page background with default text</p>
                        </div>
                        <div className="p-6 bg-card border border-border rounded-lg">
                          <div className="font-mono text-sm mb-2">card</div>
                          <p className="text-card-foreground">Card surface with card text</p>
                        </div>
                        <div className="p-6 bg-muted border border-border rounded-lg">
                          <div className="font-mono text-sm mb-2">muted</div>
                          <p className="text-muted-foreground">Muted background with muted text</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Typography Scale */}
            {activeSubTab === 'typography-scale' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Typography Hierarchy</h3>
                  <p className="text-muted-foreground mb-6">
                    Heading and text styles demonstrating the complete typography scale.
                  </p>

                  <div className="space-y-6">
                    <div className="p-6 border border-border rounded-lg">
                      <h1>Heading 1 - Page Title</h1>
                      <p className="text-muted-foreground text-sm mt-2">Uses Lufga font family</p>
                    </div>
                    <div className="p-6 border border-border rounded-lg">
                      <h2>Heading 2 - Section Title</h2>
                      <p className="text-muted-foreground text-sm mt-2">Uses Lufga font family</p>
                    </div>
                    <div className="p-6 border border-border rounded-lg">
                      <h3>Heading 3 - Subsection Title</h3>
                      <p className="text-muted-foreground text-sm mt-2">Uses Lufga font family</p>
                    </div>
                    <div className="p-6 border border-border rounded-lg">
                      <h4>Heading 4 - Component Title</h4>
                      <p className="text-muted-foreground text-sm mt-2">Uses Lufga font family</p>
                    </div>
                    <div className="p-6 border border-border rounded-lg">
                      <h5>Heading 5 - Small Section</h5>
                      <p className="text-muted-foreground text-sm mt-2">Uses Lufga font family</p>
                    </div>
                    <div className="p-6 border border-border rounded-lg">
                      <h6>Heading 6 - Smallest Heading</h6>
                      <p className="text-muted-foreground text-sm mt-2">Uses Lufga font family</p>
                    </div>
                    <div className="p-6 border border-border rounded-lg">
                      <p>
                        This is body text using the Lufga font family. It demonstrates the default paragraph styling with proper line height and spacing for optimal readability. Body text should be comfortable to read for extended periods.
                      </p>
                    </div>
                    <div className="p-6 border border-border rounded-lg">
                      <Label>Form Label Text</Label>
                      <p className="text-muted-foreground text-sm mt-2">Uses Geist font family (exclusive to labels)</p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Spacing Examples */}
            {activeSubTab === 'spacing-examples' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Spacing in Practice</h3>
                  <p className="text-muted-foreground mb-6">
                    Visual demonstrations of spacing tokens in real UI layouts.
                  </p>

                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">Component Spacing</h4>
                      <Card>
                        <CardContent className="p-6 space-y-4">
                          <div className="p-4 bg-primary/10 rounded border-2 border-dashed border-primary">
                            spacing-component-sm (4px gap)
                          </div>
                          <div className="p-4 bg-primary/10 rounded border-2 border-dashed border-primary">
                            spacing-component-sm (4px gap)
                          </div>
                          <div className="p-6 bg-primary/10 rounded border-2 border-dashed border-primary">
                            spacing-component-md (8px padding)
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="mb-4">Section Spacing</h4>
                      <div className="space-y-8">
                        <div className="p-8 bg-muted rounded border-2 border-dashed border-border">
                          Section with spacing-section-md (24px)
                        </div>
                        <div className="p-8 bg-muted rounded border-2 border-dashed border-border">
                          Section with spacing-section-md (24px)
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Borders & Radius */}
            {activeSubTab === 'borders-radius-examples' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Borders & Radius in Practice</h3>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-24 bg-primary rounded-sm mb-4"></div>
                        <p className="text-sm">Small radius (buttons, inputs)</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-24 bg-primary rounded-md mb-4"></div>
                        <p className="text-sm">Medium radius (cards, modals)</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-24 bg-primary rounded-lg mb-4"></div>
                        <p className="text-sm">Large radius (panels)</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            )}

            {/* Shadows & Elevation */}
            {activeSubTab === 'shadows' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Elevation Scale</h3>
                  <p className="text-muted-foreground mb-6">
                    Shadow system for creating depth and hierarchy.
                  </p>

                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="p-8 bg-card rounded-lg" style={{ boxShadow: 'var(--elevation-sm)' }}>
                      <div className="font-mono text-sm mb-2">elevation-sm</div>
                      <p className="text-muted-foreground">Subtle elevation for cards</p>
                    </div>
                    <div className="p-8 bg-card rounded-lg" style={{ boxShadow: 'var(--elevation-md)' }}>
                      <div className="font-mono text-sm mb-2">elevation-md</div>
                      <p className="text-muted-foreground">Medium elevation for dropdowns</p>
                    </div>
                    <div className="p-8 bg-card rounded-lg" style={{ boxShadow: 'var(--elevation-lg)' }}>
                      <div className="font-mono text-sm mb-2">elevation-lg</div>
                      <p className="text-muted-foreground">Large elevation for modals</p>
                    </div>
                    <div className="p-8 bg-card rounded-lg" style={{ boxShadow: 'var(--elevation-xl)' }}>
                      <div className="font-mono text-sm mb-2">elevation-xl</div>
                      <p className="text-muted-foreground">Extra large for emphasized content</p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Effects & Animations */}
            {activeSubTab === 'effects' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Effects & Animations</h3>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <h4>Opacity Effects</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-primary opacity-100"></div>
                          <div className="w-16 h-16 bg-primary opacity-75"></div>
                          <div className="w-16 h-16 bg-primary opacity-50"></div>
                          <div className="w-16 h-16 bg-primary opacity-25"></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          100%, 75%, 50%, 25% opacity
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h4>Transition Speeds</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button className="w-full transition-all duration-100 hover:scale-105">
                          Fast (100ms)
                        </Button>
                        <Button className="w-full transition-all duration-200 hover:scale-105">
                          Base (200ms)
                        </Button>
                        <Button className="w-full transition-all duration-300 hover:scale-105">
                          Slow (300ms)
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            )}

            {/* Layout & Z-Index */}
            {activeSubTab === 'layout-zindex' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Stacking Context</h3>
                  <p className="text-muted-foreground mb-6">
                    Z-index scale demonstration showing layering hierarchy.
                  </p>

                  <div className="relative h-96 bg-muted rounded-lg p-8">
                    <div className="absolute top-8 left-8 p-6 bg-background border border-border rounded-lg shadow-sm">
                      <div className="font-mono text-sm">z-base (0)</div>
                      <p className="text-sm text-muted-foreground mt-2">Base content layer</p>
                    </div>
                    <div className="absolute top-16 left-16 p-6 bg-card border border-border rounded-lg shadow-md">
                      <div className="font-mono text-sm">z-dropdown (1000)</div>
                      <p className="text-sm text-muted-foreground mt-2">Dropdown menus</p>
                    </div>
                    <div className="absolute top-24 left-24 p-6 bg-card border border-border rounded-lg shadow-lg">
                      <div className="font-mono text-sm">z-modal (1050)</div>
                      <p className="text-sm text-muted-foreground mt-2">Modal dialogs</p>
                    </div>
                    <div className="absolute top-32 left-32 p-6 bg-card border border-border rounded-lg shadow-xl">
                      <div className="font-mono text-sm">z-tooltip (1070)</div>
                      <p className="text-sm text-muted-foreground mt-2">Tooltips (highest)</p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Interactive States */}
            {activeSubTab === 'interactive-states' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Interactive States</h3>
                  <p className="text-muted-foreground mb-6">
                    Hover, focus, active, and disabled states for UI elements.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-4">Button States</h4>
                      <div className="flex gap-4 flex-wrap">
                        <Button>Default</Button>
                        <Button className="hover:bg-primary/90">Hover</Button>
                        <Button className="ring-2 ring-ring ring-offset-2">Focused</Button>
                        <Button className="active:scale-95">Active</Button>
                        <Button disabled>Disabled</Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Input States</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input placeholder="Default input" />
                        <Input placeholder="Focused input" className="ring-2 ring-ring" />
                        <Input placeholder="Error state" className="border-destructive" />
                        <Input placeholder="Disabled input" disabled />
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Loading States</h4>
                      <div className="flex gap-4 items-center">
                        <LoadingSpinner />
                        <ProgressBar value={65} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Icons */}
            {activeSubTab === 'icons' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Icon Library</h3>
                  <p className="text-muted-foreground mb-6">
                    Available icons from lucide-react.
                  </p>

                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <HomeIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Home</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <UserIcon className="h-6 w-6" />
                      <span className="text-xs text-center">User</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <SettingsIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Settings</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <SearchIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Search</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <BellIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Bell</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <PlusIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Plus</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <CheckIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Check</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <XIcon className="h-6 w-6" />
                      <span className="text-xs text-center">X</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircleIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Alert</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <InfoIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Info</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ChevronDownIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Chevron</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <MenuIcon className="h-6 w-6" />
                      <span className="text-xs text-center">Menu</span>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Brand Assets (Logos) Section */}
            {activeSubTab === 'brand-assets' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Brand Assets (Logos)</h3>
                  <p className="text-muted-foreground mb-6">
                    Logo assets from the design system stored in Supabase Storage
                  </p>
                </section>

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
                      <Card key={logo.name} className="p-6 hover:border-primary transition-colors">
                        <CardContent className="p-0 flex flex-col items-center gap-3">
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
                        </CardContent>
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

            {/* Icon Assets Section */}
            {activeSubTab === 'icons-assets' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Icon Assets</h3>
                  <p className="text-muted-foreground mb-6">
                    Icon assets from the design system stored in Supabase Storage
                  </p>
                </section>

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
                      <Card key={icon.name} className="p-4 hover:border-primary transition-colors">
                        <CardContent className="p-0 flex flex-col items-center gap-3">
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
                        </CardContent>
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
            {activeSubTab === 'illustrations' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Illustrations</h3>
                  <p className="text-muted-foreground mb-6">
                    Illustration assets from the design system stored in Supabase Storage
                  </p>
                </section>

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
                      <Card key={illustration.name} className="p-4 hover:border-primary transition-colors">
                        <CardContent className="p-0 flex flex-col gap-3">
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
                        </CardContent>
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
          </>
        )}

        {/* COMPONENTS TAB */}
        {activeMainTab === 'components' && (
          <>
            {/* Navigation Components */}
            {activeSubTab === 'navigation' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Navigation Components</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">TopBar</h4>
                      <TopBar 
                        title="Page Title" 
                        showBackButton 
                        actions={
                          <Button variant="ghost" size="sm">
                            <SettingsIcon className="h-5 w-5" />
                          </Button>
                        }
                      />
                    </div>

                    <div>
                      <h4 className="mb-4">Tabs</h4>
                      <Tabs defaultValue="tab1">
                        <TabsList>
                          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1">
                          <Card>
                            <CardContent className="p-6">
                              <p>Content for Tab 1</p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="tab2">
                          <Card>
                            <CardContent className="p-6">
                              <p>Content for Tab 2</p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="tab3">
                          <Card>
                            <CardContent className="p-6">
                              <p>Content for Tab 3</p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div>
                      <h4 className="mb-4">BottomNav</h4>
                      <div className="relative h-20 bg-muted rounded-lg overflow-hidden">
                        <BottomNav 
                          items={[
                            { id: 'home', label: 'Home', icon: <HomeIcon /> },
                            { id: 'search', label: 'Search', icon: <SearchIcon /> },
                            { id: 'profile', label: 'Profile', icon: <UserIcon /> },
                          ]}
                          activeId="home"
                          onItemClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Action Components */}
            {activeSubTab === 'actions' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Action Components</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">Button Variants</h4>
                      <div className="flex gap-4 flex-wrap">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Button Sizes</h4>
                      <div className="flex gap-4 items-center flex-wrap">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon"><PlusIcon /></Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">FloatingActionButton</h4>
                      <div className="relative h-32 bg-muted rounded-lg">
                        <FloatingActionButton 
                          icon={<PlusIcon />}
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Input Components */}
            {activeSubTab === 'inputs' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Input Components</h3>
                  
                  <div className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="mb-4">Text Input</h4>
                        <div className="space-y-4">
                          <div>
                            <Label>Email</Label>
                            <Input type="email" placeholder="Enter your email" />
                          </div>
                          <div>
                            <Label>Password</Label>
                            <Input type="password" placeholder="Enter password" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-4">Textarea</h4>
                        <Label>Message</Label>
                        <Textarea placeholder="Type your message here" rows={4} />
                      </div>

                      <div>
                        <h4 className="mb-4">SearchBar</h4>
                        <SearchBar 
                          value=""
                          onChange={() => {}}
                          placeholder="Search..."
                        />
                      </div>

                      <div>
                        <h4 className="mb-4">Select</h4>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <h4 className="mb-4">Checkbox</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Checkbox id="check1" />
                            <Label htmlFor="check1">Option 1</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="check2" />
                            <Label htmlFor="check2">Option 2</Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-4">Radio Group</h4>
                        <RadioGroup defaultValue="option1">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="option1" id="radio1" />
                            <Label htmlFor="radio1">Option 1</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="option2" id="radio2" />
                            <Label htmlFor="radio2">Option 2</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <h4 className="mb-4">Switch</h4>
                        <div className="flex items-center gap-2">
                          <Switch id="switch1" />
                          <Label htmlFor="switch1">Enable notifications</Label>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-4">Slider</h4>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>

                      <div>
                        <h4 className="mb-4">Toggle</h4>
                        <Toggle>Toggle</Toggle>
                      </div>

                      <div>
                        <h4 className="mb-4">Chip</h4>
                        <div className="flex gap-2 flex-wrap">
                          <Chip>Default</Chip>
                          <Chip variant="outline">Outline</Chip>
                          <Chip onRemove={() => {}}>Removable</Chip>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Display Components */}
            {activeSubTab === 'display' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Display Components</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">Card</h4>
                      <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <h4>Card Title</h4>
                            <p className="text-muted-foreground text-sm">Card description</p>
                          </CardHeader>
                          <CardContent>
                            <p>Card content goes here.</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <h4>Card with Footer</h4>
                          </CardHeader>
                          <CardContent>
                            <p>Card with all sections.</p>
                          </CardContent>
                          <CardFooter>
                            <Button>Action</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Badge</h4>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Avatar</h4>
                      <div className="flex gap-4 items-center">
                        <Avatar>JD</Avatar>
                        <Avatar size="lg">AB</Avatar>
                        <Avatar size="sm">XY</Avatar>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Feedback Components */}
            {activeSubTab === 'feedback' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Feedback Components</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">Alerts</h4>
                      <div className="space-y-4">
                        <Alert>
                          <InfoIcon className="h-4 w-4" />
                          <AlertTitle>Info</AlertTitle>
                          <AlertDescription>
                            This is an informational message.
                          </AlertDescription>
                        </Alert>
                        <Alert variant="success">
                          <CheckIcon className="h-4 w-4" />
                          <AlertTitle>Success</AlertTitle>
                          <AlertDescription>
                            Operation completed successfully!
                          </AlertDescription>
                        </Alert>
                        <Alert variant="warning">
                          <AlertCircleIcon className="h-4 w-4" />
                          <AlertTitle>Warning</AlertTitle>
                          <AlertDescription>
                            Please review this information carefully.
                          </AlertDescription>
                        </Alert>
                        <Alert variant="destructive">
                          <XIcon className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>
                            An error occurred. Please try again.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Loading States</h4>
                      <div className="flex gap-8 items-center">
                        <LoadingSpinner size="sm" />
                        <LoadingSpinner />
                        <LoadingSpinner size="lg" />
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Progress Bar</h4>
                      <div className="space-y-4">
                        <ProgressBar value={25} />
                        <ProgressBar value={50} />
                        <ProgressBar value={75} />
                        <ProgressBar value={100} />
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Skeleton</h4>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Empty State</h4>
                      <EmptyState
                        icon={<SearchIcon />}
                        title="No results found"
                        description="Try adjusting your search criteria"
                        action={<Button>Clear filters</Button>}
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Lists & Tables */}
            {activeSubTab === 'lists-tables' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Lists & Tables</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">List Items</h4>
                      <Card>
                        <CardContent className="p-0">
                          <ListItem
                            avatar={<Avatar>JD</Avatar>}
                            title="John Doe"
                            description="Software Engineer"
                            actions={<Button variant="ghost" size="sm">View</Button>}
                          />
                          <Divider />
                          <ListItem
                            avatar={<Avatar>AB</Avatar>}
                            title="Alice Brown"
                            description="Product Manager"
                            actions={<Button variant="ghost" size="sm">View</Button>}
                          />
                          <Divider />
                          <ListItem
                            avatar={<Avatar>CD</Avatar>}
                            title="Charlie Davis"
                            description="UX Designer"
                            actions={<Button variant="ghost" size="sm">View</Button>}
                          />
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="mb-4">Table</h4>
                      <Card>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>John Doe</TableCell>
                              <TableCell>Engineer</TableCell>
                              <TableCell><Badge variant="success">Active</Badge></TableCell>
                              <TableCell><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Alice Brown</TableCell>
                              <TableCell>Manager</TableCell>
                              <TableCell><Badge variant="success">Active</Badge></TableCell>
                              <TableCell><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Charlie Davis</TableCell>
                              <TableCell>Designer</TableCell>
                              <TableCell><Badge variant="warning">Away</Badge></TableCell>
                              <TableCell><Button variant="ghost" size="sm">Edit</Button></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Card>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Layout Components */}
            {activeSubTab === 'layout-components' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Layout Components</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">Divider</h4>
                      <Card>
                        <CardContent className="p-6">
                          <p>Content above divider</p>
                          <Divider />
                          <p>Content below divider</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="mb-4">Separator</h4>
                      <div className="flex gap-4 items-center">
                        <span>Item 1</span>
                        <Separator orientation="vertical" className="h-6" />
                        <span>Item 2</span>
                        <Separator orientation="vertical" className="h-6" />
                        <span>Item 3</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Accordion</h4>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item1">
                          <AccordionTrigger>Section 1</AccordionTrigger>
                          <AccordionContent>
                            Content for section 1 goes here.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item2">
                          <AccordionTrigger>Section 2</AccordionTrigger>
                          <AccordionContent>
                            Content for section 2 goes here.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item3">
                          <AccordionTrigger>Section 3</AccordionTrigger>
                          <AccordionContent>
                            Content for section 3 goes here.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Dialogs */}
            {activeSubTab === 'dialogs' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Dialog Components</h3>
                  <p className="text-muted-foreground mb-6">
                    Modal dialogs and bottom sheets for user interactions.
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <h4>Modal</h4>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Full-screen modal dialog component for important actions.
                        </p>
                        <Button>Open Modal</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h4>Bottom Sheet</h4>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Slide-up sheet for mobile-friendly interactions.
                        </p>
                        <Button>Open Bottom Sheet</Button>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            )}

            {/* Menus & Overlays */}
            {activeSubTab === 'menus' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Menus</h3>
                  <p className="text-muted-foreground mb-6">
                    Dropdown menus and context menus for actions.
                  </p>
                  
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">
                        Dropdown menu component with support for nested items, checkboxes, and radio groups.
                      </p>
                    </CardContent>
                  </Card>
                </section>
              </div>
            )}

            {/* Overlays */}
            {activeSubTab === 'overlays' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Overlays</h3>
                  <p className="text-muted-foreground mb-6">
                    Popovers and tooltips for contextual information.
                  </p>
                  
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">
                        Popover and tooltip components for displaying additional information.
                      </p>
                    </CardContent>
                  </Card>
                </section>
              </div>
            )}
          </>
        )}

        {/* PATTERNS TAB */}
        {activeMainTab === 'patterns' && (
          <>
            {/* Forms Pattern */}
            {activeSubTab === 'forms' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Form Patterns</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">Login Form</h4>
                      <Card className="max-w-md">
                        <CardHeader>
                          <h4>Sign In</h4>
                          <p className="text-muted-foreground text-sm">Enter your credentials to continue</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label>Email</Label>
                            <Input type="email" placeholder="you@example.com" />
                          </div>
                          <div>
                            <Label>Password</Label>
                            <Input type="password" placeholder="••••••••" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                          </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                          <Button className="w-full">Sign In</Button>
                          <Button variant="link" className="w-full">Forgot password?</Button>
                        </CardFooter>
                      </Card>
                    </div>

                    <div>
                      <h4 className="mb-4">Settings Form</h4>
                      <Card className="max-w-2xl">
                        <CardHeader>
                          <h4>Account Settings</h4>
                          <p className="text-muted-foreground text-sm">Manage your account preferences</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label>First Name</Label>
                              <Input placeholder="John" />
                            </div>
                            <div>
                              <Label>Last Name</Label>
                              <Input placeholder="Doe" />
                            </div>
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input type="email" placeholder="john@example.com" />
                          </div>
                          <div>
                            <Label>Bio</Label>
                            <Textarea placeholder="Tell us about yourself" rows={4} />
                          </div>
                          <Divider />
                          <div className="space-y-4">
                            <h5>Notifications</h5>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="email-notif">Email notifications</Label>
                              <Switch id="email-notif" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="push-notif">Push notifications</Label>
                              <Switch id="push-notif" />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button>Save Changes</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Navigation Patterns */}
            {activeSubTab === 'navigation-patterns' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Navigation Patterns</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">Mobile Navigation</h4>
                      <Card>
                        <CardContent className="p-0">
                          <TopBar title="Dashboard" />
                          <div className="p-6">
                            <p className="text-muted-foreground">Page content goes here</p>
                          </div>
                          <BottomNav 
                            items={[
                              { id: 'home', label: 'Home', icon: <HomeIcon /> },
                              { id: 'search', label: 'Search', icon: <SearchIcon /> },
                              { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
                            ]}
                            activeId="home"
                            onItemClick={() => {}}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Data Display Patterns */}
            {activeSubTab === 'data-display' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Data Display Patterns</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">Card Grid</h4>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <Card key={i}>
                            <CardHeader>
                              <h4>Card {i}</h4>
                              <p className="text-muted-foreground text-sm">Card description</p>
                            </CardHeader>
                            <CardContent>
                              <p>Content for card {i}</p>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" size="sm">View Details</Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">List View</h4>
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <h4>Team Members</h4>
                            <Button size="sm">
                              <PlusIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <ListItem
                            avatar={<Avatar>JD</Avatar>}
                            title="John Doe"
                            description="john@example.com"
                            actions={<Badge variant="success">Active</Badge>}
                          />
                          <Divider />
                          <ListItem
                            avatar={<Avatar>AB</Avatar>}
                            title="Alice Brown"
                            description="alice@example.com"
                            actions={<Badge variant="success">Active</Badge>}
                          />
                          <Divider />
                          <ListItem
                            avatar={<Avatar>CD</Avatar>}
                            title="Charlie Davis"
                            description="charlie@example.com"
                            actions={<Badge variant="warning">Away</Badge>}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Page Layouts */}
            {activeSubTab === 'page-layouts' && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-6">Page Layout Patterns</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4">Dashboard Layout</h4>
                      <Card>
                        <CardContent className="p-0">
                          <TopBar title="Dashboard" />
                          <div className="p-6 space-y-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                              <Card>
                                <CardContent className="p-6">
                                  <div className="text-muted-foreground text-sm">Total Users</div>
                                  <div className="text-3xl mt-2">1,234</div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-6">
                                  <div className="text-muted-foreground text-sm">Revenue</div>
                                  <div className="text-3xl mt-2">$12.5k</div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-6">
                                  <div className="text-muted-foreground text-sm">Active</div>
                                  <div className="text-3xl mt-2">856</div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-6">
                                  <div className="text-muted-foreground text-sm">Pending</div>
                                  <div className="text-3xl mt-2">42</div>
                                </CardContent>
                              </Card>
                            </div>
                            
                            <Card>
                              <CardHeader>
                                <h4>Recent Activity</h4>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">Activity feed content</p>
                              </CardContent>
                            </Card>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
