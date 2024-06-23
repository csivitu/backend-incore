'use server'

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function updateDescription(description: string) {
  const session = await auth()
  if (!session) return
  const email = session.user?.email as string

  await prisma.user.update({
    where: {
      email: email
    },
    data: {
      description: description as string
    }
  })
}