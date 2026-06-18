// Icon components using Google Material Symbols (Rounded, Filled)
// https://fonts.google.com/icons?icon.style=Rounded

/**
 * Base Icon component for Material Symbols
 * @param {string} name - Material Symbol icon name (e.g., "home", "settings")
 * @param {string} className - Additional CSS classes
 * @param {string} size - Size variant: "sm" (16px), "md" (20px), "lg" (24px), "xl" (28px)
 * @param {boolean} outlined - Use outlined variant instead of filled
 */
export function Icon({ name, className = '', size = 'md', outlined = false }) {
  const sizeClass = size !== 'md' ? `icon-${size}` : '';
  const outlinedClass = outlined ? 'icon-outlined' : '';
  
  return (
    <span 
      className={`material-symbols-rounded ${sizeClass} ${outlinedClass} ${className}`.trim()}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

// ========================================
// Navigation & Primary Icons
// ========================================

export function HomeIcon({ className, active }) {
  return <Icon name="home" className={className} />;
}

export function InboxIcon({ className }) {
  return <Icon name="inbox" className={className} />;
}

export function ContactsIcon({ className }) {
  return <Icon name="group" className={className} />;
}

export function BuildingIcon({ className }) {
  return <Icon name="apartment" className={className} />;
}

export function ShapesIcon({ className }) {
  return <Icon name="category" className={className} />;
}

export function ChartIcon({ className }) {
  return <Icon name="bar_chart" className={className} />;
}

export function GearIcon({ className }) {
  return <Icon name="settings" className={className} />;
}

export function SidebarIcon({ className }) {
  return <img src="/assets/Primary Nav Item/Sidebar.svg" alt="" className={className} width={20} height={20} />;
}

// ========================================
// Ticket & Status Icons
// ========================================

export function TicketIcon({ className }) {
  return <Icon name="verified_user" className={className} size="sm" />;
}

export function UserFollowIcon({ className }) {
  return <Icon name="person_add" className={className} size="sm" />;
}

export function UserGroupIcon({ className }) {
  return <Icon name="groups" className={className} size="sm" />;
}

export function BoxIcon({ className }) {
  return <Icon name="package_2" className={className} size="sm" />;
}

// ========================================
// Communication Icons
// ========================================

export function PhoneIcon({ className }) {
  return <Icon name="call" className={className} size="sm" />;
}

export function ChatIcon({ className }) {
  return <Icon name="chat_bubble" className={className} size="sm" />;
}

export function EmailIcon({ className }) {
  return <Icon name="mail" className={className} size="sm" />;
}

// ========================================
// Action Icons
// ========================================

export function PlusIcon({ className }) {
  return <Icon name="add" className={className} size="sm" />;
}

export function SearchIcon({ className }) {
  return <Icon name="search" className={className} />;
}

export function FilterIcon({ className }) {
  return <Icon name="filter_list" className={className} size="sm" />;
}

export function SortIcon({ className }) {
  return <Icon name="sort" className={className} size="sm" />;
}

export function ChevronDownIcon({ className }) {
  return <Icon name="keyboard_arrow_down" className={className} size="sm" />;
}

export function ChevronDownSmallIcon({ className }) {
  return <Icon name="expand_more" className={className} size="sm" />;
}

export function CheckIcon({ className }) {
  return <Icon name="check" className={className} size="sm" />;
}

// ========================================
// App Header Icons
// ========================================

export function BellIcon({ className }) {
  return <Icon name="notifications" className={className} />;
}

export function AppsIcon({ className }) {
  return <Icon name="apps" className={className} />;
}

export function HelpIcon({ className }) {
  return <Icon name="help" className={className} outlined />;
}

// ========================================
// Theme Icons
// ========================================

export function SunIcon({ className }) {
  return <Icon name="light_mode" className={className} />;
}

export function MoonIcon({ className }) {
  return <Icon name="dark_mode" className={className} />;
}

// ========================================
// Utility Icons
// ========================================

export function SparkleIcon({ className }) {
  return <Icon name="auto_awesome" className={className} size="sm" />;
}

export function CalendarIcon({ className }) {
  return <Icon name="calendar_month" className={className} size="xl" />;
}

export function CalendarSmallIcon({ className }) {
  return <Icon name="calendar_today" className={className} size="sm" />;
}

export function ClockIcon({ className }) {
  return <Icon name="schedule" className={className} size="sm" />;
}

export function TagIcon({ className }) {
  return <Icon name="sell" className={className} size="sm" />;
}

export function CircleDotIcon({ className }) {
  return <Icon name="radio_button_checked" className={className} size="sm" />;
}

export function ClockAlertIcon({ className }) {
  return <Icon name="schedule" className={className} size="sm" />;
}

export function InfoIcon({ className }) {
  return <Icon name="info" className={className} size="sm" />;
}

export function DisplayIcon({ className }) {
  return <Icon name="tune" className={className} size="sm" />;
}

export function EditNoteIcon({ className }) {
  return <Icon name="edit_note" className={className} size="sm" />;
}

export function FormatTextIcon({ className }) {
  return <Icon name="format_size" className={className} size="sm" />;
}

export function EmojiIcon({ className }) {
  return <Icon name="mood" className={className} size="sm" />;
}

export function LinkIcon({ className }) {
  return <Icon name="link" className={className} size="sm" />;
}

export function TrendUpIcon({ className }) {
  return <Icon name="trending_up" className={className} size="sm" />;
}

export function TrendDownIcon({ className }) {
  return <Icon name="trending_down" className={className} size="sm" />;
}

export function DrillDownIcon({ className }) {
  return <Icon name="south_east" className={className} />;
}

export function UserIcon({ className }) {
  return <Icon name="person" className={className} size="sm" />;
}

export function StarIcon({ className }) {
  return <Icon name="star" className={className} size="sm" outlined />;
}

export function LayersIcon({ className }) {
  return <Icon name="layers" className={className} size="sm" />;
}

export function CloseIcon({ className }) {
  return <Icon name="close" className={className} size="sm" />;
}

// ========================================
// Brand Logo (keep as custom SVG)
// ========================================

export function ZendeskLogo({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 19.4L5 8V19.4H11ZM5 4.6C5 7.08 7.02 9.1 9.5 9.1C11.98 9.1 14 7.08 14 4.6H5ZM13 4.6V16L19 4.6H13ZM19 19.4C19 16.92 16.98 14.9 14.5 14.9C12.02 14.9 10 16.92 10 19.4H19Z" fill="currentColor"/>
    </svg>
  );
}

// ========================================
// WFM Page Icons
// ========================================

export function WFMLogoIcon({ className }) {
  return <Icon name="grid_view" className={className} size="lg" />;
}

export function WFMReportingIcon({ className, active }) {
  return <Icon name="monitoring" className={className} outlined={!active} />;
}

export function WFMSchedulingIcon({ className, active }) {
  return <Icon name="calendar_month" className={className} outlined={!active} />;
}

export function WFMForecastingIcon({ className, active }) {
  return <Icon name="timeline" className={className} outlined={!active} />;
}

export function WFMSettingsIcon({ className, active }) {
  return <Icon name="settings" className={className} outlined={!active} />;
}

import { assetUrl } from '../../utils/assetUrl';

export function AdminCenterProductIcon({ className }) {
  return <img src={assetUrl('/assets/admin center.svg')} alt="" className={className} aria-hidden="true" />;
}

export function SupportProductIcon({ className }) {
  return <img src={assetUrl('/assets/Product support.svg')} alt="" className={className} aria-hidden="true" />;
}

export function WFMProductIcon({ className }) {
  return <img src={assetUrl('/assets/Product workforce management.svg')} alt="" className={className} aria-hidden="true" />;
}

export function ExploreProductIcon({ className }) {
  return <Icon name="explore" className={className} size="lg" />;
}
