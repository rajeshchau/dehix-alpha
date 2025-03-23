'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { CreateNoteDialog } from '../../../components/shared/CreateNoteDialog';

const NotesHeader = ({ onNoteCreate, notes, setNotes, isTrash }) => {
  const [selectedSortOption, setSelectedSortOption] = useState('');

  const sortByColor = () => {
    const sortedNotes = [...notes].sort((a, b) =>
      (a.bgColor || '').localeCompare(b.bgColor || '')
    );
    setNotes(sortedNotes);
  };

  const sortByLatest = () => {
    const sortedNotes = [...notes].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    setNotes(sortedNotes);
  };

  const sortByOldest = () => {
    const sortedNotes = [...notes].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });
    setNotes(sortedNotes);
  };

  return (
    <div>
      <div className="mb-8 ml-6 mt-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-gray-400 mt-2 hidden md:block">
            Organize your thoughts and ideas. Add, view, and manage your
            personal notes with ease.
          </p>
        </div>
        {!isTrash && (
          <div className="mt-4 mr-5">
            <div className="flex justify-center gap-5 items-center flex-wrap mt-4 sm:mt-0">
              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="sm:text-sm md:text-base">
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 shadow-md rounded-md border">
                  <DropdownMenuLabel>Sort Notes</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedSortOption === 'color'}
                    onCheckedChange={() => {
                      setSelectedSortOption('color');
                      sortByColor();
                    }}
                  >
                    Sort by color
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedSortOption === 'latest'}
                    onCheckedChange={() => {
                      setSelectedSortOption('latest');
                      sortByLatest();
                    }}
                  >
                    Sort by latest
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedSortOption === 'oldest'}
                    onCheckedChange={() => {
                      setSelectedSortOption('oldest');
                      sortByOldest();
                    }}
                  >
                    Sort by oldest
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Create Dialog */}
              {!isTrash && <CreateNoteDialog onNoteCreate={onNoteCreate} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesHeader;
