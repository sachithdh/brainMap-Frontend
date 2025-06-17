'use client';

import React, { useState } from 'react';
import ErrorDialog from '../components/ErrorDialog';
import NavBar from '../components/NavBar'

const Home: React.FC = () => {

  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleOpenDialog = () => {
  //   setIsDialogOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  // };

  // const handleSecondaryAction = () => {
  //   console.log('Secondary action clicked');
  //   setIsDialogOpen(false);
  // };

  // const handlePrimaryAction = () => {
  //   console.log('Primary action clicked');
  //   setIsDialogOpen(false);
  // };

  return (

    <>
    <NavBar/>

<div className="w-[95%] h-3/4 bg-amber-300 p-10 flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[20]">
  {/* Content */}
</div>




    {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Error Dialog Component Demo
        </h1>
        
        <button
          onClick={handleOpenDialog}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Show Error Dialog
        </button>

        <ErrorDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSecondary={handleSecondaryAction}
          onPrimary={handlePrimaryAction}
          title="You have unsaved data"
          message="Do you know Material X system contains material design components so stayed as it should look and behave for today"
          secondaryLabel="Cancel"
          primaryLabel="Delete"
        />
      </div>
    </div> */}

    </>
  );
};

export default Home;