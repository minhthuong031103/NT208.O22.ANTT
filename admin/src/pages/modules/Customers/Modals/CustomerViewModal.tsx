/** @format */

import { useModal } from '@/hooks/useModal';
import DialogCustom from '@/components/dialogCustom/dialogCustom';
import { Zoom } from '@/components';

function UserDetails(user: any) {
  if (!user) {
    return <div></div>;
  }
  const fields = [
    { key: 'id', title: 'Mã số', type: 'text' },
    { key: 'avatar', title: 'Ảnh đại diện', type: 'image' },
    { key: 'name', title: 'Tên', type: 'text' },
    { key: 'email', title: 'Email', type: 'text' },
    {
      key: 'isEmailVerified',
      title: 'Trạng thái E-mail',
      type: 'boolean',
      format: (b: any): string => (b ? 'Đã duyệt' : 'Chưa duyệt'),
    },
    { key: 'phoneNumber', title: 'Số điện thoại', type: 'text' },
    { key: 'diaChi', title: 'Địa chỉ', type: 'text' },
    { key: 'anhCCCDTruoc', title: 'Mặt trước CCCD', type: 'image' },
    { key: 'anhCCCDSau', title: 'Mặt sau CCCD', type: 'image' },
    { key: 'anhChanDung', title: 'Ảnh chân dung', type: 'image' },
  ];
  if (user.role === 'doi_tac') {
    fields.push({
      key: 'duyetDoiTac',
      title: 'Tài khoản đối tác',
      type: 'text',
      format: (str: any): string => {
        switch (str) {
          case 'cho_duyet':
            return 'Chờ duyệt';
          case 'da_duyet':
            return 'Đã duyệt';
          case 'da_khoa':
            return 'Đã khóa';
          default:
            return '';
        }
      },
    });
  }
  if (user.role === 'khach_hang') {
    fields.push({
      key: 'duyetKhachHang',
      title: 'Tài khoản khách hàng',
      type: 'text',
      format: (str: any): string => {
        switch (str) {
          case 'cho_duyet':
            return 'Chờ duyệt';
          case 'da_duyet':
            return 'Đã duyệt';
          case 'da_khoa':
            return 'Đã khóa';
          default:
            return '';
        }
      },
    });
  }
  return (
    <div className='divide-y-[1px] mx-auto'>
      {fields.map(field => {
        const containerClass =
          'flex flex-col md:flex-row w-full h-fit justify-between px-2 py-4 hover:bg-slate-50 transition-all';
        const headerClass = 'font-bold w-fit';
        let uris: any[] = [];
        switch (field.type) {
          case 'text':
          case 'number':
            return (
              <div className={containerClass}>
                <h3 className={headerClass}>{field.title}:</h3>
                <p
                  className='w-[500px] h-fit text-start md:text-end'
                  style={{ overflowWrap: 'break-word' }}
                >
                  {field.format ? field.format(user[field.key]) : user[field.key]}
                </p>
              </div>
            );
          case 'boolean':
            return (
              <div className={containerClass}>
                <h3 className={headerClass}>{field.title}:</h3>
                <p>
                  {field.format ? field.format(user[field.key]) : user[field.key] ? 'yes' : 'no'}
                </p>
              </div>
            );
          case 'image':
            try {
              uris = JSON.parse(user[field.key]);
            } catch (e) {
              uris = [user[field.key]];
            }
            return (
              <div className={containerClass}>
                <h3 className={headerClass}>{field.title}:</h3>
                {uris && uris.length ? (
                  <div>
                    {uris.map(uri => {
                      return (
                        <Zoom>
                          <img alt={field.title} className='rounded w-32 h-32' src={uri} />
                        </Zoom>
                      );
                    })}
                  </div>
                ) : (
                  <p>Không có ảnh</p>
                )}
              </div>
            );
          default:
            return (
              <div className={containerClass}>
                <p>
                  {field.key} {field.type}
                </p>
                <p>{user[field.key]}</p>
              </div>
            );
        }
      })}
    </div>
  );
}

export function CustomerViewModal({ data }) {
  const { modal, onCloseViewModal, onOpenEditModal } = useModal();

  return (
    <DialogCustom className='max-w-4xl' isModalOpen={modal.viewModal} onClose={onCloseViewModal}>
      <div className='fixed w-[100%] top-0 left-0 right-0 pt-6 pb-5 bg-white z-10'>
        {data.type == 'partner' ? (
          <h1 className='font-bold text-center'>Thông tin đối tác</h1>
        ) : (
          <></>
        )}
        {data.type == 'customer' ? (
          <h1 className='font-bold text-center'>Thông tin khách hàng</h1>
        ) : (
          <></>
        )}
      </div>
      <div className='mx-auto mb-12 mt-[5.5rem] px-16'>
        {
          // JSON.stringify(data)
          UserDetails(data)
        }
      </div>
    </DialogCustom>
  );
}
