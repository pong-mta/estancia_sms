<?php

namespace App\Http\Controllers\Contacts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $contacts = Contact::where('user_id', Auth::id())
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('mobile', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('company', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('contacts/Index', [
            'contacts' => $contacts,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    // Store or Add Contacts
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'max:255'],
            'last_name'  => ['nullable', 'max:255'],
            'mobile'     => ['required', 'max:11', 'min:11', 'unique:contacts'],
            'email'      => ['nullable', 'email'],
            'company'    => ['nullable', 'max:255'],
            'address'    => ['nullable'],
            'birthday'   => ['nullable', 'date'],
            'status'     => ['required', 'in:active,inactive'],
        ]);

        auth()->user()->contacts()->create($validated);

        return back()->with('success', 'Contact added successfully.');
    }

    // Edit
    public function update(Request $request, Contact $contact)
    {
        abort_if($contact->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'first_name' => ['required', 'max:255'],
            'last_name'  => ['nullable', 'max:255'],
            'mobile'     => ['required', 'max:20'],
            'email'      => ['nullable', 'email'],
            'company'    => ['nullable', 'max:255'],
            'address'    => ['nullable'],
            'birthday'   => ['nullable', 'date'],
            'status'     => ['required', 'in:active,inactive'],
        ]);

        $contact->update($validated);

        return back()->with('success', 'Contact updated successfully.');
    }

    //Delete
    public function destroy(Contact $contact)
    {
        abort_if($contact->user_id !== auth()->id(), 403);

        $contact->delete();

        return back()->with('success', 'Contact deleted successfully.');
    }
}
