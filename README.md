# My Apex Assignment

## My approach to the assignment

I wrote down in a Notion document going from top to bottom of the Figma file, writing out what components I would make based on the design. After I identified and took note of a component, I briefly jotted down some bullet points for the imagined design and logic required for it.

When I finished this, I got to work in VSCode, reading react native documentation and using ChatGPT when a component required something beyond what I could pull off the top of my head. I've also found Perplexity is awesome at referencing documentation accurately if I ever had trouble navigating.

I wanted to make sure I had fun making it, since this is a type of app I wish existed in better forms, so a lot of the functionality was built to reflect how I'd use an app like this.

## Additional tools and libraries used

Just Figma for some minor design planning and ChatGPT to ask questions about how I could go about building an unfamiliar piece of a component. I've tried Cursor, but I find no matter what, I eventually find myself in the inevitable position where I've zoned out, accepted the last 4 changes, something goes wrong, and I realize I have no idea why.

ChatGPT is better for making deliberate, incremental progress, which I strived for here.

##  How I structured the project

I structured the project using Expo and Expo Router, which I find to be easiest to set up and build a clean navigation hierarchy on. Starting at the index.tsx root, I made numerous components and screens to communicate so that the code didn't get too jumbled up and bugs were easy to locate.

The navigation is through a stack navigator, connecting the Today screen with screens like AudioPlayer and AllNotes. I made sure to use the context API for the notes section to make sure they stayed when the user navigated to other screens.

## Further improving app design and functionality

One of my biggest personal beliefs is in the need for writing thoughts and ideas down incessantly, then reflecting on them later that night. I also think writing about experiences helps you think deeper about them and appreciate what resonates with you. 

With that in mind, I would add notetaking to just about every part of the app, maybe through a little white block always on the top left of the screen, then a reflection alarm set by the user for the same time every night where they re-read everything they wrote that day and then have a free-write. Then, the app blocks each day's entire writing into its own, easily accessible area for the user to look back on. It could also be accessed from a database by an AI assistant that uses them to spontaneously surprise you when an opportunity arises. For example, it would be cool if two months ago, someone wrote in a note "feeling chubby and can't seem to get this extra weight off," and today they wrote "really looked like a beast in the gym today", prompting a background assistant to pull up that old note they forgot about.

 Another idea I had was adding a notetaking reflection option for the audio meditations, so users of the app can, through just writing, figure out what they like and don't like about the content, and hopefully learn more about what personally resonates with them. Social media has hindered the ability for people to find what truly resonates, and I think this would be a solution. Again, you can see how much I value reflection and think it's missing in today's self-improvement advice.

 ## Links to work
 [My personal AI assistant (tutorial elsewhere on YT channel)](https://www.youtube.com/watch?v=PnOhU7dLNQg)
 - I often wonder about word definitions or historical context for books I'm reading, and find that asking Siri sucks and going on my phone to look it up distracts me from the book. So, I made a raspberry pi voice assistant to ask these questions. I also added the ability for it to add notes and random thoughts while I read to a [Notion document](https://x.com/aidankanesxacc/status/1845566552080302551)

 [Awefactor](https://awefactor.us)
 - Hearing an Andrew Huberman episode where he says seeing inspiring and beautiful things makes your attention more keen to seeing other good things, and vice versa for gross things opening your vision to bad things, I figured it'd make sense to create a one-a-day inspiration engine. I've got over 70 users on the website and am working on a swift mobile app for a class which I'll continue after I hit the assignment out of the park.

 [Kane Web Services](https://aidanpkane.com/public/website-projects.html)
 - Making websites and web scraping for lead generation. 
 - On that website's software projects page is a demo for a chrome extension I made, took off the store, but still use locally to get quick answers from articles I find when headlines catch my eye.