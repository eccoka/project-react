<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $answerType  = (string) $this->faker->randomElement(['0', '1', '2', '3', '4']);
        $extraField = 'no';
        $answer = '';
        $labelForExtra = '';

        if ($answerType === "1" || $answerType === "4")
        {
           for ($i = 1; $i<=4; $i++){
               $answer_array[$i] = $this->faker->sentence();
           }
            $answer =  implode(' || ', $answer_array);
        }

        if ($answerType === "1"){
            $extraField = $this->faker->randomElement(['yes', 'no']);
            if ($extraField === "yes"){
                $labelForExtra = $this->faker->word();
            }
        }



        return [
            'survey_id' => fake()->numberBetween(1, 30),
            'question_pos' => fake()->numberBetween(1, 15),
            'question' => fake()->sentence(),
            'answer_type' => $answerType,
            'answer' => $answer,
            'extra_field' => $extraField,
            'label_for_extra' => $labelForExtra,
            'updated_by' => 1,
            'updated_at' => now(),
        ];
    }
}
