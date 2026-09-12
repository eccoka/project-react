<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Models\Question;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Services\QuestionService;


class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Question $question)
    {
        dd($question);
    }

    /**
     * ShowKiertekelt the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuestionRequest $request)
    {
        $survey = (new QuestionService())->storeQuestion($request);

        return to_route("survey.show", [
            "survey" => $survey,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {

        $survey = (new QuestionService())->findSurvey($id);
        $questions = (new QuestionService())->findQuestions($id);

        return inertia("Survey/QuestionShow", [
            "survey" => $survey,
            "questions" => QuestionResource::collection($questions),
        ]);
    }

    /**
     * ShowKiertekelt the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        return inertia("Survey/QuestionEdit", [
            "question" => $question,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuestionRequest $request)
    {
        $updated = (new QuestionService())->updateQuestion($request);

        $question = $request->question;

        return inertia("Survey/Show", [
            "survey" => $updated['survey'],
            "questions" => QuestionResource::collection($updated['questions']),
        ])->with('success', "Survey \"$question\" was updated!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        $theQuestion = $question->question;
        $survey = (new QuestionService())->findSurvey($question->survey_id);
        $deletedQuestion = (new QuestionService())->deleteQuestion($question);

        if ($deletedQuestion === true) {
            return to_route("survey.show", [
                "survey" => $survey,
            ])->with('success', "Survey \"$theQuestion\" was deleted!");
        } else {
            return to_route("survey.show", [
                "survey" => $survey,
            ])->with('fail', "Survey \"$theQuestion\" was not deleted!");
        }
    }
}
