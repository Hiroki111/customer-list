import { History } from 'history';
import * as qs from 'query-string';

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

export const getSearchConditions = (history: History): { page: number; keyword: string } => {
  let page = qs.parse(history.location.search).page || 1;
  if (page instanceof Array) {
    page = page[0];
  }
  page = Number(page);

  let keyword = qs.parse(history.location.search).keyword || '';
  if (keyword instanceof Array) {
    keyword = keyword[0];
  }

  return { page, keyword };
};
