import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import { WithRedux, IWithReduxProps } from 'components/Customers/CustomerEditor/withRedux';
import { CustomerModal } from 'components/Customers/CustomerModal';
import InitialIcon from 'utils/components/InitialIcon';
import MessageBox from 'utils/components/MessageBox';
import './styles.scss';

interface ICustomerEditorState {
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  group_id: number;
}

type InputField = 'name' | 'phone' | 'email' | 'address' | 'group_id' | 'note';

const CustomerEditor = ({
  isCreatingCustomer,
  customerCreated,
  createCustomerFailed,
  createCustomerErrorMessages,
  handleSubmit,
  handleClose,
  groups
}: IWithReduxProps) => {
  const defaultCustomerData = {
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    group_id: 0
  };
  const [customer, setCustomer] = useState<ICustomerEditorState>(defaultCustomerData);
  const [groupLabel, setGroupLabel] = useState('Select...');
  const defaultDropdownItem = { id: 0, name: 'N/A' };
  const dropdownItems = [defaultDropdownItem].concat(groups);

  const handleChange = (field: InputField) => (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCustomer({ ...customer, [field]: e.target.value });
  };

  const handleSelectDropDown = (eventKey: string) => {
    const group = dropdownItems[Number(eventKey)] || defaultDropdownItem;
    setGroupLabel(group.name);
    setCustomer({ ...customer, group_id: group.id });
  };

  const handleClickSubmit = () => {
    handleSubmit(
      {
        name: customer.name.trim(),
        phone: customer.phone.trim() || undefined,
        email: customer.email.trim() || undefined,
        address: customer.address.trim() || undefined,
        note: customer.note.trim() || undefined,
        group_id: customer.group_id > 0 ? customer.group_id : undefined
      },
      () => {
        setCustomer(defaultCustomerData);
        setGroupLabel('N/A');
      }
    );
  };

  const showMessage = () => {
    if (createCustomerFailed) {
      return (
        <div className="customer-editor-row">
          <MessageBox
            message={
              <>
                <p>It failed to create a customer :</p>
                <ul>
                  {createCustomerErrorMessages.map((message, i) => (
                    <li key={i}>{message}</li>
                  ))}
                </ul>
              </>
            }
            variant={'danger'}
          />
        </div>
      );
    } else if (customerCreated) {
      return (
        <div className="customer-editor-row">
          <MessageBox message={<p>New customer created.</p>} variant={'success'} />
        </div>
      );
    }
    return <></>;
  };

  return (
    <CustomerModal handleClose={handleClose} showLoadingSpinner={isCreatingCustomer} title={'Edit Customer'}>
      <InitialIcon name={customer.name} />
      {showMessage()}
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
        <input type="email" name="email" id="email" value={customer.email} onChange={handleChange('email')} />
      </div>
      <div className="customer-editor-row">
        <label htmlFor="address">Address</label>
        <input type="text" name="address" id="address" value={customer.address} onChange={handleChange('address')} />
      </div>
      <div className="customer-editor-row">
        <label htmlFor="group_id">Group</label>
        <DropdownButton id="group_id" className="dropdown" variant="outline-secondary" title={groupLabel}>
          {dropdownItems.map((item, i) => (
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
        <button className="submit-button" onClick={handleClickSubmit}>
          Submit
        </button>
      </div>
    </CustomerModal>
  );
};

const CustomerEditorWithRedux = WithRedux(CustomerEditor);

export { CustomerEditorWithRedux as CustomerEditor };
