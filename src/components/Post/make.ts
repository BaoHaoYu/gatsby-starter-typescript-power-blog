import he from 'he';
import $ from 'jquery';
import cn from 'classnames';

export function make(_mdContent: string) {
  _mdContent = he.decode('<div>' + _mdContent + '</div>');
  // 清除空的P标签
  function cleanEmptyP(mdContent: string) {
    const $md = $(mdContent);
    $md.find('p').each((_index, el) => {
      if (/^\s+$/.test($(el).text()) || $(el).text() === '') {
        $(el).remove();
      }
    });
    return $md.prop('outerHTML');
  }

  function addHrBeforeH(mdContent: string) {
    const $md = $(mdContent);
    $md.find('h2,h3,h4,h5,h6').each((index, el) => {
      if (index !== 0) {
        $(el).before('<hr />');
      }
    });
    $md.find('.tab-content__pane').each((_i, el) => {
      $(el).children('h2,h3,h4,h5,h6').eq(0).prev('hr').remove();
    });
    $md.find('.collapse').each((_i, el) => {
      $(el).find('h2,h3,h4,h5,h6').eq(0).prev('hr').remove();
    });
    return $md.prop('outerHTML');
  }

  function makeBoxMd(mdContent: string) {
    return mdContent.replace(/{{< boxmd >}}(.|\n)+?{{< \/boxmd >}}/g, (v) => {
      return v
        .replace(/{{< boxmd >}}/, `<div class="alert alert-box" role="alert" >`)
        .replace('{{< /boxmd >}}', '</div>');
    });
  }

  function makeExpand(mdContent: string) {
    return mdContent.replace(/{{< expand ".+?" >}}(.|\n)+?{{< \/expand >}}/g, (v) => {
      const expandTitle = (v.match(/{{< expand ".+?" >}}/) || [''])[0]
        .replace(/{{< expand "/, '')
        .replace(/" >}}/, '');

      const expandContent = v.replace(/{{< expand ".+?" >}}/, ``).replace('{{< /expand >}}', '');
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
    return mdContent.replace(/(<p>)?{{< codes .+? >}}(.|\n)+?{{< \/codes >}}(<\/p>)?/g, (codes) => {
      // 语言种类
      const codeTabs = (codes.match(/{{< codes .+? >}}/) || [''])[0]
        .replace(/{{< codes /, '')
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
      let tabsContentHtml = (codes.match(/{{< code >}}(.|\n)+?{{< \/code >}}/g) || [])
        .map((tab, index) => {
          const content = tab.replace(/{{< code >}}/, '').replace(/{{< \/code >}}/, '');
          const cl = cn('codetab__content', {
            active: index === 0,
          });
          return `<div class="${cl}"> ${content} </div>`;
        })
        .join('');
      tabsContentHtml = `<div class="tab-content">${tabsContentHtml}</div>`;
      return `<div class="code-tabs onlyCode">${tabsHeadHtml + tabsContentHtml}</div>`;
    });
  }

  function makeTabs(mdContent: string) {
    return mdContent.replace(/{{< tabs .+? >}}(.|\n)+?{{< \/tabs >}}/g, (v) => {
      const tabs = (v.match(/{{< tabs .+? >}}/) || [''])[0]
        .replace(/{{< tabs /, '')
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
      let tabsContentHtml = (v.match(/{{< tab >}}(.|\n)+?{{< \/tab >}}/g) || [])
        .map((tab, index) => {
          const content = tab.replace('{{< tab >}}', '').replace('{{< /tab >}}', '');
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
    return mdContent.replace(/{{< alert theme=".+?" >}}(.|\n)+?{{< \/alert >}}/g, (v) => {
      const cl = (v.match(/{{< alert theme=".+?" >}}/) || [''])[0]
        .replace(/{{< alert theme="/, '')
        .replace(/" >}}/, '');
      return v
        .replace(
          /{{< alert theme=".+?" >}}/,
          `<div class="alert alert--${cl}" role="alert" data-dir="ltr">`,
        )
        .replace('{{< /alert >}}', '</div>');
    });
  }

  function makeNotice(mdContent: string) {
    return mdContent.replace(/{{< notice .+? >}}(.|\n)+?{{< \/notice >}}/g, (v) => {
      const cl = (v.match(/{{< notice .+? >}}/) || [''])[0]
        .replace(/{{< notice /, '')
        .replace(/ >}}/, '');
      return v
        .replace(/{{< notice .+? >}}/, `<div class="notices notices--${cl}">`)
        .replace('{{< /notice >}}', '</div>');
    });
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
  // Add hr
  _mdContent = addHrBeforeH(_mdContent);
  //
  _mdContent = cleanEmptyP(_mdContent);

  return $(_mdContent).html();
}
