/** @format */

import { PartnersColumns } from './PartnersColumns';
import PartnersTable from './PartnersTable';

export const Partners = () => {
  return (
    <div>
      <h1 className='mt-6 mx-2 text-xl mb-4 font-medium'>Danh sách đối tác</h1>
      <PartnersTable columns={PartnersColumns} />
    </div>
  );
};
