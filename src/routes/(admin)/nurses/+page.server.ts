//LETS CALL THE DAAAAAAAAAATABAAAAAAAAAAAAAAAAAAAAAAAASE

import { prisma } from '$lib/database.js'
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load = (async () => {
    return {
        nurses: await prisma.user.findMany(
            { where: { role: "nurse" } }
        ),
    }
}) satisfies PageServerLoad;

export const actions = {
    add: async ({ request }) => {
        const data = await request.formData();

        const name = data.get('name')?.toString()
        const age = data.get('age')?.toString()
        const gender = data.get('gender')?.toString()

        if (!name || !age || !gender) {
            return fail(400, { invalid: true });
        }

        try {
            const nurse = await prisma.user.create({
                data: {
                    email: "",
                    age: Number.parseInt(age),
                    gender: gender,
                    role: "nurse",
                    password: "password"
                }
            });
        } catch (error) {
            console.log(error);
        }

        throw redirect(301, '/nurses');
    },
    delete: async ({ request }) => {
        const data = await request.formData();

        const id = data.get('id')?.toString();

        if (!id) {
            return fail(400, { invalid: true });
        }

        await prisma.user.delete({
            where: { id: Number.parseInt(id) }
        });

        throw redirect(302, '/nurses');
    }
}