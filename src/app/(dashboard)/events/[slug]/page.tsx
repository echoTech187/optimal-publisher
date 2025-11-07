// src/app/(main)/event/[slug]/page.tsx

import { fetchEventDetail } from "@/features/event/data";
import { EventNews } from "@/types/program";
import EventDetailClientPage from "./EventDetailClientPage";

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;



  // Fetch data on the server
  let event: EventNews | null = null;
  try {
    event = await fetchEventDetail(slug);
  } catch (error) {
    console.error("Failed to fetch event details on server:", error);
  }


  return <EventDetailClientPage initialEvent={event} slug={slug} />;
}