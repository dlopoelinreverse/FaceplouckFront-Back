export const filterDataUser = (usersData, userId) => {
  return usersData.filter((usersData) => usersData._id === userId)[0];
};
