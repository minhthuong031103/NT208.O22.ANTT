/** @format */

import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '../ui/avatar/avatar';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { AuthSvg } from '@/assets/AuthSvg';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import BackDropCus from '../backdropCus/backdropCus';
const avatarNav = [
  // {
  //   name: 'Hồ sơ',
  //   href: '/profile',
  // },
  // {
  //   name: 'Thêm sản phẩm',
  //   href: '/admin/add-product',
  // },
];

export const Header = () => {
  const { onLogout } = useAuth();
  const [isUserOpen, setIsUserOpen] = React.useState(false);
  return (
    <div className='flex border-b-2 border-solid flex-row h-16 items-center justify-between w-full absolute top-0 px-5 lg:px-20 '>
      {isUserOpen ? <BackDropCus isOpen={isUserOpen} /> : null}
      <div className='flex flex-row gap-x-2 items-center font-bold'>
        <img className='w-40 h-14' src='/src/assets/logoEstate.png' alt='logo' />
      </div>

      <div className='flex flex-row gap-5    items-center'>
        {new Date().getHours() > 0 && new Date().getHours() < 12
          ? 'Chào buổi sáng'
          : new Date().getHours() >= 12 && new Date().getHours() < 18
          ? 'Chào buổi chiều'
          : new Date().getHours() >= 18
          ? 'Chào buổi tối'
          : 'Xin chào'}
        <Dropdown
          shouldBlockScroll={true}
          onOpenChange={open => {
            setIsUserOpen(open);
          }}
          closeOnSelect={true}
          onClose={() => {
            setIsUserOpen(false);
          }}
          isOpen={isUserOpen}
        >
          <DropdownTrigger>
            <Avatar className='cursor-pointer'>
              <AvatarImage
                src='https://funmauj.b-cdn.net/test/560339.jpg'
                className='w-10 h-10 rounded-full border-1 border-red-400 object-cover'
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title={`Admin`}>
              {avatarNav.map((item, index) => (
                <DropdownItem key={index}>
                  <Link to={item.href}>{item.name}</Link>
                </DropdownItem>
              ))}

              <DropdownItem>
                <div className='flex flex-row gap-2 items-center h-8  '>
                  <div className=''>{AuthSvg.signIn()}</div>
                  <div
                    onClick={() => {
                      onLogout();
                    }}
                  >
                    Log out
                  </div>
                </div>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
