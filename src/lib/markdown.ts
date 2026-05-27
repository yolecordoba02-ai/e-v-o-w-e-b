import { marked } from 'marked';

export function renderMarkdown(content: string): string {
  return marked.parse(content, { mangle: false, headerIds: false });
}
