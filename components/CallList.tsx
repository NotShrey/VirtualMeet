'use client';// as we are using hooks

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import Loader from './Loader';
import { useGetCalls } from '@/hooks/useGetCalls';
// import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const router = useRouter();
    const { endedCalls, upcomingCalls, callRecordings, isLoading } =
      useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
          case 'ended':
            return endedCalls;
          case 'recordings':
            return recordings;
          case 'upcoming':
            return upcomingCalls;
          default:
            return [];
        }
      };

      const getNoCallsMessage = () => {
        switch (type) {
          case 'ended':
            return 'No Previous Calls';
          case 'upcoming':
            return 'No Upcoming Calls';
          case 'recordings':
            return 'No Recordings';
          default:
            return '';
        }
      };
      const calls = getCalls();
      const NoCallsMessage =getNoCallsMessage();


  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
    {calls && calls.length > 0 ? (
      calls.map((meeting: Call | CallRecording) => (
        <MeetingCard/>
      ))}
    </div>
  )
}

export default CallList
