<?php

namespace App\Http\Controllers;

use App\Models\ClassModel;

class ClassController extends Controller
{
    public function index()
    {
        $classes = ClassModel::all();
        return response()->json($classes);
    }
}
