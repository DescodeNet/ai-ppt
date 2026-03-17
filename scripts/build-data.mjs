/**
 * Build structured data from templates-data.json + labels-data.json
 * Output: src/data/templates.json
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const data = JSON.parse(readFileSync('templates-data.json', 'utf8'));
const labels = JSON.parse(readFileSync('labels-data.json', 'utf8'));

function parsePrompt(raw) {
  const lines = raw.split('\n');
  const result = {
    background: '#000000', text: '#ffffff', accent: '#888888',
    font: 'Inter', mood: '', features: [], texture: '', layout: '',
  };
  let section = '';
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('[컬러 시스템]')) { section = 'color'; continue; }
    if (t.startsWith('[무드')) { section = 'mood'; continue; }
    if (t.startsWith('[디자인 특성]')) { section = 'features'; continue; }
    if (t.startsWith('[텍스처]')) { section = 'texture'; continue; }
    if (t.startsWith('[레이아웃')) { section = 'layout'; continue; }
    if (t.startsWith('━') || t.startsWith('■') || t.startsWith('[NotebookLM') || t.startsWith('위 가이드를') || !t) continue;
    if (section === 'color') {
      const m1 = t.match(/배경:\s*(#[0-9a-fA-F]+)/); if (m1) result.background = m1[1];
      const m2 = t.match(/텍스트:\s*(#[0-9a-fA-F]+)/); if (m2) result.text = m2[1];
      const m3 = t.match(/강조:\s*(#[0-9a-fA-F]+)/); if (m3) result.accent = m3[1];
      const m4 = t.match(/폰트:\s*(.+)/); if (m4) result.font = m4[1].trim();
    }
    if (section === 'mood') result.mood += (result.mood ? ', ' : '') + t;
    if (section === 'features' && t.startsWith('•')) result.features.push(t.replace(/^•\s*/, ''));
    if (section === 'texture') result.texture += t;
    if (section === 'layout') result.layout += t;
  }
  return result;
}

const templates = data.map((item) => {
  const p = parsePrompt(item.prompt);
  return {
    name: item.name,
    category: item.category,
    label: labels[item.name] || item.name,
    colors: { background: p.background, text: p.text, accent: p.accent },
    font: p.font,
    mood: p.mood,
    features: p.features,
    texture: p.texture,
    layout: p.layout,
    prompt: item.prompt,
  };
});

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/templates.json', JSON.stringify(templates, null, 2), 'utf8');
console.log(`Built ${templates.length} templates -> src/data/templates.json`);
