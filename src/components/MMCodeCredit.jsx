import React from "react";

// Adapted from the supplied MMCodeCredit.tsx; colors follow the portfolio theme.
export default function MMCodeCredit({ href = "https://mmcode.lk", label = "Developed by", brandName = "MMCode", className = "" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`mmcode-credit ${className}`} aria-label={`${label} ${brandName}`}>
      <span className="mmcode-credit-label">{label}</span>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 7L3 12L8 17M16 7L21 12L16 17M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{brandName}</span>
    </a>
  );
}
