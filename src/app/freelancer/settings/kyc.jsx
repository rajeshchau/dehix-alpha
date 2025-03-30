'use client';
import { useSelector } from 'react-redux';

import KYCForm from '../../../components/form/kycFreelancerForm';
import Header from '../../../components/header/header';
import SidebarMenu from '../../../components/menu/sidebarMenu';
import {
    menuItemsBottom,
    menuItemsTop,
} from '../../../config/menuItems/freelancer/settingsMenuItems';

export default function PersonalInfo() {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarMenu
        menuItemsTop={menuItemsTop}
        menuItemsBottom={menuItemsBottom}
        active="kyc"
        isKycCheck={true}
      />
      <div className="flex flex-col sm:gap-8 sm:py-0 sm:pl-14 mb-8">
        <Header
          menuItemsTop={menuItemsTop}
          menuItemsBottom={menuItemsBottom}
          activeMenu="Personal Info"
          breadcrumbItems={[
            { label: 'Freelancer', link: '/dashboard/freelancer' },
            { label: 'Settings', link: '#' },
            { label: 'kyc', link: '#' },
          ]}
        />
        <main className="grid flex-1 items-start sm:px-6 sm:py-0 md:gap-8">
          <KYCForm user_id={user.uid} />
        </main>
      </div>
    </div>
  );
}