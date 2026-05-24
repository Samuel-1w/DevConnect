// Wait for document to be ready
$(document).ready(function () {

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('richfieldUser'));

    // If no user data found, redirect back to signup
    if (!userData) {
        window.location.href = 'signup.html';
        return;
    }

    // ── Populate Profile Card ────────────────────────

    // Set avatar to first letter of name
    $('#profileAvatar').text(userData.fullName.charAt(0).toUpperCase());

    // Set name, campus, email
    $('#profileName').text(userData.fullName);
    $('#profileLevel').text(userData.campus + ' Developer');
    $('#profileGithub').attr('href', 'https://github.com/' + userData.github);
    $('#profileGithub').text('github.com/' + userData.github);
    $('#infoGithub').text(userData.github);
    $('#profileEmail').text(userData.email);

    // Set interests as small tags in profile card
    const interestTags = $('#profileInterests');
    userData.interests.split(',').forEach(function (tag) {
        const trimmed = tag.trim();
        if (trimmed !== '') {
            interestTags.append(
                $('<span>').addClass('interest-tag').text(trimmed)
            );
        }
    });

    // ── Populate Profile Details ─────────────────────

    $('#profileBio').text(userData.bio);
    $('#infoName').text(userData.fullName);
    $('#infoStudentNumber').text(userData.studentNumber);
    $('#infoCampus').text(userData.campus);
    $('#infoEmail').text(userData.email);

    // Set interests as large tags in details section
    const interestsLarge = $('#profileInterestsLarge');
    userData.interests.split(',').forEach(function (tag) {
        const trimmed = tag.trim();
        if (trimmed !== '') {
            interestsLarge.append(
                $('<span>').addClass('interest-tag').text(trimmed)
            );
        }
    });

    // ── Slide Toggle for Section Headers (jQuery) ────
    $('.section-toggle').on('click', function () {
        $(this).next('.section-content').slideToggle(300);
        // Rotate the arrow indicator
        const arrow = $(this).find('span');
        arrow.text(arrow.text() === '▼' ? '▲' : '▼');
    });

});