function getResults()
{
    var elements = document.getElementsByTagName('input');
    var checkedElements = Array.from(elements)
    .filter((element) => element.checked)
    .map((element) => [element.name, element.value]);
    // filter elements in user input and turn it in a map format. 
    const questionsAndAnswers = {
        q1: ["a"],
        q2: ["a", "b", "c"],
        q3: ["b"],
        q4: ["a", "b", "d"],
        q5: ["b"]
    };
    let total = 0;
    for (var ob in questionsAndAnswers )
        {total += questionsAndAnswers[ob].length;}
    let points = 0;
    // Find the total answers in the object (9 total). 
    //const total = Object.values(questionsAndAnswers);
    
    let i = 0;
    while(i < checkedElements.length){
        const [key, value] = checkedElements[i];
        // separate the key values in a array of elements
        if(questionsAndAnswers[key].includes(value)){
            points++;
            //add green background na individual answer 
        }
        //add red background na individual answer
        i++;
    }
    document.getElementById('rezultat').innerHTML += "dobili ste: "
    + points + " bodova od " + total;

}
