'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export type StaffState = {
  loading: boolean;
  user: User | null;
  role: 'admin' | 'editor' | null;
  roleError: string | null;
};

/** Session administrateur/éditeur : session Supabase + rôle issu de public.profiles. */
export function useStaffSession(): StaffState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const [role, setRole] = useState<'admin' | 'editor' | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);
  const [roleLoadedFor, setRoleLoadedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setRoleLoadedFor(null);
      return;
    }
    if (roleLoadedFor === user.id) return;
    let active = true;
    supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setRoleError(error.message);
        else setRole((data?.role as 'admin' | 'editor' | null) ?? null);
        setRoleLoadedFor(user.id);
      });
    return () => {
      active = false;
    };
  }, [user, roleLoadedFor]);

  return { loading: loading || (Boolean(user) && roleLoadedFor !== user?.id), user, role, roleError };
}

export async function signOut() {
  await supabase.auth.signOut();
}
