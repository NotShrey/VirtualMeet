'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);

  const {user} = useUser();// from clerk
 
  const client = useStreamVideoClient();

  if(!client ||!user){
    try {
      const id = crypto.randomUUID;// gobal property that allows us to create random IDs

      const call = client?.call('default',id)
    } catch (error) {
      console.log(error);
      
    }
  }

  const createMeeting = () =>{
    
  } 

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />

      <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        />
      </section>
  )
}

export default MeetingTypeList
