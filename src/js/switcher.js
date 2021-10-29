$(document).ready(function () {
  //  Pages switcher
  $('body').prepend('<div class="pages-switcher"><span class="pages-switcher__header">Pages Selector</span><span class="pages-switcher__control"></span></div>');
  var markup= '<div class="pages-switcher__list">';
        markup += '<div class="pages-switcher__block"><span class="pages-switcher__block-heading">Concert</span>';
          markup += '<a class="pages-switcher__link" href="concert-dark.html"><figure class="pages-switcher__image"><img src="preview-files/1.png"></figure>In dark colors</a>';
          markup += '<a class="pages-switcher__link" href="concert-light.html"><figure class="pages-switcher__image"><img class="pages-switcher__image" src="preview-files/2.png"></figure>In light colors</a>';
        markup += '</div>';
        markup += '<div class="pages-switcher__block"><span class="pages-switcher__block-heading">Conference</span>';
          markup += '<a class="pages-switcher__link" href="conf-dark.html"><figure class="pages-switcher__image"><img class="pages-switcher__image" src="preview-files/3.png"></figure>In dark colors</a>';
          markup += '<a class="pages-switcher__link" href="conf-light.html"><figure class="pages-switcher__image"><img class="pages-switcher__image" src="preview-files/4.png"></figure>In light colors</a>';
        markup += '</div>';
        markup += '<div class="pages-switcher__block"><span class="pages-switcher__block-heading">Festival</span>';
          markup += '<a class="pages-switcher__link" href="fest-dark.html"><figure class="pages-switcher__image"><img class="pages-switcher__image" src="preview-files/5.png"></figure>In dark colors</a>';
          markup += '<a class="pages-switcher__link" href="fest-light.html"><figure class="pages-switcher__image"><img class="pages-switcher__image" src="preview-files/6.png"></figure>In light colors</a>';
        markup += '</div>';
      markup += '</div>';


  $('.pages-switcher').append(markup);

  $('.pages-switcher__control').on('click', function(e){
    e.preventDefault();
    $('.pages-switcher').toggleClass('pages-switcher--is-active');
  });
});
