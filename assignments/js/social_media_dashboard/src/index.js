const API_URL = 'http://localhost:3000/users';

async function fetchUsers() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Httpt error: ${response.status}`);
    }

    const users = await response.json();

    const analysis = userAnalysis(users);
    console.log(analysis)
  } catch (error) {
    console.log(error);
  }
}

function userAnalysis(users) {
  const now = new Date();
  const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

  const result = users
    .filter((user) =>
      user.posts.some((post) => {
        const postDate = new Date(post.timestamp);
        return !isNaN(postDate) && postDate >= oneWeekAgo;
      })
    )
    .map(user => {
      const popularPosts = user.posts.filter(post => post.likes >= 10)
      const sumLikes = popularPosts.reduce((acc, post) => acc + post.likes, 0)
      const countPosts = popularPosts.length;
      return { sumLikes, countPosts };
    })
    .reduce(
      (acc, curr) => {
        acc.totalLikes += curr.sumLikes;
        acc.totalPopularPosts += curr.countPosts;
        acc.activeUserCount += 1;
        return acc
      },
      { totalLikes: 0, totalPopularPosts: 0, activeUserCount: 0, }
    );

    const average = result.activeUserCount === 0
    ? 0
    : result.totalLikes / result.activeUserCount

    return {
      activeUsers: result.activeUserCount,
      totalPopularPosts: result.totalPopularPosts,
      averageLikesPerUser: average
    }
}

fetchUsers();

// Terminal Output: { activeUsers: 0, totalPopularPosts: 0, averageLikesPerUser: 0 }