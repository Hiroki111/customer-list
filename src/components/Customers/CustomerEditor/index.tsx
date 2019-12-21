import React, { useState } from 'react';

import { ICustomer } from 'interfaces/models';
import { getInitials } from 'utils';

interface ICustomerEditor {
  handleClose: () => void;
}

type InputField = 'name' | 'phone' | 'email' | 'address' | 'group_id' | 'note';

export const CustomerEditor = ({ handleClose }: ICustomerEditor) => {
  const [customer, setCustomer] = useState<ICustomer>({
    id: -1,
    name: '',
    phone: '',
    email: '',
    address: '',
    group_id: 0,
    note: ''
  });

  const handleInputChange = (field: InputField) => (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCustomer({ ...customer, [field]: e.target.value });
  };

  return (
    <>
      <div className="body">
        <div className="icon" data-letters={getInitials(customer.name)}></div>
        <table className="customer-details-table">
          <tbody>
            <tr>
              <td className="field-name">
                <label htmlFor="name">Name</label>
              </td>
              <td className="data">
                <input type="text" name="name" id="name" value={customer.name} onChange={handleInputChange('name')} />
              </td>
            </tr>
            <tr>
              <td className="field-name">
                <label htmlFor="phone">Phone</label>
              </td>
              <td className="data">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={customer.phone}
                  onChange={handleInputChange('phone')}
                />
              </td>
            </tr>
            <tr>
              <td className="field-name">
                <label htmlFor="email">Email</label>
              </td>
              <td className="data">
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={customer.email}
                  onChange={handleInputChange('email')}
                />
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
                  onChange={handleInputChange('address')}
                />
              </td>
            </tr>
            <tr>
              <td className="field-name">
                <label htmlFor="group_id">Group</label>
              </td>
              <td className="data">
                <input
                  type="text"
                  name="group_id"
                  id="group_id"
                  value={customer.group_id}
                  onChange={handleInputChange('group_id')}
                />
              </td>
            </tr>
            <tr>
              <td className="field-name">
                <label htmlFor="note">Note</label>
              </td>
              <td className="data">
                <textarea name="note" id="note" value={customer.note} onChange={handleInputChange('note')} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="footer">
        <button className="submit-button" onClick={() => {}}>
          Submit
        </button>
        <button onClick={handleClose}>Back</button>
      </div>
    </>
  );
};
