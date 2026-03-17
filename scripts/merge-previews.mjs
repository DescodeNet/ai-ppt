/**
 * Convert Tailwind classes in previews-data.json to inline styles
 * and merge into src/data/templates.json
 */
import { readFileSync, writeFileSync } from 'fs';

const previews = JSON.parse(readFileSync('previews-data.json', 'utf8'));
const templates = JSON.parse(readFileSync('src/data/templates.json', 'utf8'));

// Tailwind class → inline CSS mapping
const twMap = {
  // Layout
  'relative': 'position:relative',
  'absolute': 'position:absolute',
  'flex': 'display:flex',
  'grid': 'display:grid',
  'grid-cols-2': 'grid-template-columns:repeat(2,1fr)',
  'grid-cols-4': 'grid-template-columns:repeat(4,1fr)',
  'items-center': 'align-items:center',
  'items-end': 'align-items:flex-end',
  'justify-center': 'justify-content:center',
  'flex-1': 'flex:1',
  'text-center': 'text-align:center',
  'overflow-hidden': 'overflow:hidden',
  'pointer-events-none': 'pointer-events:none',

  // Aspect ratio
  'aspect-video': 'aspect-ratio:16/9',

  // Positioning
  'inset-0': 'inset:0',
  'inset-2': 'inset:0.5rem',
  'inset-3': 'inset:0.75rem',
  'top-0': 'top:0',
  'top-2': 'top:0.5rem',
  'top-3': 'top:0.75rem',
  'top-4': 'top:1rem',
  'top-5': 'top:1.25rem',
  'top-6': 'top:1.5rem',
  'top-7': 'top:1.75rem',
  'top-8': 'top:2rem',
  'top-1/2': 'top:50%',
  'top-full': 'top:100%',
  'bottom-0': 'bottom:0',
  'bottom-2': 'bottom:0.5rem',
  'bottom-3': 'bottom:0.75rem',
  'bottom-4': 'bottom:1rem',
  'bottom-5': 'bottom:1.25rem',
  'bottom-6': 'bottom:1.5rem',
  'left-0': 'left:0',
  'left-2': 'left:0.5rem',
  'left-3': 'left:0.75rem',
  'left-4': 'left:1rem',
  'left-5': 'left:1.25rem',
  'left-6': 'left:1.5rem',
  'left-7': 'left:1.75rem',
  'left-8': 'left:2rem',
  'left-10': 'left:2.5rem',
  'left-11': 'left:2.75rem',
  'left-14': 'left:3.5rem',
  'left-1/2': 'left:50%',
  'left-1/3': 'left:33.333%',
  'right-0': 'right:0',
  'right-2': 'right:0.5rem',
  'right-3': 'right:0.75rem',
  'right-4': 'right:1rem',
  'right-5': 'right:1.25rem',
  'right-6': 'right:1.5rem',
  'right-8': 'right:2rem',

  // Transform
  '-translate-x-1/2': '--tw-translate-x:-50%',
  '-translate-y-1/2': '--tw-translate-y:-50%',
  'rotate-3': '--tw-rotate:3deg',
  '-rotate-2': '--tw-rotate:-2deg',
  '-rotate-3': '--tw-rotate:-3deg',
  'rotate-45': '--tw-rotate:45deg',

  // Width
  'w-px': 'width:1px',
  'w-0.5': 'width:0.125rem',
  'w-1': 'width:0.25rem',
  'w-1.5': 'width:0.375rem',
  'w-2': 'width:0.5rem',
  'w-3': 'width:0.75rem',
  'w-4': 'width:1rem',
  'w-5': 'width:1.25rem',
  'w-6': 'width:1.5rem',
  'w-7': 'width:1.75rem',
  'w-8': 'width:2rem',
  'w-10': 'width:2.5rem',
  'w-12': 'width:3rem',
  'w-14': 'width:3.5rem',
  'w-16': 'width:4rem',
  'w-full': 'width:100%',
  'w-2/3': 'width:66.667%',
  'w-3/4': 'width:75%',

  // Height
  'h-px': 'height:1px',
  'h-0.5': 'height:0.125rem',
  'h-1': 'height:0.25rem',
  'h-1.5': 'height:0.375rem',
  'h-2': 'height:0.5rem',
  'h-3': 'height:0.75rem',
  'h-4': 'height:1rem',
  'h-5': 'height:1.25rem',
  'h-6': 'height:1.5rem',
  'h-8': 'height:2rem',
  'h-10': 'height:2.5rem',
  'h-12': 'height:3rem',
  'h-full': 'height:100%',
  'h-1/2': 'height:50%',
  'h-1/3': 'height:33.333%',
  'h-2/3': 'height:66.667%',

  // Spacing
  'p-1': 'padding:0.25rem',
  'px-1': 'padding-left:0.25rem;padding-right:0.25rem',
  'px-1.5': 'padding-left:0.375rem;padding-right:0.375rem',
  'px-2': 'padding-left:0.5rem;padding-right:0.5rem',
  'py-0.5': 'padding-top:0.125rem;padding-bottom:0.125rem',
  'py-1': 'padding-top:0.25rem;padding-bottom:0.25rem',
  'mt-1': 'margin-top:0.25rem',
  'mt-3': 'margin-top:0.75rem',
  'gap-0.5': 'gap:0.125rem',
  'gap-1': 'gap:0.25rem',
  'space-y-1': '--space-y:0.25rem',
  '-space-x-1': '--space-x:-0.25rem',

  // Border
  'border': 'border:1px solid',
  'border-2': 'border-width:2px',
  'border-4': 'border-width:4px',
  'border-dashed': 'border-style:dashed',
  'border-b': 'border-bottom:1px solid',
  'border-b-2': 'border-bottom:2px solid',
  'border-t-2': 'border-top:2px solid',
  'border-l-2': 'border-left:2px solid',
  'border-r-2': 'border-right:2px solid',
  'border-white/60': 'border-color:rgba(255,255,255,0.6)',
  'border-zinc-300': 'border-color:#d4d4d8',

  // Border radius
  'rounded': 'border-radius:0.25rem',
  'rounded-sm': 'border-radius:0.125rem',
  'rounded-lg': 'border-radius:0.5rem',
  'rounded-xl': 'border-radius:0.75rem',
  'rounded-full': 'border-radius:9999px',
  'rounded-t': 'border-radius:0.25rem 0.25rem 0 0',
  'rounded-t-full': 'border-radius:9999px 9999px 0 0',

  // Typography
  'font-bold': 'font-weight:700',
  'font-semibold': 'font-weight:600',
  'font-black': 'font-weight:900',
  'font-mono': "font-family:ui-monospace,SFMono-Regular,monospace",
  'font-serif': "font-family:ui-serif,Georgia,serif",
  'italic': 'font-style:italic',
  'tracking-widest': 'letter-spacing:0.1em',
  'text-white': 'color:#fff',
  'text-xs': 'font-size:0.75rem;line-height:1rem',
  'text-sm': 'font-size:0.875rem;line-height:1.25rem',
  'text-base': 'font-size:1rem;line-height:1.5rem',
  'text-lg': 'font-size:1.125rem;line-height:1.75rem',
  'text-xl': 'font-size:1.25rem;line-height:1.75rem',
  'text-[4px]': 'font-size:4px',
  'text-[5px]': 'font-size:5px',
  'text-[6px]': 'font-size:6px',
  'text-[7px]': 'font-size:7px',
  'text-[8px]': 'font-size:8px',
  'text-[9px]': 'font-size:9px',
  'text-[10px]': 'font-size:10px',
  'text-[11px]': 'font-size:11px',
  'text-[12px]': 'font-size:12px',

  // Background
  'bg-white': 'background-color:#fff',
  'bg-white/40': 'background-color:rgba(255,255,255,0.4)',
  'bg-black/40': 'background-color:rgba(0,0,0,0.4)',
  'bg-black/60': 'background-color:rgba(0,0,0,0.6)',
  'bg-red-500': 'background-color:#ef4444',
  'bg-yellow-400': 'background-color:#facc15',
  'bg-blue-500': 'background-color:#3b82f6',
  'bg-gray-200': 'background-color:#e5e7eb',
  'bg-gray-300': 'background-color:#d1d5db',
  'bg-zinc-800': 'background-color:#27272a',
  'bg-orange-200/80': 'background-color:rgba(254,215,170,0.8)',
  'bg-yellow-100/80': 'background-color:rgba(254,249,195,0.8)',

  // Gradients
  'bg-gradient-to-br': '--tw-gradient-dir:to bottom right',
  'bg-gradient-to-b': '--tw-gradient-dir:to bottom',
  'bg-gradient-to-t': '--tw-gradient-dir:to top',
  'from-purple-600': '--tw-gradient-from:#9333ea',
  'from-violet-400': '--tw-gradient-from:#a78bfa',
  'from-green-400/40': '--tw-gradient-from:rgba(74,222,128,0.4)',
  'from-black/20': '--tw-gradient-from:rgba(0,0,0,0.2)',
  'via-pink-500': '--tw-gradient-via:#ec4899',
  'via-purple-500/30': '--tw-gradient-via:rgba(168,85,247,0.3)',
  'to-blue-500': '--tw-gradient-to:#3b82f6',
  'to-indigo-600': '--tw-gradient-to:#4f46e5',
  'to-transparent': '--tw-gradient-to:transparent',

  // Shadow
  'shadow': 'box-shadow:0 1px 3px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.06)',
  'shadow-md': 'box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.1)',

  // Opacity
  'opacity-10': 'opacity:0.1',
  'opacity-20': 'opacity:0.2',
  'opacity-30': 'opacity:0.3',
  'opacity-80': 'opacity:0.8',

  // Animation (skip for static)
  'transition-transform': '',
  'group-hover:scale-[1.03]': '',
};

function convertClassesToStyle(html) {
  return html.replace(/class="([^"]+)"/g, (match, classes) => {
    const classList = classes.trim().split(/\s+/);
    const styles = [];
    const transforms = [];
    let hasGradient = false;
    let gradientDir = 'to bottom right';
    let gradientFrom = '';
    let gradientVia = '';
    let gradientTo = '';
    let spaceY = '';
    let spaceX = '';

    for (const cls of classList) {
      const mapped = twMap[cls];
      if (mapped === undefined) {
        // Unknown class - skip silently
        continue;
      }
      if (mapped === '') continue; // Skip (transition, hover, etc.)

      if (mapped.startsWith('--tw-translate-x:')) {
        transforms.push(`translateX(${mapped.split(':')[1]})`);
      } else if (mapped.startsWith('--tw-translate-y:')) {
        transforms.push(`translateY(${mapped.split(':')[1]})`);
      } else if (mapped.startsWith('--tw-rotate:')) {
        transforms.push(`rotate(${mapped.split(':')[1]})`);
      } else if (mapped.startsWith('--tw-gradient-dir:')) {
        hasGradient = true;
        gradientDir = mapped.split(':').slice(1).join(':');
      } else if (mapped.startsWith('--tw-gradient-from:')) {
        hasGradient = true;
        gradientFrom = mapped.split(':').slice(1).join(':');
      } else if (mapped.startsWith('--tw-gradient-via:')) {
        hasGradient = true;
        gradientVia = mapped.split(':').slice(1).join(':');
      } else if (mapped.startsWith('--tw-gradient-to:')) {
        hasGradient = true;
        gradientTo = mapped.split(':').slice(1).join(':');
      } else if (mapped.startsWith('--space-y:')) {
        spaceY = mapped.split(':')[1];
      } else if (mapped.startsWith('--space-x:')) {
        spaceX = mapped.split(':')[1];
      } else {
        styles.push(mapped);
      }
    }

    if (transforms.length > 0) {
      styles.push(`transform:${transforms.join(' ')}`);
    }

    if (hasGradient) {
      let stops = [];
      if (gradientFrom) stops.push(gradientFrom);
      if (gradientVia) stops.push(gradientVia);
      if (gradientTo) stops.push(gradientTo);
      if (stops.length > 0) {
        styles.push(`background:linear-gradient(${gradientDir},${stops.join(',')})`);
      }
    }

    if (styles.length === 0) return '';
    return `style="${styles.join(';')}"`;
  });
}

function mergeExistingStyle(html) {
  // Merge adjacent style attributes: style="a" style="b" → style="a;b"
  return html.replace(/style="([^"]*?)"\s*style="([^"]*?)"/g, (_, a, b) => {
    return `style="${a};${b}"`;
  });
}

function cleanupEmptyAttrs(html) {
  // Remove empty attributes like style="" that result from skip classes
  return html.replace(/\s*style=""\s*/g, ' ').replace(/\s+>/g, '>').replace(/\s+/g, ' ');
}

// Build name→previewHTML map
const previewMap = new Map();
for (const p of previews) {
  let html = p.previewHTML;
  // Strip the outer hover wrapper div
  html = html.replace(/^<div class="transition-transform group-hover:scale-\[1\.03\]">/, '<div>');

  // Convert Tailwind classes to inline styles
  html = convertClassesToStyle(html);

  // Merge any double style attributes
  let prev = '';
  while (prev !== html) {
    prev = html;
    html = mergeExistingStyle(html);
  }

  html = cleanupEmptyAttrs(html);

  previewMap.set(p.name, html);
}

// Merge into templates
let matched = 0;
let unmatched = 0;
for (const t of templates) {
  const preview = previewMap.get(t.name);
  if (preview) {
    t.previewHTML = preview;
    matched++;
  } else {
    t.previewHTML = '';
    unmatched++;
  }
}

writeFileSync('src/data/templates.json', JSON.stringify(templates, null, 2), 'utf8');
console.log(`Merged ${matched} previews (${unmatched} unmatched) → src/data/templates.json`);

// Print a sample to verify
const sample = templates.find(t => t.name === '화이트 페이퍼');
if (sample) {
  console.log('\nSample (화이트 페이퍼):');
  console.log(sample.previewHTML);
}
