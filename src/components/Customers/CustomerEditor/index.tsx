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
      <table className="customer-editor-table">
        <tbody>
          <tr>
            <td className="field-name">
              <label htmlFor="name">Name</label>
            </td>
            <td className="data">
              <input type="text" name="name" id="name" value={customer.name} onChange={handleChange('name')} />
            </td>
          </tr>
          <tr>
            <td className="field-name">
              <label htmlFor="phone">Phone</label>
            </td>
            <td className="data">
              <input type="text" name="phone" id="phone" value={customer.phone} onChange={handleChange('phone')} />
            </td>
          </tr>
          <tr>
            <td className="field-name">
              <label htmlFor="email">Email</label>
            </td>
            <td className="data">
              <input type="text" name="email" id="email" value={customer.email} onChange={handleChange('email')} />
            </td>
          </tr>
          <tr>
            <td className="field-name">
              <label htmlFor="address">Address</label>
            </td>
            <td className="data">
              <input
                type="text"
                name="address"
                id="address"
                value={customer.address}
                onChange={handleChange('address')}
              />
            </td>
          </tr>
          <tr>
            <td className="field-name">
              <label htmlFor="group_id">Group</label>
            </td>
            <td className="data">
              <DropdownButton id="group_id" className="dropdown" variant="outline-secondary" title={groupLabel}>
                {[defaultDropdownItem].concat(groups).map((item, i) => (
                  <Dropdown.Item key={i} eventKey={i.toString()} onSelect={handleSelectDropDown}>
                    {item.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </td>
          </tr>
          <tr>
            <td className="field-name">
              <label htmlFor="note">Note</label>
            </td>
            <td className="data">
              <textarea name="note" id="note" value={customer.note} onChange={handleChange('note')} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="footer">
        <button className="submit-button" onClick={() => {}}>
          Submit
        </button>
        <button onClick={handleClose}>Back</button>
      </div>
    </>
  );
};

const CustomerEditorWithRedux = WithRedux(CustomerEditor);

export { CustomerEditorWithRedux as CustomerEditor };
