RECRUITid is a startup I co-founded that empowers high school athletes to take charge of their recruitment by providing them with valuable tools and resources. Today RECRUITid provides digital business card style profiles, an interactive recruiting guide, a college search engine, and more.

## Project Background
 RECRUITid started as a small project to help my Co-Founder's son create a digital profile he could share at events. This small project quickly proved to be a valuable tool for athletes and a great platform for me to learn about many aspects of software.

## Technical Implementation
RECRUITid leverages many technologies including:
- Python
- Flask
- HTML/CSS/JavaScript
- Bulma
- Stripe
- Twilio
- Postmark
- SQLite

The RECRUITid platform is an SSR application built using Python's Flask framework.
## Development Challenges
I've been working on the RECRUITid platform for nearly 4 years now and during that time I faced a countless number of challenges that I had to overcome.
#### Database Management
At the start of the RECRUITid project, I had some experience with Flask, HTML/CSS/JS, but the most exciting aspect was storing and retrieving data from a database. I chose SQLite because it was valuable for learning but not too challenging.

One of my biggest challenges was serializing and deserializing data. I integrated database calls directly into the business logic, which became unmanageable. To address this, I refactored to include a database manager script. This script handled building SQL queries, sanitizing input data, and returning deserialized data, making my work easier and more efficient.
#### Authentication
Authentication was another significant challenge I faced while working on the RECRUITid project. As I delved into researching authentication techniques and security considerations, I realized the vastness of the field. In retrospect, it would have been prudent to utilize a third-party authentication tool. However, I chose to implement authentication myself. As I explored the topic, I was fascinated by the mechanisms that ensure security, such as one-way cryptographic hashes, adding salt, session tokens, cookie settings, and more. Drawing from the knowledge gained through this research, I developed a secure authentication system.
#### Growing pains
When I embarked on the RECRUITid project, my programming experience was limited to small scripts for game development and light web tools for personal enjoyment. As I progressed with RECRUITid, I decided to consolidate all my code into a single file. However, as the platform expanded and new features were added, the codebase became increasingly unmanageable. Recognizing the need for a more structured approach, I decided to delve into software architecture and object-oriented design patterns. Over the course of a few months, I successfully rewritten most of the codebase, adopting a significantly more organized architecture that enabled me to prototype new features much more rapidly.

## Key Learnings
I learned a tremendous amount while working on RECRUITid. One of my biggest takeaways is the importance of writing quality object oriented code. After applying a few OOP concepts to my codebase I was surprised to see a dramatic reduction of my development time for new features. Bugs became significantly easier to resolve, and I started to discern clear paths to implement previously daunting features. I also learned how important it is to be flexible during development to allow for changing requirements and I gained a fresh perspective on software development from a business and value creation standpoint.

## Results & Impact
Today, RECRUITid boasts over 5,000 users across various sports, each with their own digital profiles that they can share with recruiters. My Co-Founders and I also participated in a venture accelerator program at my university called Venture Devils, where we competed against other ventures to secure funding. RECRUITid emerged as the winner in our category, securing the highest prize of $7,000 in grant funding to support the growth of our venture.