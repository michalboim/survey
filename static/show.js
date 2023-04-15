function ShowSurvey(){
    const [surveyChoices, setChoices] = React.useState([]);
    const [surveyResults, setResults] = React.useState([]);
    const handle = (event) => {
        event.preventDefault();
        const newVote=event.target.elements.vote.value;
        axios.post('/add', {vote:newVote}).then(
            response => console.log('vote'))
        getData();
    }
    const getData = () => {
        axios.get('/show_survey').then((result) =>{
            setChoices(result.data.choices);
        })
        axios.get('/add').then((result) =>{
            setResults(result.data.results);
        })
    }
    React.useEffect(() =>{
        getData();
    }, []
    )
    return (
        <div class='show_votes'>
            <form onSubmit={handle}>
                {surveyChoices.map((choice)=>
                <div>
                    <input type="radio" name='vote' value={choice[0]} />{choice[1]}
                </div>)}
                <div><input type="submit" value="VOTE" /></div>
            </form>
            
            <div class='all_results'>{surveyResults.map((result)=>
            <div class='result' style={{width:result + 'vh'}}>{result}</div>)}</div>
        </div>
        
    );
}

ReactDOM.render(<ShowSurvey />, document.getElementById('show'))