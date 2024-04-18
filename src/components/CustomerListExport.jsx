import { CSVLink } from 'react-csv';

const CustomerListExport = ({ customer }) => {
  const csvHeaders = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Street Address", key: "streetaddress" },
    { label: "Postcode", key: "postcode" },
    { label: "City", key: "city" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
  ];

  return (
    <CSVLink data={customer} headers={csvHeaders} filename="customer-list.csv">
      Export to CSV
    </CSVLink>
  );
};

export default CustomerListExport;
