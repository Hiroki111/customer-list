export const getInitials = (name: string): string => {
  if (!name) {
    return '';
  }
  const nameArray = name.split(' ');

  if (nameArray.length < 2) {
    return name.charAt(0);
  }

  return `${nameArray[0].charAt(0).toUpperCase()}${nameArray[nameArray.length - 1].charAt(0).toUpperCase()}`;
};
