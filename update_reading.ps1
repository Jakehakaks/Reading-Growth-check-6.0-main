# PowerShell script to update reading questions
$filePath = "C:\Users\Alana-Pierre\OneDrive\Desktop\Reading Growth Check\questions-data.js"
$content = Get-Content -Path $filePath -Raw

# Define all the updates as a hashtable
$updates = @{}

# Grade 6 - Main Idea
$updates['Sarah reads every day'] = @{
    passage_title = "Sarah's Reading Habit"
    a_explanations = @(
        "Incorrect. Sarah's age is never mentioned in the passage.",
        "Correct! The passage focuses on Sarah's daily reading habit and how it helps her learn new things.",
        "Incorrect. The passage never discusses the cost of books.",
        "Incorrect. While Sarah loves books, there is no mention of her career goals."
    )
    hint = "Look at what the passage emphasizes most - what Sarah does every day and what she gains from it."
}

$updates['The sun gives us light and heat'] = @{
    passage_title = "The Sun's Importance"
    a_explanations = @(
        "Incorrect. While the sun is hot, this is just one detail, not the main idea.",
        "Correct! The passage explains how the sun supports all life through light, heat, and its role in the food chain.",
        "Incorrect. The passage says plants need sunlight, not just water.",
        "Incorrect. While true, this fact is not discussed in the passage."
    )
    hint = "Consider how all the details in the passage connect to one central point about life on Earth."
}

$updates['Dogs are loyal pets'] = @{
    passage_title = "Dogs as Helpers"
    a_explanations = @(
        "Incorrect. The passage does not discuss how much dogs sleep.",
        "Correct! The passage describes dogs' loyalty and the many ways they assist people.",
        "Incorrect. The passage does not mention the cost of pets.",
        "Incorrect. The passage never compares dogs to cats."
    )
    hint = "Think about the different roles dogs play that are described throughout the passage."
}

$updates['Exercise makes you healthy'] = @{
    passage_title = "Benefits of Exercise"
    a_explanations = @(
        "Incorrect. The passage does not describe exercise as hard.",
        "Correct! The passage lists multiple health benefits of regular exercise.",
        "Incorrect. The passage says all kids should exercise, not just athletes.",
        "Incorrect. The passage describes exercise as beneficial, not boring."
    )
    hint = "Count the different positive effects of exercise mentioned in the passage."
}

$updates['Water is essential for life'] = @{
    passage_title = "Water is Essential"
    a_explanations = @(
        "Incorrect. The passage does not focus on water's temperature.",
        "Correct! The passage emphasizes that all living things need water to survive.",
        "Incorrect. The passage says all living things need water, not just animals.",
        "Incorrect. The passage does not discuss where water is found."
    )
    hint = "Notice how the passage gives examples of different living things that all depend on water."
}

$updates['Recycling helps save the planet'] = @{
    passage_title = "Recycling Helps Earth"
    a_explanations = @(
        "Incorrect. The passage does not single out plastic as bad.",
        "Correct! The passage explains multiple ways recycling benefits the environment.",
        "Incorrect. The passage encourages more recycling, suggesting not everyone does it.",
        "Incorrect. The passage presents recycling as something everyone can do, not as difficult."
    )
    hint = "Look at the different environmental benefits the passage lists about recycling."
}

$updates['Friendship is valuable'] = @{
    passage_title = "Value of Friendship"
    a_explanations = @(
        "Incorrect. The passage does not discuss how easy it is to make friends.",
        "Correct! The passage describes how friends support each other and enrich our lives.",
        "Incorrect. The passage does not claim everyone has many friends.",
        "Incorrect. The passage says friends can be different from you."
    )
    hint = "Think about all the ways the passage describes friends helping and supporting each other."
}

$updates['Sleep is vital for health'] = @{
    passage_title = "Sleep and Health"
    a_explanations = @(
        "Incorrect. The passage does not describe sleep as boring.",
        "Correct! The passage explains why sleep is important for physical health and learning.",
        "Incorrect. The passage does not specify that everyone sleeps ten hours.",
        "Incorrect. The passage argues sleep is valuable, not a waste of time."
    )
    hint = "Consider what the passage says happens to your body and brain when you sleep."
}

$updates['Music brings joy to many people'] = @{
    passage_title = "Music's Many Benefits"
    a_explanations = @(
        "Incorrect. The passage does not focus on the volume of music.",
        "Correct! The passage describes multiple positive effects of music on people.",
        "Incorrect. The passage does not claim all music sounds the same.",
        "Incorrect. The passage mentions benefits beyond just entertainment."
    )
    hint = "Look at the different ways music affects people that are mentioned throughout the passage."
}

$updates['Hard work pays off'] = @{
    passage_title = "Hard Work Pays Off"
    a_explanations = @(
        "Incorrect. The passage does not describe hard work as boring.",
        "Correct! The passage teaches that consistent effort and persistence lead to success.",
        "Incorrect. The passage says effort is required, not that success comes easily.",
        "Incorrect. The passage emphasizes effort over talent."
    )
    hint = "Think about what the passage says happens when you practice and never give up."
}

$updates['Last summer, the Miller family'] = @{
    passage_title = "Miller Family Garden"
    a_explanations = @(
        "Incorrect. The passage describes the work involved in gardening.",
        "Correct! The passage describes the family's gardening experience and the lessons they learned.",
        "Incorrect. The passage suggests homegrown vegetables are rewarding, not inferior.",
        "Incorrect. While summer vacation is mentioned, it is not the main focus."
    )
    hint = "Look beyond the gardening details to find what the family gained from the experience."
}

$updates['The ancient city of Petra'] = @{
    passage_title = "Ancient City of Petra"
    a_explanations = @(
        "Incorrect. The passage says Petra is over two thousand years old.",
        "Correct! The passage focuses on the Nabataeans' engineering skills and Petra's construction.",
        "Incorrect. The type of rock is a detail, not the main focus.",
        "Incorrect. While tourism is mentioned, it is not the main idea."
    )
    hint = "Consider what the passage reveals about the people who built Petra and what they achieved."
}

Write-Host "Created $($updates.Count) updates for Grade 6 Main Idea"

# Output the updates to verify
$updates.GetEnumerator() | ForEach-Object {
    Write-Host "Key: $($_.Key.Substring(0, [Math]::Min(50, $_.Key.Length)))..."
}
