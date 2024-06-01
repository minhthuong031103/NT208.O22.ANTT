/** @format */

import CustomersTable from './CustomersTable';
import { CustomersColumns } from './columns';

export function Customers() {
  return (
    <div>
      <h1 className='mt-6 mx-2 text-xl mb-4 font-medium '>Danh sách khách hàng</h1>
      <CustomersTable columns={CustomersColumns} />
    </div>
  );
}
