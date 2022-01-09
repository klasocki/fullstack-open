const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((s, blog) => s + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = null
    blogs.forEach((blog) => {
        if (!favorite || favorite.likes < blog.likes) {
            favorite = blog
        }
    })
    return favorite
}

function findTopAuthor(counts) {
    let favorite = null
    let max = 0
    for (const [key, value] of Object.entries(counts)) {
        if (value > max) {
            max = value
            favorite = key
        }
    }

    return {
        author: favorite,
        num: max
    }
}

const mostBlogs = (blogs) => {
    const counts = {};

    blogs.forEach(blog => {
        counts[blog.author] = counts[blog.author] ? counts[blog.author] + 1 : 1;
    })
    const top = findTopAuthor(counts);
    return {
        author: top.author,
        blogs: top.num
    }
}

const mostLikes = (blogs) => {
    const counts = {};

    blogs.forEach(blog => {
        counts[blog.author] = counts[blog.author] ? counts[blog.author] + blog.likes : blog.likes;
    })
    const top = findTopAuthor(counts);

    return {
        author: top.author,
        likes: top.num
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}