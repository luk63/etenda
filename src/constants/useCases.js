import React from 'react';
import { 
  BuildingOfficeIcon, 
  BuildingStorefrontIcon, 
  ComputerDesktopIcon,
  TruckIcon,
  BeakerIcon,
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';

export const useCases = [
  {
    title: 'Government Projects',
    description: 'Manage large public tenders efficiently and transparently.',
    icon: BuildingOfficeIcon,
    features: [
      'Transparent bidding process',
      'Automated compliance checks',
      'Secure document handling'
    ]
  },
  {
    title: 'Construction Companies',
    description: 'Find the best contractors for your construction projects.',
    icon: BuildingStorefrontIcon,
    features: [
      'Real-time bid updates',
      'Contractor verification',
      'Project milestone tracking'
    ]
  },
  {
    title: 'IT Services',
    description: 'Post software development contracts securely and efficiently.',
    icon: ComputerDesktopIcon,
    features: [
      'Technical requirement specs',
      'Code repository integration',
      'Agile project management'
    ]
  },
  {
    title: 'Logistics & Transport',
    description: 'Streamline transportation and logistics contract bidding.',
    icon: TruckIcon,
    features: [
      'Route optimization',
      'Fleet management integration',
      'Real-time tracking'
    ]
  },
  {
    title: 'Research & Development',
    description: 'Manage research grants and development contracts.',
    icon: BeakerIcon,
    features: [
      'Intellectual property protection',
      'Milestone-based funding',
      'Research collaboration tools'
    ]
  },
  {
    title: 'Manufacturing',
    description: 'Optimize your manufacturing tender process.',
    icon: WrenchScrewdriverIcon,
    features: [
      'Quality control metrics',
      'Supply chain integration',
      'Production capacity tracking'
    ]
  }
];