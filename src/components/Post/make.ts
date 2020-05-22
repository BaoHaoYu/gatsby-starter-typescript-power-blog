import cn from 'classnames';
import cheerio from 'cheerio';

export function make(_mdContent: string) {
  // 清除空的P标签
  function cleanEmptyP(mdContent: string) {
    mdContent.replace(/<p>\s+<\/p>/g, '');
    return mdContent.replace(/<p>\s+<\/p>/g, '');
  }

  function addHrBeforeH(mdContent: string) {
    const $ = cheerio.load(mdContent, { decodeEntities: false });

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

  function makeBoxMd(mdContent: string) {
    return mdContent.replace(/{{&#x3C; boxmd >}}(.|\n)+?{{&#x3C; \/boxmd >}}/g, (v) => {
      return v
        .replace(/{{&#x3C; boxmd >}}/, `<div class="alert alert-box" role="alert" >`)
        .replace('{{&#x3C; /boxmd >}}', '</div>');
    });
  }

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
            const c = cn('codetab__link', {
              active: index === 0,
            });
            return `<button class='${c}'>${tab}</button>`;
          })
          .join('');
        tabsHeadHtml = `<div class="codetab__links">${tabsHeadHtml}</div>`;
        let tabsContentHtml = (codes.match(/{{&#x3C; code >}}(.|\n)+?{{&#x3C; \/code >}}/g) || [])
          .map((tab, index) => {
            const content = tab.replace(/{{&#x3C; code >}}/, '').replace(/{{&#x3C; \/code >}}/, '');
            const cl = cn('codetab__content', {
              active: index === 0,
            });
            return `<div class="${cl}"> ${content} </div>`;
          })
          .join('');
        tabsContentHtml = `<div class="tab-content">${tabsContentHtml}</div>`;
        return `<div class="code-tabs onlyCode">${tabsHeadHtml + tabsContentHtml}</div>`;
      },
    );
  }

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

  function makeLazy(mdContent: string) {
    const $ = cheerio.load(mdContent, { decodeEntities: false });

    $('img').each((_index, element) => {
      const src = $(element).attr('src');
      $(element)
        .attr('src', '')
        .attr('data-src', src || '')
        .addClass('lazyload');
    });

    return $.html();
  }

  // Notice
  _mdContent = makeNotice(_mdContent);
  // Alert
  _mdContent = makeAlert(_mdContent);
  // Tabs
  _mdContent = makeTabs(_mdContent);
  // Code
  _mdContent = makeCodeTabs(_mdContent);
  // Expand
  _mdContent = makeExpand(_mdContent);
  // BoxMd
  _mdContent = makeBoxMd(_mdContent);

  _mdContent = cleanEmptyP(_mdContent);

  _mdContent = makeLazy(_mdContent);
  // Add hr
  _mdContent = addHrBeforeH(_mdContent);

  return _mdContent;
}
