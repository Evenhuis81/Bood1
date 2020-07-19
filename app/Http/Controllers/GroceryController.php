<?php

namespace App\Http\Controllers;

use App\Grocery;
use Illuminate\Http\Request;

class GroceryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groceries = Grocery::all();
        return response()->json($groceries);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $deletes = $request->input('deletes');
        $amounts = $request->input('amounts');
        if (count($deletes)) $this->deleteGroceries($deletes);
        if (count($amounts)) $this->updateGroceries($amounts);
    }

    /**
     * Remove the specified resource(s) from storage.
     *
     * @param  GroceryIds(array)
     * @return 
     */
    public function deleteGroceries($deletes)
    {
        Grocery::destroy($deletes);
    }

    /**
     * Remove the specified resource(s) from storage.
     *
     * @param  GroceryIds(array)
     * @return 
     */
    public function updateGroceries($amounts)
    {
        // dd($amounts);
        foreach ($amounts as $id => $amount) {
            $grocery = Grocery::find($amount['id']);
            $grocery->amount = $amount['amount'];
            $grocery->save();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Grocery  $grocery
     * @return \Illuminate\Http\Response
     */
    public function show(Grocery $grocery)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Grocery  $grocery
     * @return \Illuminate\Http\Response
     */
    public function edit(Grocery $grocery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Grocery  $grocery
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Grocery $grocery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Grocery  $grocery
     * @return \Illuminate\Http\Response
     */
    public function destroy(Grocery $grocery)
    {
        //
    }
}
