// Wait for document to be ready
$(document).ready(function () {

    // ── Navigation Hover Animation (jQuery) ─────────

    // Animate nav links on hover using jQuery
    $('.nav-links a').on('mouseenter', function () {
        $(this).stop(true).animate({ opacity: 0.7 }, 150, function () {
            $(this).animate({ opacity: 1 }, 150);
        });
    });

    // ── Typing Effect for Hero Heading ──────────────

    // Only run on the home page where the hero exists
    if ($('.hero h1').length) {

        const heading = $('.hero h1');

        // Type the plain text part only, keep the span
        const plainText = 'Welcome to ';
        const accentText = 'DevConnect';

        // Start empty
        heading.html('');

        let index = 0;

        // Type the plain text first
        function typePlain() {
            if (index < plainText.length) {
                heading.html(plainText.substring(0, index + 1));
                index++;
                setTimeout(typePlain, 80);
            } else {
                // Then type the accent text
                index = 0;
                typeAccent();
            }
        }

        // Then type DevConnect in accent colour
        function typeAccent() {
            if (index < accentText.length) {
                heading.html(
                    plainText +
                    '<span class="hero-accent">' +
                    accentText.substring(0, index + 1) +
                    '</span>'
                );
                index++;
                setTimeout(typeAccent, 80);
            }
        }

        // Start after delay
        setTimeout(typePlain, 800);
    }

    // ── Scroll Reveal Animation ──────────────────────

    // Hide all cards initially
    $('.feature-card, .about-card, .detail-section').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'opacity 0.8s ease, transform 0.8s ease'
    });

    // Reveal cards with a stagger delay
    function checkReveal() {
        $('.feature-card, .about-card, .detail-section').each(function (index) {
            const elementTop = $(this).offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();

            if (elementTop < viewportBottom - 30) {
                const self = $(this);
                // Stagger each card by 200ms
                setTimeout(function () {
                    self.css({
                        'opacity': '1',
                        'transform': 'translateY(0)'
                    });
                }, index * 200);
            }
        });
    }

    // Run on scroll and on page load
    $(window).on('scroll', checkReveal);
    setTimeout(checkReveal, 300);

// ── Hamburger Menu ───────────────────────────────

    // Toggle nav links when hamburger is clicked
    $('#hamburger').on('click', function () {
        $('#navLinks').toggleClass('nav-open');
        $(this).text($(this).text() === '☰' ? '✕' : '☰');
    });

    // Close menu when a link is clicked
    $('#navLinks a').on('click', function () {
        $('#navLinks').removeClass('nav-open');
        $('#hamburger').text('☰');
    });

});