import cn from 'classnames';
import cheerio from 'cheerio';
import he from 'he';

export function makeHtml(_mdContent: string) {
  // 清除空的P标签
  function cleanEmptyP(mdContent: string) {
    return mdContent.replace(/<p>(\s+)?<\/p>/g, '');
  }

  // 添加下划线
  function addHrBeforeH(mdContent: string) {
    const $ = cheerio.load(mdContent);

    $('h2,h3,h4,h5,h6').each((index, el) => {
      if (index !== 0) {
        $(el).before('<hr />');
      }
    });
    $('.tab-content__pane').each((_i, el) => {
      $(el).children('h2,h3,h4,h5,h6').eq(0).prev('hr').remove();
    });
    $('.collapse').each((_i, el) => {
      $(el).find('h2,h3,h4,h5,h6').eq(0).prev('hr').remove();
    });
    return $.html();
  }

  // 可以使用markdown语法的盒子
  function makeBoxMd(mdContent: string) {
    return mdContent.replace(/{{&#x3C; box(md|Md) >}}(.|\n)+?{{&#x3C; \/box(md|Md) >}}/g, (v) => {
      return v
        .replace(/{{&#x3C; box(md|Md) >}}/, `<div class="alert alert--box" role="alert" >`)
        .replace(/{{&#x3C; \/box(md|Md) >}}/, '</div>');
    });
  }

  // 简单的盒子，markdown语法不会被转换
  function makeBoxSimple(mdContent: string) {
    return mdContent.replace(/{{&#x3C; box >}}(.|\n)+?{{&#x3C; \/box >}}/g, (v) => {
      const content = v.replace(/{{&#x3C; box >}}\n?/, '').replace(/\n?{{&#x3C; \/box >}}/, '');
      return '<div class="alert alert--box" role="alert" >' + he.encode(content) + '</div>';
    });
  }

  // 展开收起内容
  function makeExpand(mdContent: string) {
    return mdContent.replace(/{{&#x3C; expand ".+?" >}}(.|\n)+?{{&#x3C; \/expand >}}/g, (v) => {
      const expandTitle = (v.match(/{{&#x3C; expand ".+?" >}}/) || [''])[0]
        .replace(/{{&#x3C; expand "/, '')
        .replace(/" >}}/, '');

      const expandContent = v
        .replace(/{{&#x3C; expand ".+?" >}}/, ``)
        .replace('{{&#x3C; /expand >}}', '');
      return `<div class="collapse">
            <a class="collapse__toggle">
              ${expandTitle} <i class="ml-auto ti-minus"> </i>
            </a>
            <div class="collapse__content">
              <div>${expandContent}</div>
            </div>    
        </div>`;
    });
  }

  // 代码tab切换
  function makeCodeTabs(mdContent: string) {
    return mdContent.replace(
      /(<p>)?{{&#x3C; codes .+? >}}(.|\n)+?{{&#x3C; \/codes >}}(<\/p>)?/g,
      (codes) => {
        // 语言种类
        const codeTabs = (codes.match(/{{&#x3C; codes .+? >}}/) || [''])[0]
          .replace(/{{&#x3C; codes /, '')
          .replace(/ >}}/, '')
          .split(' ');

        let tabsHeadHtml = codeTabs
          .map((tab, index) => {
            const c = cn('codeTabs__link', {
              'codeTabs__link--active': index === 0,
            });
            return `<button class='${c}'>${tab}</button>`;
          })
          .join('');
        tabsHeadHtml = `<div>${tabsHeadHtml}</div>`;
        let tabsContentHtml = (codes.match(/{{&#x3C; code >}}(.|\n)+?{{&#x3C; \/code >}}/g) || [])
          .map((tab, index) => {
            const content = tab.replace(/{{&#x3C; code >}}/, '').replace(/{{&#x3C; \/code >}}/, '');
            const cl = cn('tab-content__pane', {
              'tab-content__pane--active': index === 0,
            });
            return `<div class="${cl}"> ${content} </div>`;
          })
          .join('');
        tabsContentHtml = `<div class="tab-content">${tabsContentHtml}</div>`;
        return `<div class="codeTabs codeTabs--onlyCode">${tabsHeadHtml + tabsContentHtml}</div>`;
      },
    );
  }

  // tab切换
  function makeTabs(mdContent: string) {
    return mdContent.replace(/{{&#x3C; tabs .+? >}}(.|\n)+?{{&#x3C; \/tabs >}}/g, (v) => {
      const tabs = (v.match(/{{&#x3C; tabs .+? >}}/) || [''])[0]
        .replace(/{{&#x3C; tabs /, '')
        .replace(/ >}}/, '')
        .split(' ');

      let tabsHeadHtml = tabs
        .map((tab, index) => {
          const cl = cn('nav__item', {
            'nav__item--active': index === 0,
          });
          return `<li class='${cl}'><a class="nav__link">${tab}</a></li>`;
        })
        .join('');
      tabsHeadHtml = `<ul class="nav">${tabsHeadHtml}</ul>`;
      let tabsContentHtml = (v.match(/{{&#x3C; tab >}}(.|\n)+?{{&#x3C; \/tab >}}/g) || [])
        .map((tab, index) => {
          const content = tab.replace('{{&#x3C; tab >}}', '').replace('{{&#x3C; /tab >}}', '');
          return `<div class="${cn('tab-content__pane', {
            'tab-content__pane--active': index === 0,
          })}"> ${content} </div>`;
        })
        .join('');
      tabsContentHtml = `<div class="tab-content">${tabsContentHtml}</div>`;
      return `<div class="code-tabs">${tabsHeadHtml + tabsContentHtml}</div>`;
    });
  }

  // 弹出提示框，类似盒子，样式不用而已
  function makeAlert(mdContent: string) {
    return mdContent.replace(/{{&#x3C; alert theme=".+?" >}}(.|\n)+?{{&#x3C; \/alert >}}/g, (v) => {
      const cl = (v.match(/{{&#x3C; alert theme=".+?" >}}/) || [''])[0]
        .replace(/{{&#x3C; alert theme="/, '')
        .replace(/" >}}/, '');
      return v
        .replace(
          /{{&#x3C; alert theme=".+?" >}}/,
          `<div class="alert alert--${cl}" role="alert" data-dir="ltr">`,
        )
        .replace('{{&#x3C; /alert >}}', '</div>');
    });
  }

  // 注意事项
  function makeNotice(mdContent: string) {
    return mdContent.replace(/{{&#x3C; notice .+? >}}(.|\n)+?{{&#x3C; \/notice >}}/g, (v) => {
      const cl = (v.match(/{{&#x3C; notice .+? >}}/) || [''])[0]
        .replace(/{{&#x3C; notice /, '')
        .replace(/ >}}/, '');
      return v
        .replace(/{{&#x3C; notice .+? >}}/, `<div class="notices notices--${cl}">`)
        .replace('{{&#x3C; /notice >}}', '</div>');
    });
  }

  // 图片懒加载
  function addImageLazy(mdContent: string) {
    const $ = cheerio.load(mdContent);

    $('img').each((_index, element) => {
      const src = $(element).attr('src');
      $(element)
        .attr('src', '')
        .attr('data-src', src || '')
        .addClass('lazyload');
    });

    return $.html();
  }

  // 代码加入行号
  function addLineNumber(mdContent: string) {
    const $ = cheerio.load(mdContent);

    $('pre > code').each((_index, el) => {
      const codeContent = $(el).html();
      const codeLine = codeContent?.split('\n') || [];

      let lineNumber = codeLine.map((_v) => `<span></span>`).join('');
      lineNumber = `<code class="index">${lineNumber}</code>`;

      $(el).parent().prepend(lineNumber);
    });

    return $.html();
  }

  _mdContent = makeNotice(_mdContent);
  _mdContent = makeAlert(_mdContent);
  _mdContent = makeTabs(_mdContent);
  _mdContent = makeCodeTabs(_mdContent);
  _mdContent = makeExpand(_mdContent);
  _mdContent = makeBoxMd(_mdContent);
  _mdContent = makeBoxSimple(_mdContent);
  _mdContent = addImageLazy(_mdContent);
  _mdContent = addLineNumber(_mdContent);
  _mdContent = addHrBeforeH(_mdContent);
  _mdContent = cleanEmptyP(_mdContent);

  return _mdContent;
}
