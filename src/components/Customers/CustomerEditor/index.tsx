import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import { WithRedux, IWithReduxProps } from 'components/Customers/CustomerEditor/withRedux';
import { ICustomer } from 'interfaces/models';
import InitialIcon from 'utils/components/InitialIcon';
import './styles.scss';

type InputField = 'name' | 'phone' | 'email' | 'address' | 'group_id' | 'note';

const CustomerEditor = ({ handleClose, groups }: IWithReduxProps) => {
  const [customer, setCustomer] = useState<ICustomer>({
    id: -1,
    name: '',
    phone: '',
    email: '',
    address: '',
    group_id: 0,
    note: ''
  });

  const defaultDropdownItem = {
    id: -1,
    name: 'N/A'
  };

  const [groupLabel, setGroupLabel] = useState('Select...');

  const handleChange = (field: InputField) => (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCustomer({ ...customer, [field]: e.target.value });
  };

  const handleSelectDropDown = (eventKey: string) => {
    const group = groups[Number(eventKey)] || defaultDropdownItem;
    setGroupLabel(group.name);
    setCustomer({ ...customer, group_id: group.id });
  };

  return (
    <>
      <InitialIcon name={customer.name} />
      <div className="customer-editor-row">
        <label htmlFor="name">
          <span className="mandatory-field">*</span>Name
        </label>
        <input type="text" name="name" id="name" value={customer.name} onChange={handleChange('name')} />
      </div>
      <div className="customer-editor-row">
        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" id="phone" value={customer.phone} onChange={handleChange('phone')} />
      </div>
      <div className="customer-editor-row">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={customer.email} onChange={handleChange('email')} />
      </div>
      <div className="customer-editor-row">
        <label htmlFor="address">Address</label>
        <input type="text" name="address" id="address" value={customer.address} onChange={handleChange('address')} />
      </div>
      <div className="customer-editor-row">
        <label htmlFor="group_id">Group</label>
        <DropdownButton id="group_id" className="dropdown" variant="outline-secondary" title={groupLabel}>
          {[defaultDropdownItem].concat(groups).map((item, i) => (
            <Dropdown.Item key={i} eventKey={i.toString()} onSelect={handleSelectDropDown}>
              {item.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className="customer-editor-row">
        <label htmlFor="note">Note</label>
        <textarea name="note" id="note" value={customer.note} onChange={handleChange('note')} />
      </div>
      <div className="footer">
        <button onClick={handleClose}>Cancel</button>
        <button className="submit-button" onClick={() => {}}>
          Submit
        </button>
      </div>
    </>
  );
};

const CustomerEditorWithRedux = WithRedux(CustomerEditor);

export { CustomerEditorWithRedux as CustomerEditor };
