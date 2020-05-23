import PhotoSwipe from 'photoswipe';
import $ from 'jquery';
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default';

const galleryHtml = `
<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div id="gallery" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

        <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button class="pswp__button pswp__button--share" title="Share"></button>

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                <!-- element will get class pswp__preloader--active when preloader is running -->
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div> 
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>

</div>
`;

export function imageGallery($images: JQuery<HTMLImageElement>) {
  const photoSwipeItems: PhotoSwipe.Item[] = [];
  const images: HTMLImageElement[] = [];

  if (!document.getElementById('gallery')) {
    $('body').append(galleryHtml);
  }

  $images
    .each((_i, el) => {
      photoSwipeItems.push({
        src: $(el).attr('data-src') || $(el).attr('src'),
        w: 0,
        h: 0,
      });

      images.push(el);
    })
    .on('click', (e) => {
      const gallery = new PhotoSwipe(
        document.getElementById('gallery')!,
        PhotoSwipeUI,
        photoSwipeItems,
        {
          index: images.indexOf(e.target),
        },
      );
      gallery.listen(
        'imageLoadComplete',
        (_index, item: PhotoSwipe.Item & { container: HTMLElement }) => {
          if (item.h! < 1 || item.w! < 1) {
            const img = new Image();
            img.onload = () => {
              item.w = img.width;
              item.h = img.height;
              gallery.invalidateCurrItems();
              gallery.updateSize(true);
            };
            img.src = photoSwipeItems[_index].src || '';
          }
        },
      );

      gallery.init();
    });
}
