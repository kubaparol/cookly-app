import { WebhookEvent, clerkClient } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

import { CreateUserParams, UpdateUserParams, createUser, deleteUser, updateUser } from '@/db';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    const user: CreateUserParams = {
      clerkId: id,
      email: email_addresses[0].email_address,
      firstName: first_name || '',
      lastName: last_name || '',
      imageUrl: image_url,
    };

    const newUser = await createUser(user);

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: 'OK', user: newUser });
  }

  if (eventType === 'user.updated') {
    const { id, image_url, first_name, last_name } = evt.data;

    const user: UpdateUserParams = {
      firstName: first_name || '',
      lastName: last_name || '',
      imageUrl: image_url,
    };

    const updatedUser = await updateUser(id, user);

    return NextResponse.json({ message: 'OK', user: updatedUser });
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    const deletedUser = await deleteUser(id!);

    return NextResponse.json({ message: 'OK', user: deletedUser });
  }

  return new Response('', { status: 200 });
}
