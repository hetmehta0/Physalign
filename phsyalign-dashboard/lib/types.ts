export type Exercise = {
  id?: number;
  name: string;
  sets: number;
  reps: number;
  notes: string;
  lastModified?: string;
};

export type Program = {
  id: string;
  physio_id: string;
  access_code: string;
  patient_name: string | null;
  exercises: Exercise[];
  notes: string | null;
  created_at: string;
  updated_at: string;
  last_accessed: string | null;
  expires_at: string | null;
};
