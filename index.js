const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

function App() {
    const [quotes, setQuotes] = React.useState([])
    const [randomQuote, setRandomQuote] = React.useState("")
    const [getNewQuote, setGetNewQuote] = React.useState("")
    const [color, setColor] = React.useState("")
    
    async function fetchData() {
        const response = await fetch(API)
        const data = await response.json();
        setQuotes(data.quotes);
        let randIndex = Math.floor(Math.random() * data.quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length);
        setColor(colors[randColorIndex])
        setRandomQuote(data.quotes[randIndex])
    }

    
    React.useEffect(() => {
        fetchData();
    }, [getNewQuote])


   

     return (
        <div style={{backgroundColor: color}}>
            <div className="wrapper d-flex align-items-center justify-content-center" >
                <div className="box rounded p-5 w-50" id="quote-box">
                    <p id="text" className="text-center h2" style={{color: color}}>"{randomQuote.quote}"</p>
                    <div className="text-end" id="author">
                        <p style={{color: color}}>- {randomQuote.author}</p>
                    </div>
                    <div className="d-flex justify-content-between" id="buttons">
                        <a id="tweet-quote" href={encodeURI("http://www.twitter.com/intent/tweet?text=${randomQuote.quote} -${randomQuote.author}")} target="_blank" className="btn btn-primary">
                            <i class="fa fa-twitter"></i>
                        </a>
                        <button id="new-quote" className="btn btn-primary" onClick={() => setGetNewQuote(randomQuote)}>New Quote</button>
                    </div>
                </div>
            </div>
        </div>
        )
}



ReactDOM.render(
    <App />, document.getElementById('app'))

