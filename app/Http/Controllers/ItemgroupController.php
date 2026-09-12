<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ItemgroupResource;
use App\Models\Itemgroup;
use App\Http\Requests\StoreItemgroupRequest;
use App\Http\Requests\UpdateItemgroupRequest;
use App\Services\ItemgroupService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;


class ItemgroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $itemgroups = (new ItemgroupService())->index();


        if (session('error') !== null) {
            return inertia('itemgroup/index', [
                "itemgroups" => ItemgroupResource::collection($itemgroups->values()),
                "error" => session('error'),
            ]);
        }
        elseif (session('success') !== null) {
            return inertia('itemgroup/index', [
                "itemgroups" => ItemgroupResource::collection($itemgroups->values()),
                "success" => session('success'),
            ]);
        } else {
            return inertia("itemgroup/index", [
                "itemgroups" => ItemgroupResource::collection($itemgroups->values()),
            ]);
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $itemgroups = (new ItemgroupService())->index();

        return inertia("itemgroup/create", [
            "itemgroups" => ItemgroupResource::collection($itemgroups->values()),
            "error" => session('error'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemgroupRequest $request)
    {
        $itemgroup = (new ItemgroupService())->store($request);
        
        if (session('error') !== null) {
            return redirect()->route('itemgroup.create')->with('error', session('error'));
        } else {
            return redirect()->route('itemgroup.index')->with('success', $itemgroup->name . " itemgroup created successfully");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Itemgroup $itemgroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Itemgroup $itemgroup)
    {
        
        $itemgroup = (new ItemgroupService())->edit($itemgroup);
        $itemgroups = (new ItemgroupService())->index();

        return inertia("itemgroup/edit", [
            "itemgroup" => $itemgroup,
            "groups" => ItemgroupResource::collection($itemgroups->values()),
            "error" => session('error'),
            "success" => session('success')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemgroupRequest $request, Itemgroup $itemgroup)
    {
        $item_group = (new ItemgroupService())->update($request, $itemgroup);
     
 
        if (session("error") === null) {
            return redirect()->route('itemgroup.edit', $itemgroup)->with('success', $item_group->name . " itemgroup updated successfully");
        } else {  
            return redirect()->route('itemgroup.edit', $request->id)->with('error', session('error'));
        }   
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Itemgroup $itemgroup)
    {
        $itemgroupName = $itemgroup->name;
        (new ItemgroupService())->destroy($itemgroup);

        return redirect()->route('itemgroup.index')->with('success', $itemgroupName . " itemgroup deleted successfully");
    }
}
