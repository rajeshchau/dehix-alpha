'use client';
import { Filter, PackageOpen } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import SidebarMenu from '../../../components/menu/sidebarMenu';
import { menuItemsBottom, menuItemsTop } from '../../../config/menuItems/freelancer/oracleMenuItems';
import EducationVerificationCard from '../../../components/cards/oracleDashboard/educationVerificationCard';
import { StatusEnum } from '../../../utils/freelancer/enum';
import Header from '../../../components/header/header';
import { toast } from '../../../components/ui/use-toast';
import { axiosInstance } from '../../../lib/axiosinstance';

function ProfessionalInfo() {
  const [educationdata, setEducationData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsDialogOpen(false);
  };

  const filteredData = educationdata.filter((data) => {
    if (filter === 'all') {
      return true;
    }
    return (
      data.verificationStatus === filter ||
      (filter === 'current' && data.verificationStatus === StatusEnum.PENDING)
    );
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/verification/oracle?doc_type=education`
      );

      const result = response.data.data;

      const flattenedData = result.flatMap((entry) =>
        entry.result?.projects
          ? Object.values(entry.result.projects).map((project) => ({
              ...project,
              verifier_id: entry.verifier_id,
              verifier_username: entry.verifier_username,
            }))
          : []
      );
      setEducationData(flattenedData);
    } catch (error) {
      console.log(error, 'error in getting verification data');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong.Please try again.',
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarMenu
        menuItemsTop={menuItemsTop}
        menuItemsBottom={menuItemsBottom}
        active="Education Verification"
      />
      <div className="flex flex-col sm:gap-8 sm:py-0 sm:pl-14 mb-8">
        <Header
          menuItemsTop={menuItemsTop}
          menuItemsBottom={menuItemsBottom}
          activeMenu="Dashboard"
          breadcrumbItems={[
            { label: 'Freelancer', link: '/dashboard/freelancer' },
            { label: 'Oracle', link: '#' },
            { label: 'Education Verification', link: '#' },
          ]}
        />
        <div className="mb-8 ml-4 flex justify-between mt-8 md:mt-4 items-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Education Verification</h1>
            <p className="text-gray-400 mt-2">
              Monitor the status of your Education verifications.
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="mr-8 mb-12"
            onClick={() => setIsDialogOpen(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Education Status</DialogTitle>
            </DialogHeader>
            <RadioGroup
              defaultValue="all"
              value={filter}
              onValueChange={(value) => handleFilterChange(value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="filter-all" />
                <label htmlFor="filter-all">All</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current" id="filter-current" />
                <label htmlFor="filter-current">Pending</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="verified" id="filter-verified" />
                <label htmlFor="filter-verified">Verified</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="filter-rejected" />
                <label htmlFor="filter-rejected">Rejected</label>
              </div>
            </RadioGroup>
            <DialogFooter>
              <Button type="button" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <main
          className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 
                grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        >
          {filteredData.map((data, index) => (
            <EducationVerificationCard
              key={index}
              type="education"
              _id={data._id}
              degree={data.degree}
              location={data.universityName}
              startFrom={data.startDate}
              endTo={data.endDate}
              grade={data.grade}
              fieldOfStudy={data.fieldOfStudy}
              comments={data.comments}
              status={data.verificationStatus}
              onStatusUpdate={(newStatus) => {
                console.log('Status updated to:', newStatus);
              }}
              onCommentUpdate={(newComment) => {
                console.log('Comment updated to:', newComment);
              }}
            />
          ))}
          {educationdata.length === 0 ? (
            <div className="text-center w-[90vw] px-auto mt-20 py-10">
              <PackageOpen className="mx-auto text-gray-500" size="100" />
              <p className="text-gray-500">
                No Education verification for you now.
              </p>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default ProfessionalInfo;