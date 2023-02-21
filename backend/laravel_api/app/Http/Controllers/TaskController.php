<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Task;
use App\Models\TaskCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Task::selectRaw('tasks.*')->with('categories:task_id,name')->where('user_id', auth()->id())->orderBy('id', 'desc')->get();
        
        return response()->json([
            'status' => "OK",
            "data" => $data
        ]);
        
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
        $validated = $request->validate([
            'title' => 'required|max:100',
            'description' => 'required|max:255',
            'due_date' => 'required|date',
            'categories' => 'required|array'
        ]);
        $validated['user_id'] = auth()->id();
        try{
            DB::transaction(function() use($validated){
                $categories =  $validated['categories'];
                unset($validated['categories']);

                $task = Task::create($validated);
                // dd($task->id);\
                $insert = [];
                foreach($categories as $cat)
                {
                    $find = Category::selectRaw('id')->where('name', $cat['name'])->first();
                    $insert[] = [
                        'category_id' => $find->id,
                        'task_id' => $task->id,
                        'created_at' => now()->toDateTimeString()
                    ];
                }
                // dd($insert);
                TaskCategory::insert($insert);
            });
        }catch(\Throwable $th){
        }

        return response()->json([
            'status' => "ok",
            "message" => "Created Succesfuly",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Task::selectRaw('tasks.*')->with('categories:task_id,name')->where('id', $id)->get();
        
        return response()->json([
            "status" => 'OK',
            "data" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|max:100',
            'description' => 'required|max:255',
            'due_date' => 'required|date',
            'categories' => 'required|array'
        ]);
        $validated['user_id'] = auth()->id();
        // dd($validated);
        try{
            DB::transaction(function() use($validated, $id){
                $categories =  $validated['categories'];
                unset($validated['categories']);

                Task::where('id', [$id])->update($validated);
                // dd($task->id);
                $insert = [];
                foreach($categories as $cat)
                {
                    $find = Category::selectRaw('id')->where('name', $cat['name'])->first();
                    $insert[] = [
                        'category_id' => $find->id,
                        'task_id' => $id,
                        'created_at' => now()->toDateTimeString()
                    ];
                }
                // dd($insert);
                TaskCategory::where('task_id',[$id])->delete();
                TaskCategory::insert($insert);
            });
        }catch(\Throwable $th){
        }

        return response()->json([
            'status' => "ok",
            "message" => "Updated Succesfuly",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Task::find($id)->delete();

        return response()->json([
            "status" => "Ok",
            "message" => "Deleted Succesfuly"
        ]);
    }
}
