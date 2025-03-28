import React from 'react'
import RequestItem from './RequestItem'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useRequests } from '@/hooks/useRequest';
import RequestChart from './RequestChart';
import TelemetryChart from './TelemtryChart';

const LastRequests = () => {
  return (
    <div className='w-full h-full'>
      <h2 className='font-bold'>آخرین درخواست ها</h2>
      {/* <div className='w-full h-full flex flex-col mt-4 overflow-y-auto'>
         {data.map((request: any) => (
            <RequestItem key={request.id}/>
         ))}
      </div> */}

      {/* <RequestChart /> */}
      {/* <TelemetryChart /> */}
    </div>
  )
}

export default LastRequests