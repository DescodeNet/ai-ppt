/**
 * templates-data.json -> individual MDX files with YAML frontmatter
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const data = JSON.parse(readFileSync('templates-data.json', 'utf8'));
const labels = JSON.parse(readFileSync('labels-data.json', 'utf8'));
const outDir = 'src/content/templates';
mkdirSync(outDir, { recursive: true });

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parsePrompt(raw) {
  const lines = raw.split('\n');
  const result = {
    background: '#000000',
    text: '#ffffff',
    accent: '#888888',
    font: 'Inter',
    mood: '',
    features: [],
    texture: '',
    layout: '',
  };

  let section = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('[컬러 시스템]')) { section = 'color'; continue; }
    if (trimmed.startsWith('[무드')) { section = 'mood'; continue; }
    if (trimmed.startsWith('[디자인 특성]')) { section = 'features'; continue; }
    if (trimmed.startsWith('[텍스처]')) { section = 'texture'; continue; }
    if (trimmed.startsWith('[레이아웃')) { section = 'layout'; continue; }
    if (trimmed.startsWith('━') || trimmed.startsWith('■') || trimmed.startsWith('[NotebookLM')) continue;
    if (trimmed.startsWith('위 가이드를')) continue;
    if (!trimmed) continue;

    if (section === 'color') {
      const m1 = trimmed.match(/배경:\s*(#[0-9a-fA-F]+)/); if (m1) result.background = m1[1];
      const m2 = trimmed.match(/텍스트:\s*(#[0-9a-fA-F]+)/); if (m2) result.text = m2[1];
      const m3 = trimmed.match(/강조:\s*(#[0-9a-fA-F]+)/); if (m3) result.accent = m3[1];
      const m4 = trimmed.match(/폰트:\s*(.+)/); if (m4) result.font = m4[1].trim();
    }
    if (section === 'mood') result.mood += (result.mood ? ', ' : '') + trimmed;
    if (section === 'features' && trimmed.startsWith('•')) result.features.push(trimmed.replace(/^•\s*/, ''));
    if (section === 'texture') result.texture += trimmed;
    if (section === 'layout') result.layout += trimmed;
  }
  return result;
}

function yamlEscape(str) {
  if (!str) return "''";
  // Use YAML single quotes - escape internal single quotes by doubling them
  const escaped = str.replace(/'/g, "''");
  return `'${escaped}'`;
}

let count = 0;
for (const item of data) {
  const p = parsePrompt(item.prompt);
  const slug = slugify(item.name);

  const featuresYaml = p.features.map(f => `  - ${yamlEscape(f)}`).join('\n');
  // Escape prompt for YAML - use single quotes, replace newlines with literal \n
  const promptSafe = item.prompt.replace(/\n/g, '\\n').replace(/'/g, "''");

  const yaml = `name: ${yamlEscape(item.name)}
category: ${yamlEscape(item.category)}
label: ${yamlEscape(labels[item.name] || item.name)}
colors:
  background: '${p.background}'
  text: '${p.text}'
  accent: '${p.accent}'
font: ${yamlEscape(p.font)}
mood: ${yamlEscape(p.mood)}
features:
${featuresYaml}
texture: ${yamlEscape(p.texture)}
layout: ${yamlEscape(p.layout)}
prompt: '${promptSafe}'`;

  const mdx = `---\n${yaml}\n---\n`;

  writeFileSync(join(outDir, `${slug}.md`), mdx, 'utf8');
  count++;
}

console.log(`Generated ${count} MDX files in ${outDir}/`);
