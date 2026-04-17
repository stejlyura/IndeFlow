export type Theme = 'apple' | 'heritage' | 'berry' | 'mercedes' | 'wordpress';

export interface PageSection {
    id: string; // Unique key
    type: 'Hero' | 'LogoCloud' | 'Stats' | 'Expertise' | 'Workflow' | 'Disclaimer' | 'Pricing' | 'CallbackForm';
    data: any; // Specific component data interface
}

export interface PageConfig {
    theme: Theme;
    metaTitle: string;
    sections: PageSection[];
}

export interface PricingPlan {
    name: string;
    price: string;
    features: string[];
    buttonText: string;
    isPopular?: boolean;
}

export interface ComparisonRow {
    label: string;
    market: string;
    indexflow: string;
    isAccent?: boolean;
}

export interface ButtonConfig {
    href: string;
    label: string;
}

export interface WorkflowStep {
    number: string;
    tag: string;
    title: string;
    description: string;
}

export interface ExpertiseItem {
    title: string;
    description: string;
}