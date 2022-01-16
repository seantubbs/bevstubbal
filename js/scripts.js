$(document).ready(function () {

  'use strict'

  // WOW
  var wow = new WOW(
  {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       false,       // true
    live:         false        // true
  });
  wow.init();

  // Loading heavy images with placeholder first
  var placeholder = document.querySelector('.js-header-background');
  // 1: load small image and show it
  var img = new Image();
  img.src = placeholder.dataset.small;
  img.onload = function () {
    placeholder.style.backgroundImage = "url('" + placeholder.dataset.small + "')";
  };
  // 2: load large image
  var imgLarge = new Image();
  var newBackground = document.createElement("div");
  imgLarge.src = placeholder.dataset.large;
  imgLarge.onload = function (event) {
    placeholder.classList.add('page-header__background--is-loaded');
    newBackground.style.backgroundImage = "url('" + placeholder.dataset.large + "')";
    placeholder.appendChild(newBackground);
  };

  // lightGallery inicialization
  if (document.getElementById('lightgallery')) {
     $("#lightgallery").lightGallery();
  }

  // Main nav menu actions
  var toggleMenu = function() {
    $('.js-page-header').toggleClass("page-header--is-shown");
    $('.js-mobile-menu-btn .icon-bar').toggleClass("icon-bar--is-toggled");
    $('.js-page-header__brand').toggleClass("page-header__brand--is-hidden");
  }

  $(".js-mobile-menu-btn").on('click', function () {
    toggleMenu();
  });

  // Countdown timer
  var currTime = new Date();
  var currDate = currTime.getDate();
  var currMonth = currTime.getMonth();
  var currYear = currTime.getFullYear();
  var eventTime = "2022/06/11 15:00:00";

  $('#countdown').countdown(eventTime, function(event) {
    $(this).html(event.strftime(''
      + '<span class="timer__item">%D<span class="timer__item-caption">days</span></span>'
      + '<span class="timer__item">%H<span class="timer__item-caption">hours</span></span>'
      + '<span class="timer__item">%M<span class="timer__item-caption">min</span></span>'
      + '<span class="timer__item">%S<span class="timer__item-caption">sec</span></span>'));
  });

  // Video
  var toggleVideo = function(){

    var video = document.querySelector('#video');
    $('.js-video__play').toggleClass('video-block__play--is-playing');
    $('.js-video-block-poster').toggleClass('video-block__poster--is-hidden');

    video.addEventListener('ended', function(e){
      video.load();
      $('.js-video__play').removeClass('video-block__play--is-playing');
      $('.js-video-block-poster').removeClass('video-block__poster--is-hidden');
    });

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  $('.js-video__play').on('click', function(){
    toggleVideo();
  });

  // Audio player
  // Setup the player to autoplay the next track
  if (document.querySelector('#tracklist')) {
    var a = audiojs.createAll({
        trackEnded: function() {
            var next = $('#tracklist li.playing').next();
            if (!next.length) next = $('#tracklist li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
        }
    });

    // Calculating track duration
    var trackList = document.querySelector('#tracklist');
    var tracks = Array.prototype.slice.call(trackList.querySelectorAll('a'));
    tracks.forEach(function(item){
      var trackSrc = item.dataset.src;
      var tempAudio = document.createElement("AUDIO");
      tempAudio.src = trackSrc;
      tempAudio.addEventListener('loadedmetadata', function(e){
        var trackTimeMin = Math.floor(tempAudio.duration / 60);
        var trackTimeSec = Math.floor(tempAudio.duration - trackTimeMin * 60);
        item.querySelector('.js-track-time').innerHTML =  trackTimeMin + ':' + trackTimeSec;
      });
    })

    // Load in the first track
    var audio = a[0];
    var beforeChange = 0.2;

    var first = $('#tracklist a').attr('data-src');
    $('#tracklist li').first().addClass('playing');
    audio.load(first);
    audio.pause();

    // Load in a track on click
    $('#tracklist').on('click', 'li', function(e) {
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        audio.load($('a', this).attr('data-src'));
        audio.play();
    });

    // Play next or prev
    $('.play-next').on('click', function(e) {
      var next = $('li.playing').next();
      if (!next.length) next = $('#tracklist li').first();
      next.click();
    });

    $('.play-prev').on('click', function(e) {
      var prev = $('li.playing').prev();
      if (!prev.length) prev = $('#tracklist li').last();
      prev.click();
    });

    $('.volume-icon').on('click', function(){
      if (audio.element.volume === 0){
        audio.element.volume = beforeChange || 0.1;
        $(this).toggleClass('volume-icon--mute');
      } else {
        audio.element.volume = 0;
        $(this).attr('data-volume-icon','f027');
        $(this).toggleClass('volume-icon--mute');
      }
    });

    $('.volume-slider').slider({
      value  : 20,
      step   : 1,
      range  : 'min',
      min    : 0,
      max    : 100,
      change : function(){
          var value = $(".volume-slider").slider("value");
          audio.element.volume = (value / 100);
          beforeChange = audio.element.volume;
          if (value === 0 && !$('.volume-icon').hasClass('volume-icon--mute')){
            $('.volume-icon').addClass('volume-icon--mute');
          } else if (value > 0) {
            $('.volume-icon').removeClass('volume-icon--mute');
          }
      },
      slide : function(){
          var value = $(".volume-slider").slider("value");
          audio.element.volume = (value / 100);
          beforeChange = audio.element.volume;
          if (value === 0 && !$('.volume-icon').hasClass('volume-icon--mute')){
            $('.volume-icon').addClass('volume-icon--mute');
          } else if (value > 0) {
            $('.volume-icon').removeClass('volume-icon--mute');
          }
      }
    });

  }

  //smooth scrolling
  $('a[href*="#"]:not([href="#"])').on('click', function (e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      toggleMobileMenu();
      if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  var toggleMobileMenu = function () {
      if ($(window).width() < 768) {
          $('.menu-collapsed').toggleClass("menu-expanded");
      }
  };

  // Ticket card mouseover effect
  var screenWidth = window.screen.width / 2,
    screenHeight = window.screen.height / 2,
    elem = $('.js-ticket'),
    perspective = 'perspective(700px)';

  elem.on('mousemove', function (e) {
    var centroX   = e.clientX - screenWidth,
      centroY   = screenHeight - e.clientY,
      degX   = centroX * 0.02,
      degY   = centroY * 0.02;
    $(e.currentTarget).css({
      '-webkit-transform' : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
      '-moz-transform'    : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
      '-ms-transform'     : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
      '-o-transform'      : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
      'transform'         : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)'
    });
  });

  // Tabs in conference
  // Not proper event delegation, but this method from official Bootstrap docs
  $('.js-tabs-block a').on('click', function(e) {
    e.preventDefault();
    $(this).tab('show');
  });

  // Ajax for register form
  $('#register-form').submit(function () {
      var name = $('input[name="username"]').val();
      var email = $('input[name="email"]').val();
      var message = $('input[name="phone"]').val();

      var formData = {
          name: name,
          email: email,
          message: message
      };

      $.ajax({
        type: "POST",
        url: '/comment.php',
        data: formData,
        success: function() {
          $('#form-submit-errors').text("Success!");
        },
        error: function() {
          $('#form-submit-errors').text("Something went wrong...");
        }
      });

      return false;
  });
});
