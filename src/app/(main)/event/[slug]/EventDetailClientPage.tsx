// src/app/(main)/event/[slug]/EventDetailClientPage.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchEventDetail } from "@/features/event/data";
import { EventNews } from "@/types/program";
import Image from "next/image"; // Assuming Image is used
import { getImageUrl } from "@/lib/utils/image";
import { Icon } from "@iconify/react";

interface EventDetailClientPageProps {
  initialEvent: EventNews | null;
  slug: string;
}

export default function EventDetailClientPage({ initialEvent, slug }: EventDetailClientPageProps) {
  const [event, setEvent] = useState<EventNews | null>(initialEvent);
  const [loading, setLoading] = useState(!initialEvent);

  useEffect(() => {
    if (!initialEvent) {
      async function getEventDetail() {
        setLoading(true);
        try {
          const eventData = await fetchEventDetail(slug);
          setEvent(eventData);
        } catch (error) {
          setEvent(null);
        } finally {
          setLoading(false);
        }
      }
      getEventDetail();
    }
  }, [initialEvent, slug]);

  if (loading) {
    return <div>Loading event details...</div>;
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
              {(parseInt(event.registration_cost as string) > 0) ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 , maximumFractionDigits: 0, useGrouping: true }).format(parseInt(event.registration_cost as string)) : 'Gratis'}
            </span>
          </div>
          <a
            href={`/event/${event.slug}/payment`}
            target="_parent"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full md:w-auto rounded-md bg-fuchsia-800 px-4 py-3 mb-8 text-lg font-semibold text-white shadow-sm hover:bg-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:ring-offset-2 transition-colors duration-300"
          >
            <span className="max-sm:text-sm">Bergabung </span>
            <Icon icon="material-symbols:arrow-right-alt-rounded" width={24} height={24} />
          </a>

          <div className="html_content" dangerouslySetInnerHTML={{ __html: event.description }}></div>
        </div>
        {/* Add more event details as needed */}
      </div>
    </div>
  );
}