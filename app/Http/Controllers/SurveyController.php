<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Services\SurveyService;
use Illuminate\Support\Facades\Redirect;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Survey::query()->get();

        if (!session('fail')) {
            return inertia("survey/index", [
                "surveys" => SurveyResource::collection($query),
                'success' => session('success')
            ]);
        } else {
            return inertia("survey/index", [
                "surveys" => SurveyResource::collection($query),
                'fail' => session('fail')
            ]);
        }
    }
    /**
     * Display the create form
     */
    public function create()
    {
        return inertia("Survey/Create", [
            'error' => session('error')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        session()->put('error', null);
        $surveyNew = (new SurveyService())->storeSurvey($request);

        if (session('error') === null) {
            return inertia("Survey/QuestionCreate", [
                'survey' => $surveyNew,
            ]);
        } else {
            return inertia("Survey/Create")->with('error', 'Survey title must be uniq!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey)
    {
        $questions = (new SurveyService())->findQuestions($survey->id);
        $survey = new SurveyResource($survey);

        if (!session('fail')) {
            return inertia("Survey/Show", [
                "survey" => $survey,
                "questions" => QuestionResource::collection($questions),
                "success" => session('success'),
            ]);
        } else {
            return inertia("Survey/Show", [
                "survey" => $survey,
                "questions" => QuestionResource::collection($questions),
                "fail" => session('fail'),
            ]);
        }
    }

    /**
     * ShowKiertekelt the form for editing the specified resource.
     */
    public function edit(Survey $survey)
    {
        return inertia("Survey/Edit", [
            "survey" => $survey,
            "error" => session('error'),
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request)
    {
        $surveyNew = (new SurveyService())->updateSurvey($request);
        $questions = (new SurveyService())->findQuestions($request->surveyId);

        if (is_array($surveyNew) !== true){
            $surveyTitle = $request->title;
            return inertia("Survey/Show", [
                "survey" => $surveyNew,
                "questions" => QuestionResource::collection($questions),
            ])->with('success', "Survey \"$surveyTitle\" was updated!");
        } else {

            return to_route("survey.edit", [
                "survey" => $surveyNew[0],
            ])->with('error', "Title is not unique.");
        }
    }

    /**
     * Remove the specified resource from storage.
     */

    function destroy(Survey $survey)
    {
        $surveyTitle = $survey->title;

        $deleted = (new SurveyService())->destroySurvey($survey);

        if ($deleted === true) {
            return to_route("survey.index")->with('success', "Survey \"$surveyTitle\" was deleted!");
        } else {
            return to_route("survey.index")->with('fail', "Survey \"$surveyTitle\" was not deleted!");
        }

    }
}
