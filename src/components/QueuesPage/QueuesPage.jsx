import { useState, useRef, useEffect } from 'react';
import { Anchor, Button } from '@zendeskgarden/react-buttons';
import { SearchIcon } from '../Icons';
import TopBar from '../TopBar/TopBar';
import PageSidebarNav from '../PageSidebarNav';
import QueuesTable from './QueuesTable';
import QueueEditPage from './QueueEditPage';
import RoutingConfigPage from '../RoutingConfigPage';
import './QueuesPage.css';

// Admin Center specific icons
function HomeIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11.4163 2.87911C10.5632 2.29258 9.43683 2.29258 8.58367 2.87911L3.58367 6.31661C2.90529 6.78299 2.5 7.55347 2.5 8.37671V15C2.5 16.3807 3.61929 17.5 5 17.5H7.08333C7.54357 17.5 7.91667 17.1269 7.91667 16.6666V13.75C7.91667 12.5994 8.84942 11.6666 10 11.6666C11.1506 11.6666 12.0833 12.5994 12.0833 13.75V16.6666C12.0833 17.1269 12.4564 17.5 12.9167 17.5H15C16.3808 17.5 17.5 16.3807 17.5 15V8.37671C17.5 7.55347 17.0947 6.78299 16.4163 6.31661L11.4163 2.87911Z" fill="currentColor"/>
    </svg>
  );
}


function AIIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M15.738 1.95435C15.7195 1.79066 15.5811 1.66691 15.4163 1.66675C15.2516 1.66658 15.1129 1.79003 15.0941 1.95369C15.0062 2.71559 14.7799 3.23828 14.4254 3.59281C14.0708 3.94733 13.5482 4.1736 12.7863 4.26147C12.6226 4.28035 12.4992 4.41901 12.4993 4.58375C12.4995 4.74849 12.6233 4.88689 12.7869 4.90543C13.5359 4.99027 14.0706 5.21649 14.4341 5.57345C14.7957 5.92847 15.0262 6.45042 15.0932 7.20468C15.1081 7.37203 15.2483 7.50027 15.4163 7.50008C15.5843 7.49989 15.7244 7.37134 15.7388 7.20396C15.8031 6.46244 16.0334 5.92873 16.3973 5.56478C16.7613 5.20084 17.295 4.97047 18.0365 4.90628C18.2039 4.89179 18.3325 4.75179 18.3327 4.58378C18.3328 4.41577 18.2046 4.27548 18.0373 4.26061C17.283 4.19361 16.7611 3.96306 16.406 3.6015C16.0491 3.23796 15.8228 2.70336 15.738 1.95435Z" fill="currentColor"/>
      <path d="M9.99402 4.07296C9.94635 3.65203 9.59052 3.33385 9.16685 3.33342C8.74327 3.33298 8.38668 3.65043 8.33818 4.07126C8.1122 6.03045 7.53038 7.37449 6.61874 8.28614C5.7071 9.19775 4.36305 9.77958 2.40387 10.0056C1.98303 10.0541 1.66558 10.4107 1.66602 10.8342C1.66645 11.2579 1.98463 11.6137 2.40556 11.6614C4.33161 11.8796 5.70627 12.4613 6.64108 13.3792C7.57082 14.2922 8.16367 15.6342 8.33593 17.5738C8.37418 18.0042 8.73493 18.3339 9.16693 18.3334C9.59902 18.3329 9.95902 18.0023 9.99627 17.5719C10.1613 15.6652 10.7537 14.2928 11.6895 13.3569C12.6254 12.4211 13.9978 11.8287 15.9045 11.6637C16.3349 11.6264 16.6655 11.2664 16.666 10.8343C16.6665 10.4023 16.3368 10.0416 15.9064 10.0033C13.9668 9.83108 12.6248 9.23825 11.7119 8.30848C10.7939 7.37367 10.2122 5.99901 9.99402 4.07296Z" fill="currentColor"/>
    </svg>
  );
}

function PeopleIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.9165 5.83333C2.9165 3.99238 4.40888 2.5 6.24983 2.5C8.09078 2.5 9.58315 3.99238 9.58315 5.83333C9.58315 7.67428 8.09078 9.16667 6.24983 9.16667C4.40888 9.16667 2.9165 7.67428 2.9165 5.83333Z" fill="currentColor"/>
      <path d="M10.4165 5.83333C10.4165 3.99238 11.9089 2.5 13.7498 2.5C15.5908 2.5 17.0832 3.99238 17.0832 5.83333C17.0832 7.67428 15.5908 9.16667 13.7498 9.16667C11.9089 9.16667 10.4165 7.67428 10.4165 5.83333Z" fill="currentColor"/>
      <path d="M6.24962 10C8.6419 10 10.9112 11.6506 11.7558 14.6779C12.1974 16.2609 10.8473 17.5 9.46132 17.5H3.03791C1.65194 17.5 0.301851 16.2609 0.743465 14.6779C1.58805 11.6506 3.8573 10 6.24962 10Z" fill="currentColor"/>
      <path d="M13.3618 14.2301C12.9553 12.773 12.2564 11.5405 11.3581 10.5851C12.1043 10.1988 12.9199 10 13.7502 10C16.1426 10 18.4118 11.6506 19.2564 14.6779C19.698 16.2609 18.3479 17.5 16.9619 17.5H12.7754C13.4155 16.6291 13.7077 15.4701 13.3618 14.2301Z" fill="currentColor"/>
    </svg>
  );
}

function AccountIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.666 15.8333V5C16.666 3.61929 15.5468 2.5 14.166 2.5H5.83268C4.45197 2.5 3.33268 3.61929 3.33268 5V15.8333H2.49935C2.03912 15.8333 1.66602 16.2064 1.66602 16.6667C1.66602 17.1269 2.03912 17.5 2.49935 17.5H17.4993C17.9596 17.5 18.3327 17.1269 18.3327 16.6667C18.3327 16.2064 17.9596 15.8333 17.4993 15.8333H16.666ZM7.49935 5.83333C7.03912 5.83333 6.66602 6.20643 6.66602 6.66667C6.66602 7.1269 7.03912 7.5 7.49935 7.5H8.33268C8.79293 7.5 9.16602 7.1269 9.16602 6.66667C9.16602 6.20643 8.79293 5.83333 8.33268 5.83333H7.49935ZM11.666 5.83333C11.2058 5.83333 10.8327 6.20643 10.8327 6.66667C10.8327 7.1269 11.2058 7.5 11.666 7.5H12.4993C12.9596 7.5 13.3327 7.1269 13.3327 6.66667C13.3327 6.20643 12.9596 5.83333 12.4993 5.83333H11.666ZM7.49935 9.16667C7.03912 9.16667 6.66602 9.53975 6.66602 10C6.66602 10.4602 7.03912 10.8333 7.49935 10.8333H8.33268C8.79293 10.8333 9.16602 10.4602 9.16602 10C9.16602 9.53975 8.79293 9.16667 8.33268 9.16667H7.49935ZM11.666 9.16667C11.2058 9.16667 10.8327 9.53975 10.8327 10C10.8327 10.4602 11.2058 10.8333 11.666 10.8333H12.4993C12.9596 10.8333 13.3327 10.4602 13.3327 10C13.3327 9.53975 12.9596 9.16667 12.4993 9.16667H11.666ZM7.49935 12.5C7.03912 12.5 6.66602 12.8731 6.66602 13.3333C6.66602 13.7936 7.03912 14.1667 7.49935 14.1667H8.33268C8.79293 14.1667 9.16602 13.7936 9.16602 13.3333C9.16602 12.8731 8.79293 12.5 8.33268 12.5H7.49935ZM11.666 12.5C11.2058 12.5 10.8327 12.8731 10.8327 13.3333C10.8327 13.7936 11.2058 14.1667 11.666 14.1667H12.4993C12.9596 14.1667 13.3327 13.7936 13.3327 13.3333C13.3327 12.8731 12.9596 12.5 12.4993 12.5H11.666Z" fill="currentColor"/>
    </svg>
  );
}

function FlowIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10.0002 1.25C8.47324 1.25 7.22039 2.42328 7.09396 3.91747C5.10461 4.75431 3.55308 6.42324 2.87382 8.48983C2.73011 8.92708 2.96805 9.398 3.40529 9.54175C3.84251 9.68542 4.31345 9.4475 4.45715 9.01025C4.95174 7.50553 6.04335 6.27005 7.45089 5.58491C7.94924 6.47877 8.90407 7.08333 10.0002 7.08333C11.611 7.08333 12.9168 5.7775 12.9168 4.16667C12.9168 2.55583 11.611 1.25 10.0002 1.25Z" fill="currentColor"/>
      <path d="M15.6565 5.90823C15.3542 5.56125 14.8278 5.52507 14.4808 5.82744C14.1338 6.1298 14.0976 6.65619 14.4 7.00317C15.2934 8.02841 15.8335 9.3668 15.8335 10.8335C15.8335 10.9737 15.8286 11.1127 15.8189 11.2503C14.7944 11.2335 13.7915 11.7582 13.2428 12.7085C12.4374 14.1034 12.9154 15.887 14.3103 16.6923C15.7051 17.4976 17.4887 17.0197 18.294 15.6249C19.0565 14.3042 18.6686 12.635 17.4413 11.7777C17.4802 11.4681 17.5002 11.153 17.5002 10.8335C17.5002 8.94913 16.8043 7.22535 15.6565 5.90823Z" fill="currentColor"/>
      <path d="M6.75101 12.7084C5.94568 11.3136 4.16209 10.8357 2.76724 11.641C1.37238 12.4463 0.894476 14.2299 1.69979 15.6248C2.46351 16.9475 4.10703 17.4457 5.46446 16.8068C6.72381 17.7643 8.29636 18.3333 10.0002 18.3333C10.4798 18.3333 10.9496 18.2882 11.4054 18.2018C11.8576 18.1159 12.1547 17.6798 12.0688 17.2277C11.9831 16.7755 11.547 16.4785 11.0948 16.5643C10.7409 16.6314 10.3751 16.6667 10.0002 16.6667C8.78708 16.6667 7.66172 16.2971 6.7287 15.6638C7.25286 14.7855 7.2987 13.6571 6.75101 12.7084Z" fill="currentColor"/>
    </svg>
  );
}

function PaperPlaneIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.33546 4.64336C1.86867 3.243 3.31833 1.97185 4.64571 2.6176L16.7403 8.50146C17.9904 9.10962 17.9904 10.8908 16.7403 11.499L4.64571 17.3828C3.31833 18.0285 1.86868 16.7574 2.33546 15.357L3.84335 10.8334H7.4995C7.95974 10.8334 8.33284 10.4603 8.33284 10C8.33284 9.53979 7.95974 9.16671 7.4995 9.16671H3.84324L2.33546 4.64336Z" fill="currentColor"/>
    </svg>
  );
}

function MonitorIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M1.66602 5C1.66602 3.61929 2.78531 2.5 4.16602 2.5H15.8327C17.2134 2.5 18.3327 3.61929 18.3327 5V11.6667C18.3327 13.0474 17.2134 14.1667 15.8327 14.1667H4.16602C2.78531 14.1667 1.66602 13.0474 1.66602 11.6667V5Z" fill="currentColor"/>
      <path d="M5.27063 17.4547C6.75651 16.9436 8.3461 16.6667 9.9996 16.6667C11.6531 16.6667 13.2427 16.9436 14.7285 17.4547C15.1638 17.6044 15.6379 17.3729 15.7876 16.9377C15.9373 16.5025 15.7058 16.0283 15.2706 15.8787C13.6132 15.3085 11.8405 15 9.9996 15C8.15864 15 6.386 15.3085 4.72852 15.8787C4.29331 16.0283 4.06186 16.5025 4.21156 16.9377C4.36126 17.3729 4.83542 17.6044 5.27063 17.4547Z" fill="currentColor"/>
    </svg>
  );
}

function GridIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.50195 4.9995C2.50195 3.61995 3.62031 2.50159 4.99987 2.50159H6.66654C8.0461 2.50159 9.16445 3.61995 9.16445 4.9995V6.66617C9.16445 8.04574 8.0461 9.16413 6.66654 9.16413H4.99987C3.62031 9.16413 2.50195 8.04574 2.50195 6.66617V4.9995Z" fill="currentColor"/>
      <path d="M2.50195 13.3329C2.50195 11.9533 3.62031 10.835 4.99987 10.835H6.66654C8.0461 10.835 9.16445 11.9533 9.16445 13.3329V14.9995C9.16445 16.379 8.0461 17.4975 6.66654 17.4975H4.99987C3.62031 17.4975 2.50195 16.379 2.50195 14.9995V13.3329Z" fill="currentColor"/>
      <path d="M10.8353 4.9995C10.8353 3.61995 11.9536 2.50159 13.3332 2.50159H14.9999C16.3795 2.50159 17.4978 3.61995 17.4978 4.9995V6.66617C17.4978 8.04574 16.3795 9.16413 14.9999 9.16413H13.3332C11.9536 9.16413 10.8353 8.04574 10.8353 6.66617V4.9995Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.1665 10.835C12.3267 10.835 10.8353 12.3264 10.8353 14.1662C10.8353 16.006 12.3267 17.4975 14.1665 17.4975C16.0064 17.4975 17.4978 16.006 17.4978 14.1662C17.4978 12.3264 16.0064 10.835 14.1665 10.835ZM12.4978 14.1662C12.4978 13.2445 13.245 12.4975 14.1665 12.4975C15.0882 12.4975 15.8353 13.2445 15.8353 14.1662C15.8353 15.0878 15.0882 15.835 14.1665 15.835C13.245 15.835 12.4978 15.0878 12.4978 14.1662Z" fill="currentColor"/>
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return <span className={className} aria-hidden="true" />;
}

function PromoCloseIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3.54687 4.72616C2.37131 6.16272 1.66602 7.99904 1.66602 10.0001C1.66602 12.0012 2.37133 13.8375 3.54693 15.2741L6.82442 11.9966C6.46012 11.4185 6.24935 10.7339 6.24935 10.0001C6.24935 9.26633 6.4601 8.58175 6.82437 8.00366L3.54687 4.72616Z" fill="currentColor"/>
      <path d="M4.72538 3.54765L8.00287 6.82514C8.58102 6.46085 9.26552 6.25008 9.99935 6.25008C10.7332 6.25008 11.4178 6.46085 11.9958 6.82515L15.2733 3.54766C13.8368 2.37206 12.0004 1.66675 9.99935 1.66675C7.99827 1.66675 6.16194 2.37206 4.72538 3.54765Z" fill="currentColor"/>
      <path d="M16.4518 4.72618L13.1743 8.00368C13.5386 8.58175 13.7493 9.26633 13.7493 10.0001C13.7493 10.7339 13.5386 11.4184 13.1743 11.9966L16.4518 15.2741C17.6274 13.8375 18.3327 12.0012 18.3327 10.0001C18.3327 7.99904 17.6274 6.16273 16.4518 4.72618Z" fill="currentColor"/>
      <path d="M15.2733 16.4526L11.9958 13.1751C11.4177 13.5393 10.7331 13.7501 9.99935 13.7501C9.2656 13.7501 8.58102 13.5393 8.00295 13.1751L4.72545 16.4526C6.162 17.6282 7.99831 18.3334 9.99935 18.3334C12.0004 18.3334 13.8367 17.6281 15.2733 16.4526Z" fill="currentColor"/>
    </svg>
  );
}

function AdminCenterLogo({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.3027 2.00049C12.6982 2.24413 13.0689 2.52354 13.4102 2.83487C14.0949 3.45905 14.6771 4.19128 15.1299 5.00098C15.2646 5.24213 15.3877 5.49025 15.499 5.74415C15.8428 5.19083 16.257 4.6838 16.7339 4.23633C17.3486 3.66016 18.0598 3.19775 18.8359 2.86816C18.9473 2.82129 19.0615 2.78003 19.1777 2.74414C18.875 3.56396 18.7119 4.44287 18.7119 5.36035C18.7119 9.22656 21.8457 12.3604 25.7119 12.3604C25.8066 12.3604 25.9009 12.3582 25.9949 12.354C25.998 12.4336 25.9996 12.5137 25.9996 12.5942C25.9996 16.9785 22.9727 20.6641 18.875 21.7578V21.7559C18.5127 21.8516 18.1426 21.9238 17.7656 21.9707C17.2549 22.0352 16.7354 22.0518 16.2168 22.0195C14.6855 21.9209 13.2363 21.4355 11.999 20.6445C11.9238 20.5967 11.8496 20.5479 11.7764 20.498C11.5869 20.8408 11.3721 21.1689 11.1338 21.4795C10.5732 22.21 9.89648 22.8447 9.13477 23.3574C8.54492 23.7539 7.90527 24.0781 7.22852 24.3203C5.71387 24.8623 4.06543 24.9707 2.49023 24.6182C1.53223 24.4033 0.615234 24.0449 -0.242188 23.5537V23.5557C0.418945 22.7559 0.949219 21.8564 1.32422 20.8877C1.72559 19.8516 1.94727 18.7441 1.96875 17.5996C1.96875 17.5488 1.96875 17.499 1.9668 17.4482C2.48145 17.4873 3.00098 17.4814 3.5166 17.4287C5.4375 17.2314 7.24707 16.4258 8.64941 15.127C9.29102 14.5322 9.8418 13.8408 10.2793 13.0742C10.1279 12.9209 9.98242 12.7617 9.84277 12.5967C9.06738 11.6807 8.47461 10.6162 8.10156 9.46387C7.77539 8.45996 7.61523 7.40137 7.63184 6.33398C7.64746 5.3291 7.82617 4.33691 8.15918 3.39648C8.5166 2.38574 9.05371 1.44629 9.74512 0.617676C10.1318 0.154785 10.5625 -0.264648 11.0303 -0.634766C11.1162 -0.0673828 11.2451 0.494141 11.415 1.04541C11.6572 1.83008 11.9561 2.5918 12.3027 3.32422V2.00049Z" fill="currentColor"/>
    </svg>
  );
}

// Primary Navigation Items for Admin Center
const primaryNavItems = [
  { id: 'home', icon: HomeIcon, label: 'Home' },
  { id: 'account', icon: AccountIcon, label: 'Account' },
  { id: 'people', icon: PeopleIcon, label: 'People' },
  { id: 'channels', icon: PaperPlaneIcon, label: 'Channels' },
  { id: 'ai', icon: AIIcon, label: 'AI' },
  { id: 'workspaces', icon: MonitorIcon, label: 'Workspaces' },
  { id: 'objects', icon: FlowIcon, label: 'Objects and rules', active: true },
  { id: 'apps', icon: GridIcon, label: 'Apps and integrations' },
];

// Secondary Navigation Data for Queues Page
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
      { id: 'routing-config', label: 'Routing configurations', active: true },
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

// Sample queues data aligned with the current list design
const sampleQueues = [
  {
    id: 1,
    name: 'Billing',
    description: 'Billing related tickets',
    subqueue: null,
    priority: { main: '4', more: 0, items: ['4'] },
    primaryGroups: { main: 'Payroll', more: 3, items: ['Payroll', 'Billing Team', 'Finance Ops', 'Payroll Specialists'] },
    secondaryGroups: { main: 'Sales', more: 30, items: ['Sales', 'Support', 'Finance', 'Success'] },
    assignmentMethod: 'Initial routing configuration',
    conditions: { all: [], any: [] },
    distributeSubqueues: false
  },
  {
    id: 2,
    name: 'VIP customers - Live',
    description: 'Live VIP customers queue',
    subqueue: null,
    priority: { main: '1', more: 0, items: ['1'] },
    primaryGroups: { main: 'Payroll, Sales', more: 0, items: ['Payroll, Sales'] },
    secondaryGroups: { main: 'HR', more: 3, items: ['HR', 'Success', 'Sales Ops', 'Support'] },
    assignmentMethod: 'Predictive routing',
    conditions: { all: [], any: [] },
    distributeSubqueues: true,
    subqueues: [
      { id: 1, name: 'Simplibill', percentage: 60, priority: 1, predictiveRouting: true },
      { id: 2, name: 'Billsend', percentage: 40, priority: 2, predictiveRouting: true },
    ]
  },
  {
    id: 3,
    name: 'VIP customers - Async',
    description: 'Async VIP customers queue',
    subqueue: null,
    priority: { main: '2', more: 0, items: ['2'] },
    primaryGroups: { main: 'Payroll, Sales', more: 0, items: ['Payroll, Sales'] },
    secondaryGroups: { main: 'HR', more: 3, items: ['HR', 'Success', 'Sales Ops', 'Support'] },
    assignmentMethod: 'Initial routing configuration',
    conditions: { all: [], any: [] },
    distributeSubqueues: false
  },
  {
    id: 4,
    name: 'Finance',
    description: 'Finance queue',
    subqueue: null,
    priority: { main: '3', more: 0, items: ['3'] },
    primaryGroups: { main: 'Payroll, Sales', more: 0, items: ['Payroll, Sales'] },
    secondaryGroups: { main: 'HR', more: 3, items: ['HR', 'Success', 'Sales Ops', 'Support'] },
    assignmentMethod: 'Initial routing configuration',
    conditions: { all: [], any: [] },
    distributeSubqueues: false
  }
];

function QueuesPromoCard() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <section className="queues-promo" aria-label="Predictive routing promo">
      <div className="queues-promo__content">
        <h2 className="queues-promo__title">New AI-powered ticket routing for messaging is now available</h2>
        <p className="queues-promo__text">
          Match tickets to agents based on their skills and capacity to reduce wait times.
        </p>
        <div className="queues-promo__links">
          <Anchor href="#" className="queues-promo__link">
            Learn about Predictive routing
            <ExternalLinkIcon className="queues-promo__link-icon" />
          </Anchor>
          <Anchor href="#" className="queues-promo__link">
            Learn about Predictive routing A/B tests
            <ExternalLinkIcon className="queues-promo__link-icon" />
          </Anchor>
        </div>
      </div>
      <button
        type="button"
        className="queues-promo__dismiss"
        aria-label="Dismiss promo"
        onClick={() => setIsDismissed(true)}
      >
        <PromoCloseIcon className="queues-promo__dismiss-icon" />
      </button>
      <div className="queues-promo__media" aria-hidden="true">
        <div className="queues-promo__media-panel">
          <div className="queues-promo__media-tooltip">
            Route tickets more efficiently with the help of AI
          </div>
          <div className="queues-promo__media-stat">
            <span className="queues-promo__media-stat-label">Average handle time (AHT) decrease</span>
            <span className="queues-promo__media-stat-value">~10%</span>
            <span className="queues-promo__media-stat-sublabel">of your messaging tickets</span>
          </div>
          <div className="queues-promo__media-bot">
            <div className="queues-promo__media-bot__texture" aria-hidden="true">
              <img src="/assets/bot-texture.png" alt="" />
            </div>
            <img className="queues-promo__media-bot__eyes" src="/assets/bot-eyes.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Book open icon image path
const bookOpenIconSrc = "/assets/Book_open-706cd137-7b94-449e-afad-ba613a78f0d9.png";

function BookOpenIcon({ className }) {
  return (
    <img 
      className={className} 
      src={bookOpenIconSrc} 
      alt="Book open" 
      width="40" 
      height="40"
    />
  );
}

// Sparkle icon for analyzing state
function SparkleAnalyzingIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" fill="url(#sparkle-gradient)" />
      <defs>
        <linearGradient id="sparkle-gradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8DD44A" />
          <stop offset="1" stopColor="#038153" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Large sparkle icon for analyzing header
function SparkleHeaderIcon({ className }) {
  return (
    <img 
      className={className} 
      src="/assets/Sparkle-063d706a-c098-4781-a5bc-a30e5b22cedf.png" 
      alt="" 
      width="40" 
      height="40"
    />
  );
}

// Chevron icon for collapsible section
function ChevronUpIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Info icon for metrics cards
function MetricsInfoIcon({ className }) {
  return (
    <img 
      className={className} 
      src="/assets/info-18f1df92-474a-4b7f-9d28-76109bee24c9.png" 
      alt="" 
      width="16" 
      height="16"
    />
  );
}

// Chevron down icon for metrics improvement indicator
function MetricsChevronDownIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Queue-specific evaluation data - different data points per queue
const QUEUE_EVALUATION_DATA = {
  1: { // Billing queue
    tickets: '12,450',
    days: '90',
    agents: '24',
    skills: '6',
    results: {
      aht: {
        improvement: '18%',
        predicted: '10.3 min',
        baseline: '12.6 min'
      },
      rwt: {
        improvement: '24%',
        predicted: '2.4 min',
        baseline: '3.2 min'
      },
      timeSaved: '~42 hrs/wk',
      timeSavedNote: 'Based on 90-day avg volume',
      confidence: {
        score: '80-100%',
        level: 'high',
        detail: 'Strong patterns • 12,450 tickets'
      }
    }
  },
  2: { // Support queue
    tickets: '8,320',
    days: '60',
    agents: '18',
    skills: '4',
    results: {
      aht: {
        improvement: '15%',
        predicted: '8.5 min',
        baseline: '10.0 min'
      },
      rwt: {
        improvement: '20%',
        predicted: '2.8 min',
        baseline: '3.5 min'
      },
      timeSaved: '~35 hrs/wk',
      timeSavedNote: 'Based on 60-day avg volume',
      confidence: {
        score: '50-79%',
        level: 'medium',
        detail: 'Moderate patterns • 8,320 tickets'
      }
    }
  },
  3: { // Sales queue
    tickets: '5,890',
    days: '45',
    agents: '12',
    skills: '3',
    results: {
      aht: {
        improvement: '12%',
        predicted: '7.0 min',
        baseline: '8.0 min'
      },
      rwt: {
        improvement: '18%',
        predicted: '3.0 min',
        baseline: '3.7 min'
      },
      timeSaved: '~28 hrs/wk',
      timeSavedNote: 'Based on 45-day avg volume',
      confidence: {
        score: '50-79%',
        level: 'medium',
        detail: 'Moderate patterns • 5,890 tickets'
      }
    }
  },
  4: { // Technical queue
    tickets: '15,720',
    days: '120',
    agents: '32',
    skills: '8',
    results: {
      aht: {
        improvement: '22%',
        predicted: '12.5 min',
        baseline: '16.0 min'
      },
      rwt: {
        improvement: '28%',
        predicted: '2.0 min',
        baseline: '2.8 min'
      },
      timeSaved: '~58 hrs/wk',
      timeSavedNote: 'Based on 120-day avg volume',
      confidence: {
        score: '80-100%',
        level: 'high',
        detail: 'Strong patterns • 15,720 tickets'
      }
    }
  },
  5: { // Returns queue
    tickets: '3,450',
    days: '30',
    agents: '8',
    skills: '2',
    results: {
      aht: {
        improvement: '8%',
        predicted: '5.5 min',
        baseline: '6.0 min'
      },
      rwt: {
        improvement: '12%',
        predicted: '3.5 min',
        baseline: '4.0 min'
      },
      timeSaved: '~15 hrs/wk',
      timeSavedNote: 'Based on 30-day avg volume',
      confidence: {
        score: '20-49%',
        level: 'low',
        detail: 'Weak patterns • 3,450 tickets'
      }
    }
  },
  default: {
    tickets: '10,000',
    days: '90',
    agents: '20',
    skills: '5',
    results: {
      aht: {
        improvement: '16%',
        predicted: '9.0 min',
        baseline: '10.7 min'
      },
      rwt: {
        improvement: '21%',
        predicted: '2.6 min',
        baseline: '3.3 min'
      },
      timeSaved: '~38 hrs/wk',
      timeSavedNote: 'Based on 90-day avg volume',
      confidence: {
        score: '50-79%',
        level: 'medium',
        detail: 'Moderate patterns • 10,000 tickets'
      }
    }
  }
};

// Get evaluation results for a specific queue
const getEvaluationResults = (queueId) => {
  const data = QUEUE_EVALUATION_DATA[queueId] || QUEUE_EVALUATION_DATA.default;
  return data.results;
};

// Get evaluation steps for a specific queue
const getEvaluationSteps = (queueId) => {
  const data = QUEUE_EVALUATION_DATA[queueId] || QUEUE_EVALUATION_DATA.default;
  return [
    { id: 1, textBefore: 'Collected ', boldText: `${data.tickets} tickets`, textAfter: ' from the last ', boldText2: `${data.days} days` },
    { id: 2, textBefore: 'Identified ', boldText: `${data.agents} agents`, textAfter: ' and ', boldText2: `${data.skills} skills` },
    { id: 3, text: 'Analyzing routing patterns and resolution times...' },
    { id: 4, text: 'Simulating Predictive routing scenarios' },
    { id: 5, text: 'Comparing potential performance gains' },
    { id: 6, text: 'Packaging your results' }
  ];
};

// Metrics card component for results view
function MetricsCard({ type, data }) {
  const isAhtOrRwt = type === 'aht' || type === 'rwt';
  const isTts = type === 'tts';
  const isConfidence = type === 'confidence';

  const getLabel = () => {
    switch (type) {
      case 'aht': return 'Agent handle time';
      case 'rwt': return 'Requester wait time';
      case 'tts': return 'Estimated time saved';
      case 'confidence': return 'Confidence score';
      default: return '';
    }
  };

  const getConfidenceColorClass = (level) => {
    switch (level) {
      case 'high': return 'queue-eval-results__metric-value--success';
      case 'medium': return 'queue-eval-results__metric-value--warning';
      case 'low':
      case 'insufficient': return 'queue-eval-results__metric-value--danger';
      default: return 'queue-eval-results__metric-value--success';
    }
  };

  const getConfidenceLabel = (level) => {
    switch (level) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      case 'insufficient': return 'Insufficient';
      default: return '';
    }
  };

  return (
    <div className="queue-eval-results__metric-card">
      <div className="queue-eval-results__metric-header">
        <MetricsInfoIcon className="queue-eval-results__metric-info-icon" />
        <span className="queue-eval-results__metric-label">{getLabel()}</span>
      </div>
      <div className="queue-eval-results__metric-content">
        <div className="queue-eval-results__metric-value-row">
          {isAhtOrRwt && (
            <>
              <MetricsChevronDownIcon className="queue-eval-results__metric-chevron" />
              <span className="queue-eval-results__metric-value queue-eval-results__metric-value--success">
                {data.improvement}
              </span>
              <span className="queue-eval-results__metric-detail">
                {data.predicted} predicted
              </span>
            </>
          )}
          {isTts && (
            <>
              <span className="queue-eval-results__metric-value queue-eval-results__metric-value--success">
                {data.timeSaved}
              </span>
              <span className="queue-eval-results__metric-detail">
                {data.timeSavedNote}
              </span>
            </>
          )}
          {isConfidence && (
            <>
              <span className={`queue-eval-results__metric-value ${getConfidenceColorClass(data.confidence.level)}`}>
                {data.confidence.score}
              </span>
              <span className="queue-eval-results__metric-detail">
                {getConfidenceLabel(data.confidence.level)}
              </span>
            </>
          )}
        </div>
        {isAhtOrRwt && (
          <div className="queue-eval-results__metric-baseline">
            vs. {data.baseline} (90-day avg)
          </div>
        )}
        {isConfidence && (
          <div className="queue-eval-results__metric-baseline">
            {data.confidence.detail}
          </div>
        )}
      </div>
    </div>
  );
}

// Results view component
function QueueEvaluationResults({ queue, results, onEnablePredictive, onKeepInitial, onDismiss }) {
  return (
    <div className="queue-eval-results">
      {/* Header */}
      <div className="queue-eval-results__header">
        <h2 className="queue-eval-results__title">Queue evaluation results</h2>
        <p className="queue-eval-results__subtitle">
          Based on your <strong>{queue.name}</strong> queue data, Predictive routing could significantly improve efficiency.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="queue-eval-results__metrics">
        <MetricsCard type="aht" data={results.aht} />
        <MetricsCard type="rwt" data={results.rwt} />
        <MetricsCard 
          type="tts" 
          data={{ timeSaved: results.timeSaved, timeSavedNote: results.timeSavedNote }} 
        />
        <MetricsCard type="confidence" data={results} />
      </div>

      {/* Disclaimer */}
      <p className="queue-eval-results__disclaimer">
        Evaluation results are based on simulated data. Actual performance may vary once Predictive routing is live.
      </p>

      {/* Divider */}
      <div className="queue-eval-results__divider" />

      {/* Recommendation Section */}
      <div className="queue-eval-results__recommendation">
        <h3 className="queue-eval-results__recommendation-title">Recommended next steps</h3>
        <p className="queue-eval-results__recommendation-text">
          Results look promising. Apply Predictive routing to the entire queue, or keep Initial routing. You can change this at any time.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="queue-eval-results__actions">
        <Button 
          isPrimary
          className="queue-eval-results__btn"
          onClick={onEnablePredictive}
        >
          Turn on Predictive routing
        </Button>
        <Button 
          className="queue-eval-results__btn"
          onClick={onKeepInitial}
        >
          Keep Initial routing
        </Button>
        <Button 
          isBasic
          isDanger
          className="queue-eval-results__btn"
          onClick={onDismiss}
        >
          Dismiss results
        </Button>
      </div>
    </div>
  );
}

// Rocket icon for enabled state - matches Figma node I256:7282
function RocketIcon({ className }) {
  return (
    <img 
      className={className} 
      src="/assets/Rocket-ad39e3fa-c92b-4207-a15a-c01e01d35d5c.png" 
      alt="" 
      width="40" 
      height="40"
    />
  );
}

// Enabled state content component - shown after predictive routing is enabled
// Matches Figma design: node-id=256-7275 (Turn On state)
function QueueEvaluationEnabled({ queue, onClose }) {
  return (
    <div className="queue-eval-enabled">
      {/* Header section with rocket icon and title - matches Figma */}
      <div className="queue-eval-enabled__header">
        <RocketIcon className="queue-eval-enabled__icon" />
        <h2 className="queue-eval-enabled__title">Predictive routing is live</h2>
        <p className="queue-eval-enabled__subtitle">
          You turned on Predictive routing for the <strong>{queue.name}</strong> queue. Tickets are now being matched to the best-equipped agents.
        </p>
      </div>

      {/* What to expect section - matches Figma bullet list */}
      <div className="queue-eval-enabled__expectations">
        <p className="queue-eval-enabled__expectations-title">What to expect:</p>
        <ul className="queue-eval-enabled__expectations-list">
          <li>Shorter wait times for requesters</li>
          <li>Faster ticket resolutions</li>
          <li>More efficient agent workload distribution</li>
        </ul>
      </div>

      {/* Action button - green Done button matching Figma */}
      <div className="queue-eval-enabled__actions">
        <Button 
          isPrimary
          className="queue-eval-enabled__btn"
          onClick={onClose}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

// External link icon for dashboard buttons
function ExternalLinkSmallIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6.5V9.5C9 9.76522 8.89464 10.0196 8.70711 10.2071C8.51957 10.3946 8.26522 10.5 8 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V4C1.5 3.73478 1.60536 3.48043 1.79289 3.29289C1.98043 3.10536 2.23478 3 2.5 3H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 1.5H10.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 7L10.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Performance metrics card component
function PerformanceMetricsCard({ type, data }) {
  const isAht = type === 'aht';
  const isRwt = type === 'rwt';
  const isTts = type === 'tts';

  const getLabel = () => {
    switch (type) {
      case 'aht': return 'Agent handle time';
      case 'rwt': return 'Requester wait time';
      case 'tts': return 'Total time saved';
      default: return '';
    }
  };

  return (
    <div className="queue-performance__metric-card">
      <div className="queue-performance__metric-header">
        <MetricsInfoIcon className="queue-performance__metric-info-icon" />
        <span className="queue-performance__metric-label">{getLabel()}</span>
      </div>
      <div className="queue-performance__metric-content">
        {(isAht || isRwt) && (
          <>
            <div className="queue-performance__metric-value-row">
              <MetricsChevronDownIcon className="queue-performance__metric-chevron" />
              <span className="queue-performance__metric-value queue-performance__metric-value--success">
                {data.improvement}
              </span>
              <span className="queue-performance__metric-detail">
                {data.predicted}
              </span>
            </div>
            <div className="queue-performance__metric-baseline">
              vs. {data.baseline} (90-day avg)
            </div>
          </>
        )}
        {isTts && (
          <div className="queue-performance__metric-value-row">
            <span className="queue-performance__metric-value queue-performance__metric-value--success queue-performance__metric-value--large">
              {data.timeSaved}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Performance view component - shown when clicking on a queue with Predictive routing enabled
function QueuePerformanceView({ queue, results, onClose }) {
  return (
    <div className="queue-performance">
      {/* Subtitle */}
      <p className="queue-performance__subtitle">
        Your <strong>{queue.name}</strong> queue is up and running using Predictive routing.
      </p>

      {/* Metrics Cards */}
      <div className="queue-performance__metrics">
        <PerformanceMetricsCard type="aht" data={results.aht} />
        <PerformanceMetricsCard type="rwt" data={results.rwt} />
        <PerformanceMetricsCard 
          type="tts" 
          data={{ timeSaved: results.timeSaved }} 
        />
      </div>

      {/* Data dashboards section */}
      <div className="queue-performance__dashboards">
        <h3 className="queue-performance__dashboards-title">Data dashboards</h3>
        <p className="queue-performance__dashboards-text">
          View dashboards to see how Predictive routing is performing.
        </p>
        <div className="queue-performance__dashboards-actions">
              <Button 
            className="queue-performance__dashboard-btn"
          >
            Go to ticket dashboard
            <ExternalLinkSmallIcon className="queue-performance__dashboard-btn-icon" />
          </Button>
          <Button 
            className="queue-performance__dashboard-btn"
          >
            Go to agent dashboard
            <ExternalLinkSmallIcon className="queue-performance__dashboard-btn-icon" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Analyzing state content component
function QueueEvaluationAnalyzing({ queue, progress, setProgress }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Simulation effect - progress through steps
  useEffect(() => {
    if (progress.currentStep >= progress.totalSteps) return;
    
    // Start with step 0, then progress
    const stepDurations = [1500, 1500, 2500, 2000, 2000, 2000]; // ms per step
    const currentDuration = stepDurations[progress.currentStep] || 2000;
    
    const timer = setTimeout(() => {
      setProgress(prev => ({
        ...prev,
        // Mark current step as completed and move to next step
        completedSteps: prev.currentStep + 1,
        currentStep: prev.currentStep + 1
      }));
    }, currentDuration);
    
    return () => clearTimeout(timer);
  }, [progress.currentStep, progress.totalSteps, setProgress]);

  const getStepStatus = (stepIndex) => {
    if (stepIndex < progress.completedSteps) return 'completed';
    if (stepIndex === progress.currentStep) return 'active';
    return 'pending';
  };

  const renderStepText = (step, status) => {
    const textClass = status === 'pending' ? 'queue-eval-analyzing__step-text--pending' : '';
    
    if (step.boldText) {
      return (
        <span className={`queue-eval-analyzing__step-text ${textClass}`}>
          {step.textBefore}
          <strong>{step.boldText}</strong>
          {step.textAfter}
          {step.boldText2 && <strong>{step.boldText2}</strong>}
        </span>
      );
    }
    return <span className={`queue-eval-analyzing__step-text ${textClass}`}>{step.text}</span>;
  };

  return (
    <>
      {/* Header section with title and subtitle */}
      <div className="queue-eval-analyzing__header">
        <SparkleHeaderIcon className="queue-eval-analyzing__sparkle-icon" />
        <h2 className="queue-eval-analyzing__title">Evaluating {queue.name} queue...</h2>
        <p className="queue-eval-analyzing__subtitle">
          Queue evaluation could take up to 60 minutes. You&apos;ll receive an email when results are ready.
        </p>
      </div>

      {/* Analysis card */}
      <div className="queue-eval-analyzing__card">
        <div className="queue-eval-analyzing__card-header">
          <SparkleAnalyzingIcon className="queue-eval-analyzing__card-icon" />
          <span className="queue-eval-analyzing__card-title">Analyzing your account data...</span>
        </div>
        
        {/* Collapsible section */}
        <div className="queue-eval-analyzing__progress-section">
          <button 
            type="button"
            className="queue-eval-analyzing__toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronUpIcon className={`queue-eval-analyzing__toggle-icon ${!isExpanded ? 'queue-eval-analyzing__toggle-icon--collapsed' : ''}`} />
            <span className="queue-eval-analyzing__toggle-text">
              {progress.completedSteps} of {progress.totalSteps} to-dos completed
            </span>
          </button>
          
          {isExpanded && (
            <div className="queue-eval-analyzing__steps">
              {getEvaluationSteps(queue.id).map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step.id} className={`queue-eval-analyzing__step queue-eval-analyzing__step--${status}`}>
                    <span className="queue-eval-analyzing__step-indicator">
                      {status === 'completed' && '✓'}
                      {status === 'active' && '◉'}
                      {status === 'pending' && '◯'}
                    </span>
                    {renderStepText(step, status)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function QueueEvaluationPanel({
  queue,
  onClose,
  phase,
  progress,
  onBeginEvaluation,
  setEvaluationProgress,
  onEnablePredictive,
  onKeepInitial,
  onDismiss,
  onCloseEnabled
}) {
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  // Handle resize drag
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      if (!sidebarRef.current) return;

      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const newWidth = sidebarRect.right - e.clientX;

      // Set min and max width constraints
      const minWidth = 320;
      const maxWidth = 600;
      const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

      setSidebarWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  if (!queue) {
    return null;
  }

  const isAnalyzing = phase === 'analyzing';
  const isResults = phase === 'results';
  const isEnabled = phase === 'enabled';
  const isPerformance = phase === 'performance';

  // Get results data for this queue
  const results = getEvaluationResults(queue.id);

  return (
    <aside
      ref={sidebarRef}
      className={`queue-evaluation-sidebar ${isResults ? 'queue-evaluation-sidebar--results' : ''} ${isEnabled ? 'queue-evaluation-sidebar--enabled' : ''} ${isPerformance ? 'queue-evaluation-sidebar--performance' : ''} ${isResizing ? 'queue-evaluation-sidebar--resizing' : ''}`}
      style={{ width: `${sidebarWidth}px` }}
      aria-label="Queue evaluation sidebar"
    >
      <div
        className="queue-evaluation-sidebar__resize-handle"
        onMouseDown={handleResizeStart}
        aria-label="Resize sidebar"
      />
      <div className="queue-evaluation-sidebar__shell">
        {/* Header with title for results view */}
        {isResults && (
          <div className="queue-evaluation-sidebar__results-header">
            <h2 className="queue-evaluation-sidebar__results-title">Queue evaluation results</h2>
            <button
              type="button"
              className="queue-evaluation-sidebar__close queue-evaluation-sidebar__close--inline"
              aria-label="Close queue evaluation sidebar"
              onClick={onClose}
            >
              <PromoCloseIcon className="queue-evaluation-sidebar__close-icon" />
            </button>
          </div>
        )}

        {/* Header with empty label for enabled view - matches Figma Turn On state */}
        {isEnabled && (
          <div className="queue-evaluation-sidebar__header-minimal">
            <button
              type="button"
              className="queue-evaluation-sidebar__close queue-evaluation-sidebar__close--right"
              aria-label="Close queue evaluation sidebar"
              onClick={onCloseEnabled}
            >
              <PromoCloseIcon className="queue-evaluation-sidebar__close-icon" />
            </button>
          </div>
        )}

        {/* Header with title for performance view */}
        {isPerformance && (
          <div className="queue-evaluation-sidebar__results-header">
            <h2 className="queue-evaluation-sidebar__results-title">{queue.name} queue performance</h2>
            <button
              type="button"
              className="queue-evaluation-sidebar__close queue-evaluation-sidebar__close--inline"
              aria-label="Close queue evaluation sidebar"
              onClick={onClose}
            >
              <PromoCloseIcon className="queue-evaluation-sidebar__close-icon" />
            </button>
          </div>
        )}

        {/* Close button for non-results, non-enabled, and non-performance views */}
        {!isResults && !isEnabled && !isPerformance && (
          <button
            type="button"
            className="queue-evaluation-sidebar__close"
            aria-label="Close queue evaluation sidebar"
            onClick={onClose}
          >
            <PromoCloseIcon className="queue-evaluation-sidebar__close-icon" />
          </button>
        )}

        {/* Main content */}
        <div className={`queue-evaluation-sidebar__content ${isResults ? 'queue-evaluation-sidebar__content--results' : ''} ${isEnabled ? 'queue-evaluation-sidebar__content--enabled' : ''} ${isPerformance ? 'queue-evaluation-sidebar__content--performance' : ''}`}>
          {isPerformance ? (
            <QueuePerformanceView 
              queue={queue}
              results={results}
              onClose={onClose}
            />
          ) : isEnabled ? (
            <QueueEvaluationEnabled 
              queue={queue}
              onClose={onCloseEnabled}
            />
          ) : isResults ? (
            <QueueEvaluationResults 
              queue={queue}
              results={results}
              onEnablePredictive={onEnablePredictive}
              onKeepInitial={onKeepInitial}
              onDismiss={onDismiss}
            />
          ) : isAnalyzing ? (
            <QueueEvaluationAnalyzing 
              queue={queue} 
              progress={progress}
              setProgress={setEvaluationProgress}
            />
          ) : (
            <div className="queue-evaluation-sidebar__welcome">
              <BookOpenIcon className="queue-evaluation-sidebar__book-icon" />
              <h2 className="queue-evaluation-sidebar__title">Evaluate, review, decide</h2>
              <div className="queue-evaluation-sidebar__description">
                <p>Test Predictive routing on this queue. You&apos;ll choose what to do with the results.</p>
                <ul>
                  <li>Turn on Predictive routing</li>
                  <li>Keep Initial routing</li>
                </ul>
                <p>Takes a few minutes. You&apos;ll be notified when ready.</p>
              </div>
              <Button 
                isPrimary
                className="queue-evaluation-sidebar__cta"
                onClick={onBeginEvaluation}
              >
                Evaluate {queue.name} queue
              </Button>
            </div>
          )}
        </div>

        {/* Footer disclaimer - show for intro and analyzing views */}
        {!isResults && !isEnabled && !isPerformance && (
          <div className="queue-evaluation-sidebar__disclaimer">
            <span className="queue-evaluation-sidebar__disclaimer-title">Powered by AI</span>
            <p className="queue-evaluation-sidebar__disclaimer-text">
              Evaluation results are based on simulated data. Actual performance may vary once Predictive routing is live.
            </p>
          </div>
        )}
        
        {/* Footer for enabled state - matches Figma */}
        {isEnabled && (
          <div className="queue-evaluation-sidebar__disclaimer queue-evaluation-sidebar__disclaimer--enabled">
            <p className="queue-evaluation-sidebar__disclaimer-text">
              You can change this setting anytime in the queue configuration.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}



export default function QueuesPage({
  onProductChange,
  selectedProduct,
  products,
  initialSubPage = 'queues',
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubPage, setActiveSubPage] = useState(initialSubPage);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [queues, setQueues] = useState(sampleQueues);
  const [selectedQueue, setSelectedQueue] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [evaluatingQueue, setEvaluatingQueue] = useState(null);
  
  // Track all queues that are currently being evaluated (persists after closing sidebar)
  const [queuesInEvaluation, setQueuesInEvaluation] = useState(new Set());
  
  // Track all queues that have completed evaluation and have results ready
  const [queuesWithResults, setQueuesWithResults] = useState(new Set());
  
  // Evaluation state management
  const [evaluationPhase, setEvaluationPhase] = useState('intro'); // 'intro' | 'analyzing' | 'results'
  const [evaluationProgress, setEvaluationProgress] = useState({
    completedSteps: 0,
    totalSteps: 6,
    currentStep: 0
  });

  // Effect to detect when evaluation completes and transition to results
  useEffect(() => {
    if (evaluationProgress.currentStep >= evaluationProgress.totalSteps && evaluatingQueue) {
      // Evaluation completed - transition to results phase
      const queueId = evaluatingQueue.id;
      
      // Remove from evaluating, add to results
      setQueuesInEvaluation(prev => {
        const newSet = new Set(prev);
        newSet.delete(queueId);
        return newSet;
      });
      setQueuesWithResults(prev => new Set([...prev, queueId]));
      setEvaluationPhase('results');
    }
  }, [evaluationProgress.currentStep, evaluationProgress.totalSteps, evaluatingQueue]);

  useEffect(() => {
    setActiveSubPage(initialSubPage);
  }, [initialSubPage]);

  const handleToggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleSubPageSelect = (itemId) => {
    if (itemId === 'routing-config') {
      setActiveSubPage(itemId);
    }
  };

  const handleReorderQueues = (fromIndex, toIndex) => {
    setQueues(prevQueues => {
      const newQueues = [...prevQueues];
      const [movedItem] = newQueues.splice(fromIndex, 1);
      newQueues.splice(toIndex, 0, movedItem);
      return newQueues;
    });
  };

  const handleQueueSelect = (queue) => {
    setSelectedQueue(queue);
  };

  const handleCreateQueue = (prefillData = {}) => {
    setSelectedQueue({
      id: null,
      isNew: true,
      name: prefillData.name || '',
      description: prefillData.description || '',
      subqueue: null,
      priority: { main: prefillData.priority || '1', more: 0, items: [prefillData.priority || '1'] },
      primaryGroups: { main: '', more: 0, items: prefillData.primaryGroups || [] },
      secondaryGroups: { main: '', more: 0, items: prefillData.secondaryGroups || [] },
      assignmentMethod: 'Initial routing configuration',
      conditions: { all: [], any: [] },
      distributeSubqueues: false,
      ...prefillData
    });
    setIsCreating(true);
  };

  const handleCloneQueue = (queue) => {
    // Create a new queue with cloned data
    const clonedQueue = {
      ...queue,
      id: null,
      isNew: true,
      name: `${queue.name} (Copy)`,
    };
    setSelectedQueue(clonedQueue);
    setIsCreating(true);
  };

  const handleDeleteQueue = (queueId) => {
    // Remove queue from the list
    setQueues(prevQueues => prevQueues.filter(q => q.id !== queueId));

    // Clean up evaluation states
    setQueuesInEvaluation(prev => {
      const newSet = new Set(prev);
      newSet.delete(queueId);
      return newSet;
    });

    setQueuesWithResults(prev => {
      const newSet = new Set(prev);
      newSet.delete(queueId);
      return newSet;
    });
  };

  const handleBackToList = () => {
    setSelectedQueue(null);
    setIsCreating(false);
  };

  const handleSaveQueue = (updatedQueue) => {
    if (isCreating) {
      // Generate a new unique ID for the queue
      const maxId = queues.reduce((max, q) => Math.max(max, q.id), 0);
      const newQueue = {
        ...updatedQueue,
        id: maxId + 1,
        isNew: undefined // Remove the isNew flag
      };
      // Update display fields for the table
      if (newQueue.primaryGroups?.items?.length > 0) {
        newQueue.primaryGroups.main = newQueue.primaryGroups.items[0];
        newQueue.primaryGroups.more = Math.max(0, newQueue.primaryGroups.items.length - 1);
      }
      if (newQueue.secondaryGroups?.items?.length > 0) {
        newQueue.secondaryGroups.main = newQueue.secondaryGroups.items[0];
        newQueue.secondaryGroups.more = Math.max(0, newQueue.secondaryGroups.items.length - 1);
      }
      setQueues(prevQueues => [...prevQueues, newQueue]);
      setIsCreating(false);
    } else {
      setQueues(prevQueues => 
        prevQueues.map(q => q.id === updatedQueue.id ? updatedQueue : q)
      );
    }
    setSelectedQueue(null);
  };

  const filteredQueues = queues.filter(queue => 
    queue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartQueueEvaluation = (queue) => {
    // Check if Predictive routing is already enabled for this queue
    const isPredictiveEnabled = queue.assignmentMethod === 'Predictive routing';
    // Check if this queue has results ready
    const hasResults = queuesWithResults.has(queue.id);
    // Check if this queue is already being evaluated
    const isAlreadyEvaluating = queuesInEvaluation.has(queue.id);
    
    setEvaluatingQueue(queue);
    
    if (isPredictiveEnabled) {
      // Show performance metrics view
      setEvaluationPhase('performance');
    } else if (hasResults) {
      // Show results view
      setEvaluationPhase('results');
    } else if (isAlreadyEvaluating) {
      // Show analyzing state
      setEvaluationPhase('analyzing');
    } else {
      // Show intro state
      setEvaluationPhase('intro');
      setEvaluationProgress({
        completedSteps: 0,
        totalSteps: 6,
        currentStep: 0
      });
    }
  };

  const handleCloseQueueEvaluation = () => {
    // Keep the evaluation running in background, just close the sidebar
    setEvaluatingQueue(null);
    // Don't reset phase or progress - evaluation continues in background
  };

  // Start the actual evaluation (triggered from sidebar CTA)
  const handleBeginEvaluation = () => {
    if (evaluatingQueue) {
      // Add this queue to the set of queues being evaluated
      setQueuesInEvaluation(prev => new Set([...prev, evaluatingQueue.id]));
    }
    setEvaluationPhase('analyzing');
    setEvaluationProgress({
      completedSteps: 0,
      totalSteps: 6,
      currentStep: 0
    });
  };

  // Enable Predictive routing for the queue
  const handleEnablePredictiveRouting = () => {
    if (evaluatingQueue) {
      // Update the queue's assignment method
      setQueues(prevQueues => 
        prevQueues.map(q => 
          q.id === evaluatingQueue.id 
            ? { ...q, assignmentMethod: 'Predictive routing' }
            : q
        )
      );
      // Remove from results set
      setQueuesWithResults(prev => {
        const newSet = new Set(prev);
        newSet.delete(evaluatingQueue.id);
        return newSet;
      });
      // Show enabled state instead of closing
      setEvaluationPhase('enabled');
    }
  };

  // Keep Initial routing - just mark as resolved
  const handleKeepInitialRouting = () => {
    if (evaluatingQueue) {
      // Remove from results set (user has made a decision)
      setQueuesWithResults(prev => {
        const newSet = new Set(prev);
        newSet.delete(evaluatingQueue.id);
        return newSet;
      });
      // Close sidebar
      setEvaluatingQueue(null);
      setEvaluationPhase('intro');
    }
  };

  // Dismiss results - remove from results set
  const handleDismissResults = () => {
    if (evaluatingQueue) {
      // Remove from results set
      setQueuesWithResults(prev => {
        const newSet = new Set(prev);
        newSet.delete(evaluatingQueue.id);
        return newSet;
      });
      // Close sidebar
      setEvaluatingQueue(null);
      setEvaluationPhase('intro');
    }
  };

  // Close sidebar after enabling predictive routing (from enabled state)
  const handleCloseEnabledState = () => {
    setEvaluatingQueue(null);
    setEvaluationPhase('intro');
  };

  // Navigation column component to share with QueueEditPage
  const navColumn = (
    <PageSidebarNav
      primaryItems={primaryNavItems}
      secondaryHeading="Objects and rules"
      secondarySections={secondaryNavSections}
      activeItem={activeSubPage}
      onItemSelect={handleSubPageSelect}
      isCollapsed={isNavCollapsed}
      onToggleCollapse={handleToggleNav}
    />
  );

  if (activeSubPage === 'routing-config') {
    return (
      <RoutingConfigPage
        navColumn={navColumn}
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
        onNavigateToQueues={() => setActiveSubPage('queues')}
      />
    );
  }

  // Show Queue Edit Page if a queue is selected
  if (selectedQueue) {
    return (
      <QueueEditPage
        queue={selectedQueue}
        isCreating={isCreating}
        onBack={handleBackToList}
        onSave={handleSaveQueue}
        navColumn={navColumn}
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
      />
    );
  }

  return (
    <div className="queues-page">
      <TopBar
        pageTitle="Predictive routing"
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
      />
      <div className="queues-page__body">
        {/* Navigation Column */}
        {navColumn}
        
        {/* Content Column */}
        <div className="queues-page__content-column">
        
          <div className="queues-page__main-wrapper">
            <main className="queues-page__main">
              <div className="queues-page__content">
                {/* Breadcrumbs */}
                <div className="queues-breadcrumbs">
                  <Anchor href="#" className="queues-breadcrumbs__link">Objects and rules</Anchor>
                  <ChevronRightIcon className="queues-breadcrumbs__separator" />
                  <Anchor href="#" className="queues-breadcrumbs__link">Omnichannel routing</Anchor>
                  <ChevronRightIcon className="queues-breadcrumbs__separator" />
                  <span className="queues-breadcrumbs__current">Queues</span>
                </div>

                {/* Page Header */}
                <div className="queues-page-header">
                  <div className="queues-page-header__left">
                    <h1 className="queues-page-header__title">Queues</h1>
                    <div className="queues-page-header__description">
                      <p>
                        Queues give you the flexibility to prioritize tickets across different groups.{' '}
                        <Anchor href="#" className="queues-page-header__link">
                          Learn about queues
                          <ExternalLinkIcon className="queues-page-header__link-icon" />
                        </Anchor>
                      </p>
                      <p>
                        All queues use the{' '}
                        <Anchor href="#" className="queues-page-header__link">
                          Initial routing configuration
                          <ExternalLinkIcon className="queues-page-header__link-icon" />
                        </Anchor>
                        {' '}by default, with Predictive routing available per queue.
                      </p>
                    </div>
                  </div>
                  <div className="queues-page-header__actions">
                    <Button onClick={() => {}}>Manage settings</Button>
                    <Button isPrimary onClick={() => handleCreateQueue()}>Create queue</Button>
                  </div>
                </div>

                {/* Search and Table */}
                <QueuesPromoCard />

                <div className="queues-search-section">
                  <div className="queues-search-section__field">
                    <label className="queues-search-section__label">Find a queue</label>
                    <div className="queues-search-section__input-wrapper">
                      <SearchIcon className="queues-search-section__input-icon" />
                      <input 
                        type="text" 
                        className="queues-search-section__input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                <div className="queues-table-section">
                  <p className="queues-table-section__count">{filteredQueues.length} queues</p>
                <QueuesTable
                  queues={filteredQueues}
                  onReorder={handleReorderQueues}
                  onQueueSelect={handleQueueSelect}
                  onStartQueueEvaluation={handleStartQueueEvaluation}
                  queuesInEvaluation={queuesInEvaluation}
                  queuesWithResults={queuesWithResults}
                  onDeleteQueue={handleDeleteQueue}
                  onCloneQueue={handleCloneQueue}
                />
                </div>
              </div>
            </main>

            {evaluatingQueue && (
              <QueueEvaluationPanel 
                queue={evaluatingQueue} 
                onClose={handleCloseQueueEvaluation}
                phase={evaluationPhase}
                progress={evaluationProgress}
                onBeginEvaluation={handleBeginEvaluation}
                setEvaluationProgress={setEvaluationProgress}
                onEnablePredictive={handleEnablePredictiveRouting}
                onKeepInitial={handleKeepInitialRouting}
                onDismiss={handleDismissResults}
                onCloseEnabled={handleCloseEnabledState}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
