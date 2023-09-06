
  export const sort_data_for_leaderboard = (data) => {
    const sortedList = data.slice().sort((a, b) => b.score.total - a.score.total);

    sortedList.forEach((map, index) => {
        map.rank = index + 1;
      });

    return sortedList;
  };