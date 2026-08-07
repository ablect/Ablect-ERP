import PageContainer from "../../../components/ui/PageContainer";

import CustomerHeader from "../components/CustomerHeader";
import CustomerStatistics from "../components/CustomerStatistics";
import CreateCustomerButton from "../components/CreateCustomerButton";
import CustomerForm from "../components/CustomerForm";
import CustomerSearch from "../components/CustomerSearch";
import CustomerTable from "../components/CustomerTable";
import CustomerCount from "../components/CustomerCount";

import { useLoadCustomers } from "../hooks/useLoadCustomers";

export default function CustomerPage() {

  useLoadCustomers();

  return (

    <PageContainer>

      <div className="space-y-8">

        <CustomerHeader
          title="Customers"
          description="Manage all customer records and contact information."
        />

        <CustomerStatistics />

        <CreateCustomerButton />

        <CustomerForm />

        <CustomerSearch />

        <CustomerTable />

        <CustomerCount />

      </div>

    </PageContainer>

  );

}