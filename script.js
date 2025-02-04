function setAccent(color) {
    let rootTag = document.querySelector("html");
    rootTag.classList.forEach((label) => {
        if (label.startsWith("accent")){
            rootTag.classList.remove(label);
        }
    });

    rootTag.classList.add("accent-" + color);
}

var themes = ["paper", "dark", "card"];
var themeIndex = 0;

var projectCards = [];

var baseSkills = ["C", "Python", "C#", "JavaScript", "Java", "Dart", "Swift", "C++", "Git", "SQLite", "Firebase", "Unity"];
var skills = new Map();

var projectData = new Map();

let animatedGreeting;
const greetings = ["Hi", "Hello", "Hey", "Welcome"];
let greetingIndex = 0;

let animatedAdjective;
const adjectives = ["innovative", "reliable", "creative", "fun"];
let adjectiveIndex = 0;

let interestTexts = [];
const interests = ["Rock Climbing", "Video Games", "3D Modeling", "Skateboarding", "Game Jams", "Snowboarding"];
let interestIndex = 0;

window.onload = function() {

    animatedGreeting = new AnimatedText("#greeting", greetings[0]);

    setInterval(() => {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        animatedGreeting.set(greetings[greetingIndex]);
    }, 2000);

    // animatedAdjective = new AnimatedText("#adjective", adjectives[0]);

    // setTimeout(() => {
    //     setInterval(() => {
    //         adjectiveIndex = (adjectiveIndex + 1) % adjectives.length;
    //         animatedAdjective.set(adjectives[adjectiveIndex]);
    //     }, 2000);
    // }, 1500);

    interestTexts.push(new AnimatedText("#interest-1", interests[0]));
    interestTexts.push(new AnimatedText("#interest-2", interests[1]));
    interestTexts.push(new AnimatedText("#interest-3", interests[2]));

    setTimeout(() => {
        setInterval(() => {
            interestIndex = (interestIndex + 1) % interests.length;
            interestTexts[0].set(interests[interestIndex]);
        }, 4000);
    }, 1000);

    setTimeout(() => {
        setInterval(() => {
            interestIndex = (interestIndex + 1) % interests.length;
            interestTexts[1].set(interests[interestIndex]);
        }, 4000);
    }, 2000);

    setTimeout(() => {
        setInterval(() => {
            interestIndex = (interestIndex + 1) % interests.length;
            interestTexts[2].set(interests[interestIndex]);
        }, 4000);
    }, 3000);

    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const cardContainer = document.querySelector('.card-container');
            const projectTemplate = document.getElementById('project-template').content;

            data.forEach(project => {

                const projectId = project.title.replace(/\s+/g, '-').toLowerCase();
                projectData.set(projectId, project);

                const projectElement = projectTemplate.cloneNode(true);

                projectElement.querySelector('.project').id = projectId;
                projectElement.querySelector('#project-image').src = `images/${project.coverImage}`;
                projectElement.querySelector('#project-title').textContent = project.title;
                projectElement.querySelector('#project-description').textContent = project.description;

                const tagsContainer = projectElement.querySelector('#project-tags');
                project.tags.forEach(tag => {

                    if (!skills.has(tag)) {
                        skills.set(tag, new Array());

                        // remove from base skills if exists
                        const index = baseSkills.indexOf(tag);
                        if (index > -1) {
                            baseSkills.splice(index, 1);
                        }
                    }

                    skills.get(tag).push(projectId);

                    const tagElement = document.createElement('span');
                    tagElement.className = 'skill-button small';
                    tagElement.textContent = tag;
                    tagElement.onclick = function() { toggleFilter(tag) };
                    tagsContainer.appendChild(tagElement);
                });

                cardContainer.appendChild(projectElement);

                projectCards.push(projectId);
            });

            const skillList1 = document.getElementById('skill-list-1');
            const skillList2 = document.getElementById('skill-list-2');

            const allSkills = new Set(baseSkills);
            skills.forEach((_, skill) => allSkills.add(skill));

            const skillArray = Array.from(allSkills);
            const half = Math.ceil(skillArray.length / 2);

            const skillsList1 = skillArray.slice(0, half);
            const skillsList2 = skillArray.slice(half);

            for (let i = 0; i < skillsList1.length * 2; i++) {
                let j = i % skillsList1.length;
                const skill = skillsList1[j];
                const skillButton1 = document.createElement('button');
                skillButton1.className = 'skill-button';
                skillButton1.textContent = skill;
                skillButton1.onclick = function() { toggleFilter(skill) };
                skillList1.appendChild(skillButton1);
            }

            for (let i = 0; i < skillsList2.length * 2; i++) {
                let j = i % skillsList2.length;
                const skill = skillsList2[j];
                const skillButton2 = document.createElement('button');
                skillButton2.className = 'skill-button';
                skillButton2.textContent = skill;
                skillButton2.onclick = function() { toggleFilter(skill) };
                skillList2.appendChild(skillButton2);
            }

            // set animation duration as function of the list width
            skillList1.style.setProperty('animation-duration', skillList1.offsetWidth / 50 + 's');
            skillList2.style.setProperty('animation-duration', skillList2.offsetWidth / 50 + 's');


        })
        .catch(error => console.error('Error fetching projects.json:', error));
};

async function nextTheme(){
    const root = document.querySelector('html');
    root.classList.add("hide-cards");

    await sleep(500);

    root.classList.remove(themes[themeIndex] + "-style");
    themeIndex = (themeIndex + 1) % themes.length;
    root.classList.add(themes[themeIndex] + "-style");

    await sleep(200);

    root.classList.remove("hide-cards");

}

function toggleFilter(tag) {
    const activeTags = new Set();
    document.querySelectorAll('.skill-button.active').forEach(button => {
        activeTags.add(button.textContent);
    });

    if (activeTags.has(tag)) {
        activeTags.delete(tag);
        document.querySelectorAll(`.skill-button`).forEach(button => {
            if (button.textContent === tag) {
                button.classList.remove('active');
            }
        });
    } else {
        activeTags.add(tag);
        document.querySelectorAll(`.skill-button`).forEach(button => {
            if (button.textContent === tag) {
                button.classList.add('active');
            }
        });
    }

    const projectElements = document.querySelectorAll('.project');
    if (activeTags.size === 0) {
        projectElements.forEach(project => project.style.display = 'block');
    } else {
        projectElements.forEach(project => {
            const projectTags = new Set(Array.from(project.querySelectorAll('.skill-button')).map(button => button.textContent));
            const hasAllTags = Array.from(activeTags).every(tag => projectTags.has(tag));
            project.style.display = hasAllTags ? 'block' : 'none';
        });
    }
}

function openModal(button) {
    const modal = document.getElementById('modal');
    const id = button.closest('.project').id;
    modal.style.display = 'block';

    const project = projectData.get(id);
    if (project) {
        modal.querySelector('#modal-title').textContent = project.title;
        modal.querySelector('#modal-image').src = `images/${project.article.bannerImage}`;

        let tagsContainer = modal.querySelector("#modal-tags");
        tagsContainer.textContent = project.tags.join(", ");

        if (project.article.markdown.endsWith(".md")){
            fetch(`articles/${project.article.markdown}`)
                .then(response => response.text())
                .then(text => {
                    modal.querySelector('#modal-content').innerHTML = marked.parse(text);
                });
        } else {
            modal.querySelector('#modal-content').innerHTML = marked.parse(project.article.markdown);
        }

        const linksContainer = modal.querySelector('#modal-links');
        linksContainer.innerHTML = ''; // Clear previous links

        project.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.classList = "skill-button"
            linkElement.href = link.url;
            linkElement.textContent = link.label;
            linkElement.target = '_blank';
            linksContainer.appendChild(linkElement);
        });

        const embedContainer = modal.querySelector('#embed-container');
        embedContainer.innerHTML = ''; // Clear previous embed
        if (project.embed) {
            const iframe = document.createElement('iframe');
            iframe.src = project.embed;
            iframe.width = '100%';
            iframe.height = '400px';
            iframe.frameBorder = '0';
            embedContainer.appendChild(iframe);
        }
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}



function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

class AnimatedText {

    constructor (container, text = ""){
        this.container = document.querySelector(container);
        this.text = text;

        this.init();
    }

    async set(new_text){

        // if window is not focused
        if (document.hidden){
            return;
        }

        let result = this.minEdit(new_text);
        result = result.reverse();

        for(let i = 0; i < result.length; i++){

            const element = result[i];

            if(element[0] == this.INSERT){
                this.addLetter(element[1], element[2]);
            } else if(element[0] == this.DELETE){
                this.removeLetter(this.container.children[element[2] - 1]);
            } else if(element[0] == this.REPLACE){
                this.changeLetter(this.container.children[element[2] - 1], element[1]);
            }

            await sleep(Math.random() * 50);
        }

        this.text = new_text;
    }

    async init() {
        let arr = this.text.split('');
        for(let i = 0; i < arr.length; i++){
            await sleep(100);
            this.addLetter(arr[i]);
        }
    }

    addLetter(letter, idx = -1){

        if (idx < 0){
            idx = this.container.children.length;
        }

        if(letter == ' '){
            letter = '\xa0';
        }

        let elm = document.createElement('span')
        elm.appendChild(document.createTextNode(letter))
        elm.setAttribute("data-char", letter);
        elm.setAttribute("data-char-after", letter);
        elm.classList.add("animated-letter");
        elm.classList.add("fade-in");
        elm.style.width = 0;
        requestAnimationFrame(()=>{
            elm.style.width = window.getComputedStyle(elm,':before').width;
        });

        elm.addEventListener("animationend", ()=>{
            elm.classList.remove("fade-in");
        });

        if(idx > this.container.children.length - 1){
            this.container.appendChild(elm);
        } else {
            this.container.insertBefore(elm, this.container.children[idx]);
        }

        return elm;
    }

    removeLetter(elm){
        elm.classList.add("fade-out");
        elm.style.width = 0;
        elm.addEventListener("animationend", ()=>{
            elm.remove();
        });
    }

    changeLetter(elm, letter){

        if(letter == ' '){
            letter = '\xa0';
        }

        elm.classList.add("fade-in-out");
        elm.setAttribute("data-char-after", letter);
        elm.innerHTML = letter;
        requestAnimationFrame(()=>{
            elm.style.width = window.getComputedStyle(elm,':before').width;
        });
        elm.addEventListener("animationend", () => {
            elm.classList.remove("fade-in-out");
            elm.setAttribute("data-char", letter);
        });
    }

    INSERT = 0;
    DELETE = 1;
    REPLACE = 2;

    minDisRec(from_str, to_str, from_idx, to_idx, memo) {
        if (from_idx === 0) return Array.from(to_str.slice(0, to_idx), (char) => [this.INSERT, char, 0]);

        if (to_idx === 0) return Array.from(from_str.slice(0, from_idx), (char, idx) => [this.DELETE, char, from_idx - idx]);

        if (memo[from_idx][to_idx].length != 0){
            let ret = memo[from_idx][to_idx];
            return ret;
        }

        if (from_str[from_idx - 1] == to_str[to_idx - 1]) {
            memo[from_idx][to_idx] = this.minDisRec(from_str, to_str, from_idx - 1, to_idx - 1, memo);
        } else {

            let insert = this.minDisRec(from_str, to_str, from_idx, to_idx - 1, memo);    // Insert
            let remove = this.minDisRec(from_str, to_str, from_idx - 1, to_idx, memo);    // Remove
            let replace = this.minDisRec(from_str, to_str, from_idx - 1, to_idx - 1, memo); // Replace

            if(insert.length < remove.length && insert.length < replace.length){
                let newInsert = insert.slice();
                newInsert.push([this.INSERT, to_str[to_idx - 1], from_idx]);
                memo[from_idx][to_idx] = newInsert;
            } else if(remove.length < insert.length && remove.length < replace.length){
                let newRemove = remove.slice();
                newRemove.push([this.DELETE, from_str[from_idx - 1], from_idx]);
                memo[from_idx][to_idx] = newRemove;
            } else {
                let newReplace = replace.slice();
                newReplace.push([this.REPLACE, to_str[to_idx - 1], from_idx]);
                memo[from_idx][to_idx] = newReplace;
            }
        }

        return memo[from_idx][to_idx]; // Return the computed minimum distance
    }

    minEdit(to_str){
        const from_idx = this.text.length;
        const to_idx = to_str.length;

        let memo = Array.from({ length: from_idx + 1 }, () => Array.from({ length: to_idx + 1 }, () => []));

        let result = this.minDisRec(this.text, to_str, from_idx, to_idx, memo);

        return result;
    }

}