import React, { useState } from 'react';
import { WithRedux, IWithReduxProps } from 'components/Customers/SearchBox/withRedux';
import './styles.scss';

const SearchBox = ({ handleSubmit, handleReset, isLoadingCustomers }: IWithReduxProps) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' || isLoadingCustomers) {
      return;
    }
    if (value.length < 2) {
      alert('Please enter at least 2 characters.');
      return;
    }

    handleSubmit(value);
  };

  return (
    <div className="search-box" onKeyDown={handleKeyDown}>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter name..." />
      <button
        className="submit-search-box-botton"
        onClick={() => handleSubmit(value)}
        disabled={isLoadingCustomers || value.length < 2}
      >
        Search
      </button>
      <button
        onClick={() => {
          handleReset();
          setValue('');
        }}
        disabled={isLoadingCustomers}
      >
        Reset
      </button>
    </div>
  );
};

const SearchBoxWithRedux = WithRedux(SearchBox);

export { SearchBoxWithRedux as SearchBox, SearchBox as DisconnectedSearchBox };
