import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { WithRedux, IWithReduxProps } from 'components/Customers/CustomerEditor/withRedux';
import { CustomerModal } from 'components/Customers/CustomerModal';
import { defaultCustomer } from 'redux/customerEditor/reducer';
import InitialIcon from 'utils/components/InitialIcon';
import MessageBox from 'utils/components/MessageBox';
import { getSearchConditions } from 'utils/index';
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

const CustomerEditor = (props: IWithReduxProps) => {
  let history = useHistory();
  const [customer, setCustomer] = useState<ICustomerDataState>(defaultCustomer);
  const [groupLabel, setGroupLabel] = useState('N/A');

  const defaultDropdownItem = { id: 0, name: 'N/A' };
  const dropdownItems = [defaultDropdownItem].concat(props.groups);
  const modalTitle = customer.id > 0 ? 'Edit Customer' : 'Create Customer';

  useEffect(() => {
    if (props.currentCustomerData.id !== customer.id) {
      setCustomer({
        id: props.currentCustomerData.id,
        name: props.currentCustomerData.name,
        phone: props.currentCustomerData.phone || '',
        email: props.currentCustomerData.email || '',
        address: props.currentCustomerData.address || '',
        note: props.currentCustomerData.note || '',
        group_id: props.currentCustomerData.group_id || 0
      });
    }

    const group = dropdownItems.find(group => group.id === Number(customer.group_id)) || defaultDropdownItem;
    if (group.name !== groupLabel) {
      setGroupLabel(group.name);
    }
  }, [props, customer, groupLabel, defaultDropdownItem, dropdownItems]);

  const handleChange = (field: InputField) => (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCustomer({ ...customer, [field]: e.target.value });
  };

  const handleSelectDropDown = (eventKey: string) => {
    const group = dropdownItems[Number(eventKey)] || defaultDropdownItem;
    setCustomer({ ...customer, group_id: group.id });
  };

  const handleClickSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const inputData = {
      id: customer.id,
      name: customer.name.trim(),
      phone: customer.phone.trim() || undefined,
      email: customer.email.trim() || undefined,
      address: customer.address.trim() || undefined,
      note: customer.note.trim() || undefined,
      group_id: customer.group_id
    };
    props.handleSubmit(inputData, () => {
      if (customer.id < 1) {
        setCustomer(defaultCustomer);
        setGroupLabel('N/A');
      }

      const { page, keyword } = getSearchConditions(history);
      props.reloadCustomers(page, keyword);
    });
  };

  const showNotification = () => {
    if (props.failedToSaveCustomer) {
      return (
        <MessageBox
          message={
            <>
              <p>ERROR :</p>
              <ul>
                {props.errorMessages.map((message, i) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </>
          }
          variant={'danger'}
        />
      );
    } else if (props.customerIsSaved) {
      const message = customer.id > 0 ? 'Customer Updated.' : 'New customer created.';
      return <MessageBox message={<p>{message}</p>} variant={'success'} />;
    }
    return <></>;
  };

  return (
    <CustomerModal
      handleClose={props.handleClose}
      showLoadingSpinner={props.isLoadingCurrentCustomer || props.isSavingCustomer}
      showWarning={props.failedToLoadCurrentCustomer}
      title={modalTitle}
    >
      <form onSubmit={handleClickSubmit}>
        <InitialIcon name={customer.name} />
        <div className="customer-editor-row">{showNotification()}</div>
        <div className="customer-editor-row">
          <label htmlFor="name">
            <span className="mandatory-field">*</span>Name
          </label>
          <input type="text" name="name" id="name" value={customer.name} onChange={handleChange('name')} required />
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
          <button onClick={props.handleClose}>Cancel</button>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </CustomerModal>
  );
};

const CustomerEditorWithRedux = WithRedux(CustomerEditor);

export { CustomerEditorWithRedux as CustomerEditor, CustomerEditor as DisconnectedCustomerEditor };
