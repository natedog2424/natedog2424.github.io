## Project Background
The goal of this project was to create text transitions in HTML, CSS, JS that look like the numeric transitions in live activities on iOS. Step one is to be able to replace a or a set of characters in a string and have the animation play. Computing the characters to switch for numbers like iOS does is pretty simple but I want to take it a step further and compute the edit distance to provide nice animation between arbitrary strings.

#### iOS Animation
![GIF of iOS animation](images/edit-distance-apple.gif "iOS numeric transition")

I carefully analyzed the iOS animation and came to the conclusion that the animation consists of the following:
- Current character
	- blurs
	- fades out
	- 3d translation 'falling backwards'
	- moves up
- Next character
	- fades in
	- un-blurs
	- 3d translation 'folding in'
	- moves up (elastic easing)
- Container size adjusts smoothly (including character width)

## Implementation
#### The edit distance algorithm
Implementing the edit distance algorithm proved to be a fun exercise in dynamic programming thanks to the algorithm's use of memoization. The function to calculate edit distance returns the minumum number of opeations (add, remove, replace) required to transform one string into another. The implemention used is a recursive approach where the recursive case returns the minumum of 3 recursive calls to edit distance with different substrings. For the first call we remove the last character from the destination string to emulate adding that character to the source string (the ends would now match and can therefore be ignored). For the second call we first remove the last character from the source string to represent deleting a character. And for the third call we remove the last character from both source and destination to emulate changing a source character to the matching destination character. This recursive case continues until we reach the base case where the remaining substrings are identical or empty. Due to the fact that this implementation has many overlapping subproblems, a memoization table was implemented that helped speed up the algorithm.

#### The animation
The first big challenge with implementing the animation aspect of this problem was the fact that when a character changes from one to another, there are 2 characters shown at a time during the animation. The previous character fades out at the same time that the new character fades in. I was hoping to keep the HTML side of this project as simple as possible so that accessibility is not negatively affected so I decided to try and implement the animations using the before and after [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements). Using pseudo-elements means that the actual character (wrapped in a span tag) always remains inline and is just hidden during animations. The after pseudo-element is given a letter-out css animation when the fade-out or fade-in-out class is applied to the span and the before pseudo-element is given a letter-in css animation when the fade-in or fade-in-out class is a applied to the span.

The other main challenge I faced with the animation aspect of this project was smoothly adjusting the width of the text as characters were added, removed, or changed to a character of different width. My initial thought was that I would be able to set a css transition on the width property and as the character changed, the width would be animated. Unfortunately, this did not work because properties like width and height can only be transitioned between defined values. The solution was to use the javascript `getComputedValue` to get the computed width and then set the width to the computed value on the next frame using `requestAnimationFrame`. This solution worked perfectly and allows the width of the content to grow and shrink smoothly.