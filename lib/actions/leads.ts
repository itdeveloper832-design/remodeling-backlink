import { Lead } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, doc, updateDoc, deleteDoc, getDocs, query, orderBy, limit, addDoc } from "firebase/firestore";

// The frontend forms already use addDoc, but we keep this here in case it's used elsewhere.
export async function createLead(
  data: Omit<Lead, "id" | "createdAt" | "status">
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      ...data,
      status: "new",
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateLeadStatus(
  id: string,
  status: Lead["status"]
): Promise<{ success: boolean; error?: string }> {
  try {
    const leadRef = doc(db, "leads", id);
    await updateDoc(leadRef, { status });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteLead(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const leadRef = doc(db, "leads", id);
    await deleteDoc(leadRef);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Keeping these for legacy/server components if needed, though real-time is preferred on client
export async function getLeads(): Promise<Lead[]> {
  try {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
  } catch (error) {
    return [];
  }
}

export const getAllLeads = getLeads;

export async function getLeadsCount(): Promise<number> {
  const leads = await getLeads();
  return leads.length;
}

export async function getRecentLeads(maxLeads: number = 5): Promise<Lead[]> {
  try {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(maxLeads));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
  } catch (error) {
    return [];
  }
}
