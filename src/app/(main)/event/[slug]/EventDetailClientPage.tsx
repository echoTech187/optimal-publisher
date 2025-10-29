// src/app/(main)/event/[slug]/EventDetailClientPage.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchEventDetail, fetchUserEventTransaction } from "@/features/event/data";
import { EventNews } from "@/types/program";
import Image from "next/image"; // Assuming Image is used
import { getImageUrl } from "@/lib/utils/image";
import { Icon } from "@iconify/react";
import { getSession } from "@/features/auth/session";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

interface EventDetailClientPageProps {
  initialEvent: EventNews | null;
  slug: string;
}

export default function EventDetailClientPage({ initialEvent, slug }: EventDetailClientPageProps) {
  const [event, setEvent] = useState<EventNews | null>(initialEvent);
  const [eventRegistered, setEventRegistered] = useState(true);
  const [loading, setLoading] = useState(!initialEvent);
  const [userSession, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // if (!initialEvent) {

    getAuthData();

    getEventDetail();
    // }
  }, [initialEvent, slug]);
  async function getAuthData() {
    const session = await getSession();
    setUser(session);
  }
  async function getEventDetail() {
    setLoading(true);
    try {
      const eventData = await fetchEventDetail(slug);
      const userEventData = await fetchUserEventTransaction(slug);
      setEvent(eventData);
      setEventRegistered(userEventData);
    } catch (error) {
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }

  const handleRegistration = () => {
    if (!event) return;
    const registrationUrl = userSession?.full_name ? `/event/${event.slug}/payment` : `/signin?redirectedFrom=${encodeURIComponent(`/event/${event.slug}/payment`)}`;
    router.push(registrationUrl);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!event) {
    return <div>Event not found.</div>;
  }
  return (
    <div className="container mx-auto my-[100px] p-4">
      <div className="flex max-sm:flex-col justify-between w-full gap-12">
        <Image priority={true} alt={event.title} src={getImageUrl(event.image)} width={0} height={0} className="max-sm:size-full size-1/3 object-cover mb-4" />
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="mb-8">
            <span className="max-sm:text-xl max-xl:text-3xl text-4xl font-bold text-fuchsia-800">
              <p className="text-sm font-semibold mb-1 text-gray-600">Biaya Pendaftaran</p>
              {(parseInt(event.registration_cost as string) > 0) ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }).format(parseInt(event.registration_cost as string)) : "Gratis"}
            </span>
          </div>
          <button
            onClick={handleRegistration}
            className={`disabled:bg-fuchsia-200 disabled:text-black/50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3 w-full md:w-auto rounded-md bg-fuchsia-800 px-4 py-3 mb-8 text-lg font-semibold text-white  hover:bg-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:ring-offset-2 transition-colors duration-300`}
            disabled={eventRegistered}
          >
            {
              eventRegistered ? (
                <Icon icon="material-symbols:check-circle-outline-rounded" width={24} height={24} />
              ) : (
                <></>
              )
            }
            <span className="max-sm:text-sm">{eventRegistered ? "Sudah Terdaftar" : "Bergabung"} </span>
            {
              eventRegistered ? (
                <></>
              ) : (
                <Icon icon="material-symbols:arrow-right-alt-rounded" width={24} height={24} />
              )
            }
          </button>

          <div className="html_content max-sm:text-xs" dangerouslySetInnerHTML={{ __html: event.description }}></div>
        </div>
        {/* Add more event details as needed */}
      </div>
    </div>
  );
}