import { useState, useEffect } from 'react';
import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Proposal {
    id: string;
    title: string;
    content: string;
    targetPage: string;
    selector?: string;
    createdAt: any;
    authorEmail?: string;
}

const COLLECTION_NAME = 'proposals';

export const useProposals = () => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const proposalsData: Proposal[] = [];
            snapshot.forEach((doc) => {
                proposalsData.push({ id: doc.id, ...doc.data() } as Proposal);
            });
            setProposals(proposalsData);
            setLoading(false);
        }, (error) => {
            console.error("Firestore Error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addProposal = async (proposal: Omit<Proposal, 'id' | 'createdAt'>) => {
        if (!db) return;
        try {
            await addDoc(collection(db, COLLECTION_NAME), {
                ...proposal,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error adding proposal:", error);
        }
    };

    const removeProposal = async (id: string) => {
        if (!db) return;
        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
        } catch (error) {
            console.error("Error removing proposal:", error);
        }
    };

    return {
        proposals,
        addProposal,
        removeProposal,
        loading
    };
};
