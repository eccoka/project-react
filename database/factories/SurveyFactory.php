<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Survey>
 */
class SurveyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $expireAt = $this->faker->dateTimeBetween('now', '+1 year');

        return [
            'title' => fake()->sentence(),
            'description' => fake()->realText(),
            'usage' => fake()->randomElement(['public', 'private']),
            'image_path' => fake()->imageUrl(),
            'visible' => fake()->randomElement(['0', '1']),
            'created_by' => 1,
            'created_at' => now(),
            'updated_by' => 1,
            'updated_at' => now(),
            'expire_at' => $expireAt,
        ];
    }
}
