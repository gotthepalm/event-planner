import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { requireDb } from "@/lib/firebase";
import type { EventFormValues, EventImportance, PlannerEvent } from "@/types/event";

const EVENTS_COLLECTION = "events";

function toDate(value: unknown): Date | null {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  return null;
}

function mapEventSnapshot(snapshot: QueryDocumentSnapshot<DocumentData>): PlannerEvent {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    ownerId: String(data.ownerId),
    title: String(data.title ?? ""),
    dateTime: toDate(data.dateTime) ?? new Date(),
    description: String(data.description ?? ""),
    importance: (data.importance ?? "normal") as EventImportance,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export function subscribeToUserEvents(
  ownerId: string,
  onNext: (events: PlannerEvent[]) => void,
  onError: (error: Error) => void,
) {
  const eventsQuery = query(
    collection(requireDb(), EVENTS_COLLECTION),
    where("ownerId", "==", ownerId),
    orderBy("dateTime", "asc"),
  );

  return onSnapshot(
    eventsQuery,
    (snapshot) => {
      onNext(snapshot.docs.map(mapEventSnapshot));
    },
    (error) => onError(error),
  );
}

export async function createEvent(ownerId: string, values: EventFormValues) {
  await addDoc(collection(requireDb(), EVENTS_COLLECTION), {
    ownerId,
    title: values.title.trim(),
    dateTime: Timestamp.fromDate(values.dateTime),
    description: values.description.trim(),
    importance: values.importance,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateEvent(eventId: string, values: EventFormValues) {
  await updateDoc(doc(requireDb(), EVENTS_COLLECTION, eventId), {
    title: values.title.trim(),
    dateTime: Timestamp.fromDate(values.dateTime),
    description: values.description.trim(),
    importance: values.importance,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteEvent(eventId: string) {
  await deleteDoc(doc(requireDb(), EVENTS_COLLECTION, eventId));
}
