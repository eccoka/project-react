<?php

namespace App\Http\Controllers;

use App\Models\Itemparam;
use App\Models\Itemgroup;
use App\Http\Resources\ItemgroupResource;
use App\Http\Requests\StoreItemparamRequest;
use App\Services\ItemparamService;
use Illuminate\Http\Request;

class ItemparamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('itemparam/index', [
            'itemgroups' => ItemgroupResource::collection(Itemgroup::query()->orderBy('position')->get()),
            'itemparams' => Itemparam::query()->where('status', 'active')->orderBy('param_name')->get(),
            'selectedGroups' => [
                'maingroupId' => (string) $request->query('maingroupId', ''),
                'subgroupId' => (string) $request->query('subgroupId', ''),
                'sub2groupId' => (string) $request->query('sub2groupId', ''),
            ],
            'error' => session('error'),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Itemparam/Create', [
            'itemparam' => new Itemparam(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemparamRequest $request)
    {
        $itemparam = (new ItemparamService())->store($request);

        if ($itemparam instanceof Itemparam) {
            return redirect()->route('itemparam.index', array_filter([
                'maingroupId' => $request->input('maingroupId'),
                'subgroupId' => $request->input('subgroupId'),
                'sub2groupId' => $request->input('sub2groupId'),
            ]))->with(
                'success',
                $itemparam->param_name . ' parameter value created successfully.',
            );
        }

        return $itemparam;
    }

    /**
     * Display the specified resource.
     */
    public function show(Itemparam $itemparam)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Itemparam $itemparam)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Itemparam $itemparam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Itemparam $itemparam)
    {
        //
    }
}
