<?php
declare(strict_types=1);

namespace App\Services;

use App\Http\Requests\StoreItemparamRequest;

use App\Models\Itemparam;
use App\Models\Itemgroup;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;


class ItemparamService
{
    public function create(): array
    {
        $itemparam = new Itemparam();
        return [
            'itemparam' => $itemparam,
        ];
    }
    public function store(StoreItemparamRequest $request): Itemparam|RedirectResponse
    {
        $request->validated();
        $van = null;

        // Implement the logic to store item parameters
        // This could involve validating the request, creating a new Itemparam instance,
        // and saving it to the database.
        //dd($request->sub2groupId, $request->subgroupId, $request->maingroupId);
        $itemparam = new Itemparam();
        if ($request->sub2groupId != null) {
            $itemparam->groupid = $request->sub2groupId;
        }
        if ($request->sub2groupId == null && $request->subgroupId != null) {
            $itemparam->groupid = $request->subgroupId;
        }
        if ($request->sub2groupId == null && $request->subgroupId == null) {
            $itemparam->groupid = $request->maingroupId;
        }

        $van = Itemparam::query()->where('groupid', $itemparam->groupid)
            ->where('param_name', $request->param_name)
            ->where('value', $request->value)
            ->exists();
        /* 
                if ($van!== null) {
                    return redirect()->route('itemgroup.create')->with(
                        'error', 'This parameter already exists for the selected group.'
                    );
                } 
         */

        if ($van) {
            if ($request->from === 'index') {
                return redirect()->route('itemparam.index')->with(
                    'error',
                    'This parameter already exists for the selected group.'
                );
            } else {
                return redirect()->route('itemparam.create')->with(
                    'error',
                    'This parameter already exists for the selected group.'
                );
            }
        }

        $itemparam->param_name = $request->input('param_name');
        $itemparam->value = $request->input('value');
        $itemparam->status = $request->input('status');
        $itemparam->created_by = auth()->id(); // Assuming you have user authentication set up
        $itemparam->created_at = now()->addHours(2); // Set the current timestamp
        $itemparam->save();

        return $itemparam;
    }
}