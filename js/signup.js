// Wait for the document to be ready before running any code
$(document).ready(function () {

    // ── Live Preview Updates ─────────────────────────

    // Update name in preview as user types
    $('#fullName').on('input', function () {
        const name = $(this).val().trim();
        $('#previewName').text(name !== '' ? name : 'Your Name');
        $('#previewAvatar').text(name !== '' ? name.charAt(0).toUpperCase() : '?');
    });

    // Update bio in preview as user types
    $('#bio').on('input', function () {
        const bio = $(this).val().trim();
        $('#previewBio').text(bio !== '' ? bio : 'Your bio will appear here...');
    });

    // Update interests as styled tags in preview as user types
    $('#interests').on('input', function () {
        const interestsInput = $(this).val();
        const tagsContainer = $('#previewInterests');
        tagsContainer.empty();

        // Split by comma and create a tag for each interest
        const tags = interestsInput.split(',');
        tags.forEach(function (tag) {
            const trimmed = tag.trim();
            if (trimmed !== '') {
                tagsContainer.append(
                    $('<span>').addClass('interest-tag').text(trimmed)
                );
            }
        });
    });

    // ── Validation Helper Functions ──────────────────

    // Show an error message on a field
    function showError(fieldId, message) {
        $('#' + fieldId).addClass('input-error');
        $('#' + fieldId + 'Error').text(message);
    }

    // Clear an error message on a field
    function clearError(fieldId) {
        $('#' + fieldId).removeClass('input-error');
        $('#' + fieldId + 'Error').text('');
    }

    // ── Real-Time Validation As User Types ───────────

    $('#fullName').on('input', function () {
        if ($(this).val().trim() === '') {
            showError('fullName', 'Full name is required.');
        } else {
            clearError('fullName');
        }
    });

    $('#studentNumber').on('input', function () {
        const value = $(this).val().trim();
        if (value === '') {
            showError('studentNumber', 'Student number is required.');
        } else if (!/^\d+$/.test(value)) {
            showError('studentNumber', 'Student number must be numeric only.');
        } else {
            clearError('studentNumber');
        }
    });

    $('#email').on('input', function () {
        const value = $(this).val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
            showError('email', 'Email address is required.');
        } else if (!emailPattern.test(value)) {
            showError('email', 'Please enter a valid email address.');
        } else {
            clearError('email');
        }
    });

    $('#password').on('input', function () {
        const value = $(this).val();
        if (value === '') {
            showError('password', 'Password is required.');
        } else if (value.length < 8) {
            showError('password', 'Password must be at least 8 characters.');
        } else {
            clearError('password');
        }
    });

    $('#confirmPassword').on('input', function () {
        const password = $('#password').val();
        const confirm = $(this).val();
        if (confirm === '') {
            showError('confirmPassword', 'Please confirm your password.');
        } else if (confirm !== password) {
            showError('confirmPassword', 'Passwords do not match.');
        } else {
            clearError('confirmPassword');
        }
    });

    $('#interests').on('input', function () {
        if ($(this).val().trim() === '') {
            showError('interests', 'Please enter at least one interest.');
        } else {
            clearError('interests');
        }
    });

    $('#bio').on('input', function () {
        if ($(this).val().trim() === '') {
            showError('bio', 'Please enter a short bio.');
        } else {
            clearError('bio');
        }
    });

    // ── Form Submission ──────────────────────────────

    $('#signupForm').on('submit', function (e) {
        // Prevent default browser form submission
        e.preventDefault();

        // Grab all field values
        const fullName = $('#fullName').val().trim();
        const studentNumber = $('#studentNumber').val().trim();
        const campus = $('#campus').val();
        const email = $('#email').val().trim();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const interests = $('#interests').val().trim();
        const bio = $('#bio').val().trim();

        // Track whether the form is valid
        let valid = true;

        // Validate each field
        if (fullName === '') {
            showError('fullName', 'Full name is required.');
            valid = false;
        }

        if (studentNumber === '') {
            showError('studentNumber', 'Student number is required.');
            valid = false;
        } else if (!/^\d+$/.test(studentNumber)) {
            showError('studentNumber', 'Student number must be numeric only.');
            valid = false;
        }

        if (campus === '') {
            showError('campus', 'Please select your campus.');
            valid = false;
        } else {
            clearError('campus');
        }

        if (email === '') {
            showError('email', 'Email address is required.');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email', 'Please enter a valid email address.');
            valid = false;
        }

        if (password === '') {
            showError('password', 'Password is required.');
            valid = false;
        } else if (password.length < 8) {
            showError('password', 'Password must be at least 8 characters.');
            valid = false;
        }

        if (confirmPassword === '') {
            showError('confirmPassword', 'Please confirm your password.');
            valid = false;
        } else if (confirmPassword !== password) {
            showError('confirmPassword', 'Passwords do not match.');
            valid = false;
        }

        if (interests === '') {
            showError('interests', 'Please enter at least one interest.');
            valid = false;
        }

        if (bio === '') {
            showError('bio', 'Please enter a short bio.');
            valid = false;
        }

        // Validate GitHub username
        const github = $('#github').val().trim();
        if (github === '') {
            showError('github', 'Please enter your GitHub username.');
            valid = false;
        } else {
            clearError('github');
        }

        // If all fields are valid save to localStorage and redirect
        if (valid) {
            const userData = {
                fullName: fullName,
                studentNumber: studentNumber,
                campus: campus,
                github: $('#github').val().trim(),
                email: email,
                interests: interests,
                bio: bio
            };

            // Show loading state on button
            const btn = $('button[type="submit"]');
            btn.text('Creating Account...').prop('disabled', true);

            // Save user data to localStorage
            localStorage.setItem('richfieldUser', JSON.stringify(userData));

            // Short delay so user sees the loading state
            setTimeout(function () {
                window.location.href = 'profile.html';
            }, 1500);
        }
    });

});