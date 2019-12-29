import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as qs from 'query-string';

import { WithRedux, IWithReduxProps } from 'components/Customers/SearchBox/withRedux';
import './styles.scss';

const SearchBox = ({ isLoadingCustomers }: IWithReduxProps) => {
  let history = useHistory();
  let keywordInUrl = qs.parse(history.location.search).keyword || '';
  if (keywordInUrl instanceof Array) {
    keywordInUrl = keywordInUrl[0];
  }
  const [keyword, setKeyword] = useState(keywordInUrl);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' || isLoadingCustomers) {
      return;
    }

    updateUrl(keyword);
  };
  const handleClickSearch = () => updateUrl(keyword);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);
  const handleClickReset = () => {
    setKeyword('');
    history.push(`/customers`);
  };

  const updateUrl = (keyword: string) => {
    const queryParameter = `?page=1&keyword=${keyword.trim()}`;

    history.push(`/customers${queryParameter}`);
  };

  return (
    <div className="search-box" onKeyDown={handleKeyDown}>
      <input value={keyword} onChange={handleChangeInput} placeholder="Enter name..." />
      <button className="submit-search-box-botton" onClick={handleClickSearch} disabled={isLoadingCustomers}>
        Search
      </button>
      <button onClick={handleClickReset} disabled={isLoadingCustomers}>
        Reset
      </button>
    </div>
  );
};

const SearchBoxWithRedux = WithRedux(SearchBox);

export { SearchBoxWithRedux as SearchBox, SearchBox as DisconnectedSearchBox };
