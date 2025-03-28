"use client";

import {
  useMarkAllNotifs,
  useMarkNotif,
  useUnreadNotifs,
} from "@/hooks/useNotifs";
import Link from "next/link";
import React from "react";
import { PuffLoader } from "react-spinners";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const UnreadNotifsList = () => {
  const { data, isLoading, error, refetch } = useUnreadNotifs(10, 0);
  const {
    isLoading: markLoading,
    error: markError,
    refetch: markRefetch,
  } = useMarkAllNotifs();
  const { mutate: markNotif, isPending } = useMarkNotif();

  return (
    <div>
      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <p style={{ color: "red" }}>خطا در دریافت اطلاعات </p>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {data && (
        <div className="w-96 flex flex-col items-center gap-4">
          <div className="w-full flex items-center justify-between">
            <p>اعلان ها</p>
            <button
              className="text-blue-500"
              onClick={() => {
                markRefetch();
                refetch();
              }}
            >
              {markLoading && <PuffLoader color="#3b82f6" size={20} />}
              {!markLoading && <p>علامت زدن همه به عنوان خانده شده</p>}
            </button>
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="w-full space-y-3">
            {data.data.map((notif: any) => (
              <div
                key={notif.id.id}
                className="w-full rounded-md border border-gray-200 p-3 flex items-center justify-between"
              >
                <div className="space-y-2">
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: notif.subject }}
                  ></div>
                  <p className="text-sm">{notif.text}</p>
                </div>
                <button>
                  {!isPending && (
                    <IoIosCheckmarkCircleOutline
                      size={20}
                      onClick={() => {
                        markNotif(notif.id.id);
                        refetch();
                      }}
                    />
                  )}

                  {isPending && <PuffLoader color="#3b82f6" size={20} />}
                </button>
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          <Link href="/sysadmin/notifications" className="text-blue-500">
            مشاهده همه
          </Link>
        </div>
      )}
    </div>
  );
};

export default UnreadNotifsList;
