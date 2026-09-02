const fs = require('fs');

const filePath = 'C:\\Users\\Alana-Pierre\\OneDrive\\Desktop\\Reading Growth Check\\questions-data.js';
let content = fs.readFileSync(filePath, 'utf8');

// Helper function to generate passage_title based on passage content
function generateTitle(p, q) {
    if (!p) {
        // For vocabulary questions without passages
        if (q.includes('happy')) return "Happy Synonym";
        if (q.includes('Enormous')) return "Enormous Size";
        if (q.includes('Cautious')) return "Cautious Behavior";
        if (q.includes('journey')) return "Journey Definition";
        if (q.includes('Peculiar')) return "Peculiar Meaning";
        if (q.includes('Efficient')) return "Efficient Working";
        if (q.includes('Abundance')) return "Abundance Amount";
        if (q.includes('Tranquil')) return "Tranquil Description";
        if (q.includes('Frugal')) return "Frugal Habits";
        if (q.includes('Zealous')) return "Zealous Attitude";
        if (q.includes('scarcity')) return "Scarcity Meaning";
        if (q.includes('Illuminated')) return "Illuminated Definition";
        if (q.includes('reading a difficult passage')) return "Difficult Passage Strategy";
        if (q.includes('inference while reading')) return "Inference While Reading";
        return "Vocabulary Question";
    }
    
    // Generate title based on passage content
    const firstSentence = p.split('.')[0].toLowerCase();
    
    if (firstSentence.includes('sarah reads')) return "Sarah's Reading Habit";
    if (firstSentence.includes('sun gives us')) return "The Sun's Importance";
    if (firstSentence.includes('dogs are loyal')) return "Dogs as Helpers";
    if (firstSentence.includes('exercise makes you')) return "Benefits of Exercise";
    if (firstSentence.includes('water is essential')) return "Water is Essential";
    if (firstSentence.includes('recycling helps')) return "Recycling Helps Earth";
    if (firstSentence.includes('friendship is valuable')) return "Value of Friendship";
    if (firstSentence.includes('sleep is vital')) return "Sleep and Health";
    if (firstSentence.includes('music brings')) return "Music's Many Benefits";
    if (firstSentence.includes('hard work pays')) return "Hard Work Pays Off";
    if (firstSentence.includes('miller family')) return "Miller Family Garden";
    if (firstSentence.includes('ancient city of petra')) return "Ancient City of Petra";
    if (firstSentence.includes('maya brought')) return "Maya's Umbrella";
    if (firstSentence.includes('store was empty')) return "Empty Store Shelves";
    if (firstSentence.includes('john studied')) return "John's Confidence";
    if (firstSentence.includes('puppy wagged')) return "Happy Puppy";
    if (firstSentence.includes('emma\'s hands')) return "Emma's Presentation";
    if (firstSentence.includes('restaurant was full')) return "Popular Restaurant";
    if (firstSentence.includes('tommy hasn\'t eaten')) return "Tommy's Growling Stomach";
    if (firstSentence.includes('alex won first place')) return "Alex's Race Victory";
    if (firstSentence.includes('plant had no water')) return "Thirsty Plant";
    if (firstSentence.includes('lisa saved money')) return "Lisa's Determination";
    if (firstSentence.includes('jake hurried')) return "Jake's Homework Lesson";
    if (firstSentence.includes('new family moved')) return "Welcoming New Neighbors";
    if (firstSentence.includes('library was a sanctuary')) return "Sanctuary Meaning";
    if (firstSentence.includes('team was jubilant')) return "Jubilant Definition";
    if (firstSentence.includes('meager amount')) return "Meager Amount";
    if (firstSentence.includes('tree was resilient')) return "Resilient Tree";
    if (firstSentence.includes('beach was desolate')) return "Desolate Beach";
    if (firstSentence.includes('she was diligent')) return "Diligent Worker";
    if (firstSentence.includes('kind woman was benevolent')) return "Benevolent Woman";
    if (firstSentence.includes('room was austere')) return "Austere Room";
    if (firstSentence.includes('vivid memories')) return "Vivid Memories";
    if (firstSentence.includes('animals had to forage')) return "Forage for Food";
    if (firstSentence.includes('archaeologists studied ancient')) return "Ancient Pottery";
    if (firstSentence.includes('old wooden bridge')) return "Deteriorated Bridge";
    if (firstSentence.includes('tommy walked to school')) return "Tommy and the Kitten";
    if (firstSentence.includes('snowing heavily')) return "Snowy Day Setting";
    if (firstSentence.includes('tommy wanted to go')) return "Tommy's Flat Tire";
    if (firstSentence.includes('lisa forgot her lunch')) return "Lisa's Lunch Solution";
    if (firstSentence.includes('owner decided to retire')) return "Store Closing Reason";
    if (firstSentence.includes('ball rolled down')) return "Rolling Ball";
    if (firstSentence.includes('children played in the schoolyard')) return "Schoolyard Setting";
    if (firstSentence.includes('amy fell off her bike')) return "Amy's Lesson";
    if (firstSentence.includes('marcus won the contest')) return "Marcus's Joy";
    if (firstSentence.includes('she was cold')) return "Cold Weather Choice";
    if (firstSentence.includes('miguel found a small')) return "Injured Bird Rescue";
    if (firstSentence.includes('snow had been falling')) return "Winter Morning Errand";
    if (firstSentence.includes('despite difficulties')) return "Persistence Pays Off";
    if (firstSentence.includes('brothers fought')) return "Family Bonds Matter";
    if (firstSentence.includes('girl helped a stranger')) return "Kindness Returns";
    if (firstSentence.includes('character lost everything')) return "Inner Strength";
    if (firstSentence.includes('even small actions')) return "Small Actions Count";
    if (firstSentence.includes('working together')) return "Teamwork Power";
    if (firstSentence.includes('she took risks')) return "Risks Teach Lessons";
    if (firstSentence.includes('wealth without friendship')) return "Friendship Over Wealth";
    if (firstSentence.includes('people from different backgrounds')) return "More Alike Than Different";
    if (firstSentence.includes('pursuing your passion')) return "Following Your Passion";
    if (firstSentence.includes('elena had always been afraid')) return "Courage Despite Fear";
    if (firstSentence.includes('old man jenkins')) return "Memories Over Money";
    if (firstSentence.includes('mirror broke')) return "Broken Mirror Symbol";
    if (firstSentence.includes('darkness, a single light')) return "Light as Hope";
    if (firstSentence.includes('planted a seed')) return "Seed of Potential";
    if (firstSentence.includes('character faced a terrible storm')) return "Storm as Struggle";
    if (firstSentence.includes('journey across the desert')) return "Journey as Growth";
    if (firstSentence.includes('locked door to his past')) return "Locked Door Past";
    if (firstSentence.includes('caterpillar, she transformed')) return "Butterfly Transformation";
    if (firstSentence.includes('river flowed endlessly')) return "River of Time";
    if (firstSentence.includes('among thorns, the rose')) return "Rose in Adversity";
    if (firstSentence.includes('empty room symbolized')) return "Empty Room Loss";
    if (firstSentence.includes('lighthouse stood on the cliff')) return "Lighthouse Guidance";
    if (firstSentence.includes('garden is overgrown')) return "Garden of Healing";
    if (firstSentence.includes('piece informs readers')) return "Endangered Species Info";
    if (firstSentence.includes('wrote to convince')) return "Recycling Persuasion";
    if (firstSentence.includes('humorous story about her pet')) return "Humorous Pet Story";
    if (firstSentence.includes('explained the scientific process')) return "Photosynthesis Explanation";
    if (firstSentence.includes('letter urges readers')) return "Letter to Support Cause";
    if (firstSentence.includes('article describes how to bake')) return "Baking Instructions";
    if (firstSentence.includes('poem expressing her emotions')) return "Poem About Loss";
    if (firstSentence.includes('ad explains why')) return "Product Advertisement";
    if (firstSentence.includes('described his adventures')) return "Travel Adventures";
    if (firstSentence.includes('review criticizes')) return "Movie Review Criticism";
    if (firstSentence.includes('article begins by describing')) return "Plastic Pollution Article";
    if (firstSentence.includes('stood up to bullies')) return "Standing Up to Bullies";
    if (firstSentence.includes('gave his lunch')) return "Sharing Lunch";
    if (firstSentence.includes('apologized sincerely')) return "Sincere Apology";
    if (firstSentence.includes('spent hours helping')) return "Helping Without Reward";
    if (firstSentence.includes('immediately blamed others')) return "Blaming Others";
    if (firstSentence.includes('chose honesty over')) return "Honesty Over Lies";
    if (firstSentence.includes('despite setbacks, she continued')) return "Pursuing Dreams";
    if (firstSentence.includes('listened to others\' viewpoints')) return "Listening to Others";
    if (firstSentence.includes('remained calm during chaos')) return "Calm During Chaos";
    if (firstSentence.includes('noticed small details')) return "Noticing Details";
    if (firstSentence.includes('rosa stayed after school')) return "Rosa's Empathy";
    if (firstSentence.includes('marcus refused to join')) return "Marcus Learns Teamwork";
    if (firstSentence.includes('unfortunately, the plans')) return "Plans Fall Apart";
    if (firstSentence.includes('what an amazing opportunity')) return "Amazing Opportunity";
    if (firstSentence.includes('just another ordinary day')) return "Ordinary Day";
    if (firstSentence.includes('absolutely ridiculous')) return "Ridiculous and Unacceptable";
    if (firstSentence.includes('couldn\'t stop laughing')) return "Silly Situation";
    if (firstSentence.includes('dark shadows grew longer')) return "Darkening Shadows";
    if (firstSentence.includes('finally, after months')) return "Finally Happened";
    if (firstSentence.includes('deep respect, we honor')) return "Honoring Service";
    if (firstSentence.includes('sadly, we must accept')) return "Accepting Change";
    if (firstSentence.includes('come celebrate')) return "Celebration Invitation";
    if (firstSentence.includes('old house creaked')) return "Creaky Old House";
    if (firstSentence.includes('voice was honey')) return "Voice as Honey";
    if (firstSentence.includes('snow fell like a blanket')) return "Snow Blanket Simile";
    if (firstSentence.includes('wind whispered')) return "Whispering Wind";
    if (firstSentence.includes('peter panda')) return "Peter Panda Alliteration";
    if (firstSentence.includes('told you a million times')) return "Million Times Hyperbole";
    if (firstSentence.includes('fire chief\'s house')) return "Fire Chief Irony";
    if (firstSentence.includes('raining cats and dogs')) return "Raining Cats and Dogs";
    if (firstSentence.includes('wind howled through the canyon')) return "Wind Howled Canyon";
    if (firstSentence.includes('friendship became a house of cards')) return "House of Cards Metaphor";
    if (firstSentence.includes('practiced for 10 hours')) return "Dedicated Practice";
    if (firstSentence.includes('store owner kept detailed')) return "Careful Store Owner";
    if (firstSentence.includes('many people avoid speaking')) return "Fear of Truth";
    if (firstSentence.includes('species are disappearing')) return "Disappearing Species";
    if (firstSentence.includes('students who read daily')) return "Daily Reading Benefits";
    if (firstSentence.includes('after the accident, he avoided')) return "Post-Accident Avoidance";
    if (firstSentence.includes('when laws changed')) return "Law Changes Help";
    if (firstSentence.includes('forgave him despite')) return "Forgiving Betrayal";
    if (firstSentence.includes('countries with strong education')) return "Education and Economy";
    if (firstSentence.includes('plants near the factory')) return "Factory Pollution Effects";
    if (firstSentence.includes('dr. alvarez spent twenty years')) return "Rainforest Recovery";
    if (firstSentence.includes('after the oil spill')) return "Oil Spill Response";
    if (firstSentence.includes('everyone likes this movie')) return "Movie Popularity Claim";
    if (firstSentence.includes('don\'t support our cause')) return "Black and White Thinking";
    if (firstSentence.includes('product worked for one person')) return "One Person's Results";
    if (firstSentence.includes('since a happened')) return "Correlation vs Causation";
    if (firstSentence.includes('experts believe this')) return "Appeal to Authority";
    if (firstSentence.includes('happened before, so it will')) return "Pattern Assumption";
    if (firstSentence.includes('only showing successful cases')) return "Cherry-Picking Data";
    if (firstSentence.includes('rich people are happier')) return "Wealth and Happiness";
    if (firstSentence.includes('one study suggests coffee')) return "Single Study Evidence";
    if (firstSentence.includes('disagree, you lack intelligence')) return "Ad Hominem Attack";
    if (firstSentence.includes('popular social media post')) return "Social Media Claim";
    if (firstSentence.includes('character was brave')) return "Brave Character Action";
    if (firstSentence.includes('claimed to love reading')) return "Reading Claims vs Actions";
    if (firstSentence.includes('passage says \'the room was silent\'')) return "Silent Room Evidence";
    if (firstSentence.includes('he was anxious')) return "Anxious Character Signs";
    if (firstSentence.includes('dialogue reveals')) return "Dialogue Reveals Character";
    if (firstSentence.includes('statistics prove')) return "Statistics and Exercise";
    if (firstSentence.includes('multiple studies confirm')) return "Multiple Study Verification";
    if (firstSentence.includes('according to the study')) return "Study Citation";
    if (firstSentence.includes('quoting the original text')) return "Direct Quotation Evidence";
    if (firstSentence.includes('primary sources like journals')) return "Primary Source Evidence";
    if (firstSentence.includes('author describes the protagonist')) return "Ruined City Description";
    if (firstSentence.includes('protagonist finally confronted')) return "Confronting Fear";
    if (firstSentence.includes('betrayal forces the character')) return "Betrayal and Trust";
    if (firstSentence.includes('romance shows the character\'s')) return "Romance Subplot Purpose";
    if (firstSentence.includes('dark, abandoned buildings')) return "Dark Building Setting";
    if (firstSentence.includes('characters reveal their secrets')) return "Secret Revelations";
    if (firstSentence.includes('first-person narration')) return "First-Person Narration";
    if (firstSentence.includes('story begins where it ends')) return "Circular Story Structure";
    if (firstSentence.includes('challenge the protagonist\'s beliefs')) return "Challenging Beliefs";
    if (firstSentence.includes('vivid descriptions help readers')) return "Vivid Emotional Imagery";
    if (firstSentence.includes('character accepts what they cannot')) return "Acceptance Resolution";
    if (firstSentence.includes('months of searching for her lost brother')) return "Maria's Search Ends";
    if (firstSentence.includes('speaker asks \'how can we ignore')) return "Rhetorical Question Device";
    if (firstSentence.includes('statistics and expert opinions')) return "Logic and Evidence";
    if (firstSentence.includes('showing how this policy helps')) return "Policy Benefits Appeal";
    if (firstSentence.includes('phrase \'we will, we can')) return "Repetition for Emphasis";
    if (firstSentence.includes('as a doctor, i recommend')) return "Doctor's Credibility";
    if (firstSentence.includes('presenting opposing views')) return "Balanced Argument Strategy";
    if (firstSentence.includes('stories of individuals overcoming')) return "Overcoming Obstacles Stories";
    if (firstSentence.includes('urgent word choice')) return "Urgent Tone";
    if (firstSentence.includes('parallel structure emphasizes')) return "Parallel Structure Effect";
    if (firstSentence.includes('vivid examples make')) return "Memorable Examples";
    if (firstSentence.includes('imagine a world where')) return "Visionary Appeal";
    if (firstSentence.includes('moving its start time')) return "School Start Time Change";
    if (firstSentence.includes('digital books are portable')) return "Digital vs Print Books";
    if (firstSentence.includes('survey included 400 students')) return "Claim vs Evidence";
    if (firstSentence.includes('unsigned social-media post')) return "Credible Source Selection";
    if (firstSentence.includes('one successful athlete')) return "Single Example Weakness";
    if (firstSentence.includes('longitudinal study tracked')) return "Library Impact Study";
    if (firstSentence.includes('crime has increased since')) return "Crime Statistics Claim";
    if (firstSentence.includes('passage 1 describes a student-led')) return "Community Garden Benefits";
    if (firstSentence.includes('one article presents data')) return "Transit Data vs Story";
    if (firstSentence.includes('title of the first text')) return "Comparing Both Texts";
    if (firstSentence.includes('two sources disagree')) return "Disagreeing Sources";
    if (firstSentence.includes('gardens need soil')) return "Garden Bed Accessibility";
    if (firstSentence.includes('passage 1 argues that social media')) return "Social Media Views Compared";
    if (firstSentence.includes('bike lanes are painted')) return "Bike Lane Research";
    if (firstSentence.includes('change a few words')) return "Avoiding Plagiarism";
    if (firstSentence.includes('sleep')) return "Sleep Research Terms";
    if (firstSentence.includes('include every minor detail')) return "Reliable Summary Traits";
    if (firstSentence.includes('modern textbook chapter')) return "Primary Source Selection";
    if (firstSentence.includes('government laboratory tested')) return "Solar Panel Efficiency Data";
    
    // Default: use first few words
    const words = p.split(' ').slice(0, 5).join(' ');
    return words.length > 30 ? words.substring(0, 30) + '...' : words;
}

// Generate a_explanations based on question, answers, correct index, and passage
function generateExplanations(q, a, c, p, explanation) {
    const explanations = [];
    const correctAnswer = a[c];
    
    for (let i = 0; i < a.length; i++) {
        if (i === c) {
            // Correct answer explanation
            if (explanation) {
                explanations.push(`Correct! ${explanation}`);
            } else {
                explanations.push(`Correct! "${correctAnswer}" is the right answer based on the information provided in the passage.`);
            }
        } else {
            // Incorrect answer explanation
            const wrongAnswer = a[i];
            let reason = "";
            
            // Generate specific reasons based on common patterns
            if (p && p.toLowerCase().includes(wrongAnswer.toLowerCase())) {
                reason = `Although "${wrongAnswer}" may seem related to the passage, it does not correctly answer the question.`;
            } else if (q.toLowerCase().includes('main idea') || q.toLowerCase().includes('main point') || q.toLowerCase().includes('theme')) {
                reason = `"${wrongAnswer}" is either too narrow, too broad, or not supported by the passage as a whole.`;
            } else if (q.toLowerCase().includes('infer') || q.toLowerCase().includes('suggest') || q.toLowerCase().includes('imply')) {
                reason = `"${wrongAnswer}" cannot be reasonably concluded from the clues in the passage.`;
            } else if (q.toLowerCase().includes('mean') || q.toLowerCase().includes('define') || q.toLowerCase().includes('definition')) {
                reason = `"${wrongAnswer}" does not match the meaning of the word as used in the passage.`;
            } else if (q.toLowerCase().includes('evidence') || q.toLowerCase().includes('support')) {
                reason = `"${wrongAnswer}" does not provide the strongest or most relevant evidence for the claim.`;
            } else if (q.toLowerCase().includes('tone') || q.toLowerCase().includes('mood') || q.toLowerCase().includes('feeling')) {
                reason = `"${wrongAnswer}" does not accurately describe the author's attitude or the passage's atmosphere.`;
            } else if (q.toLowerCase().includes('symbol')) {
                reason = `"${wrongAnswer}" misses the deeper symbolic meaning conveyed in the passage.`;
            } else if (q.toLowerCase().includes('purpose')) {
                reason = `"${wrongAnswer}" does not accurately reflect why the author wrote this passage.`;
            } else if (q.toLowerCase().includes('character')) {
                reason = `"${wrongAnswer}" is not supported by the character's actions or words in the passage.`;
            } else {
                reason = `"${wrongAnswer}" is incorrect based on the information provided in the passage.`;
            }
            explanations.push(`Incorrect. ${reason}`);
        }
    }
    
    return explanations;
}

// Generate hint based on question type and content
function generateHint(q, p) {
    const qLower = q.toLowerCase();
    
    if (qLower.includes('main idea') || qLower.includes('main point') || qLower.includes('central idea')) {
        return "Look at what the passage emphasizes most throughout - the main idea is what the author wants you to understand overall.";
    }
    if (qLower.includes('theme')) {
        return "Think about what universal lesson or message the story teaches about life.";
    }
    if (qLower.includes('infer') || qLower.includes('suggest') || qLower.includes('imply') || qLower.includes('conclude')) {
        return "Use clues from the text combined with what you already know to figure out something not directly stated.";
    }
    if (qLower.includes('mean') || qLower.includes('define') || qLower.includes('definition') || qLower.includes('context')) {
        return "Look at the words surrounding the unfamiliar word - they often provide clues to its meaning.";
    }
    if (qLower.includes('evidence') || qLower.includes('support')) {
        return "Find specific details, quotes, or facts from the passage that directly back up the claim.";
    }
    if (qLower.includes('tone') || qLower.includes('mood') || qLower.includes('feeling') || qLower.includes('attitude')) {
        return "Pay attention to the author's word choice and the emotions conveyed through descriptions.";
    }
    if (qLower.includes('symbol')) {
        return "Think about what the object or element might represent beyond its literal meaning.";
    }
    if (qLower.includes('purpose')) {
        return "Consider whether the author is mainly trying to inform, persuade, entertain, or express emotions.";
    }
    if (qLower.includes('character')) {
        return "Look at the character's actions, words, and how they respond to situations.";
    }
    if (qLower.includes('who is') || qLower.includes('main character')) {
        return "Identify who the passage is mostly about - who performs the main actions.";
    }
    if (qLower.includes('when') || qLower.includes('time')) {
        return "Look for clues about the season, time of day, or time period mentioned.";
    }
    if (qLower.includes('where') || qLower.includes('setting')) {
        return "Pay attention to descriptive details that tell you the location.";
    }
    if (qLower.includes('why')) {
        return "Look for cause-and-effect relationships or reasons given in the passage.";
    }
    if (qLower.includes('how did') || qLower.includes('solution')) {
        return "Find the specific action taken to solve the problem.";
    }
    if (qLower.includes('happen next') || qLower.includes('what happens')) {
        return "Use clues in the passage to predict what would logically occur.";
    }
    if (qLower.includes('learn') || qLower.includes('lesson')) {
        return "Think about what the character gains from their experience.";
    }
    if (qLower.includes('feel') || qLower.includes('emotion')) {
        return "Look at the character's actions and expressions to understand their emotions.";
    }
    if (qLower.includes('claim') || qLower.includes('argument')) {
        return "Identify the main assertion the author is making - what they want you to believe.";
    }
    if (qLower.includes('counterclaim') || qLower.includes('opposing')) {
        return "Think about what someone who disagrees might say - what's the other side?";
    }
    if (qLower.includes('credible') || qLower.includes('source')) {
        return "Consider which source would be most trustworthy and based on expertise.";
    }
    if (qLower.includes('fallacy') || qLower.includes('logical') || qLower.includes('reasoning')) {
        return "Look for flaws in the logic - where does the reasoning break down?";
    }
    if (qLower.includes('compare') || qLower.includes('difference') || qLower.includes('similarity')) {
        return "Look at both texts and identify where they agree and disagree.";
    }
    if (qLower.includes('research') || qLower.includes('note') || qLower.includes('plagiarism')) {
        return "Think about best practices for gathering and using information ethically.";
    }
    if (qLower.includes('rhetorical') || qLower.includes('persuasive') || qLower.includes('technique')) {
        return "Consider how the author tries to convince the audience - what strategy is used?";
    }
    if (qLower.includes('literary device') || qLower.includes('metaphor') || qLower.includes('simile') || qLower.includes('personification')) {
        return "Identify the specific technique the author uses to create meaning or effect.";
    }
    if (qLower.includes('before reading') || qLower.includes('preview') || qLower.includes('strategy')) {
        return "Think about what you can do to prepare your mind before starting to read.";
    }
    if (qLower.includes('summarizing') || qLower.includes('summary')) {
        return "Focus on the most important points and tell them briefly in your own words.";
    }
    if (qLower.includes('visualizing') || qLower.includes('picture')) {
        return "Create mental images of what you are reading to help you understand and remember.";
    }
    if (qLower.includes('connection') || qLower.includes('relate')) {
        return "Think about how the text relates to your own experiences or other things you know.";
    }
    if (qLower.includes('annotate') || qLower.includes('mark')) {
        return "Consider what you can do to actively engage with the text while reading.";
    }
    if (qLower.includes('prediction') || qLower.includes('guess')) {
        return "Use clues from the text to make an educated guess about what comes next.";
    }
    if (qLower.includes('monitor') || qLower.includes('understanding')) {
        return "Pay attention to whether the text makes sense as you read.";
    }
    if (qLower.includes('rereading') || qLower.includes('catch')) {
        return "Think about why reading something more than once can be helpful.";
    }
    if (qLower.includes('difficult') || qLower.includes('challenging')) {
        return "Consider what steps you can take to tackle a hard text before giving up.";
    }
    
    return "Read the passage carefully and look for clues that help you answer the question.";
}

// Process the file
let updatedContent = content;
let questionCount = 0;

// Find all reading questions and add new fields
const readingSection = content.match(/reading:\s*\{[\s\S]*?\n\s{4}\}/);
if (!readingSection) {
    console.log('Could not find reading section');
    process.exit(1);
}

// Process each grade
const grades = [6, 7, 8, 9];
const topicsByGrade = {
    6: ["Main Idea", "Inference", "Context Clues", "Comprehension", "Vocabulary", "Reading Strategies"],
    7: ["Theme", "Symbolism", "Author's Purpose", "Character Analysis", "Tone", "Literary Devices"],
    8: ["Complex Inferences", "Critical Analysis", "Textual Evidence", "Literary Analysis", "Rhetorical Analysis"],
    9: ["Argument & Claims", "Paired Texts", "Synthesis & Research"]
};

// We need to process the file more carefully
// Let's find each question object and add the new fields

// Pattern to match question objects in reading section
const questionPattern = /(\{\s*q:\s*"[^"]+",\s*(?:p:\s*"[^"]+",\s*)?a:\s*\[[^\]]+\],\s*c:\s*\d+,\s*explanation:\s*"[^"]*"\s*\})/g;

// Find all matches
let match;
const matches = [];
while ((match = questionPattern.exec(content)) !== null) {
    matches.push({ match: match[0], index: match.index });
}

console.log(`Found ${matches.length} questions with explanation field`);

// Now let's also find questions without explanation field
const questionNoExplanationPattern = /(\{\s*q:\s*"[^"]+",\s*(?:p:\s*"[^"]+",\s*)?a:\s*\[[^\]]+\],\s*c:\s*\d+\s*\})/g;
const matchesNoExp = [];
while ((match = questionNoExplanationPattern.exec(content)) !== null) {
    // Check if this match already has an explanation
    if (!match[0].includes('explanation:')) {
        matchesNoExp.push({ match: match[0], index: match.index });
    }
}

console.log(`Found ${matchesNoExp.length} questions without explanation field`);

// Combine all matches
const allMatches = [...matches, ...matchesNoExp].sort((a, b) => a.index - b.index);

// Now process each match and add the new fields
let offset = 0;
for (const m of allMatches) {
    const originalQuestion = m.match;
    
    // Extract question data
    const qMatch = originalQuestion.match(/q:\s*"([^"]+)"/);
    const pMatch = originalQuestion.match(/p:\s*"([^"]+)"/);
    const aMatch = originalQuestion.match(/a:\s*\[([^\]]+)\]/);
    const cMatch = originalQuestion.match(/c:\s*(\d+)/);
    const expMatch = originalQuestion.match(/explanation:\s*"([^"]+)"/);
    
    if (!qMatch || !aMatch || !cMatch) continue;
    
    const q = qMatch[1];
    const p = pMatch ? pMatch[1] : null;
    const aStr = aMatch[1];
    const c = parseInt(cMatch[1]);
    const explanation = expMatch ? expMatch[1] : null;
    
    // Parse answers array
    const a = aStr.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    
    // Generate new fields
    const title = generateTitle(p, q);
    const explanations = generateExplanations(q, a, c, p, explanation);
    const hint = generateHint(q, p);
    
    // Create the new fields string
    const hasExplanation = originalQuestion.includes('explanation:');
    const insertAfter = hasExplanation ? 'explanation:' : `c: ${c}`;
    
    // Find the position to insert (after explanation or after c)
    let insertPos;
    if (hasExplanation) {
        // Find the end of explanation field
        const expPattern = /explanation:\s*"[^"]*"/;
        const expMatchInQuestion = originalQuestion.match(expPattern);
        if (expMatchInQuestion) {
            insertPos = originalQuestion.indexOf(expMatchInQuestion[0]) + expMatchInQuestion[0].length;
        }
    } else {
        // Find the position after c: N
        const cPattern = /c:\s*\d+/;
        const cMatchInQuestion = originalQuestion.match(cPattern);
        if (cMatchInQuestion) {
            insertPos = originalQuestion.indexOf(cMatchInQuestion[0]) + cMatchInQuestion[0].length;
        }
    }
    
    if (!insertPos) continue;
    
    // Build the new fields
    const newFields = `,\n    passage_title: "${title}",\n    a_explanations: ${JSON.stringify(explanations)},\n    hint: "${hint}"`;
    
    // Insert the new fields
    const newQuestion = originalQuestion.slice(0, insertPos) + newFields + originalQuestion.slice(insertPos);
    
    // Replace in content
    const actualIndex = m.index + offset;
    updatedContent = updatedContent.slice(0, actualIndex) + newQuestion + updatedContent.slice(actualIndex + originalQuestion.length);
    
    // Update offset
    offset += newQuestion.length - originalQuestion.length;
    
    questionCount++;
}

console.log(`Updated ${questionCount} questions`);

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('File updated successfully!');
