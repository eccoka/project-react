<?php

namespace App\Services;

use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Question;
use App\Models\Survey;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class SurveyService
{
    public function storeSurvey(StoreSurveyRequest $request)
    {
        $notUnique = count(Survey::query()->where('title', $request->title)->get());
        if ($notUnique !== 0) {
            return back()->with('error', "Title is not unique.");
        } else {
            $data = $request->validated();
            $survey = new Survey;

            $survey->title = $data['title'];
            $survey->description = $request->description;
            $survey->usage = $data['usage'];

            if (!isset($request->image) || $request->image === '2') {
                $survey->image_path = "0";
            }
            if ($request->image === "1" && $request->imageFile !== null) {
                if ($request->file('imageFile')->isValid()) {
                    try {
                        $fileName = $request->file('imageFile')->getClientOriginalName();
                        $path = $request->file('imageFile')->storeAs('img_survey', $fileName, 'public');
                        $url_main = 'http://localhost:8000/storage/';
                        $fullPath = $url_main . $path;
                        $survey->image_path = $fullPath;
                    } catch (\Exception $e) {
                        Log::error('File upload error: ' . $e->getMessage());
                        return back()->withErrors(['error' => 'Error by upload']);
                    }
                }
            }

            $survey->visible = "1";
            $survey->created_by = $request->userId;
            $survey->created_at = now();
            $survey->updated_by = $request->userId;
            $survey->updated_at = now();
            $survey->expire_at = $data['expire_at'];

            $survey->save();
            $surveyNew = Survey::query()->where('id', $survey->id)->first();
            $surveyNews = new SurveyResource($surveyNew);

            return $surveyNews;
        }
    }

    public function updateSurvey(UpdateSurveyRequest $request)
    {
//        dd($request);
        session()->put('error', null);
        $notUnique = count(Survey::query()
                        ->where('title', $request->title)
                        ->where('id', '<>', $request->surveyId)
                        ->get());
//        dd($notUnique);
        if ($notUnique !== 0) {
            $surveyNew = Survey::query()->where('id', $request->surveyId)->first();
            $surveyNews = new SurveyResource($surveyNew);
            return [$surveyNews, $notUnique];
        } else {
            $data = $request->validated();
            if ($request->image === "1") {
                $validator = Validator::make($request->all(), [
                    'imageFile' => 'required|file|mimes:jpg,png|max:2048',
                ]);
                if ($validator->fails()) {
                    return redirect()->back()->with('error', "The type or size of the file to be uploaded is incorrect.");
                }
                if ($request->file('imageFile')->isValid()) {
                    try {
                        $fileName = $request->file('imageFile')->getClientOriginalName();
                        $path = $request->file('imageFile')->storeAs('img_survey', $fileName, 'public');
                        $url_main = 'http://localhost:8000/storage/';
                        $fullPath = $url_main . $path;
                        $image_path = $fullPath;
                    } catch (\Exception $e) {
                        Log::error('File upload error: ' . $e->getMessage());
                        return back()->withErrors(['error' => 'Error by upload']);
                    }
                }
            }
            if ($request->image === "0") {
                $image_path = DB::table('surveys')->where('id', $request->surveyId)->pluck('image_path')->first();
            }
            if ($request->image === "2") {
                $fileName = DB::table('surveys')->where('id', $request->surveyId)->pluck('image_path')->first();
                $sameImageQuery = Survey::query()->where('image_path', $fileName)->get();
                if (count($sameImageQuery) === 1) {
                    $image_delete = explode('storage/', $fileName)[1];
                    Storage::disk('public')->delete($image_delete);
                }
                $image_path = "0";
            }

            DB::table('surveys')
                ->where('id', $request->surveyId)
                ->update([
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'usage' => $data['usage'],
                    'image_path' => $image_path,
                    'updated_by' => $request->userId,
                    'updated_at' => now(),
                    'expire_at' => $data['expire_at']
                ]);

            $surveyNew = Survey::query()->where('id', $request->surveyId)->first();
            $surveyNews = new SurveyResource($surveyNew);

            return $surveyNews;
        }
    }

    public function destroySurvey(Survey $survey)
    {
        // ide majd más jogosultság esetén csak egy visible=0 kell

        if ($survey->image_path !== "0") {
            $fileName = DB::table('surveys')->where('id', $survey->id)->pluck('image_path')->first();
            $sameImageQuery = Survey::query()->where('image_path', $fileName)->get();
            if (count($sameImageQuery) === 1) {
                $image_delete = explode('storage/', $fileName)[1];
                Storage::disk('public')->delete($image_delete);
            }
        }

        $questions = $this->findQuestions($survey->id);

        foreach ($questions as $question) {
            try {
                $question->delete();
            } catch (\Exception $e) {
                Log::error('Delete question error: ' . $e->getMessage());
                return back()->withErrors(['Delete' => 'Error by delete question']);
            }
        }

        $deleted = $survey->delete();

        return $deleted;
    }

    public function findQuestions(int $surveyId)
    {
        return Question::where('survey_id', $surveyId)
            ->orderBy('question_pos')
            ->get();
    }
}
