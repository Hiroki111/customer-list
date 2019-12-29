import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import * as qs from 'query-string';

import { WithRedux, IWithReduxProps } from 'components/Customers/CustomerEditor/withRedux';
import { CustomerModal } from 'components/Customers/CustomerModal';
import { defaultCustomer } from 'redux/customerEditor/reducer';
import InitialIcon from 'utils/components/InitialIcon';
import MessageBox from 'utils/components/MessageBox';
import './styles.scss';

interface ICustomerDataState {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  group_id: number;
}

type InputField = 'name' | 'phone' | 'email' | 'address' | 'group_id' | 'note';

const CustomerEditor = ({
  currentCustomerData,
  isLoadingCurrentCustomer,
  failedToLoadCurrentCustomer,
  isCreatingCustomer,
  isUpdatingCustomer,
  customerIsCreated,
  customerIsUpdated,
  failedToCreateCustomer,
  failedToUpdateCustomer,
  customerCreationErrorMessages,
  customerUpdateErrorMessages,
  handleSubmit,
  reloadCustomers,
  handleClose,
  groups
}: IWithReduxProps) => {
  let history = useHistory();
  const [customer, setCustomer] = useState<ICustomerDataState>(defaultCustomer);
  const [groupLabel, setGroupLabel] = useState('N/A');

  const defaultDropdownItem = { id: 0, name: 'N/A' };
  const dropdownItems = [defaultDropdownItem].concat(groups);
  const modalTitle = customer.id > 0 ? 'Edit Customer' : 'Create Customer';

  useEffect(() => {
    if (currentCustomerData.id !== customer.id) {
      setCustomer({
        id: currentCustomerData.id,
        name: currentCustomerData.name,
        phone: currentCustomerData.phone || '',
        email: currentCustomerData.email || '',
        address: currentCustomerData.address || '',
        note: currentCustomerData.note || '',
        group_id: currentCustomerData.group_id || 0
      });
    }

    if (groups.length > 0) {
      const group = dropdownItems.find(group => group.id === customer.group_id) || defaultDropdownItem;
      setGroupLabel(group.name);
    }
  }, [currentCustomerData, groups, customer, defaultDropdownItem, dropdownItems]);

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
    const inputData = {
      id: customer.id,
      name: customer.name.trim(),
      phone: customer.phone.trim() || undefined,
      email: customer.email.trim() || undefined,
      address: customer.address.trim() || undefined,
      note: customer.note.trim() || undefined,
      group_id: customer.group_id > 0 ? customer.group_id : undefined
    };
    handleSubmit(inputData, () => {
      if (customer.id < 1) {
        setCustomer(defaultCustomer);
        setGroupLabel('N/A');
      }
      let page = qs.parse(history.location.search).page || 1;
      if (page instanceof Array) {
        page = page[0];
      }
      let keyword = qs.parse(history.location.search).keyword || '';
      if (keyword instanceof Array) {
        keyword = keyword[0];
      }
      reloadCustomers(Number(page), keyword);
    });
  };

  const showNotification = () => {
    if (failedToCreateCustomer || failedToUpdateCustomer) {
      let messages = [] as string[];
      if (failedToCreateCustomer) {
        messages = customerCreationErrorMessages;
      } else if (failedToUpdateCustomer) {
        messages = customerUpdateErrorMessages;
      }

      return (
        <MessageBox
          message={
            <>
              <p>ERROR :</p>
              <ul>
                {messages.map((message, i) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </>
          }
          variant={'danger'}
        />
      );
    } else if (customerIsCreated || customerIsUpdated) {
      const message = customer.id > 0 ? 'Customer Updated.' : 'New customer created.';
      return <MessageBox message={<p>{message}</p>} variant={'success'} />;
    }
    return <></>;
  };

  return (
    <CustomerModal
      handleClose={handleClose}
      showLoadingSpinner={isLoadingCurrentCustomer || isCreatingCustomer || isUpdatingCustomer}
      showWarning={failedToLoadCurrentCustomer}
      title={modalTitle}
    >
      <InitialIcon name={customer.name} />
      <div className="customer-editor-row">{showNotification()}</div>
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
