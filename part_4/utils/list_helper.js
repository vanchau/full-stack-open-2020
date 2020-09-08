const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((previous, current) =>
    previous.likes > current.likes ? previous : current
  );
};

const mostBlogs = (blogs) => {
  const amountOfBlogs = blogs.reduce((obj, blog) => {
    obj[blog.author] = (obj[blog.author] || 0) + 1;
    return obj;
  }, {});

  const authorWithMostBlogs = Object.keys(amountOfBlogs).reduce((a, b) =>
    amountOfBlogs[a] > amountOfBlogs[b] ? a : b
  );

  return {
    author: authorWithMostBlogs,
    blogs: amountOfBlogs[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  const amountOfLikes = blogs.reduce((obj, blog) => {
    obj[blog.author] = (obj[blog.author] || 0) + blog.likes;
    return obj;
  }, {});

  const authorWithMostLikes = Object.keys(amountOfLikes).reduce((a, b) =>
    amountOfLikes[a] > amountOfLikes[b] ? a : b
  );

  return {
    author: authorWithMostLikes,
    likes: amountOfLikes[authorWithMostLikes],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
