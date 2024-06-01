/** @format */

import { data } from '@/types/people';
import xlsx, { IJsonSheet } from 'json-as-xlsx';

export function downloadToExcel() {
  const columns: IJsonSheet[] = [
    {
      sheet: 'Persons',
      columns: [
        {
          label: 'Person ID',
          value: 'id',
        },
        {
          label: 'First Name',
          value: 'first_name',
        },
        {
          label: 'Last Name',
          value: 'last_name',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'Gender',
          value: 'gender',
        },
        {
          label: 'Date of Birth',
          value: row =>
            typeof row?.date_of_birth === 'string'
              ? new Date(row.date_of_birth).toLocaleDateString()
              : '',
        },
      ],
      content: data,
    },
  ];
  const settings = {
    fileName: 'Persons excel',
  };
  xlsx(columns, settings);
}
