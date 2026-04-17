import instaloader

try:
    L = instaloader.Instaloader()
    post = instaloader.Post.from_shortcode(L.context, 'C8qLz3kS5S5')
    comments = []
    for c in post.get_comments():
        comments.append(c.text)
        if len(comments) > 5:
            break
    print(comments)
except Exception as e:
    print(f"Error: {e}")
