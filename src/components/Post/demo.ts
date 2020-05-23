import Prism from 'prismjs';
import he from 'he';
import cheerio from 'cheerio';

import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-shell-session';

export function makePrism(mdContent: string): string {
  const $ = cheerio.load(mdContent, { decodeEntities: false });

  const $code = $('pre code');
  if (!$code.length) return mdContent;

  function build(selector: Cheerio, language: string) {
    const $el = $(selector);
    // 语言存在
    const hasLanguage = !!Prism.languages[language];
    $el.addClass('language-' + language);
    const code = he.decode($el.find('code').html() || '');

    $el.empty();

    let html = hasLanguage ? Prism.highlight(code, Prism.languages[language], language) : code;

    const lineNumberSpan = html
      .split('\n')
      .map((_v, i) => `<span >${i + 1}</span>`)
      .join('\n');

    html = html
      .split('\n')
      .map((v) => `<span class="code-line">${v}</span>`)
      .join('\n');

    const lineNumberCode = `<code class="index">${lineNumberSpan}</code>`;

    $el.append(lineNumberCode + `<code class="language-${language}">${html}</code>`);
  }

  $code.each((_i, code) => {
    build($(code).parent(), ($(code).attr('class') || '').replace('language-', ''));
  });

  return $.html() || '';
}
