'use client';

import { useState } from 'react';

import { toast } from '../ui/use-toast';
import { axiosInstance } from '../../lib/axiosinstance';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Input } from '../ui/input';

const ConnectsDialog = ({
  loading,
  setLoading,
  onSubmit,
  isValidCheck,
  userId,
  buttonText,
  userType,
  requiredConnects,
  data,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [lowConnects, setLowConnects] = useState(false);

  const userConnects = parseInt(localStorage.getItem('DHX_CONNECTS') || '0', 10);

  const fetchMoreConnects = async () => {
    try {
      await axiosInstance.post(`/token-request`, {
        userId,
        userType,
        amount: '100',
        status: 'PENDING',
        dateTime: new Date().toISOString(),
      });
      toast({
        title: 'Success!',
        description: 'Request to add connects has been sent.',
        duration: 3000,
      });
      const newConnect = {
        userId: userId,
        amount: 100,
        status: 'PENDING',
        dateTime: new Date().toISOString(),
      };

      window.dispatchEvent(
        new CustomEvent('newConnectRequest', { detail: newConnect }),
      );
    } catch (error) {
      console.error('Error requesting more connects:', error.response);
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Failed to request connects. Try again!',
        duration: 3000,
      });
    }
  };

  const dialogOpen = async () => {
    const isValid = await isValidCheck();
    console.log(isValid);

    if (!isValid) return;
    console.log(requiredConnects);

    if (userConnects < requiredConnects) {
      setLowConnects(true);
      setOpenConfirm(true);
      return;
    }

    setLowConnects(false);
    setOpenConfirm(true);
  };

  const handleConfirm = async () => {
    console.log(lowConnects);

    if (lowConnects) return;
    setLoading(true);
    try {
      if (data) {
        await onSubmit(data);
      } else {
        await onSubmit();
      }
      setOpenConfirm(false);
    } catch (error) {
      console.error('Error deducting connects:', error);
      alert('Failed to deduct connects. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="lg:col-span-2 w-full xl:col-span-2 mt-4"
        disabled={loading}
        onClick={dialogOpen}
      >
        {loading ? 'Loading...' : buttonText}
      </Button>
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          {lowConnects ? (
            <>
              <DialogTitle>Insufficient Connects</DialogTitle>
              <DialogDescription>
                You don't have enough connects to create a project.
                <br />
                Please{' '}
                <span
                  className="text-blue-600 font-bold cursor-pointer"
                  onClick={fetchMoreConnects}
                >
                  Request Connects
                </span>{' '}
                to proceed.
              </DialogDescription>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenConfirm(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogTitle>Confirm Deduction</DialogTitle>
              <Input type="text" value={requiredConnects} disabled />
              <DialogDescription>
                Creating this project will deduct{' '}
                <span className="font-extrabold">
                  {' '}
                  {requiredConnects} connects
                </span>
                . Do you want to proceed?
              </DialogDescription>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenConfirm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm} disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConnectsDialog;