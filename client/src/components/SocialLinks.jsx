import React from 'react';

export function BrandIconLinkedIn({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 rounded-[5px] shadow-sm ${className}`} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path
        fill="#ffffff"
        d="M19 19h-2.8v-4.4c0-1.05-.02-2.4-1.46-2.4-1.47 0-1.69 1.15-1.69 2.32V19H10.25V9.95h2.69v1.23h.04c.37-.71 1.3-1.46 2.65-1.46 2.84 0 3.37 1.87 3.37 4.3V19zM7.46 8.71a1.57 1.57 0 1 1 0-3.14 1.57 1.57 0 0 1 0 3.14zM8.86 19H6.06V9.95h2.8V19z"
      />
    </svg>
  );
}

export function BrandIconGitHub({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 rounded-[5px] shadow-sm border border-white/10 ${className}`} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#181717" />
      <path
        fill="#ffffff"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.5C7.3 3.5 3.5 7.3 3.5 12c0 3.76 2.44 6.95 5.82 8.08.43.08.58-.19.58-.41 0-.2-.01-.87-.01-1.58-2.36.51-2.86-1-2.86-1-.39-.98-.94-1.24-.94-1.24-.77-.53.06-.52.06-.52.85.06 1.3 1.05 1.3 1.05.76 1.3 1.99.92 2.47.7.08-.55.3-.92.54-1.14-1.89-.21-3.87-.94-3.87-4.2 0-.93.33-1.69.88-2.28-.09-.22-.38-1.08.08-2.25 0 0 .72-.23 2.34.87.68-.19 1.41-.28 2.14-.28.73 0 1.46.1 2.14.28 1.63-1.1 2.34-.87 2.34-.87.46 1.17.17 2.03.08 2.25.55.59.87 1.35.87 2.28 0 3.27-1.98 3.98-3.88 4.19.31.27.58.79.58 1.6 0 1.15-.01 2.08-.01 2.37 0 .23.16.5.59.41 3.38-1.13 5.81-4.32 5.81-8.08 0-4.7-3.8-8.5-8.5-8.5z"
      />
    </svg>
  );
}

export function BrandIconTikTok({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 rounded-[5px] shadow-sm ${className}`} aria-hidden="true">
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
}

export function BrandIconInstagram({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 rounded-[5px] shadow-sm ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad-public" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#ig-grad-public)" />
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
}

export function BrandIconFacebook({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 rounded-[5px] shadow-sm ${className}`} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#1877F2" />
      <path
        fill="#ffffff"
        d="M15.5 13.2l.6-3.8h-3.6V6.9c0-1.04.51-2.05 2.14-2.05h1.66V1.6S14.7 1.35 13.3 1.35c-2.9 0-4.8 1.76-4.8 4.96v3.1H5.2v3.8h3.3V22.5c.67.1 1.35.15 2.05.15s1.38-.05 2.05-.15V13.2h2.9z"
      />
    </svg>
  );
}

export function BrandIconWhatsApp({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 rounded-[5px] shadow-sm ${className}`} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#25D366" />
      <path
        fill="#ffffff"
        d="M12.04 4.5a7.5 7.5 0 0 0-6.4 11.41L4.5 19.5l3.71-1.12a7.5 7.5 0 1 0 3.83-13.88zm4.4 10.3c-.19.52-.94.97-1.48 1.03-.4.04-.92.06-2.73-.69-2.3-1-3.77-3.34-3.89-3.5-.11-.15-.94-1.25-.94-2.38 0-1.13.59-1.69.8-1.92.21-.23.46-.29.61-.29.15 0 .31 0 .44.01.14.01.32-.05.51.39.19.45.65 1.58.7 1.69.06.11.1.25.02.39-.08.15-.12.24-.23.37-.12.13-.24.29-.35.39-.12.11-.24.23-.1.47.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.53-.12.22.08 1.38.65 1.62.77.24.12.4.18.46.28.06.1.06.58-.13 1.1z"
      />
    </svg>
  );
}

export const BRAND_COMPONENTS = {
  linkedin: { Component: BrandIconLinkedIn, label: 'LinkedIn', hoverBorder: 'hover:border-[#0A66C2]/60' },
  github: { Component: BrandIconGitHub, label: 'GitHub', hoverBorder: 'hover:border-white/50' },
  tiktok: { Component: BrandIconTikTok, label: 'TikTok', hoverBorder: 'hover:border-[#EE1D52]/60' },
  instagram: { Component: BrandIconInstagram, label: 'Instagram', hoverBorder: 'hover:border-[#E4405F]/60' },
  facebook: { Component: BrandIconFacebook, label: 'Facebook', hoverBorder: 'hover:border-[#1877F2]/60' },
  whatsapp: { Component: BrandIconWhatsApp, label: 'WhatsApp', hoverBorder: 'hover:border-[#25D366]/60' }
};

export function SocialIcon({ name, href, size = 'w-5 h-5', className = '', showLabel = false }) {
  const brand = BRAND_COMPONENTS[name];
  if (!brand || !href) return null;
  const { Component, label, hoverBorder } = brand;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-icon-btn inline-flex items-center justify-center p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 ${hoverBorder} hover:scale-105 active:scale-95 transition-all duration-200 ${className}`}
      title={label}
      aria-label={`${label} de Yves Yao`}
    >
      <Component className={size} />
      {showLabel && <span className="ml-2 font-medium text-xs text-slate-200">{label}</span>}
    </a>
  );
}

export function SocialGroup({ settings = {}, showLabels = false, className = '' }) {
  const items = [
    { name: 'linkedin', href: settings.linkedin || 'https://linkedin.com/in/yves-yao' },
    settings.github ? { name: 'github', href: settings.github } : null,
    { name: 'tiktok', href: settings.tiktok || 'https://tiktok.com/@yvesyao' },
    { name: 'instagram', href: settings.instagram || 'https://instagram.com/yvesyao' },
    { name: 'facebook', href: settings.facebook || 'https://facebook.com/yvesyao' }
  ].filter(Boolean);

  if (settings.whatsapp) {
    const cleanPhone = (settings.whatsapp || '').replace(/[^0-9]/g, '');
    if (cleanPhone) {
      items.push({ name: 'whatsapp', href: `https://wa.me/${cleanPhone}` });
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((item) => (
        <SocialIcon
          key={item.name}
          name={item.name}
          href={item.href}
          showLabel={showLabels}
        />
      ))}
    </div>
  );
}
