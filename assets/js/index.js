/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        var audioKeyName = 'audioDeathNotes',
            playAudio = !sessionStorage.getItem( audioKeyName );

         // audio stuff ref: http://codepen.io/alexerlandsson/pen/JoQaQO
        $(function() {

            var audio = $("audio")[0];

            if (audio) {

                if (!playAudio) {
                    audio.pause();
                    $('#btn-mute').children('i').removeClass('fa-pause');
                    $('#btn-mute').children('i').addClass('fa-play');
                }

                $('#btn-mute').on('click', function() {
                    //Play/pause the track
                    if (audio.paused == false) {
                        audio.pause();
                        $(this).children('i').removeClass('fa-pause');
                        $(this).children('i').addClass('fa-play');
                        sessionStorage.setItem(audioKeyName, 'true');
                    } else {
                        audio.play();
                        $(this).children('i').removeClass('fa-play');
                        $(this).children('i').addClass('fa-pause');
                        sessionStorage.removeItem(audioKeyName);
                    }
                });

                // $('#btn-stop').on('click', function() {
                //     //Stop the track
                //     audio.pause();
                //     audio.currentTime = 0;
                //     $('#btn-play-pause').children('i').removeClass('fa-pause');
                //     $('#btn-play-pause').children('i').addClass('fa-play');
                // });

                // $('#btn-mute').on('click', function() {
                //     //Mutes/unmutes the sound
                //     if(audio.volume != 0) {
                //         audio.volume = 0;
                //         $(this).children('i').removeClass('fa-volume-off');
                //         $(this).children('i').addClass('fa-volume-up');
                //     } else {
                //         audio.volume = 1;
                //         $(this).children('i').removeClass('fa-volume-up');
                //         $(this).children('i').addClass('fa-volume-off');
                //     }
                // });

                function updateProgress() {
                    //Updates the progress bar
                    var progress = document.getElementById("progress");
                    var value = 0;
                    if (audio.currentTime > 0) {
                        value = Math.floor((100 / audio.duration) * audio.currentTime);
                    }
                    progress.style.width = value + "%";
                }

                //Progress Bar event listener
                audio.addEventListener("timeupdate", updateProgress, false);
            }
        });



    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
