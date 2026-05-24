// ── Navigation Hover Animation (jQuery) ─────────────

$(document).ready(function () {

    // Animate nav links on hover using jQuery
    $('.nav-links a').on('mouseenter', function () {
        $(this).stop(true).animate({ opacity: 0.7 }, 150, function () {
            $(this).animate({ opacity: 1 }, 150);
        });
    });

});