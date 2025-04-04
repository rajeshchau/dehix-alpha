'use client';

import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useState } from 'react';
import dayjs from 'dayjs';
import { axiosInstance } from '../../lib/axiosinstance';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from '../../hooks/use-toast';
import { Plus } from 'lucide-react';

const MeetingDialog = ({ isOpen, onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [startDateTime, setStartDateTime] = useState(dayjs().add(1, 'day').format('YYYY-MM-DD'));
  const [endDateTime, setEndDateTime] = useState(dayjs().add(1, 'day').add(1, 'hour').format('YYYY-MM-DD'));
  const [attendees, setAttendees] = useState(['']);

  const handleRequest = (meetingData) => {
    const query = Object.fromEntries(searchParams.entries());
    if (query.code) {
      handleCreateMeet(meetingData, query.code);
    } else {
      handleAuth();
    }
  };

  const handleCreateMeet = (meetingData, code) => {
    axiosInstance.post('/meeting', meetingData, {
      params: { code },
    });
  };

  const handleAuth = async () => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      const response = await axiosInstance.get('/meeting/auth-url', {
        params: { redirectUri: baseUrl },
      });
      router.push(response.data.url);
    } catch (error) {
      console.error('Error fetching Google Auth URL:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong. Please try again.' });
    }
  };

  const addAttendee = () => {
    setAttendees([...attendees, '']);
  };

  const handleAttendeeChange = (index, value) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index] = value;
    setAttendees(updatedAttendees);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Meeting</DialogTitle>
          <DialogDescription>Fill in the details below to schedule a new meeting.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="summary" className="text-right">Summary</Label>
            <Input id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} className="col-span-3" placeholder="Meeting Summary" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" placeholder="Meeting Description" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start-date" className="text-right">Start Date</Label>
            <Input type="date" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end-date" className="text-right">End Date</Label>
            <Input type="date" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-start gap-3">
            <Label htmlFor="attendees" className="text-right">Attendees</Label>
            <div className="col-span-3 space-y-2">
              {attendees.map((attendee, index) => (
                <div className="flex items-center" key={index}>
                  <Input value={attendee} onChange={(e) => handleAttendeeChange(index, e.target.value)} placeholder="Enter attendee email" className="flex-grow" required />
                  {index === attendees.length - 1 && (
                    <Button type="button" onClick={addAttendee} className="ml-2 flex-shrink-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="flex justify-center">
            <Button type="submit">Create Meeting</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDialog;
