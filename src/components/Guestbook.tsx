
import React from 'react';

const Guestbook = () => (
    <div className="bg-win-gray w-full h-full p-4 text-black">
        <h2 className="text-2xl mb-4">Guestbook</h2>
        <p className="mb-4">Leave a message!</p>
        <form className="space-y-4">
            <div>
                <label htmlFor="name" className="block">Name:</label>
                <input type="text" id="name" className="w-full border-inset p-1 bg-white" />
            </div>
            <div>
                <label htmlFor="message" className="block">Message:</label>
                <textarea id="message" rows={4} className="w-full border-inset p-1 bg-white"></textarea>
            </div>
            <button type="submit" className="border-outset bg-win-gray px-4 py-1 active:border-inset">
                Sign
            </button>
        </form>
        <p className="mt-6 text-sm">
            Note: This is a frontend-only prototype. To make this functional, you can connect it to a backend service like Supabase using the integration!
        </p>
    </div>
);

export default Guestbook;
