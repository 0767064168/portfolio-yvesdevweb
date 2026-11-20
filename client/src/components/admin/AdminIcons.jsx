import React from 'react';

export function Icon({ d, children, size = 18, className = '', strokeWidth = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
    >
      {d ? <path d={d} /> : children}
    </svg>
  );
}

export const IconOverview = (props) => (
  <Icon {...props}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </Icon>
);

export const IconProfile = (props) => (
  <Icon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

export const IconProjects = (props) => (
  <Icon {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </Icon>
);

export const IconSkills = (props) => (
  <Icon {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </Icon>
);

export const IconServices = (props) => (
  <Icon {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </Icon>
);

export const IconMessages = (props) => (
  <Icon {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Icon>
);

export const IconTestimonials = (props) => (
  <Icon {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </Icon>
);

export const IconVideos = (props) => (
  <Icon {...props}>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </Icon>
);

export const IconBackup = (props) => (
  <Icon {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </Icon>
);

export const IconLogout = (props) => (
  <Icon {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Icon>
);

export const IconExternal = (props) => (
  <Icon {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </Icon>
);

export const IconPlus = (props) => (
  <Icon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const IconEdit = (props) => (
  <Icon {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Icon>
);

export const IconTrash = (props) => (
  <Icon {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </Icon>
);

export const IconCheck = (props) => (
  <Icon {...props}>
    <polyline points="20 6 9 17 4 12" />
  </Icon>
);

export const IconSearch = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Icon>
);

export const IconSave = (props) => (
  <Icon {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </Icon>
);

export const IconCopy = (props) => (
  <Icon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

export const IconDownload = (props) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Icon>
);

export const IconUpload = (props) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </Icon>
);

export const IconKey = (props) => (
  <Icon {...props}>
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M11.5 11.5L22 1l-1 4-3 1-1 3-3 1" />
  </Icon>
);

export const IconLightning = (props) => (
  <Icon {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </Icon>
);

export const IconEye = (props) => (
  <Icon {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const IconEyeOff = (props) => (
  <Icon {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </Icon>
);

export const IconPhone = (props) => (
  <Icon {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

export const IconMail = (props) => (
  <Icon {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </Icon>
);

export const IconMapPin = (props) => (
  <Icon {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

export const IconStar = (props) => (
  <Icon {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Icon>
);

export const IconRefresh = (props) => (
  <Icon {...props}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </Icon>
);

export const IconClose = (props) => (
  <Icon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

export const IconArchive = (props) => (
  <Icon {...props}>
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </Icon>
);

export const IconSettings = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Icon>
);

export const IconImage = (props) => (
  <Icon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </Icon>
);

// --------------------------------------------------------------------------
// AUTHENTIC OFFICIAL BRAND BADGES (Pixel-perfect vectors & official brand colors)
// --------------------------------------------------------------------------

export const BrandBadgeLinkedIn = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`shrink-0 rounded-md shadow-sm ${className}`}
    aria-hidden="true"
  >
    <rect width="24" height="24" rx="5" fill="#0A66C2" />
    <path
      fill="#ffffff"
      d="M19 19h-2.8v-4.4c0-1.05-.02-2.4-1.46-2.4-1.47 0-1.69 1.15-1.69 2.32V19H10.25V9.95h2.69v1.23h.04c.37-.71 1.3-1.46 2.65-1.46 2.84 0 3.37 1.87 3.37 4.3V19zM7.46 8.71a1.57 1.57 0 1 1 0-3.14 1.57 1.57 0 0 1 0 3.14zM8.86 19H6.06V9.95h2.8V19z"
    />
  </svg>
);

export const BrandBadgeGitHub = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`shrink-0 rounded-md shadow-sm border border-white/10 ${className}`}
    aria-hidden="true"
  >
    <rect width="24" height="24" rx="5" fill="#181717" />
    <path
      fill="#ffffff"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.5C7.3 3.5 3.5 7.3 3.5 12c0 3.76 2.44 6.95 5.82 8.08.43.08.58-.19.58-.41 0-.2-.01-.87-.01-1.58-2.36.51-2.86-1-2.86-1-.39-.98-.94-1.24-.94-1.24-.77-.53.06-.52.06-.52.85.06 1.3 1.05 1.3 1.05.76 1.3 1.99.92 2.47.7.08-.55.3-.92.54-1.14-1.89-.21-3.87-.94-3.87-4.2 0-.93.33-1.69.88-2.28-.09-.22-.38-1.08.08-2.25 0 0 .72-.23 2.34.87.68-.19 1.41-.28 2.14-.28.73 0 1.46.1 2.14.28 1.63-1.1 2.34-.87 2.34-.87.46 1.17.17 2.03.08 2.25.55.59.87 1.35.87 2.28 0 3.27-1.98 3.98-3.88 4.19.31.27.58.79.58 1.6 0 1.15-.01 2.08-.01 2.37 0 .23.16.5.59.41 3.38-1.13 5.81-4.32 5.81-8.08 0-4.7-3.8-8.5-8.5-8.5z"
    />
  </svg>
);

export const BrandBadgeTikTok = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`shrink-0 rounded-md shadow-sm ${className}`}
    aria-hidden="true"
  >
    <rect width="24" height="24" rx="5" fill="#010101" />
    <g transform="translate(4.2, 4.2) scale(0.65)">
      <path
        fill="#25F4EE"
        d="M16.5 0h2.1c.3 2.5 1.7 4.1 4.2 4.3v2.8c-1.6 0-3-.6-4.2-1.6v8.6c0 4.1-3.3 7.5-7.5 7.5S3.6 18.2 3.6 14.1s3.4-7.5 7.5-7.5c.5 0 1 .1 1.5.2v2.9c-.5-.2-1-.3-1.5-.3-2.6 0-4.6 2.1-4.6 4.7s2.1 4.7 4.6 4.7 4.7-2.1 4.7-4.7V0h.7z"
        opacity="0.85"
      />
      <path
        fill="#FE2C55"
        d="M17.5 1h2.1c.3 2.5 1.7 4.1 4.2 4.3v2.8c-1.6 0-3-.6-4.2-1.6v8.6c0 4.1-3.3 7.5-7.5 7.5S4.6 19.2 4.6 15.1s3.4-7.5 7.5-7.5c.5 0 1 .1 1.5.2v2.9c-.5-.2-1-.3-1.5-.3-2.6 0-4.6 2.1-4.6 4.7s2.1 4.7 4.6 4.7 4.7-2.1 4.7-4.7V1h.7z"
        opacity="0.85"
      />
      <path
        fill="#FFFFFF"
        d="M17 0.5h2.1c.3 2.5 1.7 4.1 4.2 4.3v2.8c-1.6 0-3-.6-4.2-1.6v8.6c0 4.1-3.3 7.5-7.5 7.5S4.1 18.7 4.1 14.6s3.4-7.5 7.5-7.5c.5 0 1 .1 1.5.2v2.9c-.5-.2-1-.3-1.5-.3-2.6 0-4.6 2.1-4.6 4.7s2.1 4.7 4.6 4.7 4.7-2.1 4.7-4.7V0.5h.7z"
      />
    </g>
  </svg>
);

export const BrandBadgeInstagram = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`shrink-0 rounded-md shadow-sm ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ig-gradient-admin" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="url(#ig-gradient-admin)" />
    <path
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 4.5h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z"
    />
    <circle cx="12" cy="12" r="3.2" fill="none" stroke="#ffffff" strokeWidth="1.6" />
    <circle cx="16.5" cy="7.5" r="0.9" fill="#ffffff" />
  </svg>
);

export const BrandBadgeFacebook = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`shrink-0 rounded-md shadow-sm ${className}`}
    aria-hidden="true"
  >
    <rect width="24" height="24" rx="5" fill="#1877F2" />
    <path
      fill="#ffffff"
      d="M15.5 13.2l.6-3.8h-3.6V6.9c0-1.04.51-2.05 2.14-2.05h1.66V1.6S14.7 1.35 13.3 1.35c-2.9 0-4.8 1.76-4.8 4.96v3.1H5.2v3.8h3.3V22.5c.67.1 1.35.15 2.05.15s1.38-.05 2.05-.15V13.2h2.9z"
    />
  </svg>
);

export const BrandBadgeWhatsApp = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`shrink-0 rounded-md shadow-sm ${className}`}
    aria-hidden="true"
  >
    <rect width="24" height="24" rx="5" fill="#25D366" />
    <path
      fill="#ffffff"
      d="M12.04 4.5a7.5 7.5 0 0 0-6.4 11.41L4.5 19.5l3.71-1.12a7.5 7.5 0 1 0 3.83-13.88zm4.4 10.3c-.19.52-.94.97-1.48 1.03-.4.04-.92.06-2.73-.69-2.3-1-3.77-3.34-3.89-3.5-.11-.15-.94-1.25-.94-2.38 0-1.13.59-1.69.8-1.92.21-.23.46-.29.61-.29.15 0 .31 0 .44.01.14.01.32-.05.51.39.19.45.65 1.58.7 1.69.06.11.1.25.02.39-.08.15-.12.24-.23.37-.12.13-.24.29-.35.39-.12.11-.24.23-.1.47.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.53-.12.22.08 1.38.65 1.62.77.24.12.4.18.46.28.06.1.06.58-.13 1.1z"
    />
  </svg>
);
