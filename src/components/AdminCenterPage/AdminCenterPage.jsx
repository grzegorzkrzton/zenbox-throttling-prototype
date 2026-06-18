import { useState } from 'react';
import { Anchor, Button } from '@zendeskgarden/react-buttons';
import TopBar from '../TopBar/TopBar';
import { 
  ChevronDownIcon, 
  HomeIcon,
  BuildingIcon,
  ContactsIcon,
  SparkleIcon,
  ShapesIcon,
  PlusIcon,
  GearIcon
} from '../Icons';
import PageSidebarNav from '../PageSidebarNav';
import QueuesPage from '../QueuesPage';
import './AdminCenterPage.css';

// Admin Center specific icons
function FlowIcon({ className, active }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H7.5C8.32843 3 9 3.67157 9 4.5V7.5C9 8.32843 8.32843 9 7.5 9H4.5C3.67157 9 3 8.32843 3 7.5V4.5Z" fill="currentColor"/>
      <path d="M11 12.5C11 11.6716 11.6716 11 12.5 11H15.5C16.3284 11 17 11.6716 17 12.5V15.5C17 16.3284 16.3284 17 15.5 17H12.5C11.6716 17 11 16.3284 11 15.5V12.5Z" fill="currentColor"/>
      <path d="M6 9V11.5C6 12.3284 6.67157 13 7.5 13H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 11V8.5C14 7.67157 13.3284 7 12.5 7H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function PaperPlaneIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 2.5L9.16667 10.8333M17.5 2.5L12.0833 17.5L9.16667 10.8333M17.5 2.5L2.5 7.91667L9.16667 10.8333" fill="currentColor"/>
    </svg>
  );
}

function MonitorIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="3.33334" width="15" height="10" rx="2" fill="currentColor"/>
      <path d="M6.66667 16.6667H13.3333M10 13.3333V16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function GridIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="11.5" y="11.5" width="6" height="6" rx="1.5" fill="currentColor"/>
    </svg>
  );
}

function GripIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="3" r="1" fill="currentColor"/>
      <circle cx="8" cy="3" r="1" fill="currentColor"/>
      <circle cx="4" cy="6" r="1" fill="currentColor"/>
      <circle cx="8" cy="6" r="1" fill="currentColor"/>
      <circle cx="4" cy="9" r="1" fill="currentColor"/>
      <circle cx="8" cy="9" r="1" fill="currentColor"/>
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return <span className={className} aria-hidden="true" />;
}

function AdminCenterLogo({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor"/>
      <circle cx="12" cy="12" r="4" fill="var(--color-bg-primary)"/>
      <path d="M12 9V12L14 13" stroke="var(--color-bg-primary)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Primary Navigation Items for Admin Center
const primaryNavItems = [
  { id: 'home', icon: HomeIcon, label: 'Home' },
  { id: 'account', icon: BuildingIcon, label: 'Account' },
  { id: 'people', icon: ContactsIcon, label: 'People' },
  { id: 'channels', icon: PaperPlaneIcon, label: 'Channels' },
  { id: 'ai', icon: SparkleIcon, label: 'AI' },
  { id: 'workspaces', icon: MonitorIcon, label: 'Workspaces' },
  { id: 'objects', icon: FlowIcon, label: 'Objects and rules', active: true },
  { id: 'apps', icon: GridIcon, label: 'Apps and integrations' },
];

// Secondary Navigation Data
const secondaryNavSections = [
  {
    title: 'Custom objects',
    items: [
      { id: 'objects', label: 'Objects' },
      { id: 'relationships', label: 'Relationships' },
    ]
  },
  {
    title: 'Omnichannel routing',
    items: [
      { id: 'routing-config', label: 'Routing configurations' },
      { id: 'queues', label: 'Queues' },
      { id: 'capacity-rules', label: 'Capacity rules' },
      { id: 'agent-statuses', label: 'Agent statuses' },
      { id: 'status-timeout', label: 'Status timeout' },
    ]
  },
  {
    title: 'Business rules',
    items: [
      { id: 'triggers', label: 'Triggers' },
      { id: 'skills', label: 'Skills' },
      { id: 'automations', label: 'Automations' },
      { id: 'sla', label: 'Service level agreement' },
      { id: 'schedules', label: 'Schedules' },
    ]
  }
];

// Sample conditions data
const sampleConditions = [
  { subject: 'Ticket', field: 'Brand', operator: 'Is', value: 'GHD NZ Sales Support' },
  { subject: 'Ticket', field: 'Group', operator: 'Is', value: 'Unassigned', nested: true },
  { subject: 'Requester', field: 'Language', operator: 'Is', value: 'New Zealand (English)', nested: true },
  { 
    subject: 'Ticket', 
    field: 'Received at', 
    operator: 'Is one of', 
    value: 'concierge@ghdhair.com.au, ghdbusiness@ghdhair.com, education@ghdhair.com',
    nested: true,
    wrapped: true
  },
];



function ConditionTag({ type, children, icon }) {
  return (
    <span className={`condition-tag condition-tag--${type}`}>
      {icon && <span className="condition-tag__icon">{icon}</span>}
      {children}
    </span>
  );
}

function ConditionRow({ condition, isFirst, showAnd }) {
  const subjectIcon = condition.subject === 'Ticket' ? '✉️' : '👤';
  
  return (
    <div className={`condition-row ${condition.nested ? 'condition-row--nested' : ''}`}>
      {condition.nested && <div className="condition-row__bracket" />}
      <div className="condition-row__content">
        <GripIcon className="condition-row__grip" />
        <ConditionTag type="subject">
          <span className="condition-tag__prefix">{condition.subject}</span>
          <span className="condition-tag__separator">{' > '}</span>
          <span className="condition-tag__field">{condition.field}</span>
        </ConditionTag>
        <span className="condition-row__operator">{condition.operator}</span>
        <ConditionTag type="value">
          {condition.value}
        </ConditionTag>
      </div>
    </div>
  );
}

function ConditionAndOr({ nested }) {
  return (
    <div className={`condition-andor ${nested ? 'condition-andor--nested' : ''}`}>
      {nested && <div className="condition-andor__bracket" />}
      <Anchor href="#" className="condition-andor__link">AND</Anchor>
    </div>
  );
}

export default function AdminCenterPage({ onProductChange, selectedProduct, products }) {
  const [triggerName, setTriggerName] = useState('B2B Routing NZ');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Routing');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeSubPage, setActiveSubPage] = useState('routing-config');

  const handleToggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleSubPageSelect = (itemId) => {
    if (itemId === 'routing-config') {
      setActiveSubPage(itemId);
    }
  };

  if (activeSubPage === 'routing-config') {
    return (
      <QueuesPage
        initialSubPage={activeSubPage}
        onProductChange={onProductChange}
        selectedProduct={selectedProduct}
        products={products}
      />
    );
  }

  return (
    <div className="admin-page">
      <TopBar
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
      />
      <div className="admin-page__body">
        {/* Navigation Column */}
        <PageSidebarNav
          primaryItems={primaryNavItems}
          secondaryHeading="Objects and rules"
          secondarySections={secondaryNavSections}
          activeItem={activeSubPage}
          onItemSelect={handleSubPageSelect}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={handleToggleNav}
        />
        
        {/* Content Column */}
        <div className="admin-page__content-column">
        
          <main className="admin-page__main">
          <div className="admin-page__content">
            {/* Breadcrumbs */}
            <div className="admin-breadcrumbs">
              <Anchor href="#" className="admin-breadcrumbs__link">Objects and rules</Anchor>
              <ChevronDownIcon className="admin-breadcrumbs__separator" />
              <Anchor href="#" className="admin-breadcrumbs__link">Business rules</Anchor>
              <ChevronDownIcon className="admin-breadcrumbs__separator" />
              <Anchor href="#" className="admin-breadcrumbs__link">Triggers</Anchor>
              <ChevronDownIcon className="admin-breadcrumbs__separator" />
              <span className="admin-breadcrumbs__current">Create ticket trigger</span>
            </div>

            {/* Page Header */}
            <div className="admin-page-header">
              <h1 className="admin-page-header__title">Create ticket trigger</h1>
              <p className="admin-page-header__description">
                Set up event-based rules that run every time ticket is created or updated.{' '}
                <Anchor href="#" className="admin-page-header__link">
                  Learn about ticket triggers
                  <ExternalLinkIcon className="admin-page-header__link-icon" />
                </Anchor>
              </p>
            </div>

            {/* Form Fields */}
            <div className="admin-form">
              <div className="admin-form__field">
                <label className="admin-form__label">Trigger name* (required)</label>
                <input 
                  type="text" 
                  className="admin-form__input"
                  value={triggerName}
                  onChange={(e) => setTriggerName(e.target.value)}
                />
              </div>

              <div className="admin-form__field">
                <label className="admin-form__label">Description</label>
                <textarea 
                  className="admin-form__textarea"
                  placeholder="Placeholder"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="admin-form__field">
                <label className="admin-form__label">Trigger category* (required)</label>
                <div className="admin-form__select">
                  <span className="admin-form__select-value">{category}</span>
                  <ChevronDownIcon className="admin-form__select-icon" />
                </div>
              </div>
            </div>

            {/* Conditions Section */}
            <section className="admin-section">
              <h2 className="admin-section__title">Conditions</h2>
              <p className="admin-section__description">
                Conditions that must be met for the trigger to run.{' '}
                <Anchor href="#" className="admin-section__link">
                  Learn about conditions and nested conditions
                  <ExternalLinkIcon className="admin-section__link-icon" />
                </Anchor>
              </p>

              {/* Condition Key */}
              <div className="condition-key">
                <div className="condition-key__header">
                  <span className="condition-key__title">Condition key</span>
                  <button className="condition-key__close">
                    <PlusIcon className="condition-key__close-icon" />
                  </button>
                </div>
                <div className="condition-key__legend">
                  <div className="condition-key__item">
                    <ConditionTag type="subject">
                      <span className="condition-tag__prefix">Object</span>
                      <span className="condition-tag__separator">{' > '}</span>
                      <span className="condition-tag__field">Field</span>
                    </ConditionTag>
                    <p className="condition-key__description">This is the category of the condition.</p>
                  </div>
                  <div className="condition-key__item">
                    <span className="condition-key__operator">Operator</span>
                    <p className="condition-key__description">This determines the relationship between your category and value.</p>
                  </div>
                  <div className="condition-key__item">
                    <ConditionTag type="value">Value</ConditionTag>
                    <p className="condition-key__description">This is the reference data when evaluating the condition.</p>
                  </div>
                </div>
              </div>

              {/* Condition Canvas */}
              <div className="condition-canvas">
                <ConditionRow condition={sampleConditions[0]} isFirst />
                <ConditionAndOr />
                <div className="condition-canvas__nested-group">
                  <ConditionRow condition={sampleConditions[1]} />
                  <ConditionAndOr nested />
                  <ConditionRow condition={sampleConditions[2]} />
                  <ConditionAndOr nested />
                  <ConditionRow condition={sampleConditions[3]} />
                  <div className="condition-canvas__add-nested">
                    <div className="condition-canvas__add-bracket" />
                    <button className="condition-canvas__add-btn">
                      <PlusIcon className="condition-canvas__add-icon" />
                    </button>
                  </div>
                </div>
                <button className="condition-canvas__add-condition">
                  <PlusIcon className="condition-canvas__add-icon" />
                </button>
                <div className="condition-canvas__count">
                  16 of 20 conditions remaining
                </div>
              </div>
            </section>

            {/* Actions Section */}
            <section className="admin-section admin-section--last">
              <h2 className="admin-section__title">Actions</h2>
              <p className="admin-section__description">
                Actions that will occur if global conditions are satisfied.
              </p>
              <Button className="admin-section__add-btn">
                Add action
              </Button>
            </section>
          </div>

          {/* Footer */}
          <div className="admin-page__footer">
            <div className="admin-page__footer-actions">
              <Button isBasic>Cancel</Button>
              <Button isPrimary>Save</Button>
            </div>
          </div>
          </main>
        </div>
      </div>
    </div>
  );
}

