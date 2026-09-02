# Script to remove passage_title, a_explanations, and hint from math questions
$filePath = "C:\Users\Alana-Pierre\OneDrive\Desktop\Reading Growth Check\questions-data.js"
$content = Get-Content -Path $filePath -Raw

# Remove passage_title, a_explanations, and hint from math questions
# These fields were incorrectly added to math questions

# Pattern to match the new fields that were added
# We need to remove: passage_title: "...", a_explanations: [...], hint: "..."
# But ONLY from math questions (not reading questions)

# The math section starts at "math: {" and ends before "reading: {"
# We'll process the content line by line

$lines = $content -split "`n"
$newLines = @()
$inMathSection = $false

foreach ($line in $lines) {
    # Check if we're entering math section
    if ($line -match '^\s*math:\s*\{') {
        $inMathSection = $true
        $newLines += $line
        continue
    }
    
    # Check if we're entering reading section
    if ($line -match '^\s*reading:\s*\{') {
        $inMathSection = $false
        $newLines += $line
        continue
    }
    
    # If in math section, remove the new fields
    if ($inMathSection) {
        # Remove passage_title line
        if ($line -match 'passage_title:') {
            # Skip this line
            continue
        }
        # Remove a_explanations line
        if ($line -match 'a_explanations:') {
            # Skip this line
            continue
        }
        # Remove hint line
        if ($line -match 'hint:') {
            # Skip this line
            continue
        }
        
        # Clean up any trailing commas before closing braces
        $line = $line -replace ',\s*$', ''
    }
    
    $newLines += $line
}

# Join lines back
$newContent = $newLines -join "`n"

# Write back to file
Set-Content -Path $filePath -Value $newContent -NoNewline

Write-Host "Removed new fields from math questions"
