export const categorizePosts = (posts) => {
    return posts.reduce((categories, post) => {
        if (post && post.slug) {
            const category = post.slug.split("-")[0];
            (categories[category] = categories[category] || []).push(post);
        }
        return categories;
    }, {});
};
