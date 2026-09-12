<?php

use App\Models\Survey;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Survey::class, 'survey_id')->constrained('surveys');
            $table->tinyInteger('question_pos');
            $table->string('question');
            $table->enum('answer_type', ['0', '1', '2', '3', '4']);
            $table->text('answer');
            $table->enum('extra_field', ['no', 'yes']);
            $table->string('label_for_extra');
            $table->foreignIdFor(User::class, 'updated_by')->constrained('users');
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('created_at')->nullable();
        });
    }

    /*
     * answer_type 0 -> free text
     * answer_type 1 -> can choose 1 option (checkbox)
     * answer_type 2 -> rating (1-5)
     * answer_type 3 -> rating (1-10)
     * answer_type 4 -> can choose multi option (radiobutton)
     *
     * extra_field can be yes by answer_type 0 -> then the answer = extra_field.value
     */

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
