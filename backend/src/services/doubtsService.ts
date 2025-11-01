import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Doubt, Reply, Database } from '../models/types';

const dbPath = path.join(__dirname, '../data/db.json');
const adapter = new JSONFile<Database>(dbPath);
const db = new Low<Database>(adapter, { doubts: [] });

export class DoubtsService {
  async init() {
    await db.read();
    db.data ||= { doubts: [] };
  }

  async getAllDoubts(): Promise<Doubt[]> {
    await db.read();
    return db.data.doubts;
  }

  async createDoubt(data: Omit<Doubt, 'id' | 'replies' | 'resolved' | 'createdAt'>): Promise<Doubt> {
    await db.read();
    const doubt: Doubt = {
      id: uuidv4(),
      ...data,
      replies: [],
      resolved: false,
      createdAt: new Date().toISOString(),
    };
    db.data.doubts.push(doubt);
    await db.write();
    return doubt;
  }

  async addReply(doubtId: string, message: string, repliedBy: string): Promise<Doubt | null> {
    await db.read();
    const doubt = db.data.doubts.find(d => d.id === doubtId);
    if (!doubt) return null;
    if (doubt.resolved) throw new Error('Cannot reply to resolved doubt');

    const reply: Reply = {
      id: uuidv4(),
      message,
      repliedBy,
      createdAt: new Date().toISOString(),
    };
    doubt.replies.push(reply);
    await db.write();
    return doubt;
  }

  async resolveDoubt(doubtId: string): Promise<Doubt | null> {
    await db.read();
    const doubt = db.data.doubts.find(d => d.id === doubtId);
    if (!doubt) return null;
    doubt.resolved = true;
    await db.write();
    return doubt;
  }
}

export const doubtsService = new DoubtsService();
