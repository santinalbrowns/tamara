import { prisma } from '$lib/database.js'
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load = (async () => {
    return {
        doctor: await prisma.doctor.findMany()
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
            const doctor = await prisma.doctor.create({
                data: {
                    name: name,
                    age: Number.parseInt(age),
                    gender: gender
                }
            });
        } catch (error) {
            console.log(error);
        }

        throw redirect(301, '/doctors');
    },
    delete: async ({ request }) => {
        const data = await request.formData();

        const id = data.get('id')?.toString();

        if (!id) {
            return fail(400, { invalid: true });
        }

        await prisma.doctor.delete({
            where: { id: id }
        });

        throw redirect(302, '/doctors');
    }
}