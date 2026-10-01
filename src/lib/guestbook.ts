import "server-only";
import { getPrisma } from "./db";

export type PublicNote = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

/** Approved guestbook rows only. `available` is false when the database is missing or down. */
export async function getApprovedNotes(): Promise<{ available: boolean; notes: PublicNote[] }> {
  const prisma = getPrisma();
  if (!prisma) return { available: false, notes: [] };

  try {
    const notes = await prisma.note.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 24,
      select: { id: true, name: true, message: true, createdAt: true },
    });

    return {
      available: true,
      notes: notes.map((note) => ({
        id: note.id,
        name: note.name,
        message: note.message,
        createdAt: note.createdAt.toISOString(),
      })),
    };
  } catch {
    return { available: false, notes: [] };
  }
}
