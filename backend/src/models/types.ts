export interface Reply {
  id: string;
  message: string;
  repliedBy: string;
  createdAt: string;
}

export interface Doubt {
  id: string;
  title: string;
  description: string;
  subject: "Maths" | "Science" | "English" | "Social Science";
  createdBy: string;
  replies: Reply[];
  resolved: boolean;
  createdAt: string;
}

export interface Database {
  doubts: Doubt[];
}
