import { useState } from 'react';
import DesignShowcase from './DesignShowcase';
import DesignSystemShowcase from './DesignSystemShowcase';
import { Card, CardContent, Button } from '../components/library';
import { LayoutDashboardIcon, PackageIcon } from 'lucide-react';

export default function DEVGateway() {
  const [activeShowcase, setActiveShowcase] = useState<'gateway' | 'design-system' | 'component'>('gateway');

  // Gateway landing page
  if (activeShowcase === 'gateway') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1>Development Gateway</h1>
          </div>

          {/* Showcase Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Design System Showcase */}
            <Card className="hover:border-primary transition-colors" onClick={() => setActiveShowcase('design-system')}>
              <CardContent className="p-8 space-y-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <LayoutDashboardIcon className="h-6 w-6 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3>Design System Showcase</h3>
                  <p className="text-muted-foreground">
                    Living styleguide with merged design tokens, foundation examples, components, and patterns
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-sm text-muted-foreground">4 main tabs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-sm text-muted-foreground">29 subtabs total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-sm text-muted-foreground">Option A structure (recommended)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-primary font-medium">Explore Design System →</span>
                </div>
              </CardContent>
            </Card>

            {/* Component Showcase */}
            <Card className="hover:border-primary transition-colors" onClick={() => setActiveShowcase('component')}>
              <CardContent className="p-8 space-y-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <PackageIcon className="h-6 w-6 text-secondary" />
                </div>
                
                <div className="space-y-2">
                  <h3>Design Showcase</h3>
                  <p className="text-muted-foreground">
                    Original comprehensive showcase with variables, tokens, foundation, components, and patterns
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-info"></div>
                    <span className="text-sm text-muted-foreground">5 main tabs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-info"></div>
                    <span className="text-sm text-muted-foreground">38 subtabs total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-info"></div>
                    <span className="text-sm text-muted-foreground">Full coverage (legacy structure)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-secondary font-medium">Explore Components →</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Footer */}
          <Card className="bg-muted/30 border-muted">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-primary">ℹ️</span>
                </div>
                <div className="space-y-2">
                  <h4>About these showcases</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Design System Showcase</strong> implements the recommended Option A structure from the audit, merging Variables and Tokens into "Design Tokens" for reduced duplication and improved developer experience.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Design Showcase</strong> maintains the original 5-tab structure with separate Variables, Tokens, and Foundation tabs for complete backward compatibility.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Render Design System Showcase
  if (activeShowcase === 'design-system') {
    return (
      <div>
        {/* Back button */}
        <div className="sticky top-0 z-50 bg-background border-b border-border">
          <div className="container mx-auto px-6 py-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setActiveShowcase('gateway')}
            >
              ← Back to Gateway
            </Button>
          </div>
        </div>
        <DesignSystemShowcase />
      </div>
    );
  }

  // Render Component Showcase
  if (activeShowcase === 'component') {
    return (
      <div>
        {/* Back button */}
        <div className="sticky top-0 z-50 bg-background border-b border-border">
          <div className="container mx-auto px-6 py-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setActiveShowcase('gateway')}
            >
              ← Back to Gateway
            </Button>
          </div>
        </div>
        <DesignShowcase />
      </div>
    );
  }

  return null;
}
