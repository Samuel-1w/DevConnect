// Wait for document to be ready
$(document).ready(function () {

    // ── Load User Data ───────────────────────────────

    const userData = JSON.parse(localStorage.getItem('richfieldUser'));

    // If no user is logged in, redirect to signup
    if (!userData) {
        window.location.href = 'signup.html';
        return;
    }

    // ── Load Existing Posts from localStorage ────────

    let posts = JSON.parse(localStorage.getItem('richfieldPosts')) || [];

    // ── Character Counter ────────────────────────────
    $('#postContent').on('input', function () {
        const length = $(this).val().length;
        $('#charCounter').text(length + ' / 280');

        // Turn counter red if over limit
        if (length > 280) {
            $('#charCounter').css('color', '#CC0000');
        } else {
            $('#charCounter').css('color', 'var(--text-light)');
        }
    });

     renderAllPosts();

    // ── Submit New Post ──────────────────────────────

    $('#submitPost').on('click', function () {
        const content = $('#postContent').val().trim();

        // Validate post content
        if (content === '') {
            $('#postContent').addClass('input-error');
            $('#postError').text('Please write something before posting.');
            return;
        } else if (content.length > 280) {
            $('#postContent').addClass('input-error');
            $('#postError').text('Post cannot exceed 280 characters.');
            return;
        }

        // Clear any error
        $('#postContent').removeClass('input-error');
        $('#postError').text('');

        // Create new post object
        const newPost = {
            id: Date.now(),
            author: userData.fullName,
            content: content,
            timestamp: new Date().toLocaleString(),
            likes: 0,
            liked: false
        };

        // Add to posts array and save to localStorage
        posts.unshift(newPost);
        savePosts();

        // Clear the textarea
        $('#postContent').val('');

        // Render the new post at the top with fade-in
        renderSinglePost(newPost, true);

        // Remove empty feed message if present
        $('.empty-feed').remove();
    });

    // ── Render All Posts on Page Load ────────────────

    function renderAllPosts() {
        $('#postsContainer').empty();

        if (posts.length === 0) {
            $('#postsContainer').append(
                $('<div>').addClass('empty-feed').html(
                    '<p>No posts yet. Be the first to share something!</p>'
                )
            );
            return;
        }

        posts.forEach(function (post) {
            renderSinglePost(post, false);
        });
    }
    
    // ── Render a Single Post Card ────────────────────

    function renderSinglePost(post, isNew) {
        const avatar = post.author.charAt(0).toUpperCase();
        const likedClass = post.liked ? 'liked' : '';

        // Build the post card HTML
        const postCard = $('<div>')
            .addClass('post-card')
            .attr('data-id', post.id)
            .html(`
                <div class="post-header">
                    <div class="post-author">
                        <div class="post-avatar">${avatar}</div>
                        <div class="post-author-info">
                            <h4>${post.author}</h4>
                            <span class="post-timestamp">${post.timestamp}</span>
                        </div>
                    </div>
                </div>
                <p class="post-content">${post.content}</p>
                <div class="post-actions">
                    <button class="btn-like ${likedClass}">
                        ♥ Like
                    </button>
                    <span class="like-count">${post.likes} 
                        ${post.likes === 1 ? 'like' : 'likes'}
                    </span>
                    <button class="btn-delete">Delete</button>
                </div>
            `);

        // Add to container
        if (isNew) {
            $('#postsContainer').prepend(postCard);
        } else {
            $('#postsContainer').append(postCard);
        }

        // Fade in the post using jQuery
        postCard.fadeIn(500);

        // ── Like Button ──────────────────────────────
        postCard.find('.btn-like').on('click', function () {
            const postId = postCard.attr('data-id');
            const postIndex = posts.findIndex(p => p.id == postId);

            if (postIndex !== -1) {
                // Toggle liked state
                posts[postIndex].liked = !posts[postIndex].liked;
                posts[postIndex].likes += posts[postIndex].liked ? 1 : -1;
                savePosts();

                // Update the button and counter
                const btn = $(this);
                btn.toggleClass('liked');
                const newCount = posts[postIndex].likes;
                btn.siblings('.like-count').text(
                    newCount + (newCount === 1 ? ' like' : ' likes')
                );
            }
        });

        // ── Delete Button ────────────────────────────
        postCard.find('.btn-delete').on('click', function () {
            const postId = postCard.attr('data-id');

            // Confirmation before deleting
            const confirmed = confirm(
                'Are you sure you want to delete this post?'
            );

            if (confirmed) {
                // Remove from posts array and save
                posts = posts.filter(p => p.id != postId);
                savePosts();

                // Remove from DOM
                postCard.fadeOut(300, function () {
                    $(this).remove();

                    // Show empty message if no posts left
                    if (posts.length === 0) {
                        $('#postsContainer').append(
                            $('<div>').addClass('empty-feed').html(
                                '<p>No posts yet. Be the first to share something!</p>'
                            )
                        );
                    }
                });
            }
        });
    }

    // ── Save Posts to localStorage ───────────────────

    function savePosts() {
        localStorage.setItem('richfieldPosts', JSON.stringify(posts));
    }

});