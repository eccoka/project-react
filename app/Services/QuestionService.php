<?php

namespace App\Services;

use App\Http\Resources\SurveyResource;
use App\Models\Question;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuestionService
{
    public function findQuestions(int $surveyId){
        return Question::query()->where('survey_id', $surveyId)->orderBy('question_pos')->get();
    }
    public function findSurvey(int $surveyId)
    {
        $survey = Survey::query()->where('id', '=', $surveyId)->first();
        $surveyNew = new SurveyResource($survey);

        return $surveyNew;
    }
    public function storeQuestion(Request $request){

        $pos = count(DB::table('questions')->where('survey_id', '=', $request->surveyId)->get());

        $question = new Question;
        $question->survey_id = $request->surveyId;
        if($pos == 0)
        {
            $question->question_pos = 0;
        } else {
            $question->question_pos = $pos;
        }
        $question->question = $request->question;

        if(!isset($request->answer_type)) {
            $question->answer_type = "0";
        } else {
            $question->answer_type = $request->answer_type;
        }
        if(($request->answer_type === "1") || ($request->answer_type === "4")){

            $answerFull = implode(' || ', $request->answers);

            $question->answer = $answerFull;
            $question->extra_field = $request->extra_field;
            if ($request->extra_field === "yes"){
                $question->label_for_extra = $request->label_for_extra;
            } else {
                $question->label_for_extra = "";
            }
        } else {
            $question->answer = "";
            $question->extra_field = "no";
            $question->label_for_extra = "";
        }

        $question->updated_by = $request->userId;
        $question->created_at = now();
        $question->updated_at = now();

        try {
            $question->save();
        } catch (\Exception $e) {
            Log::error('Delete question error: ' . $e->getMessage());
            return back()->withErrors(['Delete' => 'Error by delete question']);
        }

        $surveyNew = $this->findSurvey($request->surveyId);

        return $surveyNew;
    }

    public function updateQuestion(Request $request)
    {
        if ($request->extra_field === 'no')
        {
            $label_for_extra = '';
        } else {
            $label_for_extra = $request->label_for_extra;
        }
        if ($request->answers){
            $fullAnswer = implode(' || ', $request->answers);

        } else {
            $fullAnswer = '';
        }

        DB::table('questions')
            ->where('id', $request->id)
            ->update([
                'question_pos' => $request->question_pos,
                'question' => $request->question,
                'answer_type' => $request->answer_type,
                'answer' => $fullAnswer,
                'extra_field' => $request->extra_field,
                'label_for_extra' => $label_for_extra,
                'updated_by' => $request->userId,
                'updated_at' => now(),
            ]);

        $survey_id = Question::query()->where('id', $request->id)->first();

        DB::table('surveys')
            ->where('id', $survey_id)
            ->update([
                'updated_by' => $request->userId,
                'updated_at' => now(),
            ]);

        $questions = $this->findQuestions($survey_id);
        $survey = Survey::query()->where('id', $survey_id)->first();

        return ([
            "survey" => $survey,
            "questions" => $questions,
        ]);
    }

    public function deleteQuestion(Question $question){
        try {
            $deleteQuestion = $question->delete();
        } catch (\Exception $e) {
            Log::error('Delete question error: ' . $e->getMessage());
            return back()->withErrors(['Delete' => 'Error by delete question']);
        }
        return $deleteQuestion;
    }
}
