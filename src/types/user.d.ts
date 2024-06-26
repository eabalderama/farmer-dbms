import { getWorkers } from "@/actions/user";

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

type TUserRow = {
  user_id: number;
  email: string;
  name: string;
  assigned_farmers: number;
  created_at: Date;
};

type Users = ThenArg<ReturnType<typeof getWorkers>>;
